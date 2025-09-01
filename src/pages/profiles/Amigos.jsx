import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Alert, Button, Container, FormControl, FormSelect } from "react-bootstrap";
import { addFriend, getUsers } from "../../features/profiles/apis";



export default function Amigos(){


    /* USESTATE */
    const [search,setSearch]=useState("");
    const [users,setUsers]=useState();
    const [usersFiltered,setUsersFiltered]=useState();
    const [error,setError]=useState();
    const [select,setSelect]=useState("1");

    /* USEEFFECT */

    //lista usuarios
    useEffect(()=>{
        const fetchUsers= async()=>{
            try{
                const response=await getUsers();
                setUsers(response.data);
                setUsersFiltered(response.data);
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
        <div><FormSelect value={select} className="d-inline" style={{maxWidth:"60%"}} onChange={(e)=>setSelect(e.target.value)} >
            {usersFiltered?.map((user)=>{ return(
            <option value={user.id}>{user.username}</option>)
            })}</FormSelect><Button className="ml-2 d-inline" onClick={()=>{addNewFriend(select)}}>Añadir</Button></div>
    </Container>)
}