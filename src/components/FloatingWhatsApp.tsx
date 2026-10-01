import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  const waUrl =
    'https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20konsultasi%20strategi%20media%20sosial%20%2F%20layanan%20freelance.';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
        >
          {/* Tooltip callout (hidden on tiny screens) */}
          <div className="hidden sm:flex items-center gap-2 bg-neutral-900/95 border border-neutral-700/80 text-white px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-mono text-xs font-medium tracking-wide">
              {language === 'en' ? 'Chat on WhatsApp' : 'Konsultasi via WA'}
            </span>
          </div>

          {/* WhatsApp Action Button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playBlip(820, 0.04)}
            className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
            title="Chat directly on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#25D366] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-ping" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
