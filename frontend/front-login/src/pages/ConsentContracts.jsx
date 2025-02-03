// src/components/ConsentContracts.jsx
import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const ConsentContracts = () => {
  const navigate = useNavigate();
  
  // Estado inicial para los consentimientos
  const [consents, setConsents] = useState([
    {
      id: 1,
      type: 'Tratamiento de datos personales',
      acceptanceDate: '01/02/2025',
      expirationDate: '01/02/2026',
      status: 'Activo'
    },
    {
      id: 2,
      type: 'Almacenamiento y procesamiento de notas',
      acceptanceDate: '01/02/2025',
      expirationDate: '01/02/2026',
      status: 'Activo'
    },
    {
      id: 3,
      type: 'Compartición de datos con terceros',
      acceptanceDate: '01/02/2025',
      expirationDate: '01/02/2026',
      status: 'Revocado'
    },
    {
      id: 4,
      type: 'Uso de cookies y analítica',
      acceptanceDate: '01/02/2025',
      expirationDate: '01/02/2026',
      status: 'Activo'
    },
    {
      id: 5,
      type: 'Comunicaciones y notificaciones',
      acceptanceDate: '01/02/2025',
      expirationDate: '01/02/2026',
      status: 'Activo'
    }
  ]);

  const toggleStatus = (id) => {
    setConsents(prevConsents =>
      prevConsents.map(consent =>
        consent.id === id
          ? {
              ...consent,
              status: consent.status === 'Activo' ? 'Revocado' : 'Activo'
            }
          : consent
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header Nav */}
      <Header />

      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-2xl text-center mb-8">Contratos de consentimiento</h2>

        <div className="bg-[#242424] rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4">Tipo de consentimiento otorgado</th>
                <th className="py-3 px-4">Fecha de aceptación</th>
                <th className="py-3 px-4">Fecha de expiración</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Modificar estado</th>
              </tr>
            </thead>
            <tbody>
              {consents.map((consent) => (
                <tr key={consent.id} className="border-b border-gray-700">
                  <td className="py-4 px-4">{consent.type}</td>
                  <td className="py-4 px-4">{consent.acceptanceDate}</td>
                  <td className="py-4 px-4">{consent.expirationDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded ${
                      consent.status === 'Activo' 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {consent.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleStatus(consent.id)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsentContracts;