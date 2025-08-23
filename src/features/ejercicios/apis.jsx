import axios from "axios";
import Cookies from "js-cookie";
import {accessNew} from "../../utils";

const domain=process.env.REACT_APP_API_DOMAIN;




/* EJERCICIOS */
export const getAllEjercicios = async() => {
  const accessToken= await accessNew();
  return axios.get(`${domain}/ejercicios/ejercicios/`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});
}

export const getEjercicio= async (id)=> {
  const accessToken= await accessNew();
  return axios.get(`${domain}/ejercicios/ejercicios/${id}/`, {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });

}

export const deleteEjercicio= async (id)=> {
  const accessToken= await accessNew();
  return axios.delete(`${domain}/ejercicios/ejercicios/${id}/`, {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });

}

export const updateEjercicio= async (id,data)=>{
  const accessToken= await accessNew();
  return axios.put(`${domain}/ejercicios/ejercicios/${id}/`,data,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const createEjercicio= async (data)=>{
  const accessToken= await accessNew();
  return axios.post(`${domain}/ejercicios/ejercicios/`,data,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

/* EJERCICIOS FAVORITOS */
export const getFavoritos= async()=>{
  const accessToken= await accessNew();
  return axios.get(`${domain}/favourites/ejercicios-favoritos/mis-favoritos/`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const marcarFavoritos= async (ejercicio)=>{
  const accessToken= await accessNew();
  return axios.post(`${domain}/favourites/ejercicios-favoritos/`,{ejercicio},{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const eliminarFavoritos= async(ejercicio)=>{
  const accessToken= await accessNew();
  return axios.delete(`${domain}/favourites/ejercicios-favoritos/eliminar-favorito/`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    },data: { ejercicio }
  });
}




/* EJERCICIO-REPETICIONES */

export const createEjercicioRepeticiones = async(reps_max,reps_min,exercise,series,rutina,day,order)=>{
  const accessToken= await accessNew();
  return axios.post(`${domain}/ejercicios/ejercicios-repeticiones/`,{
    reps_max,
    reps_min,
    exercise,
    series,
    rutina,
    day,
    order},
    {
    headers:
    {
      Authorization: `Bearer ${accessToken}`
    }
  });

}

export const deleteEjercicioRepeticiones = async(id)=>{
  const accessToken= await accessNew();
  return axios.delete(`${domain}/ejercicios/ejercicios-repeticiones/${id}/`,{
    headers:{
      Authorization:`Bearer ${accessToken}`
    }
  })
}


