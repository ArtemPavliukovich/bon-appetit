import { ADD_RECIPE_IN_FAVORITES, DELETE_RECIPE_IN_FAVORITES } from './actions';

const defaultState = JSON.parse(localStorage.getItem('favorites')) ?? [];

export const favoritesReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_RECIPE_IN_FAVORITES:
      return [...state, payload];
    case DELETE_RECIPE_IN_FAVORITES:
      return state.filter(recipe => recipe.uri !== payload);
    default:
      return state;
  }
};