import axios from "axios";

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/api/auth/login`;
export const REGISTER_URL = `${process.env.REACT_APP_API_URL}/api/auth/register`;
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

export function login(email, password) {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password })
}

export function register(fullname, email, password, telephone, mobile, role ) {
  // export function register(email, fullname, username, password) {
  // return axios.post(REGISTER_URL, { email, fullname, username, password });
  return axios.post(REGISTER_URL, { fullname, email, password, role, mobile, telephone },{
    headers: {
      'x-auth-token' : localStorage.getItem('authToken')
    }
  });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`,{
    headers: {'x-auth-token': localStorage.getItem('authToken')}
  }); // until Deal with Eng Karim .. 
}
