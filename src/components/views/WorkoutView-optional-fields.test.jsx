import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WorkoutView from './WorkoutView';

/**
 * Test suite for Task 11: Graceful handling of missing optional fields
 * Requirements: 6.3, 6.4, 6.5, 6.6, 6.7
 */
describe('WorkoutView - Optional Fields Handling', () => {
  const createMockPlan = (exerciseOverrides = {}) => ({
    name: 'Test Plan',
    days: [
      {
        id: 'day1',
        label: 'Day 1',
        title: 'Test Day',
        exercises: [
          {
            id: 'ex1',
            name: 'Test Exercise',
            sets: 3,
            reps: '10-12',
            rest: 60,
            note: 'Default note',
            instructions: ['Step 1', 'Step 2'],
            formTips: ['Tip 1', 'Tip 2'],
            media: { type: 'youtube', url: 'https://youtube.com/watch?v=test', label: 'Watch Demo' },
            alternates: [],
            ...exerciseOverrides,
          },
        ],
      },
    ],
  });

  const defaultProps = {
    session: null,
    selectedDayId: 'day1',
    setSelectedDayId: vi.fn(),
    progressMap: {},
    setProgressMap: vi.fn(),
    weightsMap: {},
    setWeightsMap: vi.fn(),
    setHistoryLog: vi.fn(),
    setView: vi.fn(),
    saveSession: vi.fn(),
    soundEnabled: false,
    timerSeconds: 60,
    setTimerSeconds: vi.fn(),
    timerRunning: false,
    setTimerRunning: vi.fn(),
  };

  it('should hide coaching note section when note is null', () => {
    const plan = createMockPlan({ note: null });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.queryByText('Coaching Note')).not.toBeInTheDocument();
  });

  it('should hide coaching note section when note is undefined', () => {
    const plan = createMockPlan({ note: undefined });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.queryByText('Coaching Note')).not.toBeInTheDocument();
  });

  it('should show coaching note section when note is present', () => {
    const plan = createMockPlan({ note: 'Important coaching note' });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.getByText('Coaching Note')).toBeInTheDocument();
    expect(screen.getByText('Important coaching note')).toBeInTheDocument();
  });

  it('should hide "How to do this" section when all guide fields are missing', () => {
    const plan = createMockPlan({
      instructions: [],
      formTips: [],
      media: null,
    });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.queryByText('How to do this')).not.toBeInTheDocument();
  });

  it('should show "How to do this" section when instructions exist', () => {
    const plan = createMockPlan({
      instructions: ['Step 1', 'Step 2'],
      formTips: [],
      media: null,
    });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.getByText('How to do this')).toBeInTheDocument();
  });

  it('should show "How to do this" section when formTips exist', () => {
    const plan = createMockPlan({
      instructions: [],
      formTips: ['Tip 1'],
      media: null,
    });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.getByText('How to do this')).toBeInTheDocument();
  });

  it('should show "How to do this" section when media exists', () => {
    const plan = createMockPlan({
      instructions: [],
      formTips: [],
      media: { type: 'youtube', url: 'https://youtube.com/watch?v=test', label: 'Watch Demo' },
    });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    expect(screen.getByText('How to do this')).toBeInTheDocument();
  });

  it('should not crash when all optional fields are missing', () => {
    const plan = createMockPlan({
      note: null,
      instructions: [],
      formTips: [],
      media: null,
    });
    
    expect(() => {
      render(<WorkoutView {...defaultProps} plan={plan} />);
    }).not.toThrow();
    
    // Verify the exercise name is still displayed (appears in multiple places)
    expect(screen.getAllByText('Test Exercise').length).toBeGreaterThan(0);
  });

  it('should handle undefined arrays gracefully', () => {
    const plan = createMockPlan({
      note: undefined,
      instructions: undefined,
      formTips: undefined,
      media: undefined,
    });
    
    expect(() => {
      render(<WorkoutView {...defaultProps} plan={plan} />);
    }).not.toThrow();
  });

  it('should handle empty strings in note field', () => {
    const plan = createMockPlan({ note: '' });
    render(<WorkoutView {...defaultProps} plan={plan} />);
    
    // Empty string is falsy, so coaching note should not be shown
    expect(screen.queryByText('Coaching Note')).not.toBeInTheDocument();
  });

  it('should handle alternate exercise with missing optional fields', () => {
    const plan = createMockPlan({
      alternates: [
        {
          id: 'alt1',
          name: 'Alternate Exercise',
          // Missing: note, instructions, formTips, media, reps, rest
        },
      ],
    });
    
    expect(() => {
      render(<WorkoutView {...defaultProps} plan={plan} />);
    }).not.toThrow();
  });
});
