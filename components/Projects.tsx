import React from 'react';
import Carrusel1 from './Carrusel1';
import Carrusel2 from './Carrusel2';


const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-gradient-to-b from-[#009899] to-[#1F3D44] py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">CONOCE LOS PROYECTOS DE NUESTRA MARCA</h2>
        <Carrusel1 />
        <Carrusel2 />
      </div>
    </section>
  );
};

export default Projects;