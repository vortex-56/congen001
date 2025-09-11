import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Vidrios from './pages/Vidrios';
import Andamios from './pages/Andamios';
import Gracias from './pages/Gracias';
import GraciasAndamios from './pages/GraciasAndamios';
import GraciasVidrios from './pages/GraciasVidrios';

const App: React.FC = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/vidrios' || location.pathname === '/andamios';

  const navigate = useNavigate();

  // If a previous navigation requested a scrollTarget (via location.state.scrollTarget),
  // perform the smooth scroll after the route mounts and then replace history state to avoid repeated scrolls.
  useEffect(() => {
    const state = (location.state as any) || undefined;
    const target: string | undefined = state?.scrollTarget;
    if (target) {
      // allow DOM to paint
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Remove scrollTarget from history state so it doesn't trigger again
        navigate(location.pathname, { replace: true, state: {} });
      }, 50);
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="/productos" element={<Productos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/vidrios" element={<Vidrios />} />
          <Route path="/andamios" element={<Andamios />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/gracias-andamios" element={<GraciasAndamios />} />
          <Route path="/gracias-vidrios" element={<GraciasVidrios />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
  {/* Show FloatingWhatsApp on the homepage root */}
    {location.pathname === '/' && <FloatingWhatsApp title="inicio" />}
    </div>
  );
};

export default App;
