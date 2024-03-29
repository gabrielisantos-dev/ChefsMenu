/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getMealDetails, getDrinkDetails } from '../redux/actions';
import DetailsCard from '../components/DetailsCard';
import HeaderRecipe from '../components/HeaderRecipe';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const typeOfRecipe = currentPath.match(/\/([^/]+)/)[1];
  const dispatch = useDispatch();
  const recipeDetails = useSelector((state) => state.recipeDetailsReducer.recipeDetails);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recipeMade, setRecipeMade] = useState();
  const [recipeInProgress, setRecipeInProgress] = useState();
  const shareTextStatus = useSelector(
    (state) => state.recipeDetailsReducer.shareTextStatus,
  );
  const filterIngredientsAndMeasures = () => {
    if (recipeDetails.length > 0) {
      const filteredIngredients = Object.entries(recipeDetails[0]).filter(
        ([key, value]) => {
          const isIngredient = key.includes('strIngredient');
          const isValueValid = value !== null && value !== '';
          return isIngredient && isValueValid;
        },
      ).map(([, value]) => value);
      const filterMeasures = Object.entries(recipeDetails[0]).filter(
        ([key, value]) => {
          const isMeasure = key.includes('strMeasure');
          const isValueValid = value !== null && value !== ' ';
          return isMeasure && isValueValid;
        },
      ).map(([, value]) => value);
      setIngredients(filteredIngredients);
      setMeasures(filterMeasures);
    }
  };
  useEffect(() => {
    if (currentPath.includes('meals')) dispatch(getMealDetails(id));
    if (currentPath.includes('drinks')) dispatch(getDrinkDetails(id));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const verifyDoneRecipe = doneRecipes.some((recipe) => recipe.id === id);
      setRecipeMade(verifyDoneRecipe);
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const idsInProgress = Object.keys(inProgressRecipes[typeOfRecipe]);
      const verifyIdsInProgress = idsInProgress.some(
        (inProgressId) => id === inProgressId,
      );
      setRecipeInProgress(verifyIdsInProgress);
    }
  }, []);
  useEffect(() => {
    filterIngredientsAndMeasures();
  }, [recipeDetails]);
  return (
    <div>
      <HeaderRecipe />
      {recipeDetails.length > 0
      && <DetailsCard
        recipeImg={ currentPath.includes('meals')
          ? recipeDetails[0].strMealThumb : recipeDetails[0].strDrinkThumb }
        recipeTitle={ currentPath.includes('meals')
          ? recipeDetails[0].strMeal : recipeDetails[0].strDrink }
        recipeCategory={ currentPath.includes('meals')
          ? recipeDetails[0].strCategory : recipeDetails[0].strAlcoholic }
        recipeIngredients={ ingredients }
        recipeMeasures={ measures }
        recipeInstructions={ recipeDetails[0].strInstructions }
        recipeVideo={ currentPath.includes('meals') ? recipeDetails[0].strYoutube : '' }
      />}

      <div className="flex justify-center">
        { !recipeMade
      && (
        <Link
          to={
            currentPath.includes('/meals')
              ? `/meals/${id}/in-progress`
              : `/drinks/${id}/in-progress`
          }
        >
          <button
            data-testid="start-recipe-btn"
            className="button-RecipeDetails"
          >
            {recipeInProgress
              ? 'Continue Recipe'
              : 'Start Recipe'}
          </button>
        </Link>
      )}
      </div>
      { shareTextStatus && (
        <p>Link copied!</p>
      )}
    </div>
  );
}
export default RecipeDetails;
