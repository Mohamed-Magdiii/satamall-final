/** @format */

import axios from "axios";
import { GET_BLOGS, DELETE_BLOG, ADD_BLOG } from "./types";

//GET ALL BLOGS
export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs`);
    dispatch({
      type: GET_BLOGS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//Delete Blog
export const deleteBlog = (id) => async (dispatch) => {
  if (window.confirm("Are You Sure You Want To Delete Blog")) {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("authToken") },
      });
      dispatch({
        type: DELETE_BLOG,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
//Add Blog
export const addBlog = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/blogs`,
      formData,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    );
    dispatch({
      type: ADD_BLOG,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
