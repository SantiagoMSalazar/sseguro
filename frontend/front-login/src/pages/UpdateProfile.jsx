import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, fetchProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    genero: '',
    ocupacion: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        telefono: user.telefono || '',
        direccion: user.direccion || '',
        fecha_nacimiento: user.fecha_nacimiento?.split('T')[0] || '',
        genero: user.genero || '',
        ocupacion: user.ocupacion || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = {};

    // Validaciones específicas por campo
    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'El correo es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Ingrese un correo válido';
        }
        break;

      case 'telefono':
        if (!value.trim()) {
          newErrors.telefono = 'El teléfono es requerido';
        } else if (!/^\d{10}$/.test(value)) {
          newErrors.telefono = 'Ingrese un teléfono válido de 10 dígitos';
        }
        break;

      case 'direccion':
        if (!value.trim()) {
          newErrors.direccion = 'La dirección es requerida';
        } else if (value.length > 200) {
          newErrors.direccion = 'La dirección no puede exceder los 200 caracteres';
        } else if (/[<>{}()\\/\\]|script|SELECT|INSERT|UPDATE|DELETE|DROP|UNION|WHERE/i.test(value)) {
          newErrors.direccion = 'La dirección contiene caracteres no permitidos';
        } else if (/['";]/.test(value)) {
          newErrors.direccion = 'No se permiten comillas ni punto y coma en la dirección';
        } else if (/-{2,}/.test(value)) {
          newErrors.direccion = 'No se permiten guiones consecutivos';
        } else if (/\s{3,}/.test(value)) {
          newErrors.direccion = 'Demasiados espacios consecutivos';
        }
        break;

      case 'fecha_nacimiento':
        if (!value) {
          newErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
        } else {
          const fechaNac = new Date(value);
          const hoy = new Date();
          if (fechaNac > hoy) {
            newErrors.fecha_nacimiento = 'La fecha no puede ser mayor a la actual';
          }
          // Verificar si es menor de edad
          const edad = hoy.getFullYear() - fechaNac.getFullYear();
          if (edad < 18) {
            if (!window.confirm('Al ser menor de edad, acepta estar en compañia de un tutor especial? (Representante de sus datos personales)')) {
              newErrors.fecha_nacimiento = 'Debe aceptar que es menor de edad';
              return;
            }
          }
        }
        break;

      case 'genero':
        if (!value) {
          newErrors.genero = 'Seleccione un género';
        }
        break;
      case 'ocupacion':
        if (!value.trim()) {
          newErrors.ocupacion = 'La ocupación es requerida';
        } else if (value.length > 50) {
          newErrors.ocupacion = 'La ocupación no puede exceder los 50 caracteres';
        } else if (/[<>{}()/\\]|script|SELECT|INSERT|UPDATE|DELETE|DROP|UNION|WHERE/i.test(value)) {
          newErrors.ocupacion = 'La ocupación contiene caracteres no permitidos';
        } else if (/['";]/.test(value)) {
          newErrors.ocupacion = 'No se permiten comillas ni punto y coma en la ocupación';
        } else if (/\s{2,}/.test(value)) {
          newErrors.ocupacion = 'No se permiten espacios consecutivos';
        
        } 
        break;
    }

    // Si hay errores, mostrarlos
    if (Object.keys(newErrors).length > 0) {
      setError(Object.values(newErrors)[0]); // Mostrar el primer error
      return;
    }

    // Si no hay errores, actualizar el estado
    setError('');
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validar todos los campos antes de enviar
    const allErrors = {};

    // Validar email
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      allErrors.email = 'Ingrese un correo válido';
    }

    // Validar teléfono
    if (!formData.telefono.trim() || !/^\d{10}$/.test(formData.telefono)) {
      allErrors.telefono = 'Ingrese un teléfono válido de 10 dígitos';
    }

    // Validar dirección
    if (!formData.direccion.trim()) {
      allErrors.direccion = 'La dirección es requerida';
    }

    // Validar fecha de nacimiento
    if (!formData.fecha_nacimiento) {
      allErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const fechaNac = new Date(formData.fecha_nacimiento);
      const hoy = new Date();
      if (fechaNac > hoy) {
        allErrors.fecha_nacimiento = 'La fecha no puede ser mayor a la actual';
      }
    }

    // Validar género
    if (!formData.genero) {
      allErrors.genero = 'Seleccione un género';
    }

    // Si hay errores, mostrar el primero y detener el envío
    if (Object.keys(allErrors).length > 0) {
      setError(Object.values(allErrors)[0]);
      return;
    }

    // Si no hay errores, proceder con el envío
    try {
      await axios.put('/users/profile', formData, {
        withCredentials: true
      });
      await fetchProfile();
      setSuccessMessage('Perfil actualizado correctamente');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <Header />

      <div className="max-w-5xl mx-auto px-8 py-8">
        <h1 className="text-2xl mb-6">Actualizar Perfil</h1>

        {error && <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-3 mb-4 rounded">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0D4E2C]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0D4E2C]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0D4E2C]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Fecha de nacimiento</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0D4E2C]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0D4E2C]"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Ocupación</label>
              <input
                type="text"
                name="ocupacion"
                value={formData.ocupacion}
                onChange={handleChange}
                className="w-full bg-[#2D2D2D] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0D4E2C]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#0D4E2C] text-white px-6 py-2 rounded hover:bg-[#0b3d24] transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;