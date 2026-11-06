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
    const entry = findExercise("Barbell Bench Press");
    expect(entry.mediaWebp).toBeUndefined();
    const enriched = enrichPlan(
      normalizePlan({
        meta: {},
        planType: "single_week",
        days: [
          {
            label: "Day 1",
            exercises: [
              { name: "Barbell Bench Press", sets: 3, reps: "10", rest: 60 },
            ],
          },
        ],
      })
    );
    expect(enriched.days[0].exercises[0].media?.type).toBe("youtube");
    expect(enriched.days[0].exercises[0].media?.url).toContain("youtube.com");
  });
});
