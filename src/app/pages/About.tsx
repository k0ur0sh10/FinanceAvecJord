import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Award, Heart, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePublicSettings } from '../context/SettingsContext';
import portraitImg from '../../assets/3cdfcf1cdb2fbf33290d26acfffac159f4cf8857.png';
import iaLogo from '../../assets/52648954b096a5cd10c0af7265475f74f5228ca8.png';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

export default function AboutPage() {
  const { t } = useLanguage();
  const { contact } = usePublicSettings();

  const values = [
    {
      icon: Heart,
      title: t('Passion', 'Passion'),
      desc: t('La finance, c\'est ma vocation. Je m\'investis pleinement dans chaque dossier client.', 'Finance is my calling. I fully invest myself in every client file.'),
    },
    {
      icon: Award,
      title: t('Excellence', 'Excellence'),
      desc: t('Des solutions de qualité supérieure, rigoureusement sélectionnées pour vos besoins.', 'Top-quality solutions, rigorously selected for your needs.'),
    },
    {
      icon: Star,
      title: t('Confiance', 'Trust'),
      desc: t('Transparence totale et honnêteté dans chaque conseil que je vous donne.', 'Total transparency and honesty in every piece of advice I give you.'),
    },
  ];

  return (
    <div className="bg-[#060f1e] pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1e5aad]/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#c9a84c]/5 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e5aad]/30 to-[#c9a84c]/20 rounded-3xl blur-3xl scale-90" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <img
                  src={portraitImg}
                  alt="Jordan — Finance Avec Jord"
                  className="w-full object-cover"
                  style={{ maxHeight: '620px', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/60 via-transparent to-transparent" />
              </div>

              {/* Floating credential card */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -right-6 top-12 bg-[#0a1628]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl max-w-48"
              >
                <p className="text-white/40 text-xs mb-1">{t('Affilié avec', 'Affiliated with')}</p>
                <div className="bg-white rounded-lg p-2">
                  <img src={iaLogo} alt="iA Financial Group" className="h-8 w-auto object-contain" />
                </div>
                <p className="text-white text-xs mt-2 font-semibold">Agence Beaugrand</p>
                <p className="text-[#c9a84c] text-xs mt-1">{t('Conseiller certifié', 'Certified Advisor')}</p>
              </motion.div>


            </motion.div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <AnimatedSection>
                <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-4">
                  {t('À propos', 'About')}
                </p>
                <h1 className="text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
                  {t('Rencontrez Jordan', 'Meet Jordan')}
                </h1>
                <p className="text-white/60 leading-relaxed mb-6 text-lg">
                  {t(
                    'J\'ai développé une véritable passion pour les finances lors de mon parcours à HEC Montréal, où j\'ai obtenu deux certificats en gestion. Ambitieux, perfectionniste et orienté vers la performance, je m\'efforce toujours de dépasser les attentes de mes clients.',
                    'I developed a true passion for finance during my studies at HEC Montréal, where I obtained two certificates in management. Ambitious, perfectionist and focused on performance, I always strive to exceed my clients\' expectations.'
                  )}
                </p>
                <p className="text-white/60 leading-relaxed mb-6">
                  {t(
                    'Les finances personnelles étant un domaine sensible, ma solide fibre relationnelle me permet de mettre mes clients à l\'aise et, surtout, de bien comprendre leurs besoins. Je n\'ai pas encore d\'enfants, mais j\'en prévois certainement à l\'avenir.',
                    'As personal finances are a sensitive topic, my strong interpersonal skills enable me to put my clients at ease and, especially, to fully understand their needs. I don\'t have children yet, but I certainly plan to have some in the future.'
                  )}
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  {t(
                    'J\'aime l\'idée d\'accompagner ma clientèle dans les moments importants de leur vie et de bâtir des relations durables. Je prévois également obtenir prochainement ma certification de planificateur financier. Étant dûment certifié auprès de l\'Autorité des marchés financiers, je vous invite à vérifier la validité de mon certificat auprès de l\'Autorité.',
                    'I like the idea of supporting my clients through important moments in their lives and building lasting relationships. I also plan to obtain my financial planner\'s certification soon. As a certified professional with the Autorité des marchés financiers, I encourage you to confirm the validity of my AMF certification.'
                  )}
                </p>
                <Link
                  to="/book"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-lg shadow-blue-500/30 hover:scale-105"
                  style={{ fontWeight: 600 }}
                >
                  {t('Prendre rendez-vous', 'Book an Appointment')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="py-24 bg-[#080f20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700 }}>
                {t('Parcours professionnel', 'Professional Background')}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    year: '2023',
                    title: t('Cégep Édouard-Montpetit', 'Édouard-Montpetit CEGEP'),
                    desc: t("Obtention du Diplôme d'Étude Collégial en Sciences pures et appliquées.", "College Diploma obtained in Pure and Applied Sciences."),
                  },
                  {
                    year: '2024–25',
                    title: t('Certifications HEC Montréal', 'HEC Montréal Certifications'),
                    desc: t('Deux certificats en gestion obtenus à HEC Montréal (2024 et 2025).', 'Two management certificates obtained at HEC Montréal (2024 and 2025).'),
                  },
                  {
                    year: '2025',
                    title: t('iA Beaugrand', 'iA Beaugrand'),
                    desc: t('Affiliation avec l\'Agence Beaugrand — iA Groupe Financier.', 'Affiliation with Agence Beaugrand — iA Financial Group.'),
                  },
                  {
                    year: '2026',
                    title: t('Représentant en assurance de personnes — AMF', 'Personal Insurance Representative — AMF'),
                    desc: t('Certifié Représentant en assurance de personnes auprès de l\'Autorité des marchés financiers.', 'Certified Personal Insurance Representative with the Autorité des marchés financiers.'),
                  },
                  {
                    year: '2026',
                    title: t('Lancement de Finance Avec Jord', 'Launch of Finance Avec Jord'),
                    desc: t('Création de la marque pour offrir une expérience financière premium et personnalisée.', 'Creation of the brand to offer a premium and personalized financial experience.'),
                  },
                ].map((item) => (
                  <div key={item.year} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#1e5aad]/20 border border-[#1e5aad]/30 flex items-center justify-center text-[#3b82f6] shrink-0" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                        {item.year}
                      </div>
                      <div className="w-px flex-1 bg-white/5 mt-2" />
                    </div>
                    <div className="pb-6">
                      <h4 className="text-white mb-1" style={{ fontWeight: 600 }}>{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700 }}>
                {t('Philosophie financière', 'Financial Philosophy')}
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: t("L'écoute avant tout", 'Listening first'),
                    desc: t("Je prends le temps de comprendre votre situation unique avant de proposer toute solution.", 'I take the time to understand your unique situation before proposing any solution.'),
                  },
                  {
                    title: t('Transparence totale', 'Total transparency'),
                    desc: t("Aucun jargon, aucune surprise — vous comprenez chaque décision prise ensemble.", 'No jargon, no surprises — you understand every decision made together.'),
                  },
                  {
                    title: t('Vision à long terme', 'Long-term vision'),
                    desc: t("Les meilleures décisions financières se construisent avec patience et cohérence.", 'The best financial decisions are built with patience and consistency.'),
                  },
                  {
                    title: t("L'humain au centre", 'People at the center'),
                    desc: t("Vos rêves et vos valeurs guident chaque stratégie que nous élaborons ensemble.", 'Your dreams and values guide every strategy we develop together.'),
                  },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors duration-300">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-[#3b82f6] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white mb-1" style={{ fontWeight: 600 }}>{item.title}</h4>
                        <p className="text-white/50 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-3">{t('Valeurs', 'Values')}</p>
            <h2 className="text-white" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700 }}>
              {t('Ce qui me définit', 'What defines me')}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-white mb-3" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{value.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* iA Affiliation */}
      <section className="py-20 bg-[#080f20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-4">
                  {t('Affiliation officielle', 'Official Affiliation')}
                </p>
                <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700 }}>
                  {t('Affilié avec iA Groupe Financier — Agence Beaugrand', 'Affiliated with iA Financial Group — Agence Beaugrand')}
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  {t(
                    'En tant que conseiller affilié avec l\'Agence Beaugrand — iA Groupe Financier, j\'ai accès à une gamme complète de produits financiers et d\'assurance de premier ordre, ainsi qu\'au soutien d\'une institution de confiance.',
                    'As an advisor affiliated with Agence Beaugrand — iA Financial Group, I have access to a full range of top-tier financial and insurance products, as well as the support of a trusted institution.'
                  )}
                </p>
                <div className="space-y-2 mt-4">
                  <p className="text-white font-semibold">Agence Beaugrand</p>
                  <p className="text-white/50 text-sm">{contact.address}</p>
                  <a
                    href="https://ia.ca/individuals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#3b82f6] text-sm hover:underline mt-1"
                  >
                    ia.ca/individuals →
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-3xl p-10 shadow-2xl">
                    <img src={iaLogo} alt="iA Financial Group" className="h-24 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
