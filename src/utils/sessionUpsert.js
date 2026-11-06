// Session upsert identity — a "session" is one plan + one day on one local date.
// Saving a partial session for the same key updates the existing record instead
// of appending a duplicate. A completed (100%) save is never overwritten:
// the next save for that key starts a new record.

export function getSessionUpsertKey(session) {
  const date = typeof session?.savedAt === "string" ? session.savedAt.slice(0, 10) : "";
  return `${session?.planName ?? ""}|${session?.dayLabel ?? ""}|${date}`;
}

export function shouldReusePrevious(prev, next) {
  if (!prev || !next) return false;
  if (prev.completionPercent >= 100) return false;
  return getSessionUpsertKey(prev) === getSessionUpsertKey(next);
}
