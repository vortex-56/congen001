import React from 'react';
import ProjectCarousel from './ProjectCarousel';

const allProjects = [
  { img: '/f2.webp', title: 'Lima', subtitle: 'MINAM' },
  { img: '/f3.webp', title: 'Lima', subtitle: 'IPCNA' },
  { img: '/f7.webp', title: 'Lima', subtitle: 'BATA' },
  { img: '/f9.webp', title: 'Lima', subtitle: 'Iafas Del Ejercito Del Perú' },
  { img: '/f10.webp', title: 'Lima', subtitle: 'Poder Judicial' },
  { img: '/f11.webp', title: 'Lima', subtitle: 'Poder Judicial' },
  { img: '/f12.webp', title: 'Lima', subtitle: 'APCI' },
];

const Carrusel1: React.FC = () => {
  return <ProjectCarousel projects={allProjects} />;
};

export default Carrusel1;
