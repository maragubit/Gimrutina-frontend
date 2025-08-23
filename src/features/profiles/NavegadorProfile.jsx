import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
function NavegadorProfile(){
    const location = useLocation();
    return(<>
    <Nav className="entrenamiento" activeKey={location.pathname} style={{backgroundColor: '#212529', color:"white" , padding: '1rem' }}>
                    <Nav.Link eventKey="/profile" as={Link} to="/profile"> Mis datos </Nav.Link>
                    <Nav.Link eventKey="/profile/mis-entrenamientos"  as={Link} to="/profile/mis-entrenamientos" > Mis entrenamientos </Nav.Link>
                    <Nav.Link eventKey="/profile/progreso" as={Link} to="/profile/progreso"> Progreso </Nav.Link>
                    <Nav.Link eventKey="/profile/amigos" as={Link} to="/profile/amigos"> Mis amigos </Nav.Link>
                    <Nav.Link eventKey="/profile/notificaciones" as={Link} to="/profile/notificaciones"> Notificaciones </Nav.Link>
                    
    </Nav>
    </>);
}
export default NavegadorProfile;