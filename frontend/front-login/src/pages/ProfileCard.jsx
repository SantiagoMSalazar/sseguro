import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const navigate = useNavigate();

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
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex justify-between items-start">
          {/* Left Side */}
          <div className="w-2/3">
            <h2 className="text-2xl mb-8">Bienvenido</h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-white font-bold mb-4">Información del Perfil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Nombres</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Apellido</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Cédula</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Edad</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-white font-bold mb-4">Datos de contacto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Dirección</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Correo</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Teléfono</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Contacto de emergencia</label>
                    <div className="border-b border-gray-700 py-1">{/* Datos del backend */}</div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="w-1/3 flex justify-center mt-16">
            <div className="w-64 h-64 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
              <svg 
                className="w-32 h-32 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between mt-8">
          <button className="bg-[#0D4E2C] text-white px-4 py-2 rounded">
            Exportar datos
          </button>
          <button className="text-gray-400 text-sm">
            Ver Solicitud de consentimiento
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;