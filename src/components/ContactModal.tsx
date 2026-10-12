import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, X, Mail, MessageSquare, Copy, Check, ExternalLink, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContact } from '../context/ContactContext';
import { data } from '../data';
import { soundManager } from '../utils/audio';

const RECIPIENT_EMAIL = 'nanda15766@gmail.com';
const WHATSAPP_PHONE = '6281556725874';

interface SubmittedMessage {
  name: string;
  email: string;
  message: string;
  mailtoUrl: string;
  gmailUrl: string;
  whatsappUrl: string;
  formattedText: string;
}

export default function ContactModal() {
  const { language } = useLanguage();
  const { ui: t } = data[language];
  const { isContactOpen, closeContact } = useContact();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedMessage | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    soundManager.playBlip(700, 0.04);
    setIsSubmitting(true);

    const subject = `[Portfolio Inquiry] From ${name.trim()}`;
    const body = `Hi Nanda,\n\nYou have received a new inquiry from your portfolio website:\n\n• Sender Name: ${name.trim()}\n• Sender Email: ${email.trim()}\n\n• Message:\n${message.trim()}\n\n---\nDirect Reply Target: ${email.trim()}`;
    const waText = `Hi Nanda, I visited your portfolio website.\n\n• Name: ${name.trim()}\n• Email: ${email.trim()}\n• Message: ${message.trim()}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const encodedWaText = encodeURIComponent(waText);

    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedWaText}`;

    const payload: SubmittedMessage = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      mailtoUrl,
      gmailUrl,
      whatsappUrl,
      formattedText: body,
    };

    setSubmittedData(payload);
    setIsSubmitting(false);
    soundManager.playBlip(900, 0.08);

    // Automatically trigger mailto link so user's client opens directly
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Ignored if browser prevents direct protocol navigation
    }
  };

  const handleCopy = async () => {
    if (!submittedData) return;
    try {
      await navigator.clipboard.writeText(submittedData.formattedText);
      soundManager.playBlip(800, 0.03);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    soundManager.playBlip(500, 0.03);
    setSubmittedData(null);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
        <div className="fixed inset-0 z-[140] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              soundManager.playBlip(400, 0.03);
              closeContact();
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Slide-over Architectural Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative w-full max-w-lg h-full bg-[#080a0d] shadow-[0_0_80px_rgba(0,0,0,0.9)] border-l border-white/[0.12] flex flex-col z-[141] text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-white/[0.08] bg-[#07090c]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-brand-light block mb-1">
                  05 / INQUIRY & CONTACT
                </span>
                <h2 className="text-xl font-display font-light text-white tracking-tight">
                  {t.thankYou}
                </h2>
              </div>
              <button
                onClick={() => {
                  soundManager.playBlip(400, 0.03);
                  closeContact();
                }}
                className="w-8 h-8 bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-colors rounded-sm cursor-pointer"
                aria-label="Close contact drawer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
              {submittedData ? (
                /* Transmission Screen */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="border border-white/10 p-5 bg-white/[0.02] rounded-sm text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      className="w-12 h-12 bg-white/10 border border-brand-light/60 flex items-center justify-center mx-auto mb-4 rounded-full"
                    >
                      <CheckCircle2 className="w-6 h-6 text-brand-light" />
                    </motion.div>

                    <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold mb-1">
                      {language === 'en' ? 'TRANSMISSION READY' : 'PESAN SIAP DIKIRIM'}
                    </h3>
                    <p className="text-white/60 text-xs font-mono leading-relaxed max-w-sm mx-auto">
                      {language === 'en'
                        ? 'Your message is addressed to Nanda Dwi Wahyu Prasetyo.'
                        : 'Pesan Anda ditujukan langsung kepada Nanda Dwi Wahyu Prasetyo.'}
                    </p>
                    <div className="mt-3 inline-block font-mono text-[11px] text-brand-light bg-brand-light/10 border border-brand-light/20 px-3 py-1 rounded">
                      {RECIPIENT_EMAIL}
                    </div>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="space-y-2.5">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40">
                      {language === 'en' ? 'Choose Your Send Method:' : 'Pilih Metode Pengiriman:'}
                    </span>

                    {/* Option 1: Gmail Web Compose */}
                    <a
                      href={submittedData.gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playBlip(750, 0.04)}
                      className="w-full py-3.5 px-4 bg-white text-black hover:bg-neutral-200 transition-all font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-between shadow-lg group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-black" />
                        <span>{language === 'en' ? 'Open in Gmail (Web)' : 'Buka di Gmail (Web)'}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Option 2: Default Mail Client (mailto) */}
                    <a
                      href={submittedData.mailtoUrl}
                      onClick={() => soundManager.playBlip(700, 0.04)}
                      className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white transition-all font-mono text-xs uppercase tracking-wider rounded-sm flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-brand-light" />
                        <span>{language === 'en' ? 'Open in Mail App (Apple/Outlook)' : 'Buka di Aplikasi Email'}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                    </a>

                    {/* Option 3: WhatsApp Direct Chat */}
                    <a
                      href={submittedData.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playBlip(750, 0.04)}
                      className="w-full py-3 px-4 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-200 transition-all font-mono text-xs uppercase tracking-wider rounded-sm flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        <span>{language === 'en' ? 'Send via WhatsApp Chat' : 'Kirim via WhatsApp Chat'}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    </a>

                    {/* Option 4: Copy Formatted Text */}
                    <button
                      onClick={handleCopy}
                      className="w-full py-2.5 px-4 bg-transparent hover:bg-white/[0.04] border border-white/10 text-white/70 hover:text-white transition-all font-mono text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">
                            {language === 'en' ? 'Copied to Clipboard!' : 'Disalin ke Clipboard!'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{language === 'en' ? 'Copy Message Text' : 'Salin Teks Pesan'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#05070a] border border-white/[0.08] p-4 rounded-sm text-xs font-mono space-y-2">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest border-b border-white/[0.06] pb-2">
                      {language === 'en' ? 'Message Summary' : 'Ringkasan Pesan'}
                    </div>
                    <div>
                      <span className="text-white/40">From: </span>
                      <span className="text-white">{submittedData.name} ({submittedData.email})</span>
                    </div>
                    <div>
                      <span className="text-white/40">To: </span>
                      <span className="text-brand-light">{RECIPIENT_EMAIL}</span>
                    </div>
                    <div className="pt-2 text-white/80 whitespace-pre-line border-t border-white/[0.06] max-h-32 overflow-y-auto leading-relaxed text-[11px]">
                      {submittedData.message}
                    </div>
                  </div>

                  {/* Reset / Send Another */}
                  <div className="pt-2 flex justify-between items-center text-xs font-mono">
                    <button
                      onClick={handleReset}
                      className="text-white/50 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{language === 'en' ? 'Edit or Send Another' : 'Ubah atau Kirim Lainnya'}</span>
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playBlip(400, 0.03);
                        closeContact();
                      }}
                      className="text-white/50 hover:text-white transition-colors cursor-pointer py-1"
                    >
                      {language === 'en' ? 'Close Drawer' : 'Tutup'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Input Form */
                <>
                  <p className="text-white/60 text-xs sm:text-sm mb-6 leading-relaxed font-sans">
                    {t.contactSubtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[10px] font-mono font-bold text-brand-light uppercase tracking-widest mb-2"
                      >
                        {t.contactForm.nameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#05070a] border border-white/15 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-light transition-all text-xs font-mono rounded-sm"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] font-mono font-bold text-brand-light uppercase tracking-widest mb-2"
                      >
                        {t.contactForm.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#05070a] border border-white/15 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-light transition-all text-xs font-mono rounded-sm"
                        placeholder="jane@organization.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[10px] font-mono font-bold text-brand-light uppercase tracking-widest mb-2"
                      >
                        {t.contactForm.messageLabel}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        required
                        className="w-full bg-[#05070a] border border-white/15 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-light transition-all resize-none text-xs font-mono rounded-sm"
                        placeholder="Tell us about your brand channels, growth targets, or tournament schedule..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-neutral-200 px-6 py-4 font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-4 rounded-sm shadow-md"
                    >
                      <span>{t.contactForm.submitButton}</span>
                      <Send className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
