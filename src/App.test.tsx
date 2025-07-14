import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders world clock app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to the World Clock App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders world clock component', () => {
  render(<App />);
  const worldClockTitle = screen.getByRole('heading', { name: /World Clock/i, level: 2 });
  expect(worldClockTitle).toBeInTheDocument();
});
