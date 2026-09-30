import React, { useState } from "react";
import { History, ChevronLeft, Trophy } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";
import { calcPersonalRecords } from "@/utils/workoutDerived";

/**
 * Format an ISO 8601 timestamp or Firestore Timestamp into a human-readable date string.
 * e.g. "Jun 15, 2025, 3:42 PM"
 */
function formatSavedAt(timestamp) {
  try {
    // Handle Firestore Timestamp objects
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    }
    // Handle ISO strings or Date objects
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "Recently";
    }
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "Recently";
  }
}

/**
 * Derive total sets completed across all exercises in a session.
 * Requirement 12.8: computed at render time from completedSetIds.
 */
function totalSetsCompleted(completedExercises) {
  return completedExercises.reduce(
    (sum, ex) => sum + ex.completedSetIds.length,
    0
  );
}

/**
 * HistoryDetailView — shown when a session card is tapped.
 * Requirement 12.6: day title, date, exercises, sets, weights.
 */
function HistoryDetailView({ session, onBack }) {
  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white active:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        aria-label="Back to history list"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Back
      </button>

      {/* Session header */}
      <SectionCard className="overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-500 p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
            <History className="h-4 w-4" aria-hidden="true" />
            Session Summary
          </div>
          <div className="mt-2 text-2xl font-black">{session.dayTitle}</div>
          <div className="mt-1 text-sm font-semibold text-white/80">
            {session.planName} · {session.weekLabel}
          </div>
          <div className="mt-1 text-xs text-white/70">
            {formatSavedAt(session.savedAt)}
          </div>
        </div>
      </SectionCard>

      {/* Exercise breakdown */}
      <div className="space-y-3">
        {session.completedExercises.map((ex) => (
          <SectionCard key={ex.id} className="p-4">
            <div className="mb-2 text-sm font-black text-slate-900 dark:text-white">
              {ex.name}
            </div>
            <div className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              {ex.completedSetIds.length} / {ex.totalSets} sets completed
            </div>

            {/* Per-set weight log */}
            <div className="space-y-1">
              {Array.from({ length: ex.totalSets }, (_, i) => {
                const setId = ex.completedSetIds[i];
                const log = setId
                  ? ex.setLogs.find((l) => l.setId === setId)
                  : undefined;
                const weightLabel =
                  log?.weight
                    ? `${log.weight.value} ${log.weight.unit}`
                    : "—";
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-500 dark:text-slate-400">
                      Set {i + 1}
                    </span>
                    <span
                      className={
                        log?.weight
                          ? "font-bold text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-slate-500"
                      }
                    >
                      {weightLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

/**
 * PersonalRecords — compact grid of best weight per exercise.
 * Only renders when at least one set log contains a weight entry.
 */
function PersonalRecords({ completedSessions }) {
  const prs = calcPersonalRecords(completedSessions);
  const entries = Object.entries(prs);
  if (entries.length === 0) return null;

  return (
    <SectionCard className="overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
          <Trophy className="h-4 w-4" aria-hidden="true" />
          Personal Records
        </div>
        <div className="mt-1 text-lg font-black">Your Best Lifts</div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {entries.map(([name, pr]) => (
          <div key={name} className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900 dark:text-white mr-3">
              {name}
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-black text-amber-600 dark:text-amber-400">
                {pr.weight} {pr.unit}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(pr.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * HistoryList — one card per CompletedSession.
 * Requirement 12.5: ordered by savedAt desc (caller's responsibility to pass sorted array).
 * Requirement 12.8: total sets derived at render time.
 */
function HistoryList({ completedSessions, onSelectSession }) {
  if (completedSessions.length === 0) {
    return (
      <SectionCard className="p-5">
        <p className="text-sm text-slate-700 dark:text-slate-200">
          No saved sessions yet
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Complete a full workout day to see your history here. Sessions are automatically saved when you finish all exercises.
        </p>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-3">
      {completedSessions.map((session) => {
        const totalSets = totalSetsCompleted(session.completedExercises);
        const completionPercent = session.completionPercent || 
          (session.completedExercises.length > 0 
            ? Math.round((totalSets / session.completedExercises.reduce((sum, ex) => sum + ex.totalSets, 0)) * 100)
            : 0);
        
        // Check if session was updated (has updatedAt field)
        const wasUpdated = session.updatedAt && session.updatedAt !== session.savedAt;
        
        return (
          <button
            key={session.id}
            onClick={() => onSelectSession(session)}
            className="w-full text-left cursor-pointer active:scale-95 active:opacity-75 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-transform"
            aria-label={`View session: ${session.dayTitle}`}
          >
            <SectionCard className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {session.dayTitle}
                    </div>
                    {wasUpdated && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        UPDATED
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {session.dayLabel} · {session.planName}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {formatSavedAt(session.savedAt)}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {completionPercent}%
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {totalSets} sets
                  </div>
                </div>
              </div>
            </SectionCard>
          </button>
        );
      })}
    </div>
  );
}

/**
 * HistoryView — top-level view for the "history" NavTab.
 *
 * Props:
 *   completedSessions: CompletedSession[]  — ordered by savedAt desc
 *
 * Legacy props (historyLog, setHistoryLog, setView) are accepted but ignored
 * to avoid breaking the existing App.jsx wiring during migration.
 */
export default function HistoryView({ completedSessions = [], setView }) {
  const [selectedSession, setSelectedSession] = useState(null);

  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const recentSessions = completedSessions.filter(
    (s) => new Date(s.savedAt) >= twoWeeksAgo
  );

  if (selectedSession) {
    return (
      <HistoryDetailView
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header card */}
      <SectionCard className="overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-500 p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
            <History className="h-4 w-4" aria-hidden="true" />
            Training History
          </div>
          <div className="mt-2 text-2xl font-black">Session History</div>
          <div className="mt-1 text-sm font-semibold text-white/90">
            Your completed workouts from the last 2 weeks.
          </div>
        </div>
      </SectionCard>

      {/* Personal Records — derived from all-time history */}
      <PersonalRecords completedSessions={completedSessions} />

      {/* Session list — last 2 weeks only */}
      <HistoryList
        completedSessions={recentSessions}
        onSelectSession={setSelectedSession}
      />
    </div>
  );
}
