import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from '@jest/globals';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pending task/i);
  expect(linkElement).toBeInTheDocument();
});
