/** @format */

import axios from "axios";
import { GET_BLOGS, DELETE_BLOG, ADD_BLOG,UPDATE_BLOG, GET_BLOG } from "./types";

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
//Update Blog
export const updateBlog = (formData,id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/blogs/${id}`,
      formData,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    );
    dispatch({
      type: UPDATE_BLOG,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

//Get Blog By ID
export const getBlogByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/blogs/${id}`,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    );
    dispatch({
      type: GET_BLOG,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};