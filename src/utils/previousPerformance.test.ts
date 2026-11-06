import { describe, it, expect } from "vitest";
import {
  findLastSessionForExercise,
  getLastPerformanceForExercise,
} from "./previousPerformance";
import type { CompletedSession } from "../types/workout";

function session(savedAt: string, exercises: string[]): CompletedSession {
  return {
    id: `session_${savedAt}`,
    savedAt,
    planName: "PPL",
    weekLabel: "",
    dayLabel: "Day 1",
    dayTitle: "Push",
    completionPercent: 100,
    completedExercises: exercises.map((name) => ({
      id: name,
      name,
      totalSets: 3,
      completedSetIds: ["set_1", "set_2", "set_3"],
      setLogs: [
        { setId: "set_1", completedAt: savedAt, weight: { value: 25, unit: "kg" as const } },
        { setId: "set_2", completedAt: savedAt, weight: { value: 25, unit: "kg" as const } },
      ],
      isAlternate: false,
    })),
  };
}

describe("findLastSessionForExercise", () => {
  it("returns the most recent session containing the exercise", () => {
    const sessions = [
      session("2026-11-01T10:00:00.000Z", ["Barbell Squat"]),
      session("2026-11-05T10:00:00.000Z", ["Barbell Squat", "Bench Press"]),
    ];
    expect(findLastSessionForExercise(sessions, "Barbell Squat")?.savedAt).toBe(
      "2026-11-05T10:00:00.000Z"
    );
  });

  it("returns null when no session contains the exercise", () => {
    expect(findLastSessionForExercise([session("2026-11-01T10:00:00.000Z", ["Bench Press"])], "Barbell Squat")).toBeNull();
  });

  it("matches an alternate by its base exercise name", () => {
    const alt = session("2026-11-05T10:00:00.000Z", ["Goblet Squat"]);
    alt.completedExercises[0].isAlternate = true;
    alt.completedExercises[0].baseExerciseName = "Barbell Squat";
    expect(findLastSessionForExercise([alt], "Barbell Squat")?.savedAt).toBe(
      "2026-11-05T10:00:00.000Z"
    );
  });

  it("matches case-insensitively", () => {
    const sessions = [session("2026-11-05T10:00:00.000Z", ["Barbell Squat"])];
    expect(findLastSessionForExercise(sessions, "barbell squat")).not.toBeNull();
  });
});

describe("getLastPerformanceForExercise", () => {
  it("returns completed sets and weights from the last session", () => {
    const sessions = [session("2026-11-05T10:00:00.000Z", ["Barbell Squat"])];
    const perf = getLastPerformanceForExercise(sessions, "Barbell Squat");
    expect(perf?.completedSets).toBe(3);
    expect(perf?.weights).toEqual([
      { value: 25, unit: "kg" },
      { value: 25, unit: "kg" },
    ]);
  });

  it("returns null with no history", () => {
    expect(getLastPerformanceForExercise([], "Barbell Squat")).toBeNull();
  });
});
