import {useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { getRutina, updateRutina } from "../../features/rutinas/apis";
import { AuthContext } from "../../AuthContext";
import RutinaTable from "../../features/rutinas/RutinaTable";
import RutinaFormAddEjercicio from "../../features/rutinas/RutinaFormAddEjercicio";
import { getAllEjercicios } from "../../features/ejercicios/apis";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookies from "js-cookie";
import { ClassNames } from "@emotion/react";
import { Button, Form } from "react-bootstrap";
function RutinaAdd(){
    const addForm = useRef(null);
    const {accessNew}=useContext(AuthContext);
    const {freshData}=useContext(AuthContext);
    const {id}= useParams();
    const [rutina, setRutina] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ejercicios,setEjercicios]=useState(null);
    const [privada,setPrivada]=useState(false);
    const [name,setName]=useState();

    const scrollToSection = () => { //hace scroll a donde está la referencia
        addForm.current.scrollIntoView({ behavior: "smooth" }); // smooth = animación
    };

    const isUser=()=>{
        const user=Cookies.get('user');
        return(user==rutina?.user?.id);
    }
    const updateName=async()=>{
        try{
            await accessNew();
            const response=await updateRutina(rutina.id,name,privada);
            setRutina(response.data);
            scrollToSection();

        }catch(err){
            setError(err.response.data.detail);
        }
    }
    
    useEffect(() => {
        const fetchRutina = async () => {
        try {
            accessNew();
            const response1 = await getRutina(id);
            const response2= await getAllEjercicios();
            setRutina(response1.data);// guardamos la rutina en el estado
            setEjercicios(response2.data);
            setPrivada(response1.data.private);
        } catch (err) {
            setError(err.response.data.detail);
        } finally {
            setLoading(false); // 👈 ocultamos el loading
        }
        };

        fetchRutina();
    },[id,freshData]);

    useEffect(()=>{
        setName(rutina?.name)
    },[rutina]);
    
    
    
    return(<>
    <h4>
    {loading ? "cargando rutina ...": (<input
    value={name}
    onChange={(e)=>setName(e.target.value)}
    className="form-group text-center"
    disabled={!isUser()}

     />)
     }
    {isUser() && <Form.Switch name="privada" label="privada" checked={privada} onChange={(e)=>setPrivada(e.target.checked)}></Form.Switch>} 
    
    {isUser()&& <Button className="mb-3 mt-3" onClick={()=>updateName()}>Guardar</Button>}
    
    </h4>
    
    {loading ?  "cargando rutina ..." : <RutinaTable rutina={rutina} update={true} setRutina={setRutina}/>}
    <br/>
     {loading ?  "cargando rutina ..." : loading ? "" : rutina.user.id==Cookies.get('user') && <div ref={addForm}><RutinaFormAddEjercicio  ejercicios={ejercicios} rutina={rutina}/></div>}
    </>);
}
export default RutinaAdd