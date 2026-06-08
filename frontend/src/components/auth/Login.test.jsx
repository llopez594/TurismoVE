import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from './LoginForm';

// Mock de login
const mockLogin = vi.fn().mockResolvedValue({
  id: 1,
  name: 'Test User',
  role: 'user'
});

// Mock del contexto
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    user: null,
    loading: false,
    isAuthenticated: false,
    isAdmin: false
  })
}));

describe('Caso de Prueba: TC-001 - Autenticación de Usuario', () => {
  it('Debería permitir el inicio de sesión con credenciales válidas', async () => {
    const user = userEvent.setup();

    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <Login onClose={onClose} />
      </MemoryRouter>
    );

    const emailInput =
      screen.getByPlaceholderText('correo@ejemplo.com');

    const passwordInput =
      screen.getByPlaceholderText('••••••••');

    const loginButton =
      screen.getByRole('button', {
        name: /iniciar sesión/i
      });

    await user.type(
      emailInput,
      'testuser@ejemplo.com'
    );

    await user.type(
      passwordInput,
      'password123'
    );

    await user.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith(
      'testuser@ejemplo.com',
      'password123'
    );

    expect(onClose).toHaveBeenCalled();
  });
});