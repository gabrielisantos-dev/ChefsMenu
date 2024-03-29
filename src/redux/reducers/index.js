import { combineReducers } from 'redux';
import exampleReducer from './LoginReducer';
import recipesReducer from './RecipesReducer';
import recipeDetailsReducer from './RecipeDetailsReducer';

const rootReducer = combineReducers({
  exampleReducer,
  recipesReducer,
  recipeDetailsReducer,
});

export default rootReducer;
