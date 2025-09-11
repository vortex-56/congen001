import React from 'react';
import ProjectCarousel from './ProjectCarousel';

const allProjects = [
  { img: '/f21.webp', title: 'Cañete', subtitle: 'Coney Park' },
  { img: '/f22.webp', title: 'Ancash', subtitle: 'Sihuas' },
  { img: '/f23.webp', title: 'Chiclayo', subtitle: 'Mall Aventura' },
  { img: '/f25.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: '/f26.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: '/f28.webp', title: 'Piura', subtitle: 'BATA' },
  { img: '/f29.webp', title: 'Chimbote', subtitle: 'Colegio Esperanza' },
  { img: '/f30.webp', title: 'Chimbote', subtitle: 'Colegio San Francisco' },
];

const Carrusel2: React.FC = () => {
  return <ProjectCarousel projects={allProjects} />;
};

export default Carrusel2;
