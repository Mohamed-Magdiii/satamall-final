import {
  GET_ALL_CATEGORY,
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY_BY_ID,
} from "./categoryTypes";
import axios from "axios";

export const get_all_category = (category) => {
  return {
    type: GET_ALL_CATEGORY,
    payload: category,
  };
};

export const getAllCategory = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => {
        dispatch(get_all_category(response.data));
      })
      .catch((err) => {
        alert("Error", err);
      });
  };
};

export const add_new_category = () => {
  return {
    type: ADD_NEW_CATEGORY,
  };
};

export const addNewCategory = (title) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/categories`,
        { title },
        {
          headers: {
            "x-auth-token": localStorage.getItem("authToken"),
          },
        }
      )
      .then(() => {
        dispatch(add_new_category());
        dispatch(getAllCategory());
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const delete_category_by_id = () => {
  return {
    type: DELETE_CATEGORY_BY_ID,
  };
};

export const deleteCategoryById = (id) => {
  return (dispatch) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/categories/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      })
      .then(() => {
        dispatch(getAllCategory());
      })
      .catch(() => {});
  };
};
