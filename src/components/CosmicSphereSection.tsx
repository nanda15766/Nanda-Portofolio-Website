import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { ArrowUpRight } from 'lucide-react';

/**
 * CosmicSphereSection
 * Faithfully recreates Reference Image 7:
 * - Headline: "So entsteht " + giant stretched typography "IMPACT."
 * - Centered framed rectangular CTA button "Antrieb zünden"
 * - Huge celestial luminous sphere rising from the bottom with glowing aura and upward-reaching figure silhouette
 * - Strictly overrides reference colors with user's brand palette (#0D0D0D, #1E466B, #67BAF4, #FAFAFA).
 */
export default function CosmicSphereSection() {
  const { language } = useLanguage();
  const { openContact } = useContact();

  const ctaLabel = language === 'en' ? 'Ignite Strategy' : 'Antrieb zünden';

  return (
    <section className="relative pt-32 pb-4 overflow-hidden z-10 flex flex-col items-center justify-between min-h-[90vh]">
      <div className="container mx-auto px-6 max-w-5xl relative z-20 text-center flex flex-col items-center">
        {/* Culmination Headline (matching Reference Image 7 "So entsteht HYPE.") */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-baseline justify-center gap-3 sm:gap-5 mb-8"
        >
          <span className="text-3xl sm:text-5xl md:text-6xl font-display font-medium text-brand-white">
            {language === 'en' ? 'This is how we build' : 'So entsteht'}
          </span>
          <span className="text-4xl sm:text-6xl md:text-7xl font-black font-stretched-display text-brand-white uppercase tracking-wider">
            IMPACT.
          </span>
        </motion.div>

        {/* Framed CTA Button (matching Reference Image 7 "Antrieb zünden") */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={openContact}
            className="px-8 py-3.5 border border-brand-light/60 bg-brand-bold/40 hover:bg-brand-light hover:text-brand-black text-brand-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_28px_rgba(103,186,244,0.3)] hover:shadow-[0_0_40px_rgba(103,186,244,0.6)] backdrop-blur-sm cursor-pointer inline-flex items-center gap-2 group mb-12"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>

      {/* Massive Rising Cosmic Celestial Sphere with Silhouette Figure (matching Image 7) */}
      <div className="relative w-full flex items-end justify-center overflow-hidden h-[420px] sm:h-[500px] md:h-[580px] z-10 pointer-events-none select-none">
        {/* Rising Luminous Celestial Planet / Moon */}
        <div className="absolute -bottom-[20%] w-[380px] sm:w-[580px] md:w-[720px] h-[380px] sm:h-[580px] md:h-[720px] rounded-full bg-gradient-to-t from-[#060D15] via-[#102438] to-[#67BAF4]/80 shadow-[0_-20px_80px_rgba(103,186,244,0.45)] border-t border-brand-light/70 overflow-hidden flex items-start justify-center">
          {/* Planetary Surface Texture Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,250,250,0.4)_0%,rgba(103,186,244,0.25)_40%,transparent_75%)]" />
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(#FAFAFA_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Upward Reaching Figure Silhouette atop the Sphere (matching Reference Image 7) */}
        <div className="relative z-20 mb-8 sm:mb-12 flex flex-col items-center">
          <svg
            viewBox="0 0 120 180"
            className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-[0_4px_24px_rgba(103,186,244,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Reaching Arm */}
            <path
              d="M62 45 L66 12 L72 8 L70 42 Z"
              fill="#FAFAFA"
            />
            {/* Head */}
            <circle cx="56" cy="40" r="8" fill="#FAFAFA" />
            {/* Torso */}
            <path
              d="M48 50 L68 48 L64 90 L46 90 Z"
              fill="#FAFAFA"
            />
            {/* Left Arm relaxed */}
            <path
              d="M48 50 L38 72 L42 74 L52 56 Z"
              fill="#FAFAFA"
            />
            {/* Legs */}
            <path
              d="M48 90 L42 135 L48 140 L56 95 Z"
              fill="#1E293B"
            />
            <path
              d="M62 90 L74 130 L68 135 L58 95 Z"
              fill="#1E293B"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
