/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HelpCircle, Layers, Weight, ArrowRight, Truck, Info, Check, Sparkles } from 'lucide-react';
import { CalculatorResult, ComponentItem } from '../types';
import { PRODUCTS } from '../data/products';

interface CalculadoraAndamiosProps {
  onAddConfigurationToCart: (items: { component: ComponentItem; qty: number }[]) => void;
  onScrollToSection: (id: string) => void;
}

export default function CalculadoraAndamios({
  onAddConfigurationToCart,
  onScrollToSection
}: CalculadoraAndamiosProps) {
  const [altura, setAltura] = useState<number>(4); // Default 4 meters (2 levels)
  const [largo, setLargo] = useState<number>(5.4); // Default 5.4 meters (3 columns)
  const [isMobile, setIsMobile] = useState<boolean>(false); // Static vs Mobile tower
  const [results, setResults] = useState<CalculatorResult>({
    cuerpos: 0,
    tijeras: 0,
    tablones: 0,
    niveladores: 0,
    totalEstimatedWeight: 0,
  });
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Recalculate everything whenever parameters change
  useEffect(() => {
    const bodiesHigh = Math.max(1, Math.ceil(altura / 2.0));
    const columnsWide = Math.max(1, Math.ceil(largo / 1.8));
    
    // Total Acrow frames (cuerpos)
    const totalCuerpos = bodiesHigh * columnsWide;
    
    // Scissors (Tijeras) -> 2 per body spacing (usually totalCuerpos * 2)
    const totalTijeras = totalCuerpos * 2;
    
    // Planks (Tablones) -> Recommend 2 planks per column to form a 0.60m safe deck width
    const totalTablones = columnsWide * 2;
    
    // Levelers or Wheels -> Stationary needs base plates for each column layout:
    // (columnsWide + 1) * 2 vertical legs. Each needs a leveling jack.
    // If mobile, they usually want 4 heavy-duty wheels for a rolling tower.
    const totalNiveladores = isMobile ? 4 : (columnsWide + 1) * 2;

    // Fetch product weights
    const pCuerpo = PRODUCTS.find(p => p.id === 'cuerpo-acrow-200')?.weightKg || 38.5;
    const pTablon = PRODUCTS.find(p => p.id === 'tablon-metalico-180')?.weightKg || 14.2;
    const pTijera = PRODUCTS.find(p => p.id === 'cruceta-tijera-180')?.weightKg || 6.8;
    const pNivelador = PRODUCTS.find(p => p.id === 'nivelador-regulable')?.weightKg || 4.5;
    const pRueda = PRODUCTS.find(p => p.id === 'rueda-freno-8')?.weightKg || 6.2;

    const baseWeight = isMobile ? pRueda : pNivelador;
    
    const totalWeight = 
      (totalCuerpos * pCuerpo) +
      (totalTablones * pTablon) +
      (totalTijeras * pTijera) +
      (totalNiveladores * baseWeight);

    setResults({
      cuerpos: totalCuerpos,
      tijeras: totalTijeras,
      tablones: totalTablones,
      niveladores: totalNiveladores,
      totalEstimatedWeight: Math.round(totalWeight * 10) / 10
    });
  }, [altura, largo, isMobile]);

  const handleAddConfiguration = () => {
    const itemsToCart = [
      { component: PRODUCTS[0], qty: results.cuerpos }, // Cuerpo
      { component: PRODUCTS[1], qty: results.tablones }, // Planks
      { component: PRODUCTS[2], qty: results.tijeras }, // Scissors
    ];

    if (isMobile) {
      itemsToCart.push({ component: PRODUCTS[4], qty: results.niveladores }); // Wheels
    } else {
      itemsToCart.push({ component: PRODUCTS[3], qty: results.niveladores }); // Levelers
    }

    onAddConfigurationToCart(itemsToCart);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onScrollToSection('cotizar');
    }, 1500);
  };

  return (
    <section id="calculadora" className="py-24 bg-[#099899] text-white relative overflow-hidden border-b border-white/10">
      
      {/* Background design accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono text-white bg-black/20 border border-white/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Herramienta Interactiva de Modulación</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl mt-4 tracking-tight text-white">
            Calculadora de Andamios en un Instante
          </h2>
          <p className="font-sans text-white/90 mt-3 text-base">
            Ingresa las dimensiones de tu fachada y te recomendaremos el número exacto de marcos, tijeras, tablones y accesorios necesarios para tu montaje seguro.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: CONTROLS */}
          <div className="lg:col-span-5 bg-black/20 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-md shadow-2xl">
            <h3 className="font-display font-extrabold text-lg flex items-center space-x-2 text-white pb-3 border-b border-white/10">
              <span>Ajustar Parámetros de Obra</span>
            </h3>

            {/* SLIDER 1: HEIGHT */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-white/90">Altura Requerida:</label>
                <span className="font-mono font-bold text-white bg-[#991824] px-2.5 py-0.5 rounded-lg text-sm">{altura.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="16.0"
                step="2.0"
                value={altura}
                onChange={(e) => setAltura(parseFloat(e.target.value))}
                className="w-full accent-[#991824] cursor-pointer h-2 bg-white/20 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-white/60 font-mono">
                <span>2.00m (1 nivel)</span>
                <span>8.00m</span>
                <span>16.00m (8 niveles)</span>
              </div>
            </div>

            {/* SLIDER 2: WIDTH/LENGTH */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-white/90">Largo de Fachada:</label>
                <span className="font-mono font-bold text-white bg-[#991824] px-2.5 py-0.5 rounded-lg text-sm">{largo.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="1.80"
                max="18.0"
                step="1.80"
                value={largo}
                onChange={(e) => setLargo(parseFloat(e.target.value))}
                className="w-full accent-[#991824] cursor-pointer h-2 bg-white/20 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-white/60 font-mono">
                <span>1.80m (1 sección)</span>
                <span>9.00m</span>
                <span>18.00m (10 secciones)</span>
              </div>
            </div>

            {/* TOGGLE: MOBILE VS STATIONARY */}
            <div className="bg-black/15 p-4.5 rounded-2xl border border-white/10 space-y-3">
              <label className="text-sm font-semibold text-white/90 block">Tipo de Apoyo Base:</label>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsMobile(false)}
                  className={`py-3 px-4 rounded-xl text-xs font-display font-bold transition-all duration-300 flex flex-col items-center gap-1.5 cursor-pointer border ${
                    !isMobile
                      ? 'bg-[#171717] border-[#171717] text-white shadow-md'
                      : 'bg-black/10 border-white/10 text-white/70 hover:text-white hover:bg-black/20'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Andamio Fijo (Estacionario)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMobile(true)}
                  className={`py-3 px-4 rounded-xl text-xs font-display font-bold transition-all duration-300 flex flex-col items-center gap-1.5 cursor-pointer border ${
                    isMobile
                      ? 'bg-[#171717] border-[#171717] text-white shadow-md'
                      : 'bg-black/10 border-white/10 text-white/70 hover:text-white hover:bg-black/20'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>Andamio Móvil (Ruedas)</span>
                </button>
              </div>
              <p className="text-[10px] text-white/70 font-sans italic pt-1.5">
                {!isMobile 
                  ? '• Se recomiendan bases niveladoras macizas para regular desniveles del terreno.' 
                  : '• Estructura móvil para trabajos ágiles. Máximo recomendado hasta 8.00m de altura de trabajo.'}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: RECOMMENDED MODULES */}
          <div className="lg:col-span-7 bg-black/10 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-display font-black text-xl text-white">Configuración Recomendada</h3>
                  <p className="text-xs text-white/75 mt-0.5">Basado en un diseño con factores de seguridad del 200%</p>
                </div>

                <div className="bg-[#991824]/20 border border-[#991824]/40 p-3 rounded-2xl flex items-center space-x-3.5 self-start">
                  <div className="p-2 bg-[#991824] rounded-lg">
                    <Weight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/80 font-mono uppercase block leading-none">PESO TOTAL APALANCADO</span>
                    <span className="font-mono font-black text-lg text-white">{results.totalEstimatedWeight} <span className="text-xs">kg</span></span>
                  </div>
                </div>
              </div>

              {/* PARTS BILL OF MATERIALS (BOM) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Cuerpo frame result */}
                <div className="bg-black/15 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Cuerpos Acrow</h4>
                    <p className="text-[11px] text-white/70 mt-0.5">Marcos laterales rojos 2m</p>
                  </div>
                  <span className="font-mono font-extrabold text-2xl text-white bg-[#991824] px-3.5 py-1.5 rounded-lg border border-[#991824]/20">
                    {results.cuerpos}
                  </span>
                </div>

                {/* Scissor braces result */}
                <div className="bg-black/15 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Crucetas / Tijeras</h4>
                    <p className="text-[11px] text-white/70 mt-0.5">Tubos cruzados galv. 1.80m</p>
                  </div>
                  <span className="font-mono font-extrabold text-2xl text-white bg-[#991824] px-3.5 py-1.5 rounded-lg border border-[#991824]/20">
                    {results.tijeras}
                  </span>
                </div>

                {/* Planks result */}
                <div className="bg-black/15 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Tablones Antideslizantes</h4>
                    <p className="text-[11px] text-white/70 mt-0.5">Plataformas de trabajo 0.30m</p>
                  </div>
                  <span className="font-mono font-extrabold text-2xl text-white bg-[#991824] px-3.5 py-1.5 rounded-lg border border-[#991824]/20">
                    {results.tablones}
                  </span>
                </div>

                {/* Base levelers result */}
                <div className="bg-black/15 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isMobile ? 'Ruedas con Freno' : 'Husillos Niveladores'}
                    </h4>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      {isMobile ? 'Poliuretano 8" c/bloqueo' : 'Tornillos regulables 0.50m'}
                    </p>
                  </div>
                  <span className="font-mono font-extrabold text-2xl text-white bg-[#991824] px-3.5 py-1.5 rounded-lg border border-[#991824]/20">
                    {results.niveladores}
                  </span>
                </div>

              </div>

              {/* Logistics alert */}
              <div className="bg-black/15 p-4.5 rounded-xl border border-white/10 flex items-start space-x-3.5">
                <Truck className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div className="text-xs text-white/95 leading-relaxed">
                  <span className="font-bold text-white block mb-0.5">Nota de Despacho Logístico:</span>
                  Este lote equivale a un volumen modular compacto que puede trasladarse en un camión tipo baranda ligero o camioneta de 1.5 toneladas. Ofrecemos tarifas preferenciales de envío en Lima Metropolitana.
                </div>
              </div>
            </div>

            {/* Quick addition button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleAddConfiguration}
                className={`w-full py-4 px-6 rounded-xl font-display font-bold text-sm tracking-wide shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer ${
                  isAdded
                    ? 'bg-white text-[#099899] shadow-white/10 hover:bg-white/90'
                    : 'bg-[#171717] hover:bg-[#262626] text-white shadow-black/25 hover:scale-[1.01]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 animate-scaleUp" />
                    <span>¡Cargado en tu lista de cotización!</span>
                  </>
                ) : (
                  <>
                    <span>Añadir Configuración a mi Cotización</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
