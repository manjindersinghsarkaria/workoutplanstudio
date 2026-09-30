/**
 * enrichPlan — takes a normalized compact plan (from normalizePlan) and fills in
 * instructions, formTips, media, and alternates for each exercise by matching
 * exercise names against the local exerciseLibrary.
 *
 * Exercises that don't match anything in the library are left as-is
 * (the plan still works, the user just won't see tips for those exercises).
 */

import { findExercise } from "@/data/exerciseLibrary";

function enrichExercise(ex) {
  // Already has rich content — don't overwrite
  if (ex.instructions?.length && ex.formTips?.length && ex.media?.url) return ex;

  const entry = findExercise(ex.name);
  if (!entry) return ex;

  return {
    ...ex,
    instructions:
      ex.instructions?.length ? ex.instructions : entry.instructions,
    formTips:
      ex.formTips?.length ? ex.formTips : entry.formTips,
    media:
      ex.media?.url
        ? ex.media
        : { type: "youtube", url: entry.mediaUrl, label: "Search on YouTube" },
    alternates:
      ex.alternates?.length
        ? ex.alternates
        : entry.alternates.map((alt, i) => ({
            id: `${ex.id}-alt${i + 1}`,
            name: alt.name,
            note: alt.note,
            instructions: [],
            formTips: [],
            media: { type: "youtube", url: findExercise(alt.name)?.mediaUrl ?? "", label: "Search on YouTube" },
          })),
  };
}

export function enrichPlan(plan) {
  if (!plan || !Array.isArray(plan.days)) return plan;

  return {
    ...plan,
    days: plan.days.map((day) => ({
      ...day,
      exercises: Array.isArray(day.exercises)
        ? day.exercises.map(enrichExercise)
        : day.exercises,
    })),
  };
}
