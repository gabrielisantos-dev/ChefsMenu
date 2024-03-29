import {
  fetchDrinks,
  fetchDrinkCategories,
  fetchDrinksCategoryFilter,
  fetchDrinkDetails,
} from '../../helpers/drinksAPI';
import {
  fetchMeals,
  fetchMealCategories,
  fetchMealsCategoryFilter,
  fetchMealDetails,
} from '../../helpers/mealsAPI';

// ACTIONS TYPES
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_DRINKS_SUCCESS = 'FETCH_DRINKS_SUCCESS';
export const FETCH_MEAL_CATEGORIES_SUCCESS = 'FETCH_MEAL_CATEGORIES_SUCCESS';
export const FETCH_DRINK_CATEGORIES_SUCCESS = 'FETCH_DRINK_CATEGORIES_SUCCESS';
export const FETCH_FILTERED_MEALS_SUCCESS = 'FETCH_FILTERED_MEALS_SUCCESS';
export const FETCH_FILTERED_DRINKS_SUCCESS = 'FETCH_FILTERED_DRINKS_SUCCESS ';
export const CHANGE_FILTER_STATUS = 'CHANGE_FILTER_STATUS';
export const SET_LAST_CLICKED_FILTER = 'SET_LAST_CLICKED_FILTER';
export const FETCH_DRINK_DETAILS_SUCCESS = 'FETCH_DRINK_DETAILS_SUCCESS';
export const FETCH_MEAL_DETAILS_SUCCESS = 'FETCH_MEAL_DETAILS_SUCCESS';
export const SET_SHARE_TEXT_STATUS = 'SET_SHARE_TEXT_STATUS';

// ACTIONS CREATORS
export const fetchFailure = (error) => ({
  type: FETCH_FAILURE,
  payload: error,
});

export const fetchMealsSuccessful = (meals) => ({
  type: FETCH_MEALS_SUCCESS,
  payload: meals,
});

export const fetchDrinksSuccessful = (drinks) => ({
  type: FETCH_DRINKS_SUCCESS,
  payload: drinks,
});

export const getMealRecipes = () => async (dispatch) => {
  try {
    const meals = await fetchMeals();
    const incomeLimit = 12;
    const filteredMeals = meals.slice(0, incomeLimit);
    dispatch(fetchMealsSuccessful(filteredMeals));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const getDrinkRecipes = () => async (dispatch) => {
  try {
    const drinks = await fetchDrinks();
    const incomeLimit = 12;
    const filteredDrinks = drinks.slice(0, incomeLimit);
    dispatch(fetchDrinksSuccessful(filteredDrinks));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const fetchMealCategoriesSuccessful = (categories) => ({
  type: FETCH_MEAL_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchDrinkCategoriesSuccessful = (categories) => ({
  type: FETCH_DRINK_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getMealCategories = () => async (dispatch) => {
  try {
    const mealCategories = await fetchMealCategories();
    const categoryLimit = 5;
    const filteredCategories = mealCategories.slice(0, categoryLimit);
    dispatch(fetchMealCategoriesSuccessful(filteredCategories));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const getDrinkCategories = () => async (dispatch) => {
  try {
    const drinkCategories = await fetchDrinkCategories();
    const categoryLimit = 5;
    const filteredCategories = drinkCategories.slice(0, categoryLimit);
    dispatch(fetchDrinkCategoriesSuccessful(filteredCategories));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const fetchFilteredMealsSuccessful = (meals) => ({
  type: FETCH_FILTERED_MEALS_SUCCESS,
  payload: meals,
});

export const fetchFilteredDrinksSuccessful = (drinks) => ({
  type: FETCH_FILTERED_DRINKS_SUCCESS,
  payload: drinks,
});

export const getFilteredMeals = (category) => async (dispatch) => {
  try {
    const filteredMeals = await fetchMealsCategoryFilter(category);
    const incomeLimit = 12;
    const maxRecipes = filteredMeals.filter((meal, index) => index < incomeLimit);
    dispatch(fetchFilteredMealsSuccessful(maxRecipes));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const getFilteredDrinks = (category) => async (dispatch) => {
  try {
    const filteredDrinks = await fetchDrinksCategoryFilter(category);
    const incomeLimit = 12;
    const maxRecipes = filteredDrinks.filter((drink, index) => index < incomeLimit);
    dispatch(fetchFilteredDrinksSuccessful(maxRecipes));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const changeFilterStatus = (status) => ({
  type: CHANGE_FILTER_STATUS,
  payload: status,
});

export const setLastClickedFilter = (filter) => ({
  type: SET_LAST_CLICKED_FILTER,
  payload: filter,
});

export const fetchMealDetailsSucess = (mealDetails) => ({
  type: FETCH_MEAL_DETAILS_SUCCESS,
  payload: mealDetails,
});

export const fetchDrinkDetailsSucess = (drinkDetails) => ({
  type: FETCH_DRINK_DETAILS_SUCCESS,
  payload: drinkDetails,
});

export const getMealDetails = (id) => async (dispatch) => {
  try {
    const mealDetails = await fetchMealDetails(id);
    dispatch(fetchDrinkDetailsSucess(mealDetails));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const getDrinkDetails = (id) => async (dispatch) => {
  try {
    const drinkDetails = await fetchDrinkDetails(id);

    dispatch(fetchDrinkDetailsSucess(drinkDetails));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export const setShareTextStatus = (status) => ({
  type: SET_SHARE_TEXT_STATUS,
  payload: status,
});
