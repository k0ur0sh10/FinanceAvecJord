import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../../assets/5cd219d9afe328db6196c812cd74b522e89396af.png';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('Accueil', 'Home') },
    { to: '/services', label: t('Services', 'Services') },
    { to: '/about', label: t('À Propos', 'About') },
    { to: '/book', label: t('Prendre RDV', 'Book Appointment') },
    { to: '/contact', label: t('Contact', 'Contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#060f1e]/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoImg} alt="Finance Avec Jord" className="h-35 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm transition-all duration-200 rounded-lg group ${isActive(link.to)
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${lang === 'fr' ? 'bg-white text-[#0a1628]' : 'text-white/70 hover:text-white'
                  }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${lang === 'en' ? 'bg-white text-[#0a1628]' : 'text-white/70 hover:text-white'
                  }`}
              >
                EN
              </button>
            </div>

            <Link
              to="/book"
              className="px-5 py-2.5 rounded-xl text-sm bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              {t('Consultation gratuite', 'Free Consultation')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10">
              <button
                onClick={() => setLang('fr')}
                className={`px-2.5 py-0.5 rounded-full text-xs transition-all duration-200 ${lang === 'fr' ? 'bg-white text-[#0a1628]' : 'text-white/70'
                  }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs transition-all duration-200 ${lang === 'en' ? 'bg-white text-[#0a1628]' : 'text-white/70'
                  }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 rounded-lg bg-white/10 border border-white/10"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#060f1e]/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm transition-all duration-200 ${isActive(link.to)
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/book"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 rounded-xl text-sm text-center bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white"
              >
                {t('Consultation gratuite', 'Free Consultation')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
