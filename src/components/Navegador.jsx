import { Link, useLocation} from 'react-router-dom';
import logo from '../assets/img/logo.png';     // Ajusta la ruta según tu estructura
import profileIcon from '../assets/img/profile.png';
import { AuthContext } from '../AuthContext';
import { Navbar, Nav, Container,Card,CardImg, Alert } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { getProfile } from '../features/profiles/apis';




function Navegador() {
const location = useLocation();

const {isAuth}=useContext(AuthContext);
const[profile,setProfile]=useState();
const [error,setError]=useState();
const[loadData,setLoadData]=useState(true);
const [refresh,setRefresh]=useState(0);
const [expanded, setExpanded] = useState(false);
useEffect(()=>{
  const fetchProfile=async()=>{
    if (!isAuth) return;
    try{
      const response=await getProfile();
      setProfile(response.data);
      setLoadData(false);
    }catch(err){
      err.response?.data ? setError(err.response.data.detail): setError("Error de conexión con la base de datos");
      
    }
  }
  fetchProfile();
},[])

useEffect(()=>setRefresh(prev => prev+1),[profile])

  return (
    <>
      <Navbar expanded={expanded}  expand="lg" bg="light" className="tm-top-bar" id="tm-top-bar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={logo} width="50" alt="Site logo" className="mr-2" />
            GIMRUTINA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="mainNav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="mainNav" className="justify-content-end">
            <Nav  activeKey={location.pathname} style={{fontSize:"15px"}}>
              <Nav.Link eventKey="/" as={Link} to="/">Home</Nav.Link>
              {isAuth ? (
                <>
                  <Nav.Link eventKey="/rutinas" as={Link} to="rutinas"  onClick={() => setExpanded(false)}>Rutinas</Nav.Link>
                  <Nav.Link eventKey="/ejercicios" as={Link} to="/ejercicios"  onClick={() => setExpanded(false)}>Ejercicios</Nav.Link>
                  <Nav.Link eventKey="/entrenamientos/create" as={Link} to="/entrenamientos/create"  onClick={() => setExpanded(false)}>Entrenar</Nav.Link>
                  <Nav.Link eventKey="/gimnasios" as={Link} to="/gimnasios"  onClick={() => setExpanded(false)}>Gimnasios</Nav.Link>
                  <Nav.Link eventKey="/profile" as={Link} to="profile" className="d-flex justify-content-end ml-5 mr-2"  onClick={() => setExpanded(false)}>
                    <Card style={{width:"45px", border:"0"}}>
                      {!loadData && profile.image ? <CardImg src={profile.image} style={{borderRadius:"200px"}}/>:<CardImg src={profileIcon}/>}
                    </Card>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login"  onClick={() => setExpanded(false)}>Login/Register</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='espace'>
       
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}

export default Navegador;
