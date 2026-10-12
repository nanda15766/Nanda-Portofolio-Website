import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, MessageCircle, Send, Bookmark, Play, Pause, ChevronRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

/**
 * ReelPhoneShowcase
 * Faithfully recreates Reference Images 3 & 4:
 * - Image 3: Giant stretched typography "HYPE" / "IMPACT" behind a centered vertical smartphone device mockup.
 * - Image 4: Split editorial layout pairing the smartphone mockup on the right with a bold narrative
 *   and short-form content positioning on the left.
 * - Interactive video frame with play/pause state and Instagram action controls.
 */
export default function ReelPhoneShowcase() {
  const { language } = useLanguage();
  const { openContact } = useContact();
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  const titleText = language === 'en' ? 'Short-Form Content' : 'Pemasaran Video Pendek';
  const narrativeText =
    language === 'en'
      ? 'Not throwaway content for the next endless scroll, but cinematic narratives that solidify brand authority. High-retention production meets psychological hooks that audience memory never forgets.'
      : 'Bukan konten instan yang terlewatkan begitu saja, melainkan penceritaan visual yang menancapkan otoritas merek. Produksi retensi tinggi berpadu formula hook psikologis yang membekas di ingatan audiens.';

  return (
    <section className="relative py-28 md:py-36 overflow-hidden z-10">
      {/* Background Giant Stretched Typography (matching Reference Image 3 & 4) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <span className="text-[26vw] font-black uppercase text-brand-light/10 dark:text-brand-light/[0.07] font-stretched-display tracking-widest translate-y-[-10%]">
          IMPACT
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Top Centered Section Label (matching Image 3 "Der Peryton") */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-light">
            {language === 'en' ? 'The Viral Blueprint' : 'Cetak Biru Viral'}
          </span>
        </motion.div>

        {/* Split Grid Layout (matching Reference Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left z-10"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-brand-white mb-6 tracking-tight leading-[1.1]">
              {titleText}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
              {narrativeText}
            </p>

            {/* Proof KPI Badges (Unboxed metadata adhering to frontend design skill) */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-white/10 w-full mb-8 text-xs sm:text-sm">
              <div>
                <div className="text-xl md:text-2xl font-bold font-display text-brand-light tabular-nums">
                  10.8M+
                </div>
                <div className="text-slate-400 text-xs">Single Reel Peak Reach</div>
              </div>
              <div className="w-px h-8 bg-white/10" aria-hidden="true" />
              <div>
                <div className="text-xl md:text-2xl font-bold font-display text-brand-white tabular-nums">
                  766K+
                </div>
                <div className="text-slate-400 text-xs">Community Size Grown</div>
              </div>
              <div className="w-px h-8 bg-white/10" aria-hidden="true" />
              <div>
                <div className="text-xl md:text-2xl font-bold font-display text-brand-light tabular-nums">
                  4,000+
                </div>
                <div className="text-slate-400 text-xs">Production Assets Shipped</div>
              </div>
            </div>

            <button
              onClick={openContact}
              className="px-7 py-3 border border-brand-light/50 bg-brand-light/10 hover:bg-brand-light hover:text-brand-black text-brand-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(103,186,244,0.15)] flex items-center gap-2 group cursor-pointer"
            >
              <span>{language === 'en' ? 'Discuss Campaign Concept' : 'Diskusikan Konsep Kampanye'}</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right Column: Smartphone Mockup Frame (matching Images 3 & 4) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center items-center relative z-10"
          >
            {/* Ambient Smartphone Rim Glow */}
            <div
              className="absolute w-[320px] h-[580px] rounded-[52px] bg-brand-light/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Apple iPhone 16 Pro Style Hardware Chassis */}
            <div className="relative w-[295px] sm:w-[325px] h-[590px] sm:h-[640px] bg-[#0c1219] rounded-[48px] p-3 border-[3px] border-[#384858] shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(103,186,244,0.3)] flex flex-col overflow-hidden">
              {/* Device Screen Bezel */}
              <div className="relative w-full h-full bg-black rounded-[38px] overflow-hidden flex flex-col justify-between select-none">
                {/* Simulated Reel Background Scene */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#102235] via-[#0A1624] to-[#060D15] overflow-hidden">
                  {/* Atmospheric Light Gradient & Moving Shapes simulating video */}
                  <motion.div
                    animate={
                      isPlaying
                        ? {
                            scale: [1, 1.05, 1],
                            opacity: [0.85, 1, 0.85],
                          }
                        : {}
                    }
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-light/40 via-brand-bold/30 to-black/80"
                  />

                  {/* High-Concept Creator Silhouette / Scene Visual */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-bold via-brand-light to-white/90 p-1 mb-4 shadow-xl">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                        <span className="text-2xl font-black font-display tracking-tight">N.</span>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-brand-light mb-1">
                      Viral Retention Case
                    </span>
                    <h4 className="text-lg font-bold text-white leading-snug drop-shadow-md">
                      10.8M Views Single Reel
                    </h4>
                    <span className="text-[11px] text-slate-300 mt-2">
                      @indonesiajuaratrip × Wonderful ID
                    </span>
                  </div>

                  {/* Play/Pause Center Tap Affordance */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 flex items-center justify-center z-10 group cursor-pointer bg-black/10 hover:bg-black/20 transition-colors"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {!isPlaying && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl"
                      >
                        <Play className="w-6 h-6 ml-1 fill-white" />
                      </motion.div>
                    )}
                  </button>
                </div>

                {/* Top Status Bar: 9:41, Dynamic Island, Signal Icons */}
                <div className="relative z-20 pt-3 px-6 flex items-center justify-between text-white text-[11px] font-semibold">
                  <span>9:41</span>
                  {/* Dynamic Island Pill */}
                  <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center px-2 shadow-inner border border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b] mr-auto" />
                    <div className="w-2 h-2 rounded-full bg-[#0369a1]" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">5G</span>
                    <div className="w-4 h-2.5 border border-white rounded-[2px] p-[1px]">
                      <div className="w-full h-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Sponsored Account Header (matching Reference Image 3) */}
                <div className="relative z-20 px-4 pt-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-light to-white p-[1px]">
                      <div className="w-full h-full rounded-full bg-[#1E466B] flex items-center justify-center font-bold text-[10px]">
                        J
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-xs leading-none">indonesiajuaratrip</div>
                      <div className="text-[10px] text-slate-300 font-normal">Gesponsert</div>
                    </div>
                  </div>
                  <span className="text-slate-300 font-bold">···</span>
                </div>

                {/* Bottom Instagram Reel Controls & CTA (matching Reference Image 3 & 4) */}
                <div className="relative z-20 p-4 space-y-3">
                  {/* Action Bar (Heart, Comment, Send, Bookmark) */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setLiked(!liked)}
                        className="transition-transform active:scale-125"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            liked ? 'text-red-500 fill-red-500' : 'text-white'
                          }`}
                        />
                      </button>
                      <MessageCircle className="w-5 h-5" />
                      <Send className="w-5 h-5" />
                    </div>
                    <Bookmark className="w-5 h-5" />
                  </div>

                  {/* "Mehr dazu >" Interactive CTA Pill (matching Reference Image 3 & 4) */}
                  <button
                    onClick={openContact}
                    className="w-full py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Learn More' : 'Mehr dazu'}</span>
                    <span className="text-[10px]">›</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
