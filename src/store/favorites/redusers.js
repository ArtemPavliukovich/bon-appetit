import { ADD_RECIPE_IN_FAVORITES, DELETE_RECIPE_IN_FAVORITES } from './actions';

export const favoritesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_RECIPE_IN_FAVORITES:
      return [...state, payload];
    case DELETE_RECIPE_IN_FAVORITES:
      return state.filter(recipe => recipe.uri !== payload);
    default:
      return state;
  }
};