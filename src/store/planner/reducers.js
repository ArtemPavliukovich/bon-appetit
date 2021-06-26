import { SET_PLANNER_FIELDS } from './actions';
import messages from '../../constants/messages';

const createDefaultState = () => {
  return messages.planner.fields.map(fieldName => ({
    [fieldName]: {
      url: '#',
      title: '',
      comment: ''
    }
  }));
};

const defaultState = createDefaultState();

export const plannerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_PLANNER_FIELDS:
      return state.map(field => 
        Object.keys(field)[0] === Object.keys(payload)[0] ? payload : field
      );
    default:
      return state;
  }
};