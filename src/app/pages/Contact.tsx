import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageSquare, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { messagesApi } from '../services/api';
import { usePublicSettings } from '../context/SettingsContext';

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.15a8.16 8.16 0 0 0 4.77 1.52V7.22a4.85 4.85 0 0 1-1-.53z" />
    </svg>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const { contact } = usePublicSettings();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await messagesApi.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || t('Erreur lors de l\'envoi', 'Error sending message'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#060f1e] pt-24 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-4">
            {t('Nous joindre', 'Get in Touch')}
          </p>
          <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
            {t('Contactez Finance Avec Jord', 'Contact Finance Avec Jord')}
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t(
              'Une question ? Un besoin financier ? Nous sommes là pour vous aider.',
              'A question? A financial need? We are here to help.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact details */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-white mb-6" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {t('Coordonnées', 'Contact Details')}
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1e5aad]/20 border border-[#1e5aad]/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('Téléphone', 'Phone')}</p>
                    <a href="tel:+14385045033" className="text-white hover:text-[#3b82f6] transition-colors text-sm">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1e5aad]/20 border border-[#1e5aad]/30 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('Courriel', 'Email')}</p>
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#3b82f6] transition-colors text-sm break-all">
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1e5aad]/20 border border-[#1e5aad]/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t('Adresse', 'Address')}</p>
                    <p className="text-white text-sm">{contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-white mb-6" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {t('Réseaux sociaux', 'Social Media')}
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: 'Instagram',
                    handle: '@financeaveejord',
                    href: 'https://instagram.com',
                    icon: <Instagram size={18} />,
                    color: '#E1306C',
                  },
                  {
                    name: 'TikTok',
                    handle: '@financeaveejord',
                    href: 'https://tiktok.com',
                    icon: <TikTokIcon size={18} />,
                    color: '#fff',
                  },
                  {
                    name: 'Facebook',
                    handle: 'Finance Avec Jord',
                    href: 'https://facebook.com',
                    icon: <Facebook size={18} />,
                    color: '#1877F2',
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${social.color}15`, border: `1px solid ${social.color}25`, color: social.color }}
                    >
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm" style={{ fontWeight: 500 }}>{social.name}</p>
                      <p className="text-white/40 text-xs">{social.handle}</p>
                    </div>
                    <div className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">→</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden" style={{ height: '200px' }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0a1628] to-[#060f1e]">
                <MapPin size={32} className="text-[#3b82f6]/40" />
                <p className="text-white/30 text-sm">{t('Québec, Canada', 'Québec, Canada')}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <h2 className="text-white mb-3" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  {t('Message envoyé !', 'Message Sent!')}
                </h2>
                <p className="text-white/60 mb-8">
                  {t(
                    'Merci pour votre message. Jordan vous répondra dans les plus brefs délais.',
                    'Thank you for your message. Jordan will get back to you as soon as possible.'
                  )}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                  className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all text-sm"
                >
                  {t('Nouveau message', 'New Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm h-full flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <h2 className="text-white" style={{ fontWeight: 600 }}>
                    {t('Envoyer un message', 'Send a Message')}
                  </h2>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                        {t('Nom complet *', 'Full Name *')}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder={t('Jean Tremblay', 'John Smith')}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:border-[#3b82f6]/50 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                        {t('Courriel *', 'Email *')}
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="jean@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:border-[#3b82f6]/50 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                      {t('Téléphone', 'Phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+1 (514) 555-0123"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:border-[#3b82f6]/50 outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                      {t('Message *', 'Message *')}
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder={t(
                        'Comment puis-je vous aider ? Décrivez votre situation ou votre question...',
                        'How can I help you? Describe your situation or question...'
                      )}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:border-[#3b82f6]/50 outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full py-4 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <MessageSquare size={18} />
                    {submitting ? t('Envoi en cours...', 'Sending...') : t('Envoyer le message', 'Send Message')}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
