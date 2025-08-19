import { Alert, Button, Col, Container, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useState,useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate,useParams } from "react-router-dom";
import { createGimnasio, deleteGimnasio, getGimnasio, updateGimnasio } from "../../features/gimnasios/apis";
import { getUsers } from "../../features/profiles/apis";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cookies from "js-cookie";

function Gimnasio(){
    const {accessNew}=useContext(AuthContext);
    const redirect=useNavigate();
    const { id = null}=useParams();
    const [load,setLoad]=useState(true);
    const [users,setUsers]=useState();
    const [user,setUser]=useState(Cookies.get('user'));
    const[nombre,setNombre]=useState();
    const[direccion,setDireccion]=useState();
    const[horario,setHorario]=useState();
    const[tarifa,setTarifa]=useState();
    const[admin,setAdmin]=useState("1");
    const[error,setError]=useState();
    const [update,setUpdate]=useState(); /* indica modo edicion en vez de creaccion */
    const [isAdmin,setIsAdmin]=useState(false);
    

    useEffect(()=>{
        if (id===null){
            setUpdate(false);
            setIsAdmin(true);
        }else{
            setUpdate(true);
        };
    },[id]);

    const updateGim= async ()=>{
        try{
            await accessNew();
            await updateGimnasio(id,nombre,direccion,horario,tarifa,admin);
            redirect("/gimnasios/");    

        }catch(err){
            setError(err.response.data.detail);
        }
    }
    
    

    const registrarGim= async()=>{
        try{
            await accessNew();
            await createGimnasio(nombre,direccion,horario,tarifa,admin);
            redirect("/gimnasios/");    

        }catch(err){
            setError(err.response.data.detail);
        }
    }

    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                await accessNew();
                const response=await getUsers();
                setUsers(response.data);
                setLoad(false);    

            }catch(err){
                setError(err.response.data.detail);
            }
        }
        fetchUsers();
    },[])

    useEffect(()=>{
        const fetchGimnasio=async()=>{
            try{
                await accessNew();
                const response=await getGimnasio(id);
                setNombre(response.data.nombre);
                setHorario(response.data.horario);
                setTarifa(response.data.tarifa);
                setDireccion(response.data.direccion);
                setAdmin(response.data.admin);
                if (user==response.data.admin){
                    setIsAdmin(true);
                }

            }catch(err){
                setError(err.response.data.detail);
            }
        }
        if (id!==null){
            fetchGimnasio();
        }
    },[id])

    const deleteGim = async()=>{
        try{
                await accessNew();
                await deleteGimnasio(id);
                redirect("/gimnasios/"); 
                
            }catch(err){
                setError(err.response.data.detail);
            }
    }
    

    return(<>
    <Container>
        <h4>{ update ? nombre : " Crear gimnasio " }</h4>
        <Col xs="12">
         <FormControl className="mb-2" placeholder="Nombre ..." value={nombre} onChange={(e)=>setNombre(e.target.value)} disabled={!isAdmin}></FormControl>
        </Col>
        <Col xs="12">
         <FormControl className="mb-2" placeholder="Dirección ..." value={direccion} onChange={(e)=>setDireccion(e.target.value) } disabled={!isAdmin}></FormControl>
        </Col>
        <Col xs="12">
         <FormControl className="mb-2" placeholder="Horario ..." value={horario} onChange={(e)=>setHorario(e.target.value)} disabled={!isAdmin}></FormControl>
        </Col>
        <Col xs="12">
         <FormControl  type="number" className="mb-2" placeholder="Tarifa mensual..." value={tarifa} onChange={(e)=>setTarifa(e.target.value)} disabled={!isAdmin}></FormControl>
        </Col>

        <Col xs="12">
        <FormLabel>Administrador</FormLabel>
         {!load && <FormSelect className="mb-2" value={admin} onChange={(e)=>setAdmin(e.target.value)} disabled={!isAdmin}>
            {users.map((user)=>{
                return(<option value={user.id}>{user.username}</option>)
            })}
         </FormSelect>}
        </Col>
    {update && isAdmin ? <Button className="mb-2" onClick={()=>{updateGim()}}>Actualizar</Button> : isAdmin && <Button className="mb-2" onClick={()=>{registrarGim()}}>Guardar</Button>}

    { error && <Alert variant="danger">{{error}}</Alert>}
    {update && isAdmin && <Row className="mt-5 mb-1"><Button variant="danger" onClick={()=>deleteGim()}>Eliminar gimnasio <Icon className="ml-2" icon="ls:trash"></Icon></Button></Row>}
    </Container>
    </>);
}

export default Gimnasio;