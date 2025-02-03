import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    cedula: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    genero: ''
  });

  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Validación nombre completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.fullName)) {
      newErrors.fullName = 'Ingrese un nombre válido';
    }

    // Validación email
    if (!formData.username.trim()) {
      newErrors.username = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.username)) {
      newErrors.username = 'Ingrese un correo válido';
    }

    // Validación contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación cédula
    if (!formData.cedula.trim()) {
      newErrors.cedula = 'La cédula es requerida';
    } else if (!/^\d{8,10}$/.test(formData.cedula)) {
      newErrors.cedula = 'Ingrese una cédula válida';
    }

    // Validación teléfono
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'Ingrese un teléfono válido';
    }

    // Validación dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }

    // Validación fecha de nacimiento
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    }

    // Validación género
    if (!formData.genero) {
      newErrors.genero = 'Seleccione un género';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData);
        navigate('/login');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1C1C1C] p-4">
  <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 className="text-2xl font-bold text-center mb-6 text-white">Registrarse</h2>
    
    <div className="space-y-4">
      <div>
        <input 
          type="text"
          name="fullName"
          placeholder="Nombre y apellido (John Doe)"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.fullName ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <input
          type="email"
          name="username"
          placeholder="Correo electrónico"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.username ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.password ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <input 
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.cedula ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
        />
        {errors.cedula && <p className="text-red-500 text-sm mt-1">{errors.cedula}</p>}
      </div>

      <div>
        <input 
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.telefono ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
        />
        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
      </div>

      <div>
        <input 
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.direccion ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
        />
        {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
      </div>

      <div>
        <input type="text"
        name='ocupacion'
        placeholder='Ocupación'
        value={formData.ocupacion}
        onChange={handleChange}
        className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
          errors.ocupacion ? 'border-red-500' : 'border-gray-700'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}        
        />
      </div>
      <div>
        <input 
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.fechaNacimiento ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent
          [&::-webkit-calendar-picker-indicator]:bg-[#0D4E2C]
          [&::-webkit-calendar-picker-indicator]:hover:bg-[#0A3D22]
          [&::-webkit-calendar-picker-indicator]:p-1
          [&::-webkit-calendar-picker-indicator]:rounded
          [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
        />
        {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
      </div>

      <div>
        <select 
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${
            errors.genero ? 'border-red-500' : 'border-gray-700'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent`}
        >
          <option value="" className="bg-[#1C1C1C]">Seleccione su género</option>
          <option value="masculino" className="bg-[#1C1C1C]">Masculino</option>
          <option value="femenino" className="bg-[#1C1C1C]">Femenino</option>
        </select>
        {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#0D4E2C] text-white py-2 px-4 rounded-md hover:bg-[#0A3D22] transition duration-200 ease-in-out font-medium"
      >
        Registrarse
      </button>
    </div>
  </form>
</div>
  );
};

export default RegisterPage;