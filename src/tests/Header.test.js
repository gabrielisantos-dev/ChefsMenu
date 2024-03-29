import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Recipes from '../pages/Recipes';

describe('Testes Header', () => {
  test('Verifica a existencia dos elementos no Header', () => {
    renderWithRouterAndRedux(<Recipes />);
    const profileImg = screen.getByTestId('profile-top-btn');
    expect(profileImg).toBeInTheDocument();
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });
});
