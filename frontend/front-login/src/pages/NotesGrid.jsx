// src/components/NotesGrid.jsx
import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const NotesGrid = () => {
  const navigate = useNavigate();
  
  // Estado para las notas
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

  const handleNewNote = () => {
    navigate('/notes/new');
  };

  const handleNoteClick = (noteId) => {
    navigate(`/notes/edit/${noteId}`);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header Nav */}
      <Header/>

      {/* Header with Logo and Export button */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Exportar datos
        </button>
      </div>

      {/* Notes Grid Container */}
      <div className="px-8">
        <div className="grid grid-cols-4 gap-4 auto-rows-min">
          {/* Notas existentes */}
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="bg-[#242424] rounded-lg p-4 cursor-pointer hover:bg-[#2a2a2a] min-h-[150px]"
              onClick={() => handleNoteClick(note.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{note.title}</h3>
                <span className="text-xs text-gray-400">{note.date}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">
                {note.content}
              </p>
            </div>
          ))}
          
          {/* Botón Nueva Nota integrado en el grid */}
          <div className="min-h-[150px] flex items-center justify-center">
            <button 
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              onClick={handleNewNote}
            >
              Nueva Nota
            </button>
          </div>
        </div>
      </div>

      {/* Padding bottom para asegurar espacio al final */}
      <div className="h-8"></div>
    </div>
  );
};

export default NotesGrid;