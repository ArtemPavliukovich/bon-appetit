const NUM_ITEMS_PAGE = 12;
const QUERY_RECIPE = 'http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_';
const BASE_URL = 'https://api.edamam.com/search?';

export const diet = [
  '',
  'balanced',
  'high-protein',
  'low-fat',
  'low-carb'
];

export const meal = [
  '',
  'breakfast',
  'lunch',
  'dinner',
  'snack'
];

export class Edamam {
  static config = {
    id: '7d9eaa37',
    apiKey: '3f3205e03268bdeebff3d78c3f0edf43'
  }

  static getRecipe ({ text, type, page, filter, popstate }) {
    const { id, apiKey } = this.config;

    const filterMealType = filter.meal ? {
      mealType: filter.meal.toLowerCase()
    } : {};

    const filterDietType = filter.diet ? {
      diet: filter.diet.toLowerCase()
    } : {};
  
    return fetch(BASE_URL + decodeURI(new URLSearchParams({
      app_id: id,
      app_key: apiKey,
      imageSize: 'REGULAR',
      from: page === null ? '' : (popstate) ? 0 : +page * NUM_ITEMS_PAGE,
      to: page === null ? '' : (+page + 1) * NUM_ITEMS_PAGE,
      [type]: type === 'q' ? text : QUERY_RECIPE + text,
      ...filterMealType,
      ...filterDietType
    })))
      .then(response => response.json());
  }
};