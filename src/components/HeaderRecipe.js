/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';

import { useDispatch, useSelector } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setShareTextStatus } from '../redux/actions';

function HeaderRecipe() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const recipeDetails = useSelector((state) => state.recipeDetailsReducer.recipeDetails);
  const typeOfRecipe = currentPath.match(/\/([^/]+)/)[1].replace(/s$/, '');
  const localStorageFavorites = localStorage.getItem('favoriteRecipes');
  const favoriteRecipes = localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
  const shareTextStatus = useSelector(
    (state) => state.recipeDetailsReducer.shareTextStatus,
  );
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.some((
    favorite,
  ) => favorite.id === id));

  useEffect(() => {
    let timer;

    const displayTime = 5000;
    if (shareTextStatus) {
      timer = setInterval(() => {
        dispatch(setShareTextStatus(false));
      }, displayTime);
    }

    return () => {
      clearInterval(timer);
    };
  }, [shareTextStatus]);

  const handleShare = () => {
    const url = window.location.href;
    copy(url);
    dispatch(setShareTextStatus(true));
  };

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      const filterFavorite = favoriteRecipes.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
    } else {
      setIsFavorite(true);
      const newFavorite = {
        id,
        type: typeOfRecipe,
        nationality: recipeDetails[0].strArea || '',
        category: recipeDetails[0].strCategory || '',
        alcoholicOrNot: recipeDetails[0].strAlcoholic || '',
        name: recipeDetails[0].strMeal || recipeDetails[0].strDrink,
        image: recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb,
      };
      const newFavorites = [...favoriteRecipes, newFavorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  return (
    <main className="main-header-recipe">
      { recipeDetails[0]
      && (
        <div className="ml-8 md:ml-16">
          <p
            className="p-header-recipe"
          >
            { recipeDetails[0].strCategory }
          </p>
        </div>
      )}
      <div>
        <button onClick={ handleShare }>
          <img
            src={ shareIcon }
            alt="share"
            data-testid="share-btn"
            className="w-7 md:w-9"
          />
        </button>
        <button
          onClick={ handleFavorite }
          className="mr-8 md:mr-16 ml-3"
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt={ isFavorite ? 'liked' : 'like' }
            data-testid="favorite-btn"
            className="w-7 md:w-9"
          />
        </button>
      </div>
    </main>
  );
}

export default HeaderRecipe;
