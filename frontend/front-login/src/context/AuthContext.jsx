import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          withCredentials: true,
        });
        if (response.data) {
          setUser(response.data); // El endpoint /protected devuelve el nombre del usuario
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user) {
        setUser(response.data.user); // Actualiza el estado del usuario
      } else {
        throw new Error('No se recibió información del usuario');
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/register',
        {
          nombre: userData.fullName,
          email: userData.username,
          password: userData.password,
          cedula: userData.cedula,
          telefono: userData.telefono,
          direccion: userData.direccion,
          fecha_nacimiento: userData.fechaNacimiento,
        },
        { withCredentials: true }
      );
      return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al registrar');
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/profile', {
        withCredentials: true
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      setUser(null);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axios.get('http://localhost:3000/logout', { withCredentials: true });
      setUser(null); // Limpia el estado del usuario
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);