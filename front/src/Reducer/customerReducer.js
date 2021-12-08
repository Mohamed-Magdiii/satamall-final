import {
GET_ALL_CUSTOMERS,
DELETE_USER_BY_ID
} from '../app/actions/customers/customerTypes';

const initialState = {
    users: []
}

const userReducer = (state = initialState, action) =>{
    switch(action.type) { 
        case GET_ALL_CUSTOMERS : return {
            ...state,
            users: action.payload
        }
        case DELETE_USER_BY_ID : return {
            ...state
        }
        default: return {...state};
    }
}

export default userReducer;