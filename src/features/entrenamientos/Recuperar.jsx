import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { format } from 'date-fns';


function Recuperar({entrenamientos, startTraining}){
    const columns=[
      {name:'Fecha', sortable: true, cell: row=>(<a style={{cursor:"pointer"}} onClick={()=>startTraining(row.id)}>{format(row.date,'dd/MM/yyyy HH:mm:ss')}</a>)},
    ];
    
    
    return (<>
    
    <Container>
      <h4>Recuperar entrenamiento sin finalizar</h4>
        <DataTable columns={columns} data={entrenamientos}></DataTable>
    </Container>
    </>)
}
export default Recuperar;