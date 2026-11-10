/**
 * Tests for the animated webP exercise demos (HIIT Day 1 pilot).
 * Guards:
 *  - each of the 6 Day-1 library entries points at a real webP file in public/exercises
 *  - enrichPlan() gives those exercises webP media through the normal apply flow
 *  - normalizePlan() keeps a webP media URL (same-origin relative path) on
 *    apply + reload, instead of stripping it like an unsafe URL
 *  - exercises without a webP still fall back to the YouTube search link
 */

import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { APP_SAMPLE_PLANS } from "@/data/appSamplePlans";
import { findExercise } from "@/data/exerciseLibrary";
import { normalizePlan, safeMediaUrl } from "@/helpers";
import { enrichPlan } from "@/utils/enrichPlan";

const SAMPLE = APP_SAMPLE_PLANS.find(
  (p) => p.meta?.notes === "3-Day Dumbbell HIIT — Fat Loss + Muscle Maintenance"
);

const WEBP_BY_EXERCISE: Record<string, string> = {
  "Dumbbell Goblet Squat": "/exercises/goblet-squat.webp",
  "Dumbbell Bent-Over Row": "/exercises/bent-over-row.webp",
  "Dumbbell Romanian Deadlift": "/exercises/romanian-deadlift.webp",
  "Dumbbell Floor Press": "/exercises/floor-press.webp",
  "Dumbbell Reverse Lunge": "/exercises/reverse-lunge.webp",
  "Fast Marching in Place": "/exercises/fast-marching.webp",
};

describe("animated webP exercise demos (HIIT Day 1 pilot)", () => {
  it("each Day-1 exercise has a mediaWebp entry pointing at a real file", () => {
    for (const [name, url] of Object.entries(WEBP_BY_EXERCISE)) {
      const entry = findExercise(name);
      expect(entry, `${name} resolves in the library`).toBeTruthy();
      expect(entry.mediaWebp).toBe(url);
      const file = path.join(process.cwd(), "public", url);
      expect(existsSync(file), `${url} exists`).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(0);
    }
  });

  it("enrichPlan gives Day-1 exercises webP media via the normal apply flow", () => {
    const enriched = enrichPlan(normalizePlan(SAMPLE));
    const day1 = enriched.days[0].exercises;
    expect(day1).toHaveLength(6);
    for (const ex of day1) {
      expect(ex.media?.type).toBe("webp");
      expect(ex.media?.url).toBe(WEBP_BY_EXERCISE[ex.name]);
    }
  });

  it("normalizePlan keeps a webP media URL on apply + reload", () => {
    const enriched = enrichPlan(normalizePlan(SAMPLE));
    const roundTripped = normalizePlan(enriched);
    expect(roundTripped.days[0].exercises[0].media?.type).toBe("webp");
    expect(roundTripped.days[0].exercises[0].media?.url).toBe(
      "/exercises/goblet-squat.webp"
    );
  });

  it("safeMediaUrl allows same-origin paths but still blocks unsafe URLs", () => {
    expect(safeMediaUrl("/exercises/goblet-squat.webp")).toBe(
      "/exercises/goblet-squat.webp"
    );
    expect(safeMediaUrl("https://example.com/x.mp4")).toBe(
      "https://example.com/x.mp4"
    );
    expect(safeMediaUrl("http://example.com/x.mp4")).toBe("");
    expect(safeMediaUrl("//evil.example.com/x.webp")).toBe("");
    expect(safeMediaUrl("javascript:alert(1)")).toBe("");
  });

  it("exercises without a webP still fall back to YouTube", () => {
    const entry = findExercise("Deadlift");
    expect(entry.mediaWebp).toBeUndefined();
    const enriched = enrichPlan(
      normalizePlan({
        meta: {},
        planType: "single_week",
        days: [
          {
            label: "Day 1",
            exercises: [
              { name: "Deadlift", sets: 3, reps: "5", rest: 180 },
            ],
          },
        ],
      })
    );
    expect(enriched.days[0].exercises[0].media?.type).toBe("youtube");
    expect(enriched.days[0].exercises[0].media?.url).toContain("youtube.com");
  });
});

