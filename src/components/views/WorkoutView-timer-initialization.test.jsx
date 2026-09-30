import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkoutView from './WorkoutView';

/**
 * Test suite for Task 12: Timer initialization from effective exercise
 * Requirements: 5.4
 * 
 * Validates that the rest timer initializes using the effective exercise's rest time,
 * which means:
 * - When an alternate is selected and has a rest field, use alternate's rest time
 * - When an alternate is selected but lacks a rest field, fall back to base rest time
 * - When no alternate is selected, use base rest time
 */
describe('WorkoutView - Timer Initialization from Effective Exercise', () => {
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
            name: 'Base Exercise',
            sets: 3,
            reps: '10-12',
            rest: 60,
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

  it('should initialize timer with base rest time when no alternate selected', async () => {
    const plan = createMockPlan({ rest: 90 });
    const setTimerSeconds = vi.fn();
    const setTimerRunning = vi.fn();
    
    render(
      <WorkoutView
        {...defaultProps}
        plan={plan}
        setTimerSeconds={setTimerSeconds}
        setTimerRunning={setTimerRunning}
      />
    );

    const completeButton = screen.getByRole('button', { name: /^complete set$/i });
    await userEvent.click(completeButton);

    expect(setTimerSeconds).toHaveBeenCalledWith(90);
    expect(setTimerRunning).toHaveBeenCalledWith(true);
  });

  it('should initialize timer with alternate rest time when alternate selected and has rest field', async () => {
    const plan = createMockPlan({
      rest: 60,
      alternates: [
        {
          id: 'alt1',
          name: 'Alternate Exercise',
          rest: 120, // Different rest time
        },
      ],
    });
    const setTimerSeconds = vi.fn();
    const setTimerRunning = vi.fn();
    
    render(
      <WorkoutView
        {...defaultProps}
        plan={plan}
        setTimerSeconds={setTimerSeconds}
        setTimerRunning={setTimerRunning}
      />
    );

    // Select the alternate
    const alternatesButton = screen.getByRole('button', { name: /see alternatives/i });
    await userEvent.click(alternatesButton);
    
    const alternateButton = screen.getByRole('button', { name: /alternate exercise/i });
    await userEvent.click(alternateButton);

    // Complete a set
    const completeButton = screen.getByRole('button', { name: /^complete set$/i });
    await userEvent.click(completeButton);

    // Should use alternate's rest time (120s)
    expect(setTimerSeconds).toHaveBeenCalledWith(120);
    expect(setTimerRunning).toHaveBeenCalledWith(true);
  });

  it('should fall back to base rest time when alternate selected but lacks rest field', async () => {
    const plan = createMockPlan({
      rest: 75,
      alternates: [
        {
          id: 'alt1',
          name: 'Alternate Exercise',
          // No rest field - should fall back to base rest time
        },
      ],
    });
    const setTimerSeconds = vi.fn();
    const setTimerRunning = vi.fn();
    
    render(
      <WorkoutView
        {...defaultProps}
        plan={plan}
        setTimerSeconds={setTimerSeconds}
        setTimerRunning={setTimerRunning}
      />
    );

    // Select the alternate
    const alternatesButton = screen.getByRole('button', { name: /see alternatives/i });
    await userEvent.click(alternatesButton);
    
    const alternateButton = screen.getByRole('button', { name: /alternate exercise/i });
    await userEvent.click(alternateButton);

    // Complete a set
    const completeButton = screen.getByRole('button', { name: /^complete set$/i });
    await userEvent.click(completeButton);

    // Should fall back to base rest time (75s)
    expect(setTimerSeconds).toHaveBeenCalledWith(75);
    expect(setTimerRunning).toHaveBeenCalledWith(true);
  });

  it('should update timer reset button to use alternate rest time', async () => {
    const plan = createMockPlan({
      rest: 60,
      alternates: [
        {
          id: 'alt1',
          name: 'Alternate Exercise',
          rest: 90,
        },
      ],
    });
    const setTimerSeconds = vi.fn();
    
    render(
      <WorkoutView
        {...defaultProps}
        plan={plan}
        setTimerSeconds={setTimerSeconds}
        timerSeconds={30}
        timerRunning={true}
      />
    );

    // Select the alternate
    const alternatesButton = screen.getByRole('button', { name: /see alternatives/i });
    await userEvent.click(alternatesButton);
    
    const alternateButton = screen.getByRole('button', { name: /alternate exercise/i });
    await userEvent.click(alternateButton);

    // Find and click the reset button in the floating timer
    const resetButton = screen.getByRole('button', { name: /reset timer/i });
    await userEvent.click(resetButton);

    // Should reset to alternate's rest time (90s)
    expect(setTimerSeconds).toHaveBeenCalledWith(90);
  });

  it('should not start timer when completing last set of last exercise', async () => {
    const plan = createMockPlan({
      rest: 60,
      sets: 1, // Only one set
    });
    const setTimerSeconds = vi.fn();
    const setTimerRunning = vi.fn();
    
    render(
      <WorkoutView
        {...defaultProps}
        plan={plan}
        setTimerSeconds={setTimerSeconds}
        setTimerRunning={setTimerRunning}
      />
    );

    const completeButton = screen.getByRole('button', { name: /^complete set$/i });
    await userEvent.click(completeButton);

    // Should not start timer when workout is complete
    expect(setTimerSeconds).not.toHaveBeenCalled();
  });

  it('should handle zero rest time gracefully', async () => {
    const plan = createMockPlan({
      rest: 0,
      alternates: [
        {
          id: 'alt1',
          name: 'Alternate Exercise',
          rest: 0,
        },
      ],
    });
    const setTimerSeconds = vi.fn();
    const setTimerRunning = vi.fn();
    
    render(
      <WorkoutView
        {...defaultProps}
        plan={plan}
        setTimerSeconds={setTimerSeconds}
        setTimerRunning={setTimerRunning}
      />
    );

    const completeButton = screen.getByRole('button', { name: /^complete set$/i });
    await userEvent.click(completeButton);

    // Should not start timer when rest is 0
    expect(setTimerSeconds).not.toHaveBeenCalled();
    expect(setTimerRunning).not.toHaveBeenCalled();
  });
});
