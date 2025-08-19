import Cookies from "js-cookie";
import axios from "axios";

const domain=process.env.REACT_APP_API_DOMAIN;




/* APIS ENTRENAMIENTOS */
export const getEntrenamiento=(id)=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/entrenamientos/entrenamientos/${id}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

}
export const getAllEntrenamientos=()=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/entrenamientos/entrenamientos/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

}

export const getAllEntrenamientosSinFinalizar=()=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/entrenamientos/entrenamientos-sin-finalizar/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

}
export const getMisEntrenamientos=()=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/entrenamientos/mis-entrenamientos/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const createEntrenamiento=(date,finished)=>{
    const accessToken=Cookies.get('access');
    return axios.post(`${domain}/entrenamientos/entrenamientos/`,{date,finished},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    });

}
export const updateEntrenamiento=(id,data)=>{
    const accessToken=Cookies.get('access');
    return axios.patch(`${domain}/entrenamientos/entrenamientos/${id}/`,data,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });

}

export const deleteEntrenamiento=(id)=>{
    const accessToken=Cookies.get('access');
    return axios.delete(`${domain}/entrenamientos/entrenamientos/${id}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });

}

/* APIS SERIES */
export const getSerie=(id)=>{
    const accessToken=Cookies.get('access');
    return axios.get(`${domain}/entrenamientos/series/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}
export const createSerie=(data)=>{
    const accessToken=Cookies.get('access');
    return axios.post(`${domain}/entrenamientos/series/`,data,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}

export const updateSerie=(id,weight,reps,failure)=>{
    const accessToken=Cookies.get('access');
    return axios.patch(`${domain}/entrenamientos/series/${id}/`,{weight,reps,failure},{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}

export const deleteSerie=(id)=>{
    const accessToken=Cookies.get('access');
    return axios.delete(`${domain}/entrenamientos/series/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
}