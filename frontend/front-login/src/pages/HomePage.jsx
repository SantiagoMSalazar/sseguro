import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserHomeComponent from '../components/Home/UserHomeComponent';
import AdminHomeComponent from '../components/Home/AdminHomeComponent';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-6 rounded shadow-md text-black">
      {user?.role === 'admin' ? <AdminHomeComponent /> : <UserHomeComponent />}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white p-2 rounded mt-4"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
  );
};

export default HomePage;