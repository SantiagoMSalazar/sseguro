import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://clasificador.aduanero.com.ec/apiv1/', {
          withCredentials: true,
        });
        if (response.data.profile) {
          setUser(response.data.profile);
          console.log('Usuario autenticado:', response.data.profile.roles);
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

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        'https://clasificador.aduanero.com.ec/apiv1/auth/login',
        { username, password },
        { withCredentials: true }
      );
      if (response.data.profile) {
        setUser(response.data.profile);
      } else {
        throw new Error('No se recibió información del usuario');
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  // Función para registrar un nuevo usuario
  const register = async ( userData ) => {
    try {
      const response = await axios.post('https://clasificador.aduanero.com.ec/apiv1/auth/register', {
        fullName: userData.fullName,
        username: userData.username, // correo electrónico
        password: userData.password,
        cedula: userData.cedula,
        telefono: userData.telefono,
        direccion: userData.direccion,
        fechaNacimiento: userData.fechaNacimiento,
        genero: userData.genero

      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al registrar');
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axios.get('https://clasificador.aduanero.com.ec/apiv1/auth/logout', { withCredentials: true });
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