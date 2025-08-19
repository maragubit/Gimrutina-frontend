import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Card, CardImg } from 'react-bootstrap';

function EjercicioForm({ onSubmit,ejercicio,update }) {
  const [formData, setFormData] = useState({
    name: '',
    muscle: '',
    description: '',
    image: null,
    private: true,
  });
   useEffect(() => { //buenas prácticas por si se renderiza más tarde
    if (ejercicio) {
      setFormData({
        name: ejercicio.name || '',
        muscle: ejercicio.muscle || '',
        description: ejercicio.description || '',
        image: null, // por seguridad no se precarga imagenes
        private: ejercicio.private,
      });
    }
  }, [ejercicio]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('muscle', formData.muscle);
    data.append('description', formData.description);
    data.append('private', formData.private);
    if (formData.image) {
      data.append('image', formData.image);
    }
    onSubmit(data);
  };
  const isOwner=()=>{
    if(ejercicio?.user?.id==Cookies.get('user')){
      return true;
    }else if (ejercicio){
      return false;
    }else{
      return true;
    }
  };
  const button=()=>{ if (ejercicio && ejercicio.user.id==Cookies.get('user')){
    return(<Button variant="primary" type="submit">
      Actualizar
      </Button>);
  }else if(ejercicio){
    return(<></>);
  }else{
    return(<Button variant="primary" type="submit">
      Guardar
      </Button>);
  }

  }; 

  return (
    <Container>
      {update && <Card style={{ maxWidth:"350px"}} className='mx-auto'>
        <CardImg src={ejercicio?.image}></CardImg>
        </Card>}
    <Form className="form-control bg-dark" style={{color:"white"}} onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nombre del ejercicio</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!isOwner()}
          required
        />
      </Form.Group>

      <Form.Group controlId="muscle">
        <Form.Label>Músculo trabajado</Form.Label>
        <Form.Control
          type="text"
          name="muscle"
          value={formData.muscle}
          onChange={handleChange}
          readOnly={!isOwner()}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          readOnly={!isOwner()}
          onChange={handleChange}
        />
      </Form.Group>

      {isOwner() && <Form.Group controlId="image">
        <Form.Label>Imagen</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </Form.Group>}

      <Form.Group controlId="private">
        <Form.Check
          type="switch"
          name="private"
          label="Ejercicio privado"
          checked={formData.private}
          onChange={handleChange}
        />
      </Form.Group>

      {button()}
    </Form>
    </Container>
  );
}

export default EjercicioForm;