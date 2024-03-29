/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkRecipes, getMealRecipes } from '../redux/actions';
import RecommendationsCard from './RecommendationsCard';

function DetailsCard({
  recipeImg,
  recipeTitle,
  recipeCategory,
  recipeIngredients,
  recipeMeasures,
  recipeInstructions,
  recipeVideo,
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.recipesReducer.meals);
  const drinks = useSelector((state) => state.recipesReducer.drinks);

  useEffect(() => {
    if (currentPath.includes('meals')) dispatch(getDrinkRecipes());
    if (currentPath.includes('drinks')) dispatch(getMealRecipes());
  }, []);

  const embedId = () => {
    if (recipeVideo) {
      const urlParams = new URLSearchParams(new URL(recipeVideo).search);
      const videoId = urlParams.get('v');
      return videoId;
    }
  };
  console.log(recipeVideo);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="absolute h-[37.5rem] inset-0 z-[-1] bg-black bg-opacity-50" />
        <img
          data-testid="recipe-photo"
          src={ recipeImg }
          alt={ recipeTitle }
          className="w-screen z-[-2] mt-[-9.25rem] md:mt-[-25.625rem]"
        />
      </div>
      <div className="divtitle-details">
        <h1 className="h1-details">{recipeTitle}</h1>
        <h1 className="h1-details">{recipeCategory}</h1>
      </div>

      <div className="bg-white">
        <div className="flex flex-col mx-3">
          <h2 className="h2-details">Ingredient</h2>

          <div className="flex flex-col mt-2 bg-white rounded-md border border-zinc">
            <ul className="my-4 mx-9 list-disc text-gray">
              {recipeIngredients.map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${recipeMeasures[index]}`}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="h2-details">Instructions</h2>
          <div className="flex flex-col mt-2 bg-white rounded-md border border-zinc">
            <p className="p-details">
              {recipeInstructions}
            </p>
          </div>

          <h2 className="h2-details">Video</h2>
          <div className="flex flex-col items-center">
            {currentPath.includes('meals') && (
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

          <h2 className="h2-details">Recommended</h2>
          <RecommendationsCard
            recipes={ currentPath.includes('meals') ? drinks : meals }
          />
        </div>
      </div>
    </div>
  );
}

DetailsCard.propTypes = {
  recipeImg: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipeCategory: PropTypes.string.isRequired,
  recipeIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeInstructions: PropTypes.string.isRequired,
  recipeVideo: PropTypes.string.isRequired,
};

export default DetailsCard;
