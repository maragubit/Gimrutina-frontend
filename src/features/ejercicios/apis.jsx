import axios from "axios";
import Cookies from "js-cookie";
const domain=process.env.REACT_APP_API_DOMAIN;



/* EJERCICIOS */
export const getAllEjercicios = () => {
  const accessToken=Cookies.get("access");
  return axios.get(`${domain}/ejercicios/ejercicios/`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});
}

export const getEjercicio= (id)=> {
  const accessToken=Cookies.get("access");
  return axios.get(`${domain}/ejercicios/ejercicios/${id}/`, {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });

}

export const deleteEjercicio= (id)=> {
  const accessToken=Cookies.get("access");
  return axios.delete(`${domain}/ejercicios/ejercicios/${id}/`, {
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });

}

export const updateEjercicio= (id,data)=>{
  const accessToken=Cookies.get("access");
  return axios.put(`${domain}/ejercicios/ejercicios/${id}/`,data,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const createEjercicio=(data)=>{
  const accessToken=Cookies.get("access");
  return axios.post(`${domain}/ejercicios/ejercicios/`,data,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

/* EJERCICIOS FAVORITOS */
export const getFavoritos=()=>{
  const accessToken=Cookies.get("access");
  return axios.get(`${domain}/favourites/ejercicios-favoritos/mis-favoritos/`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const marcarFavoritos=(ejercicio)=>{
  const accessToken=Cookies.get("access");
  return axios.post(`${domain}/favourites/ejercicios-favoritos/`,{ejercicio},{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const eliminarFavoritos=(ejercicio)=>{
  const accessToken=Cookies.get("access");
  return axios.delete(`${domain}/favourites/ejercicios-favoritos/eliminar-favorito/`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    },data: { ejercicio }
  });
}




/* EJERCICIO-REPETICIONES */

export const createEjercicioRepeticiones = (reps_max,reps_min,exercise,series,rutina,day,order)=>{
    const accessToken=Cookies.get("access");
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

export const deleteEjercicioRepeticiones = (id)=>{
  const accessToken=Cookies.get("access");
  return axios.delete(`${domain}/ejercicios/ejercicios-repeticiones/${id}/`,{
    headers:{
      Authorization:`Bearer ${accessToken}`
    }
  })
}


