import React from 'react';
import ProjectCarousel from './ProjectCarousel';

const allProjects = [
  { img: import.meta.env.BASE_URL + 'f2.webp', title: 'Lima', subtitle: 'MINAM' },
  { img: import.meta.env.BASE_URL + 'f3.webp', title: 'Lima', subtitle: 'IPCNA' },
  { img: import.meta.env.BASE_URL + 'f7.webp', title: 'Lima', subtitle: 'BATA' },
  { img: import.meta.env.BASE_URL + 'f9.webp', title: 'Lima', subtitle: 'Iafas Del Ejercito Del Perú' },
  { img: import.meta.env.BASE_URL + 'f10.webp', title: 'Lima', subtitle: 'Poder Judicial' },
  { img: import.meta.env.BASE_URL + 'f11.webp', title: 'Lima', subtitle: 'Poder Judicial' },
  { img: import.meta.env.BASE_URL + 'f12.webp', title: 'Lima', subtitle: 'APCI' },
];

const Carrusel1: React.FC = () => {
  return <ProjectCarousel projects={allProjects} />;
};

export default Carrusel1;
