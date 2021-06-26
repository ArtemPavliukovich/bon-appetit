import { ADD_FAVORITE_RECIPE, CHANGE_PLANNER } from './actions';

const defaultState = {
  favorites: 0,
  planner: false
};

export const navReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ADD_FAVORITE_RECIPE:
      return {
        ...state,
        favorites: payload ? state.favorites + payload : payload
      };
    case CHANGE_PLANNER:
      return {
        ...state,
        planner: payload
      };
    default:
      return state;
  }
};