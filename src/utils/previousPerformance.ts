// Previous-performance lookup (GAP-01): find the most recent history session
// containing a given exercise, so the workout view can show "last time" and a
// target without the user digging through History. Pure functions — no I/O.
import type { CompletedSession, CompletedExercise } from "../types/workout";

export function normalizeExerciseName(name: string | undefined | null): string {
  return (name ?? "").trim().toLowerCase();
}

function exerciseMatches(ex: CompletedExercise, name: string, baseName?: string): boolean {
  const wanted = [normalizeExerciseName(name)];
  if (baseName) wanted.push(normalizeExerciseName(baseName));
  const candidates = [normalizeExerciseName(ex.name)];
  if (ex.baseExerciseName) candidates.push(normalizeExerciseName(ex.baseExerciseName));
  return candidates.some((c) => c && wanted.includes(c));
}

export function findLastSessionForExercise(
  sessions: CompletedSession[],
  exerciseName: string,
  baseExerciseName?: string
): CompletedSession | null {
  let best: CompletedSession | null = null;
  for (const session of sessions ?? []) {
    const hasExercise = (session.completedExercises ?? []).some((ex) =>
      exerciseMatches(ex, exerciseName, baseExerciseName)
    );
    if (!hasExercise) continue;
    if (!best || new Date(session.savedAt).getTime() > new Date(best.savedAt).getTime()) {
      best = session;
    }
  }
  return best;
}

export interface LastPerformance {
  session: CompletedSession;
  exercise: CompletedExercise;
  date: string;
  completedSets: number;
  /** Weight entries for the completed sets, in log order. */
  weights: { value: number; unit: "kg" | "lb" }[];
}

export function getLastPerformanceForExercise(
  sessions: CompletedSession[],
  exerciseName: string,
  baseExerciseName?: string
): LastPerformance | null {
  const session = findLastSessionForExercise(sessions, exerciseName, baseExerciseName);
  if (!session) return null;
  const exercise = (session.completedExercises ?? []).find((ex) =>
    exerciseMatches(ex, exerciseName, baseExerciseName)
  );
  if (!exercise) return null;
  return {
    session,
    exercise,
    date: session.savedAt,
    completedSets: exercise.completedSetIds.length,
    weights: exercise.setLogs
      .filter((log) => log.weight)
      .map((log) => log.weight!),
  };
}
