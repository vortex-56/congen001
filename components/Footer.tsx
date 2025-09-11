// components/Footer.tsx
import React from 'react';

const base = (import.meta as any).env.BASE_URL || '/';
import { useNavigate, useLocation } from 'react-router-dom';
// 1. Se elimina la importación de Contact
// import Contact from './Contact';

const footerLinks = {
  products: ['Vidrios', 'Mobiliarios', 'Accesorios', 'Tabiquería y Enchapados', 'Andamios'],
  services: [
    'Carpintería de Vidrio y Aluminio',
    'Tabiquería y Enchapado',
    'Alquiler y Venta de Andamios',
    'Mantenimientos',
    'Pintados',
    'Limpieza de Vidrios',
    'Pulido y Biselado',
    'Arenado',
  ],
};

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[^\w-]/g, '');

  const handleClick = (e: React.MouseEvent, target?: string) => {
    e.preventDefault();
    if (!target) return;
    // Decide whether this target belongs to products or services by checking lists
    const isProduct = footerLinks.products.some(p => p.toLowerCase() === target.toLowerCase());
    const id = isProduct ? `#productos-${slugify(target)}` : `#servicios-${slugify(target)}`;

    if ((isProduct && location.pathname === '/productos') || (!isProduct && location.pathname === '/servicios')) {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    navigate(isProduct ? '/productos' : '/servicios', { state: { scrollTarget: id } });
  };

  return (
    <footer className="relative bg-[#1F3D44]">
      {/* 2. Se elimina la línea <Contact /> */}

      <div className="w-full h-1 bg-[#009899]"></div>

      <div className="relative w-full min-h-[310px] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img src={`${base}foto-footer.webp`} alt="" className="w-full h-full object-cover opacity-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 flex flex-col md:flex-row justify-between items-center md:items-start text-white gap-8">
          <div className="w-full max-w-[280px] text-center md:text-left">
            <img src={`${base}logo-footer.svg`} alt="Logo" className="h-16 mx-auto md:mx-0 mb-4" />
            <p className="text-xs leading-relaxed mb-4">
              Somos una empresa, que nació con el objetivo de brindar soluciones inmediatas en vidrios, aluminios, tabiquería y enchapados en general.
            </p>
            <div className="text-xs font-semibold space-y-2">
              <p>(+51) 914 109 040</p>
              <p>ventas@congen.com.pe</p>
              <p>Urb. Ricardo Palma, Mz F Lt 14, SJL</p>
            </div>
            {location.pathname !== '/vidrios' && location.pathname !== '/andamios' && (
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a href="https://www.facebook.com/congenperu" target="_blank" rel="noopener noreferrer"><img src={`${base}red-face.svg`} alt="Facebook" className="w-5 h-5 transition-transform hover:scale-110" /></a>
                <a href="https://www.instagram.com/congen_peru/" target="_blank" rel="noopener noreferrer"><img src={`${base}red-insta.svg`} alt="Instagram" className="w-5 h-5 transition-transform hover:scale-110" /></a>
                <a href="https://www.tiktok.com/@congen.per" target="_blank" rel="noopener noreferrer"><img src={`${base}red-tik.svg`} alt="TikTok" className="w-5 h-5 transition-transform hover:scale-110" /></a>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left md:relative md:-left-16">
            <div>
              <h4 className="font-bold text-sm mb-3 uppercase">Servicios</h4>
              <ul className="space-y-2 text-xs">
                {footerLinks.services.map(link => (
                  <li key={link}>
                      <a href="#" onClick={(e) => handleClick(e, link)} className="hover:underline opacity-80 hover:opacity-100">– {link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3 uppercase">Productos</h4>
              <ul className="space-y-2 text-xs">
                {footerLinks.products.map(link => (
                  <li key={link}>
                    <a href="#" onClick={(e) => handleClick(e, link)} className="hover:underline opacity-80 hover:opacity-100">– {link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;