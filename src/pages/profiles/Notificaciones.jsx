import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { getNotifications } from "../../features/profiles/apis";
import darkTheme from "../../assets/js/darkTheme";
import { Link } from "react-router-dom";


export default function Notificaciones(){
    const [notificaciones,setNotificaciones]=useState([]);
    const [error,setError]=useState();
    const columns=[
        {name:'Notificación',selector: row => <Link to={`/profile/notificaciones/notificacion/${row.id}`}>{row.verb}</Link> , sortable: true,},
        {name:'De',selector: row => row.actor.username , sortable: true,},
        {name:'Fecha',selector: row => new Date(row.created_at).toLocaleString() , sortable: true,},
        {name:'Leída',selector: row => (row.read ? <Icon icon="mdi:email-open" style={{fontSize:"25px", color:"blue"}}/> : <Icon icon="mdi:email" style={{fontSize:"25px", color:"grey"}}/>) , sortable: true,},
        ];

    useState(()=>{
        //aqui fetch notificaciones
        const fetchNotificaciones=async()=>{
            try{
                const response= await getNotifications();
                setNotificaciones(response.data);
            }
            catch(err){setError(err.response?.data?.detail)};
        
        }
        fetchNotificaciones();
    },[]);

    return(<Container>
        <h4>Mis notificaciones </h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <br/>
        <DataTable data={notificaciones} columns={columns} customStyles={darkTheme}></DataTable>
        <br/>
    </Container>)
}