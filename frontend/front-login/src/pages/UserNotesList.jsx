// src/components/UserNotesList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserNotesList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar llamada al backend para obtener usuarios
    /*
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/users-with-public-notes');
        const data = await response.json();
        
        // Transformar los datos si es necesario
        const formattedUsers = data.map(user => ({
          id: user.id,
          name: user.name,
          profilePicture: user.profilePicture,
          isAnonymous: user.isAnonymous
        }));
        
        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
    */

    // Datos de ejemplo mientras no hay backend
    setUsers([
      {
        id: 1,
        name: 'Juan David Aber',
        profilePicture: '/path-to-image.jpg',
        isAnonymous: false
      },
      {
        id: 2,
        name: 'Anónimo 1',
        profilePicture: null,
        isAnonymous: true
      },
      {
        id: 3,
        name: 'Anónimo 2',
        profilePicture: null,
        isAnonymous: true
      }
    ]);
    setIsLoading(false);
  }, []);

  const handleUserClick = (userId) => {
    // Navegar a las notas compartidas del usuario seleccionado
    navigate(`/shared-notes`);
  };

  // Filtrar usuarios basado en la búsqueda
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-center text-2xl mb-6">Notas publicadas de los usuarios</h2>
        
        {/* Búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Lista de Usuarios */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">Cargando usuarios...</div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="w-full flex items-center justify-between bg-[#2a2a2a] rounded-lg px-6 py-3 hover:bg-[#333333] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <svg 
                        className="w-6 h-6 text-gray-400" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  <span className="text-lg">{user.name}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotesList;