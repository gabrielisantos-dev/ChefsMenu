import {
  FETCH_FAILURE,
  FETCH_DRINKS_SUCCESS,
  FETCH_DRINK_CATEGORIES_SUCCESS,
  FETCH_FILTERED_DRINKS_SUCCESS,
  FETCH_MEALS_SUCCESS,
  FETCH_MEAL_CATEGORIES_SUCCESS,
  FETCH_FILTERED_MEALS_SUCCESS,
  CHANGE_FILTER_STATUS,
  SET_LAST_CLICKED_FILTER,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  meals: [],
  drinks: [],
  mealCategories: [],
  drinkCategories: [],
  filteredMeals: [],
  filteredDrinks: [],
  filterStatus: false,
  lastClickedFilter: '',
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  case FETCH_MEALS_SUCCESS:
    return {
      ...state,
      meals: action.payload,
    };
  case FETCH_DRINKS_SUCCESS:
    return {
      ...state,
      drinks: action.payload,
    };
  case FETCH_MEAL_CATEGORIES_SUCCESS:
    return {
      ...state,
      mealCategories: action.payload,
    };
  case FETCH_DRINK_CATEGORIES_SUCCESS:
    return {
      ...state,
      drinkCategories: action.payload,
    };
  case FETCH_FILTERED_MEALS_SUCCESS:
    return {
      ...state,
      filteredMeals: action.payload,
    };
  case FETCH_FILTERED_DRINKS_SUCCESS:
    return {
      ...state,
      filteredDrinks: action.payload,
    };
  case CHANGE_FILTER_STATUS:
    return {
      ...state,
      filterStatus: action.payload,
    };
  case SET_LAST_CLICKED_FILTER:
    return {
      ...state,
      lastClickedFilter: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
