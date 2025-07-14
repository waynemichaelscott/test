import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorldClock from './WorldClock';

describe('WorldClock Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders world clock with title', () => {
    render(<WorldClock />);
    const title = screen.getByText('World Clock');
    expect(title).toBeInTheDocument();
  });

  test('displays clocks for all three cities', () => {
    render(<WorldClock />);
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  test('displays toggle button', () => {
    render(<WorldClock />);
    const toggleButton = screen.getByRole('button', { name: /switch to analog clock/i });
    expect(toggleButton).toBeInTheDocument();
  });

  test('toggles between digital and analog views', () => {
    render(<WorldClock />);
    
    // Initially should show digital clocks
    expect(screen.getByText('Europe/London')).toBeInTheDocument();
    
    // Click toggle button
    const toggleButton = screen.getByRole('button', { name: /switch to analog clock/i });
    fireEvent.click(toggleButton);
    
    // Should now show analog clocks (SVG elements)
    const svgElements = screen.getAllByLabelText(/analog clock for/i);
    expect(svgElements).toHaveLength(3);
    expect(svgElements[0].tagName).toBe('svg');
    
    // Toggle back
    fireEvent.click(screen.getByRole('button', { name: /switch to digital clock/i }));
    expect(screen.getByText('Europe/London')).toBeInTheDocument();
  });

  test('updates time every second', async () => {
    render(<WorldClock />);
    
    // Get initial time display
    const getTimeElements = () => screen.getAllByLabelText(/Time in/);
    const initialTimes = getTimeElements().map(el => el.textContent);
    
    // Advance timer by 1 second
    jest.advanceTimersByTime(1000);
    
    // Wait for component to update
    await waitFor(() => {
      const newTimes = getTimeElements().map(el => el.textContent);
      // At least one time should have changed (seconds)
      expect(newTimes).not.toEqual(initialTimes);
    });
  });

  test('displays correct timezone information', () => {
    render(<WorldClock />);
    expect(screen.getByText('Europe/London')).toBeInTheDocument();
    expect(screen.getByText('America/New_York')).toBeInTheDocument();
    expect(screen.getByText('Europe/Paris')).toBeInTheDocument();
  });

  test('cleans up interval on unmount', () => {
    const { unmount } = render(<WorldClock />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});