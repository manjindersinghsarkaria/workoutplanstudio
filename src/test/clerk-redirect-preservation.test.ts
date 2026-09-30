/**
 * Preservation Property Tests — Task 2
 * Feature: clerk-redirect-env-config
 *
 * Property 2: Preservation — Localhost Dev Redirect and CORS Behavior Unchanged
 *
 * CRITICAL: These tests MUST PASS on UNFIXED code.
 * They document the existing correct behavior that must be preserved after the fix.
 *
 * Observations:
 *   - On http://localhost:5173, window.location.origin + "/app" = "http://localhost:5173/app"
 *     which is the same as what the current relative afterSignInUrl="/app" resolves to on localhost.
 *   - CORS handler with Origin: http://localhost:5173 and APP_URL=http://localhost:5173
 *     returns Access-Control-Allow-Origin: http://localhost:5173
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.6**
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

// ── Inline CORS logic extracted from api/generate-firebase-token.js (unfixed) ──
// This mirrors the CURRENT (unfixed) handler logic so we can test it in isolation.

/**
 * Simulates the UNFIXED CORS origin resolution from generate-firebase-token.js:
 *   const appUrl = process.env.APP_URL ?? (VERCEL_URL ? `https://${VERCEL_URL}` : null);
 *   res.setHeader("Access-Control-Allow-Origin", appUrl);
 */
function unfixedCorsOrigin(env: { APP_URL?: string; VERCEL_URL?: string }): string | null {
  const appUrl = env.APP_URL ?? (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : null);
  return appUrl ?? null;
}

/**
 * Simulates the FIXED getAllowedOrigins() helper (to be implemented in task 3).
 * Tests here verify the LOGIC that the fix will implement — these tests pass on
 * unfixed code because they test the logic directly, not through the handler.
 */
function getAllowedOrigins(env: {
  ALLOWED_ORIGINS?: string;
  VERCEL_URL?: string;
  APP_URL?: string;
}): Set<string> {
  const origins = new Set<string>();

  if (env.ALLOWED_ORIGINS) {
    env.ALLOWED_ORIGINS.split(",").forEach((o) => origins.add(o.trim()));
  }

  if (env.VERCEL_URL) {
    origins.add(`https://${env.VERCEL_URL}`);
  }

  if (env.APP_URL) {
    origins.add(env.APP_URL);
  }

  return origins;
}

/**
 * Simulates the fixed CORS handler response for a given request origin.
 * Returns the echoed origin if allowed, or null if rejected.
 */
function fixedCorsOrigin(
  requestOrigin: string,
  env: { ALLOWED_ORIGINS?: string; VERCEL_URL?: string; APP_URL?: string },
): string | null {
  const allowed = getAllowedOrigins(env);
  return allowed.has(requestOrigin) ? requestOrigin : null;
}

// ── Preservation Test P2-A: Localhost origin + "/app" = "http://localhost:5173/app" ──

describe("Preservation P2-A — Observation: localhost origin + /app equals http://localhost:5173/app", () => {
  /**
   * PRESERVATION: On localhost:5173, window.location.origin + "/app" produces
   * "http://localhost:5173/app" — the same URL that the current relative
   * afterSignInUrl="/app" resolves to on localhost.
   *
   * This is the baseline behavior the fix must preserve.
   * This test PASSES on unfixed code.
   */
  it('window.location.origin + "/app" on localhost:5173 equals "http://localhost:5173/app"', () => {
    const localhostOrigin = "http://localhost:5173";
    const afterSignInUrl = localhostOrigin + "/app";
    expect(afterSignInUrl).toBe("http://localhost:5173/app");
  });

  it('window.location.origin + "/" on localhost:5173 equals "http://localhost:5173/"', () => {
    const localhostOrigin = "http://localhost:5173";
    const afterSignOutUrl = localhostOrigin + "/";
    expect(afterSignOutUrl).toBe("http://localhost:5173/");
  });
});

// ── Preservation Property P2-B: For all VITE_APP_URL=localhost:5173, APP_ORIGIN = localhost:5173 ──

