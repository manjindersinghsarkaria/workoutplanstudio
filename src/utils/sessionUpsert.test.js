import { describe, it, expect } from "vitest";
import { getSessionUpsertKey, shouldReusePrevious } from "./sessionUpsert.js";

const base = {
  planName: "Push Pull Legs",
  dayLabel: "Day 1",
  savedAt: "2026-11-05T10:00:00.000Z",
  completionPercent: 24,
};

describe("getSessionUpsertKey", () => {
  it("keys on plan + day + local date", () => {
    expect(getSessionUpsertKey(base)).toBe("Push Pull Legs|Day 1|2026-11-05");
  });

  it("a different day or date is a different key", () => {
    expect(getSessionUpsertKey({ ...base, dayLabel: "Day 2" })).not.toBe(
      getSessionUpsertKey(base)
    );
    expect(getSessionUpsertKey({ ...base, savedAt: "2026-11-06T10:00:00.000Z" })).not.toBe(
      getSessionUpsertKey(base)
    );
  });
});

describe("shouldReusePrevious", () => {
  it("reuses a partial (<100%) save for the same key", () => {
    expect(shouldReusePrevious(base, { ...base, completionPercent: 35 })).toBe(true);
  });

  it("never reuses a completed (100%) save", () => {
    expect(
      shouldReusePrevious({ ...base, completionPercent: 100 }, { ...base, completionPercent: 50 })
    ).toBe(false);
  });

  it("does not reuse a save for a different key", () => {
    expect(
      shouldReusePrevious(base, { ...base, dayLabel: "Day 2", completionPercent: 50 })
    ).toBe(false);
  });
});
