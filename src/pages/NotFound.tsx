import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();
  const en = language === 'en';

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative min-h-screen bg-[#07090c] text-white flex items-center justify-center px-6 pt-24"
    >
      <div className="text-center max-w-xl space-y-6">
        <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase">404</p>
        <h1 className="font-serif-italic text-5xl md:text-6xl tracking-tight">
          {en ? 'Page not found' : 'Halaman tidak ditemukan'}
        </h1>
        <p className="text-neutral-400">
          {en
            ? 'The page you are looking for does not exist or has moved.'
            : 'Halaman yang Anda cari tidak ada atau telah dipindahkan.'}
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 border border-white/20 font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
        >
          {en ? 'Back to home' : 'Kembali ke beranda'}
        </Link>
      </div>
    </main>
  );
}
