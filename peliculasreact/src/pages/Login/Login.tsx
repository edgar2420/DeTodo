import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Llamar a la función login y recibir la respuesta
      const data = await login({ email, password });

      // Almacenar el token y el email en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_email', email); // Aquí almacenamos el email también

      // Redirigir a la página principal
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Credenciales incorrectas');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <div className="card p-4 shadow-lg"
        style={{
          width: '350px',
          borderRadius: '20px',
          backgroundColor: '#fff',
          border: 'none'
        }}>
        <h2 className="text-center text-dark mb-4">Iniciar Sesión</h2>
        {error && (
          <p className="text-danger text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
            style={{
              backgroundColor: '#00aaff',
              border: 'none'
            }}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/register" className="text-primary">¿No tienes una cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
