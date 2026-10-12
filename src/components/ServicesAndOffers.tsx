import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { data } from '../data';
import { soundManager } from '../utils/audio';
import { useContact } from '../context/ContactContext';
import {
  Check,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
  Video,
  Users2,
  BarChart3,
  Compass,
  ShieldCheck,
  Zap,
  Layers,
  HelpCircle,
  ChevronRight,
  Briefcase
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  number: string;
  icon: typeof Video;
  titleEn: string;
  titleId: string;
  taglineEn: string;
  taglineId: string;
  descEn: string;
  descId: string;
  deliverablesEn: string[];
  deliverablesId: string[];
  outcomeEn: string;
  outcomeId: string;
}

const CORE_SERVICES: ServiceDetail[] = [
  {
    id: 'strategy',
    number: '01',
    icon: Compass,
    titleEn: 'Social Media Strategy & Editorial Systems',
    titleId: 'Strategi Media Sosial & Kalender Editorial',
    taglineEn: 'Architecting brand identity, content pillars, and algorithmic positioning.',
    taglineId: 'Merancang identitas merek, pilar konten, dan posisi algoritma.',
    descEn:
      'I formulate data-informed social blueprints tailored to your business goals. We eliminate guesswork by building structured content pillars, audience persona research, competitor tear-downs, and a repeatable monthly calendar system.',
    descId:
      'Saya merumuskan cetak biru media sosial berbasis data yang selaras dengan target bisnis Anda. Menghilangkan spekulasi dengan membangun pilar konten terstruktur, riset persona audiens, bedah kompetitor, dan sistem kalender editorial bulanan yang konsisten.',
    deliverablesEn: [
      'Comprehensive competitor & market niche positioning audit',
      'Core content pillars & psychological hook repository',
      'Monthly editorial calendar with upload cadence & timing SLA',
      'Bio, link funnel & visual branding optimization guidelines'
    ],
    deliverablesId: [
      'Audit menyeluruh posisi pasar dan celah kompetitor',
      'Pilar konten utama & bank hook berbasis psikologi audiens',
      'Kalender editorial bulanan dengan ritme posting dan jadwal SLA',
      'Panduan optimasi bio, funnel tautan profil & konsistensi visual'
    ],
    outcomeEn: 'Predictable content publishing rituals and clear brand authority.',
    outcomeId: 'Ritual publikasi konten yang terprediksi dan otoritas merek yang kuat.'
  },
  {
    id: 'video',
    number: '02',
    icon: Video,
    titleEn: 'High-Retention Short-Form Video Production',
    titleId: 'Produksi Video Pendek Beretensi Tinggi',
    taglineEn: 'Cinematic Reels, TikToks & Shorts designed for viral distribution.',
    taglineId: 'Reels, TikTok & Shorts sinematik yang dirancang menembus distribusi algoritma.',
    descEn:
      'Short-form video is the #1 organic distribution channel today. I handle end-to-end production: high-curiosity scripting, 1.5-second hooks, dynamic pacing, b-roll styling, sound design, and platform-specific exports proven to cross multi-million views.',
    descId:
      'Video pendek adalah saluran distribusi organik nomor satu saat ini. Saya menangani produksi menyeluruh: penulisan naskah rasa penasaran tinggi, hook 1,5 detik pertama, ritme cepat, b-roll dinamis, sound design, dan format siap posting yang terbukti menembus jutaan tayangan.',
    deliverablesEn: [
      'Creative scriptwriting with high-retention narrative arcs',
      'Dynamic short-form video editing (pacing, zoom cuts, text animation)',
      'Trending audio research and licensed background track curation',
      'Custom thumbnail design & high-converting caption copywriting'
    ],
    deliverablesId: [
      'Penulisan naskah kreatif dengan alur narasi beretensi tinggi',
      'Editing video pendek dinamis (ritme cepat, zoom cuts, tipografi)',
      'Riset audio tren & kurasi musik latar berlisensi resmi',
      'Desain thumbnail kustom & copywriting caption berdaya pikat tinggi'
    ],
    outcomeEn: '80%+ average watch retention and viral reach without paid ad spend.',
    outcomeId: 'Retensi tonton di atas 80% dan jangkauan viral murni organik tanpa iklan.'
  },
  {
    id: 'community',
    number: '03',
    icon: Users2,
    titleEn: 'Active Community Architecture & Moderation',
    titleId: 'Rekayasa Komunitas & Manajemen Interaksi',
    taglineEn: 'Turning passive viewers into loyal advocates and paying customers.',
    taglineId: 'Mengubah penonton pasif menjadi pembela setia merek dan pembeli aktif.',
    descEn:
      'Views without community create zero retention. I build and nurture active brand communities across Instagram Broadcast Channels, TikTok comment feeds, Discord, and WhatsApp groups—responding promptly, driving discussions, and protecting brand reputation.',
    descId:
      'Tayangan tanpa komunitas tidak menghasilkan retensi jangka panjang. Saya membangun dan mengelola komunitas aktif di Broadcast Channel IG, komentar TikTok, Discord, dan grup WhatsApp—merespons cepat, memicu diskusi, dan menjaga reputasi merek.',
    deliverablesEn: [
      'Daily comment moderation & triage within SLA response times',
      'Inbound DM engagement & lead funneling to website/WhatsApp',
      'Interactive community rituals (polls, Q&As, user challenges)',
      'Reputation monitoring & brand tone-of-voice alignment'
    ],
    deliverablesId: [
      'Moderasi komentar harian dengan waktu respon terukur (SLA)',
      'Interaksi pesan langsung (DM) & funneling prospek ke situs/WA',
      'Ritual komunitas interaktif (polling, tanya jawab, tantangan)',
      'Pemantauan sentimen publik & penjagaan karakter suara merek'
    ],
    outcomeEn: 'Higher customer lifetime value and an engaged brand advocate base.',
    outcomeId: 'Nilai jangka panjang pelanggan lebih tinggi dan komunitas yang loyal.'
  },
  {
    id: 'analytics',
    number: '04',
    icon: BarChart3,
    titleEn: 'Performance Analytics & Growth Optimization',
    titleId: 'Analitik Kinerja & Optimasi Pertumbuhan',
    taglineEn: 'Forensic audits, metric reporting, and iterative content improvements.',
    taglineId: 'Audit akun menyeluruh, laporan kinerja, dan perbaikan konten berkala.',
    descEn:
      'We do not operate on assumptions. Every month, I deliver deep analytical breakdowns tracking retention drop-off rates, profile visits, bookmark-to-like ratios, and lead conversions, continuously refining the content machine for higher ROI.',
    descId:
      'Saya tidak bekerja atas dasar asumsi. Setiap bulan, saya menyajikan laporan analitik mendalam mengenai titik penurunan retensi, kunjungan profil, rasio simpan terhadap suka, dan konversi pesan, untuk terus menyempurnakan performa konten Anda.',
    deliverablesEn: [
      'Monthly metric audit dashboard (views, saves, shares, follower lift)',
      'Content retention drop-off analysis to diagnose viewer exits',
      'Actionable recommendations and strategic adjustments for next month',
      'Monthly 45-min strategic review call with brand stakeholders'
    ],
    deliverablesId: [
      'Dashboard laporan bulanan (tayangan, simpanan, pembagian, pertumbuhan)',
      'Analisis titik turun retensi video untuk mendiagnosis penonton',
      'Rekomendasi aksi nyata dan penyesuaian strategi untuk bulan berikutnya',
      'Sesi panggilan evaluasi strategi 45 menit bersama tim pimpinan Anda'
    ],
    outcomeEn: 'Continuous month-over-month compounding organic growth.',
    outcomeId: 'Pertumbuhan organik bulanan yang terukur dan terus berlipat ganda.'
  }
];

