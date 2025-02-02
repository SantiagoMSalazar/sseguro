import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://82.197.66.199:5009', {
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
        'http://82.197.66.199:5009/auth/login',
        { email:username, password },
        { withCredentials: true }
      );
      if (response.data.profile) {
        setUser(response.data.profile);
      } else {
        throw new Error('No se recibió información del usuario');
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión'+error);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async ( userData ) => {
    try {
      const response = await axios.post('http://82.197.66.199:5009/user/users', {
        nombre: userData.fullName,
        email: userData.username, // correo electrónico
        password: userData.password,
        cedula: userData.cedula,
        telefono: userData.telefono,
        direccion: userData.direccion,
        fecha_nacimiento: userData.fechaNacimiento,
        ocupacion: userData.ocupacion,

        /*
      "email": "test2@epn.edu.ec",
      "password": "Te2t123!",
      "nombre": "Tetst User", 
      "cedula": "0412345679",
      "telefono": "0998765433",
      "direccion": "Av. Test",
      "fecha_nacimiento": "1990-05-16",
      "ocupacion": "User",
        */

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