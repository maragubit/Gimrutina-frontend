import { getAllRutinas} from "../../features/rutinas/apis"; 
import { AuthContext } from "../../AuthContext";
import { useEffect,useState, useContext, useMemo } from "react";
import { eliminarFavoritos, getAllEjercicios, getFavoritos, marcarFavoritos } from "../../features/ejercicios/apis";
import { Card,Col, Container, Row, Form, CardFooter, FormSelect, FormControl} from "react-bootstrap";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getProfile } from "../../features/profiles/apis";
import { Link } from "react-router-dom";
import noImg from '../../assets/img/noimg.jpg';

function Ejercicios(){
    const [name,setName]=useState();
    const {accessNew}= useContext(AuthContext);
    const [allEjercicios, setAllEjercicios] = useState([]); // queryset inicial
    const [ejercicios,setEjercicios]=useState(allEjercicios);//queryset seleccionado en el filtro select
    const [filteredEjercicios, setFilteredEjercicios] = useState([]); // filtrados en input text
    const [favourites,setFavourites]=useState();
    const [misEjercicios,setMisEjercicios]=useState();
    const [ejerciciosGim,setEjerciciosGim]=useState();
    const [error,setError]=useState();
    const favoritosIds = useMemo(() => new Set(Array.isArray(favourites) ? favourites.map(fav => fav.id) : []),[favourites]);
    const [profile,setProfile]=useState();
    //se obtienen los ejercicios
    useEffect( ()=>{
        async function fetchEjercicios(){
        try {
                accessNew();
                const response = await getAllEjercicios();
                setAllEjercicios(response.data);
                setFilteredEjercicios(response.data);
                const response2 = await getFavoritos()
                setFavourites(response2.data);
                const response3 = await getProfile();
                setProfile(response3.data);
                setMisEjercicios(response.data.filter((ejercicio)=>ejercicio.user.id==Cookies.get('user')));
                setEjerciciosGim(response.data.filter((ejercicio)=>{return ejercicio.user.gimnasio == profile.gimnasio}));
                setEjercicios(ejerciciosGim);//iniciamos con los ejercicios del gim como seleccionados
        }
             
        catch (error) {
            console.error("Error fetching ejercicios:", error);
        }
        }
        fetchEjercicios();
    }, []);
   

    //funcion para filtrar por select

    const selectEjercicios=(opcion)=>{
        switch(opcion){
            case "1": //todos
                setEjercicios(allEjercicios);
                break;
            case "2": //mis favoritos
                setEjercicios(favourites);
                break;
            case "3"://mis ejercicios
                setEjercicios(misEjercicios);
                break;
            case "4"://ejercicios de mi gimnasio
                setEjercicios(ejerciciosGim);
                break;
            default:
                break;

            }
    };
    
    const marcarFavorito=async (id)=>{
        try{
            await accessNew();
            marcarFavoritos(id);
            const response2 = await getFavoritos()
            setFavourites(response2.data);

            }catch(err){
                setError(err.response.data.detail)
            }
    }

    const quitarFavorito=async (id)=>{
        try{
            await accessNew();
            await eliminarFavoritos(id);
            const response2 = await getFavoritos()
            setFavourites(response2.data);

            }catch(err){
                setError(err.response.data.detail)
            }
    }


    // Filtrar cada vez que cambia el input
    useEffect(() => {
        const filtered =Array.isArray(ejercicios) ? ejercicios?.filter(ejercicio =>
       (ejercicio.name && ejercicio.name.toLowerCase().includes((name || '').toLowerCase())) ||
       (ejercicio.muscle && ejercicio.muscle.toLowerCase().includes((name || '').toLowerCase())) ||
       (ejercicio.user.username && ejercicio.user.username.toLowerCase().includes((name || '').toLowerCase()))
        ) : []
        setFilteredEjercicios(filtered);
    }, [name, ejercicios]);

    

    
    return(<>
    <Container>
    <h3>Lista de Ejercicios <Link to="/ejercicios/create"><button className="btn btn-primary ml-4 mb-4 mt-3">Crear ejercicio</button></Link></h3>
    
    <div>
    <FormSelect className="mb-3" onChange={(e)=>selectEjercicios(e.target.value)}>
        <option value="1">Ejercicios públicos</option>
        <option value="2">Favoritos</option>
        <option value="3">Mis ejercicios</option>
        <option value="4" selected>Ejercicios de mi Gimnasio</option>
    </FormSelect></div>
    <FormControl placeholder="nombre, músculo, usuario..."  value={name} onChange={(e) => setName(e.target.value)}></FormControl>
    <br/>
    
    <Row>

    {filteredEjercicios?.map((ejercicio, index) => {
  return (<>
    <Col xs="12" lg="3">
    <Card style={{ maxWidth: '17rem', minWidth:"160px", color:"white" }} className=" mx-auto mb-2 mt-2 bg-dark">
    <div className="mb-0 mt-1">{favoritosIds?.has(ejercicio?.id) ? <Icon className="float-end" onClick={()=>quitarFavorito(ejercicio.id)} width="25" icon="mdi:heart" style={{color:"red",cursor:"pointer"}} />:<Icon className="float-end" width="25" style={{cursor:"pointer"}} onClick={()=>marcarFavorito(ejercicio.id)} icon="mdi-light:heart" />}</div>
    <Link to={`/ejercicios/${ejercicio.id}`}><Card.Text><p style={{color:"white"}} key={index}>{ejercicio.name} {ejercicio.private ? <Icon className="ml-2" icon="el:lock" />: <Icon className="ml-2" icon="el:unlock" />}</p></Card.Text>
    <Card.Img src={ejercicio.image? ejercicio.image : noImg} style={{height:"220px"}}/></Link>
    <CardFooter><span style={{fontSize:"12px"}}>{ejercicio.muscle}</span>
    <div><Icon style={{fontSize:"1rem"}} className="d-inline" icon="fe:user" /> <p className="d-inline" style={{fontSize:"0.8rem"}}>{ejercicio.user.username}</p></div>
    </CardFooter>
  </Card>
  </Col>
   </>);
    })}
    
    
    </Row>
    
    </Container>
    </>);
}

export default Ejercicios