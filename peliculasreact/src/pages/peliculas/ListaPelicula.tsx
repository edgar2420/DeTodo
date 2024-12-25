import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPeliculas } from '../../service/api';
import { Button, Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';
import './ListaPelicula.css';

interface Pelicula {
  id: number;
  nombre: string;
  sinopsis: string;
  fecha_lanzamiento: string;
  calificacion_rotten: number;
  imagen: string;
}

const ListaPelicula: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUserEmail = localStorage.getItem('user_email');
    
    if (storedUserEmail && storedUserEmail !== 'undefined') {
      setUserEmail(storedUserEmail);
    } else {
      console.log("Email de usuario no encontrado en localStorage.");
    }

    const fetchPeliculas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await obtenerPeliculas();
        setPeliculas(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Hubo un error al obtener la lista de películas.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  if (loading) {
    return <p>Cargando películas...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (peliculas.length === 0) {
    return <p>No se encontraron películas.</p>;
  }

  return (
    <Container className="mt-5">
      {/* Mostrar el email del usuario si está disponible */}
      {userEmail ? (
        <Alert variant="success" className="text-center">
          ¡Bienvenido, {userEmail}!
        </Alert>
      ) : (
        <Alert variant="warning" className="text-center">
          ¡Bienvenido, usuario anónimo!
        </Alert>
      )}

      <Row>
        {peliculas.map((pelicula) => (
          <Col key={pelicula.id} md={4} className="mb-4">
            <Card className="shadow-sm pelicula-card">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={pelicula.imagen}
                  alt={pelicula.nombre}
                  className="pelicula-imagen"
                />
              </div>
              <Card.Body>
                <Card.Title className="pelicula-titulo">{pelicula.nombre}</Card.Title>
                <Card.Text className="pelicula-fecha">
                  <strong>Fecha de lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                </Card.Text>
                <div className="calificacion-container">
                  <strong>Calificación:</strong>
                  <ProgressBar
                    now={pelicula.calificacion_rotten * 10}
                    label={`${pelicula.calificacion_rotten * 10}%`}
                    variant={pelicula.calificacion_rotten >= 7 ? 'success' : pelicula.calificacion_rotten >= 4 ? 'warning' : 'danger'}
                  />
                </div>
                <div className="botones-container">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/peliculas/${pelicula.id}`)}
                    className="btn-custom"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaPelicula;


