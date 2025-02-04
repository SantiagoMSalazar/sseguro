// src/components/LopdpPermissions.jsx
import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const LopdpPermissions = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    nombres: { publico: false, nocompartir: false, anonimizar: false, date: '' },
    apellidos: { publico: false, nocompartir: false, anonimizar: false, date: '' },
    cedula: { publico: false, nocompartir: false, verificacion: false, date: '' },
    edad: { publico: false, nocompartir: false, anonimizar: false, date: '' },
    direccion: { publico: false, nocompartir: false, solociudad: false, date: '' },
    correo: { publico: false, nocompartir: false, anonimizar: false, date: '' },
    telefono: { publico: false, nocompartir: false, solociudad: false, date: '' },
    contactoEmergencia: { publico: false, nocompartir: false, anonimizar: false, date: '' }
  });

  const handleOptionChange = (field, option) => {
    setPermissions(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [option]: !prev[field][option]
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
    // Aquí iría la lógica para enviar al backend
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
      {/* Header Nav */}
      <Header/>

      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-2xl text-center mb-8">Permisos LOPD</h2>

        <div className="bg-[#242424] rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4">Permiso</th>
                <th className="py-2 px-4">Público</th>
                <th className="py-2 px-4">No compartir</th>
                <th className="py-2 px-4">Anonimizar/Solo ciudad/Verificación</th>
                <th className="py-2 px-4">Fecha límite</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fieldLabels).map(([field, label]) => (
                <tr key={field} className="border-t border-gray-700">
                  <td className="py-3 px-4">{label}</td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={permissions[field].publico}
                      onChange={() => handleOptionChange(field, 'publico')}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={permissions[field].nocompartir}
                      onChange={() => handleOptionChange(field, 'nocompartir')}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={permissions[field][field === 'cedula' ? 'verificacion' : 
                                              field === 'direccion' || field === 'telefono' ? 'solociudad' : 
                                              'anonimizar']}
                      onChange={() => handleOptionChange(field, field === 'cedula' ? 'verificacion' : 
                                                              field === 'direccion' || field === 'telefono' ? 'solociudad' : 
                                                              'anonimizar')}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      value={permissions[field].date}
                      onChange={(e) => handleDateChange(field, e.target.value)}
                      className="bg-gray-700 rounded px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
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