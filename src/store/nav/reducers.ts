import { ADD_FAVORITE_RECIPE, CHANGE_PLANNER } from './actions';
import type { NavIndicator } from '../actionTypes';
import type { NavInitialState } from '../../types';

const initialState: NavInitialState = {
  favorites: 0,
  planner: false
};

export const navReducer = (state = initialState, action: NavIndicator): NavInitialState => {
  switch (action.type) {
    case ADD_FAVORITE_RECIPE:
      return {
        ...state,
        favorites: action.payload !== 0 ? state.favorites + action.payload : 0
      };
    case CHANGE_PLANNER:
      return {
        ...state,
        planner: action.payload
      };
    default:
      return state;
  }
};