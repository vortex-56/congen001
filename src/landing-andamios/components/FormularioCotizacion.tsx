/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trash2, HelpCircle, Package, Plus, Minus, CheckCircle, RefreshCw, ChevronDown } from 'lucide-react';
import { QuoteCartItem, ComponentItem } from '../types';
import { PRODUCTS } from '../data/products';

interface FormularioCotizacionProps {
  cart: QuoteCartItem[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onAddConfigurationToCart: (items: { component: ComponentItem; qty: number }[]) => void;
  onOpenWhatsApp: (message?: string) => void;
}

export default function FormularioCotizacion({
  cart,
  onRemoveFromCart,
  onClearCart,
  onUpdateCartQty,
  onAddConfigurationToCart,
  onOpenWhatsApp
}: FormularioCotizacionProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isListExpandedMobile, setIsListExpandedMobile] = useState(false);

  const totalWeight = cart.reduce((acc, item) => acc + (item.component.weightKg * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Helper to get quantity for a product ID from current cart
  const getItemQty = (id: string): number => {
    const item = cart.find(i => i.component.id === id);
    return item ? item.quantity : 0;
  };

  // Set absolute quantity for a product
  const handleSetQty = (product: ComponentItem, newQty: number) => {
    const qty = Math.max(0, isNaN(newQty) ? 0 : newQty);
    const existing = cart.find(i => i.component.id === product.id);

    if (qty === 0) {
      if (existing) {
        onRemoveFromCart(product.id);
      }
    } else {
      if (existing) {
        onUpdateCartQty(product.id, qty);
      } else {
        onAddConfigurationToCart([{ component: product, qty }]);
      }
    }
  };

  // Adjust quantity by +1 or -1
  const handleAdjustQty = (product: ComponentItem, delta: number) => {
    const currentQty = getItemQty(product.id);
    handleSetQty(product, currentQty + delta);
  };

  // Build Whatsapp text string based on form & cart data
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono) {
      alert('Por favor complete su Nombre y Teléfono para coordinar el contacto.');
      return;
    }

    let messageText = `Hola CONGEN PERÚ, mi nombre es *${nombre}*.\n`;
    if (email) {
      messageText += `*Correo de contacto:* ${email}\n`;
    }
    messageText += `\n`;
    
    // Filter active items with quantity > 0
    const activeCart = cart.filter(item => item.quantity > 0);

    if (activeCart.length > 0) {
      messageText += `*DETALLE DEL REQUERIMIENTO (COMPONENTES):*\n`;
      activeCart.forEach(item => {
        messageText += `• ${item.quantity} und. - ${item.component.name}\n`;
      });
      messageText += `\n*Peso total estimado:* ${totalWeight.toFixed(1)} kg\n`;
    } else {
      messageText += `*Consulta:* Deseo solicitar catálogo técnico, precios de venta y tarifas de alquiler de andamios Acrow.\n`;
    }

    if (mensaje) {
      messageText += `\n*Mensaje adicional:* ${mensaje}\n`;
    }

    messageText += `\nPor favor, comuníquense conmigo al número *${telefono}* lo antes posible. ¡Gracias!`;
    onOpenWhatsApp(messageText);
  };

  return (
    <section id="cotizar" className="py-6 sm:py-8 bg-gray-50/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-5">
          <span className="text-[11px] sm:text-xs font-bold text-[#991824] bg-[#991824]/10 border border-[#991824]/25 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider">
            Cotización Inmediata B2B
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-gray-900 mt-1 sm:mt-2 tracking-tight">
            Solicita tu Presupuesto sin Compromiso
          </h2>
          <p className="hidden sm:block font-sans text-gray-600 mt-1.5 text-xs sm:text-sm max-w-2xl mx-auto">
            Puedes seleccionar las cantidades de cada componente o presionar los botones rápidos de configuración. Te responderemos por WhatsApp en menos de 15 minutos.
          </p>
        </div>

        {/* Form and Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          
          {/* LEFT: COMPONENT LIST & QUANTITIES */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-5 shadow-sm space-y-2 sm:space-y-3">
              
              {/* Header Title with Mobile Toggle Dropdown Button */}
              <div 
                className="flex items-center justify-between cursor-pointer lg:cursor-default gap-2 pb-1.5 sm:pb-2"
                onClick={() => setIsListExpandedMobile(!isListExpandedMobile)}
              >
                <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#991824] shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-sm sm:text-base text-gray-900 truncate">Tu Lista de Cotización</h3>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-md shrink-0">
                        Opcional
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-sans lg:hidden mt-0.5">
                      {totalItems > 0 
                        ? `${totalItems} piezas (${totalWeight.toFixed(1)} kg)` 
                        : 'Toca para desplegar y agregar componentes'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  {totalItems > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearCart();
                      }}
                      className="text-[11px] sm:text-xs font-semibold text-gray-400 hover:text-[#991824] transition-colors cursor-pointer flex items-center space-x-1"
                      title="Reiniciar lista"
                    >
                      <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Reiniciar</span>
                    </button>
                  )}

