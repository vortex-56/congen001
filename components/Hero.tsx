import React from 'react';
import Ofertas from './Ofertas';

const contactInfo = [
    { icon: '/ico-mail.webp', text: 'ventas@congen.com.pe' },
    { icon: '/ico-phone.webp', text: '(+51) 914 109 040' },
    { icon: '/ico-point.webp', text: 'Urb. Ricardo Palma, Mz F Lt 14, SJL' },
];

const Hero: React.FC = () => {
    const socialLinks = [
        { name: 'Facebook', url: 'https://www.facebook.com/congenperu', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/640px-Facebook_logo_%28square%29.png' },
        { name: 'Instagram', url: 'https://www.instagram.com/congen_peru/', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png' },
        { name: 'TikTok', url: 'https://www.tiktok.com/@congen.per', imgSrc: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png' },
    ];

    const scrollToAbout = (e: React.MouseEvent<HTMLDivElement>) => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section 
            id="home"
            className="relative w-full bg-cover bg-center bg-[url('/background-home.webp')]"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            <div className="relative z-10 w-full max-w-[344px] md:max-w-[744px] lg:max-w-[960px] mx-auto px-4 md:px-0 text-white">
                <div className="flex flex-col justify-center min-h-[650px] md:min-h-[666px] pt-14 pb-20">
                    {/* Main content: single column flow */}
                    <div className="flex-grow flex flex-col justify-center items-center md:items-stretch text-center md:text-left gap-10 relative top-20 md:top-12 lg:top-[68px]">
                        {/* Top Text Block */}
                        <div className="w-full md:pl-11">
                            <p className="font-bold text-xs text-shadow-hero-sub1">SOLUCIONES INMEDIATAS EN</p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight my-3 text-shadow-hero-title">
                                CARPINTERÍA DE VIDRIOS<br/>Y ALUMINIOS
                            </h1>
                            <p className="font-bold text-base md:text-lg text-shadow-hero-sub2">
                                TABIQUERÍA Y ENCHAPADOS EN GENERAL
                            </p>
                        </div>

                        {/* Bottom Actions Block */}
                        <div className="w-full flex flex-col items-center md:flex-row md:items-start md:justify-between gap-8">
                                <a href="/servicios" className="order-1 md:order-1 -mt-4 md:mt-0 flex items-center justify-center gap-3 w-36 h-9 border border-white rounded-md bg-black/30 backdrop-blur-sm transition-colors hover:bg-black/60 md:relative md:left-11" aria-label="Ir a Servicios">
                                    <span className="font-medium text-sm">Saber más</span>
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white" aria-hidden="true"></div>
                                </a>
                            
                            <div className="order-2 md:order-2 relative bottom-[8px] md:top-auto md:bottom-[88px] lg:bottom-[120px]">
                                <Ofertas />
                            </div>
                        </div>
                    </div>

                    {/* Bottom contact info - Modificado para móviles/tablets */}
                    <div className="mt-16 md:mt-auto relative top-[32px] md:top-[0px] lg:top-[-16px]">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 md:pl-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <img src={item.icon} alt="" className="w-3 h-3" />
                                        <span className="text-xs font-semibold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-[8px]">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        aria-label={`Visita nuestro ${social.name}`}
                                        className={`w-[24px] h-[24px] rounded-lg flex items-center justify-center transition-transform hover:scale-125 ${social.name === 'Facebook' ? 'bg-[#3b5998] relative left-[-1px]' : 'bg-white'}`}
                                    >
                                        <img 
                                            src={social.imgSrc} 
                                            alt={`${social.name} logo`} 
                                            className={social.name === 'TikTok' ? 'w-4 h-4' : 'w-full h-full object-cover rounded-lg'}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Saber más sobre nosotros button - Desktop only */}
                    <div 
                        onClick={scrollToAbout} 
                        className="hidden md:flex justify-center items-center gap-3 w-full cursor-pointer group mt-[32px] lg:mt-[8px] transition-transform duration-300 ease-in-out hover:scale-[1.22]"
                        aria-label="Saber más sobre nosotros"
                        role="button"
                    >
                        <img 
                            decoding="async" 
                            src="/ico-arrow.svg" 
                            alt="" 
                            className="w-8 h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="text-white font-semibold text-sm opacity-80 group-hover:opacity-100 transition-opacity">Saber más sobre nosotros</span>
                        <img 
                            decoding="async" 
                            src="/ico-arrow.svg" 
                            alt="" 
                            className="w-8 h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-0 w-full h-1 bg-black"></div>
        </section>
    );
};

export default Hero;