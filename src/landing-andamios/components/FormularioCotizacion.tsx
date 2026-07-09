/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileText, Trash2, HelpCircle, Package } from 'lucide-react';
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
  const [mensaje, setMensaje] = useState('');

  const totalWeight = cart.reduce((acc, item) => acc + (item.component.weightKg * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Quick preset loading helper
  const handleLoadPreset = (type: 'basico' | 'obra-mediana') => {
    onClearCart();
    if (type === 'basico') {
      onAddConfigurationToCart([
        { component: PRODUCTS[0], qty: 10 }, // 10 cuerpos
        { component: PRODUCTS[1], qty: 10 }, // 10 tablones
        { component: PRODUCTS[2], qty: 20 }, // 20 crucetas
        { component: PRODUCTS[3], qty: 4 },  // 4 husillos
      ]);
    } else {
      onAddConfigurationToCart([
        { component: PRODUCTS[0], qty: 30 }, // 30 cuerpos
        { component: PRODUCTS[1], qty: 30 }, // 30 tablones
        { component: PRODUCTS[2], qty: 60 }, // 60 crucetas
        { component: PRODUCTS[3], qty: 16 }, // 16 husillos
      ]);
    }
  };

  // Build Whatsapp text string based on form & cart data
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono) {
      alert('Por favor complete su Nombre y Teléfono para coordinar el contacto.');
      return;
    }

    let messageText = `Hola CONGEN S.A.C., mi nombre es *${nombre}*.\n\n`;
    
    if (cart.length > 0) {
      messageText += `*DETALLE DEL REQUERIMIENTO:*\n`;
      cart.forEach(item => {
        messageText += `• ${item.quantity} und. - ${item.component.name}\n`;
      });
      messageText += `\n*Peso total estimado:* ${totalWeight.toFixed(1)} kg\n`;
    } else {
      messageText += `*Consulta:* Deseo solicitar catálogo, precios de venta y tarifas de alquiler de andamios Acrow.\n`;
    }

    if (mensaje) {
      messageText += `\n*Mensaje adicional:* ${mensaje}\n`;
    }

    messageText += `\nPor favor, comuníquense conmigo al número *${telefono}* lo antes posible. ¡Gracias!`;
    onOpenWhatsApp(messageText);
  };

  return (
    <section id="cotizar" className="py-24 bg-gray-50/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#991824] bg-[#991824]/10 border border-[#991824]/25 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Cotización Inmediata B2B
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 mt-4 tracking-tight">
            Solicita tu Presupuesto sin Compromiso
          </h2>
          <p className="font-sans text-gray-600 mt-3 text-base">
            Completa el formulario a continuación. Puedes cargar lotes rápidos preestablecidos o rellenar tus productos favoritos del catálogo. Te responderemos en menos de 15 minutos.
          </p>
        </div>

        {/* Form and Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: LIVE QUOTE LIST (CART DETAILS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2.5">
                  <Package className="w-5 h-5 text-[#991824]" />
                  <h3 className="font-display font-bold text-lg text-gray-900">Tu Lista de Cotización</h3>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs font-semibold text-gray-400 hover:text-[#991824] transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                )}
              </div>

              {/* CART CONTENT CONDITIONAL */}
              {cart.length === 0 ? (
                <div className="py-8 text-center space-y-4">
                  <div className="p-4 bg-slate-50 rounded-full w-fit mx-auto text-slate-400">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-display font-bold text-sm text-gray-900">Tu lista está vacía</p>
                    <p className="font-sans text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                      Añade componentes desde el catálogo o selecciona uno de nuestros paquetes rápidos para empresas:
                    </p>
                  </div>

                  {/* QUICK PRESET BUTTONS */}
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={() => handleLoadPreset('basico')}
                      className="py-2.5 px-3 bg-[#991824]/10 hover:bg-[#991824]/20 border border-[#991824]/20 text-[#991824] rounded-xl font-display font-bold text-[11px] transition-colors cursor-pointer flex flex-col items-center gap-1"
                    >
                      <span>Lote Básico</span>
                      <span className="font-mono text-[9px] font-medium text-[#991824]">(10 Cuerpos + Acc.)</span>
                    </button>
                    <button
                      onClick={() => handleLoadPreset('obra-mediana')}
                      className="py-2.5 px-3 bg-[#099899]/10 hover:bg-[#099899]/20 border border-[#099899]/20 text-[#099899] rounded-xl font-display font-bold text-[11px] transition-colors cursor-pointer flex flex-col items-center gap-1"
                    >
                      <span>Obra Mediana</span>
                      <span className="font-mono text-[9px] font-medium text-[#099899]">(30 Cuerpos + Acc.)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Cart List */}
                  <div className="max-h-[280px] overflow-y-auto pr-1 space-y-3 divide-y divide-gray-50">
                    {cart.map((item, idx) => (
                      <div key={item.component.id} className={`flex items-center justify-between pt-3 ${idx === 0 ? 'pt-0' : ''}`}>
                        <div className="space-y-0.5">
                          <h4 className="font-display font-bold text-xs text-gray-900 max-w-[180px] truncate" title={item.component.name}>
                            {item.component.name}
                          </h4>
                          <span className="font-mono text-[10px] text-gray-400">
                            {item.component.weightKg} kg/u • Total: {(item.component.weightKg * item.quantity).toFixed(1)} kg
                          </span>
                        </div>

                        {/* Quantity input in table */}
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => onUpdateCartQty(item.component.id, Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-12 text-center py-1 border border-gray-200 rounded font-mono font-bold text-xs text-gray-800 bg-gray-50 focus:bg-white"
                          />
                          <button
                            onClick={() => onRemoveFromCart(item.component.id)}
                            className="p-1 text-gray-400 hover:text-[#991824] transition-colors cursor-pointer"
                            title="Eliminar de la lista"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary items */}
                  <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Total de piezas añadidas:</span>
                      <span className="font-mono font-bold text-gray-900">{totalItems} unidades</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Peso neto total del lote:</span>
                      <span className="font-mono font-bold text-gray-900">{totalWeight.toFixed(1)} kg</span>
                    </div>

                    {/* Safety alert message */}
                    <div className="bg-slate-50 p-3 rounded-xl text-[10px] text-gray-500 leading-relaxed italic border border-slate-100 flex gap-2 mt-2">
                      <HelpCircle className="w-4 h-4 text-[#991824] shrink-0 mt-0.5" />
                      <span>Revisamos todos los cálculos de modulación de forma manual antes del despacho para garantizar que no te sobren ni falten componentes estructurales.</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* NOMBRE FIELD */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Nombre Completo *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Ing. Carlos Mendoza"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-sm bg-gray-50/50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* TELEFONO FIELD */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Teléfono / WhatsApp *</label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-xs font-mono font-bold">
                      +51
                    </span>
                    <input
                      type="tel"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="999 999 999"
                      className="w-full px-4 py-3.5 rounded-r-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-sm bg-gray-50/50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

              </div>

              {/* MENSAJE FIELD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Especificaciones o Comentarios adicionales (Opcional)</label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  placeholder="Ej. Requiero cotización para alquiler por 30 días con despacho en San Juan de Lurigancho..."
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#991824] focus:ring-1 focus:ring-[#991824] outline-none text-sm bg-gray-50/50 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* WHATSAPP SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-display font-bold text-sm tracking-wide py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  {/* WhatsApp SVG logo */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Enviar por WhatsApp</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
