import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const imgCocktail = 'cocktail.jpg';

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('exibe título "Favorite Recipes"', () => {
    render(
      <Router>
        <FavoriteRecipes />
      </Router>,
    );
    const titleElement = screen.getByRole('heading', { name: /Favorite Recipes/i });
    expect(titleElement).toBeInTheDocument();
  });

  test('exibe botões de filtro', () => {
    render(
      <Router>
        <FavoriteRecipes />
      </Router>,
    );
    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');
    expect(allButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });

  test('exibe as receitas filtradas corretamente', () => {
    const favoriteRecipes = [
      { id: 1, type: 'meal', name: 'Spaghetti', image: 'spaghetti.jpg' },
      { id: 2, type: 'drink', name: 'Cocktail', image: imgCocktail },
      { id: 3, type: 'meal', name: 'Pizza', image: 'pizza.jpg' },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    render(
      <Router>
        <FavoriteRecipes />
      </Router>,
    );
    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealsButton = screen.getByTestId('filter-by-meal-btn');
    const drinksButton = screen.getByTestId('filter-by-drink-btn');

    expect(screen.getAllByRole('link')).toHaveLength(6);

    fireEvent.click(mealsButton);
    expect(screen.getAllByRole('link')).toHaveLength(4);

    fireEvent.click(drinksButton);
    expect(screen.getAllByRole('link')).toHaveLength(2);

    fireEvent.click(allButton);
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });

  test('copia a URL para a área de transferência quando o botão de compartilhamento é clicado', async () => {
    const writeTextMock = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <Router>
        <FavoriteRecipes />
      </Router>,
    );
    const shareButton = screen.getByAltText('Share');
    fireEvent.click(shareButton);

    await screen.findByText('Link copied!');

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(writeTextMock).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });

  test('remove a receita dos favoritos quando o botão de desfavoritar é clicado', () => {
    const recipeId = 1;
    const favoriteRecipes = [
      { id: recipeId, type: 'meal', name: 'Spaghetti', image: 'spaghetti.jpg' },
      { id: 2, type: 'drink', name: 'Cocktail', image: imgCocktail },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    render(
      <Router>
        <FavoriteRecipes />
      </Router>,
    );
    const unfavoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    fireEvent.click(unfavoriteButton);

    expect(localStorage.getItem('favoriteRecipes')).toEqual(JSON.stringify([{ id: 2, type: 'drink', name: 'Cocktail', image: imgCocktail }]));
  });
});
