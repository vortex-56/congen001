/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, CheckCircle, ArrowDown, FileText, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenWhatsApp: (message?: string) => void;
}

export default function Hero({ onScrollToSection, onOpenWhatsApp }: HeroProps) {
  const handleWhatsAppClick = () => {
    onOpenWhatsApp(
      'Hola CONGEN S.A.C., estoy interesado en solicitar una cotización rápida para andamios Acrow.'
    );
  };

  return (
    <section id="inicio" className="relative pt-28 pb-24 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-[#1f1f1f] via-[#171717] to-[#0c0c0c] border-b border-white/10">
      
      {/* Background architectural pattern */}
      <div className="absolute inset-0 opacity-100 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Graphic design ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#991824]/10 rounded-full filter blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#099899]/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: VALUE PROPOSITION */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider animate-pulse">
              <ShieldCheck className="w-4 h-4 text-[#099899]" />
              <span className="text-gray-300">Andamios Normados • CONGEN S.A.C.</span>
            </div>

            {/* H1 Main SEO Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
              Alquiler y Venta de <br className="hidden sm:inline" />
              <span className="text-[#ff4155] drop-shadow-[0_2px_10px_rgba(255,65,85,0.15)]">
                Andamios Acrow
              </span> <br />
              de Alta Resistencia
            </h1>

            {/* Compelling Subheading */}
            <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Soluciones seguras, certificadas y normadas para proyectos de construcción civil, minería, mantenimiento industrial y acabados en todo el Perú. 
              <span className="font-semibold text-white"> Stock permanente con despacho inmediato a obra.</span>
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide shadow-lg hover:shadow-green-600/35 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center justify-center space-x-3"
              >
                {/* Custom WhatsApp Icon */}
                <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Cotizar por WhatsApp</span>
              </button>

              <button
                onClick={() => onScrollToSection('componentes')}
                className="w-full sm:w-auto border-2 border-white/20 hover:border-[#099899] hover:bg-[#099899]/10 text-white px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide transition-all duration-300 hover:shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Ver Catálogo Técnico</span>
              </button>
            </div>

            {/* Dynamic floating micro-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all flex items-start space-x-3 text-left">
                <div className="p-2 bg-[#991824]/20 text-[#ff4d5a] rounded-lg">
                  <span className="font-mono font-bold text-sm">2mm</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Espesor Real</h4>
                  <p className="text-xs text-gray-400">Tubería de alta resistencia estructural</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all flex items-start space-x-3 text-left">
                <div className="p-2 bg-[#099899]/20 text-[#099899] rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Soldadura MIG</h4>
                  <p className="text-xs text-gray-400">Fusiones perfectas y certificadas</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:bg-white/10 transition-all flex items-start space-x-3 text-left">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Despacho Veloz</h4>
                  <p className="text-xs text-gray-400">Entregas puntuales directo a tu obra</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: VECTOR ART (ADVANCED SCAFFOLDING BLUEPRINT) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Background glowing circle */}
            <div className="absolute inset-0 bg-[#099899]/10 rounded-full filter blur-xl scale-75 animate-pulse"></div>

            {/* Highly customized scaffolding SVG diagram */}
            <div className="relative bg-[#0a0a0a] border border-white/15 rounded-2xl p-6 shadow-2xl w-full max-w-[420px] aspect-[4/5] flex flex-col justify-between text-white overflow-hidden group">
              
              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}></div>

              {/* Top Banner inside visual */}
              <div className="relative z-10 flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#991824] animate-ping"></div>
                  <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">ESQUEMA TÉCNICO ACROW</span>
                </div>
                <span className="font-mono text-[9px] text-[#099899] font-bold px-1.5 py-0.5 bg-[#099899]/10 rounded border border-[#099899]/20">MIG CERTIFIED</span>
              </div>

              {/* Main SVG Scaffold diagram */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                <svg className="w-full max-h-[280px]" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Ground Line */}
                  <line x1="10" y1="260" x2="190" y2="260" stroke="#475569" strokeWidth="3" strokeDasharray="3 3" />
                  
                  {/* LEVEL 1 GROUND SUPPORT - JACKS */}
                  <line x1="35" y1="260" x2="35" y2="245" stroke="#991824" strokeWidth="4" />
                  <line x1="165" y1="260" x2="165" y2="245" stroke="#991824" strokeWidth="4" />
                  <rect x="25" y="258" width="20" height="3" fill="#991824" />
                  <rect x="155" y="258" width="20" height="3" fill="#991824" />

                  {/* LEVEL 1 FRAME (Vertical and horizontals) */}
                  {/* Left frame leg */}
                  <rect x="33" y="145" width="4" height="100" fill="#991824" rx="1" />
                  {/* Right frame leg */}
                  <rect x="163" y="145" width="4" height="100" fill="#991824" rx="1" />
                  {/* Horizontals */}
                  <line x1="35" y1="150" x2="165" y2="150" stroke="#991824" strokeWidth="3" />
                  <line x1="35" y1="240" x2="165" y2="240" stroke="#991824" strokeWidth="2" />
                  {/* Intermediate reinforcements */}
                  <line x1="35" y1="180" x2="65" y2="180" stroke="#991824" strokeWidth="2" />
                  <line x1="135" y1="180" x2="165" y2="180" stroke="#991824" strokeWidth="2" />
                  <line x1="65" y1="150" x2="65" y2="240" stroke="#991824" strokeWidth="1.5" />
                  <line x1="135" y1="150" x2="135" y2="240" stroke="#991824" strokeWidth="1.5" />

                  {/* LEVEL 1 SCISSOR (Cruceta) */}
                  <line x1="35" y1="155" x2="165" y2="235" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-red-400 transition-colors" />
                  <line x1="165" y1="155" x2="35" y2="235" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-red-400 transition-colors" />
                  {/* Center pin connection */}
                  <circle cx="100" cy="195" r="4.5" fill="#f1f5f9" stroke="#991824" strokeWidth="1.5" />

                  {/* LEVEL 2 FRAME (Vertical and horizontals) */}
                  {/* Connectors/joints */}
                  <rect x="32" y="141" width="6" height="8" fill="#099899" rx="0.5" />
                  <rect x="162" y="141" width="6" height="8" fill="#099899" rx="0.5" />
                  
                  {/* Upper Left Frame Leg */}
                  <rect x="33" y="45" width="4" height="100" fill="#991824" rx="1" />
                  {/* Upper Right Frame Leg */}
                  <rect x="163" y="45" width="4" height="100" fill="#991824" rx="1" />
                  {/* Upper Horizontals */}
                  <line x1="35" y1="50" x2="165" y2="50" stroke="#991824" strokeWidth="3" />
                  <line x1="35" y1="140" x2="165" y2="140" stroke="#991824" strokeWidth="2" />
                  {/* Intermediate reinforcements level 2 */}
                  <line x1="35" y1="80" x2="65" y2="80" stroke="#991824" strokeWidth="2" />
                  <line x1="135" y1="80" x2="165" y2="80" stroke="#991824" strokeWidth="2" />
                  <line x1="65" y1="50" x2="65" y2="140" stroke="#991824" strokeWidth="1.5" />
                  <line x1="135" y1="50" x2="135" y2="140" stroke="#991824" strokeWidth="1.5" />

                  {/* LEVEL 2 SCISSOR (Cruceta) */}
                  <line x1="35" y1="55" x2="165" y2="135" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                  <line x1="165" y1="55" x2="35" y2="135" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                  {/* Center pin connection */}
                  <circle cx="100" cy="95" r="4.5" fill="#f1f5f9" stroke="#991824" strokeWidth="1.5" />

                  {/* METAL PLANKS (Tablones) - Highlighted in brand green for safety */}
                  <rect x="25" y="42" width="150" height="7" fill="#099899" rx="1" className="animate-pulse" />
                  {/* Detail of plank lines */}
                  <line x1="30" y1="45" x2="170" y2="45" stroke="#077c7d" strokeWidth="1" strokeDasharray="3 1" />

                  {/* Safety Handrail (Baranda de seguridad) */}
                  <rect x="33" y="10" width="2" height="35" fill="#f59e0b" />
                  <rect x="165" y="10" width="2" height="35" fill="#f59e0b" />
                  <line x1="33" y1="15" x2="167" y2="15" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="33" y1="28" x2="167" y2="28" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Dimensions Annotations */}
                  {/* Vertical Height Annotation */}
                  <g className="opacity-75">
                    <line x1="185" y1="45" x2="185" y2="245" stroke="#94a3b8" strokeWidth="0.75" />
                    <path d="M185 45l-2 4h4l-2-4zM185 245l-2-4h4l-2 4z" fill="#94a3b8" />
                    <text x="193" y="150" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(90,193,150)">4.00 m</text>
                  </g>

                  {/* Width Annotation */}
                  <g className="opacity-75">
                    <line x1="35" y1="272" x2="165" y2="272" stroke="#94a3b8" strokeWidth="0.75" />
                    <path d="M35 272l4-2v4l-4-2zM165 272l-4-2v4l4-2z" fill="#94a3b8" />
                    <text x="100" y="280" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">1.25 m (Ancho)</text>
                  </g>
                </svg>
              </div>

              {/* Lower Technical Specifications Details */}
              <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#991824]"></span>
                  <span>Acero ASTM A513</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#099899]"></span>
                  <span>Tablón Carga: 250kg/m²</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Nivelador: Ajustable</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                  <span>Doble Freno Seg.</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Down arrow decorator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-1 text-emerald-100/70 hover:text-white transition-colors cursor-pointer" onClick={() => onScrollToSection('venta-alquiler')}>
        <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">Descubrir</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#099899]" />
      </div>

    </section>
  );
}