const WEBP_BY_EXERCISE_BATCH2: Record<string, string> = {
  "Dumbbell Sumo Squat": "/exercises/sumo-squat.webp",
  "Dumbbell Farmer March": "/exercises/farmer-march.webp",
  "Supported Split Squat": "/exercises/split-squat.webp",
  "Dumbbell Squat": "/exercises/dumbbell-squat.webp",
  "Standing Knee Drive": "/exercises/knee-drive.webp",
};

describe("animated webP exercise demos (HIIT Days 2–3, batch 1)", () => {
  it("each batch-2 exercise has a mediaWebp entry pointing at a real file", () => {
    for (const [name, url] of Object.entries(WEBP_BY_EXERCISE_BATCH2)) {
      const entry = findExercise(name);
      expect(entry, `${name} resolves in the library`).toBeTruthy();
      expect(entry.mediaWebp).toBe(url);
      const file = path.join(process.cwd(), "public", url);
      expect(existsSync(file), `${url} exists`).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(0);
    }
  });

  it("enrichPlan gives every Day-2 exercise webP media", () => {
    const enriched = enrichPlan(normalizePlan(SAMPLE));
    const day2 = enriched.days[1].exercises;
    expect(day2).toHaveLength(6);
    const expected: Record<string, string> = {
      "Dumbbell Sumo Squat": "/exercises/sumo-squat.webp",
      "Dumbbell Farmer March": "/exercises/farmer-march.webp",
      "Supported Split Squat": "/exercises/split-squat.webp",
      "Dumbbell Bent-Over Row": "/exercises/bent-over-row.webp",
      "Dumbbell Floor Press": "/exercises/floor-press.webp",
      "Side-to-Side Step Touch": "/exercises/step-touch.webp",
    };
    for (const ex of day2) {
      expect(ex.media?.type).toBe("webp");
      expect(ex.media?.url).toBe(expected[ex.name]);
    }
  });

  it("enrichPlan gives every Day-3 exercise webP media", () => {
    const enriched = enrichPlan(normalizePlan(SAMPLE));
    const day3 = enriched.days[2].exercises;
    expect(day3).toHaveLength(6);
    const expected: Record<string, string> = {
      "Dumbbell Squat": "/exercises/dumbbell-squat.webp",
      "Dumbbell Romanian Deadlift": "/exercises/romanian-deadlift.webp",
      "Dumbbell Floor Press": "/exercises/floor-press.webp",
      "Supported One-Arm Row": "/exercises/one-arm-row.webp",
      "Dumbbell Suitcase March": "/exercises/suitcase-march.webp",
      "Standing Knee Drive": "/exercises/knee-drive.webp",
    };
    for (const ex of day3) {
      expect(ex.media?.type).toBe("webp");
      expect(ex.media?.url).toBe(expected[ex.name]);
    }
  });

  it("the same exercise reuses the same webP on every day it appears", () => {
    const enriched = enrichPlan(normalizePlan(SAMPLE));
    const day1Row = enriched.days[0].exercises.find(
      (ex) => ex.name === "Dumbbell Bent-Over Row"
    );
    const day2Row = enriched.days[1].exercises.find(
      (ex) => ex.name === "Dumbbell Bent-Over Row"
    );
    expect(day1Row?.media?.url).toBe("/exercises/bent-over-row.webp");
    expect(day2Row?.media?.url).toBe("/exercises/bent-over-row.webp");
    const day1Press = enriched.days[0].exercises.find(
      (ex) => ex.name === "Dumbbell Floor Press"
    );
    const day3Press = enriched.days[2].exercises.find(
      (ex) => ex.name === "Dumbbell Floor Press"
    );
    expect(day1Press?.media?.url).toBe("/exercises/floor-press.webp");
    expect(day3Press?.media?.url).toBe("/exercises/floor-press.webp");
  });
});

