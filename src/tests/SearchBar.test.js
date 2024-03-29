// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Meals from '../components/Meals';
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

// const searchTopBtn = 'search-top-btn';
// const searchInputConst = 'search-input';
// const exercSearchBtn = 'exec-search-btn';

// describe('Testes Meals', () => {
//   test('Se os elementos estão na página', async () => {
//     renderWithRouterAndRedux(<Meals />);
//     const meals = await screen.findByRole('heading', { level: 1, name: 'Meals' });
//     const btnUser = await screen.findByTestId('profile-top-btn');
//     const btnSearch = await screen.findByTestId(searchTopBtn);

//     expect(meals).toBeInTheDocument();
//     expect(btnUser).toBeInTheDocument();
//     expect(btnSearch).toBeInTheDocument();
//   });
//   test('Se o fetch é chamado com o ingrediente', async () => {
//     renderWithRouterAndRedux(<Meals />);

//     const btnSearch = screen.getByTestId(searchTopBtn);
//     userEvent.click(btnSearch);
//     const searchInput = screen.getByTestId(searchInputConst);
//     const ingredient = screen.getByText(/Ingredient/i);
//     expect(ingredient).toBeInTheDocument();
//     jest.spyOn(global, 'fetch');
//     global.fetch = jest.fn()
//       .mockResolvedValue(Promise.resolve({
//         json: () => Promise.resolve(riceMock),
//         ok: true,
//       }));
//     userEvent.type(searchInput, 'rice');
//     const radioIngredient = screen.getByTestId('ingredient-search-radio');
//     radioIngredient.checked = true;
//     const btnSearchFetch = screen.getByTestId(exercSearchBtn);
//     userEvent.click(btnSearchFetch);
//     expect(global.fetch).toHaveBeenCalled();
//     expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=rice');
//     // screen.logTestingPlaygroundURL();
//   });
//   test('Se o fetch é chamado com o nome', async () => {
//     renderWithRouterAndRedux(<Meals />);
//     const btnSearch = screen.getByTestId(searchTopBtn);
//     userEvent.click(btnSearch);
//     const searchInput = screen.getByTestId(searchInputConst);
//     const ingredient = screen.getByText(/Name/i);
//     expect(ingredient).toBeInTheDocument();
//     jest.spyOn(global, 'fetch');
//     global.fetch = jest.fn()
//       .mockResolvedValue(Promise.resolve({
//         json: () => Promise.resolve(riceMock),
//         ok: true,
//       }));
//     userEvent.type(searchInput, 'rice');
//     const radioIngredient = screen.getByTestId('name-search-radio');
//     radioIngredient.checked = true;
//     const btnSearchFetch = screen.getByTestId(exercSearchBtn);
//     userEvent.click(btnSearchFetch);
//     expect(global.fetch).toHaveBeenCalled();
//     expect(global.fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=rice');
//   });
//   test('Se o fetch é chamado com a primeira letra', async () => {
//     renderWithRouterAndRedux(<Meals />);
//     const btnSearch = screen.getByTestId(searchTopBtn);
//     userEvent.click(btnSearch);
//     const searchInput = screen.getByTestId(searchInputConst);
//     const ingredient = screen.getByText(/Name/i);
//     expect(ingredient).toBeInTheDocument();
//     jest.spyOn(global, 'fetch');
//     global.fetch = jest.fn()
//       .mockResolvedValue(Promise.resolve({
//         json: () => Promise.resolve(riceMock),
//         ok: true,
//       }));
//     userEvent.type(searchInput, 'r');
//     const radioIngredient = screen.getByTestId('first-letter-search-radio');
//     radioIngredient.checked = true;
//     const btnSearchFetch = screen.getByTestId(exercSearchBtn);
//     userEvent.click(btnSearchFetch);
//     expect(global.fetch).toHaveBeenCalled();
//   });
//   test('Se o fetch é chamado com a primeira letra com mais de uma letra', async () => {
//     renderWithRouterAndRedux(<Meals />);
//     const btnSearch = screen.getByTestId(searchTopBtn);
//     userEvent.click(btnSearch);
//     const searchInput = screen.getByTestId(searchInputConst);
//     const ingredient = screen.getByText(/Name/i);
//     expect(ingredient).toBeInTheDocument();
//     jest.spyOn(global, 'alert');
//     global.fetch = jest.fn()
//       .mockResolvedValue(Promise.resolve({
//         json: () => Promise.resolve(riceMock),
//         ok: true,
//       }));
//     userEvent.type(searchInput, 'rice');
//     const radioIngredient = screen.getByTestId('first-letter-search-radio');
//     radioIngredient.checked = true;
//     const btnSearchFetch = screen.getByTestId(exercSearchBtn);
//     userEvent.click(btnSearchFetch);
//     expect(global.alert).toHaveBeenCalled();
//   });
//   test('Se muda o endereço', async () => {
//     const { history } = renderWithRouter(<Meals />);

//     const btnSearch = screen.getByTestId(searchTopBtn);
//     userEvent.click(btnSearch);
//     const searchInput = screen.getByTestId(searchInputConst);
//     const ingredient = screen.getByText(/Ingredient/i);
//     expect(ingredient).toBeInTheDocument();
//     jest.spyOn(global, 'fetch');
//     global.fetch = jest.fn()
//       .mockResolvedValue(Promise.resolve({
//         json: () => Promise.resolve(mockOneMeal),
//         ok: true,
//       }));
//     userEvent.type(searchInput, 'rice');
//     const radioIngredient = screen.getByTestId('ingredient-search-radio');
//     radioIngredient.checked = true;
//     const btnSearchFetch = screen.getByTestId(exercSearchBtn);
//     userEvent.click(btnSearchFetch);
//     expect(history.location.pathname).toBe('/');
//   });
// });

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

describe('Testando Header', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { history } = renderWithRouterAndRedux(
      <SearchBar />,
    );
    // clicando no search pra renderizar os inputs
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(ingredientSearchRadio);
    userEvent.click(nameSearchRadio);
    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'testando');
    userEvent.click(execSearchBtn);

    // clicando no seach pra sumir o input
    userEvent.click(searchBtn);
    expect(ingredientSearchRadio).not.toBeInTheDocument();

    userEvent.click(profileBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });
});
