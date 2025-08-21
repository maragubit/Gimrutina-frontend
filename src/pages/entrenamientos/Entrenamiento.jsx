import { Button, Col, Container, FormSelect, Nav, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import Cronometro from "../../features/entrenamientos/Cronometro";
import DayExercises from "../../features/entrenamientos/DayExercises";
import { AuthContext } from "../../AuthContext";
import { createEntrenamiento, getAllEntrenamientosSinFinalizar, getEntrenamiento, updateEntrenamiento } from "../../features/entrenamientos/apis";
import { getAllEjercicios } from "../../features/ejercicios/apis";
import { rutinaActual } from "../../features/rutinas/apis";
import Ejercicios from "../../features/entrenamientos/Ejercicios";
import Series from "../../features/entrenamientos/Series";
import Recuperar from "../../features/entrenamientos/Recuperar";
import { Link } from "react-router-dom";


function Entrenamiento(){
    const {accessNew}=useContext(AuthContext)
    
    const [selectedDay,setSelectedDay]=useState('monday')
    const [exercisesRutina,setExercisesRutina]=useState();
    const [start,setStart]=useState(false);
    const [error,setError]=useState(null);
    const [entrenamiento,setEntrenamiento]=useState();
    const [load,setload]=useState(true);
    const [entrenamientos,setEntrenamientos]=useState();
    const [exercises,setExercises]=useState();
    const [showEntrenar,setShowEntrenar]=useState(true);
    const [otrosEjercicios,setOtrosEjercicios]=useState(false);
    const [activeKey,setActiveKey]=useState('entrenar');
   
    
    
    const startTrainnig=async (id)=>{
        setStart(true);
        await accessNew();
        if (id===null){
           try{
            const today = new Date();
            const response=await createEntrenamiento(today);
            setEntrenamiento(response.data);
            setload(false);
            }catch(err){
                setError(error.detail);
            } 
        }else{
            try{
            
            const response=await getEntrenamiento(id);
            setEntrenamiento(response.data);
            setload(false);
            setShowEntrenar(true);
            }catch(err){
                setError(err.detail);
            } 
        }
        
    }

    
    useEffect(()=> {
        async function fetchExercisesRutina(){
            try{
                await accessNew();
                const response=await rutinaActual()
                setExercisesRutina(response.data.ejercicios);
                const response2=await getAllEjercicios();
                setExercises(response2.data);
                const response3=await getAllEntrenamientosSinFinalizar();
                setEntrenamientos(response3.data);
                
            }catch(err){
                setError(err.detail);
            }
        }
        fetchExercisesRutina();
    },[])
    const finishTrainning=async ()=>{
        setStart(false);
        const formData = new FormData();
        // Obtener la fecha y hora actual en formato ISO sin zona horaria (para datetime-local)
        const now = new Date();
        const datetimeLocal = now.toISOString(); // "YYYY-MM-DDTHH:mm"
        formData.append('finished', datetimeLocal);
        try{
            const response = await updateEntrenamiento(entrenamiento.id,formData);
            const response2=await getAllEntrenamientosSinFinalizar();
            setEntrenamientos(response2.data);
        }catch (err){
            setError(err.details);
        }


    }
    useEffect(()=>{
        showEntrenar ? setActiveKey('entrenar') : setActiveKey('recuperar');
    },[showEntrenar])
    
    return(<>
        <Container style={{width:"95%"}} maxWidth={false}>
        <Row>
        <Col xs="12" className="bg-dark mb-5">
        <Nav className="entrenamiento" activeKey={activeKey} style={{backgroundColor: '#212529', color:"white" , padding: '1rem' }}>
            <Nav.Link eventKey="entrenar" onClick={()=>setShowEntrenar(!showEntrenar)}>Entrenar</Nav.Link>
            <Nav.Link eventKey="recuperar" onClick={()=>setShowEntrenar(!showEntrenar)}>Recuperar entrenamiento</Nav.Link>
            <Nav.Link as={Link} to="/profile/mis-entrenamientos">Mis entrenamientos</Nav.Link>

        </Nav>
        </Col>
        {!showEntrenar && <Recuperar entrenamientos={entrenamientos} startTraining={startTrainnig} setEntrenamiento={setEntrenamiento} setError={setError} setload={setload} setShowEntrenar={setShowEntrenar}/>}
        {showEntrenar && <Col xs="12" lg="9" className="mx-auto">
        <h3>Entrenamiento</h3>
        {!start&&<Button className="mb-5 mt-3" onClick={()=>startTrainnig(null)}>Comenzar entrenamiento</Button>}
        {start&&<Button variant="danger"className="mb-5 mt-3" onClick={()=>finishTrainning()}>Finalizar entrenamiento</Button>}
        {start && !load && <Cronometro date={entrenamiento?.date}/>}
        <br/>
        {start && <Series series={entrenamiento?.series} startTraining={startTrainnig} entrenamiento_id={entrenamiento?.id}/>}
        {start && !otrosEjercicios && <><h5>Rutina actual:
        <FormSelect className="mt-3" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option value={"monday"}>lunes</option>
            <option value={"tuesday"}>martes</option>
            <option value={"wednesday"}>miércoles</option>
            <option value={"thursday"}>Jueves</option>
            <option value={"friday"}>Viernes</option>
            <option value={"saturday"}>Sábado</option>
            <option value={"sunday"}>Domingo</option>
        </FormSelect></h5>
        <DayExercises exercises={exercisesRutina} day={selectedDay} entrenamiento={entrenamiento} setEntrenamiento={setEntrenamiento}/>
        <br/>
        </>}        
        {start && <Button className="mb-3" onClick={()=>setOtrosEjercicios(prev =>!prev)}>{otrosEjercicios ? 'Añadir ejercicio de rutina':'añadir otro ejercicio'}</Button>}
        {start && otrosEjercicios && <Ejercicios exercises={exercises} entrenamiento={entrenamiento} setEntrenamiento={setEntrenamiento}/>}
        
        {error && <Alert>{error}</Alert>}
        
        </Col>}
        </Row>
        </Container>
    
    </>);
}

export default Entrenamiento;