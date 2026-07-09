/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171717] text-neutral-300 pt-16 pb-16 relative overflow-hidden border-t border-white/5">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#991824]/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => onScrollToSection('inicio')}>
              <img 
                src="https://congen.com.pe/logo-simbolo.svg" 
                alt="CONGEN S.A.C. Símbolo" 
                className="h-12 w-auto object-contain hover:opacity-90 transition-opacity bg-white/5 p-2 rounded-lg border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="font-sans text-xs text-neutral-400 max-w-sm leading-relaxed">
              Fabricante, distribuidor y proveedor de andamiaje Acrow modular homologado para obras civiles, industriales y mineras en el Perú. Garantizamos máxima seguridad con aceros de espesor de 2.0mm.
            </p>

            <div className="flex items-center space-x-2.5 bg-black/20 p-3 rounded-xl border border-white/5 w-fit">
              <ShieldCheck className="w-5 h-5 text-[#099899]" />
              <span className="font-mono text-[10px] text-neutral-300 font-semibold uppercase tracking-wider">Socio Certificado de Confianza</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-2.5 text-xs">
              {['Inicio', 'Venta y Alquiler', 'Componentes', 'Calculadora', 'Seguridad'].map((item) => {
                const idMap: Record<string, string> = {
                  'Inicio': 'inicio',
                  'Venta y Alquiler': 'venta-alquiler',
                  'Componentes': 'componentes',
                  'Calculadora': 'calculadora',
                  'Seguridad': 'seguridad'
                };
                return (
                  <li key={item}>
                    <button
                      onClick={() => onScrollToSection(idMap[item])}
                      className="text-neutral-400 hover:text-[#991824] transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-widest">Oficinas y Planta</h4>
            
            <ul className="space-y-3.5 text-xs text-neutral-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#991824] shrink-0 mt-0.5" />
                <span>Av. Próceres de la Independencia 1640, San Juan de Lurigancho, Lima, Perú.</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#991824] shrink-0" />
                <span>ventas@congen.com.pe</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#991824] shrink-0" />
                <span>+51 914 109 040</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}
