/**
 * Extended Property-Based Tests — Task 8
 * Feature: frontend-security-hardening
 *
 * Property 1 (extended): Bug Condition — safeMediaUrl() returns "" for all non-https: protocols
 * Property 2 (extended): Preservation — safeMediaUrl() returns https:// URLs unchanged
 * Property 3: validatePlanShape() throws with a user-friendly message for inputs exceeding limits
 * Property 4: validatePlanShape() does not throw and returns parsed object for valid inputs
 *
 * **Validates: Requirements 2.1, 2.2, 2.4, 2.5, 3.1, 3.2**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { safeMediaUrl, validatePlanShape } from "@/helpers";

// ── Property 1 (extended): Bug Condition — non-https: protocols return "" ────

describe("Property 1 (extended) — Bug Condition: safeMediaUrl() returns '' for all non-https: protocols", () => {
  /**
   * **Validates: Requirements 2.1, 2.2**
   *
   * For any URL string whose protocol is not `https:`, safeMediaUrl() must
   * return "". This covers javascript:, data:, http:, ftp:, blob:, and any
   * other arbitrary protocol.
   *
   * Generator: produces URL strings with arbitrary non-https: protocols by
   * prepending a random protocol label to a hostname.
   */
  it("property: safeMediaUrl() returns '' for all non-https: protocol URLs", () => {
    // Arbitrary protocol strings that are NOT "https"
    const nonHttpsProtocolArb = fc
      .string({ minLength: 1, maxLength: 20 })
      .filter((s) => /^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(s) && s.toLowerCase() !== "https");

    const nonHttpsUrlArb = fc
      .tuple(
        nonHttpsProtocolArb,
        fc.stringMatching(/^[a-z][a-z0-9-]{1,20}\.[a-z]{2,6}$/),
      )
      .map(([proto, host]) => `${proto}://${host}/path`);

    fc.assert(
      fc.property(nonHttpsUrlArb, (url) => {
        expect(safeMediaUrl(url)).toBe("");
      }),
      { numRuns: 200 },
    );
  });

  it("property: safeMediaUrl() returns '' for well-known dangerous protocols", () => {
    // Explicitly test the most dangerous protocol families
    const dangerousProtocolArb = fc
      .tuple(
        fc.constantFrom("javascript", "data", "http", "ftp", "blob", "vbscript", "file"),
        fc.stringMatching(/^[a-z0-9._-]{3,20}$/),
      )
      .map(([proto, rest]) => `${proto}:${rest}`);

    fc.assert(
      fc.property(dangerousProtocolArb, (url) => {
        expect(safeMediaUrl(url)).toBe("");
      }),
      { numRuns: 100 },
    );
  });

  it("property: safeMediaUrl() returns '' for completely arbitrary strings (non-URL)", () => {
    // Random strings that are not valid URLs at all should also return ""
    const arbitraryNonHttpsArb = fc
      .string({ minLength: 1, maxLength: 100 })
      .filter((s) => !s.startsWith("https://"));

    fc.assert(
      fc.property(arbitraryNonHttpsArb, (s) => {
        expect(safeMediaUrl(s)).toBe("");
      }),
      { numRuns: 200 },
    );
  });
});

// ── Property 2 (extended): Preservation — https:// URLs pass through unchanged ─

describe("Property 2 (extended) — Preservation: safeMediaUrl() returns https:// URLs unchanged", () => {
  /**
   * **Validates: Requirements 3.1, 3.2**
   *
   * For any URL string with the https:// scheme, safeMediaUrl() must return
   * the URL exactly as provided — no modification, no stripping.
   *
   * Generator: produces valid https:// URLs with realistic hostnames and paths.
   */
  it("property: safeMediaUrl() returns any https:// URL unchanged", () => {
    // Use only simple alphanumeric TLDs (no hyphens) to avoid invalid IDN labels
    const httpsUrlArb = fc
      .tuple(
        fc.stringMatching(/^[a-z][a-z0-9]{1,15}$/),
        fc.constantFrom("com", "org", "net", "io", "co", "app", "dev"),
        fc.array(fc.stringMatching(/^[a-z0-9]{1,15}$/), { minLength: 0, maxLength: 4 }),
      )
      .map(([host, tld, segments]) => {
        const path = segments.length > 0 ? "/" + segments.join("/") : "";
        return `https://${host}.${tld}${path}`;
      });

    fc.assert(
      fc.property(httpsUrlArb, (url) => {
        expect(safeMediaUrl(url)).toBe(url);
      }),
      { numRuns: 200 },
    );
  });

  it("property: safeMediaUrl() preserves https:// URLs with query strings and fragments", () => {
    const httpsUrlWithExtrasArb = fc
      .tuple(
        fc.stringMatching(/^[a-z][a-z0-9-]{1,15}\.[a-z]{2,6}$/),
        fc.stringMatching(/^[a-z0-9=&_-]{0,30}$/),
      )
      .map(([host, query]) => {
        const qs = query.length > 0 ? `?${query}` : "";
        return `https://${host}/watch${qs}`;
      });

    fc.assert(
      fc.property(httpsUrlWithExtrasArb, (url) => {
        expect(safeMediaUrl(url)).toBe(url);
      }),
      { numRuns: 100 },
    );
  });
});

