import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Disable console error outputs in tests to minimize noise in the console for tests that are supposed to fail
console.error = jest.fn();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('App component tests', () => {
  it('renders the fetched message when fetch succeeds', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Fetch successful' }));

    render(<App />);

    await waitFor(() => expect(screen.getByText('Fetch successful')).toBeInTheDocument());
  });

  it('renders the error message when fetch fails', async () => {
    fetchMock.mockReject(new Error('HTTP error! status: 404'));

    render(<App />);

    await waitFor(() => expect(screen.getByText('Error fetching data')).toBeInTheDocument());
  });
});
