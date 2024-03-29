const setFavorites = (favorites) => localStorage
  .setItem('favoriteRecipes', JSON.stringify([...favorites]));
export const getFavorites = () => JSON
  .parse(localStorage.getItem('favoriteRecipes')) || [];

export const workFavorite = (data, pathname) => {
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const typeName = pathname.includes('meals') ? 'Meal' : 'Drink';
  const id = pathname.split('/')[2];
  console.log(id);

  const favRecipes = getFavorites();

  const isFavorite = favRecipes.some((recipe) => Number(recipe.id) === Number(id));

  if (isFavorite) {
    const newFavorites = favRecipes.filter((recipe) => Number(recipe.id) !== Number(id));
    setFavorites(newFavorites);
    return;
  }

  const itens = data[type][0];

  const favObject = {
    id: itens[`id${typeName}`],
    type: typeName.toLocaleLowerCase(),
    nationality: itens.strArea ? itens.strArea : '',
    category: itens.strCategory,
    alcoholicOrNot: itens.strAlcoholic ? itens.strAlcoholic : '',
    name: itens[`str${typeName}`],
    image: itens[`str${typeName}Thumb`],
  };

  const newArray = [...favRecipes, favObject];
  setFavorites(newArray);
};

export const RecipeIsFavorite = (pathname) => {
  // const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const id = pathname.split('/')[2];

  const favRecipes = getFavorites();

  const isIt = favRecipes.some((recipe) => Number(recipe.id) === Number(id));
  return !isIt;
};

export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes')) || [];

export const wasDone = (pathname) => {
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const id = pathname.replace(`/${type}/`, '');

  const recipes = getDoneRecipes();
  if (recipes.length === 0) return false;
  const done = recipes.some((recipe) => Number(recipe.id) === Number(id));
  return done;
};

export const getInProgress = () => JSON
  .parse(localStorage.getItem('inProgressRecipes')) || {};

export const isInProgress = (pathname) => {
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const id = pathname.replace(`/${type}/`, '');

  const recipes = getInProgress();

  if (!recipes[type]) return false;

  if (recipes[type][`${id}`]) return true;
};

export const updateFavorites = (curObj, id) => {
  const favRecipes = getFavorites();

  const isFavorite = favRecipes.some((recipe) => Number(recipe.id) === Number(id));

  if (isFavorite) {
    const newFavorites = favRecipes.filter((recipe) => Number(recipe.id) !== Number(id));
    setFavorites(newFavorites);
    return newFavorites;
  }

  const newArray = [...favRecipes, curObj];
  setFavorites(newArray);
  return newArray;
};
