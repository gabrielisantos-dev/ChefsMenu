import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FilterButton from './FilterButton';

function Filters() {
  const drinkCategories = useSelector((state) => state.recipesReducer.drinkCategories);
  const mealCategories = useSelector((state) => state.recipesReducer.mealCategories);
  const location = useLocation();
  const currentPath = location.pathname;

  const renderCategories = () => {
    let categories = [];
    if (currentPath === '/meals') categories = mealCategories;
    if (currentPath === '/drinks') categories = drinkCategories;

    return categories.map((category) => {
      const { strCategory } = category;

      return (
        <FilterButton
          key={ strCategory }
          strCategory={ strCategory }
          currentPath={ currentPath }
        />
      );
    });
  };

  return (
    <>
      {renderCategories().length > 0 && (
        <FilterButton
          strCategory="All"
          currentPath={ currentPath }
        />
      )}
      {renderCategories()}
    </>
  );
}

export default Filters;