export default function ServicesAndOffers() {
  const { language } = useLanguage();
  const { offers } = data[language];
  const { openContact } = useContact();
  const [activeTab, setActiveTab] = useState<'packages' | 'services' | 'comparison'>('packages');

  return (
    <section
      className="py-28 max-w-7xl mx-auto px-6 relative z-10 border-t border-neutral-800"
      id="offers"
      data-purpose="services-and-client-offers"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#25D366]">
              {language === 'en' ? '04 / SERVICES & CLIENT OFFERS' : '04 / LAYANAN & PAKET PENAWARAN'}
            </span>
          </div>
          <h2 className="font-serif-italic text-4xl md:text-5xl text-white">
            {language === 'en' ? 'Services & Value-Driven Packages' : 'Layanan & Paket Penawaran Klien'}
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 max-w-md text-left md:text-right leading-relaxed">
          {language === 'en'
            ? 'Transparent deliverables, senior execution, and direct WhatsApp communication tailored for businesses seeking compounding organic scale.'
            : 'Deliverables terukur, eksekusi tingkat senior, dan komunikasi WhatsApp langsung untuk bisnis yang ingin bertumbuh secara organik.'}
        </p>
      </div>

      {/* Navigation Perspective Switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-12 bg-neutral-900/90 border border-neutral-800 p-1.5 rounded-sm max-w-fit">
        <button
          onClick={() => {
            soundManager.playBlip(620, 0.03);
            setActiveTab('packages');
          }}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'packages'
              ? 'bg-white text-black font-semibold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Turnkey Packages (4)' : 'Paket Siap Pakai (4)'}</span>
        </button>

        <button
          onClick={() => {
            soundManager.playBlip(680, 0.03);
            setActiveTab('services');
          }}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'services'
              ? 'bg-white text-black font-semibold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Core Services Breakdown' : 'Rincian Layanan Utama'}</span>
        </button>

        <button
          onClick={() => {
            soundManager.playBlip(740, 0.03);
            setActiveTab('comparison');
          }}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'bg-white text-black font-semibold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Why Hire a Specialist' : 'Kelebihan Spesialis vs Agensi'}</span>
        </button>
      </div>

      {/* TAB 1: VALUE-DRIVEN PACKAGES */}
      {activeTab === 'packages' && (
        <div className="space-y-12">
          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer, idx) => {
              const waUrl = `https://wa.me/6281556725874?text=${encodeURIComponent(offer.waMessage)}`;

              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`editorial-border rounded-sm p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                    offer.popular
                      ? 'bg-neutral-900/70 border border-[#25D366]/40 shadow-xl shadow-[#25D366]/5'
                      : 'bg-neutral-950/70 border border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  {/* Popular Flag */}
                  {offer.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#25D366] text-black font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-xs flex items-center gap-1 shadow-md shadow-[#25D366]/20">
                      <Sparkles className="w-3 h-3 fill-current" />
                      <span>{offer.tag}</span>
                    </div>
                  )}

                  <div>
                    {!offer.popular && (
                      <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 block mb-2">
                        {offer.tag}
                      </span>
                    )}

                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 leading-tight">
                      {offer.title}
                    </h3>

                    <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                      {offer.subtitle}
                    </p>

                    {/* Value Proposition Box */}
                    <div className="p-4 rounded-xs bg-[#25D366]/[0.06] border border-[#25D366]/20 mb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-[#25D366]" />
                        <span className="font-mono text-[10px] uppercase font-bold text-[#25D366] tracking-wider">
                          {language === 'en' ? 'Core Business Value & Outcome' : 'Nilai Tambah & Dampak Bisnis'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {offer.id === 'retainer' &&
                          (language === 'en'
                            ? 'Replaces a costly 4-person in-house team (strategist, copywriter, editor, moderator). Saves 40+ hours/month while generating compounding organic views and audience equity.'
                            : 'Menggantikan biaya besar tim internal 4 orang (strategist, copywriter, editor, moderator). Menghemat 40+ jam/bulan sekaligus melipatgandakan tayangan organik dan aset komunitas.')}
                        {offer.id === 'video-sprint' &&
                          (language === 'en'
                            ? 'High-impact algorithmic injection designed to break content plateaus, ignite product launches, or generate sudden spikes of 100K to 1M+ reach.'
                            : 'Injeksi algoritma berdampak tinggi untuk menembus kebuntuan view, memanaskan peluncuran produk baru, atau memicu lonjakan 100K hingga 1M+ tayangan.')}
                        {offer.id === 'community' &&
                          (language === 'en'
                            ? 'Transforms casual one-time scrollers into vocal, loyal brand champions. Drastically elevates organic customer lifetime value and comment engagement.'
                            : 'Mengubah penonton satu kali menjadi pendukung setia merek. Meningkatkan nilai jangka panjang pelanggan dan interaksi komentar secara drastis.')}
                        {offer.id === 'audit' &&
                          (language === 'en'
                            ? 'Immediate clarity. Pinpoints exact algorithmic retention leaks and bio friction, giving your in-house team a foolproof 30-day viral roadmap.'
                            : 'Kejelasan seketika. Mengidentifikasi kebocoran retensi algoritma dan hambatan konversi di bio, memberi tim in-house Anda panduan viral 30 hari siap pakai.')}
                      </p>
                    </div>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-neutral-800/80 text-xs font-mono text-neutral-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{offer.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span className="truncate">{offer.bestFor.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-3 mb-8">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 block font-medium">
                        {language === 'en' ? 'Included Deliverables:' : 'Output & Deliverables Nyata:'}
                      </span>
                      <ul className="space-y-2.5">
                        {offer.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-snug">
                            <div className="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal Fit description */}
                    <div className="p-3.5 rounded-xs bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed mb-8">
                      <strong className="text-white font-mono uppercase tracking-wider mr-1">
                        {language === 'en' ? 'Ideal For:' : 'Paling Cocok Untuk:'}
                      </strong>
                      {offer.bestFor}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playBlip(750, 0.04)}
                      className={`w-full py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-semibold transition-all rounded-sm inline-flex items-center justify-center gap-2.5 shadow-md cursor-pointer ${
                        offer.popular
                          ? 'bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-[#25D366]/20'
                          : 'bg-white hover:bg-neutral-200 text-black shadow-white/5'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{offer.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                    </a>

                    <button
                      onClick={() => {
                        soundManager.playBlip(600, 0.03);
                        openContact();
                      }}
                      className="w-full sm:w-auto py-3 px-4 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-sm font-mono text-[11px] uppercase tracking-wider transition-colors shrink-0"
                    >
                      {language === 'en' ? 'Brief Form' : 'Kirim Brief'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Custom Scope Card */}
          <div className="editorial-border bg-neutral-950/70 border border-neutral-800 p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#25D366]">
                {language === 'en' ? 'BESPOKE ENGAGEMENTS' : 'KOLABORASI KUSTOM'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                {language === 'en' ? 'Need a Custom Scope or Hybrid Package?' : 'Butuh Penyesuaian Ruang Lingkup Proyek?'}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {language === 'en'
                  ? 'Have specific deliverables, multi-brand needs, or an offline event requiring live short-form coverage? Let us construct a bespoke plan matching your exact operational milestones.'
                  : 'Punya kebutuhan khusus, multi-brand, atau acara offline yang butuh peliputan video pendek langsung? Mari diskusikan rencana kustom yang pas dengan target operasional Anda.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/6281556725874?text=Halo%20Nanda%2C%20saya%20ingin%20berdiskusi%20mengenai%20kebutuhan%20proyek%20custom%20%2F%20ruang%20lingkup%20khusus%20untuk%20brand%20saya."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playBlip(820, 0.04)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#20bd5a] transition-all rounded-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{language === 'en' ? 'Discuss Custom Scope on WA' : 'Diskusi Proyek Kustom via WA'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CORE FREELANCE SERVICES BREAKDOWN */}
      {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SERVICES.map((srv, idx) => {
              const Icon = srv.icon;

              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="editorial-border bg-neutral-950/70 border border-neutral-800/80 p-8 rounded-sm hover:border-neutral-600 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#25D366]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-neutral-400">{srv.number}</span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl text-white mb-1.5">
                        {language === 'en' ? srv.titleEn : srv.titleId}
                      </h3>
                      <p className="font-mono text-xs text-[#25D366]">
                        {language === 'en' ? srv.taglineEn : srv.taglineId}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                      {language === 'en' ? srv.descEn : srv.descId}
                    </p>

                    {/* What's Included */}
                    <div className="space-y-2.5 pt-4 border-t border-neutral-850">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block font-medium">
                        {language === 'en' ? 'Core Capabilities & Deliverables:' : 'Cakupan Layanan Utama:'}
                      </span>
                      <ul className="space-y-2">
                        {(language === 'en' ? srv.deliverablesEn : srv.deliverablesId).map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-neutral-300 leading-snug">
                            <span className="text-[#25D366] font-bold">→</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Outcome Highlight */}
                  <div className="pt-6 mt-6 border-t border-neutral-850 flex items-center justify-between text-xs">
                    <div className="text-neutral-400 font-light">
                      <span className="font-mono uppercase text-[10px] text-neutral-400 block">
                        {language === 'en' ? 'Target Business Outcome' : 'Hasil Bisnis yang Ditargetkan'}
                      </span>
                      <span className="text-white font-medium">
                        {language === 'en' ? srv.outcomeEn : srv.outcomeId}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/6281556725874?text=${encodeURIComponent(
                        `Halo Nanda, saya tertarik berdiskusi mengenai layanan ${
                          language === 'en' ? srv.titleEn : srv.titleId
                        }.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playBlip(700, 0.03)}
                      className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono text-[10px] uppercase tracking-wider rounded-xs inline-flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>{language === 'en' ? 'Inquire' : 'Konsultasi'}</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: WHY WORK WITH A SPECIALIST (COMPARISON) */}
      {activeTab === 'comparison' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="editorial-border bg-neutral-950/70 border border-neutral-800 rounded-sm overflow-hidden p-6 sm:p-10">
            <div className="max-w-2xl mb-8">
              <h3 className="font-serif text-3xl text-white mb-2">
                {language === 'en'
                  ? 'Why Hire a Senior Specialist vs. a Traditional Agency?'
                  : 'Mengapa Memilih Senior Specialist Dibanding Agensi Tradisional?'}
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                {language === 'en'
                  ? 'Agencies often pitch with senior partners but delegate your brand to junior interns. When you work with me, you get direct, dedicated senior execution with proven multi-million view results.'
                  : 'Agensi seringkali melakukan pitching dengan pimpinan senior namun menyerahkan eksekusi akun Anda ke staf junior. Bersama saya, Anda mendapatkan eksekusi langsung dari spesialis senior yang telah terbukti menembus jutaan tayangan.'}
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Working with Nanda */}
              <div className="p-6 sm:p-8 rounded-sm bg-neutral-900/60 border border-[#25D366]/40 space-y-4 relative">
                <div className="flex items-center gap-2 text-[#25D366] font-mono text-xs font-bold uppercase tracking-wider">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{language === 'en' ? 'Collaborating With Nanda' : 'Berkolaborasi Dengan Nanda'}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#25D366] font-bold">✓</span>
                    <span>
                      <strong className="text-white">100% Senior Execution:</strong> Every script, hook, and video edit is handled directly by me—no junior delegation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#25D366] font-bold">✓</span>
                    <span>
                      <strong className="text-white">Organic-First Viral Formulas:</strong> Focused on actual retention and community growth, not vanity Canva graphics.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#25D366] font-bold">✓</span>
                    <span>
                      <strong className="text-white">Proven Track Record:</strong> 10.8M+ single reel peak, 766K+ community, and 4,000+ shipped assets.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#25D366] font-bold">✓</span>
                    <span>
                      <strong className="text-white">Agile & Direct WhatsApp Speed:</strong> Rapid iterations, direct strategy brainstorming, and zero agency red-tape.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Traditional Agency */}
              <div className="p-6 sm:p-8 rounded-sm bg-neutral-950/80 border border-neutral-800 space-y-4 opacity-80">
                <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <span>✕</span>
                  <span>{language === 'en' ? 'Generic Agency Approach' : 'Agensi Konvensional Biasa'}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-400">✕</span>
                    <span>High retainer fees with high overhead to fund agency offices and account executives.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-400">✕</span>
                    <span>Your account is handed off to junior interns or fresh graduates with zero viral experience.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-400">✕</span>
                    <span>Slow ticket systems and multiple bureaucratic approvals that miss fast-moving trend windows.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-neutral-400">✕</span>
                    <span>Cookie-cutter Canva graphic carousels that get drowned in today's video-first algorithms.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4-Step Collaboration Roadmap */}
      <div className="mt-16 pt-12 border-t border-neutral-850">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#25D366]">
              {language === 'en' ? 'COLLABORATION WORKFLOW' : 'ALUR KERJA SAMA'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              {language === 'en' ? 'How We Work Together' : 'Bagaimana Kita Memulai Kolaborasi'}
            </h3>
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {language === 'en' ? 'From initial chat to compounding organic reach' : 'Dari obrolan awal hingga hasil organik teruji'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              titleEn: 'Discovery & Audit',
              titleId: 'Audit & Konsultasi Awal',
              descEn: 'We align on your revenue goals, target buyer persona, and past social bottlenecks via WhatsApp or Meet.',
              descId: 'Kita menyelaraskan target bisnis, profil audiens pembeli, dan kendala masa lalu via WhatsApp atau Google Meet.'
            },
            {
              step: '02',
              titleEn: 'Strategy & Calendar',
              titleId: 'Strategi & Kalender Konten',
              descEn: 'I deliver a bespoke 30-day content calendar with viral hooks, storyboards, and script frameworks.',
              descId: 'Saya menyusun kalender konten 30 hari lengkap dengan formula hook, storyboard visual, dan draf naskah.'
            },
            {
              step: '03',
              titleEn: 'Agile Production',
              titleId: 'Produksi & Editing Cepat',
              descEn: 'High-pacing short-form video editing, licensed music selection, and high-converting caption copywriting.',
              descId: 'Editing video pendek beritme cepat, seleksi musik berlisensi, dan penulisan caption berdaya pikat tinggi.'
            },
            {
              step: '04',
              titleEn: 'Launch & Compound',
              titleId: 'Tayang & Pantau Evaluasi',
              descEn: 'Scheduled uploads, daily comment/DM engagement, and monthly analytical reviews to compound growth.',
              descId: 'Penjadwalan tayang tepat waktu, moderasi komentar/DM harian, serta evaluasi performa bulanan.'
            }
          ].map((item, sIdx) => (
            <div
              key={sIdx}
              className="p-6 rounded-sm bg-neutral-950/60 border border-neutral-800/80 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#25D366]">{item.step}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              </div>
              <h4 className="font-serif text-lg text-white font-medium">
                {language === 'en' ? item.titleEn : item.titleId}
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {language === 'en' ? item.descEn : item.descId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
