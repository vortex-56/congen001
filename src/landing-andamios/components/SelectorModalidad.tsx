/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Hammer, Shield, RefreshCw, Layers, Award, HardHat, TrendingUp, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c001.webp', title: 'Andamio de Trabajo en Obra' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c002.webp', title: 'Estructura Modular CONGEN' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c003.webp', title: 'Montaje Seguro en Altura' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c004.webp', title: 'Torre de Andamio Acrow' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c005.webp', title: 'Inspección de Plataforma' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c006.webp', title: 'Acabados y Pintura en Fachada' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c007.webp', title: 'Andamiaje para Construcción' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c008.webp', title: 'Sistema con Niveladores y Ruedas' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c009.webp', title: 'Operario en Línea de Vida' },
    { url: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/c010.webp', title: 'Flota de Andamios Certificados' }
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

  // Carousel auto-advance (only when modal is closed)
  React.useEffect(() => {
    if (selectedImageIndex !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, visibleCount, selectedImageIndex]);

  // Modal navigation controls
  const handleModalNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
  };

  const handleModalPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation for enlarged modal
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImageIndex]);

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
    <section ref={sectionRef} id="venta-alquiler" className="py-16 sm:py-20 bg-[#1c998d] text-white border-b border-[#168076] relative overflow-hidden">
      
      {/* Background subtle overlay */}
      <div className="absolute inset-0 bg-[#0d252e]/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold text-white uppercase tracking-widest bg-white/20 border border-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full">
            Servicios a tu Medida
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-4 tracking-tight drop-shadow-sm">
            ¿Buscas Alquiler Temporal o Compra de Flotas?
          </h2>
          <p className="font-sans text-white mt-3 text-base">
            En CONGEN PERÚ nos adaptamos al tamaño y presupuesto de tu obra. Selecciona la modalidad para ver tus beneficios preferenciales:
          </p>
        </div>

        {/* Gallery Section - Square Carousel */}
        <div className="relative max-w-7xl mx-auto mb-12 px-4 md:px-12 group/gallery">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-3 sm:p-4 shadow-xl relative">
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
                  <div 
                    onClick={() => setSelectedImageIndex(idx)}
                    className="bg-gray-100 rounded-xl overflow-hidden border border-white/30 relative group aspect-square flex flex-col justify-end shadow-md cursor-pointer hover:border-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {/* Image */}
                    {isSectionVisible && (
                      <img 
                        src={img.url} 
                        alt={img.title || `Andamio Congen ${idx + 1}`} 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                      <div className="flex justify-end">
                        <span className="bg-black/60 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20 shadow-sm">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                      <p className="text-white text-xs font-semibold drop-shadow-md truncate">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls - Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-[#1c998d] p-2.5 rounded-full shadow-lg border border-white/30 hover:text-[#0d252e] transition-all cursor-pointer z-20 flex items-center justify-center group"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Controls - Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-[#1c998d] p-2.5 rounded-full shadow-lg border border-white/30 hover:text-[#0d252e] transition-all cursor-pointer z-20 flex items-center justify-center group"
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
                className="p-2.5 -m-1.5 flex items-center justify-center cursor-pointer"
                aria-label={`Ir a diapositiva ${i + 1}`}
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 block ${
                    currentIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ENLARGED LIGHTBOX MODAL CAROUSEL */}
        {selectedImageIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn select-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Top Bar: Title, Counter & Close Button */}
            <div 
              className="w-full max-w-5xl flex items-center justify-between z-20 text-white pt-2 pb-2 px-2 sm:px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </span>
                <span className="text-sm font-semibold text-white/90 hidden sm:inline">
                  {galleryImages[selectedImageIndex].title}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="bg-white/20 hover:bg-[#991824] text-white p-2.5 rounded-full border border-white/30 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                title="Cerrar (Esc)"
                aria-label="Cerrar galería"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Central Stage with Big Image and Nav Buttons */}
            <div 
              className="relative flex-1 w-full max-w-4xl flex items-center justify-center py-2 px-4 sm:px-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={handleModalPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-[#0d252e] p-3 rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl z-20 hover:scale-110"
                title="Anterior (Flecha izquierda)"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Big Square Image Container */}
              <div className="relative w-full max-w-[82vw] sm:max-w-[70vh] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/25 bg-black/40 flex items-center justify-center">
                <img
                  src={galleryImages[selectedImageIndex].url}
                  alt={galleryImages[selectedImageIndex].title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleModalNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-[#0d252e] p-3 rounded-full border border-white/30 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl z-20 hover:scale-110"
                title="Siguiente (Flecha derecha)"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Thumbnails Strip */}
            <div 
              className="w-full max-w-3xl overflow-x-auto py-2 px-2 flex items-center justify-center gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((thumb, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setSelectedImageIndex(tIdx)}
                  className={`w-11 h-11 sm:w-13 sm:h-13 aspect-square rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                    selectedImageIndex === tIdx
                      ? 'border-white scale-110 ring-2 ring-[#1c998d] shadow-lg'
                      : 'border-white/30 opacity-50 hover:opacity-100 hover:border-white/70'
                  }`}
                  aria-label={`Ver imagen ${tIdx + 1}`}
                >
                  <img
                    src={thumb.url}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div className="flex flex-col sm:flex-row p-2.5 sm:p-1.5 bg-[#0d252e]/60 border border-white/20 rounded-[28px] sm:rounded-2xl shadow-lg w-full sm:w-auto max-w-md sm:max-w-none gap-2.5 sm:gap-0 backdrop-blur-md">
            <button
              onClick={() => onChangeModalidad('alquiler')}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-xl font-display font-bold text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer w-full sm:w-auto ${
                activeModalidad === 'alquiler'
                  ? 'bg-white text-[#1c998d] shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Alquiler de Andamios</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                activeModalidad === 'alquiler' ? 'bg-[#0d252e] text-white' : 'bg-white/20 text-white'
              }`}>
                Más Solicitado
              </span>
            </button>
            <button
              onClick={() => onChangeModalidad('venta')}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-xl font-display font-bold text-sm transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 cursor-pointer w-full sm:w-auto ${
                activeModalidad === 'venta'
                  ? 'bg-[#991824] text-white shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Compra de Andamios</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                activeModalidad === 'venta' ? 'bg-black/40 text-white' : 'bg-white/20 text-white'
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
                      className={`bg-white p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full text-left ${
                        activeModalidad === 'alquiler' ? 'hover:border-[#1c998d]/50' : 'hover:border-[#991824]/50'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className={`p-3 rounded-xl w-fit ${
                          activeModalidad === 'alquiler' ? 'bg-[#1c998d]/10' : 'bg-[#991824]/10'
                        }`}>
                          {benefit.icon}
                        </div>
                        <h3 className={`font-display font-bold text-lg text-gray-900 tracking-tight transition-colors ${
                          activeModalidad === 'alquiler' ? 'group-hover:text-[#1c998d]' : 'group-hover:text-[#991824]'
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
                activeModalidad === 'alquiler' ? 'hover:text-[#1c998d]' : 'hover:text-[#991824]'
              }`}
              aria-label="Anterior beneficio"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNextBenefit}
              className={`absolute -right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 transition-all cursor-pointer z-20 flex items-center justify-center group ${
                activeModalidad === 'alquiler' ? 'hover:text-[#1c998d]' : 'hover:text-[#991824]'
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
                  className="p-2.5 -m-1.5 flex items-center justify-center cursor-pointer"
                  aria-label={`Ir al beneficio ${i + 1}`}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 block ${
                      benefitIndex === i 
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeModalidad === 'alquiler' ? rentalBenefits : salesBenefits).map((benefit, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left ${
                  activeModalidad === 'alquiler' ? 'hover:border-[#1c998d]/50' : 'hover:border-[#991824]/50'
                }`}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl w-fit ${
                    activeModalidad === 'alquiler' ? 'bg-[#1c998d]/10' : 'bg-[#991824]/10'
                  }`}>
                    {benefit.icon}
                  </div>
                  <h3 className={`font-display font-bold text-lg text-gray-900 tracking-tight transition-colors ${
                    activeModalidad === 'alquiler' ? 'group-hover:text-[#1c998d]' : 'group-hover:text-[#991824]'
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
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0d252e] text-white border border-white/20 text-center sm:text-left relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
            <div>
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                {activeModalidad === 'alquiler'
                  ? 'Cotiza tu alquiler de andamios hoy mismo'
                  : 'Adquiere andamios de calidad insuperable'}
              </h4>
              <p className="text-sm text-teal-100/90 mt-1">
                {activeModalidad === 'alquiler'
                  ? 'Tarifas preferenciales para constructoras y contratistas de acabados. Cotizamos sin compromiso.'
                  : 'Preparamos lotes listos para entrega inmediata con certificados listos para tus prevencionistas de riesgo.'}
              </p>
            </div>
            <button
              onClick={() => onScrollToSection('formulario')}
              className="px-6 py-3.5 bg-[#1c998d] hover:bg-[#168076] border border-white/20 text-white rounded-xl font-display font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Solicitar Cotización
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
