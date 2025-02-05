import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const LopdpPermissions = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    nombres: { share: false, date: '' },
    apellidos: { share: false, date: '' },
    cedula: { share: false, date: '' },
    edad: { share: false, date: '' },
    direccion: { share: false, date: '' },
    correo: { share: false, date: '' },
    telefono: { share: false, date: '' },
    contactoEmergencia: { share: false, date: '' }
  });

  const handleToggle = (field) => {
    setPermissions(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        share: !prev[field].share
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

  const handleSubmit = () => {
    console.log('Permisos a enviar:', permissions);
  };

  const fieldLabels = {
    nombres: 'Tratamiento de nombres',
    apellidos: 'Tratamiento de Apellidos',
    cedula: 'Cédula',
    edad: 'Edad',
    direccion: 'Dirección',
    correo: 'Correo electrónico',
    telefono: 'Teléfono',
    contactoEmergencia: 'Contacto de emergencia'
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
              <tr className="text-center">
                <th className="py-2 px-4">Permiso</th>
                <th className="py-2 px-4">Compartir datos</th>
                <th className="py-2 px-4">Fecha límite</th>
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
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      value={permissions[field].date}
                      onChange={(e) => handleDateChange(field, e.target.value)}
                      className="bg-gray-700 rounded px-2 py-1 text-center"
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
