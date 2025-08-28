import {Container, Row } from 'react-bootstrap';
import portada from '../assets/img/portada.png'

function Home(){
    return (<>
        
    <div style={{ width: '100%', display: 'block', backgroundColor: 'black' }}>
      <img
        src={portada}
        alt="Portada"
        style={{
          maxWidth: '80%',
          marginRight: 'auto',
          marginLeft: 'auto',
          display: 'block',
          height: 'auto',
        }}
      />
    </div>
        
    </>);
};
export default Home;