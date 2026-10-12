import { useState, type MouseEvent } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Mail, Linkedin, ArrowRight, Download, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);

    // Active section highlight based on scroll position if on home page
    if (location.pathname === '/') {
      const sections = ['contact', 'testimonials', 'offers', 'content-showcase', 'clients', 'work', 'intro'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    }
  });

  const { language, toggleLanguage } = useLanguage();
  const { openContact } = useContact();

  const handleNavClick = (e: MouseEvent, targetId: string) => {
    soundManager.playBlip(600, 0.03);
    setActiveSection(targetId);
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const navItems = [
    { id: 'intro', labelEn: 'INTRO', labelId: 'INTRO' },
    { id: 'work', labelEn: 'WORK', labelId: 'KARYA' },
    { id: 'content-showcase', labelEn: 'CONTENT', labelId: 'KONTEN' },
    { id: 'offers', labelEn: 'SERVICES & OFFERS', labelId: 'LAYANAN & PAKET' },
    { id: 'testimonials', labelEn: 'PROOF', labelId: 'TESTIMONI' },
    { id: 'contact', labelEn: 'CONTACT', labelId: 'KONTAK' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070707]/90 backdrop-blur-md border-b border-neutral-900/90 py-3.5'
          : 'bg-[#070707]/75 backdrop-blur-sm border-b border-neutral-900/60 py-5'
      }`}
      data-purpose="site-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Monogram Brand Mark */}
        <Link
          to="/"
          className="group flex items-center gap-3 select-none"
          onClick={() => soundManager.playBlip(720, 0.04)}
        >
          <span className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center font-mono text-xs font-semibold text-neutral-200 group-hover:border-neutral-400 group-hover:text-white transition-colors">
            N
          </span>
          <div className="flex flex-col">
            <span className="font-serif-italic text-lg tracking-wide text-neutral-200 group-hover:text-white transition-colors">
              Nanda D. W. Prasetyo
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">
              Community Architect
            </span>
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-[11px] font-mono tracking-widest uppercase"
          data-purpose="nav-links"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className={`text-[7px] ${isActive ? 'text-white' : 'text-neutral-600'}`}>
                  {isActive ? '●' : '○'}
                </span>
                <span>{language === 'en' ? item.labelEn : item.labelId}</span>
              </a>
            );
          })}
        </nav>

        {/* Action & Social Links */}
        <div className="flex items-center gap-2.5 sm:gap-3" data-purpose="action-links">
          {/* Prominent Download Portfolio Button */}
          <a
            href="/Resume & Portofolio - Nanda Dwi Wahyu Prasetyo 2026.pdf"
            download="Resume & Portofolio - Nanda Dwi Wahyu Prasetyo 2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playBlip(650, 0.04)}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-200 hover:text-white px-3 py-1.5 border border-neutral-700 hover:border-neutral-400 rounded-sm bg-neutral-900/80 hover:bg-neutral-800 transition-all cursor-pointer"
            title="Download PDF Portfolio"
          >
            <Download className="w-3.5 h-3.5 text-brand-light" />
            <span className="font-medium">{language === 'en' ? 'Download Portfolio' : 'Unduh Portofolio'}</span>
          </a>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="font-mono text-[10px] text-neutral-400 hover:text-white transition-colors px-2 py-1 border border-neutral-800 rounded-sm cursor-pointer uppercase"
            title="Toggle Language (EN / ID)"
          >
            {language === 'en' ? 'ID' : 'EN'}
          </button>

          {/* LinkedIn Profile */}
          <a
            className="p-2 text-neutral-400 hover:text-white transition-colors border border-neutral-800 hover:border-neutral-600 rounded-sm"
            href="https://linkedin.com/in/nandadwiwahyuprasetyo"
            rel="noopener noreferrer"
            target="_blank"
            title="LinkedIn Profile"
            onClick={() => soundManager.playBlip(600, 0.03)}
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>

          {/* Direct WhatsApp CTA Button */}
          <a
            href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20konsultasi%20strategi%20media%20sosial%20%2F%20layanan%20freelance."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playBlip(820, 0.04)}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider bg-[#25D366] text-black px-3 py-1.5 rounded-sm hover:bg-[#20bd5a] transition-all font-semibold cursor-pointer shadow-xs shadow-[#25D366]/20"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WA CHAT</span>
          </a>

          {/* Let's Talk Inquiry Modal CTA */}
          <button
            onClick={() => {
              soundManager.playBlip(800, 0.05);
              openContact();
            }}
            className="hidden lg:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider bg-white text-black px-3 py-1.5 rounded-sm hover:bg-neutral-200 transition-colors font-medium cursor-pointer"
          >
            <span>{language === 'en' ? 'Brief Form' : 'Form Pesan'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded-sm"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070707]/98 border-b border-neutral-800 px-6 py-6 flex flex-col gap-4 text-xs font-mono tracking-widest uppercase text-neutral-300"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(e, item.id);
                }}
                className="py-1 hover:text-white"
              >
                {language === 'en' ? item.labelEn : item.labelId}
              </a>
            ))}

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
              {/* Mobile Download Portfolio Button */}
              <a
                href="/Resume & Portofolio - Nanda Dwi Wahyu Prasetyo 2026.pdf"
                download="Resume & Portofolio - Nanda Dwi Wahyu Prasetyo 2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playBlip(650, 0.04)}
                className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-200 hover:text-white"
              >
                <Download className="w-3.5 h-3.5 text-brand-light" />
                <span>{language === 'en' ? 'DOWNLOAD PORTFOLIO' : 'UNDUH PORTOFOLIO'}</span>
              </a>

              <a
                href="mailto:nanda15766@gmail.com"
                className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-white"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>EMAIL</span>
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20konsultasi%20strategi%20media%20sosial%20%2F%20layanan%20freelance."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundManager.playBlip(820, 0.04);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#25D366] text-black py-2.5 px-4 text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{language === 'en' ? 'Chat on WhatsApp' : 'Chat via WhatsApp'}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openContact();
                }}
                className="bg-neutral-800 text-white py-2 text-center text-xs font-mono font-medium uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs"
              >
                <span>{language === 'en' ? 'Open Inquiry Form' : 'Formulir Pesan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
