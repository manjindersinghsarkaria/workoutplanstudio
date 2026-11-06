import { describe, it, expect } from "vitest";
import { buildBackup, parseBackup, sessionsToCsv } from "./backup.js";

const plan = {
  planType: "single_week",
  days: [{ id: "day1", exercises: [{ id: "e1", name: "Barbell Squat", sets: 3 }] }],
};
const sessions = [
  {
    id: "session_1",
    savedAt: "2026-11-05T10:00:00.000Z",
    planName: "PPL",
    dayLabel: "Day 1",
    completionPercent: 100,
    completedExercises: [
      {
        id: "e1",
        name: "Barbell Squat",
        totalSets: 3,
        completedSetIds: ["set_1", "set_2"],
        setLogs: [
          { setId: "set_1", completedAt: "2026-11-05T10:00:00.000Z", weight: { value: 25, unit: "kg" } },
          { setId: "set_2", completedAt: "2026-11-05T10:00:00.000Z", weight: { value: 25, unit: "kg" } },
        ],
      },
    ],
  },
];

describe("buildBackup / parseBackup round-trip", () => {
  it("exports and re-imports the same plan and sessions", () => {
    const json = JSON.stringify(buildBackup({ plan, sessions }));
    const parsed = parseBackup(json);
    expect(parsed.plan).toEqual(plan);
    expect(parsed.sessions).toEqual(sessions);
  });

  it("rejects files that are not JSON", () => {
    expect(() => parseBackup("not json")).toThrow("valid JSON");
  });

  it("rejects a backup from another app", () => {
    expect(() =>
      parseBackup(JSON.stringify({ app: "other-app", version: 1, plan, sessions }))
    ).toThrow("isn't a WorkoutPlanStudio backup");
  });

  it("rejects an unsupported backup version", () => {
    expect(() =>
      parseBackup(JSON.stringify({ app: "workoutplanstudio", version: 99, plan, sessions }))
    ).toThrow("version 99");
  });

  it("rejects a backup missing the plan or sessions", () => {
    expect(() => parseBackup(JSON.stringify({ app: "workoutplanstudio", version: 1 }))).toThrow(
      "missing the workout plan"
    );
  });

  it("rejects an exercise name over 100 characters", () => {
    const badPlan = {
      ...plan,
      days: [{ id: "day1", exercises: [{ id: "e1", name: "x".repeat(101), sets: 3 }] }],
    };
    expect(() =>
      parseBackup(JSON.stringify(buildBackup({ plan: badPlan, sessions: [] })))
    ).toThrow("over 100 characters");
  });
});

describe("sessionsToCsv", () => {
  it("writes a header and one row per exercise", () => {
    const csv = sessionsToCsv(sessions);
    const lines = csv.split("\n");
    expect(lines[0]).toBe("Date,Plan,Day,Exercise,Sets completed,Sets total,Weight");
    expect(lines[1]).toContain("2026-11-05");
    expect(lines[1]).toContain("Barbell Squat");
    expect(lines[1]).toContain("2,3");
    expect(lines[1]).toContain("25 kg; 25 kg");
  });

  it("quotes fields containing commas", () => {
    const csv = sessionsToCsv([
      { ...sessions[0], planName: "Push, Pull" },
    ]);
    expect(csv.split("\n")[1]).toContain('"Push, Pull"');
  });

  it("returns just the header for no sessions", () => {
    expect(sessionsToCsv([])).toBe("Date,Plan,Day,Exercise,Sets completed,Sets total,Weight");
  });
});
