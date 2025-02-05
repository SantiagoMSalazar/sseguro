// src/components/SharedNotes.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SharedNotes = () => {
  const navigate = useNavigate();
  
  // Estado para almacenar las notas compartidas
  const [sharedNotes, setSharedNotes] = useState([]);
  // Estado para manejar la carga
  const [isLoading, setIsLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  useEffect(() => {
    
    setSharedNotes([
      {
        id: 1,
        title: 'Nota Compartida 1',
        content: 'Esta nota fue compartida por otro usuario...',
        date: '01/02/2025',
        sharedBy: 'Usuario 1'
      },
      // Más notas de ejemplo...
    ]);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Main Content */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-4 auto-rows-min">
          {isLoading ? (
            <div className="col-span-4 text-center py-8">
              Cargando notas compartidas...
            </div>
          ) : error ? (
            <div className="col-span-4 text-center py-8 text-red-400">
              {error}
            </div>
          ) : (
            sharedNotes.map((note) => (
              <div 
                key={note.id} 
                className="bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] min-h-[150px]"
                onClick={() => navigate(`/notes/view/${note.id}`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{note.title}</h3>
                  <span className="text-xs text-gray-400">{note.date}</span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {note.content}
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  Compartido por: {note.sharedBy}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedNotes;