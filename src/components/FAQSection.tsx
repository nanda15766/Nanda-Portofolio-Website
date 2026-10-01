import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

/**
 * FAQSection
 * Faithfully recreates Reference Image 8:
 * - Left column: Massive display title "Häufige " + accent serif "Fragen"
 * - Right column: Minimalist hairline bordered accordion boxes with question,
 *   smooth expansion, and responsive chevron toggle.
 * - Text integrated with real social media and community production domain knowledge.
 */
export default function FAQSection() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default like Image 8

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData =
    language === 'en'
      ? [
          {
            q: 'What is storytelling-driven short-form video?',
            a: 'It is a concise, high-retention video engineered around genuine human narrative and structured curiosity hooks. Your product does not need to feel like an invasive commercial; instead, we bridge your brand identity, recognizable faces, emotions, and practical utility into a format audiences want to share before swiping away.',
          },
          {
            q: 'Why does narrative short-form content outperform standard ads?',
            a: 'Modern algorithms prioritize watch time and completion rate over superficial impressions. When content hooks viewers in the first 1.8 seconds with an emotional or relatable problem, retention stays high, triggering algorithmic distribution that delivers exponential organic and paid reach.',
          },
          {
            q: 'Who is this community & short-form video strategy ideal for?',
            a: 'Brands in lifestyle, hospitality, sports, supplements, and digital technology looking to move beyond vanity metrics. If your objective is creating authentic customer trust, consistent inbound engagement, and measurable conversions, this approach is tailored for you.',
          },
          {
            q: 'What is the Nanda Growth Formula?',
            a: 'A 3-pillar methodology combining timely cultural newsjacking, multi-format education and relatable humor, and structured influencer / community advocacy. This exact formula generated 10.8M+ views for Juara Holding and 1.3M+ views for Musti Musik.',
          },
          {
            q: 'How does the monthly retainer model work?',
            a: 'In a dedicated retainer, I manage the entire content engine: monthly concept strategy, scriptwriting, production coordination, editing, performance analytics, and community management so your channels produce compounding growth every week.',
          },
          {
            q: 'Why is a multi-format campaign essential?',
            a: 'Single formats plateau quickly. By orchestrating short-form Reels/TikToks for discovery, carousel posts for authority, and real-time community engagement for retention, we build a resilient ecosystem that converts passive scrollers into loyal brand advocates.',
          },
        ]
      : [
          {
            q: 'Was ist ein Werbefilm mit Geschichte?',
            a: 'Das ist ein kurzweiliges Videoformat mit echtem Handlungsbogen und Hook-Struktur. Dein Produkt muss darin nicht wie eine klassische Anzeige wirken. Vielmehr verbinden wir deine Marke, ein Gesicht, ein Gefühl und einen konkreten Nutzen miteinander, sodass Zuschauer dranbleiben, bevor jemand weiterwischt.',
          },
          {
            q: 'Warum funktioniert ein Werbefilm mit Geschichte?',
            a: 'Soziale Plattformen belohnen überdurchschnittliche Verweildauer und Interaktion. Eine Storyline erzeugt emotionale Relevanz und baut Barrieren ab, was zu exponentiell höheren Abschlussraten und viralen Reichweiten führt.',
          },
          {
            q: 'Für wen eignet sich diese Video- & Community-Strategie?',
            a: 'Für Unternehmen in Lifestyle, Tourismus, Sport und Konsumgütern, die sich im gesättigten Markt durch echte Glaubwürdigkeit und Autorität abheben und aktive Communities aufbauen wollen.',
          },
          {
            q: 'Was ist das Wachstums-Konzept?',
            a: 'Eine dreiteilige Formel aus gezieltem Newsjacking, verlässlicher Edutainment-Serie und strategischem Community-Management. Genau diese Formel erzielte über 10,8 Millionen Aufrufe auf einem einzigen Reel.',
          },
          {
            q: 'Was ist ein Retainer-Modell?',
            a: 'Im monatlichen Retainer übernehme ich die ganzheitliche Betreuung: von Redaktionsplan und Scriptwriting über die Begleitung der Produktion bis zur datenbasierten Optimierung und Community-Moderation.',
          },
          {
            q: 'Warum ist eine Multi-Format-Kampagne sinnvoll?',
            a: 'Weil verschiedene Phasen der Customer Journey unterschiedliche Formate erfordern: Kurzvideos für maximale Neukunden-Reichweite, informative Beiträge für Vertrauen und direkte Interaktion für Bindung.',
          },
        ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading (matching Reference Image 8 "Häufige Fragen") */}
          <div className="lg:col-span-5 sticky top-32">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-brand-white leading-tight">
              {language === 'en' ? (
                <>
                  Frequently Asked{' '}
                  <span className="font-editorial-serif italic text-brand-light font-normal">
                    Questions
                  </span>
                </>
              ) : (
                <>
                  Häufige{' '}
                  <span className="font-editorial-serif italic text-brand-light font-normal">
                    Fragen
                  </span>
                </>
              )}
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-6 leading-relaxed max-w-sm">
              {language === 'en'
                ? 'Answers to crucial strategic inquiries about community-driven video production, retainers, and performance.'
                : 'Antworten auf die wichtigsten strategischen Fragen zu Video-Marketing, Retainer-Modellen und Reichweitenaufbau.'}
            </p>
          </div>

          {/* Right Column: Stacked Hairline Accordion Items (matching Reference Image 8) */}
          <div className="lg:col-span-7 space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`rounded-lg border transition-all duration-300 ${
                    isOpen
                      ? 'border-brand-light/60 bg-brand-light/[0.04] shadow-[0_0_24px_rgba(103,186,244,0.1)]'
                      : 'border-white/10 bg-white/[0.02] hover:border-brand-light/30'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 sm:p-7 flex items-start justify-between gap-4 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-lg sm:text-xl font-display font-medium text-brand-white leading-snug">
                      {item.q}
                    </h3>
                    <div
                      className={`w-7 h-7 rounded border border-white/20 flex items-center justify-center text-brand-light shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-brand-light/20 border-brand-light' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
