import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Item {
  img: string;
  title: string;
  subtitle: string;
}

interface ProductCarouselProps {
  items: Item[];
}

const ArrowLeftSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 19L8 12L15 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5L16 12L9 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProductCarousel: React.FC<ProductCarouselProps> = ({ items }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    if (items.length === 0) return [];
    const clonesFromEnd = items.slice(-clonesCount);
    const clonesFromStart = items.slice(0, clonesCount);
    return [...clonesFromEnd, ...items, ...clonesFromStart];
  }, [items, clonesCount]);

  const [currentIndex, setCurrentIndex] = useState(clonesCount);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const handleNext = useCallback(() => setCurrentIndex(i => i + 1), []);
  const handlePrev = useCallback(() => setCurrentIndex(i => i - 1), []);

  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, [isPaused, isLightboxOpen, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length + clonesCount) {
      setTransitionEnabled(false);
      setCurrentIndex(clonesCount);
    }
    if (currentIndex < clonesCount) {
      setTransitionEnabled(false);
      setCurrentIndex(items.length + clonesCount - 1);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const t = setTimeout(() => setTransitionEnabled(true), 50);
      return () => clearTimeout(t);
    }
  }, [transitionEnabled]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index % items.length);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const lightboxNext = () => setSelectedIndex(i => (i + 1) % items.length);
  const lightboxPrev = () => setSelectedIndex(i => (i - 1 + items.length) % items.length);

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
            style={{ transform: transformValue, transition: transitionEnabled ? 'transform 500ms ease-in-out' : 'none' }}
            onTransitionEnd={handleTransitionEnd}
          >
      {slideItems.map((it, idx) => (
        <div key={idx} className="flex-shrink-0 w-1/2 md:w-1/4 p-2">
        <div className="w-[168px] h-[206px] bg-[#1F3D44] rounded-md outline outline-2 outline-[#009899] flex flex-col items-center mx-auto">
          <div className="w-[160px] h-[160px] m-1 rounded-md overflow-hidden bg-[#46a820]">
            <img src={it.img} alt={it.title} className="w-[164px] h-[164px] object-cover" loading="lazy" />
          </div>
          <div className="w-[160px] h-[34px] flex flex-col items-start px-1">
            <div className="h-4">
              <span className="text-white text-xs font-semibold uppercase">{it.title}</span>
            </div>
            <div className="w-full flex justify-between items-center h-4">
              <span className="text-white text-[10px] font-normal">{it.subtitle}</span>
              <div className="flex gap-1">
                <button className="cursor-pointer"><ArrowLeftSmall /></button>
                <button className="cursor-pointer"><ArrowRightSmall /></button>
              </div>
            </div>
          </div>
        </div>
        </div>
      ))}
          </div>
        </div>

        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="absolute top-1/2 -translate-y-[80%] -left-2 w-10 h-10 flex items-center justify-center text-white bg-[#990021] rounded-full z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          aria-label="Siguiente"
          className="absolute top-1/2 -translate-y-[80%] -right-2 w-10 h-10 flex items-center justify-center text-white bg-[#990021] rounded-full z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {isLightboxOpen && items.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative bg-white p-4 rounded max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={items[selectedIndex].img} alt={items[selectedIndex].title} className="w-full h-auto object-contain" />
            <button onClick={closeLightbox} className="absolute top-2 right-2 bg-black/40 text-white rounded-full p-2">✕</button>
            <button onClick={lightboxPrev} className="absolute top-1/2 left-2 bg-black/40 text-white rounded-full p-2">‹</button>
            <button onClick={lightboxNext} className="absolute top-1/2 right-2 bg-black/40 text-white rounded-full p-2">›</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