                  {/* Dropdown toggle button visible ONLY on mobile & tablet (< lg screens) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsListExpandedMobile(!isListExpandedMobile);
                    }}
                    className="lg:hidden px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    aria-label="Desplegar lista de componentes"
                  >
                    <span className="text-[11px] font-bold text-[#991824]">
                      {isListExpandedMobile ? 'Ocultar' : 'Agregar'}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#991824] transition-transform duration-300 ${isListExpandedMobile ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* COLLAPSIBLE BODY: Hidden on mobile/tablet by default unless expanded, ALWAYS visible on lg desktop screens */}
              <div className={`space-y-3 pt-2 border-t border-gray-100 ${isListExpandedMobile ? 'block' : 'hidden lg:block'}`}>
                {/* COMPONENT LIST SHOWING ALL CERTIFIED PRODUCTS - COMPACT HIGH-DENSITY LAYOUT */}
                <div className="space-y-1.5 divide-y divide-gray-100/80">
                  {PRODUCTS.map((product) => {
                    const qty = getItemQty(product.id);
                    const isSelected = qty > 0;
                    const itemWeight = product.weightKg * qty;

                    return (
                      <div
                        key={product.id}
                        className={`pt-1.5 pb-0.5 flex items-center justify-between gap-2 transition-colors ${
                          isSelected ? 'bg-[#991824]/5 -mx-1.5 px-2 py-1 rounded-lg border border-[#991824]/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {product.imageUrl && (
                            <div className="w-7 h-7 bg-slate-50 border border-slate-200 rounded-md p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                width="28"
                                height="28"
                                className="max-h-full max-w-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1 leading-tight">
                            <div className="flex items-center gap-1">
                              <h4 className={`font-display font-bold text-[11px] sm:text-xs truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`} title={product.name}>
                                {product.name}
                              </h4>
                              {isSelected && (
                                <CheckCircle className="w-3 h-3 text-[#991824] shrink-0" />
                              )}
                            </div>
                            <p className="font-mono text-[9px] sm:text-[10px] text-gray-400">
                              {product.weightKg} kg/u {isSelected ? `• Subtotal: ${itemWeight.toFixed(1)} kg` : ''}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Control Bar: [-] [Input Number] [+] */}
                        <div className="flex items-center space-x-0.5 shrink-0 bg-gray-50 border border-gray-200 p-0.5 rounded-lg">
                          <button
                            type="button"
                            onClick={() => handleAdjustQty(product, -1)}
                            disabled={qty === 0}
                            className="p-1 text-gray-600 hover:text-[#991824] hover:bg-white rounded disabled:opacity-30 disabled:hover:text-gray-600 cursor-pointer transition-all"
                            title="Restar 1 unidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <input
                            type="number"
                            min="0"
                            value={qty}
                            onChange={(e) => handleSetQty(product, parseInt(e.target.value) || 0)}
                            className={`w-10 text-center py-0.5 font-mono font-bold text-xs rounded border outline-none transition-colors ${
                              isSelected
                                ? 'bg-white text-[#991824] border-[#991824]/40 ring-1 ring-[#991824]/20'
                                : 'bg-white text-gray-500 border-gray-200'
                            }`}
                          />

                          <button
                            type="button"
                            onClick={() => handleAdjustQty(product, 1)}
                            className="p-1 text-gray-600 hover:text-[#991824] hover:bg-white rounded cursor-pointer transition-all"
                            title="Sumar 1 unidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Footer */}
                <div className="pt-2 border-t border-gray-100 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-600 text-[11px]">
                    <span>Total de piezas seleccionadas:</span>
                    <span className="font-mono font-bold text-gray-900">{totalItems} unidades</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-[11px]">
                    <span>Peso neto estimado:</span>
                    <span className="font-mono font-bold text-gray-900">{totalWeight.toFixed(1)} kg</span>
                  </div>

                  {/* Info Note */}
                  <div className="bg-slate-50 p-2 rounded-lg text-[10px] text-gray-500 leading-snug italic border border-slate-100 flex gap-1.5 mt-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#991824] shrink-0 mt-0.5" />
                    <span>Si dejas la lista en 0, la solicitud se enviará como una consulta general de catálogo y precios.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div id="formulario" className="lg:col-span-6 bg-white border border-gray-100 rounded-2xl p-5 sm:p-7 shadow-sm">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4 sm:space-y-5">
              
              {/* NOMBRE FIELD */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Ing. Carlos Mendoza"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-xs sm:text-sm bg-gray-50/50 focus:bg-white transition-all shadow-xs"
                />
              </div>

              {/* TELEFONO FIELD */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Teléfono / WhatsApp *</label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 sm:px-3.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-600 text-xs font-mono font-bold">
                    +51
                  </span>
                  <input
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="999 999 999"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-r-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-xs sm:text-sm bg-gray-50/50 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* CORREO ELECTRONICO FIELD (OPCIONAL) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Correo Electrónico (Opcional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@constructora.com"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-xs sm:text-sm bg-gray-50/50 focus:bg-white transition-all shadow-xs"
                />
              </div>

              {/* MENSAJE FIELD */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Especificaciones o Comentarios (Opcional)</label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={3}
                  placeholder="Ej. Requiero cotización para alquiler por 30 días en San Juan de Lurigancho..."
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-xs sm:text-sm bg-gray-50/50 focus:bg-white transition-all resize-none shadow-xs"
                />
              </div>

              {/* WHATSAPP SUBMIT BUTTON */}
              <div className="pt-1 space-y-3">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-display font-bold text-xs sm:text-sm tracking-wide py-3.5 sm:py-4 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  {/* WhatsApp SVG logo */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Enviar Cotización por WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Atención inmediata
                  </span>
                  <span>•</span>
                  <span>Respuesta en &lt; 15 min</span>
                  <span>•</span>
                  <span>Directo de fábrica</span>
                </div>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

