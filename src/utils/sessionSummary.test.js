import { describe, it, expect } from "vitest";
import { parseRepsUpper, estimateSessionVolume } from "./sessionSummary.js";

describe("parseRepsUpper", () => {
  it("reads the upper number of a range", () => {
    expect(parseRepsUpper("10-12")).toBe(12);
    expect(parseRepsUpper("8")).toBe(8);
  });

  it("ignores time-based reps", () => {
    expect(parseRepsUpper("30 sec")).toBe(0);
    expect(parseRepsUpper("")).toBe(0);
  });
});

describe("estimateSessionVolume", () => {
  const planExercises = [{ id: "e1", reps: "10-12" }];

  it("sums weight × upper reps per completed set, in kg", () => {
    const snapshot = {
      completedExercises: [
        {
          id: "e1",
          name: "Barbell Squat",
          totalSets: 3,
          completedSetIds: ["set_1", "set_2"],
          setLogs: [
            { setId: "set_1", weight: { value: 25, unit: "kg" } },
            { setId: "set_2", weight: { value: 25, unit: "kg" } },
          ],
        },
      ],
    };
    // 25 kg × 12 reps × 2 sets = 600 kg
    expect(estimateSessionVolume(snapshot, planExercises)).toBe(600);
  });

  it("converts lb to kg", () => {
    const snapshot = {
      completedExercises: [
        {
          id: "e1",
          name: "Barbell Squat",
          totalSets: 1,
          completedSetIds: ["set_1"],
          setLogs: [{ setId: "set_1", weight: { value: 100, unit: "lb" } }],
        },
      ],
    };
    // 100 lb ≈ 45.36 kg × 12 reps ≈ 544 kg
    expect(estimateSessionVolume(snapshot, planExercises)).toBe(544);
  });

  it("is zero when no weight was logged", () => {
    const snapshot = {
      completedExercises: [
        { id: "e1", name: "Plank", totalSets: 1, completedSetIds: ["set_1"], setLogs: [{ setId: "set_1" }] },
      ],
    };
    expect(estimateSessionVolume(snapshot, [{ id: "e1", reps: "30 sec" }])).toBe(0);
  });
});