const WEBP_BY_EXERCISE_FINAL: Record<string, string> = {
  "Side-to-Side Step Touch": "/exercises/step-touch.webp",
  "Supported One-Arm Row": "/exercises/one-arm-row.webp",
  "Dumbbell Suitcase March": "/exercises/suitcase-march.webp",
};
describe("animated webP exercise demos (HIIT complete)", () => {
  it("each remaining exercise has a mediaWebp entry pointing at a real file", () => {
    for (const [name, url] of Object.entries(WEBP_BY_EXERCISE_FINAL)) {
      const entry = findExercise(name);
      expect(entry, `${name} resolves in the library`).toBeTruthy();
      expect(entry.mediaWebp).toBe(url);
      const file = path.join(process.cwd(), "public", url);
      expect(existsSync(file), `${url} exists`).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(0);
    }
  });

  it("all 14 distinct HIIT moves carry webP media across the 3 days", () => {
    const enriched = enrichPlan(normalizePlan(SAMPLE));
    const seen = new Map<string, string>();
    for (const day of enriched.days) {
      expect(day.exercises).toHaveLength(6);
      for (const ex of day.exercises) {
        expect(ex.media?.type, `${ex.name} has webP media`).toBe("webp");
        expect(ex.media?.url).toMatch(/^\/exercises\/[\w-]+\.webp$/);
        if (seen.has(ex.name)) {
          expect(ex.media?.url).toBe(seen.get(ex.name));
        } else {
          seen.set(ex.name, ex.media.url);
        }
      }
    }
    expect(seen.size).toBe(14);
  });
});

const WEBP_BY_EXERCISE_PLAN_BATCH1: Record<string, string> = {
  "Barbell Back Squat": "/exercises/back-squat.webp",
  "Overhead Press": "/exercises/overhead-press.webp",
  "Barbell Bench Press": "/exercises/bench-press.webp",
  "Leg Press": "/exercises/leg-press.webp",
  "Lateral Raise": "/exercises/lateral-raise.webp",
  "Leg Curl": "/exercises/leg-curl.webp",
};

describe("animated webP exercise demos (most-used plan exercises, batch 1)", () => {
  it("each batch-1 exercise has a mediaWebp entry pointing at a real file", () => {
    for (const [name, url] of Object.entries(WEBP_BY_EXERCISE_PLAN_BATCH1)) {
      const entry = findExercise(name);
      expect(entry, `${name} resolves in the library`).toBeTruthy();
      expect(entry.mediaWebp).toBe(url);
      const file = path.join(process.cwd(), "public", url);
      expect(existsSync(file), `${url} exists`).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(0);
    }
  });

  it("enrichPlan gives the batch-1 exercises webP media via the normal apply flow", () => {
    const enriched = enrichPlan(
      normalizePlan({
        meta: {},
        planType: "single_week",
        days: [
          {
            label: "Push A",
            exercises: [
              { name: "Barbell Bench Press", sets: 4, reps: "5–7", rest: 180 },
              { name: "Overhead Press", sets: 3, reps: "8–10", rest: 90 },
              { name: "Barbell Back Squat", sets: 4, reps: "5–7", rest: 180 },
              { name: "Leg Press", sets: 3, reps: "10–12", rest: 90 },
              { name: "Lateral Raise", sets: 4, reps: "15–20", rest: 45 },
              { name: "Leg Curl", sets: 3, reps: "12–15", rest: 60 },
            ],
          },
        ],
      })
    );
    for (const ex of enriched.days[0].exercises) {
      expect(ex.media?.type, `${ex.name} has webP media`).toBe("webp");
      expect(ex.media?.url).toBe(WEBP_BY_EXERCISE_PLAN_BATCH1[ex.name]);
    }
  });
});
