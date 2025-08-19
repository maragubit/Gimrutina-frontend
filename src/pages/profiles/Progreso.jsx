import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../AuthContext";
import { Container, Card, Button, Row, CardTitle, Col, CardImg, CardText, CardFooter, Carousel, FormControl, FormLabel } from "react-bootstrap";
import {getMisEntrenamientos} from "../../features/entrenamientos/apis"
import GraficaProgreso from "../../features/profiles/GraficaProgreso";


function Progreso(){

const {accessNew}=useContext(AuthContext);


/* USESTATE */
const [loadData,setLoadData]=useState(true);
const [error,setError]=useState();
const [allEntrenamientos,setAllEntrenamientos]=useState()
const [entrenamientos,setEntrenamientos]=useState(); //entrenamientos realizados
const [ejercicios,setEjercicios]=useState();
const[desde,setDesde]=useState(() => {
  const d = new Date();
  d.setMonth(d.getMonth() - 6); // restar 2 meses
  return d.toISOString().split("T")[0];
});
const[hasta,setHasta]=useState(() => {
  const d = new Date();
  d.setDate(d.getDate() + 1); // restar 2 meses
  return d.toISOString().split("T")[0];
});
const maxDateRef = useRef(hasta);
const maxDate=maxDateRef.current;
const [search,setSearch]=useState("");



/* USE-EFFECT */


//Fetch entrenamientos
useEffect(()=>{
    async function fetchEntrenamientos(){
        try{
            await accessNew();
            const response= await getMisEntrenamientos();
            setAllEntrenamientos(response.data);
            setLoadData(false);

        }catch(err){
            setError(err.response.data.detail)
        }
    }
    fetchEntrenamientos();
},[]);

useEffect(()=>{ //Cra lista de ejercicios filtrando entrenamientos por fecha y ejercicios por nombre
    const fechaDesde = new Date(desde);
    const fechaHasta = new Date (hasta);
    const newEntrenamientos= allEntrenamientos?.filter(entrenamiento=>{
        const entrenamientoDate = new Date(entrenamiento.date);
        return (entrenamientoDate >= fechaDesde && entrenamientoDate <= fechaHasta)
    })
    console.log(newEntrenamientos)
    setEntrenamientos(newEntrenamientos);
    //tenemos entrenamientos filtrados por fecha
    const ejerciciosMap = new Map();
    newEntrenamientos?.forEach(entrenamiento => { // a partir de entrenamientos filtrados, creamos array de ejercicios entrenados
            entrenamiento.series.forEach(serie => {
                const ejercicio = serie.exercise;
                ejerciciosMap.set(ejercicio.id, ejercicio); // id como clave → evita duplicados
            });
    });
    
    // Convertimos en array
    const ejerciciosUnicos = [...ejerciciosMap.values()];
    setEjercicios(ejerciciosUnicos.filter(ejercicio => ejercicio.name.toLowerCase().includes(search.toLowerCase())));

},[desde,hasta,allEntrenamientos,search]);


function dataGraficaProgreso(ejercicio_id,number){
    const resultado = entrenamientos?.flatMap((entrenamiento) =>
    entrenamiento.series.filter(
    (serie) => serie.exercise.id === ejercicio_id && serie.number==number
    )
    );
    return resultado;
}
function seriesTotalesEjercicio(ejercicio_id){
    const seriesEjercicio = entrenamientos?.flatMap((entrenamiento) =>
    entrenamiento.series.filter(
    (serie) => serie.exercise.id === ejercicio_id
    )
    );
    const totales=(seriesEjercicio.map((serie)=>serie.number)).sort()
    return(totales[totales.length-1]);

}






/* RETURN */
    return(<><Container>
        <h4>Entrenamientos realizados:</h4>
       <Row>
        <Col xs="6">
        <FormLabel>desde:</FormLabel>
        <FormControl onChange={(e)=>setDesde(e.target.value)} value={desde} type="date"/>
        </Col>
        <Col xs="6">
        <FormLabel>hasta:</FormLabel>
        <FormControl onChange={(e)=>setHasta(e.target.value)} value={hasta} max={maxDate} type="date"/>
        </Col>
       </Row>
       <FormControl className="mt-4" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="nombre ejercicio ..."/>
        <Row className="mt-3">
        
        {!loadData && ejercicios?.map((ejercicio)=>

        /* CADA EJERCICIO */
        <Col xs="12" lg="6">
        <Card className="mb-2">
            <CardText>{ejercicio.name}</CardText>
            <CardImg src={ejercicio.image}/>
            <CardFooter>
            <Carousel interval={null}>
                {new Array(seriesTotalesEjercicio(ejercicio.id)).fill(null).map((serie,index)=>{return(
                    <Carousel.Item>
                    
                    <h5>Serie {index+1}</h5>
                    
                        
                    <GraficaProgreso data={dataGraficaProgreso(ejercicio.id,index+1)}/>
                        
                    </Carousel.Item>
                );})}
                
                    
            </Carousel>
                
            </CardFooter>
        </Card>
        </Col>
        )}

        </Row>
        </Container></>);
}
export default Progreso;