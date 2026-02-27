import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/5cd219d9afe328db6196c812cd74b522e89396af.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="mb-4">
              <img
                src={logo}
                alt="Finance Avec Jordi"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-wide text-foreground mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
                >
                  {t("nav.booking")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm tracking-wide text-foreground mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                {t("footer.servicesList.life")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("footer.servicesList.health")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("footer.servicesList.business")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("footer.servicesList.wealth")}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-wide text-foreground mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
                <span className="break-all">contact@financeavecjordi.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                <span>
                  123 Luxury Plaza, Suite 800
                  <br />
                  Montréal, QC H3B 2Y5
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link
              to="#"
              className="text-xs sm:text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="#"
              className="text-xs sm:text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
            >
              {t("footer.terms")}
            </Link>
            <Link
              to="#"
              className="text-xs sm:text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
            >
              {t("footer.legal")}
            </Link>
            <Link
              to="/admin"
              className="text-xs sm:text-sm text-muted-foreground hover:text-[#3B82F6] transition-colors"
            >
              {t("nav.admin")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}