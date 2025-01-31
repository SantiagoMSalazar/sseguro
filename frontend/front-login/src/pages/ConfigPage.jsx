// src/components/ConfigPage.jsx
import { useNavigate } from 'react-router-dom';

const ConfigPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <nav className="flex justify-between px-4 py-3 text-sm border-b border-gray-800">
        <div className="flex justify-between w-full">
          <span className="cursor-pointer hover:text-gray-300">Inicio</span>
          <span className="cursor-pointer hover:text-gray-300">Mis Notas</span>
          <span className="cursor-pointer hover:text-gray-300">Configuración</span>
          <span className="cursor-pointer hover:text-gray-300">Soporte y documentación</span>
          <div className="w-6 h-6 rounded-full bg-gray-700 cursor-pointer"></div>
        </div>
      </nav>

      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-2xl text-center mb-16">Configuración</h2>
        
        {/* Buttons Container */}
        <div className="flex justify-center gap-8">
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded w-40"
            onClick={() => navigate('/update-profile')}
          >
            Perfil
          </button>
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded w-40"
            onClick={() => navigate('/lopdp-permissions')}
          >
            Permisos LOPDP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;