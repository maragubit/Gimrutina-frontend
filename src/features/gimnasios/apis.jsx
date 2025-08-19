import Cookies from "js-cookie";
import axios from "axios";

const domain=process.env.REACT_APP_API_DOMAIN;

export const getAllGimnasios=()=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/gimnasios/gimnasios/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}
export const getGimnasio=(id)=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/gimnasios/gimnasios/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const createGimnasio=(nombre,direccion,horario,tarifa,admin)=>{
    const accessToken=Cookies.get('access');
    return axios.post(`${domain}/gimnasios/gimnasios/`,{nombre,direccion,horario,tarifa,admin},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const updateGimnasio=(id,nombre,direccion,horario,tarifa,admin)=>{
    const accessToken=Cookies.get('access');
    return axios.patch(`${domain}/gimnasios/gimnasios/${id}/`,{nombre,direccion,horario,tarifa,admin},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}

export const deleteGimnasio=(id)=>{
    const accessToken=Cookies.get('access');
    return axios.delete(`${domain}/gimnasios/gimnasios/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

}