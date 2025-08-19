import axios from "axios"
import Cookies from "js-cookie";
const domain=process.env.REACT_APP_API_DOMAIN;
 

/* APIS RUTINAS */
export const getAllRutinas = () => {
  const accessToken = Cookies.get('access');
  return axios.get(`${domain}/rutinas/api/rutinas/`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});
}

export const createRutina= (name,isPrivate)=>{
  const accessToken = Cookies.get('access');
  return axios.post(`${domain}/rutinas/api/rutinas/`, {
  name,
  private:isPrivate
  },
  {
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  } 
  );
}

export const getRutina= (id)=>{
  const accessToken = Cookies.get('access');
  return axios.get(`${domain}/rutinas/api/rutinas/${id}/`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
  });
}

export const updateRutina= (id,name,Isprivate)=>{
  const accessToken = Cookies.get('access');
  return axios.put(`${domain}/rutinas/api/rutinas/${id}/`,{name,private:Isprivate}, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
  });

}

/* APIS RUTINA ACTUAL */
export const rutinaActual=()=>{ //devuelve una instancia de rutina marcada como actual
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/rutinas/api/rutina-actual/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const getRutinaActual=()=>{ //devuelve la instancia de RutinaActual marcada como actual
  const accessToken=Cookies.get('access');
    return axios.get(`${domain}/rutinas/api/rutina-actual/mi-rutinaActual/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}
export const crearRutinaActual=(rutina)=>{
    const accessToken=Cookies.get('access');
    return axios.post(`${domain}/rutinas/api/rutina-actual/`,{rutina},{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}