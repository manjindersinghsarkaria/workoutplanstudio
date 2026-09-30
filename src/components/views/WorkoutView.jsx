import React, { useState, useMemo, useRef, useEffect } from "react";
import {
    CalendarDays, Dumbbell, Timer, Flame, ShieldAlert, CheckCircle2,
    RefreshCcw, AlertTriangle, Moon, Sun, Download, Upload, ClipboardPaste,
    History, Home, Settings, ChevronLeft, ChevronRight, FileJson, Trash2,
    Sparkles, Copy, Check, ChevronDown, Zap, Wind, BookOpen, ExternalLink, Lightbulb, X,
    Play, Pause, RotateCcw, Repeat,
} from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InfoTile } from "@/components/ui/InfoTile";
import { DayPickerDropdown } from "@/components/ui/DayPickerDropdown";
import { Toast } from "@/components/ui/Toast";
import { AlternateSelector } from "@/components/ui/AlternateSelector";

import { cn } from "@/utils";
import { getCompletedSets, getWeightValue, formatTime } from "@/helpers";
import { THEME_PRESETS } from "@/constants";
import { buildSubtitle, calcProgressPercent, repsDisplay, currentSetDisplay, findActiveExercise } from "@/utils/workoutDerived";
import { useBeep } from "@/hooks/useBeep";
import { useEffectiveExercise } from "@/hooks/useEffectiveExercise";

