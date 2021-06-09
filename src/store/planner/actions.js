export const SET_PLANNER_FIELDS = 'SET_PLANNER_FIELD';

export const setPlannerField = ({ field, url, comment, title }) => ({
  type: SET_PLANNER_FIELDS,
  payload: {
    [field]: {
      url: url,
      comment: comment,
      title: title
    }
  }
});