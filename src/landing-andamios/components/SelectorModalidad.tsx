/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Hammer, Shield, RefreshCw, Layers, Award, HardHat, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Modalidad } from '../types';

interface SelectorModalidadProps {
  activeModalidad: Modalidad;
  onChangeModalidad: (modalidad: Modalidad) => void;
  onScrollToSection: (id: string) => void;
}

export default function SelectorModalidad({
  activeModalidad,
  onChangeModalidad,
  onScrollToSection
}: SelectorModalidadProps) {
  
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    { url: 'https://congen.com.pe/t2-img1.webp' },
    { url: 'https://congen.com.pe/t2-img2.webp' },
    { url: 'https://congen.com.pe/t2-img3.webp' },
    { url: 'https://congen.com.pe/t2-img4.webp' },
    { url: 'https://congen.com.pe/t2-img1.webp' },
    { url: 'https://congen.com.pe/t2-img2.webp' },
    { url: 'https://congen.com.pe/t2-img3.webp' },
    { url: 'https://congen.com.pe/t2-img4.webp' },
    { url: 'https://congen.com.pe/t2-img1.webp' },
    { url: 'https://congen.com.pe/t2-img2.webp' },
    { url: 'https://congen.com.pe/t2-img3.webp' },
    { url: 'https://congen.com.pe/t2-img4.webp' }
  ];

  React.useEffect(() => {
    const handleResize = () => {
      let count = 4;
      if (window.innerWidth < 640) {
        count = 1;
      } else if (window.innerWidth < 1024) {
        count = 2;
      }
      setVisibleCount(count);
      setCurrentIndex((prev) => {
        const maxIndex = galleryImages.length - count;
        return Math.min(prev, maxIndex);
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = galleryImages.length - visibleCount;
      if (prev >= maxIndex) {
        return 0; // Wrap back to beginning
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = galleryImages.length - visibleCount;
      if (prev <= 0) {
        return maxIndex; // Wrap to end
      }
      return prev - 1;
    });
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, visibleCount]);

  const [isMobile, setIsMobile] = React.useState(false);
  const [benefitIndex, setBenefitIndex] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (!mobile) {
        setBenefitIndex(0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextBenefit = () => {
    setBenefitIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  };

  const handlePrevBenefit = () => {
    setBenefitIndex((prev) => (prev <= 0 ? 3 : prev - 1));
  };

  React.useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      handleNextBenefit();
    }, 6000);
    return () => clearInterval(timer);
  }, [isMobile, benefitIndex]);

  React.useEffect(() => {
    setBenefitIndex(0);
  }, [activeModalidad]);

  const rentalBenefits = [
    {
      icon: <Calendar className="w-6 h-6 text-[#099899]" />,
      title: 'Tarifas Flexibles de Alquiler',
      desc: 'Alquila por días, semanas o meses con tarifas altamente competitivas que se adaptan al cronograma exacto de tu obra.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#099899]" />,
      title: 'Mantenimiento e Inspección',
      desc: 'Entregamos marcos 100% alineados, limpios de concreto, libres de óxido y estructuralmente óptimos bajo estricto control de calidad.'
    },
    {
      icon: <HardHat className="w-6 h-6 text-[#099899]" />,
      title: 'Asesoría y Modulación Gratuita',
      desc: 'Nuestros ingenieros calculan la cantidad exacta de cuerpos y la distribución idónea para la máxima seguridad en altura.'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#099899]" />,
      title: 'Ampliación de Stock en 24 Horas',
      desc: '¿Tu proyecto creció? Despachamos andamios adicionales a cualquier distrito de Lima y provincias de forma inmediata.'
    }
  ];

  const salesBenefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-[#991824]" />,
      title: 'Precios de Fábrica y Lotes B2B',
      desc: 'Garantiza el menor costo por metro cuadrado comprando directamente del fabricante. Ofrecemos descuentos especiales por volumen.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#991824]" />,
      title: 'Garantía Estructural Certificada',
      desc: 'Respaldamos la calidad de nuestros andamios con garantía estructural contra defectos de fabricación o fallas en la soldadura.'
    },
    {
      icon: <Shield className="w-6 h-6 text-[#991824]" />,
      title: 'Pintura Epóxica Horneada o Galvanizado',
      desc: 'Acabados industriales de alta adherencia que toleran la humedad extrema de la costa y el desgaste rudo del trabajo en obra.'
    },
    {
      icon: <Hammer className="w-6 h-6 text-[#991824]" />,
      title: 'Activos de Larga Vida Útil',
      desc: 'Nuestros andamios están fabricados con acero ASTM A513 de 2.0mm, garantizando una vida útil superior a los 10 años en condiciones rudas.'
    }
  ];

  return (
    <section id="venta-alquiler" className="py-20 bg-gray-50/70 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#991824] uppercase tracking-widest bg-[#991824]/10 px-3.5 py-1.5 rounded-full">
            Servicios a tu Medida
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-4 tracking-tight">
            ¿Buscas Alquiler Temporal o Compra de Flotas?
          </h2>
          <p className="font-sans text-gray-600 mt-3 text-base">
            En CONGEN S.A.C. nos adaptamos al tamaño y presupuesto de tu obra. Selecciona la modalidad para ver tus beneficios preferenciales:
          </p>
        </div>

        {/* Gallery Section */}
        <div className="relative max-w-7xl mx-auto mb-12 px-4 md:px-12 group/gallery">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / galleryImages.length)}%)`,
                width: `${(galleryImages.length / visibleCount) * 100}%`
              }}
            >
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="px-2 flex-shrink-0"
                  style={{ width: `${100 / galleryImages.length}%` }}
                >
                  <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-100/60 relative group aspect-[4/3] flex flex-col justify-end shadow-sm">
                    {/* Image */}
                    <img 
                      src={img.url} 
                      alt={`Andamio Congen ${idx + 1}`} 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls - Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg border border-gray-200 hover:text-[#991824] transition-all cursor-pointer z-20 flex items-center justify-center group"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Controls - Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg border border-gray-200 hover:text-[#991824] transition-all cursor-pointer z-20 flex items-center justify-center group"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-1.5 mt-4">
            {Array.from({ length: galleryImages.length - visibleCount + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-[#099899]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a diapositiva ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div className="flex flex-col sm:flex-row p-2.5 sm:p-1.5 bg-white border border-gray-200 rounded-[28px] sm:rounded-2xl shadow-sm w-full sm:w-auto max-w-md sm:max-w-none gap-2.5 sm:gap-0">
            <button
              onClick={() => onChangeModalidad('alquiler')}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-xl font-display font-bold text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer w-full sm:w-auto ${
                activeModalidad === 'alquiler'
                  ? 'bg-[#099899] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Alquiler de Andamios</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeModalidad === 'alquiler' ? 'bg-[#077c7d] text-white' : 'bg-[#099899]/10 text-[#099899]'
              }`}>
                Más Solicitado
              </span>
            </button>
            <button
              onClick={() => onChangeModalidad('venta')}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-xl font-display font-bold text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer w-full sm:w-auto ${
                activeModalidad === 'venta'
                  ? 'bg-[#991824] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Compra de Andamios</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeModalidad === 'venta' ? 'bg-[#80121d] text-white' : 'bg-[#991824]/10 text-[#991824]'
              }`}>
                Precio Fábrica
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Grid / Mobile Carousel */}
        {isMobile ? (
          <div className="relative group/benefit px-2">
            <div className="overflow-hidden p-1">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${benefitIndex * 25}%)`,
                  width: '400%'
                }}
              >
                {(activeModalidad === 'alquiler' ? rentalBenefits : salesBenefits).map((benefit, idx) => (
                  <div
                    key={idx}
                    className="w-1/4 flex-shrink-0 px-2"
                  >
                    <div
                      className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full text-left ${
                        activeModalidad === 'alquiler' ? 'hover:border-[#099899]/30' : 'hover:border-[#991824]/30'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className={`p-3 rounded-xl w-fit ${
                          activeModalidad === 'alquiler' ? 'bg-[#099899]/10' : 'bg-[#991824]/10'
                        }`}>
                          {benefit.icon}
                        </div>
                        <h3 className={`font-display font-bold text-lg text-gray-900 tracking-tight transition-colors ${
                          activeModalidad === 'alquiler' ? 'group-hover:text-[#099899]' : 'group-hover:text-[#991824]'
                        }`}>
                          {benefit.title}
                        </h3>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lateral buttons */}
            <button
              onClick={handlePrevBenefit}
              className={`absolute -left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 transition-all cursor-pointer z-20 flex items-center justify-center group ${
                activeModalidad === 'alquiler' ? 'hover:text-[#099899]' : 'hover:text-[#991824]'
              }`}
              aria-label="Anterior beneficio"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNextBenefit}
              className={`absolute -right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 transition-all cursor-pointer z-20 flex items-center justify-center group ${
                activeModalidad === 'alquiler' ? 'hover:text-[#099899]' : 'hover:text-[#991824]'
              }`}
              aria-label="Siguiente beneficio"
            >
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-1.5 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBenefitIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    benefitIndex === i 
                      ? activeModalidad === 'alquiler' ? 'w-6 bg-[#099899]' : 'w-6 bg-[#991824]'
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al beneficio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeModalidad === 'alquiler' ? rentalBenefits : salesBenefits).map((benefit, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group text-left ${
                  activeModalidad === 'alquiler' ? 'hover:border-[#099899]/30' : 'hover:border-[#991824]/30'
                }`}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl w-fit ${
                    activeModalidad === 'alquiler' ? 'bg-[#099899]/10' : 'bg-[#991824]/10'
                  }`}>
                    {benefit.icon}
                  </div>
                  <h3 className={`font-display font-bold text-lg text-gray-900 tracking-tight transition-colors ${
                    activeModalidad === 'alquiler' ? 'group-hover:text-[#099899]' : 'group-hover:text-[#991824]'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer dynamic CTA card inside selector */}
        <div className={`mt-10 p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden shadow-sm ${
          activeModalidad === 'alquiler' 
            ? 'bg-gradient-to-br from-[#099899]/5 via-white to-[#099899]/5 border-[#099899]/20' 
            : 'bg-gradient-to-br from-[#991824]/5 via-white to-[#991824]/5 border-[#991824]/20'
        }`}>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
            <div>
              <h4 className="font-display font-extrabold text-xl text-gray-900">
                {activeModalidad === 'alquiler'
                  ? 'Cotiza tu alquiler de andamios hoy mismo'
                  : 'Adquiere andamios de calidad insuperable'}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {activeModalidad === 'alquiler'
                  ? 'Tarifas preferenciales para constructoras y contratistas de acabados. Cotizamos sin compromiso.'
                  : 'Preparamos lotes listos para entrega inmediata con certificados listos para tus prevencionistas de riesgo.'}
              </p>
            </div>
            <button
              onClick={() => onScrollToSection('calculadora')}
              className="px-6 py-3 bg-[#171717] hover:bg-[#262626] border border-white/10 text-white rounded-xl font-display font-bold text-sm tracking-wide shadow transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Calcular Requerimiento
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
