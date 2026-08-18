/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, CheckCircle, ArrowDown, FileText, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenWhatsApp: (message?: string) => void;
}

const HERO_IMAGES = [
  'https://raw.githubusercontent.com/vortex-56/congenitem/main/q1.webp',
  'https://raw.githubusercontent.com/vortex-56/congenitem/main/q2.webp',
  'https://raw.githubusercontent.com/vortex-56/congenitem/main/q3.webp',
];

export default function Hero({ onScrollToSection, onOpenWhatsApp }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const handleWhatsAppClick = () => {
    onOpenWhatsApp(
      'Hola CONGEN PERÚ, estoy interesado en solicitar una cotización rápida para andamios Acrow.'
    );
  };

  return (
    <section id="inicio" className="relative pt-6 sm:pt-8 lg:pt-8 pb-0 overflow-hidden bg-white flex flex-col justify-between">
      
      {/* Background subtle architectural grid pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-light)" />
        </svg>
      </div>

      {/* Graphic design ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1c998d]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#991824]/5 rounded-full filter blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: VALUE PROPOSITION */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 pt-2 lg:pt-4 pb-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0d252e]">
              <ShieldCheck className="w-4 h-4 text-[#1c998d]" />
              <span className="text-[#0d252e]">Andamios Normados • CONGEN PERÚ</span>
            </div>

            {/* H1 Main SEO Title (VERDE OSCURO #0d252e, ANDAMIOS ACROW EN ROJO #991824) */}
            <h1 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0d252e] leading-[1.1]">
              Alquiler y Venta de <br className="hidden sm:inline" />
              <span className="text-[#991824] font-black">
                Andamios Acrow
              </span> <br />
              de Alta Resistencia
            </h1>

            {/* Subtítulos pequeños de color negro */}
            <p className="text-base sm:text-lg text-black max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Soluciones seguras, certificadas y normadas para proyectos de construcción civil, minería, mantenimiento industrial y acabados en todo el Perú. 
              <span className="font-bold text-black"> Stock permanente con despacho inmediato a obra.</span>
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide shadow-lg hover:shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-3"
              >
                {/* Custom WhatsApp Icon */}
                <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Cotizar por WhatsApp</span>
              </button>

              <button
                onClick={() => onScrollToSection('cotizar')}
                className="w-full sm:w-auto bg-[#1c998d] hover:bg-[#15857b] text-white px-8 py-4 rounded-xl font-display font-bold text-base tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2.5 border border-white/10"
              >
                <FileText className="w-5 h-5 text-white shrink-0" />
                <span>Solicitar Cotización</span>
              </button>
            </div>

            {/* BOTÓN DESCUBRIR (EN ROJO, ARRIBA DE LA BARRA VERDE) */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <div 
                onClick={() => onScrollToSection('barra-carrusel')}
                className="inline-flex flex-col items-center justify-center space-y-0.5 text-[#991824] hover:text-[#7d131d] transition-colors cursor-pointer group py-1"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#991824]">Descubrir</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-[#991824] group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>

          </div>

          {/* RIGHT: IMAGE CAROUSEL (3 HERO WEBP IMAGES) */}
          <div className="lg:col-span-5 relative flex justify-center items-end w-full min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] -mt-6 sm:-mt-8 lg:-mt-8">
            
            {/* Background glowing ambient light */}
            <div className="absolute inset-0 bg-[#1c998d]/10 rounded-full filter blur-2xl scale-90 animate-pulse pointer-events-none"></div>

            {/* Carousel Container - Flush against top menu bar and bottom green bar, images scaled 20% bigger */}
            <div className="relative w-full max-w-[600px] h-full min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden group">
              
              {/* Carousel Images */}
              {HERO_IMAGES.map((imgUrl, index) => (
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt={`Andamio Acrow CONGEN PERÚ ${index + 1}`}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover object-top scale-120 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 z-10'
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                />
              ))}

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#1c998d] text-white backdrop-blur-sm transition-all duration-200 opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#1c998d] text-white backdrop-blur-sm transition-all duration-200 opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

            </div>
          </div>

        </div>
      </div>
      
      {/* BARRA INFERIOR NEGRA (90% BLACK) CON NAVEGACIÓN DEL CARRUSEL DEBAJO DE LA IMAGEN */}
      <div id="barra-carrusel" className="w-full bg-black/90 text-white py-1.5 relative z-30 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-12 items-center">
            
            {/* Spacer for Left Column */}
            <div className="hidden lg:block lg:col-span-7"></div>

            {/* RIGHT 5 COLS: BARRA DE NAVEGACIÓN DEL CARRUSEL */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="flex items-center space-x-2 bg-black/25 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                {HERO_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentSlide
                        ? 'w-6 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Ir a la imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
