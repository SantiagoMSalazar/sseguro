import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C1C1C] text-white">
      <div className='text-center'> 
      <h1 className='font-bold text-3xl'>Bienvenido al Registro de notas</h1>
      <p>Nuestra prioridad es tu seguridad</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#2C2C2C] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-cyan-800 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;