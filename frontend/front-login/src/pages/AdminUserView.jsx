import { useUserSelection } from '../context/UserSelectionContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUserView = () => {
  const { selectedUser } = useUserSelection();
  const navigate = useNavigate();

  // Si no hay usuario seleccionado, regresar a la lista de usuarios
  useEffect(() => {
    if (!selectedUser) {
      navigate('/users-list');
    }
  }, [selectedUser, navigate]);

  if (!selectedUser) return <p className="text-center text-white">Cargando usuario...</p>;

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white px-8 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Perfil del Usuario</h1>
      <div className="max-w-xl mx-auto bg-[#2a2a2a] rounded-lg p-6 shadow-lg">
        <div className="flex items-center space-x-6 mb-6">
          {selectedUser.profilePicture ? (
            <img
              src={selectedUser.profilePicture}
              alt={selectedUser.nombre}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{selectedUser.nombre}</h2>
            {selectedUser.isAnonymous && <p className="text-sm text-gray-400">(Usuario Anónimo)</p>}
          </div>
        </div>

        <div className="space-y-4">
          <p><span className="font-semibold">Correo:</span> {selectedUser.email || 'No disponible'}</p>
          <p><span className="font-semibold">Cédula:</span> {selectedUser.cedula || 'No disponible'}</p>
          <p><span className="font-semibold">Teléfono:</span> {selectedUser.telefono || 'No disponible'}</p>
          <p><span className="font-semibold">Dirección:</span> {selectedUser.direccion || 'No disponible'}</p>
          <p><span className="font-semibold">Fecha de nacimiento:</span> {selectedUser.fecha_nacimiento || 'No disponible'}</p>
          <p><span className="font-semibold">Género:</span> {selectedUser.genero || 'No disponible'}</p>
          <p><span className="font-semibold">Ocupación:</span> {selectedUser.ocupacion || 'No disponible'}</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <button 
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
          onClick={() => navigate('/users-list')}
        >
          Volver a la lista de usuarios
        </button>
      </div>
    </div>
  );
};

export default AdminUserView;
