import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CxoProfilePage from './CxoProfilePage';
import { cxoData } from '@/data/cxoData';
import { describe, it, expect } from 'vitest';

const renderWithRouter = (role: string) => {
  render(
    <MemoryRouter initialEntries={[`/cxos/${role}`]}>
      <Routes>
        <Route path="/cxos/:role" element={<CxoProfilePage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CxoProfilePage', () => {
  it('should render the CMO profile details correctly', () => {
    const cmoDetails = cxoData.CMO;
    renderWithRouter('CMO');

    expect(screen.getByRole('heading', { name: cmoDetails.name })).toBeInTheDocument();
    expect(screen.getByText(cmoDetails.title)).toBeInTheDocument();
    expect(screen.getByText(cmoDetails.bio)).toBeInTheDocument();
    cmoDetails.keyAchievements.forEach(achievement => {
      expect(screen.getByText(achievement)).toBeInTheDocument();
    });
    cmoDetails.expertise.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('should render the CEO profile details correctly', () => {
    const ceoDetails = cxoData.CEO;
    renderWithRouter('CEO');

    expect(screen.getByRole('heading', { name: ceoDetails.name })).toBeInTheDocument();
    expect(screen.getByText(ceoDetails.title)).toBeInTheDocument();
  });

  it('should render a "Not Found" message for an invalid role', () => {
    renderWithRouter('CFO');

    expect(screen.getByRole('heading', { name: /profile not found/i })).toBeInTheDocument();
    expect(screen.getByText(/The profile for the role "CFO" could not be found./i)).toBeInTheDocument();
  });
});