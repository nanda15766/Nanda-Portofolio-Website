import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Manifesto() {
  const { language } = useLanguage();

  const PILLARS = [
    {
      number: 'PILLAR 01',
      badge: 'SYSTEMIC',
      titleEn: 'Community Requires Structure',
      titleId: 'Komunitas Membutuhkan Struktur',
      descEn:
        'Followers are transient; communities are architectural. Cultivating authentic engagement demands hypothesis-tested content buckets, algorithmic retention graphs, and disciplined weekly distribution pacing.',
      descId:
        'Pengikut bersifat sementara; komunitas bersifat arsitektural. Membangun keterlibatan otentik menuntut format konten berbasis hipotesis, grafik retensi algoritma, dan konsistensi ritme mingguan yang terukur.',
      pointsEn: [
        '→ Systematic hook testing',
        '→ Viewer retention cadence',
        '→ Predictable content rituals',
      ],
      pointsId: [
        '→ Pengujian hook sistematis',
        '→ Ritme retensi penonton',
        '→ Ritual konten terprediksi',
      ],
    },
    {
      number: 'PILLAR 02',
      badge: 'DISTILLATION',
      titleEn: 'Beyond Chaotic Noise',
      titleId: 'Melampaui Keriuhan Algoritma',
      descEn:
        'Modern feeds are crowded with superficial trends. I cut through algorithmic turbulence by prioritizing high-fidelity visual storytelling, emotional resonance, and distinct brand tone of voice.',
      descId:
        'Feed media sosial dipenuhi tren dangkal. Saya menembus kebisingan algoritma dengan memprioritaskan penceritaan visual resolusi tinggi, resonansi emosional, dan karakter suara merek yang khas.',
      pointsEn: [
        '→ Narrative-first reels',
        '→ Zero-friction copy scripts',
        '→ High production standard',
      ],
      pointsId: [
        '→ Video berbasis narasi',
        '→ Naskah tanpa hambatan',
        '→ Standar produksi prima',
      ],
    },
    {
      number: 'PILLAR 03',
      badge: 'MONETIZATION',
      titleEn: 'Compounding Brand Equity',
      titleId: 'Melipatgandakan Nilai Merek',
      descEn:
        'A viral view that yields zero retention is wasted energy. I build structured conversion funnels that translate ephemeral viral impressions into direct consumer trust, direct inquiries, and sustained brand authority.',
      descId:
        'Tayangan viral tanpa retensi hanyalah kesia-siaan. Saya membangun corong konversi terstruktur yang mengubah impresi viral sesaat menjadi kepercayaan konsumen, pesan langsung, dan otoritas merek berkelanjutan.',
      pointsEn: [
        '→ Viral-to-follower loops',
        '→ Inbound lead automation',
        '→ High lifetime brand value',
      ],
      pointsId: [
        '→ Siklus konversi pengikut',
        '→ Otomatisasi prospek masuk',
        '→ Nilai jangka panjang merek',
      ],
    },
  ];

  return (
    <section
      className="py-28 max-w-7xl mx-auto px-6 relative z-10"
      data-purpose="editorial-manifesto"
      id="manifesto"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 pb-6 border-b border-neutral-800">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            {language === 'en' ? '01 / ARCHITECTURAL PHILOSOPHY' : '01 / FILOSOFI ARSITEKTUR'}
          </span>
          <h2 className="font-serif-italic text-4xl md:text-5xl text-white mt-2">
            {language === 'en' ? 'The Digital Manifesto' : 'Manifesto Digital'}
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 mt-4 md:mt-0 tracking-wider max-w-xs">
          {language === 'en'
            ? 'ENGINEERING VALUE IN AN ERA OF SHORT-ATTENTION TURBULENCE.'
            : 'MERANCANG NILAI DI ERA TURBULENSI ATENSI PENDEK.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PILLARS.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="editorial-border bg-card/60 p-8 rounded-sm space-y-4"
          >
            <div className="flex justify-between items-center text-neutral-400 font-mono text-xs border-b border-neutral-800/70 pb-3">
              <span>{pillar.number}</span>
              <span>{pillar.badge}</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-medium">
              {language === 'en' ? pillar.titleEn : pillar.titleId}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {language === 'en' ? pillar.descEn : pillar.descId}
            </p>
            <ul className="font-mono text-[11px] text-neutral-400 space-y-1.5 pt-2">
              {(language === 'en' ? pillar.pointsEn : pillar.pointsId).map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
