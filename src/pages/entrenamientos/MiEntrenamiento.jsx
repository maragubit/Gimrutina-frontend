import { Alert, Button, Card, CardFooter, CardImg, CardText, Col, Container, FormControl, FormLabel, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../../AuthContext";
import { deleteEntrenamiento, getEntrenamiento, updateEntrenamiento } from "../../features/entrenamientos/apis";
import Cargando from "../../components/Cargando";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";

function MiEntrenamiento(){
/* GLOBALES */
const {id}=useParams();
const {accessNew}=useContext(AuthContext);

/* USESTATE */
const[entrenamiento,setEntrenamiento]=useState();
const[load,setLoad]=useState(true);
const[isOwner,setIsOwner]=useState(true);
const[error,setError]=useState();
const[ejercicios,setEjercicios]=useState();
const [date,setDate]=useState();
const [finished,setFinished]=useState();
const [mensaje,setMensaje]=useState();

/* FUNCTIONS */

const guardarEntrenamiento=async()=>{
    try{
        const data = new FormData();
        data.append("date", date);
        data.append("finished", finished);
        await accessNew();
        await updateEntrenamiento(entrenamiento.id,data);
        setMensaje("Ejercicio actualizado");
    }catch(err){
        setError(err.response.data.detail);
    }
}

const eliminarEntrenamiento=async()=>{
    try{
        await accessNew();
        await deleteEntrenamiento(entrenamiento.id);
        window.history.back();
    }catch(err){
        setError(err.response.data.detail);
    }
}

useEffect(()=>{
    async function fetchEntrenamiento(){
        try{
            await accessNew();
            const response=await getEntrenamiento(id);
            setEntrenamiento(response.data);
            setDate(format(new Date(response.data.date),"yyyy-MM-dd'T'HH:mm"));
            response.data.finished ? setFinished(format(new Date(response.data.finished),"yyyy-MM-dd'T'HH:mm")) : setFinished("");
            

            /* Crea un set donde mete todos los ejercicios sin repetir*/
            const ejercicios_name = [
            ...new Map(response.data.series.map(serie => [serie.exercise.name, serie.exercise])).values()
            ];
            setEjercicios(ejercicios_name);
           

            setLoad(false);
            if(Cookies.get('user')==response.data.user){
                setIsOwner(true);
            }else{
                setIsOwner(false);
            }
           

        }catch(err){
            setError(err.response.data.detail);
        }
    }
    fetchEntrenamiento();
},[id])

return(<>
<Container>
    {load ? <Cargando/> : isOwner ?
    <>{/* si ya se han cargado los datos se renderiza todo esto */}
    <h4>Mi entrenamiento del {format(entrenamiento?.date,"dd/MM/yyyy")}</h4>
    {!finished && <span>(Sin finalizar)</span>}
    

    <Row className="mt-3">
        <Col xs="6">
            <FormLabel>Comenzado</FormLabel>
        </Col>
        <Col xs="6">
            <FormLabel>Finalizado</FormLabel>
        </Col>
    </Row>

     <Row className="mb-2">
        <Col xs="6">
            <FormControl type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)}/>
        </Col>
        <Col xs="6">
            <FormControl type="datetime-local" value={finished} onChange={(e)=>setFinished(e.target.value)}/>
        </Col>
    </Row>

    <Row>
        {ejercicios && ejercicios.map((ejercicio)=>{
            return(<Col xs="6" lg="3">
                <Card>
                    <CardText>{ejercicio.name}</CardText>
                    <CardImg src={ejercicio.image}></CardImg>
                    <CardFooter className="bg-dark text-white"><ol>{entrenamiento.series.filter(serie =>serie.exercise.name===ejercicio.name).map((serie=>{return(
                        <li><a href={`/profile/series/${serie.id}`}>{serie.weight}kg x {serie.reps}</a></li>
                        )}))}</ol></CardFooter>
                </Card>
            </Col>);
        })}
    </Row>
    {mensaje && <Alert className="mt-2" variant="success">{mensaje}</Alert>}
    <Button className="mt-2 mb-5" onClick={()=>guardarEntrenamiento()}>Guardar cambios</Button><br/>
        <span>Para poder añadir series nuevas, deja la fecha finalizado en blanco y recupera ese entrenamiento en <a href="/entrenamientos/create">entrenar</a></span>
    <Button className="mt-5 mb-2 form-control" onClick={()=>eliminarEntrenamiento()} variant="danger">Eliminar entrenamiento <Icon className="ml-3" icon="gg:trash" /></Button> 
    
    

    
    
    </> : <p>Recurso no  autorizado</p>}
{error && <Alert variant="danger">{error}</Alert>}

</Container>
</>);
}
export default MiEntrenamiento;