
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import App from './App';

describe('App Component', () => {
  it('renders all form elements', () => {
    render(<App />);
    
    // Check if all main elements are present
    expect(screen.getByLabelText('Colaborador')).toBeInTheDocument();
    expect(screen.getByLabelText('Jornada')).toBeInTheDocument();
    expect(screen.getByLabelText('Data e Hora de Início')).toBeInTheDocument();
    expect(screen.getByText('Agendar Jornada para Colaborador')).toBeInTheDocument();
  });

  it('allows selecting a collaborator', () => {
    render(<App />);
    const select = screen.getByLabelText('Colaborador');
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');
  });

  it('allows selecting a journey', () => {
    render(<App />);
    const select = screen.getByLabelText('Jornada');
    fireEvent.change(select, { target: { value: '1' } });
    expect(select.value).toBe('1');
  });

  it('allows setting date and time', () => {
    render(<App />);
    const dateInput = screen.getByLabelText('Data e Hora de Início');
    const testDate = '2024-03-20T10:00';
    fireEvent.change(dateInput, { target: { value: testDate } });
    expect(dateInput.value).toBe(testDate);
  });
});
