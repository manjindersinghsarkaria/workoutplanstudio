/**
 * Smoke tests for the 3-Day Dumbbell HIIT plan.
 *
 * Guards the built-in plan in both of its surfaces:
 *  - APP_SAMPLE_PLANS (PlanView "Use a ready-made plan" picker)
 *  - planTemplates (SEO page /plans/3-day-dumbbell-hiit + "Use This Plan")
 *
 * Also guards that every exercise name in the plan resolves against the
 * local exercise library, so enrichPlan() can fill in instructions,
 * form tips, media and alternates.
 */

import { describe, it, expect } from "vitest";
import { APP_SAMPLE_PLANS } from "@/data/appSamplePlans";
import { getTemplateBySlug } from "@/data/planTemplates";
import { findExercise } from "@/data/exerciseLibrary";
import { normalizePlan } from "@/helpers";
import { enrichPlan } from "@/utils/enrichPlan";

const SAMPLE = APP_SAMPLE_PLANS.find(
  (p) => p.meta?.notes === "3-Day Dumbbell HIIT — Fat Loss + Muscle Maintenance"
);

const DAY_1_EXERCISES = [
  "Dumbbell Goblet Squat",
  "Dumbbell Bent-Over Row",
  "Dumbbell Romanian Deadlift",
  "Dumbbell Floor Press",
  "Dumbbell Reverse Lunge",
  "Fast Marching in Place",
];

describe("3-Day Dumbbell HIIT sample plan (in-app picker)", () => {
  it("exists in APP_SAMPLE_PLANS", () => {
    expect(SAMPLE).toBeDefined();
  });

  it("has 3 days (Mon / Wed / Fri) with 6 exercises each", () => {
    expect(SAMPLE.days).toHaveLength(3);
    expect(SAMPLE.days.map((d) => d.label)).toEqual([
      "Monday",
      "Wednesday",
      "Friday",
    ]);
    for (const day of SAMPLE.days) {
      expect(day.exercises).toHaveLength(6);
    }
  });

  it("maps to the timer model: 3 sets (rounds), 40 sec work, 20 sec rest", () => {
    for (const day of SAMPLE.days) {
      for (const ex of day.exercises) {
        expect(ex.sets).toBe(3);
        expect(ex.rest).toBe(20);
        expect(["40 sec", "40 sec each side"]).toContain(ex.reps);
      }
    }
  });

  it("loads Day 1 with all 6 exercises via the normal apply flow", () => {
    const plan = enrichPlan(normalizePlan(SAMPLE));
    expect(plan.days).toHaveLength(3);
    const day1 = plan.days[0];
    expect(day1.label).toBe("Monday");
    expect(day1.exercises.map((e) => e.name)).toEqual(DAY_1_EXERCISES);
    // Warm-up (5 min) and cool-down (3–5 min) ride along with the day.
    expect(day1.warmUp).toHaveLength(5);
    expect(day1.coolDown).toHaveLength(4);
  });

  it("enriches every exercise from the library (instructions + tips)", () => {
    const plan = enrichPlan(normalizePlan(SAMPLE));
    for (const day of plan.days) {
      for (const ex of day.exercises) {
        expect(
          ex.instructions?.length,
          `${ex.name} should have instructions`
        ).toBeGreaterThan(0);
        expect(
          ex.formTips?.length,
          `${ex.name} should have form tips`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("keeps per-side moves as one exercise with a side-switch note", () => {
    const plan = enrichPlan(normalizePlan(SAMPLE));
    const day3 = plan.days[2];
    const rows = day3.exercises.find((e) => e.name === "Supported One-Arm Row");
    const march = day3.exercises.find((e) => e.name === "Dumbbell Suitcase March");
    expect(rows.reps).toBe("40 sec each side");
    expect(march.reps).toBe("40 sec each side");
    expect(rows.note).toMatch(/switch arms/i);
    expect(march.note).toMatch(/switch hands/i);
  });
});

describe("3-Day Dumbbell HIIT plan template (/plans page)", () => {
  it("resolves by slug with 3 days of 6 exercises", () => {
    const template = getTemplateBySlug("3-day-dumbbell-hiit");
    expect(template).not.toBeNull();
    expect(template.daysPerWeek).toBe(3);
    expect(template.category).toBe("Fat Loss");
    expect(template.equipment).toBe("dumbbells");
    expect(template.days).toHaveLength(3);
    for (const day of template.days) {
      expect(day.exercises).toHaveLength(6);
    }
    expect(template.days[0].exercises.map((e) => e.name)).toEqual(
      DAY_1_EXERCISES
    );
  });

  it("carries warm-up, cool-down, rules and the weekly calendar", () => {
    const template = getTemplateBySlug("3-day-dumbbell-hiit");
    expect(template.warmUp).toHaveLength(5);
    expect(template.coolDown).toHaveLength(4);
    expect(template.rules.length).toBeGreaterThanOrEqual(7);
    expect(template.rules.join(" ")).toMatch(/no overhead presses/i);
    expect(template.weeklySchedule).toHaveLength(7);
    expect(template.weeklySchedule[0]).toEqual({
      day: "Monday",
      activity: "Day 1 — Full Body Strength (workout)",
    });
  });
});

describe("HIIT exercise names resolve in the library", () => {
  it("every distinct exercise in the plan has a library entry", () => {
    const names = new Set();
    for (const day of SAMPLE.days) {
      for (const ex of day.exercises) names.add(ex.name);
    }
    expect(names.size).toBe(14);
    for (const name of names) {
      expect(findExercise(name), `no library entry for "${name}"`).not.toBeNull();
    }
  });
});
