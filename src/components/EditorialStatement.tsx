import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

/**
 * EditorialStatement
 * Faithfully recreates Reference Image 6:
 * Centered dramatic typographic transition pairing an elegant accent serif first line
 * with a clean, authoritative display second line against the atmospheric cosmic canvas.
 */
export default function EditorialStatement() {
  const { language } = useLanguage();

  const serifLine =
    language === 'en' ? 'Infinite Possibilities.' : 'Unendliche Möglichkeiten.';
  const sansLine =
    language === 'en'
      ? 'How do we know what your brand and community truly need?'
      : 'Woher wissen wir, was dein Unternehmen braucht?';

  return (
    <section className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 md:space-y-6"
        >
          {/* Line 1: Accent Serif Italic (matching Reference Image 6) */}
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial-serif italic text-brand-light font-normal tracking-wide">
            {serifLine}
          </div>

          {/* Line 2: Authoritative Clean Display Type */}
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-brand-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            {sansLine}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
