import axios from "axios";
import Cookies from "js-cookie";

const domain = process.env.REACT_APP_API_DOMAIN;

export const getToken = (email, password,token) => {
  return axios.post(`${domain}/login/api/login/`, {
    email,
    password,
    recaptcha_token: token
  });
};

export const refreshToken = () => {
  const refresh = Cookies.get("refresh")
  return axios.post(`${domain}/api/token/refresh/`, {
    refresh
  });
};

export const getUser = () => {
  const user = Cookies.get("user");
  const access=Cookies.get("access");
  return axios.get(`${domain}/login/user/${user}/`, {
    headers: {
    Authorization: `Bearer ${access}`
    }
  });
};

export const register = (email,password,token)=>{
  return axios.post(`${domain}/login/user/`,{email, password, recaptcha_token: token});
}