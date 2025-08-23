import { Form, Button, Alert, Container } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import {register,getToken} from '../features/login/apis'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import {useGoogleReCaptcha } from "react-google-recaptcha-v3";

function Register(){
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const redirect=useNavigate();
  const{login}=useContext(AuthContext);
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }else{
        if (!executeRecaptcha) {
        setError("reCAPTCHA aún no está listo");
        return;
        }
        try{
            const token = await executeRecaptcha();
            await register(email,password,token);
            const token2 = await executeRecaptcha();
            const response2 = await getToken(email, password,token2);
            login({
              refresh: response2.data.refresh,
              user: response2.data.user
          });
            redirect("/");
        }
        catch(err){
            setError(err.response.data.detail);
        }
    }


  } 
    return(
        <>
        <Container className='mb-3'>
            <h3>Registro de Usuario</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduce tu contraseña"
             title="Debe tener al menos 6 caracteres, incluir letras y números."
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Repite la contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value); setError(null)}}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" className="w-100">
          Registrarse
        </Button>
      </Form>
        </Container>

        </>
    );
}
export default Register;