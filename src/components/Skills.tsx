import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { soundManager } from '../utils/audio';

export default function Skills() {
  const { language } = useLanguage();
  const { competencies, ui: t } = data[language];

  return (
    <section id="skills" className="py-24 md:py-32 relative z-10 border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50 block mb-3">
              {language === 'en' ? '04 / CORE COMPETENCIES' : '04 / KOMPETENSI UTAMA'}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight">
              {language === 'en' ? (
                <>
                  STRATEGIC <span className="font-bold text-white">EXPERTISE.</span>
                </>
              ) : (
                <>
                  KEAHLIAN <span className="font-bold text-white">STRATEGIS.</span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-md">
            {t.skillsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competencies.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => soundManager.playBlip(500 + index * 80, 0.02)}
              className="bg-[#080a0d]/90 border border-white/[0.12] hover:border-white/40 p-8 sm:p-10 flex flex-col justify-between transition-colors duration-300 group min-h-[380px]"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <span className="text-xs font-mono font-bold text-brand-light tracking-widest uppercase">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                    PILLAR
                  </span>
                </div>

                <h3 className="text-xl font-light text-white mb-6 uppercase tracking-wider">
                  {comp.category}
                </h3>

                <ul className="space-y-4">
                  {comp.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="flex items-start gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors font-sans"
                    >
                      <span className="text-brand-light font-mono text-xs mt-0.5">›</span>
                      <span className="leading-relaxed">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/[0.06] text-[10px] font-mono tracking-widest uppercase text-white/30 group-hover:text-brand-light transition-colors">
                PROVEN PRACTICE
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
