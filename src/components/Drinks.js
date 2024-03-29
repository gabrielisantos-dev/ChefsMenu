import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinkCategories, getDrinkRecipes } from '../redux/actions';
import RecipeCard from './RecipeCard';
import Filters from './Filters';
import Header from './Header';
import '../index.css';

function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.recipesReducer.drinks);
  const filteredDrinks = useSelector((state) => state.recipesReducer.filteredDrinks);
  const filterStatus = useSelector((state) => state.recipesReducer.filterStatus);

  useEffect(() => {
    dispatch(getDrinkRecipes());
    dispatch(getDrinkCategories());
  }, [dispatch]);

  return (
    <main className="flex-col-center px-3">
      <div className="flex-col-center mb-6 md:mb-12">
        <Header pageTitle="Drinks" />
      </div>

      <div>
        <div className="flex-col-center mb-5">
          <div className="flex">
            <Filters />
          </div>
        </div>
        <div className="flex justify-center flex-wrap mb-14">
          {
            filterStatus
              ? (
                filteredDrinks.map((drink, index) => {
                  const { strDrinkThumb, strDrink, idDrink } = drink;
                  return (
                    <RecipeCard
                      key={ `${strDrink}-${index}` }
                      recipeImage={ strDrinkThumb }
                      recipeName={ strDrink }
                      index={ index }
                      recipeId={ idDrink }
                    />
                  );
                })
              ) : (
                drinks.map((drink, index) => {
                  const { strDrinkThumb, strDrink, idDrink } = drink;
                  return (
                    <RecipeCard
                      key={ `${strDrink}-${index}` }
                      recipeImage={ strDrinkThumb }
                      recipeName={ strDrink }
                      index={ index }
                      recipeId={ idDrink }
                    />
                  );
                })
              )
          }
        </div>
      </div>
    </main>
  );
}

export default Drinks;
