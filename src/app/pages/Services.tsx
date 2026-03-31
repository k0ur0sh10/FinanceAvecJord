import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  LineChart, Shield, TrendingUp, Home, Umbrella, PiggyBank,
  ArrowRight, CheckCircle, Calendar, Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePublicSettings } from '../context/SettingsContext';

// Rotating set of icons and colors for dynamically-added services
const SERVICE_ICONS = [LineChart, Shield, TrendingUp, Home, Umbrella, PiggyBank, Star, Calendar];
const SERVICE_COLORS = ['#3b82f6', '#c9a84c', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#f97316'];

function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const { t } = useLanguage();
  const { services } = usePublicSettings();

  return (
    <div className="bg-[#060f1e] pt-24">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1e5aad]/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-4">
              {t('Nos services', 'Our Services')}
            </p>
            <h1 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
              {t('Solutions financières complètes', 'Complete Financial Solutions')}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              {t(
                'De la planification à la protection, chaque service est conçu pour vous accompagner à chaque étape de votre parcours financier.',
                'From planning to protection, every service is designed to support you at every stage of your financial journey.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid — fully dynamic */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {services.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">{t('Aucun service configuré', 'No services configured')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              const color = SERVICE_COLORS[i % SERVICE_COLORS.length];

              return (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ background: color }}
                    />
                    <div className="relative flex gap-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                      >
                        <Icon size={24} style={{ color }} />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white mb-3" style={{ fontSize: '1.15rem', fontWeight: 600 }}>
                          {service.name}
                        </h3>

                        {service.description && (
                          <p className="text-white/50 text-sm leading-relaxed mb-5">
                            {service.description}
                          </p>
                        )}

                        {service.features.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, fi) => (
                              <div key={fi} className="flex items-center gap-2 text-white/60 text-xs">
                                <CheckCircle size={12} style={{ color, flexShrink: 0 }} />
                                {feature}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-[#1e5aad]/20 to-[#3b82f6]/10 border border-[#3b82f6]/20 p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e5aad]/5 to-[#c9a84c]/5" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#3b82f6]/20 rounded-full blur-2xl" />
              <div className="relative">
                <Calendar size={40} className="text-[#3b82f6] mx-auto mb-6" />
                <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700 }}>
                  {t('Discutons de vos besoins', "Let's discuss your needs")}
                </h2>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  {t(
                    'Chaque situation est unique. Réservez une consultation gratuite pour trouver le service qui vous convient.',
                    'Every situation is unique. Book a free consultation to find the service that suits you.'
                  )}
                </p>
                <Link
                  to="/book"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-xl shadow-blue-500/30 hover:scale-105"
                  style={{ fontWeight: 600 }}
                >
                  {t('Consultation gratuite', 'Free Consultation')}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
