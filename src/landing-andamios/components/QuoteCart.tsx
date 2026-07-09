/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, Plus, Minus, FileText, ArrowRight, ClipboardCheck } from 'lucide-react';
import { QuoteCartItem } from '../types';

interface QuoteCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: QuoteCartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onClearCart: () => void;
  onScrollToSection: (id: string) => void;
}

export default function QuoteCart({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateCartQty,
  onClearCart,
  onScrollToSection
}: QuoteCartProps) {
  if (!isOpen) return null;

  const totalWeight = cart.reduce((acc, item) => acc + (item.component.weightKg * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProceedClick = () => {
    onClose();
    onScrollToSection('cotizar');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-gray-100 animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ClipboardCheck className="w-5.5 h-5.5 text-[#991824]" />
              <h2 className="font-display font-black text-lg text-gray-900">Detalle del Requerimiento</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              <X className="w-5.5 h-5.5" />
            </button>
          </div>

          {/* Cart Contents list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5">
                <div className="p-4 bg-slate-50 rounded-full text-slate-400">
                  <FileText className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-gray-900">No hay productos seleccionados</h3>
                  <p className="font-sans text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-relaxed">
                    Navega por nuestro catálogo de componentes o usa la calculadora modular para agregar elementos automáticamente.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onScrollToSection('componentes');
                  }}
                  className="bg-[#991824]/10 hover:bg-[#991824]/20 border border-[#991824]/20 text-[#991824] font-display font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Ver Catálogo Técnico
                </button>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.component.id} className="flex py-4 items-start gap-4">
                    
                    {/* Item Details */}
                    <div className="flex-1 space-y-1">
                      <h4 className="font-display font-extrabold text-sm text-gray-900 leading-snug">
                        {item.component.name}
                      </h4>
                      <p className="font-mono text-[10px] text-gray-500">
                        {item.component.weightKg} kg/u • Total: {(item.component.weightKg * item.quantity).toFixed(1)} kg
                      </p>
                      
                      <button
                        onClick={() => onRemoveFromCart(item.component.id)}
                        className="text-[10px] font-semibold text-gray-400 hover:text-[#991824] transition-colors cursor-pointer flex items-center space-x-1 pt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Eliminar item</span>
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex flex-col items-center space-y-1 bg-gray-50 border border-gray-200 p-1.5 rounded-lg shrink-0">
                      <button
                        onClick={() => onUpdateCartQty(item.component.id, item.quantity + 1)}
                        className="p-0.5 text-gray-500 hover:text-[#991824] hover:bg-white rounded cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-xs text-gray-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateCartQty(item.component.id, Math.max(1, item.quantity - 1))}
                        className="p-0.5 text-gray-500 hover:text-[#991824] hover:bg-white rounded cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer controls & summaries */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-100 bg-slate-50/50 space-y-4.5">
              
              {/* Statistics details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Suma total de piezas:</span>
                  <span className="font-mono font-bold text-gray-900">{totalItems} unidades</span>
                </div>
                <div className="flex justify-between text-gray-500 pb-2 border-b border-gray-200/60">
                  <span>Carga logística estimada:</span>
                  <span className="font-mono font-bold text-gray-900">{totalWeight.toFixed(1)} kg</span>
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="font-display font-bold text-gray-900">Estado de la Lista:</span>
                  <span className="font-mono font-black text-[#991824] uppercase">Listo para cotizar</span>
                </div>
              </div>

              {/* Action and clear buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleProceedClick}
                  className="w-full bg-[#171717] hover:bg-[#262626] border border-white/10 text-white font-display font-bold text-sm py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Proceder a Formulario B2B</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-2.5 border border-gray-200 hover:border-[#991824]/20 text-gray-500 hover:text-[#991824] rounded-xl font-display font-semibold text-xs tracking-wide transition-colors bg-white cursor-pointer text-center"
                >
                  Vaciar Todo e Iniciar de Nuevo
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
