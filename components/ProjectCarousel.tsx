import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Project {
  img: string;
  title: string;
  subtitle: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const Lightbox: React.FC<{
    project: Project;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}> = ({ project, onClose, onPrev, onNext }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onPrev, onNext]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative bg-[#1F3D44] p-4 rounded-lg max-w-3xl w-full max-h-full flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="overflow-hidden rounded mb-4">
                    <img src={project.img} alt={project.title} className="w-full h-auto max-h-[70vh] object-contain transform scale-[1.02]"/>
                </div>
                <div className="text-white text-center">
                    <h4 className="font-bold text-xl">{project.title}</h4>
                    <p className="text-base">{project.subtitle}</p>
                </div>
                 <button onClick={onClose} className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <button onClick={onPrev} className="absolute top-1/2 left-2 -translate-y-[80%] text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={onNext} className="absolute top-1/2 right-2 -translate-y-[80%] text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};


const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [isLightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const itemsPerPage = isMobile ? 2 : 4;
    const clonesCount = itemsPerPage;

    const slideItems = useMemo(() => {
        if (projects.length === 0) return [];
        const clonesFromEnd = projects.slice(-clonesCount);
        const clonesFromStart = projects.slice(0, clonesCount);
        return [...clonesFromEnd, ...projects, ...clonesFromStart];
    }, [projects, clonesCount]);

    const [currentIndex, setCurrentIndex] = useState(clonesCount);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const handleNext = useCallback(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    useEffect(() => {
        if (isPaused || isLightboxOpen) return;
        const timer = setInterval(handleNext, 4000);
        return () => clearInterval(timer);
    }, [isPaused, isLightboxOpen, handleNext]);

    const handleTransitionEnd = () => {
        if (currentIndex >= projects.length + clonesCount) {
            setTransitionEnabled(false);
            setCurrentIndex(clonesCount);
        }
        if (currentIndex < clonesCount) {
            setTransitionEnabled(false);
            setCurrentIndex(projects.length + clonesCount - 1);
        }
    };

    useEffect(() => {
        if (!transitionEnabled) {
            const timer = setTimeout(() => {
                setTransitionEnabled(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [transitionEnabled]);

    const openLightbox = (project: Project) => {
        const originalIndex = projects.findIndex(p => p.img === project.img);
        if (originalIndex > -1) {
            setSelectedImageIndex(originalIndex);
            setLightboxOpen(true);
        }
    };

    const closeLightbox = () => setLightboxOpen(false);

    const lightboxNext = () => {
        setSelectedImageIndex(prevIndex => (prevIndex + 1) % projects.length);
    };

    const lightboxPrev = () => {
        setSelectedImageIndex(prevIndex => (prevIndex - 1 + projects.length) % projects.length);
    };
    
    const itemWidthPercentage = 100 / itemsPerPage;
    const transformValue = `translateX(-${currentIndex * itemWidthPercentage}%)`;

    return (
        <>
            <div 
                className="relative max-w-[744px] mx-auto"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="overflow-hidden">
                    <div 
                        className="flex"
                        style={{
                            transform: transformValue,
                            transition: transitionEnabled ? 'transform 500ms ease-in-out' : 'none'
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {slideItems.map((project, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 w-1/2 md:w-1/4 p-2 cursor-pointer group"
                                onClick={() => openLightbox(project)}
                            >
                                <div className="relative overflow-hidden">
                                    <img src={project.img} alt={project.title} className="w-full h-52 object-cover transition-transform duration-300 transform scale-[1.02] group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                </div>
                                <div className="mt-2 text-white">
                                    <h4 className="font-semibold text-base truncate">{project.title}</h4>
                                    <p className="text-xs">{project.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handlePrev} 
                    aria-label="Proyecto anterior"
                    className="absolute top-1/2 -translate-y-[80%] mt-[-16px] -left-2 md:-left-4 w-10 h-10 flex items-center justify-center text-white bg-[#990021] rounded-full transition-colors duration-200 hover:bg-[#77001A] z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={handleNext} 
                    aria-label="Siguiente proyecto"
                    className="absolute top-1/2 -translate-y-[80%] mt-[-16px] -right-2 md:-right-4 w-10 h-10 flex items-center justify-center text-white bg-[#990021] rounded-full transition-colors duration-200 hover:bg-[#77001A] z-10"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            {isLightboxOpen && projects.length > 0 && (
                <Lightbox 
                    project={projects[selectedImageIndex]}
                    onClose={closeLightbox}
                    onPrev={lightboxPrev}
                    onNext={lightboxNext}
                />
            )}
        </>
    );
};

export default ProjectCarousel;