export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  if (!response.ok) throw new Error('Erro na requisição da API de drinks!');

  return data.drinks;
};

export const fetchDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  if (!response.ok) throw new Error('Erro na requisição das categorias - API de drinks!');

  return data.drinks;
};

export const fetchDrinksCategoryFilter = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Erro na requisição do filtro da categoria - API de drinks!');
  }

  return data.drinks;
};

export const fetchDrinkDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Erro na requisição dos detalhes do drink - API de drinks!');
  }

  return data.drinks;
};
