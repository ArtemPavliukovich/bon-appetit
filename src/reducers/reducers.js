import { combineReducers } from 'redux';
import recipeReducer from './recipe-reducer';

const rootReducer = combineReducers({
  recipe: recipeReducer
});

export default rootReducer;