import AboutBio from '../components/AboutBio';
import Skills from '../components/Skills';
import ToolCarousel from '../components/ToolCarousel';
import HomeCTA from '../components/HomeCTA';
import LiquidBackdrop from '../components/LiquidBackdrop';

export default function About() {
  return (
    <main className="relative min-h-screen bg-[#07090c] text-white selection:bg-brand-bold selection:text-white">
      {/* Background Liquid Surface */}
      <LiquidBackdrop />

      {/* Narrative & Strategic Profile */}
      <AboutBio />

      {/* Core Competencies */}
      <Skills />

      {/* Tooling & Workflow Stack */}
      <ToolCarousel />

      {/* Action CTA */}
      <HomeCTA />
    </main>
  );
}
