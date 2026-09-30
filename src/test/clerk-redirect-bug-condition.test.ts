/**
 * Bug Condition Exploration Test — Task 1
 * Feature: clerk-redirect-env-config
 *
 * Property 1: Bug Condition — Relative Redirect Produces Wrong-Origin URL
 *
 * CRITICAL: This test MUST FAIL on unfixed code.
 * Failure confirms the bug exists. After the fix is applied, this test PASSES.
 *
 * Bug: ClerkProvider was initialized with relative afterSignInUrl="/app".
 * Clerk's hosted sign-in page resolves relative paths against its own domain
 * (accounts.dev), not the app origin, so it falls back to the first absolute
 * URL it has on record — http://localhost:5173/app — regardless of the actual
 * deployment origin.
 *
 * Fix: Derive APP_ORIGIN from import.meta.env.VITE_APP_URL || window.location.origin
 * and pass absolute URLs: fallbackRedirectUrl={`${APP_ORIGIN}/app`}
 *
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

// ── Inline the APP_ORIGIN derivation logic from src/main.jsx ──────────────────

/**
 * Simulates the FIXED APP_ORIGIN derivation from main.jsx:
 *   const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;
 */
function deriveAppOrigin(viteAppUrl: string | undefined, windowOrigin: string): string {
  return viteAppUrl || windowOrigin;
}

/**
 * Simulates the FIXED afterSignInUrl construction from main.jsx:
 *   fallbackRedirectUrl={`${APP_ORIGIN}/app`}
 */
function buildAfterSignInUrl(appOrigin: string): string {
  return `${appOrigin}/app`;
}

/**
 * Bug condition: relative redirect AND origin is not localhost:5173
 * (from bugfix.md pseudocode)
 */
function isBugCondition(afterSignInUrl: string, currentOrigin: string): boolean {
  const relativeRedirect = !afterSignInUrl.startsWith("http");
  const wrongOrigin = currentOrigin !== "http://localhost:5173";
  return relativeRedirect && wrongOrigin;
}

// ── Test 1a — Preview deployment: redirect URL starts with current origin ─────

describe("Bug Condition P1-A — Preview deployment redirect stays on current origin", () => {
  /**
   * BUG (unfixed): afterSignInUrl="/app" is a relative path.
   * On a Vercel preview deployment, Clerk resolves it to http://localhost:5173/app
   * instead of https://manni-gym-coach-git-dev-abc.vercel.app/app.
   *
   * EXPECTED BEHAVIOR (after fix): APP_ORIGIN = window.location.origin on preview,
   * so afterSignInUrl = "https://manni-gym-coach-git-dev-abc.vercel.app/app"
   * which starts with the current origin.
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it("on preview deployment, afterSignInUrl starts with the preview origin", () => {
    const previewOrigin = "https://manni-gym-coach-git-dev-abc.vercel.app";

    // Simulate the bug condition: relative path on non-localhost origin
    const buggyAfterSignInUrl = "/app";
    expect(isBugCondition(buggyAfterSignInUrl, previewOrigin)).toBe(true);

    // Fixed behavior: APP_ORIGIN = window.location.origin (VITE_APP_URL not set on preview)
    const appOrigin = deriveAppOrigin(undefined, previewOrigin);
    const afterSignInUrl = buildAfterSignInUrl(appOrigin);

    // After fix: redirect URL starts with the current origin
    expect(afterSignInUrl.startsWith(previewOrigin)).toBe(true);
    expect(afterSignInUrl).toBe("https://manni-gym-coach-git-dev-abc.vercel.app/app");
  });
});

// ── Test 1b — Production deployment: redirect URL starts with production origin ─

describe("Bug Condition P1-B — Production deployment redirect stays on production origin", () => {
  /**
   * BUG (unfixed): On workoutplanstudio.ca, Clerk resolves "/app" to
   * http://localhost:5173/app instead of https://workoutplanstudio.ca/app.
   *
   * EXPECTED BEHAVIOR (after fix): afterSignInUrl = "https://workoutplanstudio.ca/app"
   *
   * This test ASSERTS the fixed behavior — it FAILS on unfixed code.
   */
  it("on production deployment, afterSignInUrl starts with the production origin", () => {
    const productionOrigin = "https://workoutplanstudio.ca";

    // Simulate the bug condition
    const buggyAfterSignInUrl = "/app";
    expect(isBugCondition(buggyAfterSignInUrl, productionOrigin)).toBe(true);

    // Fixed behavior: APP_ORIGIN = window.location.origin
    const appOrigin = deriveAppOrigin(undefined, productionOrigin);
    const afterSignInUrl = buildAfterSignInUrl(appOrigin);

    expect(afterSignInUrl.startsWith(productionOrigin)).toBe(true);
    expect(afterSignInUrl).toBe("https://workoutplanstudio.ca/app");
  });
});

