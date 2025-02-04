import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Para editar notas existentes
  const [note, setNote] = useState({
    title: 'Título',
    content: '',
    date: new Date().toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  });

  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (id) {
      // Aquí iría la lógica para cargar una nota existente
      // fetchNote(id)
    }
  }, [id]);

  const handleContentChange = (e) => {
    const content = e.target.value;
    setNote(prev => ({...prev, content}));
    setCharacterCount(content.length);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setNote(prev => ({...prev, title}));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en el backend
    console.log('Guardando nota:', note);
    navigate('/notes');
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header Nav */}
      <nav className="flex justify-between px-4 py-3 text-sm border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/notes')}
            className="text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <button 
          onClick={handleSave}
          className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded"
        >
          Guardar
        </button>
      </nav>

      {/* Note Content */}
      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Title Input */}
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          className="w-full bg-transparent text-4xl font-bold mb-4 focus:outline-none border-none"
          placeholder="Título"
        />

        {/* Date and Character Count */}
        <div className="text-gray-400 text-sm mb-8 flex justify-between">
          <span>{note.date}</span>
          <span>{characterCount} caracteres</span>
        </div>

        {/* Content Textarea */}
        <textarea
          value={note.content}
          onChange={handleContentChange}
          placeholder="Empiece a escribir"
          className="w-full h-[calc(100vh-300px)] bg-transparent resize-none focus:outline-none text-lg"
        />
      </div>
    </div>
  );
};

export default NoteEditor;