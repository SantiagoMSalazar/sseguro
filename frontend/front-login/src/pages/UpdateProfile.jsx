// src/components/UpdateProfile.jsx
import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    nombres: 'Juan David',
    apellido: 'Aber Acosta',
    cedula: '1789453634',
    edad: '32 Años',
    direccion: 'Juan y Av. Galo',
    correo: 'juan.aber@epn.edu.ec',
    telefono: '+593 99 3456 567',
    contactoEmergencia: 'Giblert Andrade / +593 99 3456 565'
  });

  const [editMode, setEditMode] = useState({});
  const [lockedFields, setLockedFields] = useState({});

  const FieldWithControls = ({ field, label }) => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex-grow">
          <label className="text-white">{label}</label>
          <div className="flex items-center">
            {editMode[field] ? (
              <input
                type="text"
                value={profileData[field]}
                onChange={(e) => setProfileData({...profileData, [field]: e.target.value})}
                className="w-full bg-transparent border-b border-gray-700 py-1 text-white focus:outline-none"
              />
            ) : (
              <div className="border-b border-gray-700 py-1 w-full text-white">
                {profileData[field]}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 ml-4">
          <button 
            className="text-green-500 hover:text-green-400"
            onClick={() => {
              setEditMode({...editMode, [field]: false});
              setLockedFields({...lockedFields, [field]: true});
            }}
          >
            ✓
          </button>
          <button 
            className="text-blue-500 hover:text-blue-400"
            onClick={() => setEditMode({...editMode, [field]: true})}
          >
            ✎
          </button>
          <button 
            className="text-red-500 hover:text-red-400"
            onClick={() => setProfileData({...profileData, [field]: ''})}
          >
            ×
          </button>
        </div>
      </div>
    );
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
        <h2 className="text-2xl text-center mb-8">Bienvenido</h2>

        <div className="flex justify-between items-start">
          {/* Left Side */}
          <div className="w-2/3">
            <div className="space-y-8">
              <section>
                <h3 className="text-white font-bold mb-4">Información del Perfil</h3>
                <FieldWithControls field="nombres" label="Nombres" />
                <FieldWithControls field="apellido" label="Apellido" />
                <FieldWithControls field="cedula" label="Cédula" />
                <FieldWithControls field="edad" label="Edad" />
              </section>

              <section>
                <h3 className="text-white font-bold mb-4">Datos de contacto</h3>
                <FieldWithControls field="direccion" label="Dirección" />
                <FieldWithControls field="correo" label="Correo" />
                <FieldWithControls field="telefono" label="Teléfono" />
                <FieldWithControls field="contactoEmergencia" label="Contacto de emergencia" />
              </section>
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="w-1/3 flex flex-col items-center mt-16">
            <div className="relative w-64 h-64 rounded-full bg-gray-700 overflow-hidden group">
              <img 
                src="/path-to-profile-image.jpg" 
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="flex gap-4">
                  <button className="text-white hover:text-blue-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="text-white hover:text-red-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Finalizar edición
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;