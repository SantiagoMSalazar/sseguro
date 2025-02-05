// src/components/DataProtectionArticles.jsx
import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';

const DataProtectionArticles = () => {
  const [articles] = useState([
    {
      id: 8,
      title: 'Autorización para el tratamiento de datos personales',
      content: 'De conformidad con el Art. 8 de la LOPDP, el tratamiento de datos personales requiere el consentimiento expreso del titular, salvo en las excepciones previstas por la ley.',
    },
    {
      id: 12,
      title: 'Tratamiento de datos personales sensibles',
      content: 'Según el Art. 12 de la LOPDP, el tratamiento de datos sensibles está sujeto a medidas de seguridad de nivel alto y solo puede realizarse con el consentimiento expreso del titular, especificando las finalidades del tratamiento.',
    },
    {
      id: 29,
      title: 'Transferencia internacional de datos personales',
      content: 'El Art. 29 de la LOPDP establece que la transferencia internacional de datos personales solo se permitirá hacia países que proporcionen niveles adecuados de protección de datos, o cuando se apliquen garantías adecuadas.',
    },
    {
      id: 33,
      title: 'Derechos de los titulares de datos personales',
      content: 'El Art. 33 de la LOPDP reconoce los derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) a los titulares de datos personales, y establece los mecanismos para ejercerlos.',
    },
    {
      id: 41,
      title: 'Derecho a la portabilidad de los datos',
      content: 'Conforme al Art. 41 de la LOPDP, el titular tiene derecho a recibir sus datos personales en un formato estructurado y de uso común, y a transmitirlos a otro responsable sin impedimentos.',
    },
    {
      id: 14,
      title: 'Revocación del consentimiento',
      content: 'El Art. 14 de la LOPDP dispone que el titular puede revocar su consentimiento en cualquier momento, sin efectos retroactivos sobre el tratamiento previamente realizado.',
    },
    {
      id: 47,
      title: 'Medidas de seguridad en el tratamiento de datos',
      content: 'Según el Art. 47 de la LOPDP, los responsables del tratamiento deben implementar medidas técnicas, administrativas y organizativas para garantizar la seguridad de los datos personales.',
    },
    {
      id: 50,
      title: 'Deber de confidencialidad',
      content: 'El Art. 50 de la LOPDP establece que quienes intervengan en el tratamiento de datos personales están obligados a la confidencialidad, incluso después de finalizada su relación con el titular.',
    },
  ]);

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Header />
 
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="py-6">
            <h1 className="text-2xl font-semibold text-white">ShareNotes</h1>
          </div>
 
          <div className="mt-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Artículos Relevantes de la LOPDP
            </h2>
 
            <div className="bg-[#242424] rounded-xl shadow-xl">
              {articles.map((article, index) => (
                <div 
                  key={article.id}
                  className={`p-6 ${
                    index !== articles.length - 1 ? 'border-b border-[#333333]' : ''
                  }`}
                >
                  <article className="hover:bg-[#2a2a2a] transition-colors duration-200 rounded-lg p-4">
                    <h3 className="text-xl font-medium text-white mb-3">
                      <span className="text-[#90caf9]">Artículo {article.id}:</span>{' '}
                      {article.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {article.content}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
 };

export default DataProtectionArticles;
