// src/components/NotesGrid.jsx 
import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según tu estructura

const NotesGrid = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Nota 1',
      date: new Date().toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }),
      content: 'Texto de una nota que puede encontrar como ejemplo solamente de como se puede verse la extensión...'
    }
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleExportData = () => {
    // Crear el objeto para exportar
    const dataToExport = {
      notes: notes,
      exportDate: new Date().toISOString()
    };

    // Convertir a JSON string
    const jsonString = JSON.stringify(dataToExport, null, 2);
    
    // Crear blob y descargar
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notas_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <Header/>

      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleExportData}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Exportar datos
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="px-8">
        
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default NotesGrid;