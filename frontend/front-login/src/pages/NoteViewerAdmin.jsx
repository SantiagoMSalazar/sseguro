// src/components/NoteViewer.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la nota desde la URL

  // Estado para almacenar los datos de la nota
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    characterCount: 0
  });

  // Efecto para cargar la nota
  useEffect(() => {
    if (id) {
      // TODO: Implementar llamada al backend
      // Ejemplo de cómo se implementaría:
      /*
      const fetchNote = async () => {
        try {
          const response = await fetch(`/api/notes/${id}`);
          const data = await response.json();
          setNote({
            title: data.title,
            content: data.content,
            date: new Date(data.date).toLocaleString('es-ES', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            }),
            characterCount: data.content.length
          });
        } catch (error) {
          console.error('Error al cargar la nota:', error);
          // Manejar el error apropiadamente
        }
      };
      
      fetchNote();
      */

      // Por ahora, usamos datos de ejemplo
      setNote({
        title: 'Título de la nota',
        content: 'Contenido de ejemplo de la nota...',
        date: new Date().toLocaleString('es-ES', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        }),
        characterCount: 'Contenido de ejemplo de la nota...'.length
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header Nav */}
      <nav className="flex justify-between px-4 py-3 text-sm border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/shared-notes')}
            className="text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Note Content */}
      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Title - Read only */}
        <div className="w-full text-4xl font-bold mb-4">
          {note.title}
        </div>

        {/* Date and Character Count */}
        <div className="text-gray-400 text-sm mb-8 flex justify-between">
          <span>{note.date}</span>
          <span>{note.characterCount} caracteres</span>
        </div>

        {/* Content - Read only */}
        <div className="w-full min-h-[calc(100vh-300px)] text-lg whitespace-pre-wrap">
          {note.content}
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;