import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

/**
 * PerytonLogoWall
 * Faithfully recreates Reference Image 2:
 * A 6-column grid of monochrome, high-contrast client/partner logos
 * floating seamlessly in the cosmic background with subtle hover illumination.
 */
export default function PerytonLogoWall() {
  const { language } = useLanguage();

  // Reference partner brands from the project portfolio
  const brandLogos = [
    { id: 2, name: 'Juara Holding' },
    { id: 3, name: 'Musti Musik' },
    { id: 4, name: 'Tiga Pilar Nutrisi' },
    { id: 5, name: 'Army Geniuses' },
    { id: 6, name: 'Wonderful Indonesia' },
    { id: 7, name: 'Neugen Sport' },
    { id: 8, name: 'CI HUB' },
    { id: 9, name: 'Conti Plus' },
    { id: 10, name: 'Licher' },
    { id: 11, name: 'Sparkasse' },
    { id: 12, name: 'GP Joule' },
    { id: 13, name: 'Atemzeit' },
    { id: 14, name: 'WebsEdge' },
    { id: 15, name: 'Volksbank' },
    { id: 16, name: 'BBEZ' },
    { id: 17, name: 'Brück GmbH' },
    { id: 18, name: 'Sommerlad' },
    { id: 19, name: 'Prosalute' },
    { id: 20, name: 'SES' },
    { id: 21, name: 'Beauty & Barber' },
    { id: 22, name: 'Sonnenpark' },
    { id: 23, name: 'EVA Energie' },
    { id: 24, name: 'Guul Prime' },
    { id: 25, name: 'Rewe Group' },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden z-10 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-light">
            {language === 'en' ? 'Client Roster & Partnerships' : 'Referenzen & Partner'}
          </span>
        </motion.div>

        {/* 6-Column High-End Logo Grid (matching Reference Image 2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
          {brandLogos.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
              whileHover={{ scale: 1.08 }}
              className="w-full flex items-center justify-center p-3 h-20 transition-all duration-300 group cursor-default"
            >
              <img
                src={`/brands/LOGO-WALL-PORTOFOLIOArtboard-${brand.id}.png`}
                alt={brand.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to text typography mark if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.brand-fallback')) {
                    const fallback = document.createElement('span');
                    fallback.className =
                      'brand-fallback text-xs md:text-sm font-bold tracking-wider uppercase text-slate-400 group-hover:text-brand-white transition-colors';
                    fallback.textContent = brand.name;
                    parent.appendChild(fallback);
                  }
                }}
                className="max-h-12 max-w-[130px] w-auto object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 filter grayscale brightness-200 group-hover:drop-shadow-[0_0_12px_rgba(103,186,244,0.6)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
