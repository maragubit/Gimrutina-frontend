import { Form, FormGroup, Card, CardImg,Modal, Button, Container, FormControl, Row, Col, FormCheck, FormLabel } from "react-bootstrap";
import { useState, useRef ,useEffect, useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthContext } from "../../AuthContext";
import { createSerie, getEntrenamiento } from "./apis";
function SerieForm({exercise, setShowForm, entrenamiento, setEntrenamiento}){
    const {accessNew}=useContext(AuthContext);
    const [error,setError]=useState();
    const [serie,setSerie]=useState()

    const daynow = () => {
        const today = new Date();
        
        return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
        };
   
    const [formData,setFormData]=useState({
    'entrenamiento':entrenamiento.id,
    'weight':'',
    'exercise':exercise[1],
    'date': daynow(),
    'reps':'',
    'failure':false

    });
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' }); // o 'auto'
        }
    }, []);

    const submitForm=async()=>{
        await accessNew();
        try{
            const response=await createSerie(formData);
            setSerie(response.data);
            const response2=await getEntrenamiento(entrenamiento.id);
            setEntrenamiento(response2.data);
            setShowForm(false);

        }catch(err){
            setError(err.detail);
        }
        
    }
    
   
    

    return(<>
    
    
    
    <Container style={{color:"white"}} className="bg-dark mt-3 mb-3 pt-2" ref={ref}>
    <h5>Añadir serie de {exercise[0]} <Icon style={{cursor:"pointer"}} onClick={()=>setShowForm(false)} className="float-end"color="red" icon="solar:close-square-bold" /></h5>
    <Form>
        <FormGroup>
            <Row>
                <Col xs="12">
                <FormControl className="mb-2"
                placeholder="peso (kg) / distancia recorrida (km)"
                type="number"
                value={formData.weight}
                onChange={(e)=>(setFormData({...formData,weight:e.target.value}))}
                /></Col>
                <Col xs="12">
                <FormControl className="mb-2"
                placeholder="repeticiones / tiempo (min)"
                type="number"
                value={formData.reps}
                onChange={(e)=>(setFormData({...formData,reps:e.target.value}))}
                />
                </Col>
                
                
                <Col xs="12">
                <FormLabel className="d-inline mr-3" style={{fontSize:"20px"}}>Fallo muscular</FormLabel>
                <Form.Switch style={{fontSize:"20px"}} className="d-inline"
                checked={formData.failure}
                onChange={(e)=>(setFormData({...formData,failure:!formData.failure}))}
                />
                </Col>



                
                
            </Row>
            
        </FormGroup>

    </Form>
    <Button variant="primary" className="mb-3 mt-3" onClick={()=>submitForm()}>
            Guardar
        </Button>
    </Container>
    
   
    </>)
}
export default SerieForm;