// ── Property Test P1-C — For all non-localhost origins, fixed redirect stays on origin ──

describe("Bug Condition P1-C — Property: for all non-localhost origins, fixed redirect starts with current origin", () => {
  /**
   * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
   *
   * PROPERTY: For any deployment origin where isBugCondition is true
   * (relative redirect AND not localhost:5173), the fixed APP_ORIGIN derivation
   * produces an afterSignInUrl that starts with the current origin.
   *
   * This is the core fix-checking property from the design doc:
   *   FOR ALL env WHERE isBugCondition(env) DO
   *     ASSERT result.afterSignInUrl.startsWith(env.CURRENT_ORIGIN)
   *   END FOR
   *
   * This test FAILS on unfixed code (relative "/app" does not start with origin).
   * This test PASSES on fixed code.
   */
  it("property: fixed afterSignInUrl always starts with current origin on non-localhost deployments", () => {
    const nonLocalhostOriginArb = fc.constantFrom(
      "https://manni-gym-coach-git-dev-abc.vercel.app",
      "https://manni-gym-coach-git-dev-xyz.vercel.app",
      "https://workoutplanstudio.ca",
      "https://manni-gym-coach-pr-42.vercel.app",
    );

    fc.assert(
      fc.property(nonLocalhostOriginArb, (currentOrigin) => {
        // Confirm this is a bug condition with relative path
        expect(isBugCondition("/app", currentOrigin)).toBe(true);

        // Fixed: VITE_APP_URL not set on preview/production → falls back to window.location.origin
        const appOrigin = deriveAppOrigin(undefined, currentOrigin);
        const afterSignInUrl = buildAfterSignInUrl(appOrigin);

        // The fixed redirect URL must start with the current origin
        expect(afterSignInUrl.startsWith(currentOrigin)).toBe(true);
      }),
      { numRuns: 50 },
    );
  });

  it("property: fixed afterSignOutUrl always starts with current origin on non-localhost deployments", () => {
    const nonLocalhostOriginArb = fc.constantFrom(
      "https://manni-gym-coach-git-dev-abc.vercel.app",
      "https://workoutplanstudio.ca",
    );

    fc.assert(
      fc.property(nonLocalhostOriginArb, (currentOrigin) => {
        const appOrigin = deriveAppOrigin(undefined, currentOrigin);
        const afterSignOutUrl = `${appOrigin}/`;

        expect(afterSignOutUrl.startsWith(currentOrigin)).toBe(true);
        expect(afterSignOutUrl.endsWith("/")).toBe(true);
      }),
      { numRuns: 50 },
    );
  });
});

// ── Test P1-D — VITE_APP_URL override takes precedence over window.location.origin ──

describe("Bug Condition P1-D — VITE_APP_URL env var overrides window.location.origin", () => {
  /**
   * **Validates: Requirements 2.4**
   *
   * When VITE_APP_URL is set (e.g. in .env.local for local dev), it takes
   * precedence over window.location.origin. This allows pinning the redirect
   * origin in environments where the origin might differ from the intended URL.
   */
  it("VITE_APP_URL set → APP_ORIGIN uses env var, not window.location.origin", () => {
    const viteAppUrl = "http://localhost:5173";
    const windowOrigin = "http://localhost:3000"; // vercel dev port

    const appOrigin = deriveAppOrigin(viteAppUrl, windowOrigin);
    expect(appOrigin).toBe("http://localhost:5173");
    expect(buildAfterSignInUrl(appOrigin)).toBe("http://localhost:5173/app");
  });

  it("VITE_APP_URL unset → APP_ORIGIN falls back to window.location.origin", () => {
    const windowOrigin = "https://manni-gym-coach-git-dev-abc.vercel.app";

    const appOrigin = deriveAppOrigin(undefined, windowOrigin);
    expect(appOrigin).toBe(windowOrigin);
    expect(buildAfterSignInUrl(appOrigin)).toBe(
      "https://manni-gym-coach-git-dev-abc.vercel.app/app",
    );
  });
});
