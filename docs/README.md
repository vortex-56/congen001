# Documentación del Sistema Web de CONGEN

## Descripción General

Este proyecto es una página web para CONGEN, una empresa peruana especializada en soluciones integrales de carpintería de vidrios, aluminios, tabiquería y enchapados. La web incluye secciones informativas sobre la empresa, sus productos, servicios y proyectos recientes.

## Estructura del Proyecto

El proyecto está construido con React y TypeScript, siguiendo una estructura de componentes modulares:

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Footer.tsx
│   ├── Ofertas.tsx
│   ├── Carrusel1.tsx
│   ├── Carrusel2.tsx
│   └── ScaffoldingOffer.tsx
├── App.tsx
├── index.tsx
├── index.css
└── public/
```

## Componentes Principales

### 1. Header (`components/Header.tsx`)

El componente Header incluye:
- Navegación principal con menú desplegable para productos y servicios
- Logotipo de la empresa
- Botón de contacto que lleva a la sección de contacto en el Footer
- Menú móvil para dispositivos móviles

### 2. Hero (`components/Hero.tsx`)

La sección Hero incluye:
- Imagen de fondo representativa
- Información de contacto principal
- Enlaces a redes sociales
- Componente de ofertas emergentes (`components/Ofertas.tsx`)

### 3. About (`components/About.tsx`)

La sección "Nosotros" incluye:
- Información sobre la empresa y su historia
- Valores de la empresa
- Visión y Misión
- Carrusel de proveedores y clientes

### 4. Projects (`components/Projects.tsx`)

La sección de proyectos incluye:
- Dos carruseles de imágenes de proyectos (`components/Carrusel1.tsx` y `components/Carrusel2.tsx`)
- Galería interactiva con lightbox para visualización detallada

### 5. Footer (`components/Footer.tsx`)

El Footer incluye:
- Formulario de contacto con validación
- Información de contacto (teléfono, email, dirección)
- Enlaces a redes sociales
- Información de la empresa
- Enlaces a servicios y productos

## Características Técnicas

### Formulario de Contacto

El formulario de contacto en el Footer incluye:
- Validación de campos (nombre, teléfono, email)
- Envío de datos a una hoja de cálculo de Google Sheets
- Feedback visual del estado de envío
- Manejo de errores

### Carruseles

Los carruseles de proyectos ofrecen:
- Navegación automática y manual
- Efectos de hover en las imágenes
- Lightbox para visualización detallada
- Controles táctiles para dispositivos móviles

### Responsive Design

El sitio está diseñado para ser completamente responsive:
- Adaptación a diferentes tamaños de pantalla
- Menú móvil para navegación en dispositivos móviles
- Ajuste de elementos para óptima visualización en móviles

## Tecnologías Utilizadas

- React 18 con TypeScript
- Tailwind CSS para estilos
- Vite como bundler
- Google Sheets API para manejo de formularios

## Instrucciones de Instalación

1. Clonar el repositorio
2. Ejecutar `npm install` para instalar dependencias
3. Ejecutar `npm run dev` para iniciar el servidor de desarrollo

## Despliegue

El sitio puede ser desplegado en cualquier servicio compatible con archivos estáticos como:
- Vercel
- Netlify
- GitHub Pages

## Consideraciones de SEO

El sitio incluye:
- Meta tags optimizadas
- URLs limpias y descriptivas
- Contenido indexable
- Imágenes con atributos alt descriptivos

## Mantenimiento

Para mantener el sitio actualizado:
- Reemplazar imágenes en la carpeta `public/` para actualizar la galería
- Modificar los arrays de contenido en los componentes para actualizar textos
- Actualizar enlaces de contacto en el Footer y Header según sea necesario