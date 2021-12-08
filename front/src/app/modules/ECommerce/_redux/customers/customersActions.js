import axios from "axios";
import * as requestFromServer from "./customersCrud";
import {GET_ALL_CUSTOMERS} from './customersType';
import {customersSlice, callTypes} from "./customersSlice";

const {actions} = customersSlice;

// export const fetchCustomers = queryParams => dispatch => {
//   dispatch(actions.startCall({ callType: callTypes.list }));
//   return requestFromServer
//     .findCustomers(queryParams)
//     .then(response => {
//       const { totalCount, entities } = response.data;
//       dispatch(actions.customersFetched({ totalCount, entities }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't find customers";
//       dispatch(actions.catchError({ error, callType: callTypes.list }));
//     });
// };
export const fetchCustomers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.customersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find customers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomer = id => dispatch => {
  if (!id) {
    return dispatch(actions.customerFetched({ customerForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then(response => {
      const customer = response.data;
      dispatch(actions.customerFetched({ customerForEdit: customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't find customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomer = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomer(id)
    .then(response => {
      dispatch(actions.customerDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = customerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then(response => {
      const { customer } = response.data;
      dispatch(actions.customerCreated({ customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't create customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = customer => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(customer)
    .then(() => {
      dispatch(actions.customerUpdated({ customer }));
    })
    .catch(error => {
      error.clientMessage = "Can't update customer";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomersStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomers(ids, status)
    .then(() => {
      dispatch(actions.customersStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update customers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomers = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomers(ids)
    .then(() => {
      dispatch(actions.customersDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


/* Added By Me */


export const fetchUser = (users) =>{
  return {
    type: GET_ALL_CUSTOMERS,
    payload: users
  }
}

export const getAllUsers = () =>{
  return (dispatch) =>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/users`,{
      headers: {
        'x-auth-token' : localStorage.getItem('authToken')
      }
    }).then((response)=>{
      dispatch(fetchUser(response.data));
    }).catch((error)=>{
      alert('Error in getAll Users')
    })
  }
}
