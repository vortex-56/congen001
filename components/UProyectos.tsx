import React from 'react';
import ProjectCarousel from './ProjectCarousel';

const projects1 = [
  { img: import.meta.env.BASE_URL + 'f11.webp', title: 'Lima', subtitle: 'Poder Judicial' },
  { img: import.meta.env.BASE_URL + 'f12.webp', title: 'Lima', subtitle: 'APCI' },
  { img: import.meta.env.BASE_URL + 'f2.webp', title: 'Lima', subtitle: 'MINAM' },
  { img: import.meta.env.BASE_URL + 'f3.webp', title: 'Lima', subtitle: 'IPCNA' },
  { img: import.meta.env.BASE_URL + 'f7.webp', title: 'Lima', subtitle: 'BATA' },
  { img: import.meta.env.BASE_URL + 'f9.webp', title: 'Lima', subtitle: 'Iafas Del Ejercito Del Perú' },
  { img: import.meta.env.BASE_URL + 'f10.webp', title: 'Lima', subtitle: 'Poder Judicial' },
];

const projects2 = [
  { img: import.meta.env.BASE_URL + 'f29.webp', title: 'Chimbote', subtitle: 'Colegio Esperanza' },
  { img: import.meta.env.BASE_URL + 'f30.webp', title: 'Chimbote', subtitle: 'Colegio San Francisco' },
  { img: import.meta.env.BASE_URL + 'f21.webp', title: 'Cañete', subtitle: 'Coney Park' },
  { img: import.meta.env.BASE_URL + 'f22.webp', title: 'Ancash', subtitle: 'Sihuas' },
  { img: import.meta.env.BASE_URL + 'f23.webp', title: 'Chiclayo', subtitle: 'Mall Aventura' },
  { img: import.meta.env.BASE_URL + 'f25.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: import.meta.env.BASE_URL + 'f26.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: import.meta.env.BASE_URL + 'f28.webp', title: 'Piura', subtitle: 'BATA' },
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
