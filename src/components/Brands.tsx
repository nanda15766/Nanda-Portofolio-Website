import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Filter, Building2, Gamepad2, Dumbbell, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type BrandCategory = 'all' | 'hospitality' | 'esports' | 'lifestyle' | 'hardware';

export interface BrandItem {
  num: number; // Sequential index 1 to 27
  id: number;  // Artboard file number (2 to 28)
  name: string;
  category: 'hospitality' | 'esports' | 'lifestyle' | 'hardware';
  categoryLabelEn: string;
  categoryLabelId: string;
  taglineEn: string;
  taglineId: string;
  handle?: string;
  highlight?: string;
}

// Arranged strictly in ascending numerical sequence from 1 to 27 (Artboard-2 to Artboard-28)
// All links have been completely removed per user request (cards are purely showcase)
export const ALL_BRANDS: BrandItem[] = [
  {
    num: 1,
    id: 2,
    name: 'Pinstripe Bar',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Bespoke Speakeasy Cocktail Lounge',
    taglineId: 'Lounge Koktail & Speakeasy Eksklusif',
    handle: '@pinstripebar',
    highlight: 'Cocktail Club',
  },
  {
    num: 2,
    id: 3,
    name: 'MOTA.',
    category: 'lifestyle',
    categoryLabelEn: 'Lifestyle & Fitness',
    categoryLabelId: 'Gaya Hidup & Kebugaran',
    taglineEn: 'Bespoke Custom Motorcycles & Riding Culture',
    taglineId: 'Kustom Sepeda Motor & Budaya Otomotif',
    handle: '@motacycles',
    highlight: 'Moto Culture',
  },
  {
    num: 3,
    id: 4,
    name: 'Blossom Steakhouse',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Prime Cuts & Architectural Dining',
    taglineId: 'Restoran Fine Dining Daging Premium',
    handle: '@blossomsteakhouse',
    highlight: 'Fine Dining',
  },
  {
    num: 4,
    id: 5,
    name: 'Indonesia Juara Trip',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Flagship Archipelago Luxury Tour Operator',
    taglineId: 'Operator Tur Wisata Premium Nusantara',
    handle: '@indonesiajuaratrip',
    highlight: '10.8M+ Reach',
  },
  {
    num: 5,
    id: 6,
    name: 'Komodo Luxury',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Private Phinisi & Superyacht Charters',
    taglineId: 'Charter Kapal Phinisi & Kapal Pesiar Mewah',
    handle: '@komodoluxury',
    highlight: 'Liveaboard',
  },
  {
    num: 6,
    id: 7,
    name: 'Bali Premium Trip',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Curated Island Itineraries & Luxury Concierge',
    taglineId: 'Layanan Wisata Kurasi & Concierge Bali Mewah',
    handle: '@balipremiumtrip',
    highlight: 'Curated Bali',
  },
  {
    num: 7,
    id: 8,
    name: 'Loccal Collection Hotel',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Cliffside Santorini of Labuan Bajo',
    taglineId: 'Resor Mewah Tebing Labuan Bajo',
    handle: '@loccalcollection',
    highlight: 'Iconic Resort',
  },
  {
    num: 8,
    id: 9,
    name: 'Dtour Komodo',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Boutique Flores & Komodo Island Expeditions',
    taglineId: 'Ekspedisi Pulau Komodo & Flores Eksklusif',
    handle: '@dtourkomodo',
  },
  {
    num: 9,
    id: 10,
    name: '69 Resort',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Waterfront Luxury Retreat Labuan Bajo',
    taglineId: 'Resor Tepi Laut Mewah Labuan Bajo',
    handle: '@69resortlabuanbajo',
  },
  {
    num: 10,
    id: 11,
    name: 'Caspla Beach Club',
    category: 'hospitality',
    categoryLabelEn: 'Luxury Hospitality',
    categoryLabelId: 'Hospitaliti Mewah',
    taglineEn: 'Oceanfront Beach Club & Fast Cruise Fleet',
    taglineId: 'Klub Pantai Tepi Laut & Armada Fast Cruise',
    handle: '@casplabaligroupofficial',
    highlight: 'Beach Club',
  },
  {
    num: 11,
    id: 12,
    name: 'Hansa Media',
    category: 'lifestyle',
    categoryLabelEn: 'Lifestyle & Creative',
    categoryLabelId: 'Gaya Hidup & Kreatif',
    taglineEn: 'Digital Media Production & Audio Studio',
    taglineId: 'Produksi Media Digital & Rekayasa Audio',
    handle: '@hansdigis.id',
  },
  {
    num: 12,
    id: 13,
    name: 'Dominator Esports',
    category: 'esports',
    categoryLabelEn: 'Esports & Gaming',
    categoryLabelId: 'Esports & Gaming',
    taglineEn: 'National Competitive Esports Organization',
    taglineId: 'Organisasi Esports Kompetitif Nasional',
    handle: '@dominatoresports.id',
    highlight: 'HOK / Mobile',
  },
  {
    num: 13,
    id: 14,
    name: 'Musti Musik.',
    category: 'lifestyle',
    categoryLabelEn: 'Music & Edutainment',
    categoryLabelId: 'Musik & Edukasi',
    taglineEn: 'Modern Music Theory & Instrumental Creator Network',
    taglineId: 'Edukasi Teori Musik Modern & Komunitas Musisi',
    handle: '@mustimusik.id',
    highlight: '81.7K Community',
  },
  {
    num: 14,
    id: 15,
    name: 'Neugen Sport',
    category: 'lifestyle',
    categoryLabelEn: 'Sports Nutrition',
    categoryLabelId: 'Nutrisi Olahraga',
    taglineEn: 'Athletic Performance & Functional Nutrition',
    taglineId: 'Nutrisi Performa Atletik & Suplemen Kebugaran',
    handle: '@neugensport',
    highlight: 'Performance',
  },
  {
    num: 15,
    id: 16,
    name: 'William Bonac Signature',
    category: 'lifestyle',
    categoryLabelEn: 'Fitness & Supplements',
    categoryLabelId: 'Kebugaran & Suplemen',
    taglineEn: 'Pro Bodybuilding Series & Elite Nutrition Line',
    taglineId: 'Lini Suplemen & Nutrisi Binaraga Profesional',
    handle: 'Signature Series',
    highlight: 'Signature Series',
  },
  {
    num: 16,
    id: 17,
    name: 'V-Shape',
    category: 'lifestyle',
    categoryLabelEn: 'Fitness & Apparel',
    categoryLabelId: 'Kebugaran & Pakaian',
    taglineEn: 'Aesthetic Physique Coaching & Athletic Brand',
    taglineId: 'Program Pembentukan Fisik & Apparel Atletik',
    handle: 'V-Shape Fitness',
  },
  {
    num: 17,
    id: 18,
    name: 'Army Geniuses',
    category: 'esports',
    categoryLabelEn: 'Esports & Gaming',
    categoryLabelId: 'Esports & Gaming',
    taglineEn: 'Professional DOTA 2 SEA Tier-1 Circuit Team',
    taglineId: 'Tim DOTA 2 Profesional Divisi 1 Asia Tenggara',
    handle: '@mansion.ag',
    highlight: 'DOTA 2 Pro',
  },
  {
    num: 18,
    id: 19,
    name: 'Cahaya Distribusi',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'National Premier PC Component Distributor',
    taglineId: 'Distributor Resmi Komponen & Hardware Nasional',
    handle: '@cahaya_distribusi',
    highlight: 'Official Distributor',
  },
  {
    num: 19,
    id: 20,
    name: 'GALAX',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'High-Performance Gaming Graphics Cards & Hardware',
    taglineId: 'Kartu Grafis GPU Gaming & Komponen Performa Tinggi',
    handle: 'GALAX Indonesia',
    highlight: 'Gaming GPU',
  },
  {
    num: 20,
    id: 21,
    name: 'Lian Li',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'Premier Aluminum PC Chassis & Cooling Solutions',
    taglineId: 'Casing PC Aluminium & Solusi Pendingin Kelas Dunia',
    handle: 'lian-li.com',
    highlight: 'Premium Chassis',
  },
  {
    num: 21,
    id: 22,
    name: '1stPlayer',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'Gaming Chassis, Power Supplies & Mechanical Peripherals',
    taglineId: 'Casing PC Gaming, Power Supply & Aksesori Mekanikal',
    handle: '1stplayer.com',
    highlight: 'Global Hardware',
  },
  {
    num: 22,
    id: 23,
    name: 'Seasonic',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'Tier-1 PC Power Supply Units (PSU)',
    taglineId: 'Power Supply Unit (PSU) PC Kelas Dunia',
    handle: 'SeasonicIndo',
    highlight: 'Tier-1 PSU',
  },
  // #23: Prime Gaming moved to tech & hardware per user request
  {
    num: 23,
    id: 24,
    name: 'Prime Gaming',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'Competitive Gaming Gear & Hardware Ecosystem',
    taglineId: 'Ekosistem Perangkat Keras & Gaming PC',
    handle: 'Prime Gaming Hardware',
    highlight: 'Gaming Gear',
  },
  {
    num: 24,
    id: 25,
    name: 'KLEVV',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'High-Speed Gaming Memory RAM & Solid State Drives',
    taglineId: 'RAM Gaming Kecepatan Tinggi & Media Penyimpanan SSD',
    handle: 'KLEVVNDO',
    highlight: 'Fast Memory',
  },
  {
    num: 25,
    id: 26,
    name: 'Cube Gaming',
    category: 'hardware',
    categoryLabelEn: 'Tech Hardware',
    categoryLabelId: 'Perangkat Keras & TI',
    taglineEn: 'PC Hardware Enclosures & Performance Components',
    taglineId: 'Casing & Komponen PC Gaming Indonesia',
    handle: 'CubeGamingIndo',
  },
  {
    num: 26,
    id: 27,
    name: 'Boardgame Cafe Batam',
    category: 'esports',
    categoryLabelEn: 'Esports & Gaming',
    categoryLabelId: 'Esports & Gaming',
    taglineEn: 'Tabletop Strategy & Interactive Community Hub',
    taglineId: 'Pusat Komunitas & Board Game Interaktif Batam',
    handle: 'Batam Hub',
  },
  {
    num: 27,
    id: 28,
    name: 'Supernova Galaxy',
    category: 'esports',
    categoryLabelEn: 'Esports & Gaming',
    categoryLabelId: 'Esports & Gaming',
    taglineEn: 'High-Performance Gaming Arena & Lounge',
    taglineId: 'Arena & Lounge Gaming Berperforma Tinggi',
    handle: '@supernovabekasi',
    highlight: 'Gaming Arena',
  },
];

