import { Alert, Container } from "react-bootstrap";
import RutinaTable from "../../features/rutinas/RutinaTable";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getRutina } from "../../features/rutinas/apis";
import { Icon } from "@iconify/react/dist/iconify.js";

function RutinaUpdate(){
    const {id}=useParams();
    const {accessNew}=useContext(AuthContext)
    const[rutina,setRutina]=useState();
    const [error,setError]=useState();
    const [load,setLoad]=useState(true);



    useEffect(()=>{
        async function fetchRutina(){
            try{
                await accessNew();
                const response= await getRutina(id);
                setRutina(response.data);
                setLoad(false);
            }catch(err){
                setError(err.response.data.detail);
            }
        }
        fetchRutina();
    },[])



    return(<>
    <Container>
        <h4>Editar rutina</h4>
    {load ? (<div><Icon icon="line-md:loading-loop" /> <p>Cargando</p></div>):<RutinaTable rutina={rutina} update={true} setRutina={setRutina}/>}
    {error && <Alert>{error}</Alert>}
    </Container>
    </>);
}
export default RutinaUpdate;