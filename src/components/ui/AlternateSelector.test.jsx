import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AlternateSelector } from './AlternateSelector';

describe('AlternateSelector', () => {
  const mockBaseExercise = {
    id: 'ex1',
    name: 'Barbell Bench Press',
    note: 'Keep your back flat',
    reps: '8-10',
    rest: 90,
    sets: 3,
  };

  const mockAlternates = [
    {
      id: 'alt1',
      name: 'Dumbbell Bench Press',
      note: 'Great for unilateral strength',
    },
    {
      id: 'alt2',
      name: 'Push-ups',
    },
  ];

  it('renders base exercise option', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Check base exercise is rendered with "Original" badge
    expect(screen.getByText('Barbell Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Original')).toBeInTheDocument();
  });

  it('renders all valid alternates', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Check all alternates are rendered
    expect(screen.getByText('Dumbbell Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  it('highlights selected option with checkmark', () => {
    const onSelectAlternate = vi.fn();
    const { container } = render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId="alt1"
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Find the selected alternate button
    const selectedButton = screen.getByText('Dumbbell Bench Press').closest('button');
    
    // Check it has cyan border styling (selected state)
    expect(selectedButton).toHaveClass('border-cyan-500');
    expect(selectedButton).toHaveClass('bg-cyan-50');
  });

  it('calls onSelectAlternate with correct ID when alternate clicked', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Click an alternate
    const alternateButton = screen.getByText('Dumbbell Bench Press').closest('button');
    fireEvent.click(alternateButton);

    // Check callback was called with correct ID
    expect(onSelectAlternate).toHaveBeenCalledWith('alt1');
  });

  it('calls onSelectAlternate with null when base exercise clicked', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId="alt1"
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Click base exercise
    const baseButton = screen.getByText('Barbell Bench Press').closest('button');
    fireEvent.click(baseButton);

    // Check callback was called with null
    expect(onSelectAlternate).toHaveBeenCalledWith(null);
  });

  it('hides when alternates array is empty', () => {
    const onSelectAlternate = vi.fn();
    const { container } = render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={[]}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Component should not render anything
    expect(container.firstChild).toBeNull();
  });

  it('filters out invalid alternates (missing id or name)', () => {
    const invalidAlternates = [
      { id: 'alt1', name: 'Valid Alternate' },
      { id: 'alt2' }, // Missing name
      { name: 'Missing ID' }, // Missing id
      null, // Null value
      { id: '', name: 'Empty ID' }, // Empty id
    ];

    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={invalidAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Only valid alternate should be rendered
    expect(screen.getByText('Valid Alternate')).toBeInTheDocument();
    expect(screen.queryByText('Missing ID')).not.toBeInTheDocument();
  });

  it('displays alternate notes when present', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Expand the section
    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Check note is displayed
    expect(screen.getByText('Great for unilateral strength')).toBeInTheDocument();
  });

  it('toggles expanded state when header clicked', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });

    // Initially collapsed - alternates not visible
    expect(screen.queryByText('Dumbbell Bench Press')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(toggleButton);
    expect(screen.getByText('Dumbbell Bench Press')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Dumbbell Bench Press')).not.toBeInTheDocument();
  });
});

