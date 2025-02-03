import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between px-8 py-3 text-sm border-b border-gray-800">
      <div className="flex justify-between ps-8 w-full">
        <span 
          className="cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/notes')}
        >
          Mis Notas
        </span>
        <span 
          className="cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/config')}
        >
          Configuración
        </span>
        <span 
          className="cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/consents')}
        >
          Consentimientos
        </span>
        <img
          onClick={() => navigate('/profile')}
          src="/path-to-profile-image.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer object-cover"
        />
      </div>
    </nav>
  );
};

export default Header;
