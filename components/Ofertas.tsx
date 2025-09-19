import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const offers = [
    {
        title: 'OFERTAS EN ANDAMIOS',
        image: import.meta.env.BASE_URL + 'andamio-emergente.webp',
        alt: 'oferta de andamio acrow',
        text: 'Ofrecemos Andamios ACROW certificados en Alquiler y Venta',
        link: '/andamios'
    },
  {
    title: 'OFERTAS EN VIDRIOS',
        image: import.meta.env.BASE_URL + 'vidrios-emergentes.webp',
    alt: 'oferta de vidrios',
    text: 'Ofrecemos una gran variedad de productos de vidrios',
    link: '/vidrios'
  },
  {
    title: 'NUESTROS PRODUCTOS',
        image: import.meta.env.BASE_URL + 'productos-emergentes.webp',
    alt: 'nuestros productos',
    text: 'Contamos con una gran variedad de productos de vidrios y accesorios',
    link: '/productos'
  }
];

const Ofertas: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const offerRef = useRef<HTMLDivElement>(null);
    const mainTimerRef = useRef<number | null>(null);
    const animationTimerRef = useRef<number | null>(null);

    // Main animation loop
    useEffect(() => {
        // Always clear previous timers when this effect re-runs
        if (mainTimerRef.current) clearTimeout(mainTimerRef.current);
        if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

        if (isPaused) {
            return; // If paused, do nothing further.
        }

        mainTimerRef.current = window.setTimeout(() => {
            setIsExiting(true);
            animationTimerRef.current = window.setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % offers.length);
                setIsExiting(false);
            }, 300); // Corresponds to exit animation duration
        }, 4000); // Display time

        // Cleanup function for when component unmounts or effect re-runs
        return () => {
            if (mainTimerRef.current) clearTimeout(mainTimerRef.current);
            if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
        };
    }, [currentIndex, isPaused]);

    // Effect for handling touches outside the component to resume animation
    useEffect(() => {
        const handleOutsideTouch = (event: TouchEvent) => {
            if (isPaused && offerRef.current && !offerRef.current.contains(event.target as Node)) {
                setIsPaused(false);
            }
        };

        document.addEventListener('touchstart', handleOutsideTouch, { passive: true });
        return () => {
            document.removeEventListener('touchstart', handleOutsideTouch);
        };
    }, [isPaused]);


    const handleContainerTouch = (e: React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsPaused(prev => !prev);
    };

    const currentOffer = offers[currentIndex];

    return (
        <Link to={currentOffer.link} className="block no-underline">
            <div 
                ref={offerRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleContainerTouch}
                className="w-full max-w-[320px] h-[250px] bg-[rgba(35,35,35,0.85)] backdrop-blur-sm text-white rounded-lg shadow-2xl overflow-hidden border border-white/20 cursor-pointer"
                role="region"
                aria-label="Ofertas del carrusel"
                aria-live="polite"
            >
                <div className={isExiting ? 'animate-slide-out-down' : 'animate-slide-in-down'}>
                    {/* Title Bar */}
                    <div className="bg-black/30 py-2">
                        <h3 className="text-base font-bold tracking-wider text-center uppercase">
                            {currentOffer.title}
                        </h3>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 flex flex-col items-center text-center">
                        {/* Image */}
                                            <div className="w-full mb-3">
                                                <img 
                                                    src={currentOffer.image} 
                                                    alt={currentOffer.alt} 
                                                    className="w-full h-[80px] object-cover rounded-[6px]" 
                                                    loading="lazy"
                                                />
                                            </div>

                        {/* Info Text */}
                        <p className="text-sm font-normal mb-3 h-[40px] flex items-center justify-center">
                            {currentOffer.text}
                        </p>

                        {/* Button */}
                        <div
                            className="block w-full bg-[#990021] hover:bg-[#7a001a] text-white font-bold py-2 rounded-md transition-all duration-300 text-sm transform hover:scale-105 text-center"
                        >
                            Saber más
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Ofertas;
