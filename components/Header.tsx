import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'NOSOTROS', href: '#about', dropdown: false },
    { name: 'PRODUCTOS', href: '/productos', dropdown: true },
    { name: 'SERVICIOS', href: '/servicios', dropdown: true },
    { name: 'PROYECTOS', href: '#projects', dropdown: false },
];

const productLinks = [
    { name: 'VIDRIOS', target: 'vidrios' },
    { name: 'MOBILIARIOS', target: 'mobiliario' },
    { name: 'ACCESORIOS', target: 'accesorios' },
    { name: 'TABIQUERÍA Y ENCHAPADOS', target: 'tabiquería-y-enchapados' },
    { name: 'ANDAMIOS', target: 'andamios' },
];

const serviceLinks = [
    { name: 'CARPINTERÍA DE VIDRIO Y ALUMINIO', target: 'Carpintería de Vidrio y Aluminio' },
    { name: 'TABIQUERÍA Y ENCHAPADO', target: 'Tabiquería y Enchapado' },
    { name: 'ALQUILER Y VENTA DE ANDAMIOS', target: 'Alquiler y Venta de Andamios' },
    { name: 'MANTENIMIENTOS', target: 'Mantenimientos' },
    { name: 'PINTADOS', target: 'Pintados' },
    { name: 'LIMPIEZA DE VIDRIOS', target: 'Limpieza de Vidrios' },
    { name: 'PULIDO Y BISELADO', target: 'Pulido y Biselado' },
    { name: 'ARENADO', target: 'Arenado' },
];

const mobileProductLinks = productLinks.map(p => ({ ...p, name: `- ${p.name}` }));
const mobileServiceLinks = serviceLinks.map(s => ({ ...s, name: `- ${s.name}` }));

