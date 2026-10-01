import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function ImpactProofBar() {
  const { language } = useLanguage();

  const metrics = [
    {
      value: '4,000+',
      label: language === 'en' ? 'Content Pieces Delivered' : 'Konten Dipublikasikan',
      detail: language === 'en' ? 'Reels, TikToks, Carousels' : 'Reels, TikTok, Karusel'
    },
    {
      value: '3,000,000+',
      label: language === 'en' ? 'Avg. Monthly Views' : 'Rata-rata Tayangan/Bulan',
      detail: language === 'en' ? 'Across brand ecosystems' : 'Lintas ekosistem merek'
    },
    {
      value: '850,000+',
      label: language === 'en' ? 'Combined Audience' : 'Jaringan Audiens',
      detail: language === 'en' ? 'Cross-platform community' : 'Total komunitas lintas platform'
    },
    {
      value: '10.8M+',
      label: language === 'en' ? 'Peak Single Reel Views' : 'Puncak Tayangan Satu Reel',
      detail: language === 'en' ? 'Juara Holding Group' : 'Juara Holding Group'
    }
  ];

  return (
    <section className="py-12 border-y border-brand-black/10 dark:border-brand-white/10 bg-brand-white dark:bg-[#0c0c0c]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-left"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-black dark:text-brand-white tracking-[-0.01em] tabular-nums mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-bold dark:text-brand-light mb-0.5">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {metric.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
