import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { soundManager } from '../utils/audio';
import { Play, Eye, Heart, Share2, Flame, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export default function ViralContentShowcase() {
  const { language } = useLanguage();
  const { viralContent } = data[language];
  const { openContact } = useContact();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  const activeContent = selectedIdx !== null ? viralContent[selectedIdx] : viralContent[0];

  return (
    <section
      className="py-28 max-w-7xl mx-auto px-6 relative z-10 border-t border-neutral-800"
      id="content-showcase"
      data-purpose="viral-content-showcase"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {language === 'en' ? 'PROVEN CONTENT VAULT' : 'KOLEKSI KONTEN TERBUKTI'}
            </span>
          </div>
          <h2 className="font-serif-italic text-4xl md:text-5xl text-white">
            {language === 'en' ? 'Viral & High-Engagement Content' : 'Contoh Konten Viral & Paling Engage'}
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 max-w-md text-left md:text-right leading-relaxed">
          {language === 'en'
            ? 'Real content artifacts delivered for clients that broke through algorithmic noise and converted attention into followers and inquiries.'
            : 'Contoh nyata konten yang diproduksi untuk klien, berhasil menembus algoritma dan mengonversi atensi menjadi pengikut dan penjualan.'}
        </p>
      </div>

      {/* Grid of Content Pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {viralContent.map((item, idx) => {
          const isSelected = selectedIdx === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              onClick={() => {
                soundManager.playBlip(600 + idx * 40, 0.03);
                setSelectedIdx(idx);
              }}
              className={`editorial-border rounded-sm overflow-hidden bg-neutral-950/70 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-white/80 ring-1 ring-white/20'
                  : 'border-neutral-800/80 hover:border-neutral-600'
              }`}
            >
              {/* Card Image Cover with 9:16 vertical ratio feel */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* View Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{item.views}</span>
                  <span className="text-neutral-400 font-normal text-[10px]">
                    {language === 'en' ? 'Views' : 'Tayangan'}
                  </span>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-xs bg-neutral-900/90 border border-neutral-700 text-neutral-300 font-mono text-[9px] uppercase tracking-wider">
                  {item.platform}
                </div>

                {/* Brand / Title Bottom Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                    {item.brand}
                  </span>
                  <h4 className="font-serif text-lg text-white font-medium line-clamp-1 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Card Body: Hook & Engagement Data */}
              <div className="p-5 space-y-4">
                {/* Metrics ribbon */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 py-2 border-b border-neutral-850">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>{item.shares}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase">
                    {item.ratio}
                  </div>
                </div>

                {/* Hook preview */}
                <div className="text-xs">
                  <span className="font-mono text-[10px] uppercase text-neutral-500 block mb-1">
                    {language === 'en' ? 'Hook Formula:' : 'Formula Hook:'}
                  </span>
                  <p className="text-neutral-300 italic line-clamp-2 leading-relaxed">
                    "{item.hook}"
                  </p>
                </div>

                {/* Why It Worked */}
                <div className="pt-2 text-xs text-neutral-400 leading-relaxed border-t border-neutral-850 line-clamp-2">
                  <strong className="text-neutral-200 mr-1">
                    {language === 'en' ? 'Why It Converted:' : 'Kunci Konversi:'}
                  </strong>
                  {item.whyItWorked}
                </div>
              </div>

              {/* Action row */}
              <div className="p-4 pt-0">
                <div className="w-full py-2 px-3 rounded-xs bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-neutral-300 group-hover:text-white flex items-center justify-between transition-colors">
                  <span>{language === 'en' ? 'Case Study Context' : 'Konteks Studi Kasus'}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Direct Content Consultation Banner */}
      <div className="border border-neutral-800 bg-neutral-950/70 p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#25D366] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Need High-Retention Content?' : 'Butuh Konten dengan Retensi Tinggi?'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white">
            {language === 'en'
              ? 'Ready to recreate these numbers for your own brand?'
              : 'Siap menduplikasi capaian angka ini untuk merek Anda sendiri?'}
          </h3>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            {language === 'en'
              ? 'From scriptwriting to high-hook editing, I produce content tailored specifically to capture algorithmic distribution in your niche.'
              : 'Mulai dari penulisan naskah hingga editing berkecepatan tinggi, saya memproduksi konten yang dirancang khusus memicu distribusi algoritma di industri Anda.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0 w-full md:w-auto">
          <a
            href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20melihat%20koleksi%20konten%20viral%20Anda%20dan%20tertarik%20untuk%20membuat%20konten%20serupa%20untuk%20brand%20saya."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playBlip(820, 0.04)}
            className="px-6 py-3.5 bg-[#25D366] text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#20bd5a] transition-all rounded-sm inline-flex items-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
          >
            <span>{language === 'en' ? 'Discuss Video Concept via WA' : 'Diskusi Konsep via WhatsApp'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
