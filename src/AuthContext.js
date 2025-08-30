import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshToken } from "./features/login/apis";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [refresh, setRefresh] = useState(Cookies.get("refresh") || null);
  const [user, setUser] = useState(Cookies.get("user") || null);
  const navigate=useNavigate();

  const isAuthenticated = ()=>{
   
  }

 

  const [freshData,setFreshData]=useState(0);
  const triggerFreshData=()=>{setFreshData(prev=>prev+1);}

  const login = ({ refresh, user }) => {
    // Guarda en cookies con expiración
    Cookies.set("refresh", refresh, {  expires: 7});         // 7 días
    Cookies.set("user", user, {  expires: 7 });
    setRefresh(refresh);
    setUser(user);
    window.location.href = "/";
  };



  const logout = () => {
    Cookies.remove("refresh");
    Cookies.remove("user");

    setRefresh(null);
    setUser(null);
    window.location.href = "/";

  };

  const accessNew =() => {
    return null;
  };

  return (
    <AuthContext.Provider value={{freshData, triggerFreshData, accessNew, refresh, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