describe('AlternateSelector - seamless switching performance (Requirements 9.1, 9.2, 9.3)', () => {
  const mockBaseExercise = {
    id: 'ex1',
    name: 'Barbell Bench Press',
    note: 'Keep your back flat',
    reps: '8-10',
    rest: 90,
    sets: 3,
  };

  const mockAlternates = [
    { id: 'alt1', name: 'Dumbbell Bench Press', note: 'Great for unilateral strength' },
    { id: 'alt2', name: 'Push-ups' },
    { id: 'alt3', name: 'Cable Fly' },
  ];

  it('onSelectAlternate is called synchronously (no async delay) - Req 9.1', () => {
    // The handler must be called synchronously on click, ensuring <100ms UI update
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    const altButton = screen.getByText('Dumbbell Bench Press').closest('button');
    fireEvent.click(altButton);

    // Callback must have been called synchronously (no setTimeout/Promise)
    expect(onSelectAlternate).toHaveBeenCalledTimes(1);
    expect(onSelectAlternate).toHaveBeenCalledWith('alt1');
  });

  it('does not trigger navigation or page reload on selection - Req 9.2', () => {
    // Verify no window.location changes or router navigation calls
    const originalLocation = window.location.href;
    const onSelectAlternate = vi.fn();

    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    const altButton = screen.getByText('Push-ups').closest('button');
    fireEvent.click(altButton);

    // Location must not have changed
    expect(window.location.href).toBe(originalLocation);
    expect(onSelectAlternate).toHaveBeenCalledWith('alt2');
  });

  it('selection buttons are regular buttons (not links/anchors) - Req 9.2', () => {
    const onSelectAlternate = vi.fn();
    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // All exercise options must be <button> elements, not <a> tags
    const altButton = screen.getByText('Dumbbell Bench Press').closest('button');
    expect(altButton.tagName).toBe('BUTTON');
    expect(altButton).not.toHaveAttribute('href');

    const baseButton = screen.getByText('Barbell Bench Press').closest('button');
    expect(baseButton.tagName).toBe('BUTTON');
    expect(baseButton).not.toHaveAttribute('href');
  });

  it('handles rapid selection changes without errors - Req 9.1', () => {
    const selections = [];
    const onSelectAlternate = vi.fn((id) => selections.push(id));

    const { rerender } = render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    // Rapid: alt1 → alt2 → alt3 → base → alt1
    const rapidSequence = ['alt1', 'alt2', 'alt3', null, 'alt1'];

    for (const id of rapidSequence) {
      if (id === null) {
        const baseButton = screen.getByText('Barbell Bench Press').closest('button');
        fireEvent.click(baseButton);
      } else {
        const name = mockAlternates.find((a) => a.id === id).name;
        const btn = screen.getByText(name).closest('button');
        fireEvent.click(btn);
      }
      // Re-render with updated selection to simulate React state update
      rerender(
        <AlternateSelector
          baseExercise={mockBaseExercise}
          alternates={mockAlternates}
          selectedAlternateId={id}
          onSelectAlternate={onSelectAlternate}
        />
      );
    }

    // All 5 rapid selections must have been recorded in order
    expect(selections).toEqual(rapidSequence);
    expect(onSelectAlternate).toHaveBeenCalledTimes(5);
  });

  it('selection state persists after collapse and re-expand - Req 9.3', () => {
    const onSelectAlternate = vi.fn();
    const { rerender } = render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });

    // Expand and select alt1
    fireEvent.click(toggleButton);
    const altButton = screen.getByText('Dumbbell Bench Press').closest('button');
    fireEvent.click(altButton);

    // Re-render with alt1 selected (simulating parent state update)
    rerender(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId="alt1"
        onSelectAlternate={onSelectAlternate}
      />
    );

    // Collapse
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Dumbbell Bench Press')).not.toBeInTheDocument();

    // Re-expand — selected state must still be visible
    fireEvent.click(toggleButton);
    const selectedButton = screen.getByText('Dumbbell Bench Press').closest('button');
    expect(selectedButton).toHaveClass('border-cyan-500');
    expect(selectedButton).toHaveClass('bg-cyan-50');
  });

  it('no DOM scroll manipulation occurs on selection - Req 9.3', () => {
    // Verify scrollTo / scrollIntoView are not called during selection
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const onSelectAlternate = vi.fn();

    render(
      <AlternateSelector
        baseExercise={mockBaseExercise}
        alternates={mockAlternates}
        selectedAlternateId={null}
        onSelectAlternate={onSelectAlternate}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /machine busy/i });
    fireEvent.click(toggleButton);

    const altButton = screen.getByText('Push-ups').closest('button');
    fireEvent.click(altButton);

    expect(scrollToSpy).not.toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });
});
