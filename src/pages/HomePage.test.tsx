import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { cxoData } from '@/data/cxoData';
import { describe, it, expect } from 'vitest';

describe('HomePage', () => {
  it('should render a heading and a list of all CXO profiles initially', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /meet our leadership/i })).toBeInTheDocument();

    // Check that each CXO is rendered
    Object.values(cxoData).forEach(details => {
      expect(screen.getByText(details.name)).toBeInTheDocument();
    });
  });

  it('should filter profiles by name when user types in the search bar', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search by name or title/i);
    await user.type(searchInput, 'Alice');

    // Should only show Alice Johnson (CMO)
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('John Davis')).not.toBeInTheDocument();
    expect(screen.queryByText('Samantha Rivera')).not.toBeInTheDocument();
  });

  it('should filter profiles by title when user types in the search bar', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search by name or title/i);
    await user.type(searchInput, 'officer');

    // Should show all profiles since they all contain "officer" in the title
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('John Davis')).toBeInTheDocument();
    expect(screen.getByText('Samantha Rivera')).toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, 'technology');

    // Should only show Samantha Rivera (CTO)
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    expect(screen.queryByText('John Davis')).not.toBeInTheDocument();
    expect(screen.getByText('Samantha Rivera')).toBeInTheDocument();
  });

  it('should show a "no results" message when search query does not match any profile', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search by name or title/i);
    const nonExistentQuery = 'NonExistentName';
    await user.type(searchInput, nonExistentQuery);

    // No profiles should be visible
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    expect(screen.queryByText('John Davis')).not.toBeInTheDocument();
    expect(screen.queryByText('Samantha Rivera')).not.toBeInTheDocument();

    // "No results" message should be visible
    expect(screen.getByText(`No results found for "${nonExistentQuery}".`)).toBeInTheDocument();
  });

  it('should clear the search when the clear button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search by name or title/i);

    // Initially, clear button should not be there
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();

    // Type something to search
    await user.type(searchInput, 'Alice');

    // Check that filtering works and clear button appears
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.queryByText('John Davis')).not.toBeInTheDocument();
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();

    // Click the clear button
    await user.click(clearButton);

    // Check that search is cleared and all profiles are visible again
    expect(searchInput).toHaveValue('');
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('John Davis')).toBeInTheDocument();
    expect(screen.getByText('Samantha Rivera')).toBeInTheDocument();

    // Clear button should be gone
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });
});