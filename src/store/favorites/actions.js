export const ADD_RECIPE_IN_FAVORITES = 'ADD_RECIPE_IN_FAVORITES';
export const DELETE_RECIPE_IN_FAVORITES = 'DELETE_RECIPE_IN_FAVORITES';

export const addFavoriteRecipe = ({ recipe }) => ({
  type: ADD_RECIPE_IN_FAVORITES,
  payload: recipe
});

export const deleteFavoriteRecipe = ({ id }) => ({
  type: DELETE_RECIPE_IN_FAVORITES,
  payload: id
});