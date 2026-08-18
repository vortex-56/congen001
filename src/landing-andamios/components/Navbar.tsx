/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Menu, X, FileText } from 'lucide-react';
import { Modalidad, QuoteCartItem } from '../types';

interface NavbarProps {
  cart: QuoteCartItem[];
  onOpenCart: () => void;
  onScrollToSection: (id: string, modalidad?: Modalidad) => void;
}

export default function Navbar({ cart, onOpenCart, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Nav links with explicit modality selection for Venta / Alquiler
  const navLinks: { name: string; id: string; modalidad?: Modalidad }[] = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Venta', id: 'venta', modalidad: 'venta' },
    { name: 'Alquiler', id: 'alquiler', modalidad: 'alquiler' },
    { name: 'Componentes', id: 'componentes' },
    { name: 'Seguridad', id: 'seguridad' }
  ];

  return (
    <header className="relative w-full z-50 shadow-md bg-[#1c998d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          
          {/* LOGO DESKTOP (CAJA ANCHA CON LOGO COMPLETO) */}
          <div 
            className="hidden lg:flex bg-[#0d252e] hover:bg-[#153b49] px-10 lg:px-16 py-1.5 sm:py-2 rounded-xl border border-white/10 shadow-md items-center justify-center cursor-pointer shrink-0 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden" 
            onClick={() => onScrollToSection('inicio')}
          >
            <img 
              src="https://congen.com.pe/logo3.svg" 
              alt="CONGEN PERÚ Logo" 
              width="160"
              height="36"
              decoding="async"
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain transition-opacity drop-shadow-sm transform scale-[1.95]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* LOGO MÓVIL (CAJA CUADRADA CON EL SÍMBOLO DEL FOOTER, LOGO 30% MÁS GRANDE INSIDE) */}
          <div 
            className="flex lg:hidden bg-[#0d252e] hover:bg-[#153b49] p-2.5 rounded-lg border border-white/10 shadow-md items-center justify-center cursor-pointer shrink-0 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden" 
            onClick={() => onScrollToSection('inicio')}
            title="CONGEN PERÚ"
          >
            <img 
              src="https://congen.com.pe/logo-simbolo.svg" 
              alt="CONGEN PERÚ Símbolo" 
              width="20"
              height="20"
              decoding="async"
              className="w-5 h-5 object-contain drop-shadow-sm transform scale-[1.3]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* DESKTOP NAV LINKS EN LA MISMA SECCIÓN DEL LOGO */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onScrollToSection(link.id, link.modalidad)}
                className="font-display font-bold text-white hover:text-emerald-100 transition-colors duration-200 cursor-pointer text-sm sm:text-base tracking-wide py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* ACCIONES A LA DERECHA: MENÚ MÓVIL */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* MOBILE MENU TOGGLE BUTTON (MISMAS LÍNEAS BLANCAS SIN FONDO OSCURO) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 cursor-pointer transition-colors flex lg:hidden items-center justify-center focus:outline-none"
              aria-label="Menú"
            >
              {isOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden bg-[#0d252e] text-white border-t border-white/10 shadow-2xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onScrollToSection(link.id, link.modalidad);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-base font-bold text-white hover:bg-[#1c998d] rounded-xl transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 px-2 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onScrollToSection('cotizar');
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#1c998d] hover:bg-[#17857b] rounded-xl font-bold text-white transition-colors text-sm shadow-md"
              >
                <FileText className="w-4.5 h-4.5 text-white" />
                <span>Cotizar en 1 Clic</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

