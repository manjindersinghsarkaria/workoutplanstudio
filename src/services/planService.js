import Dexie from "dexie";

if (!globalThis.indexedDB) {
  throw new Error("IndexedDB is not supported in this browser");
}

const db = new Dexie("WorkoutAppDB");
db.version(1).stores({ plans: "++id, savedAt" });
db.version(2).stores({ plans: "++id, savedAt", completedSessions: "++id, savedAt" });

/**
 * @typedef {{ id?: number, plan: object, promptOptions: object, savedAt: string }} PlanRecord
 */

/** Writes a new PlanRecord. Returns the assigned id. */
export async function savePlan(plan, promptOptions) {
  const id = await db.plans.add({
    plan,
    promptOptions,
    savedAt: new Date().toISOString(),
  });
  return id;
}

/** Returns the PlanRecord with id === 1, or null if none exists. */
export async function getPlan() {
  const record = await db.plans.get(1);
  return record ? { ...record } : null;
}

/** Upserts the PlanRecord at id=1. */
export async function updatePlan(plan, promptOptions) {
  await db.plans.put({ id: 1, plan, promptOptions, savedAt: new Date().toISOString() });
}

/** Removes all records from the plans store. */
export async function deletePlan() {
  await db.plans.clear();
}

/** Appends a CompletedSession record. Returns the assigned id. */
export async function saveCompletedSession(session) {
  return db.completedSessions.add(session);
}

/** Returns all CompletedSession records ordered by savedAt descending (newest first). */
export async function getCompletedSessions() {
  return db.completedSessions.orderBy("savedAt").reverse().toArray();
}

/** Removes a single CompletedSession by its Dexie auto-id. */
export async function deleteCompletedSession(id) {
  return db.completedSessions.delete(id);
}
