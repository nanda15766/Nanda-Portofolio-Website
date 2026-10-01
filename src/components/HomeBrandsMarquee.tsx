import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const homeLogos = [
  { id: 2, name: 'Pinstripe Bar', url: 'https://instagram.com/pinstripebar' },
  { id: 3, name: 'MOTA.', url: 'https://instagram.com/motacycles' },
  { id: 4, name: 'Blossom Steakhouse', url: 'https://instagram.com/blossomsteakhouse' },
  { id: 5, name: 'Indonesia Juara Trip', url: 'https://instagram.com/indonesiajuaratrip' },
  { id: 6, name: 'Komodo Luxury', url: 'https://instagram.com/komodoluxury' },
  { id: 7, name: 'Bali Premium Trip', url: 'https://instagram.com/balipremiumtrip' },
  { id: 8, name: 'Loccal Collection', url: 'https://instagram.com/loccalcollection' },
  { id: 9, name: 'Dtour Komodo', url: 'https://instagram.com/dtourkomodo' },
  { id: 10, name: '69 Resort', url: 'https://instagram.com/69resortlabuanbajo' },
  { id: 11, name: 'Caspla Beach Club', url: 'https://instagram.com/casplabaligroupofficial' },
  { id: 12, name: 'Hansa Media', url: 'https://instagram.com/hansdigis.id' },
  { id: 13, name: 'Dominator Esports', url: 'https://instagram.com/dominatoresports.id' },
  { id: 14, name: 'Musti Musik.', url: 'https://instagram.com/mustimusik.id' },
  { id: 15, name: 'Neugen Sport', url: 'https://instagram.com/neugensports' },
  { id: 16, name: 'William Bonac Signature', url: 'https://instagram.com' },
  { id: 17, name: 'V-Shape', url: 'https://instagram.com' },
  { id: 18, name: 'Army Geniuses', url: 'https://instagram.com/mansion.ag' },
  { id: 19, name: 'Cahaya Distribusi', url: 'https://instagram.com/cahaya_distribusi' },
  { id: 20, name: 'GALAX', url: 'https://instagram.com/galaxyindonesia' },
  { id: 21, name: 'Lian Li', url: 'https://lian-li.com' },
  { id: 22, name: '1stPlayer', url: 'https://1stplayer.com' },
  { id: 23, name: 'Seasonic', url: 'https://facebook.com/SeasonicIndo' },
  { id: 24, name: 'Prime Gaming', url: 'https://instagram.com' },
  { id: 25, name: 'KLEVV', url: 'https://facebook.com/KLEVVNDO' },
  { id: 26, name: 'Cube Gaming', url: 'https://facebook.com/CubeGamingIndo' },
  { id: 27, name: 'Boardgame Cafe Batam', url: 'https://instagram.com' },
  { id: 28, name: 'Supernova Galaxy', url: 'https://instagram.com/supernovabekasi' },
];

export default function HomeBrandsMarquee() {
  const { language } = useLanguage();
  const marqueeItems = [...homeLogos, ...homeLogos];

  return (
    <section className="relative py-24 px-6 z-10 border-t border-white/[0.08] overflow-hidden bg-[#07090c]/70">
      <div className="container mx-auto max-w-7xl mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
              03 / ECOSYSTEM & BRANDS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-white tracking-tight">
            {language === 'en' ? 'Trusted by Market Leaders.' : 'Dipercaya Merek Terkemuka.'}
          </h2>
        </div>
        <Link
          to="/partnerships"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
        >
          <span>{language === 'en' ? 'All 27+ Partners' : 'Semua 27+ Mitra'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-brand-light" />
        </Link>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Left & Right gradient fades */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#07090c] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#07090c] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-4 w-max py-2"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30
          }}
        >
          {marqueeItems.map((brand, i) => (
            <div
              key={i}
              className="bg-[#0b0e13]/80 border border-white/[0.08] hover:border-white/30 rounded-xl p-3.5 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center shrink-0 transition-all duration-300 group/logo select-none"
              title={brand.name}
            >
              <img
                src={`/brands/LOGO-WALL-PORTOFOLIOArtboard-${brand.id}.png`}
                alt={brand.name}
                className="w-full h-full object-contain filter grayscale opacity-70 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-300 group-hover/logo:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
