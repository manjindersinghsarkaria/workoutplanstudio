/**
 * useEffectiveExercise Hook
 * 
 * Derives the effective exercise from a base exercise and selected alternate.
 * Implements fallback logic for missing alternate fields.
 * 
 * @param {Object} baseExercise - The base exercise from the workout plan
 * @param {Array} alternates - Array of alternate exercises
 * @param {string|null} selectedAlternateId - ID of the selected alternate, or null for base
 * @returns {Object} EffectiveExercise with merged fields and metadata
 */
export function useEffectiveExercise(baseExercise, alternates, selectedAlternateId) {
  // If no alternate is selected, return base exercise with metadata
  if (!selectedAlternateId) {
    return {
      id: baseExercise.id,
      name: baseExercise.name,
      reps: baseExercise.reps,
      rest: baseExercise.rest,
      sets: baseExercise.sets,
      note: baseExercise.note,
      instructions: baseExercise.instructions || [],
      formTips: baseExercise.formTips || [],
      media: baseExercise.media || null,
      isAlternate: false,
      alternateName: null,
    };
  }

  // Find the selected alternate
  const selectedAlternate = (alternates || []).find(
    (alt) => alt.id === selectedAlternateId
  );

  // If selected alternate not found, log warning and fall back to base exercise
  if (!selectedAlternate) {
    console.warn(
      `[useEffectiveExercise] selectedAlternateId "${selectedAlternateId}" does not match any alternate for exercise "${baseExercise.id}". Falling back to base exercise.`
    );
    return {
      id: baseExercise.id,
      name: baseExercise.name,
      reps: baseExercise.reps,
      rest: baseExercise.rest,
      sets: baseExercise.sets,
      note: baseExercise.note,
      instructions: baseExercise.instructions || [],
      formTips: baseExercise.formTips || [],
      media: baseExercise.media || null,
      isAlternate: false,
      alternateName: null,
    };
  }

  // Merge alternate with base exercise, using fallback logic
  return {
    id: baseExercise.id, // Always preserve base exercise ID
    name: selectedAlternate.name,
    reps: selectedAlternate.reps ?? baseExercise.reps,
    rest: selectedAlternate.rest ?? baseExercise.rest,
    sets: baseExercise.sets, // Never overridden
    note: selectedAlternate.note ?? baseExercise.note,
    instructions: selectedAlternate.instructions ?? baseExercise.instructions ?? [],
    formTips: selectedAlternate.formTips ?? baseExercise.formTips ?? [],
    media: selectedAlternate.media ?? baseExercise.media ?? null,
    isAlternate: true,
    alternateName: selectedAlternate.name,
  };
}
