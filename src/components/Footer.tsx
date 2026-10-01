import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { soundManager } from '../utils/audio';
import { ArrowRight, MessageCircle, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const { openContact } = useContact();
  const currentYear = 2026;

  const scrollToTop = () => {
    soundManager.playBlip(900, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="py-24 bg-pitch relative border-t border-neutral-900 z-10"
      data-purpose="site-footer"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Grand Closing Statement */}
        <div className="max-w-3xl space-y-6 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            {language === 'en' ? '05 / DIRECT COLLABORATION' : '05 / KOLABORASI LANGSUNG'}
          </span>
          <h2 className="font-serif-italic text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05]">
            {language === 'en'
              ? "Let's architect something unforgettable together."
              : 'Mari bangun karya yang tak terlupakan bersama.'}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
            {language === 'en'
              ? 'Available for freelance partnerships, monthly social media leadership, and high-retention video production. Reach out directly via WhatsApp for fast discussion or submit a project brief below.'
              : 'Tersedia untuk kemitraan freelance, pengelolaan media sosial retainer, dan produksi video pendek beretensi tinggi. Hubungi langsung melalui WhatsApp untuk konsultasi cepat atau kirim pesan formulir di bawah.'}
          </p>
        </div>

        {/* Action Blocks: Proper Clear WhatsApp CTA + Form Inquiry */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Primary High-Priority CTA: Clear WhatsApp Block */}
          <div className="border border-[#25D366]/30 bg-[#25D366]/[0.04] hover:bg-[#25D366]/[0.08] transition-all p-7 sm:p-8 rounded-sm flex flex-col justify-between relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-mono text-xs text-[#25D366] uppercase tracking-wider font-semibold">
                    {language === 'en' ? 'Direct WhatsApp' : 'WhatsApp Langsung'}
                  </span>
                </div>
                {/* Live Online Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'en' ? 'Online • Fast Reply' : 'Aktif • Balas Cepat'}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                  +62 815-5672-5874
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {language === 'en'
                    ? 'Best for quick strategy brainstorms, service inquiries, and project kickoffs. Expect a reply within minutes during business hours.'
                    : 'Paling cocok untuk konsultasi santai, tanya paket layanan, atau penawaran proyek. Respon cepat dalam hitungan menit.'}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20tertarik%20untuk%20konsultasi%20strategi%20media%20sosial%20%2F%20layanan%20freelance."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playBlip(820, 0.04)}
                className="w-full py-3.5 px-6 bg-[#25D366] text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#20bd5a] transition-all rounded-sm inline-flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <span>{language === 'en' ? 'Start Chat on WhatsApp' : 'Chat via WhatsApp Sekarang'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Secondary CTA: Full Inquiry Form Modal */}
          <div className="border border-neutral-800 bg-neutral-950/60 p-7 sm:p-8 rounded-sm flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                  {language === 'en' ? 'Email & Project Brief' : 'Email & Detail Proyek'}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                  nanda15766@gmail.com
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {language === 'en'
                    ? 'Prefer a formal briefing with scope notes? Open our structured inquiry modal to pre-fill your requirements.'
                    : 'Lebih suka mengirimkan brief formal atau rincian proposal? Buka formulir pesan untuk menjelaskan kebutuhan Anda.'}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  soundManager.playBlip(750, 0.04);
                  openContact();
                }}
                className="w-full py-3.5 px-6 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-all rounded-sm inline-flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-white/5"
              >
                <span>{language === 'en' ? 'Open Inquiry Form' : 'Buka Formulir Pesan'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Bar */}
        <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-neutral-500 font-mono text-[11px] gap-4">
          <div className="flex items-center gap-3">
            <span>© {currentYear} Nanda Dwi Wahyu Prasetyo</span>
            <span>•</span>
            <span>Indonesia (UTC+7)</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer"
            >
              BACK TO TOP ↑
            </button>
            <a
              className="hover:text-white transition-colors"
              href="/Resume & Portofolio - Nanda Dwi Wahyu Prrasetyo 2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              REQUEST FULL RESUME (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
