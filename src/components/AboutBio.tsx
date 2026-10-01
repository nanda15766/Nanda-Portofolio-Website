import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { useContact } from '../context/ContactContext';
import { ArrowUpRight, Mail, Linkedin, Phone } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function AboutBio() {
  const { language } = useLanguage();
  const { bio } = data[language];
  const { openContact } = useContact();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative z-10 border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          {/* Index Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
              03 / STRATEGIST PROFILE
            </span>
            <div className="w-20 h-[1px] bg-white/20 hidden sm:block" />
          </div>

          {/* Stark Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] mb-8">
            <span className="font-extralight text-white/70 uppercase block">
              COMMUNITY
            </span>
            <span className="font-black text-white uppercase block">
              ARCHITECT.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/80 font-light leading-relaxed mb-12 max-w-4xl">
            {bio.about}
          </p>

          {/* Quantitative Rigor Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-white/[0.08] mb-12">
            {bio.stats.map((stat, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="text-4xl sm:text-5xl font-mono font-bold text-white tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-mono tracking-widest uppercase text-white/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Communication Channels & Action Buttons */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono tracking-wider">
            <a
              href={`mailto:${bio.email}`}
              onClick={() => soundManager.playBlip(600, 0.03)}
              className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2.5"
            >
              <Mail className="w-3.5 h-3.5 text-brand-light" />
              <span>{bio.email}</span>
            </a>

            <a
              href={`https://${bio.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playBlip(600, 0.03)}
              className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-brand-light" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20konsultasi%20strategi%20media%20sosial%20%2F%20layanan%20freelance."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playBlip(600, 0.03)}
              className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/10 px-4 py-2.5 cursor-pointer"
              title="Chat on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{bio.phone} (WhatsApp)</span>
            </a>

            <button
              onClick={() => {
                soundManager.playBlip(800, 0.05);
                openContact();
              }}
              className="sm:ml-auto px-6 py-3 bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>{language === 'en' ? 'Start Project' : 'Mulai Proyek'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
