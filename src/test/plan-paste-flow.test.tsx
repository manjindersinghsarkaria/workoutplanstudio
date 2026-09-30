/**
 * Integration Tests — Full Plan Paste Flow (Task 9)
 * Feature: frontend-security-hardening
 *
 * Tests the end-to-end plan paste flow through PlanView → normalizePlan → WorkoutView.
 * Validates: Requirements 2.1, 2.4, 2.5, 3.1, 3.2
 */

import React, { useState } from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PlanView from "@/components/views/PlanView";
import WorkoutView from "@/components/views/WorkoutView";
import { normalizePlan, validatePlanShape } from "@/helpers";

// ── Silence clipboard / window.open noise in jsdom ───────────────────────────

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
  vi.spyOn(window, "open").mockImplementation(() => null);
});

afterEach(() => {
  cleanup();
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function makePlanJson(mediaUrl: string): string {
  return JSON.stringify({
    planType: "single_week",
    meta: { appName: "Test Plan", version: "v1", notes: "Integration test plan" },
    includeWarmUp: false,
    includeCoolDown: false,
    days: [
      {
        id: "day1",
        label: "Day 1",
        short: "Push",
        title: "Chest + Triceps",
        exercises: [
          {
            id: "d1e1",
            name: "Bench Press",
            sets: 3,
            reps: "10-12",
            rest: 60,
            note: "Keep core tight",
            instructions: ["Lie flat", "Lower bar to chest", "Press up"],
            formTips: ["Control the descent"],
            media: { type: "youtube", url: mediaUrl, label: "Watch Demo" },
            alternates: [],
          },
        ],
      },
    ],
  });
}

/** Renders PlanView wired to a controlled plan state, returns helpers. */
function renderPlanView() {
  let appliedPlan: ReturnType<typeof normalizePlan> | null = null;
  let capturedSetView: ((v: string) => void) = vi.fn();

  function Wrapper() {
    const [plan, setPlan] = useState(normalizePlan({ planType: "single_week", days: [] }));
    const [view, setView] = useState("plan");

    capturedSetView = setView;

    const handleApplyPlan = (p: ReturnType<typeof normalizePlan>) => {
      appliedPlan = p;
      setPlan(p);
    };

    if (view === "workout") {
      return (
        <WorkoutView
          plan={plan}
          session={null}
          selectedDayId={plan.days[0]?.id || "day1"}
          setSelectedDayId={vi.fn()}
          progressMap={{}}
          setProgressMap={vi.fn()}
          weightsMap={{}}
          setWeightsMap={vi.fn()}
          setHistoryLog={vi.fn()}
          setView={vi.fn()}
          saveSession={vi.fn()}
          soundEnabled={false}
          timerSeconds={60}
          setTimerSeconds={vi.fn()}
          timerRunning={false}
          setTimerRunning={vi.fn()}
        />
      );
    }

    return (
      <PlanView
        plan={plan}
        onApplyPlan={handleApplyPlan}
        onResetPlan={vi.fn()}
        setSelectedDayId={vi.fn()}
        setView={setView}
      />
    );
  }

  const utils = render(<Wrapper />);
  return { ...utils, getAppliedPlan: () => appliedPlan };
}

/** Types text into the paste textarea and clicks Apply Plan. */
function pasteAndApply(planJson: string) {
  const textarea = screen.getByRole("textbox", { name: /paste ai-generated plan here/i });
  fireEvent.change(textarea, { target: { value: planJson } });
  fireEvent.click(screen.getByRole("button", { name: /apply plan/i }));
}

// ── Test Suite ────────────────────────────────────────────────────────────────

describe("Integration: plan paste flow — unsafe media.url is stripped (Req 2.1, 3.1)", () => {
  /**
   * Full paste flow with media.url = "javascript:alert(1)".
   * After normalizePlan(), media.url must be "" so WorkoutView never renders
   * the "Watch Demo" <a> element.
   */
  it('paste flow with media.url = "javascript:alert(1)" — Watch Demo link is absent in WorkoutView', () => {
    // Directly normalize the plan (same path as applyPlan in PlanView)
    const planJson = makePlanJson("javascript:alert(1)");
    const sanitizedPlan = normalizePlan(validatePlanShape(planJson));

    // Verify normalizePlan stripped the URL
    const mediaUrl = sanitizedPlan.days[0].exercises[0].media?.url;
    expect(mediaUrl).toBe("");

    // Render WorkoutView with the sanitized plan
    render(
      <WorkoutView
        plan={sanitizedPlan}
        session={null}
        selectedDayId={sanitizedPlan.days[0].id}
        setSelectedDayId={vi.fn()}
        progressMap={{}}
        setProgressMap={vi.fn()}
        weightsMap={{}}
        setWeightsMap={vi.fn()}
        setHistoryLog={vi.fn()}
        setView={vi.fn()}
        saveSession={vi.fn()}
        soundEnabled={false}
        timerSeconds={60}
        setTimerSeconds={vi.fn()}
        timerRunning={false}
        setTimerRunning={vi.fn()}
      />,
    );

    // Expand the "How to do this" guide to reveal the media link area
    const guideBtn = screen.getAllByRole("button", { name: /how to do this/i })[0];
    fireEvent.click(guideBtn);

    // The Watch Demo <a> element must NOT be present (media.url is "")
    const watchDemoLinks = screen.queryAllByRole("link", { name: /watch demo/i });
    expect(watchDemoLinks).toHaveLength(0);
  });
});

describe("Integration: plan paste flow — valid https:// URL renders Watch Demo link (Req 3.1)", () => {
  /**
   * Full paste flow with a valid https:// YouTube URL.
   * The "Watch Demo" link must render and its href must equal the original URL.
   */
  it("paste flow with valid https:// YouTube URL — Watch Demo link renders with correct href", () => {
    const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

    // Directly normalize the plan (same path as applyPlan in PlanView)
    const planJson = makePlanJson(youtubeUrl);
    const normalizedPlan = normalizePlan(validatePlanShape(planJson));

    // Verify normalizePlan preserved the https:// URL
    const mediaUrl = normalizedPlan.days[0].exercises[0].media?.url;
    expect(mediaUrl).toBe(youtubeUrl);

    // Render WorkoutView with the plan
    render(
      <WorkoutView
        plan={normalizedPlan}
        session={null}
        selectedDayId={normalizedPlan.days[0].id}
        setSelectedDayId={vi.fn()}
        progressMap={{}}
        setProgressMap={vi.fn()}
        weightsMap={{}}
        setWeightsMap={vi.fn()}
        setHistoryLog={vi.fn()}
        setView={vi.fn()}
        saveSession={vi.fn()}
        soundEnabled={false}
        timerSeconds={60}
        setTimerSeconds={vi.fn()}
        timerRunning={false}
        setTimerRunning={vi.fn()}
      />,
    );

    // Expand the guide section
    const guideBtn = screen.getAllByRole("button", { name: /how to do this/i })[0];
    fireEvent.click(guideBtn);

    // The Watch Demo link must be present with the correct href
    const watchDemoLink = screen.getByRole("link", { name: /watch demo/i });
    expect(watchDemoLink).toBeInTheDocument();
    expect(watchDemoLink).toHaveAttribute("href", youtubeUrl);
  });
});

describe("Integration: plan paste flow — oversized payload shows error in PlanView (Req 2.4, 2.5)", () => {
  /**
   * Full paste flow with a 600 KB JSON payload.
   * validatePlanShape() must throw before normalizePlan() is called.
   * PlanView must display the error status message and not crash.
   */
  it("paste flow with 600 KB payload — error status is shown, no crash", () => {
    renderPlanView();

    // Build a JSON string > 500 KB
    const padding = "x".repeat(600_000);
    const largePlanJson = JSON.stringify({
      planType: "single_week",
      meta: { appName: "Test", version: "v1", notes: padding },
      days: [],
    });
    expect(largePlanJson.length).toBeGreaterThan(500_000);

    pasteAndApply(largePlanJson);

    // The status element must show an error message
    const statusEl = screen.getByRole("status");
    expect(statusEl).toBeInTheDocument();
    expect(statusEl.textContent).toMatch(/❌/);
    expect(statusEl.textContent).toMatch(/too large|500 KB/i);
  });

  it("validatePlanShape() throws for 600 KB payload before normalizePlan() is called", () => {
    const padding = "x".repeat(600_000);
    const largePlanJson = JSON.stringify({
      planType: "single_week",
      meta: { appName: "Test", version: "v1", notes: padding },
      days: [],
    });

    expect(() => validatePlanShape(largePlanJson)).toThrow(/too large|500 KB/i);
  });
});

describe("Integration: plan paste flow — deeply nested payload shows error in PlanView (Req 2.4, 2.5)", () => {
  /**
   * Full paste flow with a payload nested deeper than 10 levels.
   * validatePlanShape() must throw and PlanView must display a user-facing error.
   */
  it("paste flow with depth > 10 payload — user-facing error is shown", () => {
    renderPlanView();

    // Build a deeply nested object (depth = 12)
    function nest(depth: number): object {
      if (depth === 0) return { value: "leaf" };
      return { child: nest(depth - 1) };
    }
    const deepPlanJson = JSON.stringify({
      planType: "single_week",
      meta: { appName: "Test", version: "v1", notes: "" },
      days: [],
      deep: nest(12),
    });

    pasteAndApply(deepPlanJson);

    // The status element must show an error message
    const statusEl = screen.getByRole("status");
    expect(statusEl).toBeInTheDocument();
    expect(statusEl.textContent).toMatch(/❌/);
    expect(statusEl.textContent).toMatch(/nested|depth|10/i);
  });

  it("validatePlanShape() throws for depth > 10 payload", () => {
    function nest(depth: number): object {
      if (depth === 0) return { value: "leaf" };
      return { child: nest(depth - 1) };
    }
    const deepPlanJson = JSON.stringify({
      planType: "single_week",
      meta: { appName: "Test", version: "v1", notes: "" },
      days: [],
      deep: nest(12),
    });

    expect(() => validatePlanShape(deepPlanJson)).toThrow(/nested|depth|10/i);
  });
});
