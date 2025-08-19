import { Icon } from "@iconify/react/dist/iconify.js";
import { CardBody, CardImg, Table, Container, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { deleteEjercicioRepeticiones } from "../ejercicios/apis";
import { getRutina } from "./apis";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import Cookies from "js-cookie";

function RutinaTable({rutina,setRutina}){
    
    const days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
    const [error,setError]=useState(false);
    const {accessNew}=useContext(AuthContext);
    const isUser=()=>{
        return (rutina.user.id==Cookies.get('user')); 
    }
    console.log(isUser());
    const borrarEjercicio=async (ejercicioId)=>{
        try{
            await accessNew();
            await deleteEjercicioRepeticiones(ejercicioId);
            const response=await getRutina(rutina.id);
            setRutina(response.data);
        }catch(err){
            setError(err.response.data.detail);
        }
    }

    return(<>
    <Container>
        <Table striped responsive variant="dark" style={{overflowX:"scroll"}}>
            <thead>
            <tr>
                <th>Día </th>{[...Array(rutina.max_ejercicios)].map((item)=>{return(<th>Ejercicio</th>)})}
            </tr>
            </thead>
            <tbody>
                {days.map((day, index) => (
  <tr key={index}>
    <td style={{ width: '5rem' }}>{day}</td>

            {rutina.ejercicios
            ?.filter(ejercicio => ejercicio.day === day)
            .sort((a, b) => a.order - b.order)
            .map((ejercicio) => (
                <td key={ejercicio.id} style={{ width: '9rem' }}>
                <Card className="mx-auto" style={{ width: '9rem' }}>
                    {isUser() && <p><Icon onClick={()=>borrarEjercicio(ejercicio?.id)} icon="solar:close-square-bold" color="red" style={{fontSize:"25px", position:"absolute", right:"0px", cursor:"pointer"}}/></p> }
                    <p> {ejercicio.order}) {ejercicio.exercise_data.name}</p>
                    {ejercicio.exercise_data.image && (
                    <CardImg
                        src={ejercicio?.exercise_data?.image}
                        style={{ height: "90px" }}
                    />
                    )}
                    <CardBody>
                    ({ejercicio.reps_max}-{ejercicio.reps_min}) x {ejercicio.series}
                    </CardBody>
                </Card>
                </td>
            ))}
        </tr>
        ))}
                
            </tbody>

        </Table>
        {error && <Alert variant="danger">{error}</Alert>}
    </Container>
    </>);
}
export default RutinaTable;