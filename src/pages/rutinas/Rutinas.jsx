import { Table, Container, Button, FormControl, FormText } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { crearRutinaActual, getAllRutinas,getRutinaActual,rutinaActual} from "../../features/rutinas/apis"; 
import { AuthContext } from "../../AuthContext";
import DataTable from "react-data-table-component";
import darkThemeStyles from "../../assets/js/darkTheme";
import { Icon } from "@iconify/react/dist/iconify.js";






function Rutinas(){
    
    const nav=useNavigate();
    const columns=[
      {name:'Nombre', sortable: true, cell: row=>(<a href={`rutinas/rutina/${row.id}/`}>{row.name}</a>)},
      {name:'Autor',selector: row => row.user.username,sortable: true,},
      {name: 'Actual',selector: row => row.id === rutina_actual.rutina ? <Icon icon="formkit:circle" style={{ color: "#a4af06" }} /> : <Icon onClick={()=>marcarActual(row.id)} style={{cursor:"pointer"}} icon="tdesign:circle" />,sortable: true,},
      {name:'Dias',selector: row => row.total_dias,sortable: true,}
      
    ];
    const {accessNew}= useContext(AuthContext);
    const[rutinas,setRutinas]= useState(null);
    const[rutina_actual,setRutinaActual]=useState();
    const [loadData,setLoadData]=useState(true);
    const [filteredRutinas,setFilteredRutinas]=useState(null);
    const [search,setSearch]=useState("");

    const marcarActual=async (id)=>{
        try{
          await accessNew();
          const response = await crearRutinaActual(id);
          setRutinaActual(response.data);

        }catch(err){
          console.log(err);
        }
    }
    useEffect( ()=>{
      async function fetchRutinas(){
        try {
          await accessNew();
          const response = await getAllRutinas();
          setRutinas(response.data);
          setFilteredRutinas(response.data);
          const response2 = await getRutinaActual();
          setRutinaActual(response2.data);
          setLoadData(false);
        } 
        catch (error) {
          console.error("Error fetching rutinas:", error);
        }
      }
      fetchRutinas();
    }, []);
  
  
useEffect(()=>{
  setFilteredRutinas(rutinas?.filter(rutina => rutina.name.toLowerCase().includes(search.toLocaleLowerCase()) || rutina.user.username.toLowerCase().includes(search.toLocaleLowerCase())));
},[search])

    return(<>
        
        <Container className="mb-5">
        <div>
          <p className="d-inline text-center mb-4">Rutinas</p> 
          <Button className="d-inline mb-3 float-right" onClick={() => nav("/rutinas/rutina")}>Crear nueva rutina</Button>
        </div>
        <div><input placeholder="buscar rutina ..." value={search} onChange={(e)=>{setSearch(e.target.value)}}></input></div>
        <br/>
        {loadData ? "cargando contenido ..." :<DataTable columns={columns} data={filteredRutinas} pagination customStyles={darkThemeStyles}>

        </DataTable>}
    </Container>
    </>);
}
export default Rutinas;