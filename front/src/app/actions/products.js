import Axios from "axios";

import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  DELETE_PRODUCTS,
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  ADD_PRODUCTS,
  UPDATE_PRODUCTS,
  GET_PRODUCT,
  GET_RATES,
  SEARCH_PRODUCT
} from "./types";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await Axios.get(
      `${process.env.REACT_APP_API_URL}/api/products`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

//Delete product
export const deleteProduct = (id) => async (dispatch) => {
  if (window.confirm("Are You Sure You Want To Delete Product")) {
    try {
      await Axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`,
        { headers: { "x-auth-token": localStorage.getItem("authToken") } }
      );
      dispatch({
        type: DELETE_PRODUCTS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
      });
    }
  }
};

//Add Product
export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await Axios.post(
      `${process.env.REACT_APP_API_URL}/api/products`,formData,
      {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      }
    );  
    dispatch({
      type: ADD_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};

//GET Category
export const getCategory = () => async (dispatch) => {
  try {
    const res = await Axios.get(
      `${process.env.REACT_APP_API_URL}/api/categories`
    );

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_ERROR,
    });
  }
};
//Get product By Id
export const getProductByID = (id) => async (dispatch) => {
    try {
     const res = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`,
        { headers: { "x-auth-token": localStorage.getItem("authToken") } }
      );
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_ERROR,
      });
    }
  
};

//update Product
export const updateProduct = (formData,id) => async (dispatch) => {
  try {
    const res = await Axios.put(
      `${process.env.REACT_APP_API_URL}/api/products/${id}`,formData,
      {
        headers: {
          "x-auth-token": localStorage.getItem("authToken"),
        },
      }
    ); 
    console.log(res.data); 
    dispatch({
      type: UPDATE_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};


//Get Rates
export const getRates = ()=> async dispatch =>{
  try {
    const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/rates`, {headers:{'x-auth-token':localStorage.getItem('authToken')}})
    dispatch({
      type:GET_RATES,
      payload:res.data
    })
  } catch (error) {
    console.log(error.message);
  }
}

//Get Products Using Query
export const getProductsUsingQuery = (query)=> async dispatch =>{
  try {
    const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products/findBy/:${query}`, {headers:{'x-auth-token':localStorage.getItem('authToken')}})
    dispatch({
      type:SEARCH_PRODUCT,
      payload:res.data
    })
  } catch (error) {
    console.log(error.message);
  }
}
