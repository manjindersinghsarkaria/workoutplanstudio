// src/types/workout.ts

export type NavTab = "workout" | "plan" | "history";

export interface WeightEntry {
  value: number;
  unit: "kg" | "lb";
}

export interface SetLog {
  setId: string;           // matches a value in Exercise.completedSetIds
  completedAt: string;     // ISO 8601 timestamp
  weight?: WeightEntry;    // null/omitted when no weight was entered
}

export interface ExerciseAlternative {
  id: string;
  name: string;
  note?: string;
}

export interface Exercise {
  id: string;
  name: string;
  repsMin: number;
  repsMax: number;
  restSec: number;
  totalSets: number;
  completedSetIds: string[];   // e.g. ["set_1", "set_2"] — length = completed count
  setLogs: SetLog[];
  coachingNote?: string;
  alternatives: ExerciseAlternative[];
}

export interface WorkoutSection {
  id: string;
  type: "warmup" | "main" | "cooldown";
  label: string;           // e.g. "Warm-Up" — rendered directly, no transformation
  exercises: Exercise[];
}

export interface WorkoutDay {
  id: string;
  label: string;           // e.g. "Day 1"
  title: string;           // e.g. "Chest + Triceps"
  subtitleTag: string;     // e.g. "Push A" — frontend composes full subtitle from this
  sections: WorkoutSection[];
}

export interface WorkoutSession {
  id: string;
  planName: string;
  weekLabel: string;
  activeDayId: string;       // reference into days[]
  activeExerciseId: string;  // reference into the active day's exercises
  activeTab: NavTab;
  days: WorkoutDay[];
  selectedAlternates: Record<string, string>; // workoutStepId -> alternateId
}

// --- History ---

export interface CompletedExercise {
  id: string;
  name: string;
  totalSets: number;
  completedSetIds: string[];
  setLogs: SetLog[];
  isAlternate: boolean;          // True if alternate was used
  baseExerciseName?: string;     // Original exercise name (when alternate used)
}

export interface CompletedSession {
  id: string;
  savedAt: string;           // ISO 8601 timestamp
  planName: string;
  weekLabel: string;
  dayLabel: string;
  dayTitle: string;
  completionPercent: number;
  completedExercises: CompletedExercise[];
}
