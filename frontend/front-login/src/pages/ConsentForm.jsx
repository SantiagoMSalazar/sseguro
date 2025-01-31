import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsentForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <nav className="flex justify-between px-4 py-3 text-sm border-b border-gray-800">
        <div className="flex justify-between w-full">
          <span className="cursor-pointer hover:text-gray-300">Inicio</span>
          <span className="cursor-pointer hover:text-gray-300">Mis Notas</span>
          <span 
            className="cursor-pointer hover:text-gray-300"
            onClick={() => navigate('/config')}
          >
            Configuración
          </span>
          <span className="cursor-pointer hover:text-gray-300">Soporte y documentación</span>
          <div className="w-6 h-6 rounded-full bg-gray-700 cursor-pointer"></div>
        </div>
      </nav>

      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="px-8">
        <h2 className="text-2xl text-center mb-8">Bienvenido</h2>
        
        <div className="mb-4 pl-4">
          <h3 className="text-lg">Acuerdo de confidencialidad de la información</h3>
        </div>

        {/* Agreement Box */}
        <div className="bg-[#242424] rounded-lg p-6 mb-6 h-[400px] overflow-y-auto mx-4">
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </p>
        </div>

        {/* Checkbox and Button */}
        <div className="flex flex-col space-y-4 pl-4">
          <label className="flex items-center space-x-2 text-sm">
            <input 
              type="checkbox" 
              className="form-checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>He leído y acepto los términos y condiciones establecidos en este Acuerdo de Tratamiento de Datos Personales.</span>
          </label>
          <button 
            className={`px-8 py-2 rounded w-fit ${
              isChecked 
                ? 'bg-black text-white cursor-pointer' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isChecked}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;