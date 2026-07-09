import React from 'react';

const base = (import.meta as any).env.BASE_URL || '/';

const aboutChecklist = [
    'Calidad', 'Garantía', 'Eficiencia', 'Seguridad', 'Innovación', 'Post-Venta'
];

const suppliers = [
    { src: `${base}prov001.webp`, alt: 'Supplier 1' },
    { src: `${base}prov002.webp`, alt: 'Supplier 2' },
    { src: `${base}prov003.webp`, alt: 'Supplier 3' },
    { src: `${base}prov004.webp`, alt: 'Supplier 4' },
    { src: `${base}prov005.webp`, alt: 'Supplier 5' },
    { src: `${base}prov006.webp`, alt: 'Supplier 6' },
    { src: `${base}prov007.webp`, alt: 'Supplier 7' },
    { src: `${base}prov008.webp`, alt: 'Supplier 8' },
];

const clients = [
    { src: `${base}client001.webp`, alt: 'Client 1' },
    { src: `${base}client002.webp`, alt: 'Client 2' },
    { src: `${base}client003.webp`, alt: 'Client 3' },
    { src: `${base}client004.webp`, alt: 'Client 4' },
    { src: `${base}client005.webp`, alt: 'Client 5' },
    { src: `${base}client006.webp`, alt: 'Client 6' },
    { src: `${base}client007.webp`, alt: 'Client 7' },
];

const LogoCarousel: React.FC<{ logos: { src: string, alt: string }[], direction: 'left' | 'right' }> = ({ logos, direction }) => (
    <div className="w-full max-w-[90%] md:max-w-[744px] h-[61px] bg-white rounded-full shadow-lg overflow-hidden mx-auto pointer-events-none">
        <div className={`w-max h-full flex items-center gap-10 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-left'} whitespace-nowrap`}>
            {[...logos, ...logos].map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} className="h-10 object-contain mx-5" />
            ))}
        </div>
    </div>
);

const About: React.FC = () => {
    return (
        <section id="about" className="relative bg-[#D9D9D9] py-28 md:pb-28 md:pt-40">
            {/* Background Image Shape */}
            <div className="absolute top-0 left-0 w-full h-36 bg-[#009899] overflow-hidden">
                <img 
                    decoding="async"
                    src={`${base}fondo2.webp`} 
                    alt="Imagen decorativa" 
                    className="w-full h-auto object-cover opacity-70"
                    style={{mixBlendMode: 'color-burn', transform: 'scale(1.6) translateY(-60px)'}}
                />
            </div>

            {/* Content */}
            <div className="relative px-4">
                {/* About Us Section */}
                <div className="relative max-w-xs md:max-w-[744px] mx-auto bg-[#F3F3F3] rounded-lg shadow-xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 z-10 -mt-8">
                    <img src={`${base}nosotros01.webp`} alt="Nosotros" className="w-full md:w-[260px] h-48 md:h-auto object-cover rounded-md" />
                    <div className="text-black">
                        <h2 className="text-4xl font-extrabold text-[#990021] -tracking-widest">NOSOTROS</h2>
                        <p className="text-base mt-2 leading-relaxed">
                            Somos una empresa de capital peruano, con más de 15 años de experiencia, brindando soluciones integrales en el suministro e instalación de Geosintéticos, Termofusión de tuberías HDPE y alquiler de equipos, respaldados por un staff de profesionales y técnicos calificados para garantizar el éxito de su proyecto.
                        </p>
                        <p className="text-base font-bold mt-4">Nuestros valores nos definen:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {aboutChecklist.map(item => (
                                <div key={item} className="flex items-center gap-2">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#2BB063]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Vision and Mission */}
                <div className="max-w-xs md:max-w-[744px] mx-auto grid md:grid-cols-2 gap-6 mt-10">
                    <div className="bg-[#F3F3F3] rounded-3xl shadow-xl p-1">
                        <div className="bg-[#990021] text-white text-center text-2xl font-semibold tracking-widest rounded-full py-2 border-4 border-white">VISIÓN</div>
                        <p className="p-6 text-base leading-relaxed text-black">
                            Ser la empresa líder a nivel nacional, como la mejor alternativa en soluciones integrales en geosinteticos y termofusión de tuberías HDPE, con la más alta calidad, seguridad y protección del medio ambiente.
                        </p>
                    </div>
                    <div className="bg-[#F3F3F3] rounded-3xl shadow-xl p-1">
                        <div className="bg-[#990021] text-white text-center text-2xl font-semibold tracking-widest rounded-full py-2 border-4 border-white">MISIÓN</div>
                        <p className="p-6 text-base leading-relaxed text-black">
                            Garantizar el éxito de los proyectos de nuestros clientes, brindándoles soluciones innovadoras, con la más alta calidad y un servicio post venta, cumpliendo con los estándares de seguridad y cuidado del medio ambiente.
                        </p>
                    </div>
                </div>

                {/* Suppliers and Clients */}
                <div className="flex flex-col items-center gap-10 mt-16 overflow-hidden">
                    <div className="w-full overflow-x-hidden">
                        <h3 className="text-xl font-extrabold tracking-widest text-black text-center mb-4">PROVEEDORES</h3>
                        <LogoCarousel logos={suppliers} direction="left" />
                    </div>
                    <div className="w-full overflow-x-hidden">
                        <h3 className="text-xl font-extrabold tracking-widest text-black text-center mb-4">CLIENTES</h3>
                        <LogoCarousel logos={clients} direction="right" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;