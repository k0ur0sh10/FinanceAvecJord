import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Shield, TrendingUp, PiggyBank, Umbrella, LineChart, Home,
  ArrowRight, Star, CheckCircle, ChevronRight, Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePublicSettings } from '../context/SettingsContext';
import portraitImg from '../../assets/3cdfcf1cdb2fbf33290d26acfffac159f4cf8857.png';
import jordanImg from '../../assets/f966e7d61b8cded9db8fb54f8b04bb51712b9199.png';
import logoImg from '../../assets/5cd219d9afe328db6196c812cd74b522e89396af.png';
import iaLogo from '../../assets/52648954b096a5cd10c0af7265475f74f5228ca8.png';

const chartData = [
  { month: '2011', value: 25000 },
  { month: '2013', value: 35000 },
  { month: '2015', value: 48000 },
  { month: '2017', value: 62000 },
  { month: '2019', value: 78000 },
  { month: '2020', value: 68000 },
  { month: '2021', value: 102000 },
  { month: '2022', value: 88000 },
  { month: '2023', value: 115000 },
  { month: '2024', value: 138000 },
  { month: '2025', value: 152000 },
  { month: '2026', value: 158000 },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  { icon: LineChart, key: 'planning' },
  { icon: Shield, key: 'insurance' },
  { icon: TrendingUp, key: 'investment' },
  { icon: Home, key: 'retirement' },
  { icon: Umbrella, key: 'protection' },
  { icon: PiggyBank, key: 'savings' },
];

