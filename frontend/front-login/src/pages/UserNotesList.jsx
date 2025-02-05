import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserSelection } from '../context/UserSelectionContext';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:3000/admin/users';

const UserNotesList = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const { setSelectedUser } = useUserSelection();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Error al obtener usuarios');

        const data = await response.json();
        setUsers(data.map(user => ({
          id: user.id,
          nombre: user.isAnonymous ? "Usuario Anónimo" : user.nombre,
          email: user.email,
          cedula: user.cedula,
          telefono: user.telefono,
          direccion: user.direccion,
          fecha_nacimiento: user.fecha_nacimiento,
          genero: user.genero,
          ocupacion: user.ocupacion,
          profilePicture: user.profilePicture || null,
          isAnonymous: user.isAnonymous || false
        })));
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate('/admin-userView'); 
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-center text-2xl mb-6">Lista de Usuarios</h2>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">Cargando usuarios...</div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="w-full flex items-center justify-between bg-[#2a2a2a] rounded-lg px-6 py-3 hover:bg-[#333333] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.nombre}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  <span className="text-lg">{user.nombre}</span>
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