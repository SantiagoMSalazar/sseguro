import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedAdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  // Verificar si el usuario es admin
  if (!user || user.rol !== 'admin') {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;