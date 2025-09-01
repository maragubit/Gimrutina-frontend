import axios from "axios";
import Cookies from "js-cookie";
import {accessNew} from "../../utils";

const domain = process.env.REACT_APP_API_DOMAIN;


export const getProfile= async (id)=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/perfiles/perfil/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const getUsers= async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/perfiles/users/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}

export const updateProfile= async (id,data)=>{
  const accessToken= await accessNew();
    return axios.patch(`${domain}/perfiles/perfiles/${id}/`,data,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const addFriend= async (id)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/perfiles/perfiles/${id}/add_friend/`,{},{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}