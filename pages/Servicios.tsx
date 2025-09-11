import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

type Service = {
  id: number;
  imageUrl: string;
  title: string;
};

const serviceData: Service[] = [
  { id: 1, title: "Carpintería de Vidrio y Aluminio", imageUrl: "/s/servicio1.webp" },
  { id: 2, title: "Tabiquería y Enchapado", imageUrl: "/s/servicio2.webp" },
  { id: 3, title: "Alquiler y Venta de Andamios", imageUrl: "/s/servicio3.webp" },
  { id: 4, title: "Mantenimientos", imageUrl: "/s/servicio-0004.webp" },
  { id: 5, title: "Pintados", imageUrl: "/s/servicio-0005.webp" },
  { id: 6, title: "Limpieza de Vidrios", imageUrl: "/s/servicio-0006.webp" },
  { id: 7, title: "Pulido y Biselado", imageUrl: "/s/servicio7.webp" },
  { id: 8, title: "Arenado", imageUrl: "/s/servicio8.webp" },
];

const ServiceCard: React.FC<Service> = ({ imageUrl, title }) => (
    <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="h-[160px]">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="h-[32px] bg-black flex justify-center items-center">
            <span className="text-white text-sm font-semibold">{title}</span>
        </div>
    </div>
);

const ContactIcon: React.FC<{ type: 'whatsapp' | 'mail' | 'location' | 'time' }> = ({ type }) => {
    const icons = {
        whatsapp: <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#009899" d="M19.05 4.94A10 10 0 0 0 4.94 19.05A10 10 0 0 0 19.05 4.94M1.02 12A11 11 0 0 1 12 1.02A11 11 0 0 1 22.98 12A11 11 0 0 1 12 22.98h-.02a11 11 0 0 1-10.96-10.96v-.02m5.49-3.46l.28.43c.48.74.65 1.59.52 2.45c-.13.86-.5 1.66-1.07 2.31c-.57.65-1.1 1.25-1.58 1.83c-.48.58-.9 1.14-1.28 1.68c-.38.54-.7 1.06-.98 1.55c.95-.31 1.84-.78 2.64-1.39c.8-.61 1.52-1.33 2.14-2.13c.62-.8 1.13-1.68 1.51-2.6c.38-.92.6-1.89.66-2.87l.04-.66l-4.17-.02Z"/></svg>,
        mail: <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#009899" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5l-8-5h16m0 12H4V8l8 5l8-5v10Z"/></svg>,
        location: <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#009899" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/></svg>,
        time: <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#009899" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z"/></svg>,
    };
    return icons[type];
};

const Servicios: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[^\w-]/g, '');

    useEffect(() => {
        const state = (location && (location as any).state) || {};
        const target: string | undefined = state.scrollTarget;
        if (target) {
            setTimeout(() => {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    }, [location]);
    return (
        <main className="w-full">
            {/* Hero Section */}
            <div className="relative w-full h-[198px] bg-[url('/s/03fondo01.webp')] bg-cover bg-center flex flex-col justify-between items-center overflow-x-hidden">
                <div className="w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent"></div>
                <div className="w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="text-center mt-24">
                        <h1 className="text-white text-3xl font-extrabold">SERVICIOS</h1>
                        <div className="w-20 h-1 bg-[#009899] mx-auto mt-2"></div>
                    </div>
                </div>
                <div className="absolute bottom-0 w-full h-1 bg-black"></div>
            </div>

            {/* Main Content */}
            <div className="relative w-full bg-[#F1F1F1] pb-24">
                {/* Services Grid */}
                <div className="relative max-w-[744px] mx-auto px-4 pt-7 pb-12 md:pt-14 md:pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                        {serviceData.map((service) => (
                            <div id={`servicios-${slugify(service.title)}`} key={service.id}>
                                <ServiceCard {...service} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="relative max-w-[744px] mx-auto px-4">
                    <div className="w-full h-1 bg-[#009899] rounded-full"></div>

                    <div className="text-center py-6 md:py-8">
                        <h2 className="text-xl font-extrabold text-[#1F3D44]">Contacto</h2>
                        <p className="text-sm font-semibold text-[#1F3D44] mt-2 max-w-2xl mx-auto">
                            Si estás interesado o interesada en alguno de nuestros productos, contáctanos para una buena asesoría
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 justify-center">
                        {/* Form */}
                        <div className="w-full md:w-2/3 lg:w-1/2">
                          <form className="space-y-2" onSubmit={(e) => {
                                e.preventDefault();
                                try {
                                    const form = e.currentTarget as HTMLFormElement;
                                    const fd = new FormData(form);
                                    const nombre = String(fd.get('nombre') || '').trim();
                                    const telefono = String(fd.get('telefono') || '').trim();
                                    const email = String(fd.get('email') || '').trim();
                                    const mensaje = String(fd.get('mensaje') || 'Sin mensaje').trim();

                                    const title = 'Servicios';
                                    const number = '51914109040';
                                    const text = `*${title}*\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`;
                                    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
                                    window.open(url, '_blank');
                                    setTimeout(() => navigate('/gracias'), 300);
                                } catch (err) {
                                    console.error(err);
                                    alert('No se pudo generar el enlace de WhatsApp.');
                                }
                            }}>
                                <input name="nombre" type="text" placeholder="Nombre y Apellido" className="w-full h-[24px] px-2 text-sm border border-gray-400 rounded-sm focus:ring-2 focus:ring-[#009899] focus:border-transparent" required />
                                <input name="telefono" type="tel" placeholder="Teléfono" className="w-full h-[24px] px-2 text-sm border border-gray-400 rounded-sm focus:ring-2 focus:ring-[#009899] focus:border-transparent" required />
                                <input name="email" type="email" placeholder="Correo Electrónico" className="w-full h-[24px] px-2 text-sm border border-gray-400 rounded-sm focus:ring-2 focus:ring-[#009899] focus:border-transparent" required />
                                <textarea name="mensaje" placeholder="Mensaje" className="w-full h-[74px] p-2 text-sm border border-gray-400 rounded-sm resize-none focus:ring-2 focus:ring-[#009899] focus:border-transparent"></textarea>
                                <button type="submit" className="w-full h-[24px] bg-[#990021] text-white text-sm font-bold rounded-sm hover:bg-[#77001A] transition-colors">Enviar</button>
                            </form>
                        </div>
                        {/* Contact Info */}
                        <div className="w-full md:w-1/3 lg:w-auto text-[#1F3D44]">
                           <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="pt-1"><ContactIcon type="whatsapp" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold">WHATSAPP</h3>
                                        <p className="text-xs">(+51) 914 109 040</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                     <div className="pt-1"><ContactIcon type="mail" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold">CORREO</h3>
                                        <p className="text-xs">ventas@congen.com.pe</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                     <div className="pt-1"><ContactIcon type="location" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold">DIRECCIÓN</h3>
                                        <p className="text-xs">Urb. Ricardo Palma, Mz F Lt 14, SJL</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="pt-1"><ContactIcon type="time" /></div>
                                    <div>
                                        <h3 className="text-sm font-bold">HORARIO DE ATENCIÓN</h3>
                                        <p className="text-xs">Lunes a Viernes de <strong className="font-semibold">8:00 am – 5:00pm</strong><br />Sábado de <strong className="font-semibold">8:00 am – 1:00pm</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FloatingWhatsApp title="Servicios" />
        </main>
    );
};

export default Servicios;