const SubMenu = ({ items, isOpen, onMouseEnter, widthClass, onItemClick }: { items: { name: string; target?: string; href?: string }[]; isOpen: boolean; onMouseEnter: () => void; widthClass?: string; onItemClick?: (e: React.MouseEvent, target?: string) => void; }) => (
    <div
        onMouseEnter={onMouseEnter}
        className={`absolute top-full left-0 mt-4 ${widthClass || 'w-56'} rounded-md shadow-lg bg-white/80 backdrop-blur-md ring-1 ring-black ring-opacity-5 z-20 transition-all ease-out duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        role="menu"
        aria-hidden={!isOpen}
    >
        <div className="py-1" role="presentation">
            {items.map((item) => (
                <a
                    key={item.name}
                    href={item.href || '#'}
                    onClick={(e) => {
                        if (item.target && onItemClick) {
                            onItemClick(e, item.target);
                        }
                    }}
                    className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-['Karla',_sans-serif] font-normal"
                    role="menuitem"
                    tabIndex={isOpen ? 0 : -1}
                >
                    {item.name}
                </a>
            ))}
        </div>
    </div>
);


const Header: React.FC = () => {
    const [isProductsOpen, setProductsOpen] = useState(false);
    const [isServicesOpen, setServicesOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const productsTimeoutRef = useRef<number | null>(null);
    const servicesTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
            if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
        };
    }, [menuRef]);

    const handleMouseEnter = (menu: 'products' | 'services') => {
        if (menu === 'products') {
            if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
            setProductsOpen(true);
        } else { // services
            if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
            setServicesOpen(true);
        }
    };

    const handleMouseLeave = (menu: 'products' | 'services') => {
        const timeoutId = window.setTimeout(() => {
            if (menu === 'products') setProductsOpen(false);
            else setServicesOpen(false);
        }, 200);

        if (menu === 'products') productsTimeoutRef.current = timeoutId;
        else servicesTimeoutRef.current = timeoutId;
    };
    
    const navigate = useNavigate();
    const location = useLocation();

    const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[^\w-]/g, '');

    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        if (target === '#') return;
        setMobileMenuOpen(false);

        // If we're already on the homepage, scroll directly.
        if (location.pathname === '/') {
            const element = document.querySelector(target);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Otherwise navigate to home and pass the target in location state so App can scroll after route change
        navigate('/', { state: { scrollTarget: target } });
    };

    const handleProductClick = (e: React.MouseEvent, targetSlug?: string) => {
        if (e) e.preventDefault();
        setMobileMenuOpen(false);
        if (!targetSlug) return;
        const targetId = `#productos-${slugify(targetSlug)}`;

        if (location.pathname === '/productos') {
            const el = document.querySelector(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        navigate('/productos', { state: { scrollTarget: targetId } });
    };

    const handleServiceClick = (e: React.MouseEvent, targetSlug?: string) => {
        if (e) e.preventDefault();
        setMobileMenuOpen(false);
        if (!targetSlug) return;
        const targetId = `#servicios-${slugify(targetSlug)}`;

        if (location.pathname === '/servicios') {
            const el = document.querySelector(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        navigate('/servicios', { state: { scrollTarget: targetId } });
    };

    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        if (location.pathname === '/') {
            const contactSection = document.getElementById('contacto');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            return;
        }

    navigate('/', { state: { scrollTarget: '#contacto' } });
    }


    return (
        <header className="absolute top-0 left-0 w-full z-30">
            <div id="menu" ref={menuRef} className="absolute top-9 left-1/2 -translate-x-1/2 w-[333px] md:w-[738px] lg:w-[960px] h-auto flex flex-col items-center p-[6px] z-50">
                <div id="menu-base" className="absolute top-0 w-[312px] h-[64px] md:w-[744px] md:h-[48px] lg:w-[960px] rounded-full bg-[rgba(74,74,74,0.11)] border-2 border-[rgba(255,255,255,0.33)] shadow-[0px_0px_8px_rgba(0,0,0,1)] backdrop-blur-md"></div>
                <div id="menu-contenido" className="relative w-full h-[52px] flex flex-row items-center justify-center md:justify-start lg:justify-between px-0">
                    {/* Desktop Logo */}
                    <Link to="/" className="hidden md:block w-[192px] h-[21px] cursor-pointer relative bottom-[29px] lg:bottom-8">
                        <img src="/logo3.svg" alt="Logo de la Marca" />
                    </Link>

                    {/* Mobile Symbol */}
                    <Link to="/" className="md:hidden absolute left-8 top-1/2 -translate-y-1/2 w-auto h-auto cursor-pointer">
                        <img src="/logo-simbolo.svg" alt="Logo Simbolo" className="h-10" />
                    </Link>

                    {/* Desktop Nav Group */}
                    <div className="hidden md:flex items-center flex-grow justify-between ml-6 lg:ml-0 lg:flex-grow-0 lg:justify-start lg:gap-8 relative bottom-[8px] lg:bottom-2">
                        {/* Desktop Menu */}
                        <div className="flex flex-row justify-center items-center h-6 gap-8 lg:relative lg:-left-12">
                           {navLinks.map(link => (
                                <div 
                                    key={link.name} 
                                    className="relative flex items-center h-full"
                                    onMouseEnter={() => {
                                        if (link.dropdown) handleMouseEnter(link.name === 'PRODUCTOS' ? 'products' : 'services');
                                    }}
                                    onMouseLeave={() => {
                                        if (link.dropdown) handleMouseLeave(link.name === 'PRODUCTOS' ? 'products' : 'services');
                                    }}
                                >
                                    {link.href.startsWith('/') ? (
                                        <Link to={link.href} className="flex items-center gap-1 text-white text-xs font-bold [text-shadow:0px_0px_8px_rgba(0,0,0,0.77)] transition-transform hover:scale-110">
                                            {link.name}
                                                {link.dropdown && <img src="/flecha1.svg" alt="arrow" className="w-2 h-2 invert rotate-180" />}
                                        </Link>
                                    ) : (
                                            <a href={link.href} onClick={(e) => scrollTo(e, link.href)} className="flex items-center gap-1 text-white text-xs font-bold [text-shadow:0px_0px_8px_rgba(0,0,0,0.77)] transition-transform hover:scale-110">
                                                {link.name}
                                                {link.dropdown && <img src="/flecha1.svg" alt="arrow" className="w-2 h-2 invert rotate-180" />}
                                            </a>
                                    )}
                                     {link.dropdown && link.name === 'PRODUCTOS' && (
                                            <SubMenu items={productLinks} isOpen={isProductsOpen} onMouseEnter={() => handleMouseEnter('products')} onItemClick={(e, target) => handleProductClick(e, target)} />
                                     )}
                                     {link.dropdown && link.name === 'SERVICIOS' && (
                                            <SubMenu items={serviceLinks} isOpen={isServicesOpen} onMouseEnter={() => handleMouseEnter('services')} widthClass="w-72" onItemClick={(e, target) => handleServiceClick(e, target)} />
                                     )}
                                </div>
                           ))}
                        </div>
                        
                         {/* Desktop Contact Button */}
                        <button onClick={scrollToContact} className="flex justify-center items-center w-[125px] h-9 bg-[#990021] rounded-full text-white text-xs font-bold transition-transform hover:bg-[#77001A] hover:scale-105 lg:relative lg:bottom-[0.5px] lg:right-[2px]">
                            contáctanos
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
                        className="md:hidden absolute right-5 top-1/2 -translate-y-1/2 flex justify-center items-center w-[108px] h-12 bg-[#990021] rounded-full cursor-pointer transition-transform hover:bg-[#77001A]"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="box-productos-ultimate-m"
                    >
                        <img src="/ico-menu.svg" alt="Botón de Menú" className="w-6 h-6"/>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div 
                    id="box-productos-ultimate-m" 
                    className={`md:hidden absolute top-[64px] right-10 w-72 bg-[rgba(0,0,0,0.88)] backdrop-blur-md rounded-lg flex flex-col items-start p-4 gap-2 transition-all ease-out duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
                    role="menu"
                    aria-hidden={!isMobileMenuOpen}
                >
                     <a href="#about" onClick={(e) => scrollTo(e, '#about')} className="w-full text-left text-white font-semibold text-sm py-1" role="menuitem">NOSOTROS</a>
                     <Link to="/productos" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-white font-semibold text-sm py-1" role="menuitem">PRODUCTOS</Link>
                     {mobileProductLinks.map(link => (
                         <a key={link.name} href="#" onClick={(e) => handleProductClick(e, link.target)} className="block w-full text-left text-white text-xs py-1" role="menuitem">{link.name}</a>
                     ))}
                      <Link to="/servicios" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-white font-semibold text-sm py-1" role="menuitem">SERVICIOS</Link>
                      {mobileServiceLinks.map(link => (
                         <a key={link.name} href="#" onClick={(e) => handleServiceClick(e as any, link.target)} className="block w-full text-left text-white text-xs py-1" role="menuitem">{link.name}</a>
                      ))}
                      <a href="#projects" onClick={(e) => scrollTo(e, '#projects')} className="w-full text-left text-white font-semibold text-sm py-1" role="menuitem">PROYECTOS</a>
                      <a href="#contacto" onClick={(e) => scrollToContact(e)} className="w-full text-left text-white font-semibold text-sm py-1" role="menuitem">CONTACTO</a>
                 </div>
            </div>
        </header>
    );
};

export default Header;
