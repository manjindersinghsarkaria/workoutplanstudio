import { DEFAULT_PLAN, THEME_PRESETS } from "@/constants";

export function normalizeDayTheme(day, idx) {
    if (day.theme) return day.theme;
    return THEME_PRESETS[idx % THEME_PRESETS.length];
  }

export function progressKey(dayId, exerciseId) { return `${dayId}__${exerciseId}`; }
export function getCompletedSets(progressMap, dayId, exerciseId) { return Number(progressMap[progressKey(dayId, exerciseId)] || 0); }
export function getWeightValue(weightsMap, dayId, exerciseId) { return weightsMap[progressKey(dayId, exerciseId)] || ""; }

/**
 * Parses a free-text weight string into a structured { value, unit } entry.
 * Accepts: "100 kg", "25 lb", "100", "12.5kg", "25LB", etc.
 * Returns null if the string is empty or cannot be parsed.
 */
export function parseWeightEntry(raw) {
  if (!raw || typeof raw !== "string") return null;
  const match = raw.trim().match(/^(\d+(?:\.\d+)?)\s*(kg|lb)?$/i);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const unit = match[2] ? match[2].toLowerCase() : "kg";
  if (isNaN(value) || value <= 0) return null;
  return { value, unit };
}
export function formatTime(s) { const t = Math.max(0, s || 0); return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; }
export function formatDateTime(iso) { try { return new Date(iso).toLocaleString(); } catch { return iso; } }

/**
 * Strips markdown link syntax from a URL string.
 * e.g. "[https://youtube.com/...](https://google.com/...)" → "https://youtube.com/..."
 * Prefers the label URL (inside [...]) when it is itself a valid https URL,
 * since AI sometimes wraps the real URL as the label and puts a redirect as the href.
 */
function stripMarkdownLink(url) {
  if (!url) return "";
  // Match [label](href) — prefer label if it looks like a real URL
  const mdMatch = url.match(/\[([^\]]*)\]\((https?:\/\/[^)]+)\)/);
  if (mdMatch) {
    const label = mdMatch[1].trim();
    const href = mdMatch[2].trim();
    // If the label is itself a valid https URL, use it (it's the real link)
    if (/^https?:\/\//.test(label)) return label;
    return href;
  }
  // Plain URL possibly wrapped in parens
  const plainMatch = url.match(/^\(?(https?:\/\/[^)]+)\)?$/);
  return plainMatch ? plainMatch[1] : url.trim();
}

export function safeMediaUrl(url) {
  if (!url) return "";
  try {
    return new URL(url).protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

// ── Internal helpers for validatePlanShape ────────────────────────────────────

function countDepth(val, d = 0) {
  if (d > 11 || typeof val !== "object" || val === null) return d;
  const values = Array.isArray(val) ? val : Object.values(val);
  if (values.length === 0) return d;
  return Math.max(...values.map((v) => countDepth(v, d + 1)));
}

function countFields(val) {
  if (typeof val !== "object" || val === null) return 0;
  const entries = Array.isArray(val) ? val : Object.values(val);
  const ownKeys = Array.isArray(val) ? 0 : Object.keys(val).length;
  return ownKeys + entries.reduce((s, v) => s + countFields(v), 0);
}

/**
 * extractJson — strips common AI wrapping before JSON.parse:
 *   1. Markdown code fences  ```json ... ``` or ``` ... ```
 *   2. Leading/trailing prose — finds outermost { } pair
 */
function extractJson(raw) {
  const s = raw.trim();

  // 1. Markdown code fence
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1].trim();

  // 2. Extract outermost { } block from surrounding prose
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start !== -1 && end > start) return s.slice(start, end + 1);

  return s;
}

/**
 * diagnoseSyntaxError — returns a plain-English message based on why JSON.parse failed.
 */
function diagnoseSyntaxError(raw) {
  const opens = (raw.match(/{/g) || []).length;
  const closes = (raw.match(/}/g) || []).length;

  if (opens > closes) {
    return "The AI response was cut off before it finished. Go back to the AI chat and type \"continue\" or \"please finish the JSON\" to get the rest, then paste the complete response.";
  }
  if (!raw.trim().startsWith("{")) {
    return "This doesn't look like a workout plan. Make sure you copied the AI's full response — it should start with { and end with }.";
  }
  return "The plan format is invalid. Go back to the AI and ask it to regenerate: \"Please output the full workout plan again as valid JSON with no extra text.\"";
}

/**
 * diagnosePlanStructure — checks the parsed object has required shape.
 * Returns an error string, or null if all good.
 */
function diagnosePlanStructure(parsed) {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return "The plan is empty or malformed. Try generating again.";
  }

  // Support both single_week (days[]) and multi_week (weeks[].days[])
  const days =
    Array.isArray(parsed.days)
      ? parsed.days
      : Array.isArray(parsed.weeks)
      ? parsed.weeks.flatMap((w) => w.days || [])
      : null;

  if (!days || days.length === 0) {
    return "The plan is missing workout days. It should include a \"days\" array with at least one workout. Try regenerating.";
  }

  const firstWithExercises = days.find(
    (d) => Array.isArray(d.exercises) && d.exercises.length > 0
  );
  if (!firstWithExercises) {
    return "The workout days exist but have no exercises. Ask the AI to regenerate and include exercises for each day.";
  }

  return null;
}

