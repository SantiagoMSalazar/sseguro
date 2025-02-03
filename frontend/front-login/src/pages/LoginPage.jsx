import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

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
    if (validateForm()) {
      try {
        await login(formData.username, formData.password);
        navigate('/home');
      } catch (error) {
        alert(error.message);
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
            className={`w-full bg-transparent border-b py-2 text-white focus:outline-none ${
              errors.username ? 'border-red-500' : 'border-gray-700'
            }`}
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
            className={`w-full bg-transparent border-b py-2 text-white focus:outline-none ${
              errors.password ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-cyan-800 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;