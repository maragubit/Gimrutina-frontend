import { Button, Container, FormControl } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useEffect,useState,useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { getAllGimnasios } from "../../features/gimnasios/apis";
import darkThemeStyles from "../../assets/js/darkTheme";
import Cargando from "../../components/Cargando";

function Gimnasios(){
    const {accessNew}=useContext(AuthContext);
    const [loadData,setLoadData]=useState(true);
    const [error,setError]=useState();
    const [gimnasios,setGimnasios]=useState();
    const[search,setSearch]=useState("");
    const [gimnasiosFiltered,setGimnasiosFiltered]=useState(gimnasios);
    const columns=[
      {name:'Nombre', sortable: true, cell: row=>(<a href={`/gimnasios/gimnasio/${row.id}/`}>{row.nombre}</a>)},
      {name:'Dirección', sortable: true, cell: row=> row.direccion},
      {name:'Tarifa',selector: row => row.tarifa+ ' €', sortable: true,},
      {name:'Horario',selector: row => row.horario}
    ];


    useEffect(()=>{
      const fetchGimnasios= async()=>{
        try{
          await accessNew();
          const response= await getAllGimnasios();
          
          setGimnasios(response.data);
          setGimnasiosFiltered(response.data);
          setLoadData(false);


        }catch(err){
          setError(err.response.data.detail);
        }
      }
      fetchGimnasios();
    },[])

    useEffect(()=>{
      const data= gimnasios?.filter((gimnasio)=> gimnasio?.nombre.toLowerCase().includes(search.toLowerCase()));
      setGimnasiosFiltered(data);
    },[search,gimnasios])

    return(<>
    <Container className="mb-5">
        <h4>Gimnasios <a href="/gimnasios/gimnasio"><Button className="mt-2 mb-2 ml-2">Registrar gimnasio</Button></a></h4>
        <FormControl className="mb-2" placeholder="buscar gimnasio..." value={search} onChange={(e)=>{setSearch(e.target.value)}}></FormControl>
        {!loadData ? <DataTable columns={columns} data={gimnasiosFiltered} pagination customStyles={darkThemeStyles}>

        </DataTable> : <Cargando/>}
    </Container>
    </>);
}
export default Gimnasios;