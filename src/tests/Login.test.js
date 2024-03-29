import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de Login', () => {
  const testIds = {
    emailInput: 'email-input',
    passwordInput: 'password-input',
    loginButton: 'login-submit-btn',
  };

  it('Testa se ocorre a renderização correta da pagina Login', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIds.emailInput);
    const inputPassword = screen.getByTestId(testIds.passwordInput);
    const buttonEnter = screen.getByTestId(testIds.loginButton);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
  });

  it('Testa se ao preencher os campos o botão "Enter" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIds.emailInput);
    const inputPassword = screen.getByTestId(testIds.passwordInput);
    const buttonEnter = screen.getByTestId(testIds.loginButton);

    act(() => {
      userEvent.type(inputEmail, 'teste@email.com');
      userEvent.type(inputPassword, '1234567');
    });

    expect(buttonEnter).toBeEnabled();
  });

  it('Testa se ao clicar no botão "Enter" o usuário é redirecionado para a página de receitas', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIds.emailInput);
    const inputPassword = screen.getByTestId(testIds.passwordInput);
    const buttonEnter = screen.getByTestId(testIds.loginButton);

    act(() => {
      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.type(inputPassword, '1234567');
      userEvent.click(buttonEnter);
    });

    const email = JSON.parse(localStorage.getItem('user'));
    expect(email.email).toBe('teste@teste.com');

    waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
