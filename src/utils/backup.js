// Local-only backup / export (GAP-02). Pure functions — no account, no server
// upload anywhere. A backup is a single JSON file the user downloads to their
// own device and can import back later.
import { MAX_EXERCISE_NAME_LENGTH } from "../helpers.js";

export const BACKUP_APP = "workoutplanstudio";
export const BACKUP_VERSION = 1;

export function buildBackup({ plan, sessions }) {
  return {
    app: BACKUP_APP,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    plan: plan ?? null,
    sessions: Array.isArray(sessions) ? sessions : [],
  };
}

function collectPlanExerciseNames(plan) {
  const names = [];
  const days = Array.isArray(plan?.days) ? plan.days : [];
  for (const day of days) {
    for (const ex of day.exercises ?? []) {
      if (typeof ex?.name === "string") names.push(ex.name);
    }
  }
  return names;
}

export function parseBackup(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    throw new Error("That file isn't a valid backup — it doesn't contain valid JSON.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("That file isn't a valid backup — it should contain a workout plan and history.");
  }
  if (parsed.app !== BACKUP_APP) {
    throw new Error("That file isn't a WorkoutPlanStudio backup.");
  }
  if (parsed.version !== BACKUP_VERSION) {
    throw new Error(
      `This backup is version ${parsed.version ?? "unknown"} — this app can only open version ${BACKUP_VERSION} backups.`
    );
  }
  if (!parsed.plan || typeof parsed.plan !== "object") {
    throw new Error("That backup is missing the workout plan.");
  }
  if (!Array.isArray(parsed.sessions)) {
    throw new Error("That backup is missing the session history.");
  }
  const badNames = [
    ...collectPlanExerciseNames(parsed.plan),
    ...parsed.sessions.flatMap((s) =>
      (s.completedExercises ?? []).map((ex) => ex.name).filter((n) => typeof n === "string")
    ),
  ].filter((n) => n.length > MAX_EXERCISE_NAME_LENGTH);
  if (badNames.length > 0) {
    throw new Error(
      `This backup contains an exercise name over ${MAX_EXERCISE_NAME_LENGTH} characters: "${badNames[0].slice(0, 60)}…" — shorten the name and export again.`
    );
  }
  return { plan: parsed.plan, sessions: parsed.sessions };
}

function csvCell(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function sessionsToCsv(sessions) {
  const header = "Date,Plan,Day,Exercise,Sets completed,Sets total,Weight";
  const rows = [];
  for (const session of sessions ?? []) {
    const date = typeof session.savedAt === "string" ? session.savedAt.slice(0, 10) : "";
    for (const ex of session.completedExercises ?? []) {
      const weight = (ex.setLogs ?? [])
        .filter((log) => log.weight)
        .map((log) => `${log.weight.value} ${log.weight.unit}`)
        .join("; ");
      rows.push(
        [
          date,
          session.planName ?? "",
          session.dayLabel ?? "",
          ex.name ?? "",
          ex.completedSetIds?.length ?? 0,
          ex.totalSets ?? 0,
          weight,
        ]
          .map(csvCell)
          .join(",")
      );
    }
  }
  return [header, ...rows].join("\n");
}
