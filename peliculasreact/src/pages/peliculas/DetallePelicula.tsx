import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerPeliculaPorId, obtenerPersonaPorId } from '../../service/api';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import './DetallePelicula.css';

interface Persona {
  id: number;
  nombre: string;
  foto: string;
  peliculas_dirigidas?: string[];
  peliculas_actuadas?: string[];
}

interface RepartoDetalle {
  id: number;
  rol: string;
  persona: Persona;
}

interface Pelicula {
  id: number;
  nombre: string;
  sinopsis: string;
  fecha_lanzamiento: string;
  calificacion_rotten: number;
  trailer_youtube: string;
  imagen: string;
  director: number;
  reparto_detalles: RepartoDetalle[];
}

const DetallePelicula: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pelicula, setPelicula] = useState<Pelicula | null>(null);
  const [director, setDirector] = useState<Persona | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        setLoading(true);
        const data = await obtenerPeliculaPorId(id!);
        setPelicula(data);

        if (data.director) {
          const directorData = await obtenerPersonaPorId(data.director);
          setDirector(directorData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Hubo un error al obtener los detalles de la película.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPelicula();
  }, [id]);

  const abrirModal = (persona: Persona) => {
    setPersonaSeleccionada(persona);
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/path/to/default-image.jpg";
  };

  const getImageUrl = (url: string): string => {
    if (url.startsWith("/")) {
      return `http://localhost:8000${url}`;
    }
    return url;
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!pelicula) {
    return <p>No se encontró la película.</p>;
  }

  return (
    <div className="detalle-pelicula-container">
      {/* Imagen principal tipo banner */}
      <div
        className="banner"
        style={{
          backgroundImage: `url(${getImageUrl(pelicula.imagen)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          position: 'relative',
        }}
      >
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1 className="banner-title">{pelicula.nombre}</h1>
          <p className="banner-rating">Calificación: {pelicula.calificacion_rotten} / 10</p>
        </div>
      </div>

      <Container className="mt-4" style={{ color: '#fff' }}>
        <Row className="mb-4">
          <Col md={12}>
            <p className="sinopsis"><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
            <p><strong>Fecha de lanzamiento:</strong> {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}</p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={4}>
            <div className="director">
              <strong>Director:</strong>
              {director ? (
                <div className="persona-card">
                  <img
                    src={getImageUrl(director.foto)}
                    alt={director.nombre}
                    className="persona-image"
                    onError={handleImageError}
                  />
                  <p>{director.nombre}</p>
                </div>
              ) : (
                'No disponible'
              )}
            </div>
          </Col>

          <Col md={8}>
            <div className="actores">
              <strong>Actores:</strong>
              <div className="d-flex flex-wrap">
                {pelicula.reparto_detalles.map((actor) => (
                  <div
                    key={actor.id}
                    className="persona-card"
                    onClick={() => abrirModal(actor.persona)}
                  >
                    <img
                      src={getImageUrl(actor.persona.foto)}
                      alt={actor.persona.nombre}
                      className="persona-image"
                      onError={handleImageError}
                    />
                    <p>{actor.persona.nombre}</p>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Button variant="primary" onClick={() => navigate('/')} className="mb-5">
          Volver a la lista
        </Button>

        {pelicula.trailer_youtube && (
          <Row className="mt-5">
            <Col>
              <h4>Trailer</h4>
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(pelicula.trailer_youtube).search).get('v')}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
          </Row>
        )}
      </Container>

      {/* Modal para mostrar más detalles sobre la persona seleccionada */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{personaSeleccionada?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {personaSeleccionada?.foto && (
            <img
              src={getImageUrl(personaSeleccionada.foto)}
              alt={personaSeleccionada.nombre}
              style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              onError={handleImageError}
            />
          )}
          <h5>Películas dirigidas o actuadas:</h5>
          <ul>
            {personaSeleccionada?.peliculas_dirigidas && personaSeleccionada.peliculas_dirigidas.length > 0 && (
              <>
                <h6>Películas dirigidas:</h6>
                {personaSeleccionada.peliculas_dirigidas.map((pelicula) => (
                  <li key={pelicula}>{pelicula}</li>
                ))}
              </>
            )}

            {personaSeleccionada?.peliculas_actuadas && personaSeleccionada.peliculas_actuadas.length > 0 && (
              <>
                <h6>Películas actuadas:</h6>
                {personaSeleccionada.peliculas_actuadas.map((pelicula) => (
                  <li key={pelicula}>{pelicula}</li>
                ))}
              </>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetallePelicula;
