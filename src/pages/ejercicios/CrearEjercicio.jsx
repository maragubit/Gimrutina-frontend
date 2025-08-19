import EjercicioForm from '../../features/ejercicios/EjercicioForm';
import axios from 'axios';
import { createEjercicio } from '../../features/ejercicios/apis';
import { useContext, useState } from 'react';
import {AuthContext} from "../../AuthContext"
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function CrearEjercicio() {
 const redirect=useNavigate();
  const[error,setError]=useState();
  const {accessNew}=useContext(AuthContext);
  const handleFormSubmit = async (data) => {
    
    try {
      await accessNew();    
      await createEjercicio(data);
      redirect("/ejercicios/")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Nuevo Ejercicio</h2>
      <EjercicioForm onSubmit={handleFormSubmit} />
      <br/>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
    
  );
}
export default CrearEjercicio;