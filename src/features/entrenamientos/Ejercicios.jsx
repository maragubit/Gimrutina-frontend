import { Container,Row,Col, Card, CardText, CardImg, FormControl, CardFooter, FormSelect } from "react-bootstrap";
import { useState, useEffect } from "react";
import SerieForm from "./SerieForm";


function Ejercicios({exercises, entrenamiento, setEntrenamiento}){
    const [ejerciciosFiltered,setEjerciciosFiltered]=useState(exercises.filter(ejercicio=>ejercicio.gimnasio.id==entrenamiento.gimnasio.id))
    const [ejerciciosList,setEjerciciosList]=useState(exercises.filter(ejercicio=>ejercicio.gimnasio.id==entrenamiento.gimnasio.id))
    const [search,setSearch]=useState("");
    const domain=process.env.REACT_APP_API_DOMAIN;
    const [showForm,setShowForm]=useState(false);
    const [selected,setSelected]=useState("1");

    function filterExercises(option){
        setSelected(option);
        switch(option){
            case "1": // ejercicios de usuarios de mi gimnasio
                setEjerciciosList(exercises.filter(ejercicio=>ejercicio.gimnasio.id==entrenamiento.gimnasio.id));
                break;
            case "2": // mis ejercicios
                setEjerciciosList(exercises.filter(ejercicio=>ejercicio.user.id==entrenamiento.user.id));
                break;
            case "3": // favoritos
                break;
            case "4": // ejercicios publicos y de amigos
                setEjerciciosList(exercises);
                break;
            default:
                console.log("opcion no valida");
                break;
        }}

    useEffect(()=>{
        if(search){
            setEjerciciosFiltered(ejerciciosList.filter(ejercicio=>ejercicio.name.toLowerCase().includes((search).toLowerCase())||
       (ejercicio.muscle.toLowerCase().includes((search || '').toLowerCase()))));
        }
    },[search, ejerciciosList])
    return(<>
    <Container>
        {showForm && <SerieForm exercise={showForm} setShowForm={setShowForm} entrenamiento={entrenamiento} setEntrenamiento={setEntrenamiento}/>}
        <FormSelect className="mb-3" value={selected} onChange={(e)=>filterExercises(e.target.value)}>
            <option value="1">Ejercicios de usuarios de mi gimnasio</option>
            <option value="2">Mis ejercicios</option>
            <option value="3">Favoritos</option>
            <option value="3">Ejercicios públicos y de amigos</option>
        </FormSelect>
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