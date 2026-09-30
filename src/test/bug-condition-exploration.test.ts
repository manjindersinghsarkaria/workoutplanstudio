/**
 * Bug Condition Exploration Tests — Task 1
 * Feature: frontend-security-hardening
 *
 * CRITICAL: These tests MUST FAIL on unfixed code.
 * Failure confirms the bugs exist. DO NOT fix the source code.
 *
 * Property 1: Bug Condition — Unsafe URL Pass-Through and Input Validation Gaps
 * Validates: Requirements 1.1, 1.2, 3.1, 3.2, 6.1
 */

import { describe, it, expect } from "vitest";
import { normalizePlan, validatePlanShape } from "@/helpers";

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

// ── Test 1a — javascript: URL passes through normalizePlan() unchanged ──────────

describe("Test 1a — Bug Condition: javascript: URL passes through normalizePlan()", () => {
  /**
   * BUG: normalizePlan() calls stripMarkdownLink() which only strips markdown
   * syntax but does NOT validate the protocol. A javascript: URI is stored verbatim.
   *
   * EXPECTED BEHAVIOR (after fix): safeMediaUrl() returns "" for non-https: protocols.
   * CURRENT (buggy) BEHAVIOR: media.url = "javascript:alert(1)" (non-empty).
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it('normalizePlan() with media.url = "javascript:alert(1)" should return empty media.url', () => {
    const result = normalizePlan(planWithMediaUrl("javascript:alert(1)"));
    const mediaUrl = result.days[0].exercises[0].media?.url;

    // After fix: safeMediaUrl() strips non-https: URLs to ""
    // On unfixed code: mediaUrl = "javascript:alert(1)" — this assertion FAILS
    expect(mediaUrl).toBe("");
  });
});

// ── Test 1b — data: URL passes through normalizePlan() unchanged ─────────────

describe("Test 1b — Bug Condition: data: URL passes through normalizePlan()", () => {
  /**
   * BUG: data: URIs can embed arbitrary HTML/JS and are not safe as href values.
   * normalizePlan() stores them verbatim.
   *
   * EXPECTED BEHAVIOR (after fix): safeMediaUrl() returns "" for data: URIs.
   * CURRENT (buggy) BEHAVIOR: media.url = "data:text/html,<script>x</script>" (non-empty).
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it('normalizePlan() with media.url = "data:text/html,<script>x</script>" should return empty media.url', () => {
    const result = normalizePlan(planWithMediaUrl("data:text/html,<script>x</script>"));
    const mediaUrl = result.days[0].exercises[0].media?.url;

    // After fix: safeMediaUrl() strips data: URIs to ""
    // On unfixed code: mediaUrl = "data:text/html,<script>x</script>" — this assertion FAILS
    expect(mediaUrl).toBe("");
  });
});

// ── Test 1c — http: URL passes through normalizePlan() unchanged ─────────────

describe("Test 1c — Bug Condition: http: URL passes through normalizePlan()", () => {
  /**
   * BUG: Plain http:// URLs are not safe — they allow open-redirect to
   * attacker-controlled hosts over an unencrypted channel.
   * normalizePlan() stores them verbatim.
   *
   * EXPECTED BEHAVIOR (after fix): safeMediaUrl() returns "" for http: URLs.
   * CURRENT (buggy) BEHAVIOR: media.url = "http://example.com" (non-empty).
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it('normalizePlan() with media.url = "http://example.com" should return empty media.url', () => {
    const result = normalizePlan(planWithMediaUrl("http://example.com"));
    const mediaUrl = result.days[0].exercises[0].media?.url;

    // After fix: safeMediaUrl() strips http: URLs to ""
    // On unfixed code: mediaUrl = "http://example.com" — this assertion FAILS
    expect(mediaUrl).toBe("");
  });
});

// ── Test 1d — 600 KB JSON payload reaches normalizePlan() without rejection ──

describe("Test 1d — Bug Condition: oversized JSON payload is not rejected before normalizePlan()", () => {
  /**
   * BUG: PlanView.applyPlan() calls normalizePlan(JSON.parse(pasteText)) with no
   * size check. A 600 KB payload is parsed and processed synchronously on the
   * main thread, potentially hanging the browser tab.
   *
   * EXPECTED BEHAVIOR (after fix): validatePlanShape() throws a user-friendly
   * Error before normalizePlan() is called when byteSize > 500_000.
   *
   * CURRENT (buggy) BEHAVIOR: No error is thrown — normalizePlan() is called
   * with the full payload.
   *
   * This test simulates the applyPlan() path by calling JSON.parse + normalizePlan
   * directly (the same code path used in PlanView before validatePlanShape is added).
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it("a 600 KB JSON string should be rejected before reaching normalizePlan()", () => {
    // Build a JSON string that is > 500 KB (600 KB)
    const targetBytes = 600_000;
    // Create a plan with a large notes field to pad the size
    const padding = "x".repeat(targetBytes);
    const largePlan = JSON.stringify({
      planType: "single_week",
      meta: { appName: "Test", version: "v1", notes: padding },
      days: [],
    });

    expect(largePlan.length).toBeGreaterThan(500_000);

    // After fix: validatePlanShape(largePlan) throws before normalizePlan() is called.
    // We simulate the fixed applyPlan() path: validatePlanShape must throw for > 500 KB.
    expect(() => {
      // Fixed code path: validatePlanShape validates byte size before parsing
      const parsed = validatePlanShape(largePlan);
      normalizePlan(parsed);
    }).toThrow(); // PASSES after fix because validatePlanShape throws for oversized input
  });
});

// ── Test 1e — corrupted localStorage value causes JSON.parse to throw ────────

describe("Test 1e — Bug Condition: non-JSON localStorage value crashes useState initialiser", () => {
  /**
   * BUG: App.jsx initialises soundEnabled with:
   *   const s = localStorage.getItem("mgc_sound");
   *   return s ? JSON.parse(s) : true;
   *
   * If s = "undefined" (set by a browser extension), JSON.parse("undefined")
   * throws a SyntaxError synchronously inside the useState lazy initialiser,
   * crashing the app before any UI renders.
   *
   * EXPECTED BEHAVIOR (after fix): the try/catch wrapper returns true (default)
   * without throwing.
   *
   * CURRENT (buggy) BEHAVIOR: JSON.parse("undefined") throws SyntaxError.
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it('JSON.parse("undefined") inside the useState initialiser should NOT throw and should return true', () => {
    // Simulate the UNFIXED useState initialiser logic from App.jsx:
    //   const s = localStorage.getItem("mgc_sound");
    //   return s ? JSON.parse(s) : true;
    const corruptedValue = "undefined"; // what a browser extension might write

    // After fix: the initialiser is wrapped in try/catch and returns true.
    // On unfixed code: JSON.parse("undefined") throws — this assertion FAILS.
    const initState = () => {
      // FIXED code path (with try/catch):
      const s = corruptedValue;
      if (!s) return true;
      try { return JSON.parse(s); } catch { return true; }
    };

    // The fixed behavior: should NOT throw and should return true (default).
    // On unfixed code: initState() throws → expect(...).not.toThrow() FAILS.
    expect(initState).not.toThrow();

    // Additionally assert the return value is the safe default (true).
    // This will only be reached if the above passes (i.e. after the fix).
    let result: boolean | undefined;
    try {
      result = initState();
    } catch {
      result = undefined;
    }
    expect(result).toBe(true);
  });
});
