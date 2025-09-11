
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UMarcas from '../components/UMarcas';
import UProyectos from '../components/UProyectos';
import ProductCarousel from '../components/ProductCarousel';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

// Vite base for assets when hosted to a subpath (ex: /congen001/)
const base = (import.meta as any).env.BASE_URL || '/';

// --- Constants ---
const services = [
    "Carpintería de Vidrio y Aluminio", "Tabiquería y Enchapado", "Alquiler y Venta de Andamios",
    "Mantenimientos", "Pintados", "Limpieza de Vidrios", "Pulido y Biselado", "Arenado"
];
const products = ["Vidrios", "Mobiliarios", "Accesorios", "Tabiquería y Enchapados", "Andamios"];

// Products data for the carousel (matches /productos)
const productItems = [
    { img: `${base}p/w02img1.webp`, title: 'SISTEMA NOVA', subtitle: 'Vidrios' },
    { img: `${base}p/w02img2.webp`, title: 'SERIE 20', subtitle: 'Vidrios' },
    { img: `${base}p/w02img3.webp`, title: 'SERIE 25', subtitle: 'Vidrios' },
    { img: `${base}p/w02img4.webp`, title: 'ACUSTICAS/ANTI RUIDOS', subtitle: 'Vidrios' },
    { img: `${base}p/w02img6.webp`, title: 'PVC', subtitle: 'Vidrios' },
    { img: `${base}p/w02img7.webp`, title: 'SLIDE SYSTEM', subtitle: 'Vidrios' },
    { img: `${base}p/w02img8.webp`, title: 'PUERTAS DE DUCHA', subtitle: 'Vidrios' },
    { img: `${base}p/w02img9.webp`, title: 'ESPEJOS', subtitle: 'Mobiliario' },
    { img: `${base}p/w02img10.webp`, title: 'MÓDULOS', subtitle: 'Mobiliario' },
    { img: `${base}p/w02img11.webp`, title: 'MESAS', subtitle: 'Mobiliario' },
    { img: `${base}p/w02img12.webp`, title: 'REPISAS', subtitle: 'Mobiliario' },
    { img: `${base}p/w02img13.webp`, title: 'PIZARRAS', subtitle: 'Mobiliario' },
    { img: `${base}p/w02img14.webp`, title: 'BRAZOS HIDRÁULICOS', subtitle: 'Accesorios' },
    { img: `${base}p/w02img15.webp`, title: 'TIRADORES', subtitle: 'Accesorios' },
    { img: `${base}p/w02img16.webp`, title: 'CERRADURAS', subtitle: 'Accesorios' },
    { img: `${base}p/w02img17.webp`, title: 'FRENOS HIDRÁULICOS', subtitle: 'Accesorios' },
    { img: `${base}p/w02img18.webp`, title: 'VINILOS', subtitle: 'Accesorios' },
    { img: `${base}p/w02img19.webp`, title: 'VENTOSAS', subtitle: 'Accesorios' },
    { img: `${base}p/w02img20.webp`, title: 'DRYWALL', subtitle: 'Tabiquería y Enchapados' },
    { img: `${base}p/w02img21.webp`, title: 'ENCHAPADOS', subtitle: 'Tabiquería y Enchapados' },
    { img: `${base}p/w02img22.webp`, title: 'LADRILLO', subtitle: 'Tabiquería y Enchapados' },
    { img: `${base}p/w02img23.webp`, title: 'ANDAMIOS ACROW', subtitle: 'Andamios' },
];


