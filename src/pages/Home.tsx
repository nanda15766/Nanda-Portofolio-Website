import Hero from '../components/Hero';
import StatRibbon from '../components/StatRibbon';
import Manifesto from '../components/Manifesto';
import GrowthEngine from '../components/GrowthEngine';
import CaseStudies from '../components/CaseStudies';
import ViralContentShowcase from '../components/ViralContentShowcase';
import ServicesAndOffers from '../components/ServicesAndOffers';
import TestimonialsSection from '../components/TestimonialsSection';
import Brands from '../components/Brands';

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-screen bg-pitch text-neutral-300">
      {/* 01: Hero with Reconciled Numbers, Personal Framing & Direct WhatsApp CTA */}
      <Hero />

      {/* KPI Metrics Ribbon (850K+ Community, 10.8M+ Reel Peak) */}
      <StatRibbon />

      {/* 02: Manifesto & Architectural Philosophy */}
      <Manifesto />

      {/* 03: Growth Engine Pipeline Framework */}
      <GrowthEngine />

      {/* 04: Flagship Case Studies with Detailed vs Overview Toggle */}
      <CaseStudies />

      {/* 05: Proven Viral & High-Engagement Content Showcase */}
      <ViralContentShowcase />

      {/* 06: Services & Offers (Value-Driven Freelance Packages & Capabilities) */}
      <ServicesAndOffers />

      {/* 07: Client & Partner Testimonials / Social Proof */}
      <TestimonialsSection />

      {/* 08: Client Ecosystem & Marquee */}
      <Brands />
    </main>
  );
}
