import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface PipelineStep {
  number: string;
  titleEn: string;
  titleId: string;
  tagEn: string;
  tagId: string;
  descEn: string;
  descId: string;
  bulletsEn: string[];
  bulletsId: string[];
}

const STEPS: PipelineStep[] = [
  {
    number: '01',
    titleEn: 'Ingest & Audit',
    titleId: 'Audit & Analisis Awal',
    tagEn: 'DATA HARVESTING',
    tagId: 'PENGUMPULAN DATA',
    descEn:
      'Deconstructing past performance, community demographics, competitor blind spots, and target sentiment to map unexploited visual territory.',
    descId:
      'Menganalisis performa masa lalu, demografi audiens, celah kompetitor, dan sentimen pasar untuk memetakan peluang konten yang belum tergarap.',
    bulletsEn: ['• Algorithmic baseline audits', '• Audience friction mapping'],
    bulletsId: ['• Audit metrik algoritma', '• Pemetaan friksi audiens'],
  },
  {
    number: '02',
    titleEn: 'Refine & Script',
    titleId: 'Naskah & Produksi Kreatif',
    tagEn: 'CREATIVE DIRECTIVE',
    tagId: 'PENGARAHAN KREATIF',
    descEn:
      'Drafting psychological 3-second visual hooks, narrative payoff structures, and bespoke shot lists engineered for seamless algorithmic loop completion.',
    descId:
      'Merancang visual hook 3 detik pertama, struktur narasi berdampak, dan panduan visual yang dioptimalkan untuk siklus tayang penuh algoritma.',
    bulletsEn: ['• First 3-second hook design', '• High-retention audio pairing'],
    bulletsId: ['• Desain hook 3 detik pertama', '• Penyelarasan audio retensi tinggi'],
  },
  {
    number: '03',
    titleEn: 'Distribute & Pace',
    titleId: 'Distribusi & Ritme Tayang',
    tagEn: 'OMNICHANNEL ROLLOUT',
    tagId: 'DISTRIBUSI OMNICHANNEL',
    descEn:
      'Multi-platform deployment synchronized across Instagram Reels, TikTok, and YouTube Shorts, timed precisely around user micro-habits.',
    descId:
      'Publikasi multi-platform tersinkronisasi di Instagram Reels, TikTok, dan YouTube Shorts, disesuaikan dengan jam aktif mikro pengguna.',
    bulletsEn: ['• Cross-platform syndication', '• SEO-indexed metadata tags'],
    bulletsId: ['• Sindikasi lintas platform', '• Tag metadata berorientasi SEO'],
  },
  {
    number: '04',
    titleEn: 'Govern & Retain',
    titleId: 'Kelola & Bangun Loyalitas',
    tagEn: 'COMMUNITY CULTIVATION',
    tagId: 'PEMBINAAN KOMUNITAS',
    descEn:
      'Active comment moderation, pinned conversation drivers, direct response engagement, and turning casual watchers into loyal brand champions.',
    descId:
      'Moderasi komentar aktif, pemantik diskusi pin, respons interaktif langsung, dan mengubah penonton pasif menjadi pendukung setia merek.',
    bulletsEn: ['• 24/7 engagement containment', '• Direct conversion to CRM/DTC'],
    bulletsId: ['• Pengelolaan interaksi responsif', '• Konversi langsung ke prospek/DTC'],
  },
];

export default function GrowthEngine() {
  const { language } = useLanguage();

  return (
    <section
      className="py-24 bg-surface/80 border-y border-neutral-900 relative z-10"
      data-purpose="methodology-engine"
      id="framework"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {language === 'en' ? '02 / SYSTEM ARCHITECTURE' : '02 / ARSITEKTUR SISTEM'}
            </span>
            <h2 className="font-serif-italic text-4xl md:text-5xl text-white mt-2">
              {language === 'en' ? 'The Growth Engine Pipeline' : 'Alur Mesin Pertumbuhan'}
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 tracking-wider mt-4 md:mt-0">
            {language === 'en'
              ? 'END-TO-END SOCIAL CONTENT INFRASTRUCTURE'
              : 'INFRASTRUKTUR KONTEN MEDIA SOSIAL TERPADU'}
          </p>
        </div>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card p-6 border border-neutral-800/80 rounded-sm relative group hover:border-neutral-600 transition-all"
            >
              <div className="font-mono text-2xl text-neutral-400 group-hover:text-white transition-colors mb-4">
                {step.number}
              </div>
              <h4 className="font-serif text-xl text-white mb-2">
                {language === 'en' ? step.titleEn : step.titleId}
              </h4>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-3">
                {language === 'en' ? step.tagEn : step.tagId}
              </span>
              <p className="text-neutral-400 text-xs leading-relaxed">
                {language === 'en' ? step.descEn : step.descId}
              </p>
              <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 space-y-1">
                {(language === 'en' ? step.bulletsEn : step.bulletsId).map((bullet, bIdx) => (
                  <div key={bIdx}>{bullet}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
