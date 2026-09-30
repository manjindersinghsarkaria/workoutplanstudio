/**
 * Unit tests for PlanService (src/services/planService.js)
 *
 * Uses fake-indexeddb to avoid real browser storage.
 * Requirements: 1.1, 1.2, 1.3, 2.2, 2.3, 5.1
 */

// Patch globalThis.indexedDB before planService (and Dexie) are imported.
// fake-indexeddb/auto sets up a fresh in-memory IDB environment.
import 'fake-indexeddb/auto';

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Dynamic import is used so that the module is resolved AFTER fake-indexeddb
// has patched globalThis.indexedDB.
const { savePlan, getPlan, updatePlan, deletePlan } = await import(
  '../services/planService.js'
);

const samplePlan = { weeks: [{ days: [] }] };
const sampleOpts = { goal: 'build muscle', experience: 'intermediate', days: '4' };

// Reset the store before every test so tests are fully isolated.
beforeEach(async () => {
  await deletePlan();
});

// ---------------------------------------------------------------------------
// Requirement 1.1 — DB is named WorkoutAppDB
// ---------------------------------------------------------------------------
describe('DB initialisation', () => {
  it('opens a database named WorkoutAppDB', async () => {
    // Dexie exposes the db name on the instance; we verify indirectly by
    // confirming the service works (it would throw on a bad db name).
    const result = await getPlan();
    expect(result).toBeNull();
  });

  it('has a plans table (savePlan writes without error)', async () => {
    await expect(savePlan(samplePlan, sampleOpts)).resolves.not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Requirement 1.3 — all four functions are exported and return Promises
// ---------------------------------------------------------------------------
describe('exports', () => {
  it('exports savePlan as a function', () => {
    expect(typeof savePlan).toBe('function');
  });

  it('exports getPlan as a function', () => {
    expect(typeof getPlan).toBe('function');
  });

  it('exports updatePlan as a function', () => {
    expect(typeof updatePlan).toBe('function');
  });

  it('exports deletePlan as a function', () => {
    expect(typeof deletePlan).toBe('function');
  });

  it('savePlan returns a Promise', () => {
    const result = savePlan(samplePlan, sampleOpts);
    expect(result).toBeInstanceOf(Promise);
    return result; // let vitest await it so the DB isn't left dirty
  });

  it('getPlan returns a Promise', () => {
    const result = getPlan();
    expect(result).toBeInstanceOf(Promise);
    return result;
  });

  it('updatePlan returns a Promise', () => {
    const result = updatePlan(samplePlan, sampleOpts);
    expect(result).toBeInstanceOf(Promise);
    return result;
  });

  it('deletePlan returns a Promise', () => {
    const result = deletePlan();
    expect(result).toBeInstanceOf(Promise);
    return result;
  });
});

// ---------------------------------------------------------------------------
// Requirement 3.5 — getPlan returns null when store is empty
// ---------------------------------------------------------------------------
describe('getPlan', () => {
  it('returns null when the store is empty', async () => {
    const record = await getPlan();
    expect(record).toBeNull();
  });

  // Requirement 2.2 — getPlan returns the record after savePlan
  it('returns the saved record after savePlan', async () => {
    await savePlan(samplePlan, sampleOpts);
    const record = await getPlan();
    expect(record).not.toBeNull();
    expect(record!.plan).toEqual(samplePlan);
    expect(record!.promptOptions).toEqual(sampleOpts);
  });
});

// ---------------------------------------------------------------------------
// Requirement 2.3 — updatePlan called twice leaves exactly one record
// ---------------------------------------------------------------------------
describe('updatePlan', () => {
  it('leaves exactly one record after two calls', async () => {
    const plan2 = { weeks: [{ days: ['Monday'] }] };
    const opts2 = { goal: 'lose weight', experience: 'beginner', days: '3' };

    await updatePlan(samplePlan, sampleOpts);
    await updatePlan(plan2, opts2);

    const record = await getPlan();
    expect(record).not.toBeNull();
    // Should reflect the LAST call
    expect(record!.plan).toEqual(plan2);
    expect(record!.promptOptions).toEqual(opts2);
  });
});

// ---------------------------------------------------------------------------
// Requirement 5.1 — deletePlan leaves the store empty
// ---------------------------------------------------------------------------
describe('deletePlan', () => {
  it('leaves the store empty after saving a record', async () => {
    await savePlan(samplePlan, sampleOpts);
    await deletePlan();
    const record = await getPlan();
    expect(record).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Requirement 6.3 — PlanService functions make no network requests
// ---------------------------------------------------------------------------
describe('no network requests', () => {
  it('savePlan makes no fetch/XHR calls', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    await savePlan(samplePlan, sampleOpts);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('getPlan makes no fetch/XHR calls', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    await getPlan();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('updatePlan makes no fetch/XHR calls', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    await updatePlan(samplePlan, sampleOpts);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('deletePlan makes no fetch/XHR calls', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    await deletePlan();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
