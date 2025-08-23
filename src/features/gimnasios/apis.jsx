import Cookies from "js-cookie";
import axios from "axios";
import {accessNew} from "../../utils";

const domain=process.env.REACT_APP_API_DOMAIN;

export const getAllGimnasios= async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/gimnasios/gimnasios/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}
export const getGimnasio= async (id)=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/gimnasios/gimnasios/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const createGimnasio= async (nombre,direccion,horario,tarifa,admin,token)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/gimnasios/gimnasios/`,{nombre,direccion,horario,tarifa,admin, recaptcha_token:token},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const updateGimnasio= async(id,nombre,direccion,horario,tarifa,admin)=>{
  const accessToken= await accessNew();
    return axios.patch(`${domain}/gimnasios/gimnasios/${id}/`,{nombre,direccion,horario,tarifa,admin},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const deleteGimnasio=async (id)=>{
  const accessToken= await accessNew();
    return axios.delete(`${domain}/gimnasios/gimnasios/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}