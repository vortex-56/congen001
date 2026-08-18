/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentItem } from '../types';

export const PRODUCTS: ComponentItem[] = [
  {
    id: 'cuerpo-acrow-200',
    name: 'Cuerpo de Andamio Acrow Estándar',
    description: 'Estructura principal fabricada con tubos de acero ASTM A513 de 2.0mm de espesor. Alta resistencia, soldadura MIG de penetración profunda y acabado anticorrosivo (esmalte epóxico rojo de alta durabilidad).',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a1.webp',
    specifications: {
      'Altura': '2.00 m',
      'Ancho': '1.25 m',
      'Largo de separación': '1.80 m',
      'Espesor de tubo': '2.0 mm (Espesor Real)',
      'Diámetro Tubo Principal': '1 1/2" nominal',
      'Capacidad Carga': 'Hasta 1,500 kg por marco'
    },
    weightKg: 38.5,
    category: 'cuerpo'
  },
  {
    id: 'tablon-metalico-180',
    name: 'Plataforma / Tablón Metálico Antideslizante',
    description: 'Plataforma de trabajo fabricada en acero galvanizado con patrón antideslizante estampado en relieve y ganchos de seguridad embutidos para un encaje perfecto y libre de oscilaciones.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a2.webp',
    specifications: {
      'Largo': '1.80 m',
      'Ancho': '0.30 m',
      'Espesor de plancha': '1.8 mm estructural',
      'Superficie': 'Galvanizada con drenaje de agua',
      'Capacidad de Carga': '250 kg/m² (Carga de trabajo)'
    },
    weightKg: 14.2,
    category: 'accesorios'
  },
  {
    id: 'cruceta-tijera-180',
    name: 'Cruceta (Tijera) de Estabilidad Galvanizada',
    description: 'Arriostre diagonal cruzado fabricado en tubos galvanizados de 1" para conectar marcos Acrow y garantizar rigidez estructural total y evitar oscilaciones laterales.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a3.webp',
    specifications: {
      'Largo de andamio': '1.80 m',
      'Material': 'Tubo galvanizado en caliente',
      'Diámetro': '1"',
      'Espesor': '1.5 mm'
    },
    weightKg: 6.8,
    category: 'accesorios'
  },
  {
    id: 'nivelador-regulable',
    name: 'Tornillo Nivelador (Husillo de Ajuste)',
    description: 'Husillo de rosca maciza con tuerca de mariposa para la base del andamio, permitiendo nivelar la estructura perfectamente en terrenos irregulares u optimizar la distribución de carga.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a4.webp',
    specifications: {
      'Altura total': '0.50 m (Regulable)',
      'Diámetro': '1 1/4" macizo',
      'Base de apoyo': '150 x 150 mm',
      'Material': 'Acero cincado de alta resistencia'
    },
    weightKg: 4.5,
    category: 'accesorios'
  },
  {
    id: 'rueda-freno-8',
    name: 'Rueda Industrial con Freno de Doble Acción (8")',
    description: 'Rueda de poliuretano industrial con núcleo de hierro fundido y rodaje sellado. Incluye un freno total de doble acción que bloquea simultáneamente el giro y el desplazamiento para máxima seguridad.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a5.webp',
    specifications: {
      'Diámetro': '8 pulgadas (200 mm)',
      'Espiga de inserción': '1 1/4" de diámetro',
      'Capacidad de carga': '450 kg por rueda',
      'Banda de rodadura': 'Poliuretano anti-marcas y vibración'
    },
    weightKg: 6.2,
    category: 'accesorios'
  },
  {
    id: 'rodapie-seguridad-180',
    name: 'Rodapié de Seguridad Galvanizado (Zócalo Anticaída)',
    description: 'Zócalo de protección perimetral para plataformas de trabajo. Evita la caída accidental de herramientas, materiales o despuntes hacia niveles inferiores.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a6.webp',
    specifications: {
      'Largo': '1.80 m',
      'Alto': '0.15 m (15 cm)',
      'Espesor': '1.5 mm metálico',
      'Fijación': 'Acople rápido con seguro a pie de marco'
    },
    weightKg: 4.2,
    category: 'accesorios'
  },
  {
    id: 'escalera-seguridad-interior',
    name: 'Escalera de Acceso Interior con Peldaños Antideslizantes',
    description: 'Escalera metálica reinforced con ganchos de anclaje para ascenso y descenso seguro entre niveles de andamio. Incluye peldaños troquelados antideslizantes.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a7.webp',
    specifications: {
      'Largo': '2.20 m (Inclinada)',
      'Ancho': '0.45 m',
      'Peldaños': 'Antideslizantes con drenaje',
      'Ganchos': 'De acero forjado con seguro de encaje'
    },
    weightKg: 16.8,
    category: 'accesorios'
  },
  {
    id: 'baranda-seguridad-modulo',
    name: 'Módulo Baranda de Seguridad (Parantes, Pasamanos y Crucetas)',
    description: 'Sistema integral de protección colectiva anticaídas para plataformas de trabajo superiores. Incluye 2 parantes verticales, baranda protectora superior, rodapié o pasamanos intermedio y cruceta de amarre.',
    imageUrl: 'https://raw.githubusercontent.com/vortex-56/congenitem/main/a8.webp',
    specifications: {
      'Largo': '1.80 m',
      'Altura de baranda': '1.00 m / 1.10 m norma OSHA',
      'Composición': 'Parantes + Pasamanos + Cruceta integrada',
      'Acabado': 'Pintura anticorrosiva / Galvanizado',
      'Normativa': 'Cumple norma de trabajo en altura E.050 y OSHA'
    },
    weightKg: 15.5,
    category: 'accesorios'
  }
];
