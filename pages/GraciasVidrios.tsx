import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const GraciasVidrios: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Projects />
      </main>
      <FloatingWhatsApp title="Landing Vidrios - Gracias" />
    </div>
  );
};

export default GraciasVidrios;
