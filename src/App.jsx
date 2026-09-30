import React, { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import WorkoutView from "@/components/views/WorkoutView";
import PlanView from "@/components/views/PlanView";
import HistoryView from "@/components/views/HistoryView";
import { Toast } from "@/components/ui/Toast";
import { cn } from "@/utils";
import { useWorkout } from "@/hooks/useWorkout";
import { useWakeLock } from "@/hooks/useWakeLock";
import { APP_VERSION } from "@/changelog";
import { decodePlanFromHash, clearPlanHash } from "@/utils/sharePlan";
import { normalizePlan } from "@/helpers";
import { enrichPlan } from "@/utils/enrichPlan";

export default function App() {
  // Version tracking (no auto-reload to avoid loops)
  useEffect(() => {
    const cachedVersion = sessionStorage.getItem('app_version');
    console.log('[App] Current version:', APP_VERSION);
    console.log('[App] Cached version:', cachedVersion);
    
    if (!cachedVersion || cachedVersion !== APP_VERSION) {
      console.log('[App] Updating cached version to:', APP_VERSION);
      sessionStorage.setItem('app_version', APP_VERSION);
    }
  }, []);
  
  const {
    darkMode,
    setDarkMode,
    plan,
    setPlan,
    view,
    setView,
    selectedDayId,
    setSelectedDayId,
    progressMap,
    setProgressMap,
    weightsMap,
    setWeightsMap,
    historyLog,
    setHistoryLog,
    session,
    handleSaveSession,
    switchTab,
    timerSeconds,
    setTimerSeconds,
    timerRunning,
    setTimerRunning,
    restOverride,
    setRestOverride,
    onApplyPlan,
    onResetPlan,
    isHydrating,
    dbError,
    loadedPromptOptions,
  } = useWorkout();

  // Keep screen awake while the user is actively working out (only when enabled)
  const [wakeLockEnabled, setWakeLockEnabled] = useState(() => {
    const s = localStorage.getItem("mgc_wake_lock");
    if (!s) return true;
    try { return JSON.parse(s); } catch { return true; }
  });
  useEffect(() => {
    localStorage.setItem("mgc_wake_lock", JSON.stringify(wakeLockEnabled));
  }, [wakeLockEnabled]);
  useWakeLock(view === "workout" && wakeLockEnabled);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const s = localStorage.getItem("mgc_sound");
    if (!s) return true;
    try { return JSON.parse(s); } catch { return true; }
  });
  useEffect(() => {
    localStorage.setItem("mgc_sound", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Re-fetch after a new session is saved so history stays current
  const handleSaveAndRefresh = useCallback(async () => {
    return await handleSaveSession();
  }, [handleSaveSession]);

  // ── Back-button guard ────────────────────────────────────────────────────────
  const [showBackGuard, setShowBackGuard] = useState(false);

  // Push a sentinel history entry on mount so the back button can be intercepted
  useEffect(() => {
    history.pushState({ workoutGuard: true }, "");
  }, []);

  // When there is active workout progress, intercept the browser back gesture
  useEffect(() => {
    function onPopState() {
      if (Object.keys(progressMap).length > 0) {
        history.pushState({ workoutGuard: true }, "");
        setShowBackGuard(true);
      }
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [progressMap]);

  // ── Shared plan URL detection — runs once after hydration ──────────────────
  const [sharedPlanMsg, setSharedPlanMsg] = useState(null);
  useEffect(() => {
    if (isHydrating) return;
    const decoded = decodePlanFromHash();
    if (!decoded) return;
    clearPlanHash();
    try {
      const enriched = enrichPlan(normalizePlan(decoded));
      onApplyPlan(enriched);
      setSharedPlanMsg(`✅ Shared plan "${decoded.meta?.notes || "Workout Plan"}" loaded`);
      switchTab("workout");
    } catch {
      setSharedPlanMsg("❌ Could not load the shared plan — the link may be invalid.");
    }
  }, [isHydrating]); // eslint-disable-line react-hooks/exhaustive-deps

  const [toastDismissed, setToastDismissed] = useState(false);
  // Reset dismiss state whenever a new error arrives
  useEffect(() => { if (dbError) setToastDismissed(false); }, [dbError]);

  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="h-8 w-8 rounded-full border-4 border-slate-600 border-t-slate-300 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300 pb-24",
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
      )}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} plan={plan} wakeLockEnabled={wakeLockEnabled} setWakeLockEnabled={setWakeLockEnabled} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {sharedPlanMsg && (
        <div className="mx-auto max-w-md px-4 pt-3 sm:max-w-xl lg:max-w-4xl">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-600/10 px-4 py-2.5 text-sm font-semibold text-emerald-400">
            <span>{sharedPlanMsg}</span>
            <button onClick={() => setSharedPlanMsg(null)} className="text-emerald-400/60 hover:text-emerald-300 text-lg leading-none">✕</button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-md space-y-4 px-4 py-4 sm:max-w-xl lg:max-w-4xl">
        {view === "workout" && (
          <WorkoutView
            plan={plan}
            session={session}
            selectedDayId={selectedDayId}
            setSelectedDayId={setSelectedDayId}
            progressMap={progressMap}
            setProgressMap={setProgressMap}
            weightsMap={weightsMap}
            setWeightsMap={setWeightsMap}
            setView={switchTab}
            saveSession={handleSaveAndRefresh}
            soundEnabled={soundEnabled}
            timerSeconds={timerSeconds}
            setTimerSeconds={setTimerSeconds}
            timerRunning={timerRunning}
            setTimerRunning={setTimerRunning}
            restOverride={restOverride}
            setRestOverride={setRestOverride}
          />
        )}
        {view === "plan" && (
          <PlanView
            plan={plan}
            onApplyPlan={onApplyPlan}
            onResetPlan={onResetPlan}
            setSelectedDayId={setSelectedDayId}
            setView={switchTab}
            initialPromptOptions={loadedPromptOptions}
          />
        )}
        {view === "history" && (
          <HistoryView
            completedSessions={historyLog}
            setView={switchTab}
          />
        )}
      </main>

      <BottomNav view={view} setView={switchTab} />

      {dbError && !toastDismissed && (
        <Toast
          message={dbError}
          type="error"
          onClose={() => setToastDismissed(true)}
        />
      )}

      {showBackGuard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={cn(
            "w-full max-w-sm rounded-2xl border p-6 shadow-2xl",
            darkMode
              ? "bg-slate-900 border-slate-700 text-slate-100"
              : "bg-white border-slate-200 text-slate-900"
          )}>
            <h2 className="text-lg font-bold mb-2">Leave workout?</h2>
            <p className={cn("text-sm mb-6", darkMode ? "text-slate-400" : "text-slate-500")}>
              Your progress has been saved automatically. Return to the app anytime to continue where you left off.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBackGuard(false)}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Stay
              </button>
              <button
                onClick={() => { setShowBackGuard(false); window.location.href = "/"; }}
                className={cn(
                  "flex-1 rounded-xl py-2.5 text-sm font-semibold border transition-colors",
                  darkMode
                    ? "border-slate-600 text-slate-400 hover:text-slate-200"
                    : "border-slate-300 text-slate-500 hover:text-slate-700"
                )}
              >
                Leave anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
