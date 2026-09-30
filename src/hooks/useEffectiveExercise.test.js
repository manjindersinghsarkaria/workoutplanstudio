import { describe, it, expect } from 'vitest';
import { useEffectiveExercise } from './useEffectiveExercise';

describe('useEffectiveExercise', () => {
  const baseExercise = {
    id: 'ex1',
    name: 'Bench Press',
    sets: 3,
    reps: '10-12',
    rest: 60,
    note: 'Keep core tight',
    instructions: ['Step 1', 'Step 2'],
    formTips: ['Tip 1', 'Tip 2'],
    media: { type: 'youtube', url: 'https://youtube.com/watch?v=123', label: 'Watch Demo' },
  };

  const alternates = [
    {
      id: 'alt1',
      name: 'Dumbbell Press',
      reps: '12-15',
      rest: 45,
      note: 'Use lighter weight',
    },
    {
      id: 'alt2',
      name: 'Push-ups',
      // Missing optional fields - should fall back to base
    },
  ];

  it('returns base exercise when no alternate selected', () => {
    const result = useEffectiveExercise(baseExercise, alternates, null);
    
    expect(result.id).toBe('ex1');
    expect(result.name).toBe('Bench Press');
    expect(result.reps).toBe('10-12');
    expect(result.rest).toBe(60);
    expect(result.sets).toBe(3);
    expect(result.note).toBe('Keep core tight');
    expect(result.isAlternate).toBe(false);
    expect(result.alternateName).toBe(null);
  });

  it('returns merged exercise when alternate selected', () => {
    const result = useEffectiveExercise(baseExercise, alternates, 'alt1');
    
    expect(result.id).toBe('ex1'); // Always preserves base ID
    expect(result.name).toBe('Dumbbell Press');
    expect(result.reps).toBe('12-15');
    expect(result.rest).toBe(45);
    expect(result.sets).toBe(3); // Never overridden
    expect(result.note).toBe('Use lighter weight');
    expect(result.isAlternate).toBe(true);
    expect(result.alternateName).toBe('Dumbbell Press');
  });

  it('falls back to base values for missing alternate fields', () => {
    const result = useEffectiveExercise(baseExercise, alternates, 'alt2');
    
    expect(result.id).toBe('ex1');
    expect(result.name).toBe('Push-ups');
    expect(result.reps).toBe('10-12'); // Fallback to base
    expect(result.rest).toBe(60); // Fallback to base
    expect(result.sets).toBe(3);
    expect(result.note).toBe('Keep core tight'); // Fallback to base
    expect(result.instructions).toEqual(['Step 1', 'Step 2']); // Fallback to base
    expect(result.formTips).toEqual(['Tip 1', 'Tip 2']); // Fallback to base
    expect(result.media).toEqual(baseExercise.media); // Fallback to base
    expect(result.isAlternate).toBe(true);
    expect(result.alternateName).toBe('Push-ups');
  });

  it('preserves base exercise ID always', () => {
    const result1 = useEffectiveExercise(baseExercise, alternates, null);
    const result2 = useEffectiveExercise(baseExercise, alternates, 'alt1');
    const result3 = useEffectiveExercise(baseExercise, alternates, 'alt2');
    
    expect(result1.id).toBe('ex1');
    expect(result2.id).toBe('ex1');
    expect(result3.id).toBe('ex1');
  });

  it('handles null/undefined alternates array', () => {
    const result1 = useEffectiveExercise(baseExercise, null, 'alt1');
    const result2 = useEffectiveExercise(baseExercise, undefined, 'alt1');
    
    // Should fall back to base exercise
    expect(result1.name).toBe('Bench Press');
    expect(result1.isAlternate).toBe(false);
    expect(result2.name).toBe('Bench Press');
    expect(result2.isAlternate).toBe(false);
  });

  it('handles invalid alternate ID', () => {
    const result = useEffectiveExercise(baseExercise, alternates, 'nonexistent');
    
    // Should fall back to base exercise
    expect(result.name).toBe('Bench Press');
    expect(result.isAlternate).toBe(false);
    expect(result.alternateName).toBe(null);
  });

  it('handles missing optional fields in base exercise', () => {
    const minimalBase = {
      id: 'ex2',
      name: 'Squats',
      sets: 4,
      reps: '8-10',
      rest: 90,
    };
    
    const result = useEffectiveExercise(minimalBase, [], null);
    
    expect(result.instructions).toEqual([]);
    expect(result.formTips).toEqual([]);
    expect(result.media).toBe(null);
  });

  it('never overrides sets field', () => {
    const alternateWithSets = [
      {
        id: 'alt3',
        name: 'Modified Exercise',
        sets: 5, // This should be ignored
      },
    ];
    
    const result = useEffectiveExercise(baseExercise, alternateWithSets, 'alt3');
    
    expect(result.sets).toBe(3); // Should use base sets, not alternate sets
  });
});
