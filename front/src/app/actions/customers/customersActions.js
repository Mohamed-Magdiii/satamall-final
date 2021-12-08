import {GET_ALL_CUSTOMERS,DELETE_USER_BY_ID, ADD_NEW_CUSTOMER} from "./customerTypes";
import axios from "axios";
export const get_All_Customers = (customers) => {
  return {
    type: GET_ALL_CUSTOMERS,
    payload: customers,
  };
};

export const getAllCustomers = () => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
      headers: {
        "x-auth-token": localStorage.getItem("authToken"),
      },
    }).then((response)=>{
      dispatch(get_All_Customers(response.data));
    }).catch(()=>{
      alert('Error from Customer Actions')
    });
  };
};

export const delete_user_by_id = () =>{
  return {
    type: DELETE_USER_BY_ID
  }
}

export const deleteUserById = (id) =>{
  return (dispatch) =>{
    axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`,{
      headers: {
        "x-auth-token": localStorage.getItem("authToken"),
      },
    }).then(()=>{
      dispatch(delete_user_by_id());
      dispatch(getAllCustomers());
    }).catch(()=>{
    })
  }
}

export const add_new_customer = () =>{
  return {
    type: ADD_NEW_CUSTOMER
  }
}

export const addCustomer = (fullname, email, password, phone, mobile, role) =>{
  return (dispatch) =>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/users`,{
      fullname, email, password, phone, mobile, role
    }).then(()=>{
      dispatch(getAllCustomers());
    }).catch(()=>{
      alert('Error While Posting ')
    })
  }
}
