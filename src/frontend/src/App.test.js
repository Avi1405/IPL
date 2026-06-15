import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, teamName: 'Mumbai Indians', totalWins: 120, totalMatches: 203 }
      ])
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the IPL dashboard home page', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /ipl dashboard/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /mumbai indians/i })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/teams');
});
