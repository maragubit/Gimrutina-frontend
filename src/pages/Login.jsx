import { Container,Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { getToken } from "../features/login/apis";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import GoogleLoginButton from "../features/login/GoogleLoginButton";
import {useGoogleReCaptcha } from "react-google-recaptcha-v3";

function Login(){
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState("");
    const home=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!executeRecaptcha) {
        setError("reCAPTCHA aún no está listo");
        return;
        }
        try {
            const token = await executeRecaptcha();
            const response = await getToken(email, password, token);
            login({
              refresh: response.data.refresh,
              user: response.data.user
          });
        }   
        catch (error) {
            setError("Error al iniciar sesión, email o contraseña incorrecta", error);
            }
        
    }

    
    return(<>
    
    <Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          No compartiremos nunca el email con nadie.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <p>si aún no está registrado, regístrese <Link to="/register">aquí</Link></p>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
    <div className="mb-3"></div>
    <GoogleLoginButton/>
    </Container>
    <br/>
    <p style={{color:"red"}}>{error}</p>
    </>);
}
export default Login;