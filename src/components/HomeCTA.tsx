import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

/**
 * Top CTA section matching Screenshot 6.
 * Massive two-line headline:
 * "Bring the ambition."
 * "Let's build."
 * Right side prompt and high-contrast boxed button [ Start a project | ↗ ]
 */
export default function HomeCTA() {
  const { language } = useLanguage();
  const { openContact } = useContact();

  return (
    <section className="relative py-28 md:py-36 px-6 z-10 border-t border-white/[0.08] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 select-none">
          {/* Left Column: Massive Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-left"
          >
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display font-light text-white tracking-tight leading-[0.95]">
              <span className="block font-light text-white/90">
                {language === 'en' ? 'Bring the ambition.' : 'Bawa ambisi Anda.'}
              </span>
              <span className="block font-black text-white mt-1 sm:mt-2">
                {language === 'en' ? "Let's build." : 'Mari bangun.'}
              </span>
            </h2>
          </motion.div>

          {/* Right Column: Paragraph and Architectural Button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-md shrink-0"
          >
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans mb-8">
              {language === 'en'
                ? 'Social media strategy, high-retention short video, and community architectures. Tell us what needs to grow.'
                : 'Strategi media sosial, konten video retensi tinggi, dan arsitektur komunitas. Beritahu kami target pertumbuhan Anda.'}
            </p>

            {/* Split Architectural Box Button matching Screenshot 6: [ Start a project | ↗ ] */}
            <button
              onClick={() => {
                soundManager.playBlip(820, 0.05);
                openContact();
              }}
              className="group border border-white/30 hover:border-white/90 bg-black/40 hover:bg-white/10 transition-all duration-300 flex items-stretch h-14"
            >
              <div className="px-6 flex items-center text-xs font-mono uppercase tracking-[0.2em] text-white">
                {language === 'en' ? 'Start a project' : 'Mulai proyek'}
              </div>
              <div className="w-14 border-l border-white/20 group-hover:border-white/50 bg-white/5 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
