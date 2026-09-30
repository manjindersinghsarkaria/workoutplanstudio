import React, { useState } from "react";
import { Save, Check } from "lucide-react";
import type { WorkoutSession, CompletedSession } from "@/types/workout";
import { flattenExercises, findActiveDay } from "@/utils/workoutDerived";
import { cn } from "@/utils";

interface SaveSessionButtonProps {
  session: WorkoutSession | null;
  onSave: () => Promise<CompletedSession> | CompletedSession;
  /** Fallback when no WorkoutSession is active — derived from legacy progressMap */
  legacyHasCompletedSets?: boolean;
  className?: string;
}

/**
 * Disabled when no sets have been completed across the active day.
 * Calls onSave() (which is handleSaveSession() from useWorkout) when clicked.
 * Shows visual feedback while saving and on success.
 */
export function SaveSessionButton({ session, onSave, legacyHasCompletedSets = false, className }: SaveSessionButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const hasCompletedSets = React.useMemo(() => {
    if (!session) return legacyHasCompletedSets;
    const activeDay = findActiveDay(session);
    if (!activeDay) return legacyHasCompletedSets;
    return flattenExercises(activeDay).some((ex) => ex.completedSetIds.length > 0);
  }, [session, legacyHasCompletedSets]);

  const disabled = !hasCompletedSets || status === "saving";

  async function handleClick() {
    if (disabled) return;
    setStatus("saving");
    try {
      await onSave();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label="Save workout session"
      className={cn(
        "flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black shadow-sm transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        status === "saved"
          ? "bg-gradient-to-r from-emerald-500 to-green-400 text-white"
          : status === "saving"
          ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white opacity-80"
          : !hasCompletedSets
          ? "border border-slate-300 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          : "cursor-pointer bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:opacity-95 active:scale-95",
        className,
      )}
    >
      {status === "saved"
        ? <Check className="h-4 w-4" aria-hidden="true" />
        : <Save className={cn("h-4 w-4", status === "saving" && "animate-pulse")} aria-hidden="true" />
      }
      Save Session
    </button>
  );
}
