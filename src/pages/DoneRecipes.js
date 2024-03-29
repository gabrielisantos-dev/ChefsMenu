/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import done from '../images/Group.svg';
import Footer from '../components/Footer';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const storedRecipes = localStorage.getItem('doneRecipes');
    if (storedRecipes) {
      setDoneRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const copyUrlToClipboard = () => {
    const url = 'http://localhost:3000/meals/52771';
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopyMessage('Link copied!');
      })
      .catch((error) => {
        setCopyMessage('Failed to copy!');
        console.log(error);
      });
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const handleClearFilter = () => {
    setFilterType('');
  };

  const filteredRecipes = filterType
    ? doneRecipes.filter((recipe) => recipe.type === filterType)
    : doneRecipes;

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <div className="flex flex-col items-center mb-11">

        <img className="mb-2 mt-5" src={ done } alt="Done Recipes" />
        <h1
          className="text-red text-xl font-black uppercase tracking-widest mb-9"
        >
          Done Recipes
        </h1>

        <div className="flex mb-6">
          <button
            data-testid="filter-by-all-btn"
            className="btn-filter"
            onClick={ handleClearFilter }
          >
            All
          </button>
          <button
            data-testid="filter-by-meal-btn"
            className="btn-filter"
            onClick={ () => handleFilter('meal') }
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            className="btn-filter"
            onClick={ () => handleFilter('drink') }
          >
            Drinks
          </button>
        </div>

        <div className="flex flex-col items-center mx-6">
          {filteredRecipes.map((recipe, index) => (
            <div
              className="done-recipes"
              key={ index }
            >
              <Link to={ `/meals/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="w-[8.438rem] rounded-tl-[5px] rounded-bl-[5px]"
                />
              </Link>
              <div className="flex flex-col ml-2 mt-2 w-44 sm:w-56 md:w-[56.25rem]">
                <div className="flex">
                  <div className="flex flex-col mb-3 w-36 sm:w-56 md:w-[46.25rem]">
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
                        {recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}

                      </p>
                    )}
                  </div>
                  <div className="mt-1 ml-2 mr-2">
                    <button
                      src={ shareIcon }
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ copyUrlToClipboard }
                    >
                      <img src={ shareIcon } height="20" width="20" alt="Share" />
                    </button>
                  </div>
                </div>
                <div>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="text-gray text-[9px] font-normal"
                  >
                    {`Done in: ${recipe.doneDate}`}
                  </p>
                  {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={ tagIndex }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {copyMessage && <p>{copyMessage}</p>}
      <Footer />
    </div>
  );
}

export default DoneRecipes;
