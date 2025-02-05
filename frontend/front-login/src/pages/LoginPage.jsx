import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(0); // Contador de intentos fallidos
  const [isFormBlocked, setIsFormBlocked] = useState(false); // Estado para bloquear el formulario
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Límite de intentos permitidos
  const MAX_ATTEMPTS = 3;

  // Efecto para bloquear el formulario después de alcanzar el límite de intentos
  useEffect(() => {
    if (failedAttempts >= MAX_ATTEMPTS) {
      setIsFormBlocked(true);
      const timer = setTimeout(() => {
        setIsFormBlocked(false);
        setFailedAttempts(0); // Reiniciar el contador después de un tiempo
      }, 30000); // Bloquear por 30 segundos (ajusta el tiempo según sea necesario)
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  const validateForm = () => {
    const newErrors = {};

    // Validación de email
    if (!formData.username.trim()) {
      newErrors.username = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
      newErrors.username = 'Ingrese un correo válido';
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormBlocked) {
      alert('Demasiados intentos fallidos. Por favor, espere 30 segundos antes de intentar nuevamente.');
      return;
    }

    if (validateForm()) {
      try {
        const loginResponse = await login(formData.username, formData.password);
        if (loginResponse.rol === 'admin') {
          navigate('/users-list');
        } else {
          navigate('/notes');
        }
        setFailedAttempts(0); // Reiniciar el contador si el inicio de sesión es exitoso
      } catch (error) {
        setFailedAttempts((prevAttempts) => prevAttempts + 1); // Incrementar el contador de intentos fallidos
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        } else {
          alert('Error al iniciar sesión. Por favor, intente nuevamente.');
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1C] text-white">
      <div className='text-center'>
        <h1 className='font-bold text-3xl'>Bienvenido al Registro de Notas</h1>
        <p>Nuestra prioridad es tu seguridad</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#2C2C2C] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
          <input
            type="email"
            name="username"
            placeholder="Correo electrónico"
            value={formData.username}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-2 text-white focus:outline-none ${errors.username ? 'border-red-500' : 'border-gray-700'
              }`}
            disabled={isFormBlocked} // Deshabilitar el campo si el formulario está bloqueado
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={`w-full bg-transparent border-b py-2 text-white focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-700'
              }`}
            disabled={isFormBlocked} // Deshabilitar el campo si el formulario está bloqueado
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-800 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          disabled={isFormBlocked} // Deshabilitar el botón si el formulario está bloqueado
        >
          {isFormBlocked ? `Espere 30 segundos...` : 'Iniciar Sesión'}
        </button>

        {/* Mensaje con enlace de registro */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          ¿No tienes una cuenta?
          <span
            className="text-cyan-500 cursor-pointer hover:underline ml-1"
            onClick={() => navigate('/consent-form-register')}
          >
            Regístrate aquí
          </span>
        </p>

        {/* Mostrar mensaje si se alcanza el límite de intentos */}
        {failedAttempts >= MAX_ATTEMPTS && (
          <p className="text-red-500 text-sm mt-4 text-center">
            Demasiados intentos fallidos. Por favor, espere 30 segundos antes de intentar nuevamente.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;