// --- Hooks ---
interface TimeLeft {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

const useCountdown = (initialDuration: number): TimeLeft => {
    // Calendar-based deterministic countdown.
    // Uses a fixed epoch and a period = initialDuration so the computed
    // end timestamp is the next cycle boundary after "now". This makes
    // the countdown deterministic across servers (no localStorage required).
    const [secondsLeft, setSecondsLeft] = useState<number>(initialDuration);

    // Reset trigger and fallback duration (kept as before)
    const RESET_CONDITION = { days: 0, hours: 3, minutes: 0, seconds: 33 };
    const RESET_DURATION_SECONDS = 3 * 24 * 60 * 60 + 3 * 60 * 60 + 3 * 60 + 3; // 3d 3h 3m 3s

    useEffect(() => {
        // base epoch (UTC) — choose a stable date in the past so calculations are consistent
        const baseEpoch = Date.UTC(2025, 0, 1, 0, 0, 0); // 2025-01-01T00:00:00Z
        const periodMs = initialDuration * 1000;

        const tick = () => {
            const now = Date.now();

            // Compute the next cycle boundary after now
            const elapsed = now - baseEpoch;
            let cycles = Math.ceil(elapsed / periodMs);
            if (cycles <= 0) cycles = 1;
            let endTs = baseEpoch + cycles * periodMs;

            let secs = Math.max(0, Math.ceil((endTs - now) / 1000));

            // compute units for reset detection
            const days = Math.floor(secs / (24 * 60 * 60));
            const hours = Math.floor((secs % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((secs % (60 * 60)) / 60);
            const seconds = secs % 60;

            // If matches reset condition, extend from now by RESET_DURATION_SECONDS
            // Note: this local extension is deterministic only in the sense that
            // all clients that hit the exact same moment will extend; if you need
            // a coordinated global extension across servers you must centralize
            // the schedule (backend).
            if (days === RESET_CONDITION.days && hours === RESET_CONDITION.hours && minutes === RESET_CONDITION.minutes && seconds === RESET_CONDITION.seconds) {
                endTs = now + RESET_DURATION_SECONDS * 1000;
                secs = RESET_DURATION_SECONDS;
            }

            setSecondsLeft(secs);
        };

        tick();
        const id = window.setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [initialDuration]);

    const formatTime = (time: number): TimeLeft => {
        const days = Math.floor(time / (24 * 60 * 60));
        const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = time % 60;

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        };
    };

    return formatTime(secondsLeft);
};


// --- UI Components ---
const Countdown: React.FC = () => {
    const countdown = useCountdown(4 * 24 * 60 * 60); // 4 days

    return (
        <div className="w-full max-w-[312px] flex flex-col gap-2">
            <p className="text-white text-xs font-bold text-center whitespace-normal">
                Contáctanos y Aprovecha nuestra OFERTA LIMITADA
            </p>
            <div className="flex gap-2">
                {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="flex-1 h-8 flex justify-center items-center rounded-[3px] bg-[#990021]">
                        <span className="text-white text-[22px] font-extrabold">{value}</span>
                    </div>
                ))}
            </div>
            <p className="text-white text-[10px] font-normal text-center">
                Cuenta regresiva para el final de la oferta, ¡NO TE LO PIERDAS!
            </p>
        </div>
    );
};

const ContactForm: React.FC = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const form = event.currentTarget as HTMLFormElement;
            const fd = new FormData(form);
            const nombre = String(fd.get('nombre') || '').trim();
            const telefono = String(fd.get('telefono') || '').trim();
            const email = String(fd.get('email') || '').trim();
            const mensaje = String(fd.get('mensaje') || 'Sin mensaje').trim();

            const title = 'Landing Vidrios';
            const number = '51914109040';
            const text = `*${title}*\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`;
            const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
            setTimeout(() => navigate('/gracias-vidrios'), 300);
        } catch (err) {
            console.error(err);
            alert('No se pudo generar el enlace de WhatsApp.');
        }
    };

    const inputStyles = "w-full h-[24px] bg-white bg-opacity-80 text-black placeholder-gray-600 border border-white rounded-md px-2 text-sm focus:ring-2 focus:ring-[#009899] focus:outline-none shadow-md";

    return (
        <form onSubmit={handleFormSubmit} className="w-full max-w-[312px] flex flex-col gap-2 mb-0">
            <input name="nombre" type="text" placeholder="Nombre y Apellido" required className={inputStyles} />
            <input name="telefono" type="tel" placeholder="Teléfono" required className={inputStyles} />
            <input name="email" type="email" placeholder="Correo Electrónico" required className={inputStyles} />
            <textarea name="mensaje" placeholder="Mensaje" className={`${inputStyles} h-[74px] py-1 resize-none`}></textarea>
            <button type="submit" className="w-full h-6 bg-[#990021] text-white text-sm font-semibold rounded-md hover:bg-[#77001A] transition-colors">
                Enviar Ahora
            </button>
        </form>
    );
};


