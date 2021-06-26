export const ADD_FAVORITE_RECIPE = 'ADD_FAVORITE_RECIPE';
export const CHANGE_PLANNER = 'SET_FIELD_PLANNER';

export const addRecipe = ({ countRecipe }) => ({
  type: ADD_FAVORITE_RECIPE,
  payload: countRecipe
});

export const changePlanner = ({ isChange }) => ({
  type: CHANGE_PLANNER,
  payload: isChange
});