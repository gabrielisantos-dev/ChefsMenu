import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from './mocks/onLoadRecipe';
// import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import RecipeInProgress from '../pages/RecipeInProgress';

const recipeTitleTestId = 'recipe-title';
const url = '/meals/53069/in-progress';
const ingredient0 = '0-ingredient-step';
const btnFinish = 'finish-recipe-btn';
// const textDecoration = 'text-decoration: line-through;';

describe('Teste da tela de Recipe Details In Progress', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('Verifica se ao clicar na receita a página de detalhes é carregada', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, store, url);
    await waitFor(() => screen.getByTestId(recipeTitleTestId));
    const recipeTitle = screen.getByTestId(recipeTitleTestId);
    expect(recipeTitle).toBeInTheDocument();
  });

  it('Verifica se ao clicar no checkbox ele é marcado', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, store, url);
    await waitFor(() => screen.getByTestId(recipeTitleTestId));
    const checkbox = screen.getByTestId(ingredient0);
    expect(checkbox).toBeInTheDocument();
  });

  it('Verifica se os ingredientes são salvos no localStorage', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, store, url);
    await waitFor(() => screen.getByTestId(recipeTitleTestId));
    const checkbox = screen.getByTestId(ingredient0);
    userEvent.click(checkbox);
    const localStorage = JSON.parse(window.localStorage.getItem('checkedIngredients'));
    expect(localStorage).toEqual(['Beef - 1 lb']);
  });

  it('Verifica se o botão de finalizar receita é exibido', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, store, url);
    await waitFor(() => screen.getByTestId(recipeTitleTestId));
    const finishRecipeButton = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeButton).toBeInTheDocument();
  });

  it('Verifica se o que finaliza a receita encaminha para rota /done-recipes', async () => {
    const { history } = renderWithRouterAndRedux(<RecipeInProgress />, store, url);
    await waitFor(() => screen.getByTestId(recipeTitleTestId));
    const finishRecipeButton = screen.getByTestId(btnFinish);
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');

      expect(checkboxes).toHaveLength(8);

      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeInTheDocument();
        userEvent.click(checkbox);
      });
    });

    userEvent.click(finishRecipeButton);

    await waitFor(() => {
      const { location } = history;
      expect(location.pathname).toBe('/done-recipes');
    });
  });
});
