import { ADD_RECIPE_IN_FAVORITES, DELETE_RECIPE_IN_FAVORITES } from './favorites/actions';
import { ADD_FAVORITE_RECIPE, CHANGE_PLANNER } from './nav/actions';
import { SET_PLANNER_FIELDS } from './planner/actions';
import type { RecipeType, ObjectPlannerField, PlannerField } from '../types';

// add/delete favorites recipes
interface AddRecipeInFavorites {
  type: typeof ADD_RECIPE_IN_FAVORITES,
  payload: RecipeType
};

interface DeleteRecipeInFavorites {
  type: typeof DELETE_RECIPE_IN_FAVORITES,
  payload: string
};

export type FavoritesActionsTypes = AddRecipeInFavorites | DeleteRecipeInFavorites;

// nav indicator
interface AddFavoriteIndicate {
  type: typeof ADD_FAVORITE_RECIPE,
  payload: number
};

interface ChangePlannerIndicate {
  type: typeof CHANGE_PLANNER,
  payload: boolean
};

export type NavIndicator = AddFavoriteIndicate | ChangePlannerIndicate;

// planner
export interface SetPlannerFields {
  type: typeof SET_PLANNER_FIELDS,
  payload: ObjectPlannerField
};

export interface ActionPlanner extends PlannerField {
  fieldName: string
}