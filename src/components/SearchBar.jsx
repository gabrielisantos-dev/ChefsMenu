import React, { useState,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { fetchMealsByIngredients, fetchMealsByName,
  fetchMealsByFirstLetter, fetchDrinksByIngredients,
  fetchDrinksByName, fetchDrinksByFirstLetter } from '../services/Api';
import { fetchFilteredMealsSuccessful,
  fetchFilteredDrinksSuccessful,
  changeFilterStatus } from '../redux/actions';
import '../index.css';

function SearchBar() {
  const location = useLocation();
  const [radioOption, setRadioOption] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [myLocation] = useState(location.pathname);
  const history = useHistory();
  const dispatch = useDispatch();

  const mealHandleChange = async () => {
    let apiResponse;
    switch (radioOption) {
    case 'ingredient':
      apiResponse = await fetchMealsByIngredients(filterInput);
      break;
    case 'name':
      apiResponse = await fetchMealsByName(filterInput);
      break;
    case 'firstLetter':
      apiResponse = await fetchMealsByFirstLetter(filterInput);
      break;
    default:
    }
    try {
      if (apiResponse.length === 1) {
        const { idMeal } = apiResponse[0];
        history.push(`/meals/${idMeal}`);
      } else {
        dispatch(changeFilterStatus(true));
        dispatch(fetchFilteredMealsSuccessful(apiResponse));
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const drinkHandleChange = async () => {
    let apiResponse;
    switch (radioOption) {
    case 'ingredient':
      apiResponse = await fetchDrinksByIngredients(filterInput);
      break;
    case 'name':
      apiResponse = await fetchDrinksByName(filterInput);
      break;
    case 'firstLetter':
      apiResponse = await fetchDrinksByFirstLetter(filterInput);
      break;
    default:
    }
    try {
      if (apiResponse.length === 1) {
        const { idDrink } = apiResponse[0];
        history.push(`/drinks/${idDrink}`);
      } else {
        dispatch(changeFilterStatus(true));
        dispatch(fetchFilteredDrinksSuccessful(apiResponse));
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <section className="flex justify-center">

      <div className="container-search">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search recipes"
          value={ filterInput }
          onChange={ ({ target }) => setFilterInput(target.value) }
          className="search-input"
        />

        <div className="flex items-center h-[68px]">
          <label
            htmlFor="Ingredient"
            className="label"
          >
            <input
              id="Ingredient"
              type="radio"
              name="radioFilter"
              value="ingredient"
              data-testid="ingredient-search-radio"
              onChange={ ({ target }) => setRadioOption(target.value) }
              className="mr-1"
            />
            Ingredient
          </label>

          <label
            htmlFor="Name"
            className="label"
          >
            <input
              id="Name"
              type="radio"
              name="radioFilter"
              value="name"
              data-testid="name-search-radio"
              onChange={ ({ target }) => setRadioOption(target.value) }
              className="mr-1"
            />
            Name
          </label>

          <label
            htmlFor="firstLetter"
            className="text-white"
          >
            <input
              id="firstLetter"
              type="radio"
              name="radioFilter"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              onChange={ ({ target }) => setRadioOption(target.value) }
              className="mr-1"
            />
            First letter
          </label>
        </div>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ myLocation === '/drinks' ? drinkHandleChange : mealHandleChange }
          className="btn-search bg-yellow "
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
