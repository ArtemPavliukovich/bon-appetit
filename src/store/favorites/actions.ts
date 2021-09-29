import type { RecipeType } from '../../types';
import type { FavoritesActionsTypes } from '../actionTypes';

export const ADD_RECIPE_IN_FAVORITES = 'ADD_RECIPE_IN_FAVORITES';
export const DELETE_RECIPE_IN_FAVORITES = 'DELETE_RECIPE_IN_FAVORITES';

export const addFavoriteRecipe = ({ recipe }: {recipe: RecipeType}): FavoritesActionsTypes => ({
  type: ADD_RECIPE_IN_FAVORITES,
  payload: recipe
});

export const deleteFavoriteRecipe = ({ id }: {id: string}): FavoritesActionsTypes => ({
  type: DELETE_RECIPE_IN_FAVORITES,
  payload: id
});