import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Alert, Button, Container, FormControl, FormSelect } from "react-bootstrap";
import { addFriend, getFriends, getUsers } from "../../features/profiles/apis";
import DataTable from "react-data-table-component";
import darkThemeStyles from "../../assets/js/darkTheme";
import { Link } from "react-router-dom";



export default function Amigos(){
    const columns=[
          {name:'Nombre de usuario', sortable: true, cell: row=>(<div ><img src={row.profile.image} style={{width:"50px", height:"50px", borderRadius:"100px"}}/> <Link to={`/`}>{row.username}</Link></div>)},
          {name:'gimnasio',selector: row => row.profile.gimnasio?.nombre , sortable: true,},
          {name:'rutina',selector: row => (<Link to={`/rutinas/rutina/${row.rutina_actual?.rutina.id}/`}>{row.rutina_actual?.rutina.name}</Link>) , sortable: true,},
          
        ];


    /* ------USESTATE----- */
    const [search,setSearch]=useState("");
    const [users,setUsers]=useState();
    const [usersFiltered,setUsersFiltered]=useState();
    const [error,setError]=useState();
    const [select,setSelect]=useState("1");
    const [amigos,setAmigos]=useState();
    const [filteredAmigos,setFilteredAmigos]=useState();

    /*------- USEEFFECT ----- */

    //lista usuarios
    useEffect(()=>{
        const fetchUsers= async()=>{
            try{
                const response=await getUsers();
                setUsers(response.data);
                setUsersFiltered(response.data);
                const response2=await getFriends();
                setAmigos(response2.data);
                setFilteredAmigos(response2.data);
            }catch(err){
                setError(err.response.data.detail);
            }
            
        }
        fetchUsers();
    },[]);

    //filtro usuarios
    useEffect(()=>{
        setUsersFiltered(users?.filter(user=>user.username.toLowerCase().includes(search.toLowerCase())))
    },[search,users]);

    


    /* FUNCTIONS */
    const addNewFriend= async(id)=>{
        try{
            await addFriend(id);
            
        }catch(err){
            setError(err.response.data.detail);
        }
    }

    /* RETURN */
    return(
    <Container>
        {error && <Alert variant="danger">{error}</Alert>}
        <h4>Lista de usuarios <Button variant="info"><Icon icon="pajamas:filter" /></Button></h4>
        <FormControl className="mb-2" placeholder="Buscar usuario..." value={search} onChange={(e)=>setSearch(e.target.value)}></FormControl>
        <div>
            <FormSelect value={select} className="d-inline" style={{maxWidth:"60%"}} onChange={(e)=>setSelect(e.target.value)} >
            {usersFiltered?.map((user)=>{ return(
            <option value={user.id}>{user.username}</option>)
            })}</FormSelect><Button className="ml-2 d-inline" onClick={()=>{addNewFriend(select)}}>Añadir</Button>
        </div>
        <br/>
        <h5>Amigos</h5>
        <DataTable  columns={columns} data={filteredAmigos} pagination customStyles={darkThemeStyles}></DataTable>
    </Container>)
}