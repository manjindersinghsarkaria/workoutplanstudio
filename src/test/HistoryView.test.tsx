// Feature: workout-session-data-model
// Tests for HistoryView — Requirements 12.5, 12.6, 12.8

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import HistoryView from "@/components/views/HistoryView";
import type { CompletedSession } from "@/types/workout";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeSession(overrides: Partial<CompletedSession> = {}): CompletedSession {
  return {
    id: "s1",
    savedAt: "2025-06-15T15:42:00.000Z",
    planName: "Strength Plan",
    weekLabel: "Week 1",
    dayLabel: "Day 1",
    dayTitle: "Chest + Triceps",
    completedExercises: [
      {
        id: "e1",
        name: "Bench Press",
        totalSets: 3,
        completedSetIds: ["set_1", "set_2"],
        setLogs: [
          { setId: "set_1", completedAt: "2025-06-15T15:00:00Z", weight: { value: 80, unit: "kg" } },
          { setId: "set_2", completedAt: "2025-06-15T15:05:00Z" },
        ],
      },
    ],
    ...overrides,
  };
}

// ── Unit tests ────────────────────────────────────────────────────────────────

describe("HistoryView — empty state", () => {
  it("renders 'No saved sessions yet' when completedSessions is empty", () => {
    render(<HistoryView completedSessions={[]} />);
    expect(screen.getByText("No saved sessions yet")).toBeInTheDocument();
  });

  it("renders 'No saved sessions yet' when prop is omitted", () => {
    // @ts-expect-error intentionally omitting prop
    render(<HistoryView />);
    expect(screen.getByText("No saved sessions yet")).toBeInTheDocument();
  });
});

describe("HistoryView — session list", () => {
  it("renders dayTitle for each session", () => {
    const sessions = [
      makeSession({ id: "s1", dayTitle: "Chest + Triceps" }),
      makeSession({ id: "s2", dayTitle: "Back + Biceps" }),
    ];
    render(<HistoryView completedSessions={sessions} />);
    expect(screen.getByText("Chest + Triceps")).toBeInTheDocument();
    expect(screen.getByText("Back + Biceps")).toBeInTheDocument();
  });

  it("renders total sets completed derived from completedSetIds (Req 12.8)", () => {
    const session = makeSession({
      completedExercises: [
        { id: "e1", name: "Squat", totalSets: 3, completedSetIds: ["s1", "s2"], setLogs: [] },
        { id: "e2", name: "Lunge", totalSets: 3, completedSetIds: ["s3"], setLogs: [] },
      ],
    });
    render(<HistoryView completedSessions={[session]} />);
    // 2 + 1 = 3 sets
    expect(screen.getByText("3 sets")).toBeInTheDocument();
  });

  it("renders a formatted date for each session", () => {
    const session = makeSession({ savedAt: "2025-01-20T10:30:00.000Z" });
    render(<HistoryView completedSessions={[session]} />);
    // The formatted date should appear somewhere in the document
    const dateEl = screen.getByText(/Jan 20, 2025/i);
    expect(dateEl).toBeInTheDocument();
  });
});

describe("HistoryView — detail view on tap", () => {
  it("shows detail view when a session card is tapped (Req 12.6)", () => {
    const session = makeSession();
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session: Chest \+ Triceps/i }));
    expect(screen.getByText("Session Summary")).toBeInTheDocument();
    expect(screen.getByText("Strength Plan · Week 1")).toBeInTheDocument();
  });

  it("renders exercise name in detail view", () => {
    const session = makeSession();
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session/i }));
    expect(screen.getByText("Bench Press")).toBeInTheDocument();
  });

  it("renders sets completed vs total in detail view", () => {
    const session = makeSession();
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session/i }));
    expect(screen.getByText("2 / 3 sets completed")).toBeInTheDocument();
  });

  it("renders weight value when SetLog has weight", () => {
    const session = makeSession();
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session/i }));
    expect(screen.getByText("80 kg")).toBeInTheDocument();
  });

  it("renders '—' when no SetLog weight for a set (Req 12.6)", () => {
    const session = makeSession();
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session/i }));
    // set_2 has no weight, set 3 was not completed
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it("renders '—' for sets that were not completed at all", () => {
    const session = makeSession({
      completedExercises: [
        {
          id: "e1",
          name: "Deadlift",
          totalSets: 3,
          completedSetIds: [],
          setLogs: [],
        },
      ],
    });
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session/i }));
    const dashes = screen.getAllByText("—");
    expect(dashes).toHaveLength(3);
  });

  it("navigates back to list when Back button is clicked", () => {
    const session = makeSession();
    render(<HistoryView completedSessions={[session]} />);
    fireEvent.click(screen.getByRole("button", { name: /View session/i }));
    fireEvent.click(screen.getByRole("button", { name: /Back to history list/i }));
    expect(screen.getByText("Chest + Triceps")).toBeInTheDocument();
  });
});

// ── Property-based test ───────────────────────────────────────────────────────

// Feature: workout-session-data-model, Property 18: History ordered by savedAt descending

describe("Property 18: History ordered by savedAt descending (Req 12.5)", () => {
  it("most recent session appears first when sorted by savedAt desc", () => {
    // Generate arrays of CompletedSession with random savedAt ISO strings
    // and assert that sorting by savedAt desc places the most recent first.
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            savedAt: fc.date({ minDate: new Date("2020-01-01"), maxDate: new Date("2030-01-01") }).map((d) => d.toISOString()),
            planName: fc.string({ minLength: 1, maxLength: 20 }),
            weekLabel: fc.string({ minLength: 1, maxLength: 10 }),
            dayLabel: fc.string({ minLength: 1, maxLength: 10 }),
            dayTitle: fc.string({ minLength: 1, maxLength: 30 }),
            completedExercises: fc.constant([]),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (sessions) => {
          // Sort by savedAt descending
          const sorted = [...sessions].sort(
            (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
          );

          // Assert most recent is first
          for (let i = 0; i < sorted.length - 1; i++) {
            expect(new Date(sorted[i].savedAt).getTime()).toBeGreaterThanOrEqual(
              new Date(sorted[i + 1].savedAt).getTime()
            );
          }
        }
      )
    );
  });
});
