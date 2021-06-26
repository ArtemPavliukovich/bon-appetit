import { combineReducers } from 'redux';
import { plannerReducer } from './planner/reducers';
import { favoritesReducer } from './favorites/redusers';
import { navReducer } from './nav/reducers';

const rootReducer = combineReducers({
  planner: plannerReducer,
  favorites: favoritesReducer,
  nav: navReducer
});

export default rootReducer;