import EjercicioForm from "../../features/ejercicios/EjercicioForm";
import { useState,useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { Alert, Button } from "react-bootstrap";
import { deleteEjercicio, getEjercicio, updateEjercicio } from "../../features/ejercicios/apis";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Ejercicio(){
    const redirect=useNavigate();
    const {id}= useParams();
    const {accessNew}=useContext(AuthContext);
    const [ejercicio,setEjercicio]=useState();
    const [error,setError]=useState(null);
    const isOwner=()=>ejercicio?.user?.id==Cookies.get('user');
    useEffect(()=>{
        const miEjercicio = async function fetchEjercicio(){
        
        try{
            await accessNew();
            const response=await getEjercicio(id);
            setEjercicio(response.data);
           
        }catch(err){
            setError(err.message);
        }
    }

    miEjercicio();
    },[]);

    const handleFormSubmit = async (data) => {
        
        try {
          await accessNew();    
          await updateEjercicio(id,data);
          redirect("/ejercicios/")
        } catch (err) {
          setError(err.message);
        }
      };

    const eliminar=async()=>{
        try{
            await accessNew();
            await deleteEjercicio(id);
            redirect("/ejercicios/")
        }catch(err){
            setError(err.message);
        }

    }
    
    return(<>
        <EjercicioForm ejercicio={ejercicio} onSubmit={handleFormSubmit} update={true}/>
        <br/>
        {error && <Alert variant="danger">{error}</Alert>}
        {isOwner() && <Button className="mt-4 mb-4"variant="danger" onClick={()=>eliminar()}>Eliminar ejercicio</Button>}
    </>)
}
export default Ejercicio;