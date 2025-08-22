import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshToken } from "./features/login/apis";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(Cookies.get("access") || null);
  const [refresh, setRefresh] = useState(Cookies.get("refresh") || null);
  const [user, setUser] = useState(Cookies.get("user") || null);
  const [isAuth, setIsAuth] = useState(false);
  const navigate=useNavigate();

  const isAuthenticated = async()=>{
    if(Cookies.get("refresh")){
      try{
        await refreshToken();
        setIsAuth(true);
        return true;

      }catch(error){
        logout();
        return false
      }
    }
    return false;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated(); // tu función async
      setIsAuth(result);
    };
    checkAuth();
  }, []);

  const [freshData,setFreshData]=useState(0);
  const triggerFreshData=()=>{setFreshData(prev=>prev+1);}

  const login = ({ access, refresh, user }) => {
    // Guarda en cookies con expiración
    Cookies.set("access", access, {  maxAge:"300" }); // 5 minutos
    Cookies.set("refresh", refresh, {  maxAge:"604800"});         // 7 días
    Cookies.set("user", user, {  maxAge:"604800" });

    setAccess(access);
    setRefresh(refresh);
    setUser(user);
    setIsAuth(true);
  };



  const logout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("user");

    setAccess(null);
    setRefresh(null);
    setUser(null);
    setIsAuth(false);
    navigate("/");

  };

  const accessNew = async () => {
    try {
      const response = await refreshToken();
      const newAccess = response.data.access;

      Cookies.set("access", newAccess, { maxAge:"300"}); // 5 minutos
      setAccess(newAccess);
    } catch (error) {
      console.error("Error al refrescar token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ access, freshData, triggerFreshData, accessNew, refresh, user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
