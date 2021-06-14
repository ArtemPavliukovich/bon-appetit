import { combineReducers } from 'redux';
import { plannerReducer } from './planner/reducers';
import { favoritesReducer } from './favorites/redusers';

const rootReducer = combineReducers({
  planner: plannerReducer,
  favorites: favoritesReducer
});

export default rootReducer;