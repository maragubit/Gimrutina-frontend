import { refreshToken } from "./features/login/apis";

export async function accessNew() {
   try {
    const response = await refreshToken();
    const newAccess = response.data.access;
    return newAccess;
    
  } catch (error) {
    console.error("Error al refrescar token:", error);
    return null; // importante devolver algo consistente
  }
}