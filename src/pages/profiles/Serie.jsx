import { useParams } from "react-router-dom"
import { useState,useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { deleteSerie, getSerie, updateSerie } from "../../features/entrenamientos/apis";
import Cargando from "../../components/Cargando";
import { Row,Container,Form,Col,FormGroup,FormControl, FormLabel, Button, Card, CardImg, CardFooter } from "react-bootstrap";
import Cookies from "js-cookie";

function Serie(){
    const domain=process.env.REACT_APP_API_DOMAIN;
    const {id}=useParams();
    const {accessNew}=useContext(AuthContext);
    const [serie,setSerie]=useState();
    const [load,SetLoad]=useState(true);
    const[isOwner,setIsOwner]=useState();
    const [error,setError]=useState();
    const [formData,setFormData]=useState({
    'weight':'',
    'reps':'',
    'failure':false

    });

    const actualizaSerie=async()=>{
        try{
            await accessNew();
            await updateSerie(id,formData.weight,formData.reps,formData.failure);
            window.history.back();
        }catch(err){
            setError(err.response.data.detail);
        }
    }
    
    const borrarSerie=async()=>{
        try{
            await accessNew();
            await deleteSerie(id);
            window.history.back();
        }catch(err){
            setError(err.response.data.detail);
        }
    }

    useEffect(()=>{
        async function fetchSerie(){
            try{
                await accessNew();
                const response = await getSerie(id);
                setSerie(response.data);
                setFormData({
                formData,
                weight: response.data.weight,
                reps: response.data.reps,
                failure: response.data.failure
                });
                if (Cookies.get('user')==response.data.entrenamiento.user){
                    setIsOwner(true);
                }else{
                    setIsOwner(false);
                }
                SetLoad(false)
                
                
            }catch(err){
                setError(err.response.data.detail);
            }

        }
        fetchSerie()
    },[id])
    return (<>
    {load ? <Cargando/> :
    
    <Container>
        
        
                    {isOwner ? <div>
                    <Card className="mx-auto" style={{maxWidth:"450px"}}>
                        <CardImg src={`${domain}${serie.exercise.image}`}/>
                        <CardFooter>{serie.exercise.name}</CardFooter>
                    </Card>
                    <br/>
                    <Row><Col xs="6"><FormLabel>Peso (kg) / distancia (km)</FormLabel></Col>
                    <Col xs="6"><FormLabel>Repeticiones / tiempo</FormLabel></Col>
                    </Row>
                    <Row>
                    <Col xs="6">
                    <FormControl className="mb-2"
                    placeholder="peso (kg) / distancia recorrida (km)"
                    type="number"
                    value={formData.weight}
                    onChange={(e)=>(setFormData({...formData,weight:e.target.value}))}
                    /></Col>
                    <Col xs="6">
                    <FormControl className="mb-2"
                    placeholder="repeticiones / tiempo (min)"
                    type="number"
                    value={formData.reps}
                    onChange={(e)=>(setFormData({...formData,reps:e.target.value}))}
                    />
                    </Col>
                    </Row>
                    
                    
                    <Col xs="12">
                    <FormLabel className="d-inline mr-3" style={{fontSize:"20px"}}>Fallo muscular</FormLabel>
                    <Form.Switch style={{fontSize:"20px"}} className="d-inline"
                    checked={formData.failure}
                    onChange={(e)=>(setFormData({...formData,failure:!formData.failure}))}
                    />
                    </Col>
                    <Button className="mt-5 form-control mb-3" onClick={()=>{actualizaSerie()}} variant="primary">Guardar cambios</Button>

                    <Button className="mt-5 form-control mb-3" onClick={()=>borrarSerie()} variant="danger">Eliminar serie</Button>
                    </div> : "Este recurso no te pertenece, lo siento"}
                    
                    
                </Container>
    }
    </>)
}
export default Serie;