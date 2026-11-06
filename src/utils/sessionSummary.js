// Session-summary helpers (IMP-01 / GAP-10). Pure functions.
// Volume is estimated: weight × reps per completed set, using the plan's reps
// for the exercise. A "10-12" range is read as its upper number (12); a
// time-based reps value like "30 sec" contributes no volume.

export function parseRepsUpper(reps) {
  if (reps === undefined || reps === null) return 0;
  const s = String(reps);
  if (/sec/i.test(s)) return 0;
  const range = s.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (range) return Number(range[2]);
  const single = s.match(/(\d+(?:\.\d+)?)/);
  return single ? Number(single[1]) : 0;
}

function weightInKg(weight) {
  if (!weight) return 0;
  return weight.unit === "lb" ? weight.value * 0.453592 : weight.value;
}

/**
 * @param {object} snapshot — a CompletedSession snapshot
 * @param {Array<{id: string, reps: string}>} planExercises — the day's plan
 *   exercises, so each logged exercise can be matched to its plan reps
 * @returns {number} estimated total volume in kg, rounded
 */
export function estimateSessionVolume(snapshot, planExercises) {
  const byId = new Map((planExercises ?? []).map((ex) => [ex.id, ex]));
  const byName = new Map((planExercises ?? []).map((ex) => [ex.name, ex]));
  let totalKg = 0;
  for (const ex of snapshot?.completedExercises ?? []) {
    const planEx = byId.get(ex.id) ?? byName.get(ex.name);
    const reps = parseRepsUpper(planEx?.reps);
    if (reps === 0) continue;
    for (const setId of ex.completedSetIds ?? []) {
      const log = (ex.setLogs ?? []).find((l) => l.setId === setId);
      totalKg += weightInKg(log?.weight) * reps;
    }
  }
  return Math.round(totalKg);
}
