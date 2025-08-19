import { Container,Row,Col, Card, CardText, CardImg, FormControl, CardFooter } from "react-bootstrap";
import { useState, useEffect } from "react";
import SerieForm from "./SerieForm";


function Ejercicios({exercises, entrenamiento, setEntrenamiento}){
    const [ejerciciosFiltered,setEjerciciosFiltered]=useState(exercises)
    const [search,setSearch]=useState("");
     const domain=process.env.REACT_APP_API_DOMAIN;
    const [showForm,setShowForm]=useState(false);

    useEffect(()=>{
        if(search){
            setEjerciciosFiltered(exercises.filter(ejercicio=>ejercicio.name.toLowerCase().includes((search).toLowerCase())||
       (ejercicio.muscle.toLowerCase().includes((search || '').toLowerCase()))));
        }
    },[search])
    return(<>
    <Container>
        {showForm && <SerieForm exercise={showForm} setShowForm={setShowForm} entrenamiento={entrenamiento} setEntrenamiento={setEntrenamiento}/>}

        <FormControl className="mb-3"
        placeholder="buscar ejercicios..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        ></FormControl>
        <Row>
        {ejerciciosFiltered?.map((ejercicio)=>
            (
            <Col xs="6" lg="3">
            <Card className="mx-auto mb-2" onClick={()=>{setShowForm([ejercicio?.name, ejercicio?.id])}} style={{width:"150px", cursor:"pointer"}}>
                <CardText>{ejercicio.name}</CardText>
                <CardImg src={ejercicio.image} style={{minWidth:"80px"}}></CardImg>
                <CardFooter>{ejercicio.muscle}</CardFooter>
            </Card>
            </Col>
            )
        )}
        </Row>
    </Container>
    </>);
}

export default Ejercicios