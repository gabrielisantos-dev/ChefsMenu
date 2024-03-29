// meals
// const errorMsg = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchMealsByIngredients = async (ingredients) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  const firstTwelve = 12;
  const filteredMeals = data.meals.slice(0, firstTwelve);
  // if (filteredMeals === null) {
  //   throw new
  //   Error(errorMsg);
  // }
  return filteredMeals;
};

export const fetchMealsByName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  const firstTwelve = 12;
  const filteredMeals = data.meals.slice(0, firstTwelve);
  // if (filteredMeals === null) {
  //   throw new
  //   Error(errorMsg);
  // }
  return filteredMeals;
};

export const fetchMealsByFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await response.json();
    const firstTwelve = 12;
    const filteredMeals = data.meals.slice(0, firstTwelve);
    // if (filteredMeals === null) {
    //   throw new
    //   Error(errorMsg);
    // }
    return filteredMeals;
  }
};

// drinks
export const fetchDrinksByIngredients = async (ingredients) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  const data = await response.json();
  const firstTwelve = 12;
  const filteredDrinks = data.drinks.slice(0, firstTwelve);
  // if (filteredDrinks === null) {
  //   throw new
  //   Error(errorMsg);
  // }
  return filteredDrinks;
};

export const fetchDrinksByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  const firstTwelve = 12;
  const filteredDrinks = data.drinks.slice(0, firstTwelve);
  // if (filteredDrinks === null) {
  //   throw new
  //   Error(errorMsg);
  // }
  return filteredDrinks;
};

export const fetchDrinksByFirstLetter = async (FirstLetter) => {
  if (FirstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${FirstLetter}`);
    const data = await response.json();
    const firstTwelve = 12;
    const filteredDrinks = data.drinks.slice(0, firstTwelve);
    // if (filteredDrinks === null) {
    //   throw new
    //   Error(errorMsg);
    // }
    return filteredDrinks;
  }
};
