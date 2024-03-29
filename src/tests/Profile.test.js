import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Profile from '../pages/Profile';

describe('Testa a página de perfil', () => {
  it('Deve renderizar o componente Profile', () => {
    render(<Profile />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('Deve redirecionar para receitas prontas no clique do botão Receitas prontas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Deve redirecionar para receitas favoritas no clique do botão Receitas favoritas', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Deve limpar localStorage e redirecionar para a página inicial ao clicar no botão Sair', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});
