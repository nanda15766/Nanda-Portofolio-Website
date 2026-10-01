import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import {
  BarChart,
  Video,
  Scissors,
  Palette,
  LineChart,
  Figma,
  Smartphone,
  PenTool,
  MonitorPlay,
  Share2,
} from 'lucide-react';

const tools = [
  { name: 'Meta Business Suite', icon: Share2 },
  { name: 'TikTok Ads', icon: Smartphone },
  { name: 'Premiere Pro', icon: Video },
  { name: 'CapCut', icon: Scissors },
  { name: 'Canva', icon: Palette },
  { name: 'Google Analytics', icon: LineChart },
  { name: 'Figma', icon: Figma },
  { name: 'Photoshop', icon: PenTool },
  { name: 'YouTube Studio', icon: MonitorPlay },
  { name: 'Sprout Social', icon: BarChart },
];

export default function ToolCarousel() {
  const { language } = useLanguage();
  const kicker = language === 'en' ? '05 / WORKFLOW STACK' : '05 / PERANGKAT KERJA';
  const title = language === 'en' ? 'Production Stack & Tooling' : 'Alat Produksi & Perangkat Lunak';

  const scrollItems = [...tools, ...tools];

  return (
    <section className="py-24 relative z-10 overflow-hidden border-b border-white/[0.08]">
      <div className="container mx-auto px-6 max-w-7xl mb-12 text-center md:text-left">
        <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/50 block mb-2">
          {kicker}
        </span>
        <h3 className="text-2xl sm:text-4xl font-display font-light text-white tracking-tight">
          {title}
        </h3>
      </div>

      <div className="relative w-full flex overflow-hidden select-none">
        {/* Left Obsidian Gradient Mask */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#07090c] to-transparent z-10 pointer-events-none" />

        {/* Right Obsidian Gradient Mask */}
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#07090c] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <motion.div
          className="flex whitespace-nowrap gap-4 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {scrollItems.map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3.5 bg-[#080a0d]/90 border border-white/[0.1] shrink-0 hover:border-white/40 transition-colors duration-200 cursor-default text-white"
            >
              <tool.icon className="w-4 h-4 text-brand-light" />
              <span className="font-mono text-xs tracking-wider uppercase text-white/80">
                {tool.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
