import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormState {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
}

const contactDetails = [
  { icon: '/phone.svg', title: 'Teléfono', info: '914 109 040' },
  { icon: '/mail.svg', title: 'Correo Electrónico', info: 'ventas@congen.com.pe' },
  { icon: '/point.svg', title: 'Dirección', info: 'Urb. Ricardo Palma, Mz F Lt 14, SJL' },
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    const { nombre, telefono, email } = formState;

    if (!nombre.trim() || nombre.trim().length < 3) {
      errors.push("El nombre debe tener al menos 3 caracteres");
    }

    const phoneRegex = /^(\+51\s?)?(9\d{2}[\s-]?\d{3}[\s-]?\d{3}|[1-9]\d{7})$/;
    if (!phoneRegex.test(telefono.replace(/\s/g, ''))) {
      errors.push("Ingrese un teléfono válido (ej: 912345678 o +51 912 345 678)");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Ingrese un correo electrónico válido");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessages([]);

    try {
      const { nombre, telefono, email, mensaje } = formState;

      const title = 'inicio';
      const number = '51914109040';
      const text = `*${title}*\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje || 'Sin mensaje'}`;
      const urlWhatsApp = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

      window.open(urlWhatsApp, '_blank');

      setIsSubmitted(true);
      setFormState({ nombre: '', telefono: '', email: '', mensaje: '' });

      // navigate to /gracias after a short delay so the window.open has time to trigger
      setTimeout(() => {
        navigate('/gracias');
      }, 300);
    } catch (error: any) {
      setErrorMessages(['No se pudo generar el enlace de WhatsApp.']);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="contacto" className="bg-[#1F3D44] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-2/3">
            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg text-center">
                <strong className="font-bold text-lg">¡Gracias por tu mensaje!</strong>
                <p className="mt-2">Hemos recibido tu información y te contactaremos pronto.</p>
                <button 
                  onClick={resetForm}
                  className="mt-4 bg-[#009899] text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-[#007a7b] transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full text-white">
                <h3 className="text-xl font-semibold mb-4">Contáctanos</h3>
                
                {errorMessages.length > 0 && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
                    {errorMessages.map((msg, i) => (
                      <p key={i} className="text-sm">• {msg}</p>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="nombre"
                    value={formState.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre y Apellido*"
                    required
                    minLength={3}
                    className="bg-white border border-gray-300 rounded-md p-2 text-sm text-black placeholder-gray-500 h-10 focus:ring-2 focus:ring-[#009899] focus:border-transparent"
                  />
                  
                  <input
                    type="tel"
                    name="telefono"
                    value={formState.telefono}
                    onChange={handleInputChange}
                    placeholder="Teléfono* (ej: 912345678)"
                    required
                    className="bg-white border border-gray-300 rounded-md p-2 text-sm text-black placeholder-gray-500 h-10 focus:ring-2 focus:ring-[#009899] focus:border-transparent"
                  />
                  
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Correo Electrónico*"
                    required
                    className="bg-white border border-gray-300 rounded-md p-2 text-sm text-black placeholder-gray-500 h-10 focus:ring-2 focus:ring-[#009899] focus:border-transparent"
                  />
                  
                  <textarea
                    name="mensaje"
                    value={formState.mensaje}
                    onChange={handleInputChange}
                    placeholder="Mensaje (opcional)"
                    rows={4}
                    className="bg-white border border-gray-300 rounded-md p-2 text-sm text-black placeholder-gray-500 focus:ring-2 focus:ring-[#009899] focus:border-transparent"
                  ></textarea>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#990021] text-white font-bold text-sm py-2 rounded-md hover:bg-[#77001A] disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        ENVIANDO...
                      </span>
                    ) : 'ENVIAR'}
                  </button>
                  
                  <p className="text-xs text-gray-300">* Campos obligatorios</p>
                </div>
              </form>
            )}
          </div>
          
          <div className="w-full md:w-1/3 space-y-6 text-white">
            <h3 className="text-xl font-semibold">Información de Contacto</h3>
            {contactDetails.map((detail, index) => (
              <div key={index} className="flex items-start gap-3">
                <img src={detail.icon} alt={detail.title} className="w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">{detail.title}</h4>
                  <p className="text-sm opacity-90">{detail.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;