export const SET_PLANNER_FIELDS = 'SET_PLANNER_FIELD';

export const setPlannerField = ({ fieldName, url, comment, title }) => ({
  type: SET_PLANNER_FIELDS,
  payload: {
    [fieldName]: {
      url: url,
      comment: comment,
      title: title
    }
  }
});