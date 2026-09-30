import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateAlternate, filterValidAlternates } from './alternateValidation';

describe('alternateValidation', () => {
  describe('validateAlternate', () => {
    it('returns true for valid alternate with id and name', () => {
      const validAlternate = {
        id: 'alt1',
        name: 'Dumbbell Press',
      };
      
      expect(validateAlternate(validAlternate)).toBe(true);
    });

    it('returns true for valid alternate with additional fields', () => {
      const validAlternate = {
        id: 'alt1',
        name: 'Dumbbell Press',
        reps: '12-15',
        rest: 45,
        note: 'Use lighter weight',
      };
      
      expect(validateAlternate(validAlternate)).toBe(true);
    });

    it('returns false for alternate without id', () => {
      const invalidAlternate = {
        name: 'Dumbbell Press',
      };
      
      expect(validateAlternate(invalidAlternate)).toBe(false);
    });

    it('returns false for alternate without name', () => {
      const invalidAlternate = {
        id: 'alt1',
      };
      
      expect(validateAlternate(invalidAlternate)).toBe(false);
    });

    it('returns false for alternate with non-string id', () => {
      const invalidAlternate = {
        id: 123,
        name: 'Dumbbell Press',
      };
      
      expect(validateAlternate(invalidAlternate)).toBe(false);
    });

    it('returns false for alternate with non-string name', () => {
      const invalidAlternate = {
        id: 'alt1',
        name: 123,
      };
      
      expect(validateAlternate(invalidAlternate)).toBe(false);
    });

    it('returns false for alternate with empty string id', () => {
      const invalidAlternate = {
        id: '',
        name: 'Dumbbell Press',
      };
      
      expect(validateAlternate(invalidAlternate)).toBe(false);
    });

    it('returns false for alternate with empty string name', () => {
      const invalidAlternate = {
        id: 'alt1',
        name: '',
      };
      
      expect(validateAlternate(invalidAlternate)).toBe(false);
    });

    it('returns false for null alternate', () => {
      expect(validateAlternate(null)).toBe(false);
    });

    it('returns false for undefined alternate', () => {
      expect(validateAlternate(undefined)).toBe(false);
    });

    it('returns false for non-object alternate', () => {
      expect(validateAlternate('string')).toBe(false);
      expect(validateAlternate(123)).toBe(false);
      expect(validateAlternate(true)).toBe(false);
    });
  });

  describe('filterValidAlternates', () => {
    let consoleWarnSpy;

    beforeEach(() => {
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it('returns all valid alternates', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { id: 'alt2', name: 'Push-ups' },
        { id: 'alt3', name: 'Cable Fly' },
      ];
      
      const result = filterValidAlternates(alternates);
      
      expect(result).toHaveLength(3);
      expect(result).toEqual(alternates);
    });

    it('filters out alternates without id', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { name: 'Push-ups' }, // Missing id
        { id: 'alt3', name: 'Cable Fly' },
      ];
      
      const result = filterValidAlternates(alternates);
      
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('alt1');
      expect(result[1].id).toBe('alt3');
    });

    it('filters out alternates without name', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { id: 'alt2' }, // Missing name
        { id: 'alt3', name: 'Cable Fly' },
      ];
      
      const result = filterValidAlternates(alternates);
      
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Dumbbell Press');
      expect(result[1].name).toBe('Cable Fly');
    });

    it('handles empty alternates array', () => {
      const result = filterValidAlternates([]);
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('handles null alternates', () => {
      const result = filterValidAlternates(null);
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('handles undefined alternates', () => {
      const result = filterValidAlternates(undefined);
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('handles non-array alternates', () => {
      const result1 = filterValidAlternates('string');
      const result2 = filterValidAlternates(123);
      const result3 = filterValidAlternates({ id: 'alt1', name: 'Test' });
      
      expect(result1).toEqual([]);
      expect(result2).toEqual([]);
      expect(result3).toEqual([]);
    });

    it('logs warning for invalid alternates', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { name: 'Push-ups' }, // Missing id
      ];
      
      filterValidAlternates(alternates);
      
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Invalid alternate exercise at index 1:',
        { name: 'Push-ups' },
        'Missing required fields (id, name) or invalid data type'
      );
    });

    it('logs warnings for multiple invalid alternates', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { name: 'Push-ups' }, // Missing id
        { id: 'alt3' }, // Missing name
        { id: 'alt4', name: 'Cable Fly' },
        null, // Invalid
      ];
      
      filterValidAlternates(alternates);
      
      expect(consoleWarnSpy).toHaveBeenCalledTimes(3);
    });

    it('preserves valid alternates with optional fields', () => {
      const alternates = [
        {
          id: 'alt1',
          name: 'Dumbbell Press',
          reps: '12-15',
          rest: 45,
          note: 'Use lighter weight',
          instructions: ['Step 1', 'Step 2'],
          formTips: ['Tip 1'],
          media: { type: 'youtube', url: 'https://youtube.com/watch?v=123' },
        },
        { id: 'alt2', name: 'Push-ups' }, // Minimal valid
      ];
      
      const result = filterValidAlternates(alternates);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(alternates[0]);
      expect(result[1]).toEqual(alternates[1]);
    });

    it('filters alternates with empty string id or name', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { id: '', name: 'Push-ups' }, // Empty id
        { id: 'alt3', name: '' }, // Empty name
      ];
      
      const result = filterValidAlternates(alternates);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('alt1');
    });

    it('filters alternates with non-string id or name', () => {
      const alternates = [
        { id: 'alt1', name: 'Dumbbell Press' },
        { id: 123, name: 'Push-ups' }, // Non-string id
        { id: 'alt3', name: 456 }, // Non-string name
      ];
      
      const result = filterValidAlternates(alternates);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('alt1');
    });
  });
});
