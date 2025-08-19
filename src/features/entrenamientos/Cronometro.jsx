import React, { useState, useEffect } from 'react';
import { Card,CardBody,CardTitle,Container } from 'react-bootstrap';

function Cronometro({date}) {
  const pastDate = new Date(date);
  const now = new Date();
  const diffMs = now - pastDate; // now - pastDate da milisegundos
  // Convertir a segundos (1 segundo = 1000 ms)
  const diffSeconds = Math.floor(diffMs / 1000);

  const [segundos, setSegundos] = useState(diffSeconds);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, []);

  // Opcional: formatear a mm:ss
  const formatearTiempo = (s) => {
    const horas = Math.floor(s / 3600);
    const minutos = Math.floor((s % 3600) / 60);
    const segundos = s % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  return (
    <div>
    <Card className='bg-dark text-white'>
    <CardBody>Tiempo de entreno: <CardTitle className='mt-3'>{formatearTiempo(segundos)}</CardTitle></CardBody>
    </Card>
    </div>
  );
}

export default Cronometro;