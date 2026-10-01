import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import CaseStudies from '../components/CaseStudies';
import HomeCTA from '../components/HomeCTA';
import LiquidBackdrop from '../components/LiquidBackdrop';

export default function Work() {
  const { language } = useLanguage();

  return (
    <main className="relative min-h-screen bg-[#07090c] text-white selection:bg-brand-bold selection:text-white pt-24">
      {/* Background Liquid Surface */}
      <LiquidBackdrop />

      {/* Page Hero Header */}
      <section className="relative pt-16 pb-12 px-6 z-10 border-b border-white/[0.08]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                02 / ARCHIVE OF WORK
              </span>
              <div className="w-20 h-[1px] bg-white/20 hidden sm:block" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] mb-6">
              <span className="font-extralight text-white/70 uppercase block">
                {language === 'en' ? 'PROVEN' : 'HASIL'}
              </span>
              <span className="font-black text-white uppercase block">
                {language === 'en' ? 'IMPACT.' : 'TERBUKTI.'}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed">
              {language === 'en'
                ? 'High-retention video strategies, viral newsjacking frameworks, and active community cultivation across luxury tourism, music education, and sports nutrition.'
                : 'Strategi video dengan retensi tinggi, formula viral newsjacking, dan pengelolaan komunitas aktif di sektor pariwisata mewah, edukasi musik, dan nutrisi olahraga.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid & Filters */}
      <CaseStudies />

      {/* Bottom CTA */}
      <HomeCTA />
    </main>
  );
}
