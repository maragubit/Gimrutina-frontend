import { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addFriend, getNotification, markAsReadNotification } from "../../features/profiles/apis";

function Notificacion() {
    const { id } = useParams();
    const [notificacion,setNotificacion]=useState([]);
    const [error,setError]=useState();
    const [loadData,setLoadData]=useState(true);
    
    useState(()=>{
        const fetchNotificacion=async()=>{
            try{
                const response= await getNotification(id);
                setNotificacion(response.data);
                setLoadData(false);
            }catch(err){
                setError(err.response?.data?.detail)
            };
        }
        fetchNotificacion();
    },[]);

    const aceptarAmistad = async () => {
        try {
            await addFriend(notificacion.actor.id);              
            await markAsReadNotification(id);
        } catch (err) {
            setError(err.response?.data?.detail || "Error de conexión");
        }
    };

    return (
    <Container>
        <h4>Notificacion</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        {loadData ? <p>Cargando...</p> :
        <div>
            <p>{notificacion?.actor?.username} {notificacion?.target} ({notificacion.created_at})</p>
            <Button variant="success" onClick={()=>aceptarAmistad()}>Aceptar amistad</Button>
            <br/>

        </div>
        }

    </Container>
    );
}



export default Notificacion;