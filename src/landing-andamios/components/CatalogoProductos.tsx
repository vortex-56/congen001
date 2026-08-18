/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, Check, ShoppingCart, HelpCircle, ChevronLeft, ChevronRight, Pause } from 'lucide-react';
import { ComponentItem, QuoteCartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface CatalogoProductosProps {
  onAddToCart: (component: ComponentItem, quantity: number) => void;
  cart: QuoteCartItem[];
}

export default function CatalogoProductos({ onAddToCart, cart }: CatalogoProductosProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'cuerpo-acrow-200': 10,
    'tablon-metalico-180': 20,
    'cruceta-tijera-180': 10,
    'nivelador-regulable': 4,
    'rueda-freno-8': 4,
    'baranda-seguridad-modulo': 2,
    'rodapie-seguridad-180': 4,
    'escalera-seguridad-interior': 1,
  });

  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  // Auto-play control state
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      let perPage = 3;
      if (window.innerWidth < 640) {
        perPage = 1;
      } else if (window.innerWidth < 1024) {
        perPage = 2;
      }
      setItemsPerPage(perPage);
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, PRODUCTS.length - perPage)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, PRODUCTS.length - itemsPerPage);

  // Pause auto-play temporarily and set timer to resume after 4.5 seconds
  const pauseTemporarily = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  // Auto-slide loop interval
  useEffect(() => {
    if (isPaused || isDragging || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, maxIndex]);

  const handleNext = () => {
    pauseTemporarily();
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    pauseTemporarily();
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Drag / Swipe Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
    pauseTemporarily();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
    pauseTemporarily();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleQtyChange = (id: string, amount: number) => {
    pauseTemporarily();
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount)
    }));
  };

  const handleAddClick = (product: ComponentItem) => {
    pauseTemporarily();
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    
    setAddedItemIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== product.id));
    }, 1800);
  };

  const getCartQuantity = (id: string) => {
    const found = cart.find(item => item.component.id === id);
    return found ? found.quantity : 0;
  };

  // Helper SVG illustrations
  const renderProductIllustration = (id: string) => {
    switch (id) {
      case 'cuerpo-acrow-200':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="10" width="70" height="100" stroke="#991824" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="2 2" />
            <rect x="30" y="15" width="4" height="90" fill="#991824" rx="1" />
            <rect x="86" y="15" width="4" height="90" fill="#991824" rx="1" />
            <line x1="30" y1="20" x2="90" y2="20" stroke="#991824" strokeWidth="2.5" />
            <line x1="30" y1="100" x2="90" y2="100" stroke="#991824" strokeWidth="2" />
            <line x1="30" y1="45" x2="50" y2="45" stroke="#991824" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="70" y1="45" x2="90" y2="45" stroke="#991824" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="50" y1="20" x2="50" y2="100" stroke="#991824" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="70" y1="20" x2="70" y2="100" stroke="#991824" strokeWidth="1" strokeOpacity="0.6" />
          </svg>
        );
      case 'tablon-metalico-180':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="45" width="90" height="30" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" rx="2" />
            <line x1="20" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 1" />
            <line x1="20" y1="60" x2="100" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 1" />
            <line x1="20" y1="70" x2="100" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 1" />
            <path d="M12 45 c0-5 6-5 6 0" stroke="#64748b" strokeWidth="3" fill="none" />
            <path d="M12 75 c0-5 6-5 6 0" stroke="#64748b" strokeWidth="3" fill="none" />
            <path d="M102 45 c0-5 6-5 6 0" stroke="#64748b" strokeWidth="3" fill="none" />
            <path d="M102 75 c0-5 6-5 6 0" stroke="#64748b" strokeWidth="3" fill="none" />
          </svg>
        );
      case 'cruceta-tijera-180':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="25" x2="105" y2="95" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <line x1="105" y1="25" x2="15" y2="95" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="60" r="5" fill="#f1f5f9" stroke="#991824" strokeWidth="2" />
          </svg>
        );
      case 'nivelador-regulable':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="56" y="20" width="8" height="80" fill="#94a3b8" />
            <line x1="56" y1="30" x2="64" y2="30" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="40" x2="64" y2="40" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="50" x2="64" y2="50" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="60" x2="64" y2="60" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="70" x2="64" y2="70" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="80" x2="64" y2="80" stroke="#475569" strokeWidth="1.5" />
            <rect x="42" y="55" width="36" height="6" fill="#1c998d" rx="2" />
            <circle cx="45" cy="58" r="4" fill="#168076" />
            <circle cx="75" cy="58" r="4" fill="#168076" />
            <rect x="35" y="95" width="50" height="8" fill="#475569" rx="1" />
          </svg>
        );
      case 'rueda-freno-8':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="56" y="10" width="8" height="35" fill="#64748b" />
            <path d="M42 45 h36 v15 L66 85 H54 L42 60 Z" fill="#94a3b8" />
            <circle cx="60" cy="85" r="25" fill="#991824" />
            <circle cx="60" cy="85" r="15" fill="#475569" />
            <circle cx="60" cy="85" r="5" fill="#f1f5f9" />
            <rect x="25" y="50" width="22" height="6" fill="#f59e0b" transform="rotate(-15,25,50)" rx="1" />
          </svg>
        );
      case 'baranda-seguridad-modulo':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Parantes verticales */}
            <rect x="20" y="20" width="5" height="85" fill="#991824" rx="1" />
            <rect x="95" y="20" width="5" height="85" fill="#991824" rx="1" />
            {/* Pasamanos superior */}
            <line x1="20" y1="28" x2="100" y2="28" stroke="#991824" strokeWidth="3" strokeLinecap="round" />
            {/* Pasamanos intermedio */}
            <line x1="20" y1="58" x2="100" y2="58" stroke="#991824" strokeWidth="2.5" strokeDasharray="6 2" />
            {/* Cruceta de protección integradas */}
            <line x1="22" y1="28" x2="98" y2="88" stroke="#099899" strokeWidth="2" strokeLinecap="round" />
            <line x1="98" y1="28" x2="22" y2="88" stroke="#099899" strokeWidth="2" strokeLinecap="round" />
            <circle cx="60" cy="58" r="4" fill="#1c998d" />
            {/* Rodapié inferior integrado */}
            <rect x="20" y="88" width="80" height="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" rx="1" />
          </svg>
        );
      case 'rodapie-seguridad-180':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Zócalo metalico principal */}
            <rect x="15" y="50" width="90" height="24" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" rx="2" />
            <line x1="15" y1="56" x2="105" y2="56" stroke="#f8fafc" strokeWidth="1" />
            <line x1="15" y1="68" x2="105" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Pliegues de refuerzo y rotulo de seguridad */}
            <rect x="40" y="57" width="40" height="10" fill="#991824" rx="1" />
            <rect x="43" y="60" width="34" height="4" fill="#ffffff" rx="0.5" />
            {/* Ganchos de encaje rapido */}
            <path d="M15 50 V38 C15 34 22 34 22 38 V50" stroke="#475569" strokeWidth="2.5" fill="none" />
            <path d="M105 50 V38 C105 34 98 34 98 38 V50" stroke="#475569" strokeWidth="2.5" fill="none" />
          </svg>
        );
      case 'escalera-seguridad-interior':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Escalera inclinada con largueros */}
            <line x1="32" y1="18" x2="62" y2="102" stroke="#991824" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="18" x2="88" y2="102" stroke="#991824" strokeWidth="3" strokeLinecap="round" />
            {/* Peldaños antideslizantes */}
            <line x1="36" y1="30" x2="62" y2="30" stroke="#475569" strokeWidth="2.5" />
            <line x1="42" y1="46" x2="68" y2="46" stroke="#475569" strokeWidth="2.5" />
            <line x1="48" y1="62" x2="74" y2="62" stroke="#475569" strokeWidth="2.5" />
            <line x1="54" y1="78" x2="80" y2="78" stroke="#475569" strokeWidth="2.5" />
            <line x1="60" y1="94" x2="86" y2="94" stroke="#475569" strokeWidth="2.5" />
            {/* Ganchos de sujecion superior */}
            <path d="M32 18 C32 8 42 8 42 18" stroke="#099899" strokeWidth="3" fill="none" />
            <path d="M58 18 C58 8 68 8 68 18" stroke="#099899" strokeWidth="3" fill="none" />
          </svg>
        );
      default:
        return <HelpCircle className="w-12 h-12 text-gray-300" />;
    }
  };

  // Display PRODUCTS directly (no duplicates)
  const displayProducts = PRODUCTS;
  const percentageShift = currentIndex * (100 / displayProducts.length);

  return (
    <section id="componentes" className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#991824] bg-[#991824]/10 border border-[#991824]/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Catálogo Industrial Congen
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-gray-900 mt-3 tracking-tight">
            Componentes Certificados del Sistema Acrow
          </h2>
          <p className="font-sans text-gray-600 mt-2 text-sm sm:text-base">
            Todos nuestros componentes y piezas estructurales son 100% compatibles entre sí. Explora la vitrina técnica e ingresa tus cantidades en el formulario para cotizar.
          </p>
        </div>

        {/* CAROUSEL CONTROLS BAR */}
        <div className="flex flex-wrap items-center justify-between mb-6 px-1 gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-6 bg-[#991824] rounded-full"></span>
            <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">
              Vitrina de Partes y Accesorios ({PRODUCTS.length} Componentes)
            </h3>
            {isPaused && (
              <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Pause className="w-2.5 h-2.5" /> Pausado
              </span>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-2 bg-gray-50 hover:bg-[#991824] hover:text-white text-gray-700 rounded-full border border-gray-200 shadow-sm transition-all cursor-pointer"
              aria-label="Componente anterior"
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Slide Indicator Pills */}
            <div className="flex items-center space-x-1.5 px-2">
              {Array.from({ length: Math.max(1, PRODUCTS.length - itemsPerPage + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    pauseTemporarily();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-6 bg-[#991824]' : 'w-2 bg-gray-200 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a la posición ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 bg-gray-50 hover:bg-[#991824] hover:text-white text-gray-700 rounded-full border border-gray-200 shadow-sm transition-all cursor-pointer"
              aria-label="Siguiente componente"
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INTERACTIVE CAROUSEL TRACK */}
        <div 
          className="relative overflow-hidden p-1 rounded-2xl cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-out'}`}
            style={{
              transform: `translateX(calc(-${percentageShift}% + ${dragOffset}px))`,
              width: `${(displayProducts.length / itemsPerPage) * 100}%`
            }}
          >
            {displayProducts.map((product) => {
              const isMainBody = product.id === 'cuerpo-acrow-200';

              return (
                <div
                  key={product.id}
                  className="px-2.5 flex-shrink-0"
                  style={{ width: `${100 / displayProducts.length}%` }}
                >
                  <div className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full relative ${
                    isMainBody ? 'border-[#991824]/40 ring-1 ring-[#991824]/20' : 'border-gray-100 hover:border-[#1c998d]/40'
                  }`}>
                    
                    {/* Top Header Badge */}
                    <div className="space-y-3.5 text-left">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
                        
                        {/* Category Tag (Floating on top z-10) */}
                        <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm ${
                          isMainBody ? 'bg-[#991824] text-white' : 'bg-[#1c998d] text-white'
                        }`}>
                          {isMainBody ? 'MARCO PRINCIPAL' : 'ACCESORIO'}
                        </span>

                        {/* Weight Tag (Floating on top z-10 bottom right inside image box) */}
                        <span className="absolute bottom-2.5 right-2.5 z-10 text-[11px] font-mono font-bold text-gray-800 bg-white/95 border border-gray-200/80 px-2.5 py-0.5 rounded-md shadow-sm backdrop-blur-xs">
                          {product.weightKg} kg
                        </span>

                        {/* Product Image */}
                        <div className="w-full h-full flex items-center justify-center p-2">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain rounded-lg drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-28 h-28">
                              {renderProductIllustration(product.id)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info & Title */}
                      <div>
                        <h4 className="font-display font-bold text-base text-gray-900 tracking-tight leading-snug" title={product.name}>
                          {product.name}
                        </h4>
                        <p className="font-sans text-xs text-gray-500 mt-1.5 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Specs Summary */}
                      <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 text-[11px] font-sans text-gray-600 space-y-1">
                        {Object.entries(product.specifications).slice(0, 4).map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center gap-2">
                            <span className="font-medium text-gray-400 truncate">{k}:</span>
                            <span className="font-mono font-semibold text-gray-800 shrink-0">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Hint */}
        <p className="text-center text-xs text-gray-400 mt-4 font-sans">
          💡 Puedes arrastrar con el mouse o dedo en móviles para deslizarte por la vitrina de componentes.
        </p>

      </div>
    </section>
  );
}
