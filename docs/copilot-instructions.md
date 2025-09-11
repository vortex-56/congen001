# Instrucciones para Copilot - Sitio Web de CONGEN

## Descripción General del Proyecto

Este es un sitio web moderno para CONGEN, una empresa peruana especializada en soluciones de carpintería de vidrios, aluminios, tabiquería y enchapados. El sitio está construido con React, TypeScript y Tailwind CSS, y sigue una arquitectura basada en componentes.

## Estructura del Proyecto

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
│   └── Carrusel2.tsx
├── App.tsx
├── index.tsx
└── public/ (recursos estáticos)
```

## Componentes Principales

### Header (`components/Header.tsx`)

**Funcionalidad:**
- Navegación principal con menús desplegables para "Productos" y "Servicios"
- Logotipo de la empresa
- Botón de contacto que lleva a la sección de contacto en el Footer
- Menú móvil para dispositivos móviles

**Características técnicas:**
- Menús desplegables con transiciones suaves
- Cierre automático al hacer clic fuera del menú
- Navegación suave entre secciones
- Diseño responsive

### Hero (`components/Hero.tsx`)

**Funcionalidad:**
- Sección principal con imagen de fondo
- Información de contacto principal
- Enlaces a redes sociales
- Componente de ofertas emergentes

**Características técnicas:**
- Gradientes superpuestos para mejorar la legibilidad del texto
- Efectos de sombra en el texto
- Componente `Ofertas.tsx` con animaciones automáticas

### About (`components/About.tsx`)

**Funcionalidad:**
- Información sobre la empresa y su historia
- Valores de la empresa con íconos de verificación
- Visión y Misión en tarjetas separadas
- Carruseles de proveedores y clientes

**Características técnicas:**
- Carrusel de logos con animación continua
- Efectos de mezcla para las imágenes de fondo
- Diseño en tarjetas con sombras

### Projects (`components/Projects.tsx`)

**Funcionalidad:**
- Sección de proyectos con dos carruseles
- Galería interactiva con lightbox

**Características técnicas:**
- Dos componentes de carrusel independientes (`Carrusel1.tsx` y `Carrusel2.tsx`)
- Navegación automática y manual
- Lightbox para visualización detallada

### Carruseles (`components/Carrusel1.tsx` y `components/Carrusel2.tsx`)

**Funcionalidad:**
- Carruseles de imágenes de proyectos
- Navegación con botones de flecha
- Lightbox para visualización detallada

**Características técnicas:**
- Clonación de elementos para efecto de bucle infinito
- Pausa en hover
- Controles táctiles
- Navegación por teclado en lightbox
- Transiciones suaves

### Footer (`components/Footer.tsx`)

**Funcionalidad:**
- Formulario de contacto con validación
- Información de contacto (teléfono, email, dirección)
- Enlaces a redes sociales
- Información de la empresa
- Enlaces a servicios y productos

**Características técnicas:**
- Validación de formulario en frontend
- Envío de datos a Google Sheets
- Feedback visual del estado de envío
- Manejo de errores
- Diseño en columnas responsive

## Sistema de Formulario de Contacto

El formulario de contacto en el Footer está conectado a una hoja de cálculo de Google Sheets a través de Google Apps Script. El endpoint actual es:

```
https://script.google.com/macros/s/AKfycbyzuXSKpfkzETx-XmGktDdNE4HA76l95Gq2afdm1dW3-2KBQogaLgnJ4vFI_6TNeR0t/exec
```

**Validaciones implementadas:**
- Nombre: Mínimo 3 caracteres
- Teléfono: Entre 7 y 20 dígitos, puede incluir espacios, guiones y paréntesis
- Email: Formato válido de correo electrónico

**Estados del formulario:**
- Formulario inicial
- Enviando (con spinner de carga)
- Éxito (mensaje de confirmación)
- Error (mensaje con detalles del error)

## Estilos y Diseño

El sitio utiliza Tailwind CSS para los estilos, con una paleta de colores específica:

**Colores principales:**
- Rojo: #990021 (botones principales)
- Verde: #009899 (acentos)
- Azul oscuro: #1F3D44 (fondos)
- Gris: #D9D9D9 (fondos de sección)

**Tipografía:**
- Fuentes predeterminadas del sistema con fallbacks
- Tamaños y pesos específicos para encabezados y texto

## Responsive Design

El sitio está completamente optimizado para dispositivos móviles, tablets y escritorio:

**Puntos de quiebre:**
- Móvil: hasta 768px
- Tablet: 768px a 1024px
- Escritorio: 1024px en adelante

**Adaptaciones:**
- Cambio de layout de columnas a filas en móviles
- Ajuste de tamaños de fuente y espaciado
- Menú hamburguesa para navegación en móviles
- Carruseles con 2 elementos en móviles y 4 en pantallas grandes

## Animaciones y Efectos

**Carruseles:**
- Transiciones automáticas cada 4 segundos
- Animaciones de deslizamiento suave
- Efecto de escala en hover para imágenes

**Formulario:**
- Transiciones suaves entre estados
- Spinner de carga durante el envío
- Animaciones de entrada para mensajes de éxito/error

**Otros:**
- Efectos de hover en botones y enlaces
- Transiciones suaves en menús desplegables
- Efectos de aparición en componentes de ofertas

## Consideraciones Técnicas

### Rutas de Recursos
Todos los recursos estáticos (imágenes, íconos) se encuentran en la carpeta `public/` y se referencian con rutas absolutas desde la raíz (ej: `/logo.svg`).

### Google Sheets Integration
El formulario de contacto envía datos a una hoja de cálculo de Google Sheets. El endpoint está configurado en el componente Footer.

### Optimización de Imágenes
Las imágenes se han optimizado para web, pero se puede considerar implementar carga diferida (lazy loading) para mejorar el rendimiento.

### Accesibilidad
- Etiquetas ARIA para componentes interactivos
- Navegación por teclado
- Contraste adecuado de colores
- Texto alternativo en imágenes

## Mantenimiento y Actualizaciones

### Actualización de Contenido
- Textos: Modificar directamente en los componentes
- Imágenes: Reemplazar en la carpeta `public/`
- Enlaces: Actualizar en los arrays de navegación

### Agregar Nuevo Contenido
- Crear nuevos componentes en la carpeta `components/`
- Importar y usar en `App.tsx`
- Actualizar estilos según sea necesario

### Formulario de Contacto
- El endpoint de Google Sheets puede actualizarse en `Footer.tsx`
- Las validaciones pueden modificarse según requerimientos

## Despliegue

El sitio puede desplegarse en cualquier servicio que soporte aplicaciones Vite/React:
1. Ejecutar `npm run build` para generar la versión de producción
2. Copiar la carpeta `dist/` al servidor
3. Configurar el servidor para servir `index.html` en rutas desconocidas (SPA)

## Consideraciones de SEO

- Meta tags optimizadas en `index.html`
- URLs semánticas y descriptivas
- Contenido indexable en componentes
- Imágenes con atributos alt descriptivos