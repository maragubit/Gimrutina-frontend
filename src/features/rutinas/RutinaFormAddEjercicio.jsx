
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { createEjercicioRepeticiones, createEjercicioRutina } from "../ejercicios/apis";
import { AuthContext } from "../../AuthContext";




function RutinaFormAddEjercicio({ejercicios,rutina}){
  const [rutinaid,setRutinaId]=useState(rutina.id) //1
  const {accessNew, triggerFreshData}=useContext(AuthContext);
  const [ejerciciosList,setEjerciciosList]=useState(ejercicios.filter(ejercicio => ejercicio.gimnasio.id == rutina.user.mi_gimnasio?.gimnasio)); //1
  const[ejerciciosFiltered,setEjerciciosFiltered]=useState(ejerciciosList); //2
  const[search,setSearch]=useState("");//3
  const [error,setError]=useState();//4
  const [order,setOrder]=useState();//5
  const [selectedFilter, setSelectedFilter] = useState("1");//filter para elegir ejercicios de gimnasio, mis ejercicios, favoritos o publicos
  const [selectedExercise, setSelectedExercise] = useState("1");//6 ejercicio seleccionado en el select
  const [selectedDay, setSelectedDay] = useState("monday");//7 
  
  useEffect(()=>{
    const filter=ejerciciosList.filter(ejercicio =>
        ejercicio.name.toLowerCase().includes(search.toLowerCase())
        );
    setEjerciciosFiltered(filter);
    setSelectedExercise(filter.length > 0 ? filter[0].id.toString() : null);    
  },[search,ejerciciosList,ejercicios]);


  const handleSubmit=(e)=>{
    e.preventDefault();
    const data=new FormData(e.target);
    const response = async()=>{
      try{
        accessNew();
        const exercise=selectedExercise;
        const day=selectedDay;
        await createEjercicioRepeticiones(data.get("reps_max"),data.get("reps_min"),exercise, data.get("series"),rutina.id,day,order);
        triggerFreshData();
      
        
      }
      catch(err){
        setError(err.message);
        console.log(error);
      }

   
    }
   setSearch("");
   response();
  }

  function filterByOption(option) {
    setSelectedFilter(option);
    switch(option) {
      case "1": // ejercicios del gimnasio del usuario
        setEjerciciosList(ejercicios.filter(ejercicio => ejercicio.gimnasio.id == rutina.user.mi_gimnasio?.gimnasio)); // ejercicios del gimnasio del usuario
        break;
      case "2": // mis ejercicios
        setEjerciciosList(ejercicios.filter(ejercicio => ejercicio.user.id == rutina.user.id)); // mis ejercicios
        break;
      case "3": // ejercicios públicos
        setEjerciciosList(ejercicios); // ejercicios públicos
        break;
      
      default:
        console.log("Ningún caso coincide");
    }
  }


  return(<>
    <Container className="mb-3">
    <Form className="p-3 bg-dark text-light" onSubmit={handleSubmit}>
        <legend>Añadir Ejercicio</legend>
        <br/>
      <FormSelect value={selectedFilter} onChange={(e) => filterByOption(e.target.value)} className="mb-3">
        <option value="1" selected>Ejercicios de mi gimnasio</option>
        <option value="2" >Mis ejercicios</option>
        <option value="3" >Ejercicios públicos</option>
      </FormSelect>
      <br/>
      <FormGroup className="mb-3">
        <FormLabel>Ejercicio: <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value);}}></input><Icon className="ml-2" icon="subway:search" />
        </FormLabel>
        <FormSelect name="exercise" value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)} required>
          {ejerciciosFiltered.map((ejercicio)=>{return(
            <option  key={ejercicio.id} value={ejercicio.id}>{ejercicio.name} ({ejercicio.user.username})</option> 
          )})}
        </FormSelect>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Series y repeticiones:</FormLabel>
        <div className="row">
          <div className="col-4">
            <FormLabel className="small">Series:</FormLabel>
            <FormControl type="number" placeholder="Series" name="series" required/>
          </div>
          <div className="col-4">
            <FormLabel className="small">Reps Máx:</FormLabel>
            <FormControl type="number" placeholder="Máx" name="reps_max" required/>
          </div>
          <div className="col-4">
            <FormLabel className="small">Reps Mín:</FormLabel>
            <FormControl type="number" placeholder="Mín" name="reps_min" required/>
          </div>
        </div>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Día de la semana:</FormLabel>
        <FormSelect name="day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} required>
          <option value="monday">Lunes</option>
          <option value="tuesday">Martes</option>
          <option value="wednesday">Miércoles</option>
          <option value="thursday">Jueves</option>
          <option value="friday">Viernes</option>
          <option value="saturday">Sábado</option>
          <option value="sunday">Domingo</option>
        </FormSelect>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Orden en el día:</FormLabel>
        <FormControl type="number" placeholder="Orden" name="order" value={order} onChange={(e)=>{setOrder(e.target.value)}}required />
      </FormGroup>
      <Button type="submit">Añadir a la rutina</Button>
    </Form>
    </Container></>);
}
export default RutinaFormAddEjercicio