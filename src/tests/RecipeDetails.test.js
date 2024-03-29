import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa a página de detalhes', () => {
  const corbaUrl = '/meals/52977';
  it('testa se renderiza corretamente os detalhes de uma "Meal"', async () => {
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/meals');

    const mealCards = await screen.findAllByTestId(/-recipe-card/);
    expect(mealCards.length).toBe(12);
    act(() => {
      userEvent.click(mealCards[0]);
    });
    await waitFor(async () => {
      expect(history.location.pathname).toBe(corbaUrl);
    });

    await waitFor(async () => {
      const shareBtn = screen.getByTestId(/share-btn/i);
      expect(shareBtn).toBeInTheDocument();
      const favoriteBtn = screen.getByTestId(/favorite-btn/i);
      expect(favoriteBtn).toBeInTheDocument();
      const categoryHeader = screen.getByTestId(/category-header/i);
      expect(categoryHeader).toBeInTheDocument();
      const recipeTitle = screen.getByTestId(/recipe-title/i);
      expect(recipeTitle).toBeInTheDocument();
      const recipeCategory = screen.getByTestId(/recipe-category/i);
      expect(recipeCategory).toBeInTheDocument();
      const ingredientsAndMeasures = screen.getAllByTestId(/ingredient-name-and-measure/i);
      expect(ingredientsAndMeasures).toHaveLength(8);
      const instruction = screen.getByTestId(/instructions/i);
      expect(instruction).toBeInTheDocument();
      const video = screen.getByTestId(/video/i);
      expect(video).toBeInTheDocument();
      const recommendationCards = screen.getAllByTestId(/recommendation-card/i);
      expect(recommendationCards).toHaveLength(6);
      const startRecipeBtn = screen.getByTestId(/start-recipe-btn/i);
      expect(startRecipeBtn).toBeInTheDocument();
    });
  });

  it('testa se renderiza corretamente os detalhes de uma "Drink"', async () => {
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');

    const drinkCards = await screen.findAllByTestId(/-recipe-card/);
    expect(drinkCards.length).toBe(12);
    act(() => {
      userEvent.click(drinkCards[0]);
    });
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });

    await waitFor(async () => {
      const shareBtn = screen.getByTestId(/share-btn/i);
      expect(shareBtn).toBeInTheDocument();
      const favoriteBtn = screen.getByTestId(/favorite-btn/i);
      expect(favoriteBtn).toBeInTheDocument();
      const categoryHeader = screen.getByTestId(/category-header/i);
      expect(categoryHeader).toBeInTheDocument();
      const recipeTitle = screen.getByTestId(/recipe-title/i);
      expect(recipeTitle).toBeInTheDocument();
      const recipeCategory = screen.getByTestId(/recipe-category/i);
      expect(recipeCategory).toBeInTheDocument();
      const ingredientsAndMeasures = screen.getAllByTestId(/ingredient-name-and-measure/i);
      expect(ingredientsAndMeasures).toHaveLength(8);
      const instruction = screen.getByTestId(/instructions/i);
      expect(instruction).toBeInTheDocument();
      const recommendationCards = screen.getAllByTestId(/recommendation-card/i);
      expect(recommendationCards).toHaveLength(6);
      const startRecipeBtn = screen.getByTestId(/start-recipe-btn/i);
      expect(startRecipeBtn).toBeInTheDocument();
    });
  });

  it('testa se a bebida favoritada vem com o coração "preenchido".', async () => {
    const favoriteRecipes = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/meals');

    act(() => {
      history.push('/meals/52771');
    });
    await waitFor(async () => {
      expect(history.location.pathname).toBe('/meals/52771');
    });

    await waitFor(async () => {
      const favoriteBtn = screen.getByAltText('liked');
      expect(favoriteBtn).toBeInTheDocument();
    });
  });

  it('testa se a bebida não favoritada vem com o coração "despreenchido".', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/meals');

    act(() => {
      history.push(corbaUrl);
    });
    await waitFor(async () => {
      expect(history.location.pathname).toBe(corbaUrl);
    });

    await waitFor(async () => {
      const favoriteBtn = screen.getByAltText('like');
      expect(favoriteBtn).toBeInTheDocument();
    });
  });

  it('testa se caso esteja preenchido deve mudar para "despreenchido" e vice-versa.', async () => {
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/meals');

    act(() => {
      history.push(corbaUrl);
    });
    await waitFor(async () => {
      expect(history.location.pathname).toBe(corbaUrl);
    });

    await waitFor(async () => {
      const favoriteBtn = screen.getByAltText('like');
      expect(favoriteBtn).toBeInTheDocument();

      act(() => {
        userEvent.click(favoriteBtn);
      });

      const localStorageFavorites = localStorage.getItem('favoriteRecipes');
      const favoriteRecipes = localStorageFavorites
        ? JSON.parse(localStorageFavorites) : [];
      expect(favoriteRecipes).toHaveLength(1);
      expect(favoriteRecipes[0].id).toBe('52977');

      const favoritedBtn = screen.getByAltText('liked');
      expect(favoritedBtn).toBeInTheDocument();

      act(() => {
        userEvent.click(favoritedBtn);
      });

      const updatedLocalStorageFavorites = localStorage.getItem('favoriteRecipes');
      const updatedFavoriteRecipes = updatedLocalStorageFavorites
        ? JSON.parse(updatedLocalStorageFavorites) : [];
      expect(updatedFavoriteRecipes).toHaveLength(0);
    });
  });
});
