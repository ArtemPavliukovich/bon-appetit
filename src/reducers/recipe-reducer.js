import { GET_ID } from './actions-const';

const recipeReducer = (state = null, { type, id }) => {
  switch (type) {
    case GET_ID:
      return id;
    default:
      return state;
  }
};

export default recipeReducer;