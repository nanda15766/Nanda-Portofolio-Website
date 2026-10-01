import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { Play, MoveHorizontal } from 'lucide-react';
import CaseStudyModal, { CaseStudyData } from './CaseStudyModal';

/**
 * HorizontalShowcaseWall
 * Faithfully recreates Reference Image 5:
 * - Huge hollow outline background typography "Über 400 Projekte" / "4,000+ Contents"
 * - Multi-format staggered cards (vertical 9:16 reels + 16:9 widescreen video frames)
 * - Tactile floating interactive affordance badge: "< DRAG >"
 * - Clickable cards that open detailed case study modal
 */
export default function HorizontalShowcaseWall() {
  const { language } = useLanguage();
  const { caseStudies } = data[language];
  const [selectedStudyIndex, setSelectedStudyIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Showcase gallery items with mixed aspect ratios (vertical 9:16 and landscape 16:9)
  const showcaseItems = [
    {
      id: 0,
      title: 'DOKUMENT WORT FÜR WORT',
      subtitle: 'Viral Retention Hook',
      brand: 'Juara Holding Group',
      format: 'vertical', // 9:16
      metric: '10.8M Views',
      aspect: 'w-[260px] sm:w-[280px] h-[460px]',
      studyIndex: 0,
      gradient: 'from-[#1E466B] via-[#0F2236] to-[#080D14]',
    },
    {
      id: 1,
      title: 'SPARKASSE BILDUNG',
      subtitle: 'Fintech & Trust Building',
      brand: 'Volksbank & Sparkasse',
      format: 'landscape', // 16:9
      metric: '143K Views',
      aspect: 'w-[360px] sm:w-[420px] h-[250px] mt-12',
      studyIndex: 2,
      gradient: 'from-[#16324D] via-[#0E1E2E] to-[#080D14]',
    },
    {
      id: 2,
      title: 'UND SINNLICH BIS HIN ZU...',
      subtitle: 'Aesthetic Lifestyle Commercial',
      brand: 'Musti Musik.ID',
      format: 'vertical', // 9:16
      metric: '1.3M Views',
      aspect: 'w-[260px] sm:w-[280px] h-[460px]',
      studyIndex: 1,
      gradient: 'from-[#1E466B] via-[#0B253D] to-[#080D14]',
    },
    {
      id: 3,
      title: 'REEL RETENTION 98%',
      subtitle: 'Educational Micro-Content',
      brand: 'Army Geniuses Esports',
      format: 'landscape', // 16:9
      metric: 'High Engagement',
      aspect: 'w-[360px] sm:w-[420px] h-[250px] mt-6',
      studyIndex: 3,
      gradient: 'from-[#1E3B5C] via-[#0A1624] to-[#080D14]',
    },
    {
      id: 4,
      title: 'NOCH 2 WOCHEN',
      subtitle: 'Urgency Campaign Hook',
      brand: 'Tiga Pilar Nutrisi',
      format: 'vertical', // 9:16
      metric: 'Top Conversions',
      aspect: 'w-[260px] sm:w-[280px] h-[460px] -mt-8',
      studyIndex: 2,
      gradient: 'from-[#132A40] via-[#0D1C2B] to-[#080D14]',
    },
    {
      id: 5,
      title: 'GEMEINSCHAFT DIREKT',
      subtitle: 'Community Fan Hub',
      brand: 'Army Geniuses Esports',
      format: 'vertical', // 9:16
      metric: 'Active Fans',
      aspect: 'w-[260px] sm:w-[280px] h-[460px] mt-10',
      studyIndex: 3,
      gradient: 'from-[#1E466B] via-[#102438] to-[#080D14]',
    },
  ];

  const handleOpenStudy = (idx: number) => {
    setSelectedStudyIndex(idx);
  };

  const currentStudy: CaseStudyData | null =
    selectedStudyIndex !== null ? caseStudies[selectedStudyIndex] : null;

  return (
    <section className="relative py-28 md:py-36 overflow-hidden z-10">
      {/* Massive Hollow Outline Typography in Background (matching Reference Image 5) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span className="text-[14vw] sm:text-[12vw] font-black uppercase text-stroke-subtle whitespace-nowrap tracking-wider font-stretched-display opacity-80 translate-y-[20%]">
          {language === 'en' ? 'OVER 4,000 PROJECTS' : 'ÜBER 400 PROJEKTE'}
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-light block mb-2">
            {language === 'en' ? 'Multi-Format Production Wall' : 'Video-Portfolio'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-white">
            {language === 'en' ? 'Selected Productions' : 'Ausgewählte Produktionen'}
          </h2>
        </div>

        {/* Floating Interactive Drag Affordance (matching Reference Image 5 "< DRAG >") */}
        <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-light/50 bg-brand-light/10 text-brand-light text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_16px_rgba(103,186,244,0.25)] select-none">
          <MoveHorizontal className="w-4 h-4" />
          <span>DRAG HORIZONTALLY</span>
        </div>
      </div>

      {/* Horizontally Scrollable & Draggable Showcase Track */}
      <div
        ref={containerRef}
        className="relative z-10 w-full overflow-x-auto pb-12 pt-6 px-6 no-scrollbar cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          className="flex items-center gap-8 min-w-max select-none"
        >
          {showcaseItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleOpenStudy(item.studyIndex)}
              className={`${item.aspect} relative rounded-2xl p-6 border border-brand-light/25 bg-gradient-to-b ${item.gradient} shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:border-brand-light hover:shadow-[0_20px_48px_rgba(103,186,244,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer`}
              role="button"
              tabIndex={0}
              aria-label={`Open project details for ${item.title}`}
            >
              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top Header inside card */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-light px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm border border-brand-light/20">
                  {item.brand}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-brand-light group-hover:text-black transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Center / Bottom Typography hook inside card (matching Image 5 text overlays) */}
              <div className="relative z-10 mt-auto">
                <span className="text-xs text-brand-light font-semibold block mb-1">
                  {item.metric}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight uppercase leading-snug drop-shadow-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <CaseStudyModal
        study={currentStudy}
        onClose={() => setSelectedStudyIndex(null)}
        onNext={() => {
          if (selectedStudyIndex === null) return;
          setSelectedStudyIndex((selectedStudyIndex + 1) % caseStudies.length);
        }}
        onPrev={() => {
          if (selectedStudyIndex === null) return;
          setSelectedStudyIndex(
            (selectedStudyIndex - 1 + caseStudies.length) % caseStudies.length
          );
        }}
      />
    </section>
  );
}
