import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Registrer';
import CrearPelicula from '../pages/peliculas/CrearPelicula';
import DetallePelicula from '../pages/peliculas/DetallePelicula';
import EditarPelicula from '../pages/peliculas/EditarPelicula';
import EliminarPelicula from '../pages/peliculas/EliminarPelicula';
import ListaPelicula from '../pages/peliculas/ListaPelicula';
import DetalleReparto from '../pages/reparto/DetallePersona';
import EditarReparto from '../pages/reparto/EditarPersona';
import EliminarReparto from '../pages/reparto/EliminarPersona';
import ListaReparto from '../pages/reparto/ListaPersonas';
import CrearPersona from '../pages/reparto/CrearPersona';
import ListaPeliculaEditable from '../pages/peliculas/ListPeliculaEditable';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <ListaPelicula />,
  },
  {
    path: '/peliculas/create',
    element: <CrearPelicula />,
  },
  {
    path: '/peliculas/:id',
    element: <DetallePelicula />,
  },
  {
    path: '/peliculas/:id/edit',
    element: <EditarPelicula />,
  },
  {
    path: '/peliculas/:id/delete',
    element: <EliminarPelicula />,
  },
  {
    path: '/peliculas/gestion',
    element: <ListaPeliculaEditable />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/personas',
    element: <ListaReparto />,
  },
  {
    path: '/persona/create',
    element: <CrearPersona />,
  },
  {
    path: '/persona/:id',
    element: <DetalleReparto />,
  },
  {
    path: '/persona/:id/edit',
    element: <EditarReparto />,
  },
  {
    path: '/persona/:id/delete',
    element: <EliminarReparto />,
  },
]);

