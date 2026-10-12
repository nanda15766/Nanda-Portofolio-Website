import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { Quote, Star, Award, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const { testimonials } = data[language];

  return (
    <section
      className="py-28 max-w-7xl mx-auto px-6 relative z-10 border-t border-neutral-800"
      id="testimonials"
      data-purpose="client-testimonials-section"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            {language === 'en' ? '05 / SOCIAL PROOF & ENDORSEMENTS' : '05 / BUKTI SOSIAL & TESTIMONI'}
          </span>
          <h2 className="font-serif-italic text-4xl md:text-5xl text-white mt-2">
            {language === 'en' ? 'Client & Partner Endorsements' : 'Testimoni & Pengakuan Klien'}
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 max-w-md text-left md:text-right leading-relaxed">
          {language === 'en'
            ? 'Firsthand experiences from leaders, directors, and operational teams across tourism, music, fitness, and esports.'
            : 'Pengalaman langsung dari pimpinan, direktur, dan tim operasional di industri pariwisata, musik, nutrisi, dan esports.'}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="editorial-border bg-neutral-950/60 border border-neutral-800/80 p-8 sm:p-10 rounded-sm flex flex-col justify-between hover:border-neutral-700 transition-all group"
          >
            <div className="space-y-6">
              {/* Top Quote Icon & Result Badge */}
              <div className="flex items-center justify-between gap-4">
                <Quote className="w-8 h-8 text-neutral-400 group-hover:text-brand-light transition-colors" />
                <span className="px-3 py-1 rounded-xs bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-[#25D366] font-medium tracking-wide">
                  {item.resultBadge}
                </span>
              </div>

              {/* Quote Text */}
              <p className="font-serif text-lg sm:text-xl text-neutral-200 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-8 mt-8 border-t border-neutral-850 flex items-center justify-between">
              <div>
                <h4 className="font-sans font-semibold text-white text-sm sm:text-base">
                  {item.author}
                </h4>
                <p className="font-mono text-xs text-neutral-400">
                  {item.role} • <span className="text-white/80">{item.company}</span>
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
