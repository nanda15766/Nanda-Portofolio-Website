import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { useSearchParams } from 'react-router-dom';
import CaseStudyModal, { CaseStudyData } from './CaseStudyModal';
import { soundManager } from '../utils/audio';

const CASE_MEDIA = [
  {
    image: '/images/komodo_luxury_cruise.jpg',
    imageCaption: 'KOMODO LUXURY CRUISE & PHINISI FLEET',
    categoryEn: 'Hospitality & Tourism',
    categoryId: 'Pariwisata & Hospitaliti',
    clientEn: 'Indonesia Juara Trip / Caspla Bali',
    clientId: 'Indonesia Juara Trip / Caspla Bali',
    titleEn: 'Juara Holding Group: Luxury Travel Content Machine',
    titleId: 'Juara Holding Group: Mesin Konten Pariwisata Mewah',
    descEn:
      'Spearheaded the short-form visual direction across flagship Indonesian travel brands, capturing high-end phinisi yacht charters, Labuan Bajo expeditions, and Nusa Penida luxury transfers. Engineered content archetypes designed specifically for viral travel discovery and international tourism booking inquiries.',
    descId:
      'Memimpin arahan visual video pendek di seluruh merek pariwisata unggulan Indonesia, mendokumentasikan sewa kapal phinisi mewah, ekspedisi Labuan Bajo, dan transfer cepat Nusa Penida. Merancang format konten yang dirancang khusus untuk viralitas dan reservasi wisata.',
    metricsEn: [
      { val: '10.8M+', lbl: 'Peak Single Reel' },
      { val: '2.9M+', lbl: 'TikTok Reach' },
      { val: '766K+', lbl: 'Combined Network' },
    ],
    metricsId: [
      { val: '10.8M+', lbl: 'Puncak Tayangan Reel' },
      { val: '2.9M+', lbl: 'Jangkauan TikTok' },
      { val: '766K+', lbl: 'Jaringan Pengikut' },
    ],
    tags: ['Labuan Bajo', 'Phinisi Charters', 'Drone Cinematography', 'Lead Funneling'],
  },
  {
    image: '/images/closeup_piano.jpg',
    imageCaption: 'CLOSE-UP PIANO & MUSIC EDUTAINMENT',
    categoryEn: 'Creator Culture & Education',
    categoryId: 'Budaya Kreator & Edukasi',
    clientEn: 'Musti Musik.ID',
    clientId: 'Musti Musik.ID',
    titleEn: 'Musti Musik.ID: 81.7K Musicians With $0 Ad Spend',
    titleId: 'Musti Musik.ID: 81.7K Musisi Tanpa Biaya Iklan ($0)',
    descEn:
      'Formulated the viral "15-Second Lick" framework for Indonesian music enthusiasts. By breaking down complex guitar solos into bite-sized visual tabs with rapid audio rewards, we triggered hyper-sharing among musicians across Instagram and TikTok.',
    descId:
      'Memformulasikan konsep viral "15-Second Lick" bagi pegiat musik Indonesia. Dengan membedah solo gitar rumit menjadi tab visual ringkas dengan audio instan, kami memicu interaksi dan pembagian konten yang sangat masif.',
    metricsEn: [
      { val: '1.3M+', lbl: 'Top Reel Hit' },
      { val: '81.7K+', lbl: 'Pure Organic Gain' },
      { val: 'Zero', lbl: 'Paid Ad Spend' },
    ],
    metricsId: [
      { val: '1.3M+', lbl: 'Puncak Tayangan Reel' },
      { val: '81.7K+', lbl: 'Pertumbuhan Organik' },
      { val: 'Nol', lbl: 'Biaya Iklan Berbayar' },
    ],
    tags: ['Educational Retention', 'Community Tab Requests', 'Creator Brand Deals'],
  },
  {
    image: '/images/strength_gym_training.jpg',
    imageCaption: 'STRENGTH GYM TRAINING & ATHLETIC NUTRITION',
    categoryEn: 'Health & DTC Supplements',
    categoryId: 'Kesehatan & Suplemen DTC',
    clientEn: 'Neugen Sports Nutrition',
    clientId: 'Neugen Sports Nutrition',
    titleEn: 'Tiga Pilar Nutrisi: De-mystifying Supplement Science',
    titleId: 'Tiga Pilar Nutrisi: Membedah Sains Suplemen',
    descEn:
      'Transitioned sports nutrition marketing from generic gym hype into high-authority scientific guidance. Built digestible breakdowns of whey isolate, creatine timing, and macro calculations that earned high saves and direct e-commerce checkout traffic.',
    descId:
      'Mentransformasikan pemasaran nutrisi olahraga dari sekadar tren gym biasa menjadi panduan ilmiah berotoritas tinggi. Menyajikan edukasi takaran whey protein, waktu konsumsi kreatin, dan perhitungan nutrisi yang menghasilkan rasio simpan tinggi dan konversi e-commerce.',
    metricsEn: [
      { val: '143K+', lbl: 'Top Reel Views' },
      { val: 'High Save', lbl: 'Bookmark Ratio' },
      { val: '+42%', lbl: 'Direct Checkout Lift' },
    ],
    metricsId: [
      { val: '143K+', lbl: 'Tayangan Reel Utama' },
      { val: 'Tinggi', lbl: 'Rasio Simpan Konten' },
      { val: '+42%', lbl: 'Peningkatan Penjualan' },
    ],
    tags: ['Science-Backed Copy', 'Supplement Dosing Guides', 'TikTok Shop Integration'],
  },
];

