/**
 * sharePlan — utilities for encoding/decoding a plan in a shareable URL hash.
 *
 * Format: https://workoutplanstudio.ca/app#plan=BASE64
 *
 * Only the compact skeleton is encoded (name/sets/reps/rest/note per exercise,
 * label/short/title per day, meta.notes). Rich content (instructions, formTips,
 * alternates, media) is stripped before encoding — enrichPlan() re-adds it
 * from the local library on the recipient's device.
 *
 * UTF-8-safe encoding: encodeURIComponent → btoa (encode), atob → decodeURIComponent (decode).
 */

const HASH_KEY = "plan";
const MAX_ENCODED_BYTES = 32_000; // ~24 KB decoded — generous limit

// ── Encoding ─────────────────────────────────────────────────────────────────

function extractSkeleton(plan) {
  const days = Array.isArray(plan.days) ? plan.days : [];
  return {
    planType: plan.planType || "single_week",
    meta: { notes: plan.meta?.notes || "" },
    days: days.map((day) => ({
      label: day.label || "",
      short: day.short || "",
      title: day.title || "",
      exercises: Array.isArray(day.exercises)
        ? day.exercises.map((ex) => {
            const e = { name: ex.name, sets: ex.sets, reps: ex.reps, rest: ex.rest };
            if (ex.note) e.note = ex.note;
            return e;
          })
        : [],
    })),
  };
}

/**
 * encodePlanForShare — returns a URL-safe base64 string of the compact plan skeleton.
 * Throws if the result exceeds the byte limit.
 */
export function encodePlanForShare(plan) {
  const skeleton = extractSkeleton(plan);
  const json = JSON.stringify(skeleton);
  // UTF-8-safe base64
  const encoded = btoa(unescape(encodeURIComponent(json)));
  if (encoded.length > MAX_ENCODED_BYTES) {
    throw new Error("Plan is too large to share via URL. Try a shorter plan or fewer days.");
  }
  return encoded;
}

/**
 * buildShareUrl — returns the full shareable URL for the current plan.
 */
export function buildShareUrl(plan) {
  const encoded = encodePlanForShare(plan);
  const base = `${window.location.origin}/app`;
  return `${base}#${HASH_KEY}=${encoded}`;
}

// ── Decoding ─────────────────────────────────────────────────────────────────

/**
 * decodePlanFromHash — reads `window.location.hash`, attempts to decode a plan.
 * Returns the decoded plain object, or null if nothing is found / decoding fails.
 */
export function decodePlanFromHash() {
  const hash = window.location.hash; // e.g. "#plan=BASE64"
  if (!hash || !hash.includes(`${HASH_KEY}=`)) return null;

  const encoded = hash.slice(hash.indexOf(`${HASH_KEY}=`) + HASH_KEY.length + 1);
  if (!encoded) return null;

  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const parsed = JSON.parse(json);
    // Basic shape validation
    if (!parsed || !Array.isArray(parsed.days) || parsed.days.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * clearPlanHash — removes the #plan= fragment from the browser URL without a page reload.
 */
export function clearPlanHash() {
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
}

/**
 * buildShareUrlFromTemplate — converts a planTemplates entry (which uses a
 * different day shape than the app plan) into a shareable /app#plan= URL.
 * Template days use `day` (the session title) instead of `title`/`short`.
 */
export function buildShareUrlFromTemplate(template) {
  const plan = {
    planType: "single_week",
    meta: { notes: template.title },
    days: (template.days || []).map((d) => ({
      label: d.label || "",
      // Derive short name from everything before the first em-dash / en-dash / hyphen
      short: (d.day || "").split(/\s*[—–-]\s*/)[0].trim(),
      title: d.day || d.label || "",
      exercises: (d.exercises || []).map((ex) => {
        const e = { name: ex.name, sets: ex.sets, reps: ex.reps, rest: ex.rest };
        if (ex.note) e.note = ex.note;
        return e;
      }),
    })),
  };
  const encoded = encodePlanForShare(plan);
  return `${window.location.origin}/app#plan=${encoded}`;
}
