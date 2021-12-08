import { GET_CITY, ADD_CITY, CITY_ERROR, DELETE_CITY } from "./types";
import Axios from "axios";
//GET ALL CITIES
export const getCities = () => async (dispatch) => {
  try {
    const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/city`);
    dispatch({
      type: GET_CITY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CITY_ERROR,
    });
  }
};
//ADD NEW CITY
export const addCities = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/api/city`,
      formData,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    );
    dispatch({
      type: ADD_CITY,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
//DELETE Country
export const deleteCity = (id) => async (dispatch) => {
  if (window.confirm("Are You Sure You Want To Delete City")) {
    try {
      await Axios.delete(`${process.env.REACT_APP_API_URL}/api/city/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("authToken") },
      });
      dispatch({
        type: DELETE_CITY,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
