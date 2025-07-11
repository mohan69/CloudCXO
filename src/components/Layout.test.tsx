import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import { describe, it, expect } from 'vitest';

describe('Layout', () => {
  it('should render the header with a link to the homepage', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /rightsense technologies/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});