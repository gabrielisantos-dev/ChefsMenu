import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';

describe('DoneRecipes', () => {
  const doneRecipesData = [
    {
      id: 1,
      name: 'Receita 1',
      image: 'receita1.jpg',
      type: 'meal',
      nationality: 'Nacionalidade 1',
      category: 'Categoria 1',
      doneDate: '2023-07-15',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    },
    {
      id: 2,
      name: 'Receita 2',
      image: 'receita2.jpg',
      type: 'drink',
      alcoholic: true,
      doneDate: '2023-07-14',
      tags: ['Tag 4', 'Tag 5', 'Tag 6'],
    },
    {
      id: 3,
      name: 'Receita 3',
      image: 'receita3.jpg',
      type: 'drink',
      alcoholic: false,
      doneDate: '2023-07-13',
      tags: ['Tag 7', 'Tag 8', 'Tag 9'],
    },
  ];

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesData));
  });

  afterEach(() => {
    localStorage.clear();
  });

  const btnAllFilter = 'filter-by-all-btn';
  const btnMealFilter = 'filter-by-meal-btn';

  test('renderiza os botões de filtro', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const filterByAllBtn = screen.getByTestId(btnAllFilter);
    const filterByMealBtn = screen.getByTestId(btnMealFilter);
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(filterByAllBtn).toBeInTheDocument();
    expect(filterByMealBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();
  });

  test('clicar no botão "Todos" mostra todas as receitas', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const filterByMealBtn = screen.getByTestId(btnMealFilter);
    fireEvent.click(filterByMealBtn);

    const filterByAllBtn = screen.getByTestId(btnAllFilter);
    fireEvent.click(filterByAllBtn);

    const recipeCards = screen.getAllByTestId(/-horizontal-image$/);
    expect(recipeCards.length).toBe(doneRecipesData.length);
  });

  test('clicar no botão "Refeições" filtra as receitas por tipo refeição', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const filterByMealBtn = screen.getByTestId(btnMealFilter);
    fireEvent.click(filterByMealBtn);

    const recipeCards = screen.getAllByTestId(/-horizontal-image$/);
    const filteredRecipes = doneRecipesData.filter((recipe) => recipe.type === 'meal');
    expect(recipeCards.length).toBe(filteredRecipes.length);
  });

  test('clicar no botão "Bebidas" filtra as receitas por tipo bebida', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(filterByDrinkBtn);

    const recipeCards = screen.getAllByTestId(/-horizontal-image$/);
    const filteredRecipes = doneRecipesData.filter((recipe) => recipe.type === 'drink');
    expect(recipeCards.length).toBe(filteredRecipes.length);
  });

  test('renderiza os cards de receita', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const recipeCards = screen.getAllByTestId(/-horizontal-image$/);

    expect(recipeCards.length).toBe(doneRecipesData.length);
  });

  test('clicar nos botões de filtro filtra as receitas', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const filterByMealBtn = screen.getByTestId(btnMealFilter);
    fireEvent.click(filterByMealBtn);
    const recipeCards = screen.getAllByTestId(/-horizontal-image$/);

    const filteredRecipes = doneRecipesData.filter((recipe) => recipe.type === 'meal');
    expect(recipeCards.length).toBe(filteredRecipes.length);
  });

  test('clicar no botão de limpar filtro mostra todas as receitas', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const filterByMealBtn = screen.getByTestId(btnMealFilter);
    fireEvent.click(filterByMealBtn);
    const filterByAllBtn = screen.getByTestId(btnAllFilter);
    fireEvent.click(filterByAllBtn);
    const recipeCards = screen.getAllByTestId(/-horizontal-image$/);

    expect(recipeCards.length).toBe(doneRecipesData.length);
  });

  test('clicar no botão de compartilhamento copia o URL para a área de transferência', async () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const originalClipboard = { ...navigator.clipboard };

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockImplementation((text) => Promise.resolve(text)),
      },
    });

    const shareBtn = screen.getAllByTestId(/-horizontal-share-btn$/)[0];
    fireEvent.click(shareBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'http://localhost:3000/meals/52771',
    );

    Object.assign(navigator, originalClipboard);
  });

  test('exibe a mensagem "Link copied!" após copiar o URL para a área de transferência', async () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const originalWriteText = navigator.clipboard.writeText;
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);

    fireEvent.click(screen.getAllByTestId(/-horizontal-share-btn$/)[0]);

    await expect(writeTextMock).toHaveBeenCalledWith(
      'http://localhost:3000/meals/52771',
    );

    const linkCopiedMessage = await screen.findByText('Link copied!');
    expect(linkCopiedMessage).toBeInTheDocument();

    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(originalWriteText);
  });

  test('renderiza os detalhes da receita ao clicar no nome da receita', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const recipeLink = screen.getAllByTestId(/-horizontal-name$/)[0];
    fireEvent.click(recipeLink);

    const recipeDetails = screen.getByText(/Receita 1/i);
    expect(recipeDetails).toBeInTheDocument();
  });

  test('renderiza as tags da receita', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const recipeTags = screen.getAllByTestId((_, element) => element.tagName.toLowerCase() === 'span' && element.textContent.startsWith('Tag'));

    expect(recipeTags.length).toBe(6);
  });

  test('exibe a data de conclusão de cada receita', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const doneDates = screen.getAllByTestId((_, element) => element.tagName.toLowerCase() === 'p' && element.textContent.startsWith('2023-07-'));

    expect(doneDates.length).toBe(doneRecipesData.length);
  });

  test('atualiza o estado doneRecipes corretamente ao obter dados do localStorage', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const storedRecipes = JSON.stringify(doneRecipesData);
    localStorage.setItem('doneRecipes', storedRecipes);

    expect(screen.getAllByTestId(/-horizontal-image$/).length).toBe(doneRecipesData.length);
  });

  test('clicar no link do nome da receita navega para a rota correta', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );

    const recipeLink = screen.getAllByTestId(/-horizontal-name$/)[0];
    fireEvent.click(recipeLink);

    const rotaEsperada = doneRecipesData[0].type === 'refeição'
      ? `/meals/${doneRecipesData[0].id}`
      : `/drinks/${doneRecipesData[0].id}`;
    expect(window.location.pathname).toBe(rotaEsperada);
  });

  test('Se a bebida for não alcolica, exibir Non-Alcoholic na tela', () => {
    render(
      <Router>
        <DoneRecipes />
      </Router>,
    );
    const nonAlcoholic = screen.getByText('Non-Alcoholic');
    expect(nonAlcoholic).toBeInTheDocument();
  });
});
