import { Button, Container,Form} from "react-bootstrap";
import { useState,useContext } from "react";
import { createRutina } from "../../features/rutinas/apis";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";


function Rutina(){
    const navegador = useNavigate();
    const {accessNew}= useContext(AuthContext);
    const [name,setName]=useState(null)
    const [isPrivate,setPrivada]=useState(true);
    const [error,setError]=useState("");

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            accessNew();
            const response= await createRutina(name,isPrivate);
            const id=response.data.id;
            navegador(`/rutinas/rutina/${id}/`)
        }
        catch{
            setError("Error al enviar los datos, inicie sesión nuevamente.");
        }

    }

    return(<>
    <Container>
        <h4>Crear rutina</h4>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
        <input className="form-group" type="text" name="name" placeholder="nombre de la rutina ..." value={name} onChange={(e)=>setName(e.target.value)}></input>
        <br/>
        <Form.Switch className="d-inline ml-4" id="privada"  name="privada" label="privada" value={isPrivate} checked={isPrivate} onChange={(e)=>setPrivada(e.target.checked)}></Form.Switch>
        <br/>
        <br/>
        <Button variant="primary" style={{backgroundColor:"#a4af06", borderColor:"black"}} type="submit">Añadir ejercicios</Button>
        </Form.Group>
        </Form>
        <br/>
        <p style={{color:"red"}}>{error}</p>
    </Container>
    </>);
}
export default Rutina;