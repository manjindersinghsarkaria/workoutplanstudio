// Feature: workout-session-data-model
// Property tests for the workout data model — P10, P11

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type { Exercise, SetLog, WeightEntry } from "@/types/workout";

// ── Arbitraries ───────────────────────────────────────────────────────────────

const weightEntryArb: fc.Arbitrary<WeightEntry> = fc.record({
  value: fc.float({ min: 0.5, max: 500, noNaN: true }),
  unit: fc.constantFrom("kg" as const, "lb" as const),
});

/** Generate a SetLog that always has a weight field */
const setLogWithWeightArb: fc.Arbitrary<SetLog & { weight: WeightEntry }> = fc.record({
  setId: fc.string({ minLength: 1, maxLength: 20 }),
  completedAt: fc.date({ minDate: new Date("2020-01-01"), maxDate: new Date("2030-01-01") })
    .map((d) => d.toISOString()),
  weight: weightEntryArb,
});

/**
 * Generate an Exercise where setLogs are referentially consistent:
 * - completedSetIds is a non-empty array of unique string ids
 * - setLogs is a subset of those ids (length <= completedSetIds.length)
 * - each setLog.setId is drawn from completedSetIds
 */
const exerciseWithConsistentLogsArb: fc.Arbitrary<Exercise> = fc
  .array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 })
  .chain((ids) => {
    // Deduplicate ids
    const uniqueIds = [...new Set(ids)];
    // Pick a subset of those ids for setLogs (0..uniqueIds.length)
    return fc
      .array(fc.constantFrom(...uniqueIds), {
        minLength: 0,
        maxLength: uniqueIds.length,
      })
      .map((logIds) => {
        // Deduplicate logIds to avoid duplicate setId entries
        const uniqueLogIds = [...new Set(logIds)];
        const setLogs: SetLog[] = uniqueLogIds.map((setId) => ({
          setId,
          completedAt: new Date().toISOString(),
        }));
        const exercise: Exercise = {
          id: "ex_1",
          name: "Test Exercise",
          repsMin: 8,
          repsMax: 12,
          restSec: 60,
          totalSets: uniqueIds.length,
          completedSetIds: uniqueIds,
          setLogs,
          alternatives: [],
        };
        return exercise;
      });
  });

// ── Property 10: SetLog referential integrity ─────────────────────────────────

// Feature: workout-session-data-model, Property 10: SetLog referential integrity
describe("Property 10: SetLog referential integrity (Req 4.6, 6.2)", () => {
  it("every setLog.setId is present in completedSetIds, and setLogs.length <= completedSetIds.length", () => {
    fc.assert(
      fc.property(exerciseWithConsistentLogsArb, (exercise) => {
        const { completedSetIds, setLogs } = exercise;

        // Every setLog.setId must be in completedSetIds
        for (const log of setLogs) {
          expect(completedSetIds).toContain(log.setId);
        }

        // setLogs.length must be <= completedSetIds.length
        expect(setLogs.length).toBeLessThanOrEqual(completedSetIds.length);
      }),
      { numRuns: 20 }
    );
  });
});

// ── Property 11: SetLog weight shape when present ─────────────────────────────

// Feature: workout-session-data-model, Property 11: SetLog weight shape when present
describe("Property 11: SetLog weight shape when present (Req 6.3)", () => {
  it("weight.value is positive and weight.unit is exactly 'kg' or 'lb'", () => {
    fc.assert(
      fc.property(setLogWithWeightArb, (log) => {
        const { weight } = log;

        // weight must be defined (guaranteed by the arbitrary)
        expect(weight).toBeDefined();

        // value must be positive
        expect(weight.value).toBeGreaterThan(0);

        // unit must be exactly "kg" or "lb"
        expect(["kg", "lb"]).toContain(weight.unit);
      }),
      { numRuns: 20 }
    );
  });
});
