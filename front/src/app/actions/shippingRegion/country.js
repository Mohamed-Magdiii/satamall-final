import {
  GET_COUNTRY,
  ADD_COUNTRY,
  COUNTRY_ERROR,
  DELETE_COUNTRY,
} from "./types";
import Axios from "axios";
//GET ALL COUNTRIES
export const getCountries = () => async (dispatch) => {
  try {
    const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/country`);
    dispatch({
      type: GET_COUNTRY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_ERROR,
    });
  }
};
//ADD NEW COUNTRIES
export const addCountries = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/api/country`,
      formData,
      { headers: { "x-auth-token": localStorage.getItem("authToken") } }
    );
    dispatch({
      type: ADD_COUNTRY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
//DELETE Country
export const deleteCountry = (id) => async (dispatch) => {
  if (window.confirm("Are You Sure You Want To Delete Country")) {
    try {
      await Axios.delete(`${process.env.REACT_APP_API_URL}/api/country/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("authToken") },
      });
      dispatch({
        type: DELETE_COUNTRY,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