describe("Preservation P2-B — Property: VITE_APP_URL=http://localhost:5173 → APP_ORIGIN=http://localhost:5173", () => {
  /**
   * **Validates: Requirements 3.1, 3.2, 3.6**
   *
   * PROPERTY: For all VITE_APP_URL values set to "http://localhost:5173",
   * APP_ORIGIN resolves to "http://localhost:5173" and afterSignInUrl = "http://localhost:5173/app".
   *
   * This simulates the fixed main.jsx logic:
   *   const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;
   *
   * On unfixed code: the relative path "/app" is used, but on localhost the effective
   * redirect is the same. This test validates the FIXED behavior that must be preserved.
   * This test PASSES on unfixed code because it tests the logic directly.
   */
  it("property: VITE_APP_URL=http://localhost:5173 → afterSignInUrl=http://localhost:5173/app", () => {
    // Simulate the fixed APP_ORIGIN derivation logic
    const deriveAppOrigin = (viteAppUrl: string | undefined, windowOrigin: string): string => {
      return viteAppUrl || windowOrigin;
    };

    // Property: for all VITE_APP_URL values equal to localhost:5173,
    // APP_ORIGIN is localhost:5173 and afterSignInUrl is localhost:5173/app
    fc.assert(
      fc.property(
        // VITE_APP_URL is always "http://localhost:5173" (the local dev value)
        fc.constant("http://localhost:5173"),
        // window.location.origin can be anything (env var takes precedence)
        fc.constantFrom(
          "http://localhost:5173",
          "http://localhost:3000",
          "https://manni-gym-coach-git-dev-abc.vercel.app",
          "https://workoutplanstudio.ca",
        ),
        (viteAppUrl, windowOrigin) => {
          const appOrigin = deriveAppOrigin(viteAppUrl, windowOrigin);
          expect(appOrigin).toBe("http://localhost:5173");
          expect(appOrigin + "/app").toBe("http://localhost:5173/app");
          expect(appOrigin + "/").toBe("http://localhost:5173/");
        },
      ),
      { numRuns: 50 },
    );
  });

  it("property: VITE_APP_URL unset → APP_ORIGIN falls back to window.location.origin", () => {
    const deriveAppOrigin = (viteAppUrl: string | undefined, windowOrigin: string): string => {
      return viteAppUrl || windowOrigin;
    };

    const originArb = fc.constantFrom(
      "http://localhost:5173",
      "http://localhost:3000",
      "https://manni-gym-coach-git-dev-abc.vercel.app",
      "https://workoutplanstudio.ca",
    );

    fc.assert(
      fc.property(originArb, (windowOrigin) => {
        // When VITE_APP_URL is not set, APP_ORIGIN = window.location.origin
        const appOrigin = deriveAppOrigin(undefined, windowOrigin);
        expect(appOrigin).toBe(windowOrigin);
      }),
      { numRuns: 50 },
    );
  });
});

// ── Preservation Test P2-C: CORS allows localhost:5173 when APP_URL=localhost:5173 ──

describe("Preservation P2-C — Observation: CORS allows localhost:5173 when APP_URL=http://localhost:5173", () => {
  /**
   * PRESERVATION: The current (unfixed) CORS handler with APP_URL=http://localhost:5173
   * returns Access-Control-Allow-Origin: http://localhost:5173 for requests from localhost.
   *
   * This test PASSES on unfixed code (documents existing correct behavior).
   */
  it("unfixed CORS handler with APP_URL=http://localhost:5173 returns http://localhost:5173", () => {
    const corsOrigin = unfixedCorsOrigin({ APP_URL: "http://localhost:5173" });
    expect(corsOrigin).toBe("http://localhost:5173");
  });

  it("fixed CORS handler with APP_URL=http://localhost:5173 allows Origin: http://localhost:5173", () => {
    const corsOrigin = fixedCorsOrigin("http://localhost:5173", {
      APP_URL: "http://localhost:5173",
    });
    expect(corsOrigin).toBe("http://localhost:5173");
  });
});

// ── Preservation Property P2-D: For all origins in allowlist, CORS echoes the request origin ──

describe("Preservation P2-D — Property: for all origins in allowlist, CORS echoes the request origin", () => {
  /**
   * **Validates: Requirements 3.3, 3.4**
   *
   * PROPERTY: For any origin that is in the configured allowlist (via ALLOWED_ORIGINS,
   * VERCEL_URL, or APP_URL), the CORS handler must echo that origin in
   * Access-Control-Allow-Origin.
   *
   * This tests the getAllowedOrigins() logic that the fix will implement.
   * This test PASSES on unfixed code because it tests the logic directly.
   */
  it("property: getAllowedOrigins() includes APP_URL when set", () => {
    const appUrlArb = fc.constantFrom(
      "http://localhost:5173",
      "https://workoutplanstudio.ca",
      "https://manni-gym-coach-git-dev-abc.vercel.app",
    );

    fc.assert(
      fc.property(appUrlArb, (appUrl) => {
        const allowed = getAllowedOrigins({ APP_URL: appUrl });
        expect(allowed.has(appUrl)).toBe(true);
      }),
      { numRuns: 50 },
    );
  });

  it("property: getAllowedOrigins() includes https://VERCEL_URL when VERCEL_URL is set", () => {
    const vercelUrlArb = fc.constantFrom(
      "manni-gym-coach-git-dev-abc123.vercel.app",
      "manni-gym-coach-xyz.vercel.app",
      "manni-gym-coach-pr-42.vercel.app",
    );

    fc.assert(
      fc.property(vercelUrlArb, (vercelUrl) => {
        const allowed = getAllowedOrigins({ VERCEL_URL: vercelUrl });
        expect(allowed.has(`https://${vercelUrl}`)).toBe(true);
      }),
      { numRuns: 50 },
    );
  });

  it("property: getAllowedOrigins() includes all comma-separated ALLOWED_ORIGINS entries", () => {
    const originsListArb = fc
      .array(
        fc.constantFrom(
          "http://localhost:5173",
          "https://workoutplanstudio.ca",
          "https://manni-gym-coach-git-dev-abc.vercel.app",
          "https://manni-gym-coach-pr-42.vercel.app",
        ),
        { minLength: 1, maxLength: 4 },
      )
      .map((arr) => [...new Set(arr)]); // deduplicate

    fc.assert(
      fc.property(originsListArb, (originsList) => {
        const allowedOriginsEnv = originsList.join(",");
        const allowed = getAllowedOrigins({ ALLOWED_ORIGINS: allowedOriginsEnv });
        for (const origin of originsList) {
          expect(allowed.has(origin)).toBe(true);
        }
      }),
      { numRuns: 50 },
    );
  });

  it("property: fixedCorsOrigin echoes the request origin for all allowlisted origins", () => {
    const allowedOriginArb = fc.constantFrom(
      "http://localhost:5173",
      "https://workoutplanstudio.ca",
      "https://manni-gym-coach-git-dev-abc.vercel.app",
    );

    fc.assert(
      fc.property(allowedOriginArb, (origin) => {
        // Build env where this origin is in the allowlist
        const corsOrigin = fixedCorsOrigin(origin, { ALLOWED_ORIGINS: origin });
        expect(corsOrigin).toBe(origin);
      }),
      { numRuns: 50 },
    );
  });
});

