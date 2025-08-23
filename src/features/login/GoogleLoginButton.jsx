import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate} from "react-router-dom";
const api = axios.create({
  baseURL: "https://gimrutina.pythonanywhere.com/",
});


export default function GoogleLoginButton({ onAuth }) {
  const {login}=useContext(AuthContext);


  const handleSuccess = async (credentialResponse) => {
  try {
    const { credential } = credentialResponse; // ID token
    const { data } = await api.post("/api/auth/google/", { credential });
    onAuth?.(data);
    login({
              refresh: data.refresh,
              user: data.user.id
          });
    window.location.href = "https://gimrutina.netlify.app";
  } catch (e) {
    console.error(e);
    alert("Error al iniciar sesión con Google");
  }
  };

  return (
    <GoogleOAuthProvider clientId="978332619855-v05svooqc8vu6attpt2nljqjhe58mfae.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Falló Google Login")} />
    </GoogleOAuthProvider>
  );
  }