// --- Section Components ---
const ContactItem: React.FC<{ icon: string; text: string; alt: string }> = ({ icon, text, alt }) => (
    <div className="flex items-center gap-2">
        <img src={icon} alt={alt} className="w-4 h-4" />
        <span className="text-white text-xs md:text-sm">{text}</span>
    </div>
);

const Header: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
            <div className="container mx-auto hidden md:flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-white text-shadow-sm scale-110">
                <ContactItem icon={`${base}mail.svg`} text="ventas@congen.com.pe" alt="Email icon" />
                <ContactItem icon={`${base}phone.svg`} text="(+51) 914 109 040" alt="Phone icon" />
                <ContactItem icon={`${base}point.svg`} text="Urb. Ricardo Palma, Mz F Lt 14, SJL" alt="Location icon" />
            </div>
        </div>
    );
};

const Hero: React.FC = () => {
    const textShadow = { textShadow: '-1px 2px 2px rgba(0,0,0,0.5), 0px 0px 16px rgba(0,0,0,0.77)' };

    return (
    <section className="relative w-full h-auto bg-cover bg-center flex flex-col items-center pt-0 md:pt-16 pb-20 md:pb-[120px] px-4" style={{ backgroundImage: `url(${base}l1-bg1.webp)` }}>
            
            <div className="w-full max-w-[744px] flex flex-col md:flex-row justify-center items-center md:items-end gap-8 mt-0 md:mt-8">
                {/* Left Side: Title and Image */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <img src={`${base}logo3.svg`} alt="Congen Logo" className="w-[312px] h-auto mb-2 mt-2 md:-ml-8 lg:w-[172px] lg:-ml-6" />
                        <span className="text-white text-sm" style={{textShadow: '0 0 8px black'}}>Ofrecemos Servicios de</span>
                        <h1 className="text-white text-3xl font-extrabold leading-tight" style={textShadow}>
                            CARPINTERÍA DE VIDRIOS
                            <br />
                            Y ALUMINIOS
                        </h1>
                        <span className="text-white text-base" style={{textShadow: '0 0 8px black'}}>En Lima y Provincias</span>
                    </div>
                    <div className="w-full max-w-[320px] h-auto p-2 rounded-lg bg-[#0404048F] border-2 border-[#009899]">
                        <img src={`${base}l1-principal.webp`} alt="Carpintería de vidrios y aluminios" className="rounded-md w-full h-full object-cover" />
                    </div>
                </div>

                {/* Right Side: Countdown and Form */}
                <div className="w-full max-w-[320px] px-2 py-2 flex flex-col items-center gap-2 rounded-lg bg-[#0404048F] border-2 border-[#009899]">
                    <Countdown />
                    <ContactForm />
                </div>
            </div>

            {/* Mobile Contact Info */}
                <div className="md:hidden mt-8 flex flex-col justify-center items-center gap-2 text-white">
                <div className="flex items-center gap-2">
                    <img src={`${base}mail.svg`} alt="Email icon" className="w-4 h-4" />
                    <span className="text-white text-xs" style={{textShadow: '0 0 4px black'}}>ventas@congen.com.pe</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={`${base}phone.svg`} alt="Phone icon" className="w-4 h-4" />
                    <span className="text-white text-xs" style={{textShadow: '0 0 4px black' }}>(+51) 914 109 040</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={`${base}point.svg`} alt="Location icon" className="w-4 h-4" />
                    <span className="text-white text-xs" style={{textShadow: '0 0 4px black' }}>Urb. Ricardo Palma, Mz F Lt 14, SJL</span>
                </div>
            </div>

            <button
                type="button"
                onClick={() => {
                    const el = document.getElementById('products');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="hidden md:flex items-center justify-center mt-[72px] cursor-pointer group"
            >
                <div className="transition-transform duration-300 group-hover:translate-y-1">
                    <img src={`${base}ico-arrow.svg`} alt="Flecha hacia abajo" />
                </div>
                <span className="text-white text-base font-semibold mx-4 tracking-wide" style={{ textShadow: '0 0 8px black' }}>
                    Saber más sobre nosotros
                </span>
                <div className="transition-transform duration-300 group-hover:translate-y-1">
                    <img src={`${base}ico-arrow.svg`} alt="Flecha hacia abajo" />
                </div>
            </button>

            <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
        </section>
    );
};

const ProductsSection: React.FC = () => {
    return (
        <section className="w-full max-w-[744px] py-6 px-4 md:px-0">
            <div className="w-full flex flex-col">
                <h2 id="products" className="text-black text-base font-extrabold">CONOCE NUESTROS PRODUCTOS</h2>
                <div className="h-0.5 bg-[#009899] mt-2 mb-4"></div>
                <div className="w-full">
                    <ProductCarousel items={productItems} />
                </div>
            </div>
        </section>
    );
};

const ServicesSection: React.FC = () => {
    return (
        <section id="services" className="w-full max-w-[744px] py-6 px-4 md:px-0 flex flex-col items-center">
            {/* Service Description */}
            <div className="w-full flex flex-col">
                <h2 className="text-black text-base font-extrabold">CONOCE NUESTROS SERVICIOS</h2>
                <div className="h-0.5 bg-[#009899] mt-2 mb-4"></div>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="hidden md:block flex-shrink-0 w-[168px] h-[206px] p-1 bg-[#1F3D44] rounded-lg outline outline-2 outline-[#009899]">
                        <img src={`${base}l1-portada.webp`} alt="Servicios Congen" className="w-full h-full object-cover rounded" />
                    </div>
                    <p className="text-black text-sm text-left leading-relaxed">
                        En nuestra empresa nos especializamos en la <strong className="font-bold uppercase text-[#990021]">carpintería de vidrios y aluminios</strong>, ofreciendo soluciones personalizadas y de alta calidad para satisfacer las necesidades de nuestros clientes en <strong className="font-bold uppercase text-[#990021]">Lima y provincias</strong>. Entre nuestros productos destacados se encuentran el <strong className="font-bold uppercase text-[#990021]">Sistema Nova</strong>, diseñado para espacios modernos y minimalistas; las <strong className="font-bold uppercase text-[#990021]">Series 20 y 25</strong>, ideales por su resistencia y excelente capacidad de aislamiento térmico y acústico; opciones <strong className="font-bold uppercase text-[#990021]">Acústicas y Anti Ruido</strong>, perfectas para reducir el ruido exterior en ambientes urbanos; <strong className="font-bold uppercase text-[#990021]">estructuras en PVC</strong>, conocidas por su alto rendimiento en aislamiento térmico; el elegante y funcional <strong className="font-bold uppercase text-[#990021]">Slide System</strong>, pensado para optimizar espacios reducidos; y nuestras <strong className="font-bold uppercase text-[#990021]">Puertas de Ducha</strong>, fabricadas con vidrio templado de alta resistencia, ideales para baños modernos y sofisticados.
                    </p>
                </div>
            </div>

            {/* Services grid (replaces the products carousel inside this section) */}
            <div className="w-full mt-12">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Carpintería de Vidrio y Aluminio" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio1.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Carpintería de Vidrio y Aluminio</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Tabiquería y Enchapado" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio2.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Tabiquería y Enchapado</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Alquiler y Venta de Andamios" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio3.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Alquiler y Venta de Andamios</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Mantenimientos" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio-0004.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Mantenimientos</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Pintados" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio-0005.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Pintados</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Limpieza de Vidrios" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio-0006.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Limpieza de Vidrios</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Pulido y Biselado" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio7.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Pulido y Biselado</span></div>
                        </div>
                        <div className="w-full max-w-[364px] h-[192px] rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="h-[160px]"><img alt="Arenado" className="w-full h-full object-cover" loading="lazy" src={`${base}s/servicio8.webp`} /></div>
                            <div className="h-[32px] bg-black flex justify-center items-center"><span className="text-white text-sm font-semibold">Arenado</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PartnersSection: React.FC = () => {
    return (
        <section className="w-full max-w-[744px] px-4 md:px-0">
            <div className="-mt-10 mb-[30px]">
                <UMarcas />
            </div>
        </section>
    );
};

const ProjectsSection: React.FC = () => {
    return (
        <section className="w-full bg-gradient-to-b from-[#009899] to-[#1F3D44] py-12 flex flex-col items-center">
            <div className="w-full max-w-[744px] px-4 md:px-0">
                <h2 className="text-2xl font-extrabold text-white text-center mb-10 tracking-widest">CONOCE LOS PROYECTOS DE NUESTRA MARCA</h2>
                <UProyectos />
            </div>
        </section>
    );
};

const FooterLinkList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div className="flex flex-col">
        <h4 className="text-white font-bold mb-2">{title}</h4>
        <ul className="space-y-1">
            {items.map((item, index) => (
                <li key={index} className="text-gray-300 text-sm hover:text-white cursor-pointer transition-colors">
                    – {item}
                </li>
            ))}
        </ul>
    </div>
);

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full bg-[#0c0c0c] pt-12 pb-8 px-4 text-white">
            <div className="absolute inset-0 bg-[url('https://www.congen.com.pe/public/foto-footer.webp')] bg-cover bg-bottom opacity-10"></div>
            <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row justify-between items-center md:items-start text-white gap-8">
                <div className="w-full max-w-[280px] text-center md:text-left">
                    <img alt="Logo" className="h-16 mx-auto md:mx-0 mb-4" src={`${base}logo-footer.svg`} />
                    <p className="text-xs leading-relaxed mb-4">Somos una empresa, que nació con el objetivo de brindar soluciones inmediatas en vidrios, aluminios, tabiquería y enchapados en general.</p>
                    <div className="text-xs font-semibold space-y-2">
                        <p>(+51) 914 109 040</p>
                        <p>ventas@congen.com.pe</p>
                        <p>Urb. Ricardo Palma, Mz F Lt 14, SJL</p>
                    </div>
                    <div className="flex justify-center md:justify-start gap-4 mt-4">
                        <a href="#"><img alt="Facebook" className="w-5 h-5 transition-transform hover:scale-110" src={`${base}red-face.svg`} /></a>
                        <a href="#"><img alt="Instagram" className="w-5 h-5 transition-transform hover:scale-110" src={`${base}red-insta.svg`} /></a>
                        <a href="#"><img alt="TikTok" className="w-5 h-5 transition-transform hover:scale-110" src={`${base}red-tik.svg`} /></a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left md:relative md:-left-16">
                    <div>
                        <h4 className="font-bold text-sm mb-3 uppercase">Servicios</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Carpintería de Vidrio y Aluminio</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Tabiquería y Enchapado</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Alquiler y Venta de Andamios</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Mantenimientos</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Pintados</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Limpieza de Vidrios</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Pulido y Biselado</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Arenado</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-3 uppercase">Productos</h4>
                        <ul className="space-y-2 text-xs">
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Vidrios</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Mobiliarios</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Accesorios</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Tabiquería y Enchapados</a></li>
                            <li><a href="#" className="hover:underline opacity-80 hover:opacity-100">– Andamios</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// FloatingButtons removed. Use shared FloatingWhatsApp component from components/FloatingWhatsApp


// --- Main App Component ---
const Vidrios: React.FC = () => {
  return (
    <div className="bg-gray-200 overflow-x-hidden">
      <main>
        <Header />
        <Hero />
        <div className="bg-[#D9D9D9] flex flex-col items-center">
          <ProductsSection />
          <ServicesSection />
          <PartnersSection />
        </div>
        <ProjectsSection />
        <Footer />
    <FloatingWhatsApp title="Landing Vidrios" />
      </main>
    </div>
  );
};

export default Vidrios;