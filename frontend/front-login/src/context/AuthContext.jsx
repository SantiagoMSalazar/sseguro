import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          withCredentials: true,
        });
        setUser(response.data.user);
        console.log(response.data.user.rol);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        { username, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al registrar');
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axios.get('http://localhost:3000/logout', { withCredentials: true });
      setUser(null);
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);