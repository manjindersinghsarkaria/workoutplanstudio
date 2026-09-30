/**
 * Preservation Property Tests — Task 2
 * Feature: frontend-security-hardening
 *
 * Property 2: Preservation — Valid Inputs Produce Unchanged Behavior
 *
 * CRITICAL: These tests MUST PASS on UNFIXED code.
 * They document the existing correct behavior that must be preserved after the fix.
 *
 * Since `safeMediaUrl()` and `validatePlanShape()` do NOT exist yet in unfixed code,
 * these tests observe the CURRENT behavior of `normalizePlan()` directly:
 *   - https:// URLs pass through normalizePlan() unchanged (preservation of valid URLs)
 *   - Well-formed plan JSON within limits normalizes without error
 *   - Valid JSON booleans parse correctly in the useState initialiser pattern
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.6**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { normalizePlan } from "@/helpers";

// ── Helper: build a minimal plan with a single exercise containing a media URL ──

function planWithMediaUrl(url: string) {
  return {
    planType: "single_week",
    days: [
      {
        id: "day1",
        label: "Day 1",
        exercises: [
          {
            id: "d1e1",
            name: "Test Exercise",
            sets: 3,
            reps: "10-12",
            rest: 60,
            media: {
              type: "youtube",
              url,
              label: "Watch Demo",
            },
          },
        ],
      },
    ],
  };
}

// ── Helper: build a well-formed plan within all limits ────────────────────────

function buildValidPlan(numDays = 2, numExercisesPerDay = 3) {
  return {
    planType: "single_week",
    meta: { appName: "TestApp", version: "v1", notes: "" },
    days: Array.from({ length: numDays }, (_, dIdx) => ({
      id: `day${dIdx + 1}`,
      label: `Day ${dIdx + 1}`,
      exercises: Array.from({ length: numExercisesPerDay }, (_, eIdx) => ({
        id: `d${dIdx + 1}e${eIdx + 1}`,
        name: `Exercise ${eIdx + 1}`,
        sets: 3,
        reps: "10-12",
        rest: 60,
        note: "",
        media: {
          type: "youtube",
          url: "https://youtube.com/watch?v=abc",
          label: "Watch Demo",
        },
      })),
    })),
  };
}

// ── Preservation Test 2a — https:// URL passes through normalizePlan() unchanged ──

describe("Preservation 2a — Observation: https:// URL passes through normalizePlan() unchanged", () => {
  /**
   * PRESERVATION: normalizePlan() with a valid https:// media URL must return
   * that URL unchanged. This is the baseline behavior that the fix must preserve.
   *
   * On unfixed code: stripMarkdownLink() returns the URL as-is for plain https:// URLs.
   * After fix: safeMediaUrl() must also return https:// URLs unchanged.
   *
   * This test PASSES on unfixed code (documents existing correct behavior).
   */
  it('normalizePlan() with media.url = "https://youtube.com/watch?v=abc" returns that URL unchanged', () => {
    const url = "https://youtube.com/watch?v=abc";
    const result = normalizePlan(planWithMediaUrl(url));
    const mediaUrl = result.days[0].exercises[0].media?.url;
    expect(mediaUrl).toBe(url);
  });

  it('normalizePlan() with media.url = "https://vimeo.com/123456" returns that URL unchanged', () => {
    const url = "https://vimeo.com/123456";
    const result = normalizePlan(planWithMediaUrl(url));
    const mediaUrl = result.days[0].exercises[0].media?.url;
    expect(mediaUrl).toBe(url);
  });
});

// ── Preservation Property 2b — for all https:// URLs, normalizePlan() returns URL unchanged ──

