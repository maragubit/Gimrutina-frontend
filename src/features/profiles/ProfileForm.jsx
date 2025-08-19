import { Alert, Button, Col, Container, Form, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { updateProfile } from "./apis";
import { AuthContext } from "../../AuthContext";

function ProfileForm({profile, setProfile, gimnasios}){
const {accessNew}=useContext(AuthContext);
const [name,setName]=useState(profile.nombre);
const [peso,setPeso]=useState(profile.peso);
const [altura,setAltura]=useState(profile.altura);
const [image, setImage] = useState(null);
const[gimnasio,setGimnasio]=useState(profile.gimnasio);
const [error,setError]=useState();
const [gimnasiosFiltered,setGimnasiosFiltered]=useState(gimnasios);
const [search,setSearch]=useState("");


const guardarCambios=async ()=>{
    const data = new FormData();
    data.append('name', name);
    data.append('peso', peso);
    data.append('altura', altura);
    data.append('peso', peso);
    data.append('gimnasio', parseInt(gimnasio,10));
    if (image) {
    data.append('image', image);
    }
    try {
        await accessNew();
        const response= await updateProfile(profile.id,data);
        setProfile(response.data);
        window.location.reload();
    }catch(err){
        setError(err.response.data.detail);
    }

}

useEffect(()=>{
    setGimnasiosFiltered(gimnasios.filter(gimnasio=>gimnasio.nombre.toLowerCase().includes(search.toLowerCase())))
},[search])

    return(<>
    <Container>
        <Form>
            <Row>
                <Col xs="12" className="mb-2">
                    <FormControl
                    placeholder="nombre completo..."
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </Col>
                
            </Row>
            <Row>
                <Col xs="6">
                    <FormLabel>Peso (kg):</FormLabel>
                    <FormControl 
                    placeholder="peso (kg)..."
                    value={peso}
                    onChange={(e)=>setPeso(e.target.value)}
                    />

                    
                </Col>
                <Col xs="6">
                    <FormLabel>Altura (cm):</FormLabel>
                    <FormControl 
                    placeholder="estatura (cm)..."
                    value={altura}
                    onChange={(e)=>setAltura(e.target.value)}
                    />

                    
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs="12">
                <FormLabel >Mi gimnasio:</FormLabel>
                <FormControl className="mb-1" placeholder="Buscar gimnasio ..." value={search} onChange={(e)=>{setSearch(e.target.value)}}></FormControl>
                <FormSelect value={gimnasio} onChange={(e)=>{setGimnasio(e.target.value)}}><option value={null}>Ninguno</option>{gimnasiosFiltered.map((gimnasio)=>{return(<option value={gimnasio.id}>{gimnasio.nombre}</option>)})}</FormSelect>
                
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs="12">
                <FormLabel>Mi imagen de perfil:</FormLabel>
                <input type="file" accept="image/png, image/jpeg" name="imagen" onChange={(e) => setImage(e.target.files[0])}/>
                </Col>
            </Row>
        </Form>

        <Button onClick={()=>{guardarCambios()}} className="mt-2">Guardar cambios</Button>
        {error && <Alert>{error}</Alert>}
    </Container>
    
    </>);
}

export default ProfileForm;