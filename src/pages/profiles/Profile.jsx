import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Container, Card, Button, Navbar, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../features/login/apis";
import profilePicture from "../../assets/img/profile.avif"
import { Icon } from "@iconify/react/dist/iconify.js";
import ProfileForm from "../../features/profiles/ProfileForm";
import { getProfile } from "../../features/profiles/apis";
import { getAllGimnasios } from "../../features/gimnasios/apis";
function Profile(){
    const { logout } = useContext(AuthContext);
    const {accessNew}= useContext(AuthContext);
    const [user,setUser]=useState();
    const [profile,setProfile]=useState();
    const [gimnasios,setGimnasios]=useState();
    const [loadData,setLoadData]=useState(true);
    const navigate = useNavigate();
    useEffect(() => {
    const fetchData = async () => {
      try {
        await accessNew();
        const response = await getUser();
        const response2=await getProfile();
        const response3=await getAllGimnasios()
        setUser([response.data.email]);
        setProfile(response2.data);
        setGimnasios(response3.data);
        setLoadData(false);
      } catch (error) {
        console.error("Error al obtener usuario", error);
      }
    };

    fetchData();
  }, []); 
    

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirige a home tras cerrar sesión
    };

    const cambiarPassword = () => {
    navigate("/"); // Redirige a una vista para cambiar contraseña
    };
    return(<>
        
        <Container className="mx-auto">
         
          <Row>
          <div className="d-block">
          <Button className="float-end" variant="danger mb-2 mt-5 "  onClick={()=>{handleLogout()}}>
            Cerrar sesión <Icon className="ml-2" icon="solar:close-circle-bold" />
          </Button>
          </div>
          </Row>
          
        
        <div className="text-center mx-auto d-block mb-5" >
            {!loadData && profile.image ? <img style={{borderRadius:"200px"}} width="250px" src={profile.image}/>: <Icon
            icon="iconamoon:profile-circle-fill"
            width="250"
            height="250"
            />}
            
            {!loadData && <h4 className="text-center">{user}</h4>}
            
            <Button className="mb-2" variant="primary" onClick={()=>{cambiarPassword()}}>
            Cambiar contraseña
            </Button>

            {!loadData && <ProfileForm profile={profile} setProfile={setProfile} gimnasios={gimnasios}/>}
            
        </div>
            
        

       
        
        <Button className="form-control" variant="danger mb-2 mt-5"  onClick={()=>{handleLogout()}}>
            Eliminar cuenta <Icon className="ml-2" icon="ls:trash"></Icon>
            </Button>
        </Container>
    
    <br/>
    </>);
}
export default Profile;