/**
 * validatePlanShape — extracts, parses, and validates a raw string from the user.
 * Throws a user-friendly Error describing exactly what went wrong.
 * Returns the parsed object on success.
 */
export function validatePlanShape(raw) {
  if (!raw || !raw.trim()) {
    throw new Error("Nothing was pasted. Copy the AI's full response and paste it here.");
  }

  const byteSize = new TextEncoder().encode(raw).length;
  if (byteSize > 500_000) {
    throw new Error("The pasted content is too large (over 500 KB). Make sure you only pasted the workout plan JSON, not a full page of text.");
  }

  // Extract JSON from surrounding prose / code fences
  const extracted = extractJson(raw);

  let parsed;
  try {
    parsed = JSON.parse(extracted);
  } catch {
    throw new Error(diagnoseSyntaxError(extracted));
  }

  if (countDepth(parsed) > 10) {
    throw new Error("The plan structure is too deeply nested. Try using the compact format in the prompt.");
  }
  if (countFields(parsed) > 5000) {
    throw new Error("The plan has too many fields (over 5000). Try generating a shorter plan or fewer days.");
  }

  const structureError = diagnosePlanStructure(parsed);
  if (structureError) throw new Error(structureError);

  return parsed;
}

/**
 * normalizePlan — handles:
 *  1. Legacy flat { days: [] }
 *  2. New single_week { planType:"single_week", days: [] }
 *  3. New multi_week  { planType:"multi_week", weeks: [{ weekNumber, days:[] }] }
 *
 * Internal representation always uses flat `days[]` with IDs prefixed by week
 * for multi-week plans (w1d1, w1d2 … w2d1 …).
 */
export function normalizePlan(input) {
  const fallback = JSON.parse(JSON.stringify(DEFAULT_PLAN));
  if (!input || typeof input !== "object") return fallback;

  const planType = input.planType || "single_week";
  const includeWarmUp = input.includeWarmUp !== undefined ? Boolean(input.includeWarmUp) : true;
  const includeCoolDown = input.includeCoolDown !== undefined ? Boolean(input.includeCoolDown) : true;

  let rawDays = [];

  if (planType === "multi_week" && Array.isArray(input.weeks)) {
    input.weeks.forEach((week) => {
      const wNum = week.weekNumber || 1;
      const wDays = Array.isArray(week.days) ? week.days : [];
      wDays.forEach((day, dIdx) => {
        rawDays.push({ ...day, _weekNum: wNum, _weekDayIdx: dIdx });
      });
    });
  } else {
    rawDays = Array.isArray(input.days) ? input.days : fallback.days;
  }

  const normalizedDays = rawDays.map((day, idx) => {
    const wNum = day._weekNum;
    const idPrefix = wNum ? `w${wNum}d${(day._weekDayIdx ?? idx) + 1}` : null;
    const baseId = idPrefix || day.id || `day${idx + 1}`;
    const weekLabel = wNum ? `Wk ${wNum} · ` : "";

    const exercises = Array.isArray(day.exercises) ? day.exercises : [];
    const warmUp = Array.isArray(day.warmUp) ? day.warmUp : [];
    const coolDown = Array.isArray(day.coolDown) ? day.coolDown : [];

    return {
      id: baseId,
      label: day.label || `Day ${idx + 1}`,
      short: day.short || `Day ${idx + 1}`,
      title: day.title || `Workout Day ${idx + 1}`,
      weekLabel,
      theme: normalizeDayTheme(day, idx),
      warmUp: warmUp.map((w) => ({ name: w.name || "", duration: w.duration || "", note: w.note || "" })),
      exercises: exercises.map((ex, exIdx) => ({
        id: ex.id || `${baseId}e${exIdx + 1}`,
        name: ex.name || `Exercise ${exIdx + 1}`,
        sets: Number(ex.sets) > 0 ? Number(ex.sets) : 3,
        reps: ex.reps || "10-12",
        rest: Number(ex.rest) >= 0 ? Number(ex.rest) : 60,
        note: ex.note || "",
        alternates: Array.isArray(ex.alternates) ? ex.alternates : [],
        // Beginner-support fields (optional, backward-compatible)
        instructions: Array.isArray(ex.instructions) ? ex.instructions : [],
        formTips: Array.isArray(ex.formTips) ? ex.formTips : [],
        media: ex.media && typeof ex.media === "object" ? {
          type: ex.media.type || "youtube",
          url: safeMediaUrl(stripMarkdownLink(ex.media.url || "")),
          label: ex.media.label || "Watch Demo",
          thumbnailUrl: ex.media.thumbnailUrl || "",
        } : null,
      })),
      coolDown: coolDown.map((c) => ({ name: c.name || "", duration: c.duration || "", note: c.note || "" })),
    };
  });

  return {
    meta: { appName: input.meta?.appName || fallback.meta.appName, version: input.meta?.version || fallback.meta.version, notes: input.meta?.notes || fallback.meta.notes },
    planType,
    includeWarmUp,
    includeCoolDown,
    totalWeeks: planType === "multi_week" ? (input.totalWeeks || (input.weeks?.length || 1)) : 1,
    days: normalizedDays.length ? normalizedDays : fallback.days,
  };
}
