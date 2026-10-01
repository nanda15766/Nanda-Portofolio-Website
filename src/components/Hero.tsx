import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { soundManager } from '../utils/audio';
import { Download, MessageCircle } from 'lucide-react';

export default function Hero() {
  const { language } = useLanguage();
  const { openContact } = useContact();

  const scrollToWork = () => {
    soundManager.playBlip(700, 0.04);
    const target = document.getElementById('work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden noise-bg"
      data-purpose="hero-editorial"
      id="intro"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Core Editorial Name & Statement */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Category Mono Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-neutral-300 uppercase">
              {language === 'en'
                ? 'COMMUNITY ARCHITECT · SOCIAL MEDIA SPECIALIST · SHORT-FORM DIRECTOR'
                : 'ARSITEK KOMUNITAS · SPESIALIS MEDIA SOSIAL · DIREKTUR KONTEN PENDEK'}
            </span>
          </motion.div>

          {/* Grand Serif Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif-italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05]"
          >
            Nanda Dwi Wahyu Prasetyo
          </motion.h1>

          {/* Manifesto Philosophy Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase max-w-2xl mx-auto leading-relaxed"
          >
            {language === 'en'
              ? '"I architect high-retention content and authentic communities. Transforming chaotic social feeds into measurable business growth."'
              : '"Saya merancang konten beretensi tinggi dan komunitas autentik. Mengubah keriuhan media sosial menjadi pertumbuhan bisnis yang nyata dan terukur."'}
          </motion.p>

          {/* Descriptive Narrative Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-neutral-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed pt-2"
          >
            {language === 'en' ? (
              <>
                Delivered over <strong className="text-white font-medium">4,000+ content pieces</strong>, sustained <strong className="text-white font-medium">3,000,000+ average monthly organic views</strong>, and cultivated a combined <strong className="text-white font-medium">850,000+ cross-platform community</strong> spanning luxury travel, fitness supplements, esports, and creator culture.
              </>
            ) : (
              <>
                Memproduksi lebih dari <strong className="text-white font-medium">4.000+ konten</strong>, mempertahankan <strong className="text-white font-medium">3.000.000+ rata-rata tayangan organik bulanan</strong>, dan menumbuhkan jaringan komunitas gabungan <strong className="text-white font-medium">850.000+ pengikut</strong> lintas industri pariwisata mewah, kebugaran, esports, dan budaya kreator.
              </>
            )}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-6 flex flex-wrap justify-center items-center gap-3.5"
          >
            <a
              href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20konsultasi%20strategi%20media%20sosial%20%2F%20proyek%20freelance."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playBlip(820, 0.04)}
              className="px-6 py-3 bg-[#25D366] text-black font-mono text-xs uppercase tracking-widest hover:bg-[#20bd5a] transition-all font-semibold rounded-sm cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
              title="Quick Consultation via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{language === 'en' ? 'Chat on WhatsApp' : 'Konsultasi via WA'}</span>
            </a>
            <button
              onClick={scrollToWork}
              className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all font-semibold rounded-sm cursor-pointer"
            >
              {language === 'en' ? 'Explore Work ↓' : 'Lihat Portofolio ↓'}
            </button>
            <a
              href="/Resume & Portofolio - Nanda Dwi Wahyu Prrasetyo 2026.pdf"
              download="Resume & Portofolio - Nanda Dwi Wahyu Prasetyo 2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playBlip(650, 0.04)}
              className="px-6 py-3 border border-neutral-700 bg-neutral-900/90 text-neutral-200 font-mono text-xs uppercase tracking-widest hover:border-neutral-400 hover:text-white transition-all rounded-sm inline-flex items-center gap-2 cursor-pointer"
              title="Download Portfolio (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-brand-light" />
              <span>{language === 'en' ? 'Download PDF' : 'Unduh PDF'}</span>
            </a>
            <button
              onClick={() => {
                soundManager.playBlip(750, 0.04);
                openContact();
              }}
              className="px-6 py-3 border border-neutral-800 text-neutral-400 font-mono text-xs uppercase tracking-widest hover:border-neutral-600 hover:text-white transition-all rounded-sm cursor-pointer"
            >
              {language === 'en' ? 'Email Inquiry' : 'Kirim Pesan'}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
