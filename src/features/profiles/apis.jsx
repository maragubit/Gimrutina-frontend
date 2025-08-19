import axios from "axios";
import Cookies from "js-cookie";

const domain = process.env.REACT_APP_API_DOMAIN;


export const getProfile=(id)=>{
    const accessNew=Cookies.get('access');
    return axios.get(`${domain}/perfiles/perfil/`,{
        headers:{
            Authorization:`Bearer ${accessNew}`
        }
    })

}

export const getUsers=()=>{
    const accessNew=Cookies.get('access');
    return axios.get(`${domain}/perfiles/users/`,{
        headers:{
            Authorization:`Bearer ${accessNew}`
        }
    })
}

export const updateProfile=(id,data)=>{
    const accessNew=Cookies.get('access');
    return axios.patch(`${domain}/perfiles/perfiles/${id}/`,data,{
        headers:{
            Authorization: `Bearer ${accessNew}`
        }
    })
}