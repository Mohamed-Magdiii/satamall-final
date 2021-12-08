import {
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY_BY_ID,
  GET_ALL_CATEGORY,
} from "../app/actions/category/categoryTypes";

const initialState = {
  category: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case ADD_NEW_CATEGORY:
      return {
        ...state,
      };
      case DELETE_CATEGORY_BY_ID: return {
          ...state
      }
    default:
      return state;
  }
};

export default categoryReducer;
