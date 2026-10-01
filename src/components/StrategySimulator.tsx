import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Compass, Music, Dumbbell, Gamepad2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContact } from '../context/ContactContext';

interface DomainStrategy {
  id: string;
  icon: typeof Compass;
  industry: { en: string; id: string };
  brand: string;
  challenge: { en: string; id: string };
  playbook: { en: string; id: string };
  pillar1: { en: string; id: string };
  pillar2: { en: string; id: string };
  keyMetric: { en: string; id: string };
  caseStudySlug: string;
}

const domainStrategies: DomainStrategy[] = [
  {
    id: 'tourism',
    icon: Compass,
    industry: { en: 'Luxury Tourism & Travel', id: 'Pariwisata Mewah & Wisata' },
    brand: 'Juara Holding Group',
    challenge: {
      en: 'Cut through crowded premium travel space and capture global audience attention.',
      id: 'Menembus pasar wisata premium yang padat dan menarik perhatian audiens global.'
    },
    playbook: {
      en: 'Newsjacking hooks + Official national board collaborations (@WonderfulIndonesia) + Curated destination funfacts.',
      id: 'Pemanfaatan tren terkini + Kolaborasi resmi (@WonderfulIndonesia) + Format funfact destinasi.'
    },
    pillar1: { en: 'Timely Trend Newsjacking', id: 'Pemanfaatan Tren Berita Terkini' },
    pillar2: { en: 'Strategic Travel Board Synergy', id: 'Sinergi Strategis Badan Pariwisata' },
    keyMetric: { en: '10.8M+ Reel Views · 766K+ Followers', id: '10.8M+ Tayangan Reel · 766K+ Pengikut' },
    caseStudySlug: 'juara-holding-group'
  },
  {
    id: 'edutainment',
    icon: Music,
    industry: { en: 'Music, Culture & Edutainment', id: 'Musik, Budaya & Edukasi' },
    brand: 'Musti Musik.ID',
    challenge: {
      en: 'Transform deep, intimidating music theory into bingeable short-form video content.',
      id: 'Mengubah teori musik yang kompleks menjadi konten video pendek yang adiktif.'
    },
    playbook: {
      en: 'Lick Series breakdown + Musical humor evolution + Interactive "Guess the Song" quizzes.',
      id: 'Bedah teknik Lick Series + Humor evolusi aransemen + Kuis tebak lagu interaktif.'
    },
    pillar1: { en: 'Digestible Musical Education', id: 'Edukasi Musik Praktis' },
    pillar2: { en: 'Interactive Guess Formats', id: 'Format Tebak Interaktif' },
    keyMetric: { en: '1.3M+ Single Reel · 81.7K Community', id: '1.3M+ Satu Reel · 81.7K Komunitas' },
    caseStudySlug: 'musti-musik-id'
  },
  {
    id: 'fitness',
    icon: Dumbbell,
    industry: { en: 'Health, Wellness & Nutrition', id: 'Kebugaran & Suplemen Nutrisi' },
    brand: 'Tiga Pilar Nutrisi (Neugen Sport)',
    challenge: {
      en: 'Establish genuine brand authority in a market dominated by legacy foreign supplements.',
      id: 'Membangun reputasi dan kepercayaan merek di pasar suplemen yang didominasi produk impor.'
    },
    playbook: {
      en: 'Educational "How-To" supplement science + Relatable gym archetype skits + Micro-influencer athlete roster.',
      id: 'Edukasi sains suplemen + Parodi tipe orang di gym + Kolaborasi atlet dan influencer.'
    },
    pillar1: { en: 'Science-Backed Education', id: 'Edukasi Berbasis Riset' },
    pillar2: { en: 'Relatable Gym Persona', id: 'Persona Komunitas Gym' },
    keyMetric: { en: '143K+ Educational Views', id: '143K+ Tayangan Edukasi' },
    caseStudySlug: 'tiga-pilar-nutrisi'
  },
  {
    id: 'esports',
    icon: Gamepad2,
    industry: { en: 'Esports & Gaming Hardware', id: 'Esports & Perangkat Gaming' },
    brand: 'Army Geniuses',
    challenge: {
      en: 'Retain intense fan devotion and sentiment during high-pressure tournament cycles.',
      id: 'Menjaga keterikatan dan sentimen positif penggemar di tengah jadwal turnamen bertekanan tinggi.'
    },
    playbook: {
      en: 'Real-time tournament match reporting + Behind-the-scenes player micro-moments + Proactive community moderation.',
      id: 'Pembaruan turnamen real-time + Momen pemain di balik layar + Manajemen komunitas aktif.'
    },
    pillar1: { en: 'Real-Time Tournament PR', id: 'PR Turnamen Waktu Nyata' },
    pillar2: { en: 'Roster Sentiment Management', id: 'Manajemen Sentimen Penggemar' },
    keyMetric: { en: 'High Tier-1 Fan Engagement', id: 'Keterlibatan Penggemar Sangat Aktif' },
    caseStudySlug: 'army-geniuses'
  }
];

