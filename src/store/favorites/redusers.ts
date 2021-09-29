import { ADD_RECIPE_IN_FAVORITES, DELETE_RECIPE_IN_FAVORITES } from './actions';
import type { RecipeType } from '../../types';
import type { FavoritesActionsTypes } from '../actionTypes';

const initialState: Array<RecipeType> = [];

export const favoritesReducer = (state = initialState, action: FavoritesActionsTypes): Array<RecipeType> => {
  switch (action.type) {
    case ADD_RECIPE_IN_FAVORITES:
      return [...state, action.payload];
    case DELETE_RECIPE_IN_FAVORITES:
      return state.filter((recipe: RecipeType): boolean => recipe.uri !== action.payload);
    default:
      return state;
  }
};