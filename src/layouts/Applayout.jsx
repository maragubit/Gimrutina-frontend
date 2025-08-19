import Navegador from "../components/Navegador";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Applayout(){
    return (
    <>
      <Navegador />
      <Outlet />   {/* Aquí se insertan las páginas según la ruta */}
      <Footer />
    </>
  );
}
export default Applayout