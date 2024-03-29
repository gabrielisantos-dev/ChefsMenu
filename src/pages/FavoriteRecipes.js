/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../index.css';
import Footer from '../components/Footer';
import favorite from '../images/favorite.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesData = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesData) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesData));
    }
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredRecipes(favoriteRecipes);
    } else if (filter === 'meals') {
      const meals = favoriteRecipes.filter((recipe) => recipe.type === 'meal');
      setFilteredRecipes(meals);
    } else if (filter === 'drinks') {
      const drinks = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
      setFilteredRecipes(drinks);
    }
  }, [favoriteRecipes, filter]);

  const copyUrlToClipboard = () => {
    const url = 'http://localhost:3000/meals/52771';
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyMessage('Link copied!');
      })
      .catch((error) => {
        console.log('Error copying to clipboard:', error);
      });
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  const handleUnfavoriteClick = (recipeId) => {
    removeFromFavorites(recipeId);
  };

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <div className="flex flex-col items-center mt-10 mx-4">

        <img className="w-14 mb-3" src={ favorite } alt="favorite" />
        <h1
          className="text-red text-xl font-black uppercase tracking-widest mb-9"
        >
          Favorite Recipes
        </h1>

        <div className="flex mb-6">
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilterClick('all') }
            className="btn-filter text-base"
          >
            All

          </button>
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilterClick('meals') }
            className="btn-filter text-base"
          >
            Meals

          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilterClick('drinks') }
            className="btn-filter text-base"
          >
            Drinks

          </button>
        </div>

        {filteredRecipes.map((recipe, index) => (
          <div
            key={ index }
            className="done-recipes"
          >
            <Link to={ `/meals/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ `${recipe.name} recipe` }
                data-testid={ `${index}-horizontal-image` }
                className="w-[134.85px] rounded-tl-[5px] rounded-bl-[5px]"
              />
            </Link>
            <div className="flex ml-2 mt-2 w-44 sm:w-56 md:w-[56.25rem]">
              <div className="flex w-32 sm:w-44 md:w-[45.25rem]">
                <div className="flex flex-col mb-3 w-32 sm:w-44 md:w-[45.25rem]">
                  <Link to={ `/drinks/${recipe.id}` }>
                    <h3
                      data-testid={ `${index}-horizontal-name` }
                      className="text-gray text-sm font-bold"
                    >
                      {recipe.name}
                    </h3>
                  </Link>
                  {recipe.type === 'meal' ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="text-gray text-[9px] font-light"
                    >
                      {`${recipe.nationality} - ${recipe.category}`}
                    </p>
                  ) : (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="text-gray text-[9px] font-light"
                    >
                      {recipe.alcoholic ? 'Alcoholic'
                        : 'Non-Alcoholic'}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-1 ml-2 mr-2">
                <button
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ copyUrlToClipboard }
                >
                  <img src={ shareIcon } height="22" width="22" alt="Share" />
                </button>
                <button
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleUnfavoriteClick(recipe.id) }
                >
                  <img src={ blackHeartIcon } height="22" width="22" alt="Unfavorite" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {copyMessage && <p>{copyMessage}</p>}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