export default function WorkoutView({
    plan,
    session,
    selectedDayId,
    setSelectedDayId,
    progressMap,
    setProgressMap,
    weightsMap,
    setWeightsMap,
    setView,
    saveSession,
    soundEnabled = true,
    timerSeconds,
    setTimerSeconds,
    timerRunning,
    setTimerRunning,
    restOverride,
    setRestOverride,
}) {

    const [heroExpanded, setHeroExpanded] = useState(true);
    const [roadmapExpanded, setRoadmapExpanded] = useState(false);
    const [dayPickerOpen, setDayPickerOpen] = useState(false);
    const dayPickerAnchorRef = useRef(null);

    // Always hold the latest saveSession so setTimeout callbacks don't capture a stale closure
    const saveSessionRef = useRef(saveSession);
    saveSessionRef.current = saveSession;

    const beep = useBeep();

    const [showAlternatesFor, setShowAlternatesFor] = useState(null);
    const [showGuideFor, setShowGuideFor] = useState(null);
    const [showWarmUp, setShowWarmUp] = useState(false);
    const [showCoolDown, setShowCoolDown] = useState(false);
    const [toast, setToast] = useState(null);
    const [showCompletedTimer, setShowCompletedTimer] = useState(true);
    const [selectedAlternates, setSelectedAlternates] = useState({});

    // Request notification permission on first timer start
    const requestNotificationPermission = async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            try {
                await Notification.requestPermission();
            } catch (err) {
                console.log('Notification permission request failed:', err);
            }
        }
    };

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    // Hide the completed timer after 3 seconds
    useEffect(() => {
        if (timerSeconds === 0 && !timerRunning) {
            setShowCompletedTimer(true);
            const hideTimer = setTimeout(() => {
                setShowCompletedTimer(false);
            }, 3000);
            return () => clearTimeout(hideTimer);
        } else if (timerRunning || timerSeconds > 0) {
            setShowCompletedTimer(true);
        }
    }, [timerSeconds, timerRunning]);

    useEffect(() => {
        const id = setInterval(() => {
            setTimerSeconds((prev) => {
                if (!timerRunning) return prev;
                
                // Warning beep at 3 seconds
                if (prev === 4 && soundEnabled) {
                    try {
                        beep({ frequency: 660, duration: 0.1, volume: 0.7 });
                    } catch (err) {
                        console.error('Warning beep failed:', err);
                    }
                }
                
                if (prev <= 1) {
                    setTimerRunning(false);
                    if (soundEnabled) {
                        try {
                            // Play a loud triple beep pattern to cut through music
                            beep({ frequency: 880, duration: 0.2, volume: 1.0 });
                            setTimeout(() => {
                                try {
                                    beep({ frequency: 880, duration: 0.2, volume: 1.0 });
                                } catch (err) {
                                    console.error('Second beep failed:', err);
                                }
                            }, 250);
                            setTimeout(() => {
                                try {
                                    beep({ frequency: 1046, duration: 0.3, volume: 1.0 });
                                } catch (err) {
                                    console.error('Third beep failed:', err);
                                }
                            }, 500);
                        } catch (err) {
                            console.error('Completion beeps failed:', err);
                        }
                        
                        // Add vibration for mobile devices
                        try {
                            if ('vibrate' in navigator) {
                                // Vibrate pattern: [vibrate, pause, vibrate, pause, vibrate]
                                navigator.vibrate([200, 100, 200, 100, 400]);
                            }
                        } catch (err) {
                            console.error('Vibration failed:', err);
                        }
                        
                        // Show browser notification if permission granted
                        try {
                            if ('Notification' in window && Notification.permission === 'granted') {
                                new Notification('Rest Complete! 💪', {
                                    body: 'Time for your next set!',
                                    icon: '/icons/icon-192.png',
                                    badge: '/icons/icon-192.png',
                                    tag: 'rest-timer',
                                    requireInteraction: false,
                                    silent: false
                                });
                            }
                        } catch (err) {
                            console.error('Notification failed:', err);
                            // Silently fail - don't crash the app
                        }
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [timerRunning, soundEnabled, beep]);

        const days = useMemo(() => plan.days || [], [plan]);
    const selectedDay = days.find((d) => d.id === selectedDayId) || days[0] || null;
    useEffect(() => { if (!selectedDay && days.length > 0) setSelectedDayId(days[0].id); }, [selectedDay, days, setSelectedDayId]);

        const exercises = useMemo(() => selectedDay?.exercises || [], [selectedDay]);
    const warmUpItems = (plan.includeWarmUp && selectedDay?.warmUp) ? selectedDay.warmUp : [];
    const coolDownItems = (plan.includeCoolDown && selectedDay?.coolDown) ? selectedDay.coolDown : [];
    const dayTheme = selectedDay?.theme || THEME_PRESETS[0];

    const currentExerciseIndex = useMemo(() => {
        for (let i = 0; i < exercises.length; i++) {
            if (getCompletedSets(progressMap, selectedDayId, exercises[i].id) < exercises[i].sets) return i;
        }
        return Math.max(0, exercises.length - 1);
    }, [exercises, progressMap, selectedDayId]);

    const currentExercise = exercises[currentExerciseIndex] || null;

    // Derive effective exercise using useEffectiveExercise hook
    const workoutStepId = currentExercise ? `${selectedDayId}__${currentExercise.id}` : null;
    const effectiveExercise = useEffectiveExercise(
        currentExercise,
        currentExercise?.alternates ?? [],
        workoutStepId ? (selectedAlternates[workoutStepId] ?? null) : null
    );

    // Clear invalid/stale alternate selections from session state
    // If a stored alternateId no longer matches any alternate in the exercise, remove it
    useEffect(() => {
        if (!currentExercise || !workoutStepId) return;
        const storedAlternateId = selectedAlternates[workoutStepId];
        if (!storedAlternateId) return;
        const validAlternates = currentExercise.alternates ?? [];
        const exists = validAlternates.some((alt) => alt.id === storedAlternateId);
        if (!exists) {
            console.warn(
                `[WorkoutView] Clearing invalid selectedAlternateId "${storedAlternateId}" for step "${workoutStepId}" — no matching alternate found.`
            );
            setSelectedAlternates((prev) => {
                const updated = { ...prev };
                delete updated[workoutStepId];
                return updated;
            });
        }
    }, [currentExercise, workoutStepId, selectedAlternates]);

    const currentCompletedSets = currentExercise ? getCompletedSets(progressMap, selectedDayId, currentExercise.id) : 0;
    const dayTotalSets = exercises.reduce((s, ex) => s + ex.sets, 0);
    const dayCompletedSets = exercises.reduce((s, ex) => s + getCompletedSets(progressMap, selectedDayId, ex.id), 0);
    const dayProgressPercent = dayTotalSets > 0 ? Math.round((dayCompletedSets / dayTotalSets) * 100) : 0;

    // WorkoutSession / WorkoutDay integration
    // When a session prop is provided, use it for header strings.
    // Build a WorkoutDay-compatible object from the active day so we can use
    // buildSubtitle() and calcProgressPercent() from workoutDerived.ts.
    const activeDay = session
        ? (session.days.find((d) => d.id === session.activeDayId) ?? session.days[0] ?? null)
        : null;

    // Derive subtitle and progress from WorkoutDay when available, otherwise fall back to legacy values
    const daySummarySubtitle = activeDay
        ? buildSubtitle(activeDay)
        : `${selectedDay?.short || "Plan"} · ${exercises.length} exercises · ${dayTotalSets} sets`;

    const daySummaryProgress = activeDay
        ? calcProgressPercent(activeDay)
        : dayProgressPercent;

    // Header strings: prefer session fields, fall back to plan-level data
    const headerPlanName = session?.planName ?? plan?.name ?? "Workout";
    const headerWeekLabel = session?.weekLabel ?? selectedDay?.weekLabel ?? "";

    // Section chip visibility from WorkoutDay.sections[].type when available
    const hasWarmupSection = activeDay
        ? activeDay.sections.some((s) => s.type === "warmup" && s.exercises.length > 0)
        : warmUpItems.length > 0;
    const hasCooldownSection = activeDay
        ? activeDay.sections.some((s) => s.type === "cooldown" && s.exercises.length > 0)
        : coolDownItems.length > 0;

    // Active Exercise from WorkoutSession — used for repsDisplay / currentSetDisplay
    const activeSessionExercise = session ? findActiveExercise(session) : null;

    function completeSet() {
        if (!currentExercise) return;
        const key = `${selectedDayId}__${effectiveExercise.id}`;
        const current = progressMap[key] || 0;
        if (current >= currentExercise.sets) return;
        const next = current + 1;
        setProgressMap((prev) => ({ ...prev, [key]: next }));
        
        // Check if this was the last set of the day
        const isLastSetOfExercise = next >= currentExercise.sets;
        const allExercisesComplete = exercises.every((ex) => {
            const exKey = `${selectedDayId}__${ex.id}`;
            const completed = ex.id === currentExercise.id ? next : (progressMap[exKey] || 0);
            return completed >= ex.sets;
        });
        
        // Only start rest timer if this is NOT the last set of the last exercise
        const effectiveRest = restOverride ?? effectiveExercise.rest;
        if (effectiveRest > 0 && !allExercisesComplete) {
            setTimerSeconds(effectiveRest);
            setTimerRunning(true);
        }
        
        // Auto-save session when day is complete
        if (allExercisesComplete && saveSession) {
            console.log('[WorkoutView] All exercises complete. Auto-saving session...');
            // Stop any running timer
            setTimerRunning(false);
            // Auto-save session when day is complete
            setTimeout(async () => {
                try {
                    console.log('[WorkoutView] Auto-saving completed session...');
                    await saveSessionRef.current();
                    console.log('[WorkoutView] ✓ Session auto-saved successfully!');
                    showToast('🎉 Workout complete! Session saved to history.', 'success');
                } catch (err) {
                    console.error('[WorkoutView] Failed to auto-save session:', err);
                    showToast('Workout complete, but failed to save. Please try "Save Partial Session".', 'error');
                }
            }, 500);
        }
    }

    function resetDayProgress() {
        if (!selectedDay) return;
        const updated = { ...progressMap };
        selectedDay.exercises.forEach((ex) => delete updated[`${selectedDay.id}__${ex.id}`]);
        setProgressMap(updated);
        setTimerRunning(false); setTimerSeconds(60);
    }

    function goNextDay() { const idx = days.findIndex((d) => d.id === selectedDayId); if (idx < days.length - 1) setSelectedDayId(days[idx + 1].id); setDayPickerOpen(false); }
    function goPrevDay() { const idx = days.findIndex((d) => d.id === selectedDayId); if (idx > 0) setSelectedDayId(days[idx - 1].id); setDayPickerOpen(false); }
    function updateWeight(exerciseId, value) { setWeightsMap((prev) => ({ ...prev, [`${selectedDayId}__${effectiveExercise.id}`]: value })); }

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* HERO CARD — collapsible WorkoutHeader + DaySummaryCard */}
            <SectionCard className="overflow-visible">
                <div className={cn("bg-gradient-to-r text-white", heroExpanded ? "rounded-t-3xl p-5" : "rounded-3xl px-4 py-3", dayTheme.accent)}>

                    {/* ── COLLAPSED: single compact bar ── */}
                    {!heroExpanded && (
                        <div className="flex items-center gap-2">
                            {/* Prev arrow */}
                            <button onClick={goPrevDay} aria-label="Previous workout day"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/20 transition hover:bg-black/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                            </button>

                            {/* Centre info — tapping expands */}
                            <button onClick={() => setHeroExpanded(true)} aria-label="Expand workout summary"
                                className="flex min-w-0 flex-1 flex-col items-center gap-0.5 focus-visible:outline-none overflow-hidden">
                                <div className="flex items-center gap-1.5 text-sm font-black leading-tight w-full justify-center min-w-0">
                                    <span className="truncate max-w-[120px]">{selectedDay?.title || "Workout"}</span>
                                    <span className="shrink-0 text-white/60">·</span>
                                    <span className="shrink-0 text-white/80 truncate max-w-[80px]">{selectedDay?.label}</span>
                                </div>
                                {/* Mini progress bar */}
                                <div className="w-full max-w-[140px]">
                                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                                        <div className="h-full rounded-full bg-white/80 transition-all duration-300" style={{ width: `${daySummaryProgress}%` }} />
                                    </div>
                                </div>
                                <div className="text-xs font-semibold text-white/70">{daySummaryProgress}% done</div>
                            </button>

                            {/* Next arrow */}
                            <button onClick={goNextDay} aria-label="Next workout day"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/20 transition hover:bg-black/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </button>

                            {/* Expand toggle */}
                            <button onClick={() => setHeroExpanded(true)} aria-label="Expand workout summary"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/20 transition hover:bg-black/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                                <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
                            </button>
                        </div>
                    )}

                    {/* ── EXPANDED: full card ── */}
                    {heroExpanded && (<>
                        {/* Header row: plan name + week label + collapse toggle */}
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-base font-black tracking-tight">{headerPlanName}</span>
                                {headerWeekLabel ? (
                                    <span className="rounded-lg bg-white/20 px-2 py-0.5 text-xs font-medium text-white/90">
                                        {headerWeekLabel}
                                    </span>
                                ) : null}
                            </div>
                            <button onClick={() => setHeroExpanded(false)} aria-label="Collapse workout summary"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-black/20 transition hover:bg-black/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            {/* Day picker trigger */}
                            <div ref={dayPickerAnchorRef} className="relative">
                                <button onClick={() => setDayPickerOpen((v) => !v)}
                                    aria-haspopup="listbox" aria-expanded={dayPickerOpen} aria-label="Choose workout day"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-black/20 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                                    {selectedDay?.label || "Workout Day"}
                                    <ChevronDown className={cn("h-3 w-3 transition-transform", dayPickerOpen && "rotate-180")} aria-hidden="true" />
                                </button>
                                {dayPickerOpen && (
                                    <DayPickerDropdown
                                        anchorRef={dayPickerAnchorRef}
                                        days={days}
                                        selectedDayId={selectedDayId}
                                        progressMap={progressMap}
                                        onSelect={setSelectedDayId}
                                        onClose={() => setDayPickerOpen(false)}
                                    />
                                )}
                            </div>
                            <IconBadge className="border-white/30 bg-black/20 text-white"
                                icon={<Flame className="h-3.5 w-3.5" aria-hidden="true" />}
                                text={`${daySummaryProgress}% done`} />
                            {hasWarmupSection && (
                                <span className="inline-flex items-center gap-1 rounded-lg border border-white/40 px-2 py-0.5 text-xs font-medium text-white/90">
                                    <Zap className="h-3 w-3" aria-hidden="true" />Warm-up
                                </span>
                            )}
                            {hasCooldownSection && (
                                <span className="inline-flex items-center gap-1 rounded-lg border border-white/40 px-2 py-0.5 text-xs font-medium text-white/90">
                                    <Wind className="h-3 w-3" aria-hidden="true" />Cool-down
                                </span>
                            )}
                        </div>

                        <div className="text-xl font-black tracking-tight">{selectedDay?.title || "Select a day"}</div>
                        <div className="mt-1 text-sm font-semibold text-white/90">{daySummarySubtitle}</div>

                        <div role="progressbar" aria-valuenow={daySummaryProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Day progress" className="mt-4">
                            <ProgressBar value={daySummaryProgress} />
                        </div>
                    </>)}
                </div>

                {/* Prev / Next — only shown when expanded */}
                {heroExpanded && (
                    <div className="grid grid-cols-2 gap-3 p-4">
                        <button onClick={goPrevDay} aria-label="Previous workout day"
                            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />Prev Day
                        </button>
                        <button onClick={goNextDay} aria-label="Next workout day"
                            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                            Next Day<ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                )}
            </SectionCard>

            {/* WARM-UP */}
            {warmUpItems.length > 0 && (
                <SectionCard className="overflow-hidden">
                    <button onClick={() => setShowWarmUp((v) => !v)} aria-expanded={showWarmUp}
                        className="flex w-full items-center justify-between p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400">
                        <div className="flex items-center gap-2 text-sm font-black text-white">
                            <Zap className="h-4 w-4 text-amber-400" aria-hidden="true" />
                            Warm-Up ({warmUpItems.length} exercises)
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", showWarmUp && "rotate-180")} aria-hidden="true" />
                    </button>
                    {showWarmUp && (
                        <div className="space-y-2 px-4 pb-4">
                            {warmUpItems.map((w, i) => (
                                <div key={i} className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3 py-2.5">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-white truncate">{w.name}</div>
                                            {w.note && <div className="text-xs text-slate-500 truncate">{w.note}</div>}
                                        </div>
                                    </div>
                                    <span className="ml-3 shrink-0 text-xs font-semibold text-slate-400">{w.duration}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>
            )}

            {/* CURRENT EXERCISE */}
            {currentExercise && (
                <SectionCard className="overflow-hidden">
                    <div className={cn("bg-gradient-to-r p-4 text-white", dayTheme.accent)}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold uppercase tracking-wider text-white/90">Current Exercise</div>
                                <div className="mt-1 flex items-center gap-2 flex-wrap">
                                    <div className="text-xl font-black leading-tight">{effectiveExercise.name}</div>
                                    {effectiveExercise.isAlternate && (
                                        <span className="inline-flex items-center gap-1 rounded-lg border border-cyan-300 bg-cyan-500 px-2 py-0.5 text-xs font-bold text-white">
                                            <Repeat className="h-3 w-3" aria-hidden="true" />
                                            Using alternate
                                        </span>
                                    )}
                                </div>
                                {/* Compact reps and rest badges */}
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-black/20 px-2.5 py-1">
                                        <Dumbbell className="h-3.5 w-3.5" aria-hidden="true" />
                                        <span className="text-xs font-bold">{activeSessionExercise ? repsDisplay(activeSessionExercise) : effectiveExercise.reps}</span>
                                        <span className="text-[10px] font-medium text-white/70">reps</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-black/20 px-2.5 py-1">
                                        <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                                        <span className="text-xs font-bold">{restOverride ?? effectiveExercise.rest}s</span>
                                        <span className="text-[10px] font-medium text-white/70">rest{restOverride != null ? " ✎" : ""}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-white/30 bg-black/20 px-3 py-2 text-center shrink-0">
                                <div className="text-xs font-bold uppercase tracking-wide text-white">Set</div>
                                <div className="text-lg font-black text-white whitespace-nowrap">
                                    {activeSessionExercise
                                        ? currentSetDisplay(activeSessionExercise)
                                        : `${Math.min(currentCompletedSets + 1, currentExercise.sets)} / ${currentExercise.sets}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 p-4">

                        {/* Coaching note: soft tinted background only — no border + fill combination */}
                        {(() => {
                            const note = activeSessionExercise?.coachingNote ?? effectiveExercise.note;
                            return note ? (
                                <div className="flex gap-3 rounded-xl border-l-2 border-amber-500 bg-slate-800/60 px-4 py-3">
                                    <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <div className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">Coach's Note</div>
                                        <p className="text-sm text-slate-200 leading-relaxed">{note}</p>
                                    </div>
                                </div>
                            ) : null;
                        })()}

                        {/* HOW TO DO THIS — beginner guide */}
                        {effectiveExercise.isAlternate && !effectiveExercise.instructions?.length && !effectiveExercise.formTips?.length && !effectiveExercise.media?.url ? (
                            <div className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-400">
                                <span className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    Step-by-step guide not available for this alternate. Switch back to the original for full instructions.
                                </span>
                            </div>
                        ) : (effectiveExercise.instructions?.length > 0 || effectiveExercise.formTips?.length > 0 || effectiveExercise.media?.url) && (
                            <div>
                                <button
                                    onClick={() => setShowGuideFor(showGuideFor === currentExercise.id ? null : currentExercise.id)}
                                    aria-expanded={showGuideFor === currentExercise.id}
                                    className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                >
                                    <span className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                                        How to do this
                                    </span>
                                    <ChevronDown className={cn("h-4 w-4 transition-transform", showGuideFor === currentExercise.id && "rotate-180")} aria-hidden="true" />
                                </button>

                                {showGuideFor === currentExercise.id && (
                                    <div className="mt-2 space-y-3 rounded-2xl border border-slate-700 bg-slate-800/60 p-4">

                                        {/* Step-by-step instructions */}
                                        {effectiveExercise.instructions?.length > 0 && (
                                            <div>
                                                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-400">Step-by-step</div>
                                                <ol className="space-y-1.5">
                                                    {effectiveExercise.instructions.map((step, i) => (
                                                        <li key={i} className="flex gap-2 text-sm text-slate-200">
                                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{i + 1}</span>
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}

                                        {/* Form tips */}
                                        {effectiveExercise.formTips?.length > 0 && (
                                            <div>
                                                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-amber-400">
                                                    <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />Form tips
                                                </div>
                                                <ul className="space-y-1">
                                                    {effectiveExercise.formTips.map((tip, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Watch demo link */}
                                        {effectiveExercise.media?.url && (
                                            <a
                                                href={effectiveExercise.media.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-4 py-2.5 text-sm font-black text-white shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                                            >
                                                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                                {effectiveExercise.media.label || "Watch Demo"}
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ALTERNATE SELECTOR */}
                        {currentExercise && (
                            <AlternateSelector
                                baseExercise={currentExercise}
                                alternates={currentExercise.alternates ?? []}
                                selectedAlternateId={workoutStepId ? (selectedAlternates[workoutStepId] ?? null) : null}
                                onSelectAlternate={(alternateId) => {
                                    if (workoutStepId) {
                                        // Validate that the alternateId exists in the current exercise's alternates
                                        if (alternateId !== null) {
                                            const validAlternates = currentExercise.alternates ?? [];
                                            const exists = validAlternates.some((alt) => alt.id === alternateId);
                                            if (!exists) {
                                                console.warn(
                                                    `[WorkoutView] onSelectAlternate: alternateId "${alternateId}" not found in alternates for exercise "${currentExercise.id}". Ignoring selection.`
                                                );
                                                return;
                                            }
                                        }
                                        setSelectedAlternates((prev) => ({
                                            ...prev,
                                            [workoutStepId]: alternateId,
                                        }));
                                    }
                                }}
                            />
                        )}

                        {/* SET DOTS */}
                        <div>
                            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">Set Progress</div>
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: currentExercise.sets }).map((_, idx) => {
                                    const done = idx < currentCompletedSets;
                                    const cur = idx === currentCompletedSets && currentCompletedSets < currentExercise.sets;
                                    if (cur) {
                                        // Tappable: current set pill — full interactive affordance
                                        return (
                                            <button
                                                key={idx}
                                                onClick={completeSet}
                                                aria-label={`Complete set ${idx + 1}`}
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-black transition-all",
                                                    "cursor-pointer active:scale-95 hover:border-emerald-500 hover:bg-emerald-50",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                                                    "border-cyan-500 bg-cyan-500 text-white ring-2 ring-cyan-400/40"
                                                )}
                                            >
                                                {idx + 1}
                                            </button>
                                        );
                                    }
                                    // Display-only: done or pending — no filled background, no button styling
                                    return (
                                        <div
                                            key={idx}
                                            aria-label={done ? `Set ${idx + 1} complete` : `Set ${idx + 1} pending`}
                                            className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-black",
                                                done
                                                    ? "border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
                                                    : "border-slate-300 text-slate-400 dark:border-slate-600 dark:text-slate-500"
                                            )}
                                        >
                                            {done ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : idx + 1}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* WEIGHT INPUT */}
                        <div>
                            <label htmlFor={`weight-${currentExercise.id}`} className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                                Weight Used (optional)
                            </label>
                            <input id={`weight-${currentExercise.id}`} type="text" inputMode="decimal" placeholder="e.g. 25 lb or 12.5 kg"
                                value={getWeightValue(weightsMap, selectedDayId, effectiveExercise.id)}
                                onChange={(e) => updateWeight(currentExercise.id, e.target.value)}
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30" />
                        </div>

                        {/* ACTION BUTTON - Full width Complete Set */}
                        <button onClick={completeSet} disabled={currentCompletedSets >= currentExercise.sets}
                            aria-disabled={currentCompletedSets >= currentExercise.sets}
                            className={cn("w-full rounded-2xl px-4 py-4 text-sm font-black text-white shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                currentCompletedSets >= currentExercise.sets
                                    ? "cursor-not-allowed bg-slate-400 dark:bg-slate-600"
                                    : "cursor-pointer active:scale-95 bg-gradient-to-r from-emerald-600 to-green-500 hover:opacity-95 focus-visible:ring-emerald-500")}>
                            Complete Set
                        </button>
                    </div>
                </SectionCard>
            )}

            {/* COOL-DOWN */}
            {coolDownItems.length > 0 && (
                <SectionCard className="overflow-hidden">
                    <button onClick={() => setShowCoolDown((v) => !v)} aria-expanded={showCoolDown}
                        className="flex w-full items-center justify-between p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400">
                        <div className="flex items-center gap-2 text-sm font-black text-white">
                            <Wind className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                            Cool-Down ({coolDownItems.length} stretches)
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", showCoolDown && "rotate-180")} aria-hidden="true" />
                    </button>
                    {showCoolDown && (
                        <div className="space-y-2 px-4 pb-4">
                            {coolDownItems.map((c, i) => (
                                <div key={i} className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3 py-2.5">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-white truncate">{c.name}</div>
                                            {c.note && <div className="text-xs text-slate-500 truncate">{c.note}</div>}
                                        </div>
                                    </div>
                                    <span className="ml-3 shrink-0 text-xs font-semibold text-slate-400">{c.duration}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>
            )}

            {/* ROADMAP */}
            <SectionCard className="overflow-hidden">
                {/* Header row — always visible, toggles expand/collapse */}
                <button
                    onClick={() => setRoadmapExpanded((v) => !v)}
                    aria-expanded={roadmapExpanded}
                    className="flex w-full items-center justify-between p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
                >
                    <div className="flex items-center gap-2 text-sm font-black text-white">
                        <Dumbbell className="h-4 w-4 text-slate-400" aria-hidden="true" />
                        Workout Roadmap
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400">
                            {dayCompletedSets}/{dayTotalSets} sets
                        </span>
                        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", roadmapExpanded && "rotate-180")} aria-hidden="true" />
                    </div>
                </button>

                {/* Collapsed summary: current exercise progress */}
                {!roadmapExpanded && currentExercise && (
                    <div className="px-4 pb-4">
                        <div className="rounded-2xl border border-blue-500/30 bg-blue-950/40 p-3">
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-xs font-bold uppercase tracking-wide text-blue-400">Current</div>
                                    <div className="text-sm font-black text-white truncate">{currentExercise.name}</div>
                                </div>
                                <span className="shrink-0 rounded-lg border border-blue-400 px-2 py-0.5 text-xs font-bold text-blue-300">
                                    {currentCompletedSets}/{currentExercise.sets}
                                </span>
                            </div>
                            <ProgressBar value={currentExercise.sets ? Math.round((currentCompletedSets / currentExercise.sets) * 100) : 0} />
                        </div>
                    </div>
                )}

                {/* Expanded: full exercise list */}
                {roadmapExpanded && (
                    <div className="space-y-3 px-4 pb-4">
                        {exercises.map((ex, idx) => {
                            const done = getCompletedSets(progressMap, selectedDayId, ex.id);
                            const pct = ex.sets ? Math.round((done / ex.sets) * 100) : 0;
                            const isCurrent = idx === currentExerciseIndex;
                            const isDone = done >= ex.sets;
                            return (
                                <div key={ex.id} className={cn("rounded-2xl border p-3 transition-all",
                                    isCurrent ? "border-blue-500/30 bg-blue-950/40"
                                        : isDone ? "border-emerald-500/30 bg-emerald-950/40"
                                            : "border-slate-700 bg-slate-800")}>
                                    <div className="mb-2 flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 text-sm font-black text-white">
                                                {ex.name}
                                                {(ex.instructions?.length > 0 || ex.media?.url) && (
                                                    <BookOpen className="h-3.5 w-3.5 shrink-0 text-blue-400" aria-label="Guide available" />
                                                )}
                                            </div>
                                            <div className="mt-1 text-xs font-medium text-slate-400">{ex.reps} · {ex.rest}s rest</div>
                                        </div>
                                        <span className={cn("shrink-0 rounded-lg border px-2 py-0.5 text-xs font-bold",
                                            isDone ? "border-emerald-400 text-emerald-300"
                                                : isCurrent ? "border-blue-400 text-blue-300"
                                                    : "border-slate-600 text-slate-400")}>
                                            {done}/{ex.sets}
                                        </span>
                                    </div>
                                    <ProgressBar value={pct} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </SectionCard>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={resetDayProgress}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-black text-slate-300 hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                    <RefreshCcw className="h-4 w-4" aria-hidden="true" />Reset Day
                </button>
                <button onClick={() => setView("plan")}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg hover:from-blue-500 hover:to-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                    <Settings className="h-4 w-4" aria-hidden="true" />Manage Plan
                </button>
            </div>

            {/* MANUAL SAVE SESSION - Only show if there's progress but day not complete */}
            {saveSession && dayCompletedSets > 0 && dayCompletedSets < dayTotalSets && (
                <button 
                    onClick={async () => {
                        try {
                            await saveSession();
                            showToast('Session saved! You can continue this workout later.', 'success');
                        } catch (err) {
                            console.error('Failed to save session:', err);
                            showToast('Failed to save session. Please try again.', 'error');
                        }
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-500 px-4 py-4 text-sm font-black text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                    <Download className="h-4 w-4" aria-hidden="true" />Save Partial Session
                </button>
            )}

            {/* SAVE SESSION - Removed: Progress now saves automatically */}
            {/* SAFETY NOTE */}
            <SectionCard className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                        <AlertTriangle className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                        <div className="mb-1 text-sm font-bold text-white">Safety Reminder</div>
                        <p className="text-xs leading-relaxed text-slate-400">
                            Listen to your body. If any movement causes sharp pain, joint discomfort, or numbness, stop immediately and skip that exercise. Always warm up before training and consult a healthcare professional if you have any existing injuries or medical conditions.
                        </p>
                    </div>
                </div>
            </SectionCard>

            {/* FLOATING REST TIMER - Shows when timer is running or just completed (hides after 3s) */}
            {(timerRunning || (timerSeconds === 0 && showCompletedTimer) || (timerSeconds > 0 && timerSeconds < 60)) && (
                <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pointer-events-none">
                    <div className="mx-auto max-w-md pointer-events-auto">
                        <div className={cn(
                            "rounded-2xl border p-3 shadow-2xl backdrop-blur-sm transition-all duration-300",
                            timerSeconds === 0 && !timerRunning
                                ? "border-emerald-500 bg-emerald-950/95 animate-pulse"
                                : timerSeconds <= 3 && timerRunning
                                ? "border-amber-500 bg-amber-950/95"
                                : "border-slate-600 bg-slate-800/95"
                        )}>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <Timer className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold text-slate-200">
                                            {timerSeconds === 0 && !timerRunning ? "Rest Complete! 🎉" : "Rest Timer"}
                                        </div>
                                        {effectiveExercise && (
                                            <div className="text-[10px] font-medium text-slate-400 truncate">
                                                {effectiveExercise.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={cn(
                                    "text-xl font-black tabular-nums transition-all shrink-0",
                                    timerSeconds === 0 && !timerRunning
                                        ? "text-emerald-400"
                                        : timerSeconds <= 3 && timerRunning
                                        ? "text-amber-400 text-2xl"
                                        : "text-white"
                                )}>{formatTime(timerSeconds)}</div>
                                <div className="flex gap-1.5 shrink-0">
                                    {/* Play/Pause button */}
                                    <button onClick={() => {
                                        beep({ frequency: 440, duration: 0.05, volume: 0.2 });
                                        if (!timerRunning) requestNotificationPermission();
                                        setTimerRunning((v) => !v);
                                    }} aria-label={timerRunning ? "Pause timer" : "Start timer"}
                                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95 transition-transform">
                                        {timerRunning ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                                    </button>
                                    {/* Reset button */}
                                    <button onClick={() => { setTimerRunning(false); setTimerSeconds(restOverride ?? effectiveExercise?.rest ?? 60); }}
                                        aria-label="Reset timer"
                                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-600 bg-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 active:scale-95 transition-transform">
                                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    {/* Close button */}
                                    <button
                                        onClick={() => {
                                            setTimerRunning(false);
                                            setTimerSeconds(0);
                                            setShowCompletedTimer(false);
                                        }}
                                        aria-label="Close timer"
                                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-600 bg-slate-700 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 active:scale-95 transition-transform"
                                    >
                                        <X className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            {/* Rest duration presets */}
                            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                                {[
                                    { label: "Plan", value: null },
                                    { label: "30s",  value: 30  },
                                    { label: "45s",  value: 45  },
                                    { label: "60s",  value: 60  },
                                    { label: "90s",  value: 90  },
                                    { label: "2m",   value: 120 },
                                    { label: "3m",   value: 180 },
                                ].map(({ label, value }) => {
                                    const isActive = restOverride === value;
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => {
                                                setRestOverride(value);
                                                setTimerRunning(false);
                                                setTimerSeconds(value ?? effectiveExercise?.rest ?? 60);
                                            }}
                                            aria-pressed={isActive}
                                            className={cn(
                                                "shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                                                isActive
                                                    ? "bg-blue-600 text-white"
                                                    : "border border-slate-600 bg-slate-700 text-slate-300 hover:border-blue-500 hover:text-white"
                                            )}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
