import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa a página de receitas', () => {
  it('testa se as 6 categorias de Meals são renderizadas', async () => {
    global.fetch = fetch;
    renderWithRouterAndRedux(<App />, '/meals');

    const filterCards = await screen.findAllByTestId(/-category-filter/i);
    expect(filterCards.length).toBe(6);
    const mealCards = await screen.findAllByTestId(/-recipe-card/);
    expect(mealCards.length).toBe(12);

    act(() => {
      userEvent.click(filterCards[2]);
    });

    await waitFor(async () => {
      const breakfastCards = await screen.findAllByTestId(/-recipe-card/);
      expect(breakfastCards.length).toBe(7);
    });

    act(() => {
      userEvent.click(filterCards[2]);
    });
    await waitFor(async () => {
      expect(mealCards.length).toBe(12);
    });

    act(() => {
      userEvent.click(filterCards[2]);
    });
    act(() => {
      userEvent.click(filterCards[0]);
    });
    await waitFor(async () => {
      expect(mealCards.length).toBe(12);
    });
  });

  it('testa se as 6 categorias de Drinks são renderizadas', async () => {
    global.fetch = fetch;
    renderWithRouterAndRedux(<App />, '/drinks');

    const filterCards = await screen.findAllByTestId(/-category-filter/i);
    expect(filterCards.length).toBe(6);
    const drinkCards = await screen.findAllByTestId(/-recipe-card/);
    expect(drinkCards.length).toBe(12);

    act(() => {
      userEvent.click(filterCards[5]);
    });

    await waitFor(async () => {
      const cocoaCards = await screen.findAllByTestId(/-recipe-card/);
      expect(cocoaCards.length).toBe(9);
    });

    act(() => {
      userEvent.click(filterCards[5]);
    });
    await waitFor(async () => {
      expect(drinkCards.length).toBe(12);
    });

    act(() => {
      userEvent.click(filterCards[5]);
    });
    act(() => {
      userEvent.click(filterCards[0]);
    });
    await waitFor(async () => {
      expect(drinkCards.length).toBe(12);
    });
  });

  it('testa se as 12 primeiras receita de Meals são renderizadas', async () => {
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/meals');

    const filterCards = await screen.findAllByTestId(/-category-filter/i);
    expect(filterCards.length).toBe(6);
    const mealCards = await screen.findAllByTestId(/-recipe-card/);
    expect(mealCards.length).toBe(12);

    act(() => {
      userEvent.click(mealCards[0]);
    });

    await waitFor(async () => {
      expect(history.location.pathname).toBe('/meals/52977');
    });
  });

  it('testa se as 12 primeiras receitas de Drinks são renderizadas', async () => {
    global.fetch = fetch;
    const { history } = renderWithRouterAndRedux(<App />, '/drinks');

    const filterCards = await screen.findAllByTestId(/-category-filter/i);
    expect(filterCards.length).toBe(6);
    const drinkCards = await screen.findAllByTestId(/-recipe-card/);
    expect(drinkCards.length).toBe(12);

    act(() => {
      userEvent.click(drinkCards[0]);
    });

    await waitFor(async () => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });
});
