import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CaseStudyModal, { CaseStudyData } from './CaseStudyModal';
import { soundManager } from '../utils/audio';

export default function FeaturedWork() {
  const { language } = useLanguage();
  const { caseStudies } = data[language];
  const [selectedStudyIndex, setSelectedStudyIndex] = useState<number | null>(null);

  // Take the 2 flagship case studies
  const featuredStudies = caseStudies.slice(0, 2);

  const handleOpenStudy = (index: number) => {
    soundManager.playBlip(700, 0.04);
    setSelectedStudyIndex(index);
  };

  const handleCloseStudy = () => {
    soundManager.playBlip(400, 0.04);
    setSelectedStudyIndex(null);
  };

  const handleNextStudy = () => {
    if (selectedStudyIndex === null) return;
    const nextIdx = (selectedStudyIndex + 1) % featuredStudies.length;
    setSelectedStudyIndex(nextIdx);
  };

  const handlePrevStudy = () => {
    if (selectedStudyIndex === null) return;
    const prevIdx = (selectedStudyIndex - 1 + featuredStudies.length) % featuredStudies.length;
    setSelectedStudyIndex(prevIdx);
  };

  const currentStudy: CaseStudyData | null =
    selectedStudyIndex !== null ? featuredStudies[selectedStudyIndex] : null;

  return (
    <section id="work" className="relative py-28 md:py-36 px-6 z-10 border-t border-white/[0.08] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header matching Architectural grid indices */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 block mb-2">
              04 / SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight">
              {language === 'en' ? 'Decision-Grade Impact.' : 'Dampak & Pembuktian Nyata.'}
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>{language === 'en' ? 'All 4 Case Studies' : 'Lihat Semua Studi Kasus'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-light" />
          </Link>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredStudies.map((study, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ 
                y: -6,
                scale: 1.015,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
              }}
              whileTap={{ 
                scale: 0.99,
                transition: { duration: 0.1 }
              }}
              onClick={() => handleOpenStudy(idx)}
              className="bg-[#080a0d]/90 border border-white/[0.12] hover:border-white/30 p-8 sm:p-10 cursor-pointer flex flex-col justify-between group transition-colors duration-300 will-change-transform min-h-[420px]"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenStudy(idx);
                }
              }}
              aria-label={`Open case study for ${study.brand}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-brand-light">
                    {study.brand}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight mb-4 leading-snug">
                  {study.subtitle}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans mb-8 line-clamp-3">
                  {study.challenge}
                </p>
              </div>

              {/* KPI metrics in architectural tabular figures */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] mt-auto">
                {study.kpis.map((kpi, kIdx) => (
                  <div key={kIdx} className="text-left">
                    <div className="text-xl sm:text-2xl font-mono font-bold text-white tabular-nums mb-1">
                      {kpi.value}
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CaseStudyModal
        study={currentStudy}
        onClose={handleCloseStudy}
        onNext={handleNextStudy}
        onPrev={handlePrevStudy}
      />
    </section>
  );
}
