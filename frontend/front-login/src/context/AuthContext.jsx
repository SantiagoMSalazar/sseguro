import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

// Configuración base de Axios
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interceptor para manejar errores globales
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchProfile();
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/users/profile');
      // Asumiendo que el backend envía el rol del usuario en la respuesta del profile
      setUser(data);
      return data;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };
  const login = async (email, password) => {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axios.post('/auth/login', { email, password });
    const profileData = await fetchProfile();
    setUser(profileData);
    return profileData; // Retornar los datos del usuario incluyendo el rol
  };

  const register = async (userData) => {
    console.log(userData);
    const { data } = await axios.post('/auth/register', {
      nombre: userData.fullName,
      email: userData.username,
      password: userData.password,
      cedula: userData.cedula,
      telefono: userData.telefono,
      direccion: userData.direccion,
      fecha_nacimiento: userData.fechaNacimiento,
      genero: userData.genero,
      ocupacion: userData.ocupacion
    });
    return data;
  };
  const deleteAccount = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.delete('/users/delAcount');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };
  const logout = async () => {
    await axios.get('/auth/logout');
    setUser(null);
  };

  const updatePermissions = async (permissionsData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.put('/users/permissions', { 
        permissions: permissionsData 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login, 
      register, 
      logout,
      updatePermissions, 
      fetchProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};