import { SET_PLANNER_FIELDS } from './actions';
import messages from '../../constants/messages';

const { fields } = messages.planner;

const createDefaultState = () => {
  return fields.map(fieldName => ({
    [fieldName]: {
      url: '#',
      title: '',
      comment: ''
    }
  }));
};

/* Эта логика(getDefaultState) нам нужна для того, чтобы, если представить, что проект активен и им пользуются,
мы смогли менять динамически нашу таблицу и при этом у всех пользлователей все продолжало работать */
const getDefaultState = () => { 
  const state = JSON.parse(localStorage.getItem('planner'));

  if (state) {
    const isChangeFields = fields.every(field => 
      Object.keys(state).filter(fieldName => fieldName === field).length
    );

    if (fields.length === Object.keys(state).length && isChangeFields) {
      return state;
    } else {
      return createDefaultState().map(field => {
        const stateItem = state.filter(fieldName => Object.keys(fieldName)[0] === Object.keys(field)[0]);

        if (stateItem.length) {
          return stateItem[0];
        } else {
          return field;
        }
      });
    }
  } else {
    return state;
  }
};

const defaultState = getDefaultState() ?? createDefaultState();

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