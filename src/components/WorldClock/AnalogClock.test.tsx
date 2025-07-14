import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalogClock from './AnalogClock';
import { CityTime } from './WorldClock';

describe('AnalogClock Component', () => {
  const mockCityTime: CityTime = {
    city: 'Paris',
    timezone: 'Europe/Paris',
    time: new Date('2024-01-15T15:30:45')
  };

  test('renders city name', () => {
    render(<AnalogClock cityTime={mockCityTime} />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  test('renders timezone', () => {
    render(<AnalogClock cityTime={mockCityTime} />);
    expect(screen.getByText('Europe/Paris')).toBeInTheDocument();
  });

  test('renders SVG clock element', () => {
    render(<AnalogClock cityTime={mockCityTime} />);
    const svgElement = screen.getByLabelText('Analog clock for Paris');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.tagName).toBe('svg');
  });

  test('renders all clock hands', () => {
    const { container } = render(<AnalogClock cityTime={mockCityTime} />);
    
    // Should have 3 hands (hour, minute, second)
    const lines = container.querySelectorAll('svg line');
    // 12 hour markers + 3 hands = 15 lines total
    expect(lines.length).toBe(15);
    
    // Check for different stroke widths for different hands
    const hands = Array.from(lines).slice(12); // Last 3 are the hands
    expect(hands[0]).toHaveAttribute('stroke-width', '4'); // Hour hand
    expect(hands[1]).toHaveAttribute('stroke-width', '3'); // Minute hand
    expect(hands[2]).toHaveAttribute('stroke-width', '1'); // Second hand
  });

  test('renders clock face with correct dimensions', () => {
    render(<AnalogClock cityTime={mockCityTime} />);
    const svgElement = screen.getByLabelText('Analog clock for Paris');
    expect(svgElement).toHaveAttribute('width', '150');
    expect(svgElement).toHaveAttribute('height', '150');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 150 150');
  });

  test('renders hour markers', () => {
    const { container } = render(<AnalogClock cityTime={mockCityTime} />);
    const hourMarkers = container.querySelectorAll('svg line[stroke-width="2"]');
    // Should have 12 hour markers
    expect(hourMarkers.length).toBe(12);
  });

  test('has correct CSS classes', () => {
    const { container } = render(<AnalogClock cityTime={mockCityTime} />);
    expect(container.querySelector('.analog-clock')).toBeInTheDocument();
    expect(container.querySelector('.timezone')).toBeInTheDocument();
  });

  test('second hand has red color', () => {
    const { container } = render(<AnalogClock cityTime={mockCityTime} />);
    const secondHand = container.querySelector('svg line[stroke="red"]');
    expect(secondHand).toBeInTheDocument();
  });
});