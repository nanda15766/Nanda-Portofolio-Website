import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface StatItem {
  value: string;
  labelEn: string;
  labelId: string;
}

const STATS: StatItem[] = [
  { value: '3,000,000+', labelEn: 'Monthly Organic Views', labelId: 'Tayangan Organik / Bulan' },
  { value: '4,000+', labelEn: 'Content Assets Shipped', labelId: 'Konten Dipublikasikan' },
  { value: '850,000+', labelEn: 'Combined Audience Network', labelId: 'Jaringan Audiens Gabungan' },
  { value: '10.8M+', labelEn: 'Top Single Reel Peak', labelId: 'Puncak Tayangan Reel' },
  { value: '2.9M+', labelEn: 'Viral TikTok Collab', labelId: 'Kolaborasi Viral TikTok' },
  { value: '27+', labelEn: 'Brand Ecosystems Led', labelId: 'Ekosistem Brand Dikelola' },
];

export default function StatRibbon() {
  const { language } = useLanguage();

  return (
    <section className="border-y border-neutral-900 bg-neutral-950/60 py-12 relative z-10" data-purpose="kpi-metrics-grid">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col space-y-1.5 border-l border-neutral-800/80 pl-4"
            >
              <span className="font-serif-italic text-3xl md:text-4xl text-white">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest leading-snug">
                {language === 'en' ? stat.labelEn : stat.labelId}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
