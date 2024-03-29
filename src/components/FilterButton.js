import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFilterStatus,
  getFilteredDrinks,
  getFilteredMeals,
  setLastClickedFilter,
} from '../redux/actions';
import '../index.css';

function FilterButton({ strCategory, currentPath }) {
  const dispatch = useDispatch();
  const filterStatus = useSelector((state) => state.recipesReducer.filterStatus);
  const lastClickedFilter = useSelector(
    (state) => state.recipesReducer.lastClickedFilter,
  );

  const handleCategoryFilter = (category) => {
    if (category === 'All') {
      dispatch(changeFilterStatus(false));
      setLastClickedFilter(category);
      return;
    }

    if (lastClickedFilter !== category) {
      if (currentPath === '/meals') dispatch(getFilteredMeals(category));
      if (currentPath === '/drinks') dispatch(getFilteredDrinks(category));

      dispatch(changeFilterStatus(true));
      dispatch(setLastClickedFilter(category));
    } else if (lastClickedFilter === category) {
      dispatch(changeFilterStatus(!filterStatus));
      dispatch(setLastClickedFilter(category));
    }
  };

  return (
    <button
      key={ strCategory }
      onClick={ () => handleCategoryFilter(strCategory) }
      data-testid={ `${strCategory}-category-filter` }
      className="btn-filter"
    >
      {strCategory}
    </button>
  );
}

FilterButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default FilterButton;
