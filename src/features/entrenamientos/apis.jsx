import Cookies from "js-cookie";
import axios from "axios";
import {accessNew} from "../../utils";

const domain=process.env.REACT_APP_API_DOMAIN;




/* APIS ENTRENAMIENTOS */
export const getEntrenamiento= async (id)=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/entrenamientos/entrenamientos/${id}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

}
export const getAllEntrenamientos=async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/entrenamientos/entrenamientos/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

}

export const getAllEntrenamientosSinFinalizar=async ()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/entrenamientos/entrenamientos-sin-finalizar/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

}
export const getMisEntrenamientos= async()=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/entrenamientos/mis-entrenamientos/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const createEntrenamiento= async(date,finished)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/entrenamientos/entrenamientos/`,{date,finished},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    });

}
export const updateEntrenamiento=async (id,data)=>{
  const accessToken= await accessNew();
    return axios.patch(`${domain}/entrenamientos/entrenamientos/${id}/`,data,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });

}

export const deleteEntrenamiento=async (id)=>{
  const accessToken= await accessNew();
    return axios.delete(`${domain}/entrenamientos/entrenamientos/${id}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });

}

/* APIS SERIES */
export const getSerie= async(id)=>{
  const accessToken= await accessNew();
    return axios.get(`${domain}/entrenamientos/series/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}
export const createSerie= async (data)=>{
  const accessToken= await accessNew();
    return axios.post(`${domain}/entrenamientos/series/`,data,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}

export const updateSerie= async (id,weight,reps,failure,date)=>{
  const accessToken= await accessNew();
    return axios.patch(`${domain}/entrenamientos/series/${id}/`,{weight,reps,failure,date},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}

export const deleteSerie=async (id)=>{
  const accessToken= await accessNew();
    return axios.delete(`${domain}/entrenamientos/series/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}