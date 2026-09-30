// src/utils/workoutDerived.ts
import type { Exercise, WorkoutDay, WorkoutSession, CompletedSession } from "../types/workout";

export interface PersonalRecord {
  weight: number;
  unit: "kg" | "lb";
  date: string; // ISO 8601 — the savedAt of the session where this PR was set
}

/**
 * Derives the best (heaviest) logged weight per exercise across all sessions.
 * Comparison is always done in kg so mixed units are handled correctly.
 */
export function calcPersonalRecords(sessions: CompletedSession[]): Record<string, PersonalRecord> {
  const prs: Record<string, PersonalRecord> = {};

  for (const session of sessions) {
    for (const ex of session.completedExercises) {
      for (const log of ex.setLogs) {
        if (!log.weight) continue;
        const weightKg = log.weight.unit === "lb" ? log.weight.value * 0.453592 : log.weight.value;
        const current = prs[ex.name];
        const currentKg = current
          ? (current.unit === "lb" ? current.weight * 0.453592 : current.weight)
          : -Infinity;
        if (weightKg > currentKg) {
          prs[ex.name] = { weight: log.weight.value, unit: log.weight.unit, date: session.savedAt };
        }
      }
    }
  }

  return prs;
}

/**
 * Builds the subtitle line for a day card.
 * e.g. "Push A • 5 exercises • 17 sets"
 * Validates: Requirements 1.5, 2.3, 8.1
 */
export function buildSubtitle(day: WorkoutDay): string {
  const exercises = flattenExercises(day);
  const totalSets = exercises.reduce((sum, ex) => sum + ex.totalSets, 0);
  return `${day.subtitleTag} • ${exercises.length} exercises • ${totalSets} sets`;
}

/**
 * Calculates the progress percentage for a day.
 * Returns 0 when there are no sets to avoid division by zero.
 * Validates: Requirements 2.4, 8.4
 */
export function calcProgressPercent(day: WorkoutDay): number {
  const exercises = flattenExercises(day);
  const totalCompleted = exercises.reduce((sum, ex) => sum + ex.completedSetIds.length, 0);
  const totalSets = exercises.reduce((sum, ex) => sum + ex.totalSets, 0);
  return totalSets === 0 ? 0 : Math.round((totalCompleted / totalSets) * 100);
}

/**
 * Returns the current set display string for an exercise.
 * e.g. "2 / 4"
 * Validates: Requirements 4.2, 4.4, 8.2
 */
export function currentSetDisplay(ex: Exercise): string {
  const current = Math.min(ex.completedSetIds.length + 1, ex.totalSets);
  return `${current} / ${ex.totalSets}`;
}

/**
 * Returns the reps display string for an exercise.
 * e.g. "10-12" or "10" when repsMin === repsMax
 * Validates: Requirements 4.2, 8.3
 */
export function repsDisplay(ex: Exercise): string {
  return ex.repsMin === ex.repsMax ? `${ex.repsMin}` : `${ex.repsMin}-${ex.repsMax}`;
}

/**
 * Flattens all exercises from all sections of a day into a single array.
 * Validates: Requirements 2.4, 8.1
 */
export function flattenExercises(day: WorkoutDay): Exercise[] {
  return day.sections.flatMap((s) => s.exercises);
}

/**
 * Finds the active day in a session.
 * Falls back to days[0] if activeDayId doesn't match — never throws.
 * Validates: Requirements 1.5
 */
export function findActiveDay(session: WorkoutSession): WorkoutDay | null {
  if (session.days.length === 0) return null;
  return session.days.find((d) => d.id === session.activeDayId) ?? session.days[0];
}

/**
 * Finds the active exercise in a session.
 * Returns the first incomplete exercise, or the last exercise if all are done.
 * Returns null if there are no exercises.
 * Validates: Requirements 8.1–8.5
 */
export function findActiveExercise(session: WorkoutSession): Exercise | null {
  const day = findActiveDay(session);
  if (!day) return null;
  const allExercises = flattenExercises(day);
  if (allExercises.length === 0) return null;
  return (
    allExercises.find((ex) => ex.completedSetIds.length < ex.totalSets) ??
    allExercises[allExercises.length - 1]
  );
}