// ── Property 3: validatePlanShape() throws for inputs exceeding limits ────────

describe("Property 3 — Bug Condition: validatePlanShape() throws with user-friendly message for oversized/deep/wide inputs", () => {
  /**
   * **Validates: Requirements 2.4, 2.5**
   *
   * For any JSON payload that exceeds at least one of the three limits:
   *   - byte size > 500 KB
   *   - nesting depth > 10
   *   - total field count > 5000
   * validatePlanShape() must throw an Error with a user-friendly message string
   * (i.e. a non-empty string that does not expose internal stack details).
   */

  it("property: validatePlanShape() throws for JSON strings exceeding 500 KB", () => {
    // Generate JSON strings > 500 KB by padding a notes field
    const oversizedJsonArb = fc
      .integer({ min: 500_001, max: 600_000 })
      .map((targetSize) => {
        const padding = "x".repeat(targetSize);
        return JSON.stringify({ planType: "single_week", meta: { notes: padding }, days: [] });
      });

    fc.assert(
      fc.property(oversizedJsonArb, (raw) => {
        let threw = false;
        let message = "";
        try {
          validatePlanShape(raw);
        } catch (e) {
          threw = true;
          message = (e as Error).message;
        }
        // Must throw
        expect(threw).toBe(true);
        // Message must be a non-empty user-friendly string
        expect(typeof message).toBe("string");
        expect(message.length).toBeGreaterThan(0);
      }),
      { numRuns: 10 },
    );
  });

  it("property: validatePlanShape() throws for JSON with nesting depth > 10", () => {
    // Build deeply nested objects with depth > 10
    const deeplyNestedJsonArb = fc
      .integer({ min: 11, max: 20 })
      .map((depth) => {
        let obj: unknown = { leaf: true };
        for (let i = 0; i < depth; i++) {
          obj = { nested: obj };
        }
        return JSON.stringify(obj);
      });

    fc.assert(
      fc.property(deeplyNestedJsonArb, (raw) => {
        let threw = false;
        let message = "";
        try {
          validatePlanShape(raw);
        } catch (e) {
          threw = true;
          message = (e as Error).message;
        }
        expect(threw).toBe(true);
        expect(typeof message).toBe("string");
        expect(message.length).toBeGreaterThan(0);
      }),
      { numRuns: 20 },
    );
  });

  it("property: validatePlanShape() throws for JSON with field count > 5000", () => {
    // Build flat objects with > 5000 fields
    const wideObjectJsonArb = fc
      .integer({ min: 5001, max: 6000 })
      .map((fieldCount) => {
        const obj: Record<string, number> = {};
        for (let i = 0; i < fieldCount; i++) {
          obj[`field_${i}`] = i;
        }
        return JSON.stringify(obj);
      });

    fc.assert(
      fc.property(wideObjectJsonArb, (raw) => {
        let threw = false;
        let message = "";
        try {
          validatePlanShape(raw);
        } catch (e) {
          threw = true;
          message = (e as Error).message;
        }
        expect(threw).toBe(true);
        expect(typeof message).toBe("string");
        expect(message.length).toBeGreaterThan(0);
      }),
      { numRuns: 10 },
    );
  });
});

// ── Property 4: validatePlanShape() does not throw for valid inputs ───────────

describe("Property 4 — Preservation: validatePlanShape() does not throw and returns parsed object for valid inputs", () => {
  /**
   * **Validates: Requirements 3.1, 3.2**
   *
   * For any plan JSON string that is within all three limits:
   *   - byte size ≤ 500 KB
   *   - nesting depth ≤ 10
   *   - total field count ≤ 5000
   * validatePlanShape() must NOT throw and must return the parsed object.
   *
   * Generator: produces small, well-formed plan JSON strings well within all limits.
   */
  it("property: validatePlanShape() does not throw and returns parsed object for valid plan JSON", () => {
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
        const raw = JSON.stringify(plan);

        // Verify the generated plan is within limits
        expect(new TextEncoder().encode(raw).length).toBeLessThanOrEqual(500_000);

        let result: unknown;
        expect(() => {
          result = validatePlanShape(raw);
        }).not.toThrow();

        // Must return the parsed object (not null, not undefined)
        expect(result).toBeDefined();
        expect(typeof result).toBe("object");
        expect(result).not.toBeNull();
      }),
      { numRuns: 100 },
    );
  });

  it("property: validatePlanShape() returns an object equal to JSON.parse() for valid inputs", () => {
    const simpleObjectArb = fc.record({
      a: fc.string({ minLength: 1, maxLength: 20 }),
      b: fc.integer({ min: 0, max: 100 }),
      c: fc.array(fc.integer({ min: 0, max: 10 }), { minLength: 0, maxLength: 10 }),
    });

    fc.assert(
      fc.property(simpleObjectArb, (obj) => {
        const raw = JSON.stringify(obj);
        const result = validatePlanShape(raw);
        // The returned object must deeply equal the parsed JSON
        expect(result).toEqual(JSON.parse(raw));
      }),
      { numRuns: 100 },
    );
  });
});
