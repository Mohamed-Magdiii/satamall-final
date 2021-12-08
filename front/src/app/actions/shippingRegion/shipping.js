import {
  GET_SHIPPING,
  ADD_SHIPPING,
  DELETE_SHIPPING,
  SHIPPING_ERROR,
} from "./types";
import Axios from "axios";
//GET ALL Shipping
export const getShipping = () => async (dispatch) => {
  try {
    const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/region`);
    dispatch({
      type: GET_SHIPPING,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING_ERROR,
    });
  }
};
//ADD NEW Shipping
export const addShipping = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/api/region`,
      formData,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    );
    dispatch({
      type: ADD_SHIPPING,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//DELETE Shipping
export const deleteShipping = (id) => async (dispatch) => {
  if (window.confirm("Are You Sure You Want To Delete Region")) {
    try {
      await Axios.delete(`${process.env.REACT_APP_API_URL}/api/region/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("authToken") },
      });
      dispatch({
        type: DELETE_SHIPPING,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
