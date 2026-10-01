import { useEffect, useRef, useState, type UIEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, ArrowLeft, ArrowRight, CheckCircle2, MessageSquare, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { data } from '../data';
import { soundManager } from '../utils/audio';

export interface CaseStudyData {
  brand: string;
  subtitle: string;
  challenge: string;
  solution: string;
  results: string[];
  kpis: { label: string; value: string; icon?: string }[];
  image?: string;
  imageCaption?: string;
  category?: string;
  client?: string;
  tags?: string[];
}

interface CaseStudyModalProps {
  study: CaseStudyData | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasMultiple?: boolean;
}

export default function CaseStudyModal({
  study,
  onClose,
  onNext,
  onPrev,
  hasMultiple = true,
}: CaseStudyModalProps) {
  const { language } = useLanguage();
  const { openContact } = useContact();
  const t = data[language].ui;
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reset scroll position and progress when the active study changes
  useEffect(() => {
    setScrollProgress(0);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [study]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, scrollTop / maxScroll)));
    } else {
      setScrollProgress(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!study) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    if (study) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [study, onClose, onNext, onPrev]);

  if (!study) return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center sm:p-6 overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl bg-[#080a0d] sm:border sm:border-white/[0.16] shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden z-[100000] flex flex-col text-white sm:rounded-sm"
      >
        {/* Sticky Top Header with Prominent Back Button */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/[0.08] shrink-0 bg-[#07090c] z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Back Button */}
            <button
              onClick={() => {
                soundManager.playBlip(400, 0.03);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black rounded-sm font-mono text-xs uppercase tracking-wider transition-all cursor-pointer font-medium"
              title="Back to portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back' : 'Kembali'}</span>
            </button>

            <span className="hidden sm:inline-block text-white/30" aria-hidden="true">
              /
            </span>

            <span className="text-xs font-mono font-bold text-brand-light tracking-widest uppercase truncate max-w-[130px] sm:max-w-none">
              {study.brand}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {hasMultiple && (
              <div className="flex items-center gap-1 mr-1 sm:mr-2">
                <button
                  onClick={() => {
                    soundManager.playBlip(550, 0.03);
                    onPrev();
                  }}
                  aria-label="Previous case study"
                  className="w-8 h-8 bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors rounded-sm cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    soundManager.playBlip(650, 0.03);
                    onNext();
                  }}
                  aria-label="Next case study"
                  className="w-8 h-8 bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors rounded-sm cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              onClick={() => {
                soundManager.playBlip(400, 0.03);
                onClose();
              }}
              aria-label="Close dialog"
              className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-sm cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Reading Progress Bar */}
        <div className="w-full h-[2px] bg-white/[0.06] shrink-0">
          <motion.div
            className="h-full bg-brand-light origin-left"
            style={{ transform: `scaleX(${scrollProgress})` }}
            transition={{ ease: 'easeOut', duration: 0.08 }}
          />
        </div>

        {/* Modal Body */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="p-6 md:p-10 overflow-y-auto space-y-8 flex-1"
        >
          {/* Visual Showcase Banner if available */}
          {study.image && (
            <div className="relative rounded-sm overflow-hidden border border-white/[0.1] aspect-[16/9] sm:aspect-[21/9] max-h-72 bg-neutral-950">
              <img
                src={study.image}
                alt={study.brand}
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                {study.imageCaption && (
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/90 bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-white/15 rounded-sm">
                    {study.imageCaption}
                  </span>
                )}
                {study.category && (
                  <span className="font-mono text-[10px] tracking-wider uppercase text-brand-light bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-brand-light/30 rounded-sm hidden sm:inline-block">
                    {study.category}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Title & Tags */}
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight leading-snug">
              {study.subtitle}
            </h3>
            {study.tags && study.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {study.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white/10 bg-white/[0.03] text-white/60 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

            {/* KPI Numbers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-white/[0.02] border border-white/[0.08]">
              {study.kpis.map((kpi, kIdx) => (
                <div key={kIdx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-brand-light tabular-nums">
                    {kpi.value}
                  </div>
                  <div className="text-[11px] font-mono tracking-wider uppercase text-white/50">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-6">
              <div className="p-6 bg-white/[0.015] border border-white/[0.06]">
                <h4 className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t.challengeLabel}
                </h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                  {study.challenge}
                </p>
              </div>

              <div className="p-6 bg-white/[0.015] border border-white/[0.06]">
                <h4 className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase mb-3 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t.solutionLabel}
                </h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Key Deliverables & Results */}
            {study.results && study.results.length > 0 && (
              <div className="p-6 bg-white/[0.015] border border-white/[0.06]">
                <h4 className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase mb-4">
                  {t.resultsLabel}
                </h4>
                <ul className="space-y-3">
                  {study.results.map((result, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex items-start gap-3 text-sm md:text-base text-white/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        {/* Sticky Bottom Actions with Back Button */}
        <div className="px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 bg-[#07090c] z-20">
          <span className="text-xs font-mono text-white/50 text-center sm:text-left hidden sm:inline-block">
            {language === 'en'
              ? 'Interested in achieving these community milestones?'
              : 'Tertarik mencapai metrik dan hasil pertumbuhan komunitas serupa?'}
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Bottom Back Button */}
            <button
              onClick={() => {
                soundManager.playBlip(400, 0.03);
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-3 sm:py-2.5 border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm"
              title="Close modal and return to portfolio"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Back' : 'Kembali'}</span>
            </button>

            {/* Discuss Strategy Action */}
            <button
              onClick={() => {
                soundManager.playBlip(800, 0.04);
                onClose();
                openContact();
              }}
              className="flex-1 sm:flex-none px-5 py-3 sm:py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm shadow-md"
            >
              <span>{language === 'en' ? 'Discuss Strategy' : 'Konsultasikan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
