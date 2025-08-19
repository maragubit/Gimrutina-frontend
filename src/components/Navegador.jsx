import { Link, useLocation} from 'react-router-dom';
import logo from '../assets/img/logo.png';     // Ajusta la ruta según tu estructura
import profileIcon from '../assets/img/profile.png';
import { AuthContext } from '../AuthContext';
import { Navbar, Nav, Container,Card,CardImg, CardTitle } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { getProfile } from '../features/profiles/apis';




function Navegador() {
const location = useLocation();

const {isAuth}=useContext(AuthContext);
const {accessNew}=useContext(AuthContext)
const[profile,setProfile]=useState();
const [error,setError]=useState();
const[loadData,setLoadData]=useState(true);
const [refresh,setRefresh]=useState(0);

useEffect(()=>{
  const fetchProfile=async()=>{
    try{
      const response=await getProfile();
      setProfile(response.data);
      setLoadData(false);
    }catch(err){
      setError(err.response.data.detail)
    }
  }
  fetchProfile();
},[])

useEffect(()=>setRefresh(prev => prev+1),[profile])

  return (
    <>
      <Navbar  expand="lg" bg="light" className="tm-top-bar" id="tm-top-bar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={logo} width="50" alt="Site logo" className="mr-2" />
            GIMRUTINA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="mainNav" />
          <Navbar.Collapse id="mainNav">
            <Nav className="ml-auto mr-4" activeKey={location.pathname} style={{fontSize:"15px"}}>
              <Nav.Link eventKey="/" as={Link} to="/">Home</Nav.Link>
              {isAuth ? (
                <>
                  <Nav.Link eventKey="/rutinas" as={Link} to="rutinas">Rutinas</Nav.Link>
                  <Nav.Link eventKey="/ejercicios" as={Link} to="/ejercicios">Ejercicios</Nav.Link>
                  <Nav.Link eventKey="/entrenamientos/create" as={Link} to="/entrenamientos/create">Entrenar</Nav.Link>
                  <Nav.Link eventKey="/gimnasios" as={Link} to="/gimnasios">Gimnasios</Nav.Link>
                  <Nav.Link eventKey="/profile" as={Link} to="profile" className="d-flex justify-content-end ml-5 mr-2">
                    <Card style={{width:"45px", border:"0"}}>
                      {!loadData && profile.image ? <CardImg src={profile.image} style={{borderRadius:"200px"}}/>:<CardImg src={profileIcon}/>}
                    </Card>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">Login/Register</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='espace'></div>
    </>
  );
}

export default Navegador;
