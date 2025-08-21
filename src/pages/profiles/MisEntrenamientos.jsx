import { Alert, Col, Container, FormControl, FormLabel, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useState,useEffect,useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { getMisEntrenamientos } from "../../features/entrenamientos/apis";
import { Icon } from "@iconify/react/dist/iconify.js";
import darkThemeStyles from "../../assets/js/darkTheme";
import Cargando from "../../components/Cargando";
import { Link } from "react-router-dom";


function MisEntrenamientos(){
    const {accessNew}=useContext(AuthContext);
    const [,]=useState();
    const [load,SetLoad]=useState(true);
    const [error,setError]=useState();
    const [entrenamientos,setEntrenamientos]=useState();
    const [entrenamientosFiltered,setEntrenamientosFiltered]=useState();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateOnly = tomorrow.toISOString().split('T')[0]; // "2025-08-14"
    const [inicio,setInicio]=useState("2025-01-01");
    const [final,setFinal]=useState(dateOnly);

    const columns=[
      {name:'Fecha', sortable: true, cell: row=>(<Link to={`/profile/mis-entrenamientos/${row.id}`}>{formatDate(row.date)}</Link>)},
      {name:'Finalizado',selector: row => {return(row.finished ? "SI":"NO")},sortable: true,},
      {name:'Duración',selector: row => row.duracion,sortable: true,}
    ];

    function formatDate(date) { /* funcion para formatear la fecha */
        const d = new Date(date);

        const pad = (n) => n.toString().padStart(2, '0');

        const day = pad(d.getDate());
        const month = pad(d.getMonth() + 1); // Los meses van de 0 a 11
        const year = d.getFullYear();

        const hours = pad(d.getHours());
        const minutes = pad(d.getMinutes());
        const seconds = pad(d.getSeconds());

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }


    useEffect(()=>{
        async function fetchEntrenamientos(){
            try{
                await accessNew();
                const response = await getMisEntrenamientos();
                response.data.sort((a,b)=>new Date(b.date)-new Date(a.date));
                setEntrenamientos(response.data);
                setEntrenamientosFiltered(response.data);
                SetLoad(false)

            }catch(err){
                setError(err.response.data.detail);
            }
        }
        fetchEntrenamientos()
    },[]);

    useEffect(()=>{
    const data = entrenamientos?.filter(item => {
      const fecha = new Date(item.date); // asegúrate que item.date sea Date o string ISO
      return fecha >= new Date(inicio) && fecha <= new Date(final);
    });
    setEntrenamientosFiltered(data);

    },[inicio,final,entrenamientos]);
    return (<>
    <Container>
        <h4>Mis entrenamientos</h4>
        <Row>
            <Col xs="6"><FormLabel>Desde:</FormLabel></Col>
            <Col xs="6"><FormLabel>Hasta:</FormLabel></Col>
        </Row>
        <Row className="mb-2">
            <Col xs="6"><FormControl type="date" value={inicio} onChange={(e)=>{setInicio(e.target.value)}}></FormControl></Col>
            <Col xs="6"><FormControl type="date" max={dateOnly} value={final} onChange={(e)=>{setFinal(e.target.value)}}></FormControl></Col>
        </Row>
        
            {!load ? <DataTable data={entrenamientosFiltered} columns={columns} pagination customStyles={darkThemeStyles} >

            </DataTable> : <Cargando/>}
        </Container>
        {error &&<Alert variant="danger">{error}</Alert>}
        <br></br>
    </>)
}
export default MisEntrenamientos;