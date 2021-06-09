import { combineReducers } from 'redux';
import { plannerReducer } from './planner/reducers';

const rootReducer = combineReducers({
  planner: plannerReducer
});

export default rootReducer;