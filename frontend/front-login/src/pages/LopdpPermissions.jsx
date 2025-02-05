import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LopdpPermissions = () => {
  const navigate = useNavigate();
  const { updatePermissions } = useAuth();
  
  const today = new Date().toISOString().split('T')[0];

  const [permissions, setPermissions] = useState({
    nombres: { share: false, date: today },
    cedula: { share: false, date: today },
    edad: { share: false, date: today },
    direccion: { share: false, date: today },
    correo: { share: false, date: today },
    telefono: { share: false, date: today },
    genero: { share: false, date: today },
    ocupacion: { share: false, date: today },
  });

  const handleToggle = (field) => {
    setPermissions(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        share: !prev[field].share,
        date: !prev[field].share ? today : ''
      }
    }));
  };

  const handleDateChange = (field, date) => {
    setPermissions(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        date: date
      }
    }));
  };

  const fieldLabels = {
    nombres: 'Tratamiento de nombres',
    cedula: 'Cédula',
    edad: 'Edad',
    direccion: 'Dirección',
    correo: 'Correo electrónico',
    telefono: 'Teléfono',
    genero: 'Género',
    ocupacion: 'Ocupación'
  };

  const fieldNameMapping = {
    nombres: 'nombre',
    cedula: 'cedula',
    edad: 'fecha_nacimiento',
    direccion: 'direccion',
    correo: 'email',
    telefono: 'telefono',
    genero: 'genero',
    ocupacion: 'ocupacion'
  };

  const handleSubmit = async () => {
    try {
      // Función para obtener la fecha actual en formato YYYY-MM-DD
      const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
      };
  
      // Transformar los permisos al formato requerido
      const transformedPermissions = Object.entries(permissions)
        .map(([field, { share, date }]) => ({
          field_name: fieldNameMapping[field],
          is_visible: share,
          expiration_date: share ? date : getCurrentDate() // Si is_visible es false, usa la fecha actual
        }));
  
      // Enviar los permisos al backend
      await updatePermissions(transformedPermissions);
      navigate('/notes');
    } catch (error) {
      console.error('Error al actualizar permisos:', error);
    }
  };
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <Header />
      <div className="px-8 py-4 text-center">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>
      <div className="max-w-5xl mx-auto px-8 text-center">
        <h2 className="text-2xl mb-8">Permisos LOPD</h2>
        <div className="bg-[#242424] rounded-lg p-6 w-full">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="py-2 px-4">Permiso</th>
                <th className="py-2 px-4">Compartir</th>
                <th className="py-2 px-4">Fecha de expiración</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fieldLabels).map(([field, label]) => (
                <tr key={field} className="border-t border-gray-700">
                  <td className="py-3 px-4">{label}</td>
                  <td className="py-3 px-4 flex justify-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions[field].share}
                        onChange={() => handleToggle(field)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-checked:bg-green-500 rounded-full after:content-[''] after:w-5 after:h-5 after:bg-white after:absolute after:top-0.5 after:left-0.5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      value={permissions[field].date}
                      onChange={(e) => handleDateChange(field, e.target.value)}
                      className="bg-gray-700 rounded px-2 py-1 text-center"
                      disabled={!permissions[field].share}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LopdpPermissions;
