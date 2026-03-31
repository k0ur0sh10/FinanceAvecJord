import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePublicSettings } from '../../context/SettingsContext';
import logoImg from '../../../assets/5cd219d9afe328db6196c812cd74b522e89396af.png';
import iaLogo  from '../../../assets/52648954b096a5cd10c0af7265475f74f5228ca8.png';

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.15a8.16 8.16 0 0 0 4.77 1.52V7.22a4.85 4.85 0 0 1-1-.53z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const { contact, social } = usePublicSettings();

  return (
    <footer className="bg-[#040c1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logoImg} alt="Finance Avec Jord" className="h-16 w-auto object-contain mb-6" />
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              {t(
                "Votre partenaire de confiance pour la planification financière, les assurances et les stratégies d'investissement au Québec.",
                'Your trusted partner for financial planning, insurance, and investment strategies in Quebec.'
              )}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { href: social.instagramUrl, Icon: Instagram },
                { href: social.tiktokUrl,    Icon: TikTokIcon },
                { href: social.facebookUrl,  Icon: Facebook },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/80 text-sm uppercase tracking-widest mb-6">{t('Navigation','Navigation')}</h4>
            <ul className="space-y-3">
              {[
                { to:'/',         label: t('Accueil','Home')             },
                { to:'/services', label: t('Services','Services')        },
                { to:'/about',    label: t('À Propos','About')           },
                { to:'/book',     label: t('Prendre RDV','Book')         },
                { to:'/contact',  label: t('Contact','Contact')          },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/80 text-sm uppercase tracking-widest mb-6">{t('Contact','Contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={15} className="text-[#c9a84c] shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors break-all">{contact.email}</a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={15} className="text-[#c9a84c] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-white/30 text-xs mb-3 uppercase tracking-widest">{t('Affilié avec','Affiliated with')}</p>
              <div className="bg-white rounded-xl p-3 inline-block">
                <img src={iaLogo} alt="iA Financial Group" className="h-8 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2026 Finance Avec Jord. {t('Tous droits réservés.','All rights reserved.')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
              {t('Politique de confidentialité','Privacy Policy')}
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
              {t("Conditions d'utilisation",'Terms of Use')}
            </a>
            <Link to="/admin" className="text-white/20 hover:text-white/40 text-xs transition-colors duration-200">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
