import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DigitalClock from './DigitalClock';
import { CityTime } from './WorldClock';

describe('DigitalClock Component', () => {
  const mockCityTime: CityTime = {
    city: 'London',
    timezone: 'Europe/London',
    time: new Date('2024-01-15T14:30:45')
  };

  test('renders city name', () => {
    render(<DigitalClock cityTime={mockCityTime} />);
    expect(screen.getByText('London')).toBeInTheDocument();
  });

  test('renders timezone', () => {
    render(<DigitalClock cityTime={mockCityTime} />);
    expect(screen.getByText('Europe/London')).toBeInTheDocument();
  });

  test('renders time with correct format', () => {
    render(<DigitalClock cityTime={mockCityTime} />);
    const timeElement = screen.getByLabelText('Time in London');
    expect(timeElement).toBeInTheDocument();
    // Time format should be HH:MM:SS
    expect(timeElement.textContent).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  test('has correct CSS classes', () => {
    const { container } = render(<DigitalClock cityTime={mockCityTime} />);
    expect(container.querySelector('.digital-clock')).toBeInTheDocument();
    expect(container.querySelector('.digital-time')).toBeInTheDocument();
    expect(container.querySelector('.timezone')).toBeInTheDocument();
  });

  test('formats time correctly for different timezones', () => {
    const newYorkTime: CityTime = {
      city: 'New York',
      timezone: 'America/New_York',
      time: new Date('2024-01-15T14:30:45')
    };
    
    render(<DigitalClock cityTime={newYorkTime} />);
    const timeElement = screen.getByLabelText('Time in New York');
    expect(timeElement.textContent).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});