import axios from "axios"
import Cookies from "js-cookie";
import {accessNew} from "../../utils";


const domain=process.env.REACT_APP_API_DOMAIN;
 

/* APIS RUTINAS */
export const getAllRutinas = async() => {
  const accessToken= await accessNew();
  return axios.get(`${domain}/rutinas/api/rutinas/`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});
}

export const createRutina= async (name,isPrivate,token)=>{
  const accessToken= await accessNew();
  return axios.post(`${domain}/rutinas/api/rutinas/`, {
  name,
  private:isPrivate,
  recaptcha_token: token
  },
  {
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  } 
  );
}

export const getRutina= async (id)=>{
  const accessToken= await accessNew();
  return axios.get(`${domain}/rutinas/api/rutinas/${id}/`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
  });
}

export const updateRutina= async(id,name,Isprivate)=>{
  const accessToken= await accessNew();
  return axios.put(`${domain}/rutinas/api/rutinas/${id}/`,{name,private:Isprivate}, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
  });

}

/* APIS RUTINA ACTUAL */
export const rutinaActual=async ()=>{ //devuelve una instancia de rutina marcada como actual
    const accessToken= await accessNew();
    return axios.get(`${domain}/rutinas/api/rutina-actual/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const getRutinaActual=async()=>{ //devuelve la instancia de RutinaActual marcada como actual
  const accessToken= await accessNew();
    return axios.get(`${domain}/rutinas/api/rutina-actual/mi-rutinaActual/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}
export const crearRutinaActual=async(rutina)=>{
  const accessToken= await accessNew();    
  return axios.post(`${domain}/rutinas/api/rutina-actual/`,{rutina},{
    headers:{
        Authorization: `Bearer ${accessToken}`
    }
  })
}