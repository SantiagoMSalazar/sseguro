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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await axios.put('/users/profile', formData, {
        withCredentials: true
      });
      await fetchProfile(); // Actualizar datos en el contexto
      setSuccessMessage('Perfil actualizado correctamente');
      setTimeout(() => navigate('/profile'), 2000); // Redirigir después de 2 segundos
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