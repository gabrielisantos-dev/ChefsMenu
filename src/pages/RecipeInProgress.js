import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderRecipe from '../components/HeaderRecipe';

function RecipeInProgress() {
  const history = useHistory();
  const [recipeData, setRecipeData] = useState([]);
  const { pathname } = history.location;
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = pathname.split('/')[1] === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipeData(data);
    };
    fetchData();
  }, [pathname]);

  useEffect(() => {
    const savedIngredients = localStorage.getItem('checkedIngredients');
    if (savedIngredients) {
      setCheckedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  const dataRender = pathname
    .split('/')[1] === 'drinks' ? recipeData?.drinks
    : recipeData?.meals;

  const getIngredients = () => {
    const numberLimit = 25;
    const listOfIngredients = [];
    if (dataRender) {
      for (let index = 1; index <= numberLimit; index += 1) {
        const ingredient = dataRender[0][`strIngredient${index}`];
        const measure = dataRender[0][`strMeasure${index}`];
        if (ingredient) {
          listOfIngredients.push(`${ingredient} - ${measure}`);
        }
      }
    }
    return listOfIngredients;
  };

  const ingredientsArray = getIngredients();

  const saveInLocalStorage = (event) => {
    const { name, checked } = event.target;
    const updatedIngredients = checked
      ? [...checkedIngredients, name]
      : checkedIngredients.filter((ingredient) => ingredient !== name);

    setCheckedIngredients(updatedIngredients);
    localStorage.setItem('checkedIngredients', JSON.stringify(updatedIngredients));
  };

  const scratchText = (event) => {
    const label = event.target.parentNode;

    if (event.target.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
    saveInLocalStorage(event);
  };

  const isChecked = (ingredient) => checkedIngredients.includes(ingredient);

  const saveRecipe = () => {
    const dateNow = new Date();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipe = {
      id: dataRender[0].idMeal || dataRender[0].idDrink,
      nationality: dataRender[0].strArea || '',
      name: dataRender[0].strMeal || dataRender[0].strDrink,
      category: dataRender[0].strCategory || '',
      image: dataRender[0].strMealThumb || dataRender[0].strDrinkThumb,
      tags: dataRender[0].strTags === null ? [] : dataRender[0].strTags.split(','),
      alcoholicOrNot: dataRender[0].strAlcoholic || '',
      type: pathname.split('/')[1] === 'drinks' ? 'drink' : 'meal',
      doneDate: dateNow,
    };
    doneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  const finish = checkedIngredients
    .filter((ingredient) => ingredientsArray.includes(ingredient));

  const embedId = () => {
    if (dataRender[0].strYoutube) {
      const urlParams = new URLSearchParams(new URL(dataRender[0].strYoutube).search);
      const videoId = urlParams.get('v');
      return videoId;
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderRecipe />

      {pathname.split('/')[1] === 'drinks'
      || pathname.split('/')[1] === 'meals' ? (
          dataRender
        && dataRender.length > 0
        && (
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-transparentblack" />
              <img
                src={ dataRender[0].strDrinkThumb || dataRender[0].strMealThumb }
                alt=""
                className="w-screen z-[-2] mt-[-9.25rem] md:mt-[-25.625rem]"
              />
            </div>

            <div className="divtitle-details">
              <h1 className="h1-details">
                {dataRender[0].strDrink || dataRender[0].strMeal}
              </h1>
              <h1 className="h1-details">{dataRender[0].strCategory}</h1>
              {pathname.split('/')[1] === 'drinks' && (
                <h1 className="h1-details">{dataRender[0].strAlcoholic}</h1>
              )}
            </div>

            <div className="bg-white">
              <div className="flex flex-col mx-3">
                <h2 className="h2-details">Ingredient</h2>
                <div className="checkbox-container">
                  {ingredientsArray.map((ingredient, index) => (
                    <label
                      htmlFor={ ingredient }
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        name={ ingredient }
                        id={ ingredient }
                        key={ index }
                        onChange={ (event) => scratchText(event) }
                        checked={ isChecked(ingredient) }
                        className="input-recipeinprogress"
                      />
                      <span
                        style={ {
                          textDecoration: isChecked(ingredient)
                            ? 'line-through'
                            : 'none',
                        } }
                      >
                        {ingredient}
                      </span>
                    </label>
                  ))}
                </div>

                <h2 className="h2-details">Instructions</h2>
                <div className="checkbox-container">
                  <p data-testid="instructions">{dataRender[0].strInstructions}</p>
                </div>

                <h2 className="h2-details">Video</h2>
                <div className="flex flex-col items-center">
                  {pathname.includes('meals') && (
                    <iframe
                      src={ `https://www.youtube.com/embed/${embedId()}` }
                      allow="accelerometer;
                  autoplay; clipboard-write; encrypted-media; gyroscope"
                      allowFullScreen
                      title="Embedded youtube"
                      data-testid="video"
                      className="bg-black bg-opacity-30 w-full h-60 md:h-[37.5rem]"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  data-testid="finish-recipe-btn"
                  disabled={ finish.length !== ingredientsArray.length }
                  onClick={ saveRecipe }
                  className="button-recipeinprogress"
                >
                  Finalizar Receita
                </button>
              </div>
            </div>
          </div>
        )
        ) : null}
    </div>
  );
}

export default RecipeInProgress;