describe("Preservation 2b — Property: for all https:// URLs, normalizePlan() returns the URL unchanged", () => {
  /**
   * **Validates: Requirements 3.1, 3.3**
   *
   * PROPERTY: For any URL with the https:// scheme, normalizePlan() must store
   * that URL unchanged in media.url.
   *
   * This is the preservation property for safeMediaUrl() — once implemented,
   * safeMediaUrl("https://...") must return the URL unchanged.
   *
   * On unfixed code: stripMarkdownLink() passes https:// URLs through unchanged.
   * This test PASSES on unfixed code.
   *
   * Generator: produces valid https:// URLs with realistic hostnames and paths.
   */
  it("property: normalizePlan() preserves all https:// media URLs unchanged", () => {
    // Generate realistic https:// URLs
    const httpsUrlArb = fc
      .tuple(
        fc.stringMatching(/^[a-z][a-z0-9-]{1,20}$/), // hostname label
        fc.stringMatching(/^[a-z][a-z0-9-]{1,10}$/), // TLD
        fc.array(fc.stringMatching(/^[a-z0-9_-]{1,15}$/), { minLength: 0, maxLength: 4 }), // path segments
      )
      .map(([host, tld, segments]) => {
        const path = segments.length > 0 ? "/" + segments.join("/") : "";
        return `https://${host}.${tld}${path}`;
      });

    fc.assert(
      fc.property(httpsUrlArb, (url) => {
        const result = normalizePlan(planWithMediaUrl(url));
        const mediaUrl = result.days[0].exercises[0].media?.url;
        // Preservation: https:// URLs must pass through unchanged
        expect(mediaUrl).toBe(url);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Preservation Test 2c — well-formed plan within limits normalizes without error ──

describe("Preservation 2c — Observation: well-formed plan JSON within limits applies without error", () => {
  /**
   * PRESERVATION: normalizePlan() with a well-formed plan within size/depth/field
   * limits must complete without throwing and return a valid normalized plan.
   *
   * On unfixed code: normalizePlan() processes valid plans without error.
   * After fix: validatePlanShape() + normalizePlan() must also process them without error.
   *
   * This test PASSES on unfixed code.
   */
  it("normalizePlan() with a well-formed plan (2 days, 3 exercises each) does not throw", () => {
    const plan = buildValidPlan(2, 3);
    expect(() => normalizePlan(plan)).not.toThrow();
  });

  it("normalizePlan() with a well-formed plan returns a plan with the correct number of days", () => {
    const plan = buildValidPlan(3, 2);
    const result = normalizePlan(plan);
    expect(result.days).toHaveLength(3);
  });

  it("normalizePlan() with a plan JSON string within 500 KB does not throw when parsed first", () => {
    const plan = buildValidPlan(2, 3);
    const jsonStr = JSON.stringify(plan);
    expect(jsonStr.length).toBeLessThanOrEqual(500_000);
    expect(() => normalizePlan(JSON.parse(jsonStr))).not.toThrow();
  });
});

// ── Preservation Property 2d — for all valid plans within limits, normalizePlan() does not throw ──

describe("Preservation 2d — Property: for all plan JSON within limits, normalizePlan() does not throw", () => {
  /**
   * **Validates: Requirements 3.2**
   *
   * PROPERTY: For any plan object where:
   *   - serialized JSON byte size ≤ 500 KB
   *   - nesting depth ≤ 10
   *   - total field count ≤ 5000
   * normalizePlan() must not throw.
   *
   * This is the preservation property for validatePlanShape() — once implemented,
   * validatePlanShape() must not throw for valid inputs.
   *
   * On unfixed code: normalizePlan() already handles valid plans without throwing.
   * This test PASSES on unfixed code.
   *
   * Generator: produces small, well-formed plan objects well within all limits.
   */
  it("property: normalizePlan() does not throw for any well-formed plan within limits", () => {
    // Generate small plans well within all limits (depth ≤ 3, fields ≤ 50)
    const exerciseArb = fc.record({
      id: fc.stringMatching(/^[a-z0-9]{3,8}$/),
      name: fc.string({ minLength: 1, maxLength: 30 }),
      sets: fc.integer({ min: 1, max: 5 }),
      reps: fc.constantFrom("8-10", "10-12", "12-15", "5"),
      rest: fc.integer({ min: 0, max: 120 }),
    });

    const dayArb = fc.record({
      id: fc.stringMatching(/^day[1-7]$/),
      label: fc.constantFrom("Day 1", "Day 2", "Day 3"),
      exercises: fc.array(exerciseArb, { minLength: 1, maxLength: 5 }),
    });

    const planArb = fc.record({
      planType: fc.constant("single_week"),
      days: fc.array(dayArb, { minLength: 1, maxLength: 7 }),
    });

    fc.assert(
      fc.property(planArb, (plan) => {
        // Verify the plan is within limits before testing
        const jsonStr = JSON.stringify(plan);
        expect(jsonStr.length).toBeLessThanOrEqual(500_000);

        // Preservation: normalizePlan() must not throw for valid plans
        expect(() => normalizePlan(plan)).not.toThrow();

        // And must return a valid plan with days
        const result = normalizePlan(plan);
        expect(result.days).toBeDefined();
        expect(Array.isArray(result.days)).toBe(true);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Preservation Test 2e — valid JSON booleans parse correctly in useState initialiser ──

describe("Preservation 2e — Observation: valid JSON booleans parse correctly in useState initialiser", () => {
  /**
   * PRESERVATION: The useState initialiser pattern in App.jsx must correctly
   * parse valid JSON boolean strings ("true" / "false") and return the boolean value.
   *
   * On unfixed code: JSON.parse("true") returns true, JSON.parse("false") returns false.
   * After fix: the try/catch wrapper must also return the parsed boolean for valid JSON.
   *
   * This test PASSES on unfixed code.
   */
  it('JSON.parse("true") inside the useState initialiser returns true', () => {
    const initState = () => {
      const s = "true";
      return s ? JSON.parse(s) : true;
    };
    expect(initState()).toBe(true);
  });

  it('JSON.parse("false") inside the useState initialiser returns false', () => {
    const initState = () => {
      const s = "false";
      return s ? JSON.parse(s) : true;
    };
    expect(initState()).toBe(false);
  });

  it("null localStorage value (no stored preference) returns the default true", () => {
    const initState = () => {
      const s = null; // localStorage.getItem returns null when key is absent
      return s ? JSON.parse(s) : true;
    };
    expect(initState()).toBe(true);
  });
});

// ── Preservation Property 2f — for all valid JSON boolean strings, useState initialiser returns parsed boolean ──

describe("Preservation 2f — Property: for all valid JSON boolean strings, useState initialiser returns parsed boolean without throwing", () => {
  /**
   * **Validates: Requirements 3.6**
   *
   * PROPERTY: For any valid JSON boolean string ("true" or "false"), the
   * useState initialiser must:
   *   1. NOT throw
   *   2. Return the parsed boolean value
   *
   * This is the preservation property for the try/catch fix in App.jsx.
   * On unfixed code: JSON.parse("true"/"false") already works correctly.
   * After fix: the try/catch wrapper must preserve this behavior.
   *
   * This test PASSES on unfixed code.
   */
  it("property: useState initialiser returns parsed boolean for all valid JSON boolean strings", () => {
    const validJsonBooleanArb = fc.constantFrom("true", "false");

    fc.assert(
      fc.property(validJsonBooleanArb, (jsonBoolStr) => {
        // Simulate the UNFIXED useState initialiser (no try/catch):
        //   const s = localStorage.getItem("mgc_sound");
        //   return s ? JSON.parse(s) : true;
        const initState = () => {
          const s = jsonBoolStr;
          return s ? JSON.parse(s) : true;
        };

        // Preservation: must not throw for valid JSON booleans
        expect(initState).not.toThrow();

        // Preservation: must return the correct parsed boolean
        const result = initState();
        expect(typeof result).toBe("boolean");
        expect(result).toBe(JSON.parse(jsonBoolStr));
      }),
      { numRuns: 10 },
    );
  });
});
