import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useContact } from '../context/ContactContext';

interface CapabilityItem {
  id: string;
  number: string;
  tags: string[];
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'content',
    number: '01',
    tags: ['INSTAGRAM REELS', 'TIKTOK', 'YOUTUBE SHORTS', 'VIRAL HOOK PSYCHOLOGY'],
    titleEn: 'Content Architecture',
    titleId: 'Arsitektur Konten',
    descEn: 'Reliable high-retention short-form video production, newsjacking frameworks, and creative copywriting that capture multi-million view milestones.',
    descId: 'Produksi video pendek dengan retensi tinggi, formula newsjacking viral, dan copywriting kreatif yang menghasilkan jutaan tayangan organik.',
  },
  {
    id: 'community',
    number: '02',
    tags: ['COMMUNITY MODERATION', 'ESPORTS FANBASE', 'BRAND ADVOCACY', 'PR VOICE'],
    titleEn: 'Community Engineering',
    titleId: 'Rekayasa Komunitas',
    descEn: 'Active community cultivation across esports, luxury tourism, and lifestyle brands with real-time tournament engagement and authentic connection.',
    descId: 'Membangun dan membina komunitas aktif di industri esports, pariwisata mewah, dan gaya hidup dengan respons real-time dan interaksi otentik.',
  },
  {
    id: 'kol',
    number: '03',
    tags: ['KOL OUTREACH', 'STRATEGIC COLLABORATIONS', 'CREATOR CAMPAIGNS'],
    titleEn: 'KOL & Partnerships',
    titleId: 'KOL & Kolaborasi',
    descEn: 'Systematic creator partnerships and high-impact institutional collaborations like @Wonderful Indonesia driving compounded organic reach.',
    descId: 'Manajemen kemitraan kreator sistematis dan kolaborasi strategis tingkat institusi seperti @Wonderful Indonesia untuk melipatgandakan jangkauan.',
  },
  {
    id: 'analytics',
    number: '04',
    tags: ['META & TIKTOK ADS', 'PERFORMANCE REPORTING', 'GROWTH METRICS'],
    titleEn: 'Paid Growth & Analytics',
    titleId: 'Pertumbuhan & Analitik',
    descEn: 'Data-driven audience segmentation, performance reporting dashboards, and paid social synergy amplifying organic momentum.',
    descId: 'Segmentasi audiens berbasis data, dashboard pelaporan kinerja, dan sinergi iklan berbayar untuk mempercepat momentum organik.',
  },
  {
    id: 'operations',
    number: '05',
    tags: ['FULL-SERVICE RETAINER', 'EDITORIAL CALENDARS', 'SLA GOVERNANCE'],
    titleEn: 'Managed Operations',
    titleId: 'Manajemen Operasional',
    descEn: 'Reliability as a service. End-to-end social media leadership so your business and leadership team can focus on core operations while audiences compound.',
    descId: 'Layanan terpadu penuh. Pengelolaan media sosial menyeluruh agar tim bisnis dan brand Anda dapat fokus pada operasional utama sementara audiens bertumbuh.',
  },
];

export default function SystemCapabilities() {
  const { language } = useLanguage();
  const { openContact } = useContact();
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectTab = (idx: number) => {
    soundManager.playBlip(600 + idx * 60, 0.04);
    setActiveTab(idx);
  };

  return (
    <section id="capabilities" className="relative py-28 md:py-36 px-6 z-10 border-t border-white/[0.08] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header matching Screenshot 4: 02 / SYSTEM CAPABILITIES ---------- */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/[0.08]">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
            02 / SYSTEM CAPABILITIES
          </span>
          <div className="w-24 h-[1px] bg-white/20 hidden sm:block" />
        </div>

        {/* Giant Title: ENGINEERED FOR SCALE. (Screenshots 4 & 5) */}
        <div className="mb-16 md:mb-20 text-left select-none">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95]">
            <span className="font-extralight text-white/70 uppercase block">
              {language === 'en' ? 'ENGINEERED FOR' : 'DIRANCANG UNTUK'}
            </span>
            <span className="font-black text-white uppercase block">
              {language === 'en' ? 'SCALE.' : 'DAMPAK.'}
            </span>
          </h2>
        </div>

        {/* Cards Grid: Showing 2 active cards Side-by-Side (matching Screenshot 4 & 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {[0, 1].map((offset) => {
            const index = (activeTab + offset) % CAPABILITIES.length;
            const item = CAPABILITIES[index];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#080a0d]/90 border border-white/[0.12] hover:border-white/30 p-8 sm:p-10 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px] group transition-colors duration-300"
              >
                {/* Giant ghost watermark numeral in background right (Screenshot 4 & 5) */}
                <div 
                  className="absolute right-6 bottom-4 text-7xl sm:text-8xl md:text-9xl font-display font-light text-white/[0.03] group-hover:text-white/[0.06] select-none pointer-events-none transition-colors duration-500 tabular-nums"
                  aria-hidden="true"
                >
                  {item.number}
                </div>

                {/* Card Top Row: Number on left, Tags on right */}
                <div className="flex items-start justify-between gap-4 mb-10 z-10">
                  <span className="text-xs font-mono font-bold text-white/50 group-hover:text-brand-light transition-colors">
                    {item.number}
                  </span>

                  <div className="flex flex-wrap items-center justify-end gap-x-2.5 gap-y-1 text-[10px] font-mono tracking-widest text-white/40 uppercase max-w-[70%] text-right">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx}>
                        {tag}{tIdx < item.tags.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Center: Outlined / Refined Title & Description */}
                <div className="z-10 my-auto">
                  <h3 
                    className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white mb-4 tracking-tight group-hover:text-brand-light transition-colors duration-300"
                    style={{
                      WebkitTextStroke: '0.5px rgba(255,255,255,0.4)',
                    }}
                  >
                    {language === 'en' ? item.titleEn : item.titleId}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans max-w-lg">
                    {language === 'en' ? item.descEn : item.descId}
                  </p>
                </div>

                {/* Card Bottom: EXPLORE ↗ Button (matching Screenshot 4 & 5) */}
                <div className="pt-8 border-t border-white/[0.08] mt-8 flex items-center justify-between z-10">
                  <button
                    onClick={() => {
                      soundManager.playBlip(750, 0.04);
                      openContact();
                    }}
                    className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors"
                  >
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    STAGE {item.number} / 05
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Navigation Strip (Direct match to Screenshot 5 bottom bar) */}
        <div className="border-t border-b border-white/[0.1] py-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[750px] gap-6 text-[10px] font-mono tracking-[0.2em] uppercase">
            {CAPABILITIES.map((cap, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleSelectTab(idx)}
                  className={`flex items-center gap-2.5 transition-colors whitespace-nowrap py-1 ${
                    isActive 
                      ? 'text-brand-light font-bold' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className={isActive ? 'text-brand-light' : 'text-white/30'}>
                    {cap.number}
                  </span>
                  <span>{cap.titleEn}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-brand-light rounded-none ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
