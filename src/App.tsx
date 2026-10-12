import { lazy, Suspense, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SEO from './components/SEO';
import { LanguageProvider } from './context/LanguageContext';
import { ContactProvider } from './context/ContactContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollProgress from './components/ScrollProgress';
import SideBadge from './components/SideBadge';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ContactModal = lazy(() => import('./components/ContactModal'));

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
      <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <ContactProvider>
            <SEO />
            <ScrollProgress />
            <div className="bg-pitch min-h-screen text-neutral-300 font-sans selection:bg-neutral-800 selection:text-white relative">
              <a href="#main-content" className="skip-link">Skip to content</a>
              <SideBadge />
              <Navbar />
              <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/partnerships" element={<Partnerships />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
              <Footer />
              <BackToTop />
              <FloatingWhatsApp />
            </div>
            <Suspense fallback={null}>
              <ContactModal />
            </Suspense>
          </ContactProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
    </HelmetProvider>
  );
}