// TikTok icon
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.15a8.16 8.16 0 0 0 4.77 1.52V7.22a4.85 4.85 0 0 1-1-.53z" />
    </svg>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const { contact, social } = usePublicSettings();

  const serviceData = [
    {
      icon: services[0].icon,
      title: t('Planification financière', 'Financial Planning'),
      desc: t('Stratégies personnalisées pour atteindre vos objectifs financiers à court et long terme.', 'Personalized strategies to reach your short and long-term financial goals.'),
    },
    {
      icon: services[1].icon,
      title: t('Solutions d\'assurance', 'Insurance Solutions'),
      desc: t('Protégez votre famille et vos actifs avec les meilleures couvertures disponibles.', 'Protect your family and assets with the best coverage available.'),
    },
    {
      icon: services[2].icon,
      title: t('Stratégies d\'investissement', 'Investment Strategies'),
      desc: t('Faites fructifier votre patrimoine avec des portefeuilles diversifiés et performants.', 'Grow your wealth with diversified and high-performing portfolios.'),
    },
    {
      icon: services[3].icon,
      title: t('Planification retraite', 'Retirement Planning'),
      desc: t('Assurez une retraite sereine et confortable grâce à une planification précoce.', 'Ensure a peaceful and comfortable retirement through early planning.'),
    },
    {
      icon: services[4].icon,
      title: t('Protection du patrimoine', 'Wealth Protection'),
      desc: t('Sécurisez votre héritage et transmettez vos biens dans les meilleures conditions.', 'Secure your legacy and transfer your assets in the best conditions.'),
    },
    {
      icon: services[5].icon,
      title: t('Stratégies d\'épargne', 'Savings Strategies'),
      desc: t('Optimisez vos économies grâce à des véhicules d\'épargne fiscalement avantageux.', 'Optimize your savings with tax-advantaged savings vehicles.'),
    },
  ];

  const reasons = [
    t('Approche 100% personnalisée', '100% personalized approach'),
    t('Expertise en planification québécoise', 'Expertise in Quebec planning'),
    t('Affilié avec iA Groupe Financier', 'Affiliated with iA Financial Group'),
    t('Bilingue — Français & Anglais', 'Bilingual — French & English'),
    t('Consultation initiale gratuite', 'Free initial consultation'),
    t('Disponible 7 jours sur 7', 'Available 7 days a week'),
  ];

  return (
    <div className="bg-[#060f1e]">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#060f1e] via-[#0a1628] to-[#06101f]" />
          <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#1e5aad]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-[#c9a84c]/5 to-transparent" />
          {/* Glow orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#c9a84c]/8 rounded-full blur-[100px]" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Logo 
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <img src={logoImg} alt="Finance Avec Jord" className="h-32 w-auto object-contain max-w-[320px]" />
              </motion.div>
              */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-xs uppercase tracking-widest mb-6"
              >
                <Star size={12} fill="currentColor" />
                {t('Conseiller en sécurité financière', 'Financial Security Advisor')}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-white mb-6"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1 }}
              >
                {t(
                  <>Planifiez votre <span className="bg-gradient-to-r from-[#3b82f6] to-[#c9a84c] bg-clip-text text-transparent">avenir financier</span> avec confiance.</>,
                  <>Plan your <span className="bg-gradient-to-r from-[#3b82f6] to-[#c9a84c] bg-clip-text text-transparent">financial future</span> with confidence.</>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg"
              >
                {t(
                  'Jordan vous accompagne avec expertise, passion et transparence pour bâtir la stratégie financière qui vous ressemble.',
                  'Jordan guides you with expertise, passion, and transparency to build the financial strategy that fits your life.'
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/book"
                  className="group flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                >
                  <Calendar size={18} />
                  {t('Consultation gratuite', 'Free Consultation')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="group flex items-center gap-2 px-7 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {t('Nos services', 'Our Services')}
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>


            </div>

            {/* Right: Portrait + Chart */}
            <div className="relative">
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="relative"
              >
                <div className="relative mx-auto max-w-md">
                  {/* Glow behind portrait */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1e5aad]/30 to-[#c9a84c]/20 rounded-3xl blur-3xl scale-110" />
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                    <img
                      src={portraitImg}
                      alt="Jordan — Finance Avec Jord"
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: '520px', objectPosition: 'top' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/60 via-transparent to-transparent" />
                  </div>

                  {/* Floating card: Chart }
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -left-6 bottom-16 bg-[#0a1628]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-52"
                  >
                    <p className="text-white/50 text-xs mb-1">{t('S&P 500 depuis 2011', 'S&P 500 since 2011')}</p>
                    <p className="text-white" style={{ fontSize: '1.25rem', fontWeight: 700 }}>+$150K</p>
                    <div className="mt-2 h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData.slice(-6)}>
                          <defs>
                            <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#heroGrad)" strokeWidth={2} dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                  */}

                  {/* Floating card: iA */}
                  < motion.div
                    initial={{ opacity: 0, x: 30, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="absolute -right-6 top-16 bg-white rounded-2xl p-3 shadow-2xl"
                  >
                    <img src={iaLogo} alt="iA Financial Group" className="h-10 w-auto object-contain" />
                  </motion.div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="absolute -right-4 bottom-8 bg-gradient-to-r from-[#c9a84c] to-[#f5d78e] text-[#0a1628] rounded-2xl px-4 py-2 shadow-xl"
                    style={{ fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    ✓ {t('Conseiller certifié', 'Certified Advisor')}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div >

        {/* Scroll indicator */}
        < motion.div
          animate={{ y: [0, 8, 0] }
          }
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </motion.div >
      </section >

      {/* AGENCE BEAUGRAND SECTION */}
      < section className="py-16 relative" >
        <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e] to-[#08111f]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-[#c9a84c]/10 to-[#c9a84c]/5 border border-[#c9a84c]/20 p-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="shrink-0 text-center lg:text-left">
                <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-2">
                  {t('Partenaire officiel', 'Official Partner')}
                </p>
                <h3 className="text-white text-2xl font-bold mb-1">Agence Beaugrand</h3>
                <p className="text-white/40 text-sm">iA Groupe Financier</p>
              </div>
              <div className="w-px h-16 bg-white/10 hidden lg:block shrink-0" />
              <div className="flex-1 space-y-3 text-center lg:text-left">
                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <span className="text-[#c9a84c] mt-0.5">📍</span>
                  <p className="text-white/70 text-sm">
                    {contact.address}
                  </p>
                </div>
                <a
                  href="https://ia.ca/individuals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-sm hover:bg-[#c9a84c]/20 transition-all duration-200"
                >
                  {t('Visiter ia.ca — Particuliers', 'Visit ia.ca — Individuals')}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section >

      {/* SERVICES OVERVIEW */}
      < section className="py-24 relative" >
        <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e] via-[#080f20] to-[#060f1e]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-3">{t('Ce que nous offrons', 'What We Offer')}</p>
            <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              {t('Nos services financiers', 'Our Financial Services')}
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              {t(
                'Des solutions complètes adaptées à chaque étape de votre vie financière.',
                'Complete solutions tailored to every stage of your financial life.'
              )}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.map((service, i) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={service.title}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#3b82f6]/40 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e5aad]/0 to-[#1e5aad]/0 group-hover:from-[#1e5aad]/10 group-hover:to-transparent transition-all duration-500" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-full blur-2xl group-hover:bg-[#3b82f6]/15 transition-all duration-500" />

                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="text-white mb-3" style={{ fontSize: '1.05rem', fontWeight: 600 }}>{service.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-[#3b82f6] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t('En savoir plus', 'Learn more')}
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 text-sm"
            >
              {t('Voir tous nos services', 'View all services')}
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section >

      {/* GROWTH CHART SECTION */}
      < section className="py-24 relative overflow-hidden" >
        <div className="absolute inset-0 bg-[#080f20]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e5aad]/5 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#c9a84c]/3 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-3">{t('Performance', 'Performance')}</p>
              <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2 }}>
                {t('Le pouvoir des investissements à long terme', 'The power of long-term investing')}
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                {t(
                  'Si vous aviez investi 25 000 $ en 2011 dans un fonds tel que le S&P 500, vous auriez aujourd\'hui plus de 150 000 $ — c\'est la puissance des marchés sur le long terme.',
                  'If you had invested $25,000 in 2011 in a fund like the S&P 500, today you would have over $150,000 — that\'s the power of long-term markets.'
                )}
              </p>
              <div className="space-y-3">
                {[
                  t('Portefeuilles diversifiés et adaptés à votre profil', 'Diversified portfolios adapted to your profile'),
                  t('Révision régulière de votre stratégie', 'Regular review of your strategy'),
                  t('Accès aux meilleurs conseils sur les produits financiers', 'Access to the best advice on financial products'),
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle size={16} className="text-[#3b82f6] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/60 text-sm">{t('S&P 500 — 25 000 $ en 2011', 'S&P 500 — $25,000 in 2011')}</p>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                    +530% {t('depuis 2011', 'since 2011')}
                  </span>
                </div>
                <p className="text-white mb-6" style={{ fontSize: '1.75rem', fontWeight: 700 }}>+$150,000</p>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: '#0a1628',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '12px',
                        }}
                        formatter={(v: number) => [`$${v.toLocaleString()}`, '']}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#chartGrad)" strokeWidth={2.5} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section >

      {/* WHY CHOOSE US */}
      < section className="py-24 relative" >
        <div className="absolute inset-0 bg-[#060f1e]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-3">
              {t('Pourquoi nous choisir', 'Why Choose Us')}
            </p>
            <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              {t('Finance Avec Jord, c\'est différent.', 'Finance Avec Jord is different.')}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map((reason, i) => (
              <AnimatedSection key={reason}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-[#c9a84c]/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={15} className="text-[#c9a84c]" />
                  </div>
                  <span className="text-white/80 text-sm">{reason}</span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section >

      {/* ADVISOR INTRO PREVIEW */}
      < section className="py-24 relative overflow-hidden" >
        <div className="absolute inset-0 bg-gradient-to-br from-[#080f20] to-[#0a1628]" />
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#1e5aad]/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e5aad]/20 to-[#c9a84c]/10 rounded-3xl blur-2xl scale-95" />
                <div className="relative rounded-3xl overflow-hidden border border-white/10">
                  
                  <img
                    src={jordanImg}
                    alt="Jordan"
                    className="w-full object-cover"
                    style={{ maxHeight: '480px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Jordan</p>
                    
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-4">{t('Votre conseiller', 'Your Advisor')}</p>
              <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2 }}>
                {t('Rencontrez Jordan', 'Meet Jordan')}
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                {t(
                  'Passionné par la finance et dévoué à ses clients, Jordan est un conseiller financier certifié affilié avec iA Groupe Financier. Il accompagne ses clients dans toutes les étapes de leur parcours financier.',
                  'Passionate about finance and dedicated to his clients, Jordan is a certified financial advisor affiliated with iA Financial Group. He guides clients through every stage of their financial journey.'
                )}
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                {t(
                  'Son approche est simple: vous écouter, comprendre vos besoins, et construire avec vous une stratégie financière sur mesure.',
                  'His approach is simple: listen to you, understand your needs, and build a tailored financial strategy with you.'
                )}
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 transition-all duration-300"
              >
                {t('En savoir plus', 'Learn More')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section >

      {/* CREDIBILITY - iA Affiliation */}
      < section className="py-20 relative" >
        <div className="absolute inset-0 bg-[#060f1e]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e5aad]/5 via-transparent to-[#c9a84c]/5" />
              <div className="relative">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-6">
                  {t('Affiliation officielle', 'Official Affiliation')}
                </p>
                <p className="text-white mb-8" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 600 }}>
                  {t(
                    'Jordan Beaulieu est fièrement affilié avec',
                    'Jordan Beaulieu is proudly affiliated with'
                  )}
                </p>
                <div className="inline-block bg-white rounded-2xl px-8 py-5 shadow-2xl">
                  <img src={iaLogo} alt="iA Financial Group" className="h-16 w-auto object-contain" />
                </div>
                <div className="mt-8 space-y-2">
                  <p className="text-white font-semibold text-base">Agence Beaugrand</p>
                  <p className="text-white/50 text-sm">
                    {contact.address}
                  </p>
                  <a
                    href="https://ia.ca/individuals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#3b82f6] text-sm hover:underline mt-2"
                  >
                    {t('Visiter iA — Particuliers', 'Visit iA — Individuals')} →
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section >

      {/* CTA SECTION */}
      < section className="py-24 relative overflow-hidden" >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e5aad]/20 via-[#0a1628] to-[#060f1e]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#3b82f6]/10 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-xs uppercase tracking-widest mb-6">
              <Calendar size={12} />
              {t('Gratuit — Sans engagement', 'Free — No Commitment')}
            </div>
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
              {t('Prêt à bâtir votre avenir financier ?', 'Ready to build your financial future?')}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {t(
                'Réservez votre consultation gratuite dès aujourd\'hui et discutez de vos objectifs financiers avec Jordan.',
                'Book your free consultation today and discuss your financial goals with Jordan.'
              )}
            </p>
            <Link
              to="/book"
              className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 text-lg"
              style={{ fontWeight: 600 }}
            >
              <Calendar size={22} />
              {t('Réserver ma consultation gratuite', 'Book My Free Consultation')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section >

      {/* SOCIAL LINKS */}
      < section className="py-12 border-t border-white/5" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-white/40 text-sm">
                {t('Suivez Finance Avec Jord sur les réseaux sociaux', 'Follow Finance Avec Jord on social media')}
              </p>
              <div className="flex items-center gap-3">
                {[
                  { label: 'Instagram', href: social.instagramUrl, icon: <svg width={18} height={18} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg> },
                  { label: 'TikTok', href: social.tiktokUrl, icon: <TikTokIcon size={18} /> },
                  { label: 'Facebook', href: social.facebookUrl, icon: <svg width={18} height={18} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-sm"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section >
    </div >
  );
}