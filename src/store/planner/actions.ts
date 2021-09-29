import type { SetPlannerFields, ActionPlanner } from '../actionTypes';

export const SET_PLANNER_FIELDS = 'SET_PLANNER_FIELD';

export const setPlannerField = ({ fieldName, url, comment, title }: ActionPlanner): SetPlannerFields => ({
  type: SET_PLANNER_FIELDS,
  payload: {
    [fieldName]: {
      url: url,
      comment: comment,
      title: title
    }
  }
});