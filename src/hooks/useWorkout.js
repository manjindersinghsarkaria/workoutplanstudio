import { useState, useEffect } from "react";
import { normalizePlan, getCompletedSets, getWeightValue, parseWeightEntry } from "@/helpers";
import { DEFAULT_PLAN } from "@/constants";
import { flattenExercises } from "@/utils/workoutDerived";
import { getPlan, savePlan, updatePlan, deletePlan, saveCompletedSession, getCompletedSessions } from "@/services/planService";

// Valid NavTab values — used for validation in switchTab guard
const VALID_TABS = ["workout", "plan", "history"];

export const useWorkout = () => {
  const [isHydrating, setIsHydrating] = useState(true);
  const [dbError, setDbError] = useState(null);
  const [loadedPromptOptions, setLoadedPromptOptions] = useState(null);

  /* ── UI-only preferences (localStorage is fine) ── */
  const [darkMode, setDarkMode] = useState(() => {
    const s = localStorage.getItem("mgc_dark_mode");
    return s ? JSON.parse(s) : true;
  });

  const [selectedDayId, setSelectedDayId] = useState(() => {
    return sessionStorage.getItem("mgc_selected_day") ?? "day1";
  });

  /* ── Workout data — persisted to sessionStorage so back-navigation doesn't lose progress ── */
  const [plan, setPlan] = useState(() => normalizePlan(DEFAULT_PLAN));
  const [progressMap, setProgressMap] = useState(() => {
    try {
      const s = sessionStorage.getItem("mgc_progress");
      return s ? JSON.parse(s) : {};
    } catch { return {}; }
  });
  const [weightsMap, setWeightsMap] = useState(() => {
    try {
      const s = sessionStorage.getItem("mgc_weights");
      return s ? JSON.parse(s) : {};
    } catch { return {}; }
  });
  const [selectedAlternates, setSelectedAlternates] = useState({});
  const [historyLog, setHistoryLog] = useState([]);

  const [view, setView] = useState("workout");
  /* ── WorkoutSession state ── */
  const [session, setSession] = useState(null);

  /* ── Rest timer — lives here so it survives tab navigation ── */
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  /* ── Rest timer override — null means "use plan default" ── */
  const [restOverride, setRestOverride] = useState(() => {
    const s = localStorage.getItem("mgc_rest_override");
    if (!s) return null;
    const n = Number(s);
    return Number.isFinite(n) && n > 0 ? n : null;
  });

  useEffect(() => {
    if (restOverride === null) {
      localStorage.removeItem("mgc_rest_override");
    } else {
      localStorage.setItem("mgc_rest_override", String(restOverride));
    }
  }, [restOverride]);

  /* ── Persist darkMode to localStorage ── */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("mgc_dark_mode", JSON.stringify(darkMode));
  }, [darkMode]);

  /* ── Persist active workout state to sessionStorage ── */
  useEffect(() => {
    sessionStorage.setItem("mgc_selected_day", selectedDayId);
  }, [selectedDayId]);

  useEffect(() => {
    sessionStorage.setItem("mgc_progress", JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    sessionStorage.setItem("mgc_weights", JSON.stringify(weightsMap));
  }, [weightsMap]);

  /* ── Hydrate plan + session history from IndexedDB on mount ── */
  useEffect(() => {
    let cancelled = false;
    Promise.all([getPlan(), getCompletedSessions()])
      .then(([planRecord, sessions]) => {
        if (cancelled) return;
        if (planRecord?.plan) {
          setPlan(normalizePlan(planRecord.plan));
        }
        if (planRecord?.promptOptions) {
          setLoadedPromptOptions(planRecord.promptOptions);
        }
        if (sessions.length > 0) {
          setHistoryLog(sessions);
        }
        setIsHydrating(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setDbError(err?.message ?? "Failed to load saved data");
        setIsHydrating(false);
      });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Immediate write callbacks ── */

  function onApplyPlan(newPlan, promptOptions) {
    const normalized = normalizePlan(newPlan);
    setPlan(normalized);
    setSelectedDayId(normalized.days?.[0]?.id ?? "day1");
    setSelectedAlternates({});
    setProgressMap({});
    setWeightsMap({});
    updatePlan(normalized, promptOptions ?? {}).catch((err) => {
      setDbError(err?.message ?? "Failed to save plan");
    });
  }

  function onResetPlan() {
    const normalized = normalizePlan(DEFAULT_PLAN);
    deletePlan().catch((err) => {
      setDbError(err?.message ?? "Failed to clear saved plan");
    });
    setPlan(normalized);
    setSelectedDayId(normalized.days?.[0]?.id ?? "day1");
    setSelectedAlternates({});
    setProgressMap({});
    setWeightsMap({});
  }

  function handleSetProgressMap(newProgress) {
    setProgressMap(newProgress);
  }

  /**
   * Snapshots the active day's exercises into a CompletedSession.
   * Works with both session-based and legacy plan-based approaches.
   * @returns {import("../types/workout").CompletedSession}
   */
  function saveSession() {
    // New session-based approach
    if (session) {
      const activeDay =
        session.days.find((d) => d.id === session.activeDayId) ?? session.days[0];
      if (!activeDay) throw new Error("No active day found in session");

      const completedExercises = flattenExercises(activeDay).map((ex) => {
        const selectedAlternateId = selectedAlternates[ex.id];
        const selectedAlternate = selectedAlternateId
          ? (ex.alternatives || []).find((alt) => alt.id === selectedAlternateId)
          : null;

        return {
          id: ex.id,
          name: selectedAlternate ? selectedAlternate.name : ex.name,
          totalSets: ex.totalSets,
          completedSetIds: [...ex.completedSetIds],
          setLogs: ex.setLogs.map((log) => ({
            ...log,
            weight: log.weight ? { ...log.weight } : undefined,
          })),
          isAlternate: !!selectedAlternate,
          baseExerciseName: selectedAlternate ? ex.name : undefined,
        };
      });

      const mainExercises = activeDay.sections
        .filter((s) => s.type === "main")
        .flatMap((s) => s.exercises);
      const totalSets = mainExercises.reduce((sum, ex) => sum + ex.totalSets, 0);
      const completedSets = mainExercises.reduce((sum, ex) => sum + ex.completedSetIds.length, 0);
      const completionPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

      return {
        id: `session_${Date.now()}`,
        savedAt: new Date().toISOString(),
        planName: session.planName,
        weekLabel: session.weekLabel,
        dayLabel: activeDay.label,
        dayTitle: activeDay.title,
        completionPercent,
        completedExercises,
      };
    }

    // Legacy plan-based approach
    const currentDay = plan.days?.find(d => d.id === selectedDayId);
    if (!currentDay) throw new Error("No active day found");

    const completedExercises = (currentDay.exercises || []).map((ex) => {
      const completedCount = getCompletedSets(progressMap, selectedDayId, ex.id);
      const completedSetIds = Array.from({ length: completedCount }, (_, i) => `set_${i + 1}`);

      const selectedAlternateId = selectedAlternates[ex.id];
      const selectedAlternate = selectedAlternateId
        ? (ex.alternates || []).find((alt) => alt.id === selectedAlternateId)
        : null;

      const weightEntry = parseWeightEntry(getWeightValue(weightsMap, selectedDayId, ex.id));
      const setLogs = completedSetIds.map((setId) => ({
        setId,
        completedAt: new Date().toISOString(),
        ...(weightEntry ? { weight: weightEntry } : {}),
      }));

      return {
        id: ex.id,
        name: selectedAlternate ? selectedAlternate.name : ex.name,
        totalSets: ex.sets,
        completedSetIds,
        setLogs,
        isAlternate: !!selectedAlternate,
        baseExerciseName: selectedAlternate ? ex.name : undefined,
      };
    });

    const totalSets = completedExercises.reduce((sum, ex) => sum + ex.totalSets, 0);
    const completedSets = completedExercises.reduce((sum, ex) => sum + ex.completedSetIds.length, 0);
    const completionPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

    return {
      id: `session_${Date.now()}`,
      savedAt: new Date().toISOString(),
      planName: plan.name || "Workout Plan",
      weekLabel: currentDay.weekLabel || "",
      dayLabel: currentDay.label || "Day",
      dayTitle: currentDay.title || "Workout",
      completionPercent,
      completedExercises,
    };
  }

  /**
   * Snapshots the active session and appends it to the in-memory history log.
   * @returns {import("../types/workout").CompletedSession}
   */
  function handleSaveSession() {
    const snapshot = saveSession();
    setHistoryLog(prev => [...prev, snapshot]);
    saveCompletedSession(snapshot).catch((err) => {
      setDbError(err?.message ?? "Failed to save session");
    });
    return snapshot;
  }

  /**
   * Switches the active nav tab, updating both the legacy `view` state
   * and `session.activeTab` (when a session is active).
   * @param {import("../types/workout").NavTab} tab
   */
  function switchTab(tab) {
    if (!VALID_TABS.includes(tab)) return;
    setView(tab);
    if (session) {
      setSession((prev) => ({ ...prev, activeTab: tab }));
    }
  }

  return {
    darkMode, setDarkMode,
    plan, setPlan: onApplyPlan,
    view, setView,
    selectedDayId, setSelectedDayId,
    progressMap, setProgressMap: handleSetProgressMap,
    weightsMap, setWeightsMap,
    selectedAlternates, setSelectedAlternates,
    historyLog, setHistoryLog,
    session, setSession,
    saveSession,
    handleSaveSession,
    switchTab,
    timerSeconds, setTimerSeconds,
    timerRunning, setTimerRunning,
    restOverride, setRestOverride,
    isHydrating,
    dbError,
    loadedPromptOptions,
    onApplyPlan,
    onResetPlan,
  };
};
