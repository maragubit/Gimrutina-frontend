import axios from "axios";
import Cookies from "js-cookie";
import {accessNew} from "../../utils";

const domain = process.env.REACT_APP_API_DOMAIN;

/* PROFILE */
export const getProfile= async (id)=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/perfiles/perfil/`,{
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

/* USERS */

export const getUsers= async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/perfiles/users/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}



/* FRIENDS */

export const addFriend= async (id)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/perfiles/perfiles/${id}/add_friend/`,{},{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const getFriends= async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/perfiles/perfiles/myFriends/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}
export const removeFriend= async (id)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/perfiles/perfiles/${id}/remove_friend/`,{},{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

/* NOTIFICATIONS */

export const createNotification= async (data)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/notifications/notifications/`,data,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}
export const getNotifications= async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/notifications/notifications/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const markAsReadNotification= async (id)=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/notifications/notifications/${id}/mark-as-read/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}