export default function CaseStudies() {
  const { language } = useLanguage();
  const { caseStudies } = data[language];
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStudyIndex, setSelectedStudyIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'detailed' | 'overview'>('detailed');

  // Sync with URL query parameter ?case=
  useEffect(() => {
    const caseParam = searchParams.get('case');
    if (caseParam) {
      const idx = caseStudies.findIndex(
        (s) => s.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') === caseParam
      );
      if (idx !== -1) {
        setSelectedStudyIndex(idx);
      }
    }
  }, [searchParams, caseStudies]);

  const handleOpenStudy = (index: number) => {
    soundManager.playBlip(720, 0.04);
    setSelectedStudyIndex(index);
    const slug = caseStudies[index]?.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `case-${index + 1}`;
    setSearchParams({ case: slug }, { replace: true });
  };

  const handleCloseStudy = () => {
    soundManager.playBlip(420, 0.04);
    setSelectedStudyIndex(null);
    setSearchParams({}, { replace: true });
  };

  const handleNextStudy = () => {
    if (selectedStudyIndex === null) return;
    const nextIdx = (selectedStudyIndex + 1) % caseStudies.length;
    handleOpenStudy(nextIdx);
  };

  const handlePrevStudy = () => {
    if (selectedStudyIndex === null) return;
    const prevIdx = (selectedStudyIndex - 1 + caseStudies.length) % caseStudies.length;
    handleOpenStudy(prevIdx);
  };

  const currentStudy: CaseStudyData | null =
    selectedStudyIndex !== null && caseStudies[selectedStudyIndex]
      ? {
          ...caseStudies[selectedStudyIndex],
          image: CASE_MEDIA[selectedStudyIndex]?.image,
          imageCaption: CASE_MEDIA[selectedStudyIndex]?.imageCaption,
          category:
            language === 'en'
              ? CASE_MEDIA[selectedStudyIndex]?.categoryEn
              : CASE_MEDIA[selectedStudyIndex]?.categoryId,
          client:
            language === 'en'
              ? CASE_MEDIA[selectedStudyIndex]?.clientEn
              : CASE_MEDIA[selectedStudyIndex]?.clientId,
          tags: CASE_MEDIA[selectedStudyIndex]?.tags,
        }
      : null;

  return (
    <section
      className="py-28 max-w-7xl mx-auto px-6 relative z-10"
      data-purpose="flagship-portfolio-cases"
      id="work"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            {language === 'en' ? '03 / PROVEN IMPACT' : '03 / DAMPAK TERBUKTI'}
          </span>
          <h2 className="font-serif-italic text-4xl md:text-5xl text-white mt-2">
            {language === 'en' ? 'Selected Case Studies' : 'Studi Kasus Pilihan'}
          </h2>
        </div>

        {/* View Mode Toggle: Detailed vs Brief Executive Overview (Addressing Mas Edo's Feedback) */}
        <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 p-1 rounded-sm self-start md:self-end">
          <button
            onClick={() => {
              soundManager.playBlip(620, 0.03);
              setViewMode('detailed');
            }}
            className={`px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
              viewMode === 'detailed'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Detailed Deep-Dives' : 'Studi Lengkap'}
          </button>
          <button
            onClick={() => {
              soundManager.playBlip(680, 0.03);
              setViewMode('overview');
            }}
            className={`px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
              viewMode === 'overview'
                ? 'bg-white text-black font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Brief Executive Overview' : 'Ringkasan Eksekutif'}
          </button>
        </div>
      </div>

      {viewMode === 'overview' ? (
        /* Executive Overview Table / Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, idx) => {
            const media = CASE_MEDIA[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => handleOpenStudy(idx)}
                className="editorial-border bg-neutral-950/70 p-6 sm:p-7 rounded-sm border border-neutral-800/80 hover:border-neutral-600 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300 rounded-sm">
                      {language === 'en' ? media?.categoryEn : media?.categoryId}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-white group-hover:text-brand-light transition-colors mb-1">
                      {study.brand}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      {study.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-800/60 text-xs">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-neutral-400 block mb-0.5">
                        {language === 'en' ? 'Core Challenge:' : 'Tantangan Utama:'}
                      </span>
                      <p className="text-neutral-300 line-clamp-2 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-neutral-400 block mb-0.5">
                        {language === 'en' ? 'Key Quantified Results:' : 'Hasil Terukur Utama:'}
                      </span>
                      <ul className="text-neutral-300 space-y-1">
                        {study.results.slice(0, 2).map((res, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-brand-light font-bold">✓</span>
                            <span className="line-clamp-1">{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {study.kpis.map((kpi, kIdx) => (
                      <div key={kIdx} className="text-left">
                        <span className="font-serif-italic text-sm text-white font-bold block">
                          {kpi.value}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase">
                          {kpi.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <span className="font-mono text-xs uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>{language === 'en' ? 'Open Detail' : 'Buka Detail'}</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Detailed Deep-Dive Mode */
        <div className="space-y-16">
        {CASE_MEDIA.map((item, index) => {
          const isReversed = index % 2 === 1;

          return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="editorial-border bg-card/40 rounded-sm overflow-hidden p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Content Side */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? 'order-1 lg:order-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-neutral-800 text-neutral-300 rounded-sm">
                      {language === 'en' ? item.categoryEn : item.categoryId}
                    </span>
                    <span className="text-neutral-400 font-mono text-xs">
                      • {language === 'en' ? item.clientEn : item.clientId}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl text-white leading-snug">
                    {language === 'en' ? item.titleEn : item.titleId}
                  </h3>

                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    {language === 'en' ? item.descEn : item.descId}
                  </p>

                  {/* Key Case Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
                    {(language === 'en' ? item.metricsEn : item.metricsId).map((metric, mIdx) => (
                      <div key={mIdx}>
                        <span className="font-serif-italic text-2xl md:text-3xl text-white">
                          {metric.val}
                        </span>
                        <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                          {metric.lbl}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags & Action Button */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="border border-neutral-800 px-2.5 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenStudy(index)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white hover:text-neutral-300 transition-colors py-1 cursor-pointer"
                    >
                      <span>
                        {language === 'en' ? 'Inspect Strategy' : 'Detail Strategi'}
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Media Image Side */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'order-2 lg:order-1' : ''
                  }`}
                >
                  <div
                    onClick={() => handleOpenStudy(index)}
                    className="relative overflow-hidden rounded-sm border border-neutral-800 group aspect-[4/3] bg-neutral-900 cursor-pointer"
                  >
                    <img
                      alt={item.titleEn}
                      src={item.image}
                      className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pitch/90 via-pitch/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">
                        {item.imageCaption}
                      </span>
                      <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        EXPAND ↗
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
        </div>
      )}

      {/* Interactive Case Study Modal */}
      <AnimatePresence>
        {selectedStudyIndex !== null && currentStudy && (
          <CaseStudyModal
            study={currentStudy}
            onClose={handleCloseStudy}
            onNext={handleNextStudy}
            onPrev={handlePrevStudy}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