export default function Brands() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<BrandCategory>('all');
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Sorted strictly by number 1 through 27
  const filteredBrands = useMemo(() => {
    const list = activeCategory === 'all'
      ? ALL_BRANDS
      : ALL_BRANDS.filter((b) => b.category === activeCategory);
    return [...list].sort((a, b) => a.num - b.num);
  }, [activeCategory]);

  const categories = [
    {
      id: 'all' as BrandCategory,
      labelEn: 'ALL PARTNERS',
      labelId: 'SEMUA MITRA',
      count: ALL_BRANDS.length,
      icon: Filter,
    },
    {
      id: 'hospitality' as BrandCategory,
      labelEn: 'LUXURY HOSPITALITY',
      labelId: 'PARIWISATA & RESOR',
      count: ALL_BRANDS.filter((b) => b.category === 'hospitality').length,
      icon: Building2,
    },
    {
      id: 'esports' as BrandCategory,
      labelEn: 'ESPORTS & GAMING',
      labelId: 'ESPORTS & GAMING',
      count: ALL_BRANDS.filter((b) => b.category === 'esports').length,
      icon: Gamepad2,
    },
    {
      id: 'lifestyle' as BrandCategory,
      labelEn: 'LIFESTYLE & FITNESS',
      labelId: 'GAYA HIDUP & KEBUGARAN',
      count: ALL_BRANDS.filter((b) => b.category === 'lifestyle').length,
      icon: Dumbbell,
    },
    {
      id: 'hardware' as BrandCategory,
      labelEn: 'TECH & HARDWARE',
      labelId: 'PERANGKAT KERAS & TI',
      count: ALL_BRANDS.filter((b) => b.category === 'hardware').length,
      icon: Cpu,
    },
  ];

  // Marquee split lists in consecutive order 1 to 27
  const marqueeRowTop = useMemo(() => {
    const half = Math.ceil(ALL_BRANDS.length / 2);
    const top = ALL_BRANDS.slice(0, half);
    return [...top, ...top];
  }, []);

  const marqueeRowBottom = useMemo(() => {
    const half = Math.ceil(ALL_BRANDS.length / 2);
    const bottom = ALL_BRANDS.slice(half);
    return [...bottom, ...bottom];
  }, []);

  const handleTabClick = (cat: BrandCategory) => {
    setActiveCategory(cat);
    setShowAllMobile(false);
  };

  return (
    <section
      className="py-24 bg-[#07090c] border-t border-white/[0.08] relative z-10 overflow-hidden"
      data-purpose="brand-ecosystem-marquee"
      id="clients"
    >
      {/* Background radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-bold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-white/[0.08] gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-light">
                {language === 'en' ? '04 / CLIENT ECOSYSTEM & PARTNERSHIPS' : '04 / EKOSISTEM KLIEN & KEMITRAAN'}
              </span>
              <div className="h-[1px] w-8 bg-brand-light/30 hidden sm:block" />
            </div>
            <h2 className="font-serif-italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
              {language === 'en' ? 'Client & Brand Ecosystem' : 'Ekosistem Klien & Portofolio Merek'}
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-xs text-white/70 tracking-wider">
              {language === 'en'
                ? '27 VERIFIED BRAND PARTNERS (ORDERED 01 — 27)'
                : '27 MITRA MEREK RESMI (BERURUTAN 01 — 27)'}
            </span>
            <span className="font-mono text-[11px] text-brand-light mt-1 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-brand-light" />
              {language === 'en' ? 'Sequential Index 01 — 27' : 'Indeks Berurutan 01 — 27'}
            </span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/[0.06]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono tracking-wider transition-all duration-300 rounded-sm cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
                    : 'bg-[#10141a]/80 text-white/60 hover:text-white hover:bg-[#181f29] border border-white/[0.08]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-white/40'}`} />
                <span>{language === 'en' ? cat.labelEn : cat.labelId}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-black/15 text-black font-bold' : 'bg-white/[0.08] text-white/50'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Brand Logos Grid: Arranged Strictly in Consecutive Numerical Order 01 to 27, Zero Links Attached */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand, index) => {
              const isHiddenOnMobile = !showAllMobile && index >= 8;
              return (
                <motion.div
                  key={brand.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative bg-[#0a0d12]/90 border border-white/[0.08] hover:border-white/30 rounded-sm p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 select-none ${
                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                {/* Top header row: Clean consecutive number 01 to 27 & Sector badge */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="font-bold text-brand-light tracking-widest bg-brand-light/10 px-2 py-0.5 rounded-xs border border-brand-light/20">
                    #{brand.num.toString().padStart(2, '0')}
                  </span>
                  {brand.highlight && (
                    <span className="text-[10px] uppercase px-1.5 py-0.5 bg-white/[0.06] text-white/70 border border-white/10 rounded-xs tracking-wider">
                      {brand.highlight}
                    </span>
                  )}
                </div>

                {/* Central Brand Logo Container */}
                <div className="h-24 sm:h-28 flex items-center justify-center p-2 my-auto relative">
                  <img
                    src={`/brands/LOGO-WALL-PORTOFOLIOArtboard-${brand.id}.png`}
                    alt={brand.name}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.brand-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className =
                          'brand-fallback text-center font-serif text-sm font-bold text-white/80 tracking-wide';
                        fallback.textContent = brand.name;
                        parent.appendChild(fallback);
                      }
                    }}
                    className="max-h-16 sm:max-h-20 max-w-full object-contain filter grayscale brightness-125 opacity-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-108 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Bottom Card Footer: Brand Name & Info (No link attached) */}
                <div className="pt-3 border-t border-white/[0.06] mt-2">
                  <h4 className="font-sans text-xs font-semibold text-white/95 group-hover:text-white truncate transition-colors">
                    {brand.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-white/40">
                    <span className="truncate">
                      {language === 'en' ? brand.categoryLabelEn : brand.categoryLabelId}
                    </span>
                    <span className="text-white/30 text-[10px] shrink-0 ml-1">
                      #{brand.num.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Expand / Collapse Button ("Show More" to full of it) */}
        {filteredBrands.length > 8 && (
          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => {
                soundManager.playBlip(700, 0.04);
                setShowAllMobile((prev) => !prev);
              }}
              className="w-full py-3.5 px-6 border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.18] text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>
                {!showAllMobile
                  ? language === 'en'
                    ? `Show More (+${filteredBrands.length - 8} Brands) ↓`
                    : `Tampilkan Lebih Banyak (+${filteredBrands.length - 8} Merek) ↓`
                  : language === 'en'
                    ? 'Show Less ↑'
                    : 'Tampilkan Lebih Sedikit ↑'}
              </span>
              {!showAllMobile ? (
                <ChevronDown className="w-4 h-4 text-brand-light" />
              ) : (
                <ChevronUp className="w-4 h-4 text-brand-light" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Two-Way Visual Logo Marquee Stream in Order 01 to 27 (No links attached) */}
      <div className="mt-20 pt-8 border-t border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            {language === 'en' ? 'SEQUENTIAL LIVE STREAM 01 — 27' : 'ALIRAN BERURUTAN 01 — 27'}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-light">
            27 OFFICIAL LOGOS • /public/brands
          </span>
        </div>

        {/* Gradient Side Edge Overlays */}
        <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#07090c] via-[#07090c]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#07090c] via-[#07090c]/90 to-transparent z-20 pointer-events-none" />

        {/* Top Stream: Logos 01 to 14 */}
        <div className="overflow-hidden py-2 bg-[#090c10]/60 select-none">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
            {marqueeRowTop.map((item, idx) => (
              <div
                key={`top-${idx}`}
                className="inline-flex items-center gap-3 bg-[#0d1117] border border-white/[0.08] hover:border-white/30 px-3.5 py-2.5 rounded-sm transition-all duration-200 group/pill shrink-0 cursor-default"
              >
                <span className="font-mono text-[10px] text-brand-light font-bold">
                  #{item.num.toString().padStart(2, '0')}
                </span>
                <img
                  src={`/brands/LOGO-WALL-PORTOFOLIOArtboard-${item.id}.png`}
                  alt={item.name}
                  loading="lazy"
                  className="h-7 w-auto max-w-[80px] object-contain filter grayscale opacity-75 group-hover/pill:grayscale-0 group-hover/pill:opacity-100 transition-all duration-300"
                />
                <div className="text-left">
                  <span className="block font-sans text-xs font-semibold text-white/85 group-hover/pill:text-white">
                    {item.name}
                  </span>
                  <span className="block font-mono text-[10px] text-white/40 uppercase tracking-wider">
                    {language === 'en' ? item.categoryLabelEn : item.categoryLabelId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stream: Logos 15 to 27 */}
        <div className="overflow-hidden py-2 bg-[#090c10]/40 select-none mt-2">
          <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-4">
            {marqueeRowBottom.map((item, idx) => (
              <div
                key={`bottom-${idx}`}
                className="inline-flex items-center gap-3 bg-[#0d1117] border border-white/[0.08] hover:border-white/30 px-3.5 py-2.5 rounded-sm transition-all duration-200 group/pill shrink-0 cursor-default"
              >
                <span className="font-mono text-[10px] text-brand-light font-bold">
                  #{item.num.toString().padStart(2, '0')}
                </span>
                <img
                  src={`/brands/LOGO-WALL-PORTOFOLIOArtboard-${item.id}.png`}
                  alt={item.name}
                  loading="lazy"
                  className="h-7 w-auto max-w-[80px] object-contain filter grayscale opacity-75 group-hover/pill:grayscale-0 group-hover/pill:opacity-100 transition-all duration-300"
                />
                <div className="text-left">
                  <span className="block font-sans text-xs font-semibold text-white/85 group-hover/pill:text-white">
                    {item.name}
                  </span>
                  <span className="block font-mono text-[10px] text-white/40 uppercase tracking-wider">
                    {language === 'en' ? item.categoryLabelEn : item.categoryLabelId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
