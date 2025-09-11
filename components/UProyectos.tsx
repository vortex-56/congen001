import React from 'react';
import ProjectCarousel from './ProjectCarousel';

const projects1 = [
  { img: '/f11.webp', title: 'Lima', subtitle: 'Poder Judicial' },
  { img: '/f12.webp', title: 'Lima', subtitle: 'APCI' },
  { img: '/f2.webp', title: 'Lima', subtitle: 'MINAM' },
  { img: '/f3.webp', title: 'Lima', subtitle: 'IPCNA' },
  { img: '/f7.webp', title: 'Lima', subtitle: 'BATA' },
  { img: '/f9.webp', title: 'Lima', subtitle: 'Iafas Del Ejercito Del Perú' },
  { img: '/f10.webp', title: 'Lima', subtitle: 'Poder Judicial' },
];

const projects2 = [
  { img: '/f29.webp', title: 'Chimbote', subtitle: 'Colegio Esperanza' },
  { img: '/f30.webp', title: 'Chimbote', subtitle: 'Colegio San Francisco' },
  { img: '/f21.webp', title: 'Cañete', subtitle: 'Coney Park' },
  { img: '/f22.webp', title: 'Ancash', subtitle: 'Sihuas' },
  { img: '/f23.webp', title: 'Chiclayo', subtitle: 'Mall Aventura' },
  { img: '/f25.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: '/f26.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: '/f28.webp', title: 'Piura', subtitle: 'BATA' },
];

const UProyectos: React.FC = () => {
  return (
    <div className="space-y-16">
      <ProjectCarousel projects={projects1} />
      <ProjectCarousel projects={projects2} />
    </div>
  );
};

export default UProyectos;
