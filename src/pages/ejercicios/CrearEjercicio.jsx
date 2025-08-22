import EjercicioForm from '../../features/ejercicios/EjercicioForm';
import { createEjercicio } from '../../features/ejercicios/apis';
import { useContext, useState } from 'react';
import {AuthContext} from "../../AuthContext"
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import {useGoogleReCaptcha } from "react-google-recaptcha-v3";


function CrearEjercicio() {
  const redirect=useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const[error,setError]=useState();
  const {accessNew}=useContext(AuthContext);
  const handleFormSubmit = async (data) => {
    
    try {
      if (!executeRecaptcha) {
      setError("reCAPTCHA aún no está listo");
      return;
      }
      const token = await executeRecaptcha();
      data.append('recaptcha_token', token);
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