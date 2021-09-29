import { SET_PLANNER_FIELDS } from './actions';
import messages from '../../constants/messages';
import type { ObjectPlannerField } from '../../types';
import type { SetPlannerFields } from '../actionTypes';

const createDefaultState = (): Array<ObjectPlannerField> => {
  return messages.planner.fields.map((fieldName: string): ObjectPlannerField => ({
    [fieldName]: {
      url: '#',
      title: '',
      comment: ''
    }
  }));
};

const initialState: Array<ObjectPlannerField> = createDefaultState();

export const plannerReducer = (state = initialState, { type, payload }: SetPlannerFields) => {
  switch (type) {
    case SET_PLANNER_FIELDS:
      return state.map((field: ObjectPlannerField): ObjectPlannerField => 
        Object.keys(field)[0] === Object.keys(payload)[0] ? payload : field
      );
    default:
      return state;
  }
};