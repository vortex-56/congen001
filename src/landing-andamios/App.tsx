/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectorModalidad from './components/SelectorModalidad';
import CatalogoProductos from './components/CatalogoProductos';
import CalculadoraAndamios from './components/CalculadoraAndamios';
import SeguridadNormativa from './components/SeguridadNormativa';
import FormularioCotizacion from './components/FormularioCotizacion';
import Footer from './components/Footer';
import QuoteCart from './components/QuoteCart';

import { ComponentItem, QuoteCartItem, Modalidad } from './types';

export default function App() {
  const [cart, setCart] = useState<QuoteCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalidad, setActiveModalidad] = useState<Modalidad>('alquiler');

  // Offset smooth scrolling helper to account for sticky navbar
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenWhatsApp = (customMessage?: string) => {
    const basePhone = '51914109040'; // Target Peruvian WhatsApp Number for CONGEN S.A.C.
    const defaultText = 'Hola CONGEN S.A.C., vi su página web de andamios Acrow y deseo solicitar una cotización.';
    const encodedText = encodeURIComponent(customMessage || defaultText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${basePhone}&text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (component: ComponentItem, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.component.id === component.id);
      if (existing) {
        return prev.map(item =>
          item.component.id === component.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { component, quantity }];
    });
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    setCart(prev =>
      prev.map(item =>
        item.component.id === id
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.component.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Allows calculators to append fully resolved items list with one action
  const handleAddConfigurationToCart = (items: { component: ComponentItem; qty: number }[]) => {
    setCart(prev => {
      let updated = [...prev];
      items.forEach(newItem => {
        const existingIdx = updated.findIndex(item => item.component.id === newItem.component.id);
        if (existingIdx > -1) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + newItem.qty
          };
        } else {
          updated.push({ component: newItem.component, quantity: newItem.qty });
        }
      });
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      
      {/* GLOBAL NAVBAR */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* VIEWPORT BODY CONTROLLER */}
      <main className="flex-grow">
        
        {/* HERO HEADER */}
        <Hero
          onScrollToSection={handleScrollToSection}
          onOpenWhatsApp={handleOpenWhatsApp}
        />

        {/* MODALIDAD SELECTOR */}
        <SelectorModalidad
          activeModalidad={activeModalidad}
          onChangeModalidad={setActiveModalidad}
          onScrollToSection={handleScrollToSection}
        />

        {/* PRODUCT CATALOGUE */}
        <CatalogoProductos
          cart={cart}
          onAddToCart={handleAddToCart}
        />

        {/* INTEGRATED SCAFFOLD STRUCTURAL CALCULATOR */}
        <CalculadoraAndamios
          onAddConfigurationToCart={handleAddConfigurationToCart}
          onScrollToSection={handleScrollToSection}
        />

        {/* SAFETY AND CERTIFICATIONS SEGMENT */}
        <SeguridadNormativa />

        {/* B2B QUOTATION PROCESSOR */}
        <FormularioCotizacion
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onUpdateCartQty={handleUpdateCartQty}
          onAddConfigurationToCart={handleAddConfigurationToCart}
          onOpenWhatsApp={handleOpenWhatsApp}
        />

      </main>

      {/* FOOTER METRICS */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* SLIDE-IN REQUERIMIENTOS DRAWER */}
      <QuoteCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQty={handleUpdateCartQty}
        onClearCart={handleClearCart}
        onScrollToSection={handleScrollToSection}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        onClick={() => handleOpenWhatsApp()}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer flex items-center justify-center border-none"
        aria-label="Contactar por WhatsApp"
        id="whatsapp-floating-btn"
      >
        <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

    </div>
  );
}
