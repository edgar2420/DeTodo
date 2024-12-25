import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
baseURL: API_URL,
headers: {
    'Content-Type': 'application/json',
},
});


// Login del usuario
export const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/usuarios/login/', credentials);
      
      // Verificar si la respuesta tiene token y email
      const { token, email } = response.data;
  
      if (token && email) {
        console.log("Token recibido:", token);
        console.log("Email recibido:", email);
        
        // Almacenar el token y el email en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user_email', email);
      } else {
        console.error("No se encontró el token o el email en la respuesta.");
      }
  
      // Retornar los datos
      return response.data;
    } catch (error) {
      console.error("Error durante el login:", error);
      throw new Error('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };
  


// Registro del usuario
export const register = async (userData: { email: string; password: string }) => {
const response = await api.post('/usuarios/register/', userData);
return response.data;
};

// Crear una nueva película
export const crearPelicula = async (formData: FormData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/peliculas/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear la película:', error);
      throw error;
    }
  };
  


  // Obtener una película por su ID
export const obtenerPeliculaPorId = async (id: string) => {
    const response = await axios.get(`${API_URL}/peliculas/${id}/`);
    return response.data;
  };

  // Actualizar una película
export const actualizarPelicula = async (id: string, peliculaData: FormData) => {
    const response = await axios.put(`${API_URL}/peliculas/${id}/`, peliculaData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
};

export const eliminarPelicula = async (id: string) => {
    const response = await axios.delete(`${API_URL}/peliculas/${id}/`);
    return response.data;
};


export const obtenerPeliculas = async () => {
    const response = await axios.get(`${API_URL}/peliculas/`);
    return response.data;
};



export const getRepartos = async () => {
    try {
    const response = await axios.get(`${API_URL}/reparto/`);
    return response.data;
    } catch (error) {
    console.error('Error al obtener los repartos:', error);
    throw error;
    }
};



export const getReparto = async (id: string) => {
    try {
    const response = await api.get(`/reparto/${id}/`);
    return response.data;
    } catch (error) {
    console.error(`Error al obtener el reparto con ID ${id}:`, error);
    throw error;
    }
};

export const obtenerRepartos = async () => {
    try {
    const response = await axios.get('/api/reparto/');
    return response.data;
    } catch (error) {
    console.error('Error al obtener los repartos:', error);
    throw error;
    }
};


export const editarReparto = async (id: string, repartoData: { persona: string; rol: string }) => {
    const response = await axios.put(`${API_URL}/reparto/${id}/`, repartoData);
    return response.data;
};


export const eliminarPersona = async (id: string) => {
    const response = await axios.delete(`${API_URL}/personas/${id}/`);
    return response.data;
};



export const getPersonas = async () => {
    const response = await axios.get(`${API_URL}/personas/`);
    return response.data;
};


export const crearPersona = async (personaData: FormData) => {
    const response = await axios.post(`${API_URL}/personas/`, personaData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    return response.data;
};



export const obtenerPersonaPorId = async (id: string) => {
    const response = await axios.get(`${API_URL}/personas/${id}/`);
    return response.data;
};




export const editarPersona = async (id: string, personaData: FormData) => {
    const response = await axios.put(`${API_URL}/personas/${id}/`, personaData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    });
    return response.data;
};