export default function StrategySimulator() {
  const { language } = useLanguage();
  const { openContact } = useContact();
  const [activeTab, setActiveTab] = useState<string>('tourism');

  const activeStrategy = domainStrategies.find(s => s.id === activeTab) || domainStrategies[0];
  const IconComponent = activeStrategy.icon;

  return (
    <section className="py-20 md:py-28 bg-brand-white dark:bg-brand-black border-t border-brand-black/5 dark:border-brand-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 text-left">
          <span className="text-xs font-semibold text-brand-bold dark:text-brand-light block mb-2">
            {language === 'en' ? 'Domain Expertise' : 'Keahlian Lintas Sektor'}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-black dark:text-brand-white tracking-[-0.01em] mb-4">
            {language === 'en' ? 'Tailored Strategy Playbooks' : 'Strategi Pertumbuhan Teruji'}
          </h2>
          <p className="text-brand-black/70 dark:text-brand-white/70 max-w-2xl text-base md:text-lg">
            {language === 'en' 
              ? 'Different verticals require distinct storytelling models. Explore how each strategy was architected and executed for verifiable scale.'
              : 'Setiap industri memerlukan pendekatan narasi yang berbeda. Pelajari bagaimana strategi dirancang dan dieksekusi hingga menghasilkan dampak nyata.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-brand-black/5 dark:bg-brand-white/5 rounded-2xl w-fit">
          {domainStrategies.map((strat) => {
            const TabIcon = strat.icon;
            const isSelected = strat.id === activeTab;
            return (
              <button
                key={strat.id}
                onClick={() => setActiveTab(strat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isSelected 
                    ? 'bg-brand-white dark:bg-[#181818] text-brand-black dark:text-brand-white shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-brand-black dark:hover:text-brand-white'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isSelected ? 'text-brand-bold dark:text-brand-light' : ''}`} />
                <span>{strat.industry[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Strategy Detail Pane */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStrategy.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-white dark:bg-[#121212] rounded-3xl p-8 md:p-12 border border-brand-black/10 dark:border-brand-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-brand-black/10 dark:border-brand-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-black/5 dark:bg-brand-white/5 flex items-center justify-center text-brand-bold dark:text-brand-light shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-brand-bold dark:text-brand-light block">
                    {activeStrategy.brand}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-brand-black dark:text-brand-white tracking-[-0.01em]">
                    {activeStrategy.industry[language]}
                  </h3>
                </div>
              </div>

              <div className="text-left md:text-right">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
                  {language === 'en' ? 'Verified Impact' : 'Dampak Terverifikasi'}
                </div>
                <div className="text-lg md:text-xl font-display font-bold text-brand-bold dark:text-brand-light tabular-nums">
                  {activeStrategy.keyMetric[language]}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-xs font-bold text-brand-bold dark:text-brand-light mb-2">
                  {language === 'en' ? 'Growth Challenge' : 'Tantangan Pertumbuhan'}
                </h4>
                <p className="text-sm md:text-base text-brand-black/80 dark:text-brand-white/80 leading-relaxed mb-6">
                  {activeStrategy.challenge[language]}
                </p>

                <h4 className="text-xs font-bold text-brand-bold dark:text-brand-light mb-2">
                  {language === 'en' ? 'Core Content Pillars' : 'Pilar Konten Utama'}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-brand-black/80 dark:text-brand-white/80">
                    <span className="text-brand-bold dark:text-brand-light">·</span>
                    <span>{activeStrategy.pillar1[language]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-black/80 dark:text-brand-white/80">
                    <span className="text-brand-bold dark:text-brand-light">·</span>
                    <span>{activeStrategy.pillar2[language]}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-brand-bold dark:text-brand-light mb-2">
                    {language === 'en' ? 'Execution Blueprint' : 'Rencana Eksekusi'}
                  </h4>
                  <p className="text-sm md:text-base text-brand-black/80 dark:text-brand-white/80 leading-relaxed">
                    {activeStrategy.playbook[language]}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-8">
                  <Link
                    to={`/work?case=${activeStrategy.caseStudySlug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-bold text-white dark:bg-brand-light dark:text-brand-black text-xs font-semibold hover:bg-brand-bold/90 dark:hover:bg-brand-light/90 transition-all shadow-sm"
                  >
                    <span>{language === 'en' ? 'View Full Case Study' : 'Lihat Studi Kasus Lengkap'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={openContact}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-black/10 dark:border-brand-white/10 text-brand-black dark:text-brand-white text-xs font-semibold hover:bg-brand-black/5 dark:hover:bg-brand-white/10 transition-all"
                  >
                    {language === 'en' ? 'Request Strategy Session' : 'Ajukan Diskusi Strategi'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
