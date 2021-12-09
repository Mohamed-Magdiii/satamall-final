import {
  GET_BLOGS,
  DELETE_BLOG,
  ADD_BLOG,
  UPDATE_BLOG,
  GET_BLOG
} from "../../src/app/actions/blogs/types";
const initState = {
  blogs: [],
  blog: null,
  loading: true,
};

export default function(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blg) => blg._id !== payload),
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, payload],
      };
      case UPDATE_BLOG:
        case GET_BLOG:
        return {
          ...state,
          blog:payload
        }
    default:
      return state;
  }
}