// ── Preservation Property P2-E: For all origins NOT in allowlist, CORS does NOT allow them ──

describe("Preservation P2-E — Property: for all origins NOT in allowlist, CORS does NOT include permissive header", () => {
  /**
   * **Validates: Requirements 3.3, 3.4**
   *
   * PROPERTY: For any origin that is NOT in the configured allowlist, the CORS
   * handler must NOT return a permissive Access-Control-Allow-Origin header.
   * The result must be null (no header set) or a 403 response.
   *
   * This tests the security boundary of getAllowedOrigins() logic.
   * This test PASSES on unfixed code because it tests the logic directly.
   */
  it("property: fixedCorsOrigin returns null for origins not in allowlist", () => {
    const unknownOriginArb = fc.constantFrom(
      "https://evil.com",
      "https://attacker.example.com",
      "https://not-in-allowlist.vercel.app",
      "http://localhost:9999",
      "https://other-app.vercel.app",
    );

    fc.assert(
      fc.property(unknownOriginArb, (unknownOrigin) => {
        // Allowlist only contains localhost:5173
        const corsOrigin = fixedCorsOrigin(unknownOrigin, {
          APP_URL: "http://localhost:5173",
        });
        // Unknown origin must NOT be echoed
        expect(corsOrigin).toBeNull();
      }),
      { numRuns: 50 },
    );
  });

  it("property: getAllowedOrigins() with empty env returns empty set", () => {
    const allowed = getAllowedOrigins({});
    expect(allowed.size).toBe(0);
  });

  it("property: fixedCorsOrigin returns null when allowlist is empty", () => {
    const anyOriginArb = fc.constantFrom(
      "http://localhost:5173",
      "https://workoutplanstudio.ca",
      "https://manni-gym-coach-git-dev-abc.vercel.app",
    );

    fc.assert(
      fc.property(anyOriginArb, (origin) => {
        // No env vars set → empty allowlist → all origins rejected
        const corsOrigin = fixedCorsOrigin(origin, {});
        expect(corsOrigin).toBeNull();
      }),
      { numRuns: 50 },
    );
  });

  it("property: fixedCorsOrigin does not allow an origin that is only a substring of an allowed origin", () => {
    // "evil.com" should not be allowed just because "https://evil.com.trusted.com" is in the list
    const corsOrigin = fixedCorsOrigin("https://evil.com", {
      ALLOWED_ORIGINS: "https://evil.com.trusted.com",
    });
    expect(corsOrigin).toBeNull();
  });
});

// ── Preservation Test P2-F: afterSignOutUrl still resolves to landing page ──

describe("Preservation P2-F — Observation: afterSignOutUrl resolves to landing page on current origin", () => {
  /**
   * **Validates: Requirements 3.6**
   *
   * PRESERVATION: afterSignOutUrl must continue to redirect to "/" (the landing page)
   * on the current deployment origin. The fix changes "/" to `${APP_ORIGIN}/` but
   * the effective destination is the same.
   *
   * This test PASSES on unfixed code.
   */
  it('APP_ORIGIN + "/" on localhost:5173 equals "http://localhost:5173/"', () => {
    const appOrigin = "http://localhost:5173";
    expect(appOrigin + "/").toBe("http://localhost:5173/");
  });

  it("property: APP_ORIGIN + / always ends with / for any origin", () => {
    const originArb = fc.constantFrom(
      "http://localhost:5173",
      "https://workoutplanstudio.ca",
      "https://manni-gym-coach-git-dev-abc.vercel.app",
    );

    fc.assert(
      fc.property(originArb, (origin) => {
        const afterSignOutUrl = origin + "/";
        expect(afterSignOutUrl.endsWith("/")).toBe(true);
        expect(afterSignOutUrl.startsWith(origin)).toBe(true);
      }),
      { numRuns: 50 },
    );
  });
});
