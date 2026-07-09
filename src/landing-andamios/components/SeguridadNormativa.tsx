/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, HardHat, Check, Award, Eye, FileCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SeguridadNormativa() {
  const [isMobile, setIsMobile] = useState(false);
  const [certIndex, setCertIndex] = useState(0);

  const certifications = [
    {
      title: 'Espesor Real Homologado (2.0mm)',
      desc: 'No arriesgues a tu personal. Frente a opciones informales de 1.5mm o menos, CONGEN garantiza tuberías estructurales ASTM de 2.0mm de espesor real que soportan cargas verticales extremas sin deflexión.'
    },
    {
      title: 'Soldadura MIG de Penetración',
      desc: 'Proceso de soldadura semiautomático con atmósfera protegida de gas. Penetra el núcleo del metal para evitar fracturas o fisuras por tracción o vibración constante en obra.'
    },
    {
      title: 'Plataformas c/Patrón Antideslizante',
      desc: 'Nuestros tablones cuentan con embutidos de drenaje y textura rugosa que evitan resbalones causados por llovizna, pintura, mortero u otros líquidos de trabajo.'
    },
    {
      title: 'Conformidad Norma G.050 Perú',
      desc: 'Nuestros sistemas cumplen cabalmente las disposiciones nacionales de la Norma G.050 (Seguridad durante la Construcción), facilitando la aprobación de tus prevencionistas de riesgo (SST).'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (!mobile) {
        setCertIndex(0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextCert = () => {
    setCertIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  };

  const handlePrevCert = () => {
    setCertIndex((prev) => (prev <= 0 ? 3 : prev - 1));
  };

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      handleNextCert();
    }, 6000);
    return () => clearInterval(timer);
  }, [isMobile, certIndex]);

  return (
    <section id="seguridad" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: VISUAL TRUST / INFOGRAPH */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#099899]/5 to-[#099899]/10 rounded-3xl p-8 border border-[#099899]/15 shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#099899]/10 rounded-full filter blur-xl"></div>
              
              <div className="relative z-10 space-y-5">
                <div className="bg-[#099899] text-white p-3.5 rounded-2xl w-fit shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[#099899] uppercase tracking-widest bg-[#099899]/10 px-2.5 py-1 rounded">
                    SEGURIDAD SIN CONCESIONES
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
                    Cero Accidentes, Máxima Estabilidad
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    Un andamio colapsado destruye reputaciones y detiene proyectos. En CONGEN S.A.C. nos tomamos la seguridad personal muy en serio. Todos nuestros componentes pasan por ensayos de compresión estática severos.
                  </p>
                </div>

                {/* Micro metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#099899]/20">
                  <div className="space-y-1">
                    <span className="font-mono font-black text-2xl text-[#099899] block">250 <span className="text-sm font-bold">kg/m²</span></span>
                    <span className="text-[11px] text-gray-500 font-medium">Carga de trabajo útil</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono font-black text-2xl text-[#099899] block">3:1</span>
                    <span className="text-[11px] text-gray-500 font-medium">Factor de seguridad estructural</span>
                  </div>
                </div>

                {/* Inspector Quote banner */}
                <div className="bg-white/80 p-4 rounded-xl border border-[#099899]/20 flex items-center space-x-3.5 text-xs text-slate-800 font-medium leading-relaxed">
                  <HardHat className="w-5 h-5 text-[#099899] shrink-0" />
                  <span>Apto para auditorías de seguridad en obras de gran escala y minería nacional.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CERTIFICATION CARDS */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold text-[#991824] bg-[#991824]/10 border border-[#991824]/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                Control de Calidad
              </span>
              <h2 className="font-display font-black text-3xl text-gray-900 mt-4 tracking-tight">
                ¿Por qué los ingenieros eligen andamios CONGEN?
              </h2>
            </div>

            {isMobile ? (
              <div className="relative group/cert px-2">
                <div className="overflow-hidden p-1">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${certIndex * (100 / certifications.length)}%)`,
                      width: '400%'
                    }}
                  >
                    {certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="w-1/4 flex-shrink-0 px-2"
                      >
                        <div className="bg-gray-50/60 hover:bg-white border border-gray-100 hover:border-[#099899]/30 p-5 rounded-2xl transition-all duration-300 shadow-sm flex space-x-4 items-start group min-h-[140px] text-left">
                          <div className="p-1.5 bg-[#099899]/10 text-[#099899] rounded-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                            <Check className="w-4 h-4" />
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="font-display font-extrabold text-sm text-gray-900 group-hover:text-[#099899] transition-colors">
                              {cert.title}
                            </h4>
                            <p className="font-sans text-xs text-gray-500 leading-relaxed">
                              {cert.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lateral buttons */}
                <button
                  onClick={handlePrevCert}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 hover:text-[#099899] transition-all cursor-pointer z-20 flex items-center justify-center group"
                  aria-label="Anterior aspecto"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNextCert}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg border border-gray-200 hover:text-[#099899] transition-all cursor-pointer z-20 flex items-center justify-center group"
                  aria-label="Siguiente aspecto"
                >
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Dots indicator */}
                <div className="flex justify-center space-x-1.5 mt-4">
                  {certifications.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCertIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        certIndex === i ? 'w-6 bg-[#099899]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ir al aspecto ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50/60 hover:bg-white border border-gray-100 hover:border-[#099899]/30 p-5 rounded-2xl transition-all duration-300 shadow-sm flex space-x-4 items-start group text-left"
                  >
                    <div className="p-1.5 bg-[#099899]/10 text-[#099899] rounded-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-display font-extrabold text-sm text-gray-900 group-hover:text-[#099899] transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed">
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick action technical documentation */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 bg-[#991824]/10 text-[#991824] rounded-xl">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900">Fichas Técnicas Oficiales</h4>
                  <p className="text-xs text-gray-500">Documento PDF descargable con ensayos mecánicos</p>
                </div>
              </div>
              <button
                onClick={() => {
                  window.open('https://api.whatsapp.com/send?phone=51914109040&text=Hola%20CONGEN%20S.A.C.,%20solicito%20las%20fichas%20t%C3%A9cnicas%20y%20certificados%20de%20los%20andamios%20Acrow.', '_blank');
                }}
                className="w-full sm:w-auto bg-[#171717] hover:bg-[#262626] border border-white/10 text-white font-display font-semibold text-xs tracking-wide py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow"
              >
                <span>Solicitar Certificados</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
