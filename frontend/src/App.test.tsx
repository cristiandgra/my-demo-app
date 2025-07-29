import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock fetch for testing API calls
const mockFetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock fetch before each test
    vi.stubGlobal('fetch', mockFetch);
  });

  test('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('🚀 Demo App')).toBeDefined();
  });

  test('renders the form with input and submit button', () => {
    render(<App />);
    expect(screen.getByLabelText('Your Data')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
  });

  test('submit button is disabled when input is empty', () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: 'Submit' }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('submit button is enabled when input has value', () => {
    render(<App />);
    const input = screen.getByLabelText('Your Data');
    const submitButton = screen.getByRole('button', { name: 'Submit' }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(submitButton.disabled).toBe(false);
  });

  test('shows loading state when submitting', async () => {
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Success', data: 'TEST', timestamp: '2024-01-01' }),
              }),
            100,
          ),
        ),
    );

    render(<App />);
    const input = screen.getByLabelText('Your Data');
    const submitButton = screen.getByRole('button', { name: 'Submit' }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Processing...')).toBeDefined();
    expect(submitButton.disabled).toBe(true);
  });

  test('handles successful API response', async () => {
    const mockResponse = {
      message: 'Data processed successfully!',
      data: 'TEST',
      timestamp: '2024-01-01T12:00:00',
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<App />);
    const input = screen.getByLabelText('Your Data');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Response Received')).toBeDefined();
      expect(screen.getByText(/Data processed successfully!/)).toBeDefined();
      expect(screen.getByText(/TEST/)).toBeDefined();
    });
  });

  test('handles API error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    render(<App />);
    const input = screen.getByLabelText('Your Data');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/HTTP error! status: 400/)).toBeDefined();
    });
  });

  test('handles network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    const input = screen.getByLabelText('Your Data');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeDefined();
    });
  });

  test('clears previous response when submitting new request', async () => {
    const mockResponse = {
      message: 'Data processed successfully!',
      data: 'TEST',
      timestamp: '2024-01-01T12:00:00',
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<App />);
    const input = screen.getByLabelText('Your Data');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // First submission
    fireEvent.change(input, { target: { value: 'test1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Response Received')).toBeDefined();
    });

    // Second submission
    fireEvent.change(input, { target: { value: 'test2' } });
    fireEvent.click(submitButton);

    // Should show loading state (previous response cleared)
    expect(screen.getByText('Processing...')).toBeDefined();
  });
});
