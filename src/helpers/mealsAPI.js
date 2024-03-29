export const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  return data.meals;
};

export const fetchMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  if (!response.ok) throw new Error('Erro na requisição das categorias - API de meals!');

  return data.meals;
};

export const fetchMealsCategoryFilter = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Erro na requisição do filtro da categoria - API de meals!');
  }

  return data.meals;
};

export const fetchMealDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Erro na requisição dos detalhes do meal - API de meals!');
  }

  return data.meals;
};
