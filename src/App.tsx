import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SEO from './components/SEO';
import { LanguageProvider } from './context/LanguageContext';
import { ContactProvider } from './context/ContactContext';
import { ThemeProvider } from './context/ThemeContext';
import ContactModal from './components/ContactModal';
import ScrollProgress from './components/ScrollProgress';
import SideBadge from './components/SideBadge';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Partnerships from './pages/Partnerships';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ContactProvider>
            <SEO />
            <ScrollProgress />
            <div className="bg-pitch min-h-screen text-neutral-300 font-sans selection:bg-neutral-800 selection:text-white relative">
              <SideBadge />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/partnerships" element={<Partnerships />} />
              </Routes>
              <Footer />
              <BackToTop />
              <FloatingWhatsApp />
            </div>
            <ContactModal />
          </ContactProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
