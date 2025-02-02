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
          <div className="text-gray-300 space-y-6">
            <h2 className="text-xl font-bold text-center mb-8">
              ACUERDO DE CONSENTIMIENTO PARA EL TRATAMIENTO DE DATOS PERSONALES Y PRIVACIDAD
            </h2>
            <p className="text-sm italic">Fecha de última actualización: 2 de febrero del 2025</p>

            <div className="space-y-4">
              <section>
                <h3 className="font-bold mb-2">1. INTRODUCCIÓN</h3>
                <p>El presente documento constituye el Acuerdo de Tratamiento de Datos Personales (en adelante, el &quot;Acuerdo&quot;) entre ShareNotes (en adelante, el &quot;Responsable del Tratamiento&quot; ) y el usuario del sistema (en adelante, el &quot;Titular de los Datos&quot;), de conformidad con la Ley Orgánica de Protección de Datos Personales del Ecuador y su normativa aplicable.</p>
              </section>

              <section>
                <h3 className="font-bold mb-2">2. OBJETO DEL ACUERDO</h3>
                <p>El presente Acuerdo tiene por objeto establecer los términos y condiciones bajo los cuales ShareNotes recolectará, almacenará, utilizará, procesará y, en su caso, compartirá los datos personales del Titular de los Datos en el contexto de la plataforma.</p>
                <p>Este consentimiento es obligatorio para el uso del sistema, sin perjuicio de que el Titular pueda revocar, modificar o aceptar nuevos consentimientos en cualquier momento, según los mecanismos proporcionados en el sistema.</p>
              </section>

              <section>
                <h3 className="font-bold mb-2">3. DATOS PERSONALES OBJETO DE TRATAMIENTO</h3>
                <p>Los datos personales que serán objeto de tratamiento incluyen, pero no se limitan a:</p>
                <ul className="list-disc pl-6">
                  <li>Información de perfil del usuario (nombre, correo electrónico, nombre de usuario)</li>
                  <li>Datos de contacto (correo electrónico, teléfono -si aplica-)</li>
                  <li>Información de uso del sistema (registro de actividad, preferencias, interacción con notas y usuarios)</li>
                  <li>Notas almacenadas (incluyendo contenido y metadatos)</li>
                </ul>
              </section>

              {/* Continue with similar sections for the rest of the agreement */}

              <section className="border-t border-gray-700 pt-4 mt-6">
                <p className="text-sm text-center">Para más información o consultas, contacte a:</p>
                <div className="text-sm text-center">
                  <p>📩 Correo electrónico: [correo de contacto]</p>
                  <p>📞 Teléfono: [número de contacto]</p>
                  <p>📍 Dirección: [dirección del responsable]</p>
                </div>
              </section>
            </div>
          </div>
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
          <div className='flex justify-center space-x-4'>
          <button
            className={`px-8 py-2 rounded w-fit ${isChecked
                ? 'bg-black text-white cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!isChecked}
            onClick={handleContinue}
          >
            Continuar
          </button>
          <button
            className={`px-8 py-2 rounded w-fit  bg-black text-white cursor-pointer`}
            disabled={!isChecked}
            onClick={handleContinue}
          >
            Cancelar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;