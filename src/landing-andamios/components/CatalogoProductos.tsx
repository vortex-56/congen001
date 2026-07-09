/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Minus, Check, ShoppingCart, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
  });

  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainProduct = PRODUCTS[0];
  const accessoryProducts = PRODUCTS.slice(1);

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
        const maxIndex = accessoryProducts.length - count;
        return Math.min(prev, maxIndex);
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = accessoryProducts.length - visibleCount;
      if (prev >= maxIndex) {
        return 0; // Wrap back to beginning
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = accessoryProducts.length - visibleCount;
      if (prev <= 0) {
        return maxIndex; // Wrap to end
      }
      return prev - 1;
    });
  };

  React.useEffect(() => {
    if (visibleCount >= accessoryProducts.length) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, visibleCount]);

  const handleQtyChange = (id: string, amount: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount)
    }));
  };

  const handleAddClick = (product: ComponentItem) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    
    // Show a quick success feedback animation
    setAddedItemIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== product.id));
    }, 1800);
  };

  const getCartQuantity = (id: string) => {
    const found = cart.find(item => item.component.id === id);
    return found ? found.quantity : 0;
  };

  // Helper render to show tailored SVG illustrations for each product
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
            {/* Hooks */}
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
            {/* Threaded rod */}
            <rect x="56" y="20" width="8" height="80" fill="#94a3b8" />
            <line x1="56" y1="30" x2="64" y2="30" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="40" x2="64" y2="40" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="50" x2="64" y2="50" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="60" x2="64" y2="60" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="70" x2="64" y2="70" stroke="#475569" strokeWidth="1.5" />
            <line x1="56" y1="80" x2="64" y2="80" stroke="#475569" strokeWidth="1.5" />
            {/* Wing nut (Mariposa) */}
            <rect x="42" y="55" width="36" height="6" fill="#3b82f6" rx="2" />
            <circle cx="45" cy="58" r="4" fill="#1d4ed8" />
            <circle cx="75" cy="58" r="4" fill="#1d4ed8" />
            {/* Base plate */}
            <rect x="35" y="95" width="50" height="8" fill="#475569" rx="1" />
          </svg>
        );
      case 'rueda-freno-8':
        return (
          <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Spindle */}
            <rect x="56" y="10" width="8" height="35" fill="#64748b" />
            {/* Yoke / caster fork */}
            <path d="M42 45 h36 v15 L66 85 H54 L42 60 Z" fill="#94a3b8" />
            {/* Caster Wheel */}
            <circle cx="60" cy="85" r="25" fill="#991824" />
            <circle cx="60" cy="85" r="15" fill="#475569" />
            <circle cx="60" cy="85" r="5" fill="#f1f5f9" />
            {/* Brake Lever */}
            <rect x="25" y="50" width="22" height="6" fill="#f59e0b" transform="rotate(-15,25,50)" rx="1" />
          </svg>
        );
      default:
        return <HelpCircle className="w-12 h-12 text-gray-300" />;
    }
  };

  return (
    <section id="componentes" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#991824] bg-[#991824]/10 border border-[#991824]/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Catálogo Industrial Congen
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-4 tracking-tight">
            Componentes Certificados del Sistema Acrow
          </h2>
          <p className="font-sans text-gray-600 mt-3 text-base">
            Todos nuestros cuerpos de andamio y accesorios son totalmente compatibles entre sí. Selecciona y añade las cantidades que requieres para tu presupuesto.
          </p>
        </div>

        {/* FEATURED: CUERPO DE ANDAMIO PRINCIPAL */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive blueprint visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl p-6 shadow-inner aspect-square max-w-[340px] mx-auto w-full relative group">
              <div className="absolute top-3 left-3 bg-[#991824] text-[10px] font-mono font-bold text-white px-2.5 py-1 rounded">
                PIEZA CLAVE
              </div>
              <div className="w-full h-full max-w-[240px] max-h-[240px] transition-transform duration-500 group-hover:scale-105">
                {renderProductIllustration(mainProduct.id)}
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-2">Diagrama estructural acotado</p>
            </div>

            {/* Right: Detailed specs sheet */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#991824] bg-[#991824]/10 px-2.5 py-1 rounded">Cuerpo de Andamio</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-gray-900 mt-2 tracking-tight">
                  {mainProduct.name}
                </h3>
                <p className="font-sans text-sm text-gray-600 mt-2 leading-relaxed">
                  {mainProduct.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-gray-100">
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {Object.entries(mainProduct.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-500 w-1/2">{key}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-gray-900">{value}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#991824]/5">
                      <td className="px-4 py-3 font-medium text-[#991824]">Peso Estructural</td>
                      <td className="px-4 py-3 font-mono font-bold text-[#991824]">{mainProduct.weightKg} kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quote action panel */}
              <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-200 p-1.5 rounded-lg">
                  <button
                    onClick={() => handleQtyChange(mainProduct.id, -10)}
                    className="p-1 text-gray-500 hover:text-[#991824] hover:bg-gray-100 rounded cursor-pointer"
                    title="-10 unidades"
                  >
                    <span className="text-xs font-bold font-mono">-10</span>
                  </button>
                  <button
                    onClick={() => handleQtyChange(mainProduct.id, -1)}
                    className="p-2 text-gray-500 hover:text-[#991824] hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-base text-gray-800 px-3 w-10 text-center">
                    {quantities[mainProduct.id] || 10}
                  </span>
                  <button
                    onClick={() => handleQtyChange(mainProduct.id, 1)}
                    className="p-2 text-gray-500 hover:text-[#991824] hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleQtyChange(mainProduct.id, 10)}
                    className="p-1 text-gray-500 hover:text-[#991824] hover:bg-gray-100 rounded cursor-pointer"
                    title="+10 unidades"
                  >
                    <span className="text-xs font-bold font-mono">+10</span>
                  </button>
                </div>

                <button
                  onClick={() => handleAddClick(mainProduct)}
                  className={`flex-1 min-w-[200px] py-3 px-6 rounded-xl font-display font-bold text-sm tracking-wide shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    addedItemIds.includes(mainProduct.id)
                      ? 'bg-[#099899] text-white hover:bg-[#077c7d] shadow-[#099899]/10'
                      : 'bg-[#171717] text-white hover:bg-[#262626] border border-white/10 shadow-neutral-100'
                  }`}
                >
                  {addedItemIds.includes(mainProduct.id) ? (
                    <>
                      <Check className="w-4 h-4 animate-scaleUp" />
                      <span>¡Añadido con éxito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Añadir a mi Cotización</span>
                    </>
                  )}
                </button>

                {getCartQuantity(mainProduct.id) > 0 && (
                  <span className="text-[11px] font-semibold text-gray-500 italic bg-gray-100 px-2.5 py-1.5 rounded-lg">
                    {getCartQuantity(mainProduct.id)} en tu lista
                  </span>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* GRID OF COMPLEMENTARY ACCESSORIES */}
        <div className="relative">
          <h3 className="font-display font-black text-xl text-gray-900 mb-6 flex items-center space-x-2">
            <span className="w-2.5 h-6 bg-[#991824] rounded-full"></span>
            <span>Accesorios y Componentes Adicionales</span>
          </h3>

          <div className="relative group/accessories">
            {/* Slider container with overflow hidden */}
            <div className="overflow-hidden p-1">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / accessoryProducts.length)}%)`,
                  width: `${(accessoryProducts.length / visibleCount) * 100}%`
                }}
              >
                {accessoryProducts.map((product) => {
                  const qty = quantities[product.id] || 4;
                  const isAdded = addedItemIds.includes(product.id);
                  const inCartQty = getCartQuantity(product.id);

                  return (
                    <div
                      key={product.id}
                      className="px-2 flex-shrink-0"
                      style={{ width: `${100 / accessoryProducts.length}%` }}
                    >
                      <div className="bg-white border border-gray-100 hover:border-[#991824]/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                        <div className="space-y-4 text-left">
                          {/* Visual box */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 aspect-video flex items-center justify-center relative overflow-hidden group">
                            <div className="w-24 h-24 transition-transform duration-300 group-hover:scale-105">
                              {renderProductIllustration(product.id)}
                            </div>
                            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-400 font-semibold bg-white/80 px-2 py-0.5 rounded">
                              {product.weightKg} kg
                            </span>
                          </div>

                          {/* Meta info */}
                          <div>
                            <h4 className="font-display font-bold text-base text-gray-900 tracking-tight leading-snug">
                              {product.name}
                            </h4>
                            <p className="font-sans text-xs text-gray-500 mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          </div>

                          {/* Quick Specifications */}
                          <div className="bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 text-[11px] font-sans text-gray-600 space-y-1">
                            {Object.entries(product.specifications).slice(0, 3).map(([k, v]) => (
                              <div key={k} className="flex justify-between">
                                <span className="font-medium text-gray-400">{k}:</span>
                                <span className="font-mono font-semibold text-gray-800">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions footer */}
                        <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                          
                          {/* Quantity selectors */}
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-gray-500">Cantidad:</span>
                            <div className="flex items-center space-x-1.5 bg-gray-100 border border-gray-200 p-1 rounded-md">
                              <button
                                onClick={() => handleQtyChange(product.id, -1)}
                                className="p-1 text-gray-500 hover:text-[#991824] hover:bg-white rounded cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono font-bold text-xs text-gray-800 px-2 w-8 text-center">
                                {qty}
                              </span>
                              <button
                                onClick={() => handleQtyChange(product.id, 1)}
                                className="p-1 text-gray-500 hover:text-[#991824] hover:bg-white rounded cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Add Button */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddClick(product)}
                              className={`flex-1 py-2 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer ${
                                isAdded
                                  ? 'bg-[#099899] text-white hover:bg-[#077c7d]'
                                  : 'bg-[#171717] hover:bg-[#262626] border border-white/10 text-white'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Añadido</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                  <span>Añadir Lista</span>
                                </>
                              )}
                            </button>

                            {inCartQty > 0 && (
                              <span className="text-[10px] font-mono font-black text-[#991824] bg-[#991824]/10 border border-[#991824]/20 px-2 py-2 rounded-lg" title="Cantidad en cotización">
                                x{inCartQty}
                              </span>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Left/Right Buttons - Only show if visibleCount < 4 */}
            {visibleCount < 4 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 hover:text-[#991824] transition-all cursor-pointer z-20 flex items-center justify-center group"
                  aria-label="Anterior accesorio"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 hover:text-[#991824] transition-all cursor-pointer z-20 flex items-center justify-center group"
                  aria-label="Siguiente accesorio"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Dots indicator */}
                <div className="flex justify-center space-x-1.5 mt-4">
                  {Array.from({ length: accessoryProducts.length - visibleCount + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === i ? 'w-6 bg-[#099899]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ir a accesorio ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
