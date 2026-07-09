/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Menu, X, FileText, Phone } from 'lucide-react';
import { QuoteCartItem } from '../types';

interface NavbarProps {
  cart: QuoteCartItem[];
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ cart, onOpenCart, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Venta', id: 'venta-alquiler' },
    { name: 'Alquiler', id: 'venta-alquiler' },
    { name: 'Componentes', id: 'componentes' },
    { name: 'Calculadora', id: 'calculadora' },
    { name: 'Seguridad', id: 'seguridad' }
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-neutral-900/85 backdrop-blur-md border border-white/15 rounded-full shadow-2xl px-6 lg:px-8">
        <div className="flex justify-between h-16 xl:h-20 items-center">
          
          {/* LOGO CONGEN */}
          <div className="flex items-center cursor-pointer" onClick={() => onScrollToSection('inicio')}>
            {/* Desktop Logo */}
            <img 
              src="https://congen.com.pe/logo3.svg" 
              alt="CONGEN S.A.C. Logo" 
              className="hidden xl:block h-10 lg:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
              referrerPolicy="no-referrer"
            />
            {/* Mobile Logo */}
            <img 
              src="https://congen.com.pe/logo-simbolo.svg" 
              alt="CONGEN S.A.C. Símbolo" 
              className="block xl:hidden h-8 w-auto object-contain hover:opacity-90 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onScrollToSection(link.id)}
                className="font-sans font-medium text-white hover:text-[#991824] transition-colors duration-200 cursor-pointer text-sm py-2 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#991824] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden xl:flex items-center space-x-4">
            {/* Quote Cart Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-white/10 text-white transition-colors duration-200 cursor-pointer"
              title="Ver mi Lista de Cotización"
            >
              <FileText className="w-5.5 h-5.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#991824] text-[10px] font-bold text-white ring-2 ring-neutral-900 animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => onScrollToSection('cotizar')}
              className="bg-[#171717] hover:bg-[#262626] border border-white/10 text-white px-6 py-2.5 rounded-full font-display font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
            >
              <span>Cotizar en un Clic</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#991824]/80 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#991824]"></span>
              </span>
            </button>
          </div>

          {/* MOBILE TOGGLE & CART */}
          <div className="flex xl:hidden items-center space-x-3">
            {/* Quick Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <FileText className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#991824] text-[10px] font-bold text-white ring-2 ring-neutral-950">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Red button with white hamburger icon -> changed to footer gray button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-full bg-[#171717] hover:bg-[#262626] border border-white/10 text-white cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5.5 h-5.5 text-white" /> : <Menu className="w-5.5 h-5.5 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="xl:hidden mt-2 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onScrollToSection(link.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-base font-semibold text-white hover:bg-white/10 hover:text-[#991824] rounded-2xl transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 px-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenCart();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 border border-white/20 rounded-2xl font-medium text-white hover:bg-white/10 transition-colors text-sm"
              >
                <FileText className="w-4.5 h-4.5 text-[#991824]" />
                <span>Ver Mi Cotización ({totalItems})</span>
              </button>
              
              <button
                onClick={() => {
                  onScrollToSection('cotizar');
                  setIsOpen(false);
                }}
                className="w-full text-center py-3 bg-[#171717] hover:bg-[#262626] border border-white/10 text-white rounded-2xl font-bold tracking-wide text-sm shadow-md transition-colors"
              >
                Cotizar en un Clic
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
