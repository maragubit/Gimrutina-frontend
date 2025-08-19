import { Card, CardImg, CardText , Container, Row ,Col, Button, CardFooter} from "react-bootstrap";
import { useState,} from "react";
import SerieForm from "./SerieForm";

function DayExercises({day,exercises,entrenamiento , setEntrenamiento}){
    const domain=process.env.REACT_APP_API_DOMAIN;
    const [showForm,setShowForm]=useState(false);
    
    return(<>
    <p>Ejercicios</p>
    <Container >
        {showForm && <SerieForm exercise={showForm} setShowForm={setShowForm} entrenamiento={entrenamiento} setEntrenamiento={setEntrenamiento}/>}
       
        <Row>
        
    {exercises?.filter(ejercicio => ejercicio.day === day)
            .sort((a, b) => a.order - b.order).map((ejercicio)=>{
        return(<>
        
        <Col xs="6" lg="3">
        <Card className="mx-auto mb-2" onClick={()=>{setShowForm([ejercicio?.exercise_data.name, ejercicio?.exercise])}} style={{width:"150px", cursor:"pointer"}}>
            <CardText>{ejercicio.order}) {ejercicio?.exercise_data.name}</CardText>
            <CardImg src={`${domain}${ejercicio?.exercise_data.image}`}></CardImg>
            <CardFooter>({ejercicio.reps_max+'-'+ejercicio.reps_min}) X {ejercicio.series}</CardFooter>
        </Card>
        </Col>
        
        </>)
    })}</Row>
    
    {!exercises && <p>No hay ejercicios disponibles ...</p>}
    <br/>
    </Container></>);
}
export default DayExercises;