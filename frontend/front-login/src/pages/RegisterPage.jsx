import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debe confirmar la contraseña';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
    // fecha de nacimiento inferior a fecha actual
    else if (new Date(formData.fechaNacimiento) > new Date()) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser mayor a la fecha actual';
    }
    //alerta de menor de edad- necesecita aceptar para tutor especial
    else if (new Date().getFullYear() - new Date(formData.fechaNacimiento).getFullYear() < 18) {
      if (!window.confirm('Al ser menor de edad, acepta estar en compañia de un tutor especial? (Representante de sus datos personales)')) {
        newErrors.fechaNacimiento = 'Debe aceptar que es menor de edad';
      }
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
      <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Registrarse</h2>

        {/* Campos en dos columnas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Nombre Completo */}
          <div>
            <label className="text-white">Nombre Completo</label>
            <input type="text" name="fullName" placeholder="Ej: Juan Pérez" value={formData.fullName} onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} 
              rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`} />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="text-white">Correo Electrónico</label>
            <input type="email" name="username" placeholder="Ej: usuario@email.com" value={formData.username} onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.username ? 'border-red-500' : 'border-gray-700'} 
              rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`} />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Contraseña */}
          <div>
            <label className="text-white">Contraseña</label>
            <input type="password" name="password" placeholder="Mínimo 6 caracteres" value={formData.password} onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.password ? 'border-red-500' : 'border-gray-700'} 
              rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="text-white">Confirmar Contraseña</label>
            <input type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={formData.confirmPassword} onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} 
              rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Cédula */}
          <div>
            <label className="text-white">Cédula</label>
            <input type="text" name="cedula" placeholder="Ej: 1234567890" value={formData.cedula} onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.cedula ? 'border-red-500' : 'border-gray-700'} 
              rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`} />
            {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula}</p>}
          </div>

          <div>
            <label className="block text-white">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              placeholder="Ej: 0999764781"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.telefono ? 'border-red-500' : 'border-gray-700'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
          </div>

          <div>
            <label className="block text-white">Dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.direccion ? 'border-red-500' : 'border-gray-700'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
            />
            {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
          </div>

          <div>
            <label className="block text-white">Ocupación</label>
            <input type="text"
              name='ocupacion'
              placeholder='Ocupación'
              value={formData.ocupacion}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.ocupacion ? 'border-red-500' : 'border-gray-700'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent placeholder-gray-400`}
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="text-white">Fecha de Nacimiento</label>
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-700'} 
              rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent`} />
            {errors.fechaNacimiento && <p className="text-red-500 text-sm">{errors.fechaNacimiento}</p>}
          </div>


          <div>
            <label className="block text-white">Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-[#1C1C1C] text-white border ${errors.genero ? 'border-red-500' : 'border-gray-700'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D4E2C] focus:border-transparent`}
            >
              <option value="" className="bg-[#1C1C1C]">Seleccione su género</option>
              <option value="masculino" className="bg-[#1C1C1C]">Masculino</option>
              <option value="femenino" className="bg-[#1C1C1C]">Femenino</option>
            </select>
            {errors.genero && <p className="text-red-500 text-sm mt-1">{errors.genero}</p>}
          </div>


        </div>


        {/* Botón de registro */}
        <button type="submit" className="w-full bg-[#0D4E2C] text-white py-2 rounded-md hover:bg-[#0A3D22] transition duration-200 ease-in-out font-medium mt-4">
          Registrarse
        </button>

        <p className="text-sm text-gray-400 mt-2 text-center">
          ¿Ya tienes una cuenta?
          <span className="text-cyan-500 cursor-pointer hover:underline ml-1" onClick={() => navigate('/login')}>
            Inicia sesión aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;