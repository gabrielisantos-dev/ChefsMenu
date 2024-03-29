import { screen } from '@testing-library/react';
import Recipes from '../pages/Recipes';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa o componente de Footer', () => {
  it('Testa se ocorre a renderização correta do componente Footer', () => {
    renderWithRouterAndRedux(<Recipes />);
    const footer = screen.getByTestId('footer');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });
});
