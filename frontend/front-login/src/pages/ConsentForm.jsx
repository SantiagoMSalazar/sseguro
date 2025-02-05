import { useState } from 'react';
import Header from '../components/Home/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const ConsentForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">

      {/* Logo */}
      <div className="px-8 py-4">
        <h1 className="text-xl font-semibold">ShareNotes</h1>
      </div>

      {/* Main Content */}
      <div className="px-8">
        <h2 className="text-2xl text-center mb-8">Bienvenido</h2>

        <div className="mb-4 pl-4">
          <h3 className="text-lg">Acuerdo de confidencialidad de la información</h3>
        </div>

        {/* Agreement Box */}
        <div className="bg-[#242424] rounded-lg p-6 mb-6 h-[400px] overflow-y-auto mx-4">
          <div className="text-gray-300 space-y-6">
            <h2 className="text-xl font-bold text-center mb-8">
              ACUERDO DE CONSENTIMIENTO PARA EL TRATAMIENTO DE DATOS PERSONALES Y PRIVACIDAD
            </h2>
            <p className="text-sm italic">Fecha de última actualización: 2 de febrero del 2025</p>

            <div className="space-y-4">
              <section>
                <h3 className="font-bold mb-2">1. INTRODUCCIÓN</h3>
                <p>El presente documento constituye el Acuerdo de Tratamiento de Datos Personales (en adelante, el &quot;Acuerdo&quot;) entre ShareNotes (en adelante, el &quot;Responsable del Tratamiento&quot; ) y el usuario del sistema (en adelante, el &quot;Titular de los Datos&quot;), de conformidad con la Ley Orgánica de Protección de Datos Personales del Ecuador y su normativa aplicable.</p>
              </section>

              <section>
                <h3 className="font-bold mb-2">2. OBJETO DEL ACUERDO</h3>
                <p>El presente Acuerdo tiene por objeto establecer los términos y condiciones bajo los cuales ShareNotes recolectará, almacenará, utilizará, procesará y, en su caso, compartirá los datos personales del Titular de los Datos en el contexto de la plataforma.</p>
                <p>Este consentimiento es obligatorio para el uso del sistema, sin perjuicio de que el Titular pueda revocar, modificar o aceptar nuevos consentimientos en cualquier momento, según los mecanismos proporcionados en el sistema.</p>
              </section>

              <section>
                <h3 className="font-bold mb-2">3. DATOS PERSONALES OBJETO DE TRATAMIENTO</h3>
                <p>Los datos personales que serán objeto de tratamiento incluyen, pero no se limitan a:</p>
                <ul className="list-disc pl-6">
                  <li>Información de perfil del usuario (nombre, correo electrónico, nombre de usuario)</li>
                  <li>Datos de contacto (correo electrónico, teléfono -si aplica-)</li>
                  <li>Información de uso del sistema (registro de actividad, preferencias, interacción con notas y usuarios)</li>
                  <li>Notas almacenadas (incluyendo contenido y metadatos)</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold mb-2">4. FINALIDADES DEL TRATAMIENTO</h3>
                <p>Los datos personales serán tratados con las siguientes finalidades:</p>
                <ul className="list-disc pl-6">
                  <li>Gestión y administración del sistema ShareNotes.</li>
                  <li>Almacenamiento, organización y procesamiento de notas personales del usuario.</li>
                  <li>Compartición de notas según la configuración y consentimiento del usuario.</li>
                  <li>Facilitación de la interacción entre usuarios.</li>
                  <li>Envío de notificaciones y correos electrónicos según las preferencias del usuario.</li>
                  <li>Garantizar la seguridad y funcionalidad del servicio.</li>
                  <li>Cumplir con las obligaciones legales aplicables en materia de protección de datos.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold mb-2">5. SEGURIDAD Y CONSERVACIÓN DE DATOS</h3>
                <p>ShareNotes implementa medidas técnicas y organizativas adecuadas para garantizar la seguridad, integridad y confidencialidad de los datos personales, de conformidad con la LOPD del Ecuador.</p>
                <p>Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades del tratamiento o según lo requerido por ley.</p>
              </section>

              <section>
                <h3 className="font-bold mb-2">6. TRANSFERENCIA DE DATOS Y USO COMPARTIDO</h3>
                <p>Los datos personales no serán transferidos a terceros sin consentimiento previo del Titular, salvo en los siguientes casos:</p>
                <ul className="list-disc pl-6">
                  <li>Cumplimiento de obligaciones legales.</li>
                  <li>Requerimientos de autoridades competentes.</li>
                  <li>Servicios subcontratados que actúan como Encargados del Tratamiento, bajo contratos que garantizan la protección de los datos.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold mb-2">7. MODIFICACIONES AL ACUERDO</h3>
                <p>El presente Acuerdo podrá ser modificado para ajustarse a nuevas normativas o cambios en el servicio. Se notificará a los usuarios de cualquier actualización relevante, y se requerirá nuevamente el consentimiento en caso de cambios sustanciales.</p>
              </section>

              <section>
                <h3 className="font-bold mb-2">8. ACEPTACIÓN Y REVOCACIÓN DEL CONSENTIMIENTO</h3>
                <p>Al aceptar este Acuerdo, el Titular consiente el tratamiento de sus datos personales conforme a lo aquí estipulado. Sin embargo, en cualquier momento podrá:</p>
                <ul className="list-disc pl-6">
                  <li>Modificar o revocar su consentimiento accediendo a la configuración de privacidad.</li>
                  <li>Eliminar su cuenta, lo que resultará en la eliminación de sus datos (excepto cuando una norma requiera su conservación).</li>
                </ul>
              </section>

              <section className="border-t border-gray-700 pt-4 mt-6">
                <p className="text-sm text-center">Para más información o consultas, contacte a:</p>
                <div className="text-sm text-center">
                  <p>📩 Correo electrónico: santiago.salazar@professional.com</p>
                  <p>📞 Teléfono: 0998745685</p>
                  <p>📍 Dirección: Argelia, Quito</p>
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Checkbox and Button */}
        <div className="flex flex-col space-y-4 pl-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>He leído y acepto los términos y condiciones establecidos en este Acuerdo de Tratamiento de Datos Personales.</span>
          </label>
          <div className='flex justify-center space-x-4'>
          <button
            className={`px-8 py-2 rounded w-fit ${isChecked
                ? 'bg-black text-white cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!isChecked}
            onClick={handleContinue}
          >
            Continuar
          </button>
          <button
            className={`px-8 py-2 rounded w-fit  bg-black text-white cursor-pointer`}
            onClick={() => navigate('/login')}
          >
            Cancelar
          </button>
          </div>
        </div>

      </div>
    </div>
  );
};


export default ConsentForm;