import {Route, Routes} from 'react-router-dom';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/tooplate-style.css';
import './assets/css/datepicker.css';
import Home from './pages/Home';
import Rutinas from './pages/rutinas/Rutinas'
import Rutina from './pages/rutinas/Rutina'
import Applayout from './layouts/Applayout';
import Login from './pages/Login';
import Profile from './pages/profiles/Profile';
import Ejercicios from './pages/ejercicios/Ejercicios';
import RutinaAdd from './pages/rutinas/RutinaAdd';
import Register from './pages/Register';
import CrearEjercicio from './pages/ejercicios/CrearEjercicio';
import Ejercicio from './pages/ejercicios/Ejercicio';
import Entrenamiento from './pages/entrenamientos/Entrenamiento';
import RutinaUpdate from './pages/rutinas/RutinaUpdate';
import Gimnasios from './pages/gimnasios/Gimnasios';
import Gimnasio from './pages/gimnasios/Gimnasio';
import ProfileLayout from './layouts/ProfileLayout';
import MisEntrenamientos from './pages/profiles/MisEntrenamientos';
import MiEntrenamiento from './pages/entrenamientos/MiEntrenamiento';
import Serie from './pages/profiles/Serie';
import Progreso from './pages/profiles/Progreso';
import Amigos from './pages/profiles/Amigos';
import Notificaciones from './pages/profiles/Notificaciones';
import Suscripciones from './pages/profiles/Suscripciones';

function App() {
  return (

    <div className="App">
      <Routes>
      <Route path="/" element={<Applayout />}>
        <Route index element={<Home />} />

        {/* RUTINAS */}

        <Route path="rutinas/" element={<Rutinas/>} />
        <Route path="rutinas/rutina" element={<Rutina />}/>
        <Route path="rutinas/rutina/:id/" element={<RutinaAdd />}/>
        <Route path="rutinas/rutina/:id/update" element={<RutinaUpdate />}/>

        {/* EJERCICIOS */}
        <Route path="ejercicios" element={<Ejercicios />} />
        <Route path="ejercicios/:id/" element={<Ejercicio />} />
        <Route path="ejercicios/create" element={<CrearEjercicio />} />
        <Route path="entrenamientos/create" element={<Entrenamiento/>}/>

        {/* GIMNASIOS */}
        <Route path="gimnasios" element={<Gimnasios />} />
        <Route path="gimnasios/gimnasio" element={<Gimnasio/>} />
        <Route path="gimnasios/gimnasio/:id" element={<Gimnasio/>} />


        {/* LOGiN/REGISTER */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* DASHBOARD */}
        {/* Layout anidado para profile */}
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />  {/* /profile */}
          <Route path="/profile/mis-entrenamientos" element={<MisEntrenamientos/>}/>
          <Route path="/profile/mis-entrenamientos/:id" element={<MiEntrenamiento/>}/>
          <Route path="/profile/series/:id" element={<Serie/>}/>
          <Route path="/profile/progreso" element={<Progreso/>}/>
          <Route path="/profile/amigos" element={<Amigos/>}/>
          <Route path="/profile/notificaciones" element={<Notificaciones/>}/>
          <Route path="/profile/suscripciones" element={<Suscripciones/>}/>
        </Route>

        
      </Route>
    </Routes>
    </div>
  );
}

export default App;
