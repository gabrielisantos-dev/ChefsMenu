import {
  FETCH_DRINK_DETAILS_SUCCESS,
  FETCH_FAILURE,
  FETCH_MEAL_DETAILS_SUCCESS,
  SET_SHARE_TEXT_STATUS,
} from '../actions';

const INITIAL_STATE = {
  error: '',
  recipeDetails: [],
  shareTextStatus: false,
};

const recipeDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  case FETCH_MEAL_DETAILS_SUCCESS:
  case FETCH_DRINK_DETAILS_SUCCESS:
    return {
      ...state,
      recipeDetails: action.payload,
    };
  case SET_SHARE_TEXT_STATUS:
    return {
      ...state,
      shareTextStatus: action.payload,
    };
  default:
    return state;
  }
};

export default recipeDetailsReducer;
