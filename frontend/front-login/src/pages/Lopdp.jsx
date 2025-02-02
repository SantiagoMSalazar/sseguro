// src/components/Dashboard.jsx
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header Nav */}
      <nav className="flex justify-between px-4 py-3 text-sm border-b border-gray-800">
        <div className="flex justify-between w-full">
        <span 
             className="cursor-pointer hover:text-gray-300"
             onClick={() => navigate('/notes')}
        >
             Mis Notas
        </span>
          <span className="cursor-pointer hover:text-gray-300">Publicar datos</span>
          <span className="cursor-pointer hover:text-gray-300">LOPDP</span>
        </div>
      </nav>

      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="px-8">
        <h2 className="text-2xl text-center mb-8">Lopdp</h2>

        <div className="mb-4">
          <h3 className="text-lg mb-4">LEGAL</h3>
        </div>

        {/* Legal Text Box */}
        <div className="bg-[#242424] rounded-lg p-6 mb-6 h-[400px] overflow-y-auto mx-4">
          <div className="text-gray-300 space-y-4">
            <p>
              El presente documento constituye el acuerdo de tratamiento de datos personales (en adelante, el "Acuerdo") entre ShareNotes (en adelante, el "Responsable del 
              Tratamiento") y el usuario del sistema (en adelante, el "Titular de los Datos"), de conformidad con la Ley Orgánica de Protección de Datos Personales del Ecuador y su 
              normativa aplicable.
            </p>
            <p>
              El presente Acuerdo tiene por objeto establecer los términos y condiciones bajo los cuales el Responsable del Tratamiento recolectará, almacenará, utilizará, procesará y, 
              en su caso, compartirá los datos personales del Titular de los Datos en el contexto del sistema ShareNotes.
            </p>
            <p>
              Los datos personales que serán objeto de tratamiento incluyen:
              <ul className="list-disc pl-6 mt-2">
                <li>Información de perfil de usuario</li>
                <li>Datos de contacto</li>
                <li>Contenido de las notas creadas</li>
                <li>Preferencias de privacidad y configuración</li>
                <li>Información de uso del sistema</li>
              </ul>
            </p>
            <p>
              Los datos personales serán tratados para las siguientes finalidades:
              a) Gestión y administración del sistema ShareNotes b) Permitir la compartición de notas según las preferencias del usuario c) Facilitar la interacción entre usuarios del 
              sistema d) Mantener la seguridad y funcionalidad del servicio e) Cumplir con obligaciones legales aplicables
            </p>
            <p>
              El Titular de los Datos tiene derecho a:
              5.1. Acceder a sus datos personales 5.2. Solicitar la rectificación de datos inexactos 5.3. Configurar sus preferencias de privacidad 5.4. Revocar el consentimiento 
              otorgado 5.5. Solicitar la eliminación de sus datos 5.6. Conocer el uso que se da a sus datos personales 5.7. Oponerse al tratamiento de sus datos
            </p>
          </div>
        </div>

        <div className="flex justify-end mx-4">
          <button className="bg-black text-white px-6 py-2 rounded">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;