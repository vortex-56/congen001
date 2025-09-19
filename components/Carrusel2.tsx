import React from 'react';
import ProjectCarousel from './ProjectCarousel';

const allProjects = [
  { img: import.meta.env.BASE_URL + 'f21.webp', title: 'Cañete', subtitle: 'Coney Park' },
  { img: import.meta.env.BASE_URL + 'f22.webp', title: 'Ancash', subtitle: 'Sihuas' },
  { img: import.meta.env.BASE_URL + 'f23.webp', title: 'Chiclayo', subtitle: 'Mall Aventura' },
  { img: import.meta.env.BASE_URL + 'f25.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: import.meta.env.BASE_URL + 'f26.webp', title: 'Olmos', subtitle: 'QUICORNAC' },
  { img: import.meta.env.BASE_URL + 'f28.webp', title: 'Piura', subtitle: 'BATA' },
  { img: import.meta.env.BASE_URL + 'f29.webp', title: 'Chimbote', subtitle: 'Colegio Esperanza' },
  { img: import.meta.env.BASE_URL + 'f30.webp', title: 'Chimbote', subtitle: 'Colegio San Francisco' },
];

const Carrusel2: React.FC = () => {
  return <ProjectCarousel projects={allProjects} />;
};

export default Carrusel2;
