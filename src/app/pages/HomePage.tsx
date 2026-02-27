import { motion } from "motion/react";
import { Link } from "react-router";
import { Shield, Award, Users, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function HomePage() {
  const { t } = useLanguage();
  
  const stats = [
    { label: t("home.stats.experience"), value: "25+" },
    { label: t("home.stats.clients"), value: "10,000+" },
    { label: t("home.stats.satisfaction"), value: "98%" },
    { label: t("home.stats.products"), value: "50+" },
  ];

  const features = [
    {
      icon: Shield,
      title: t("home.features.protection.title"),
      description: t("home.features.protection.desc"),
    },
    {
      icon: Award,
      title: t("home.features.expertise.title"),
      description: t("home.features.expertise.desc"),
    },
    {
      icon: Users,
      title: t("home.features.service.title"),
      description: t("home.features.service.desc"),
    },
    {
      icon: TrendingUp,
      title: t("home.features.investment.title"),
      description: t("home.features.investment.desc"),
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#60A5FA] rounded-full blur-3xl opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-[#3B82F6]/20 mb-6 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-sm text-muted-foreground tracking-wide">{t("home.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-7xl tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              {t("home.hero.title1")}
              <br />
              <span className="text-[#3B82F6]">{t("home.hero.title2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl"
            >
              {t("home.hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/booking"
                className="group relative px-8 py-4 bg-[#3B82F6] text-white rounded-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#3B82F6]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("home.hero.cta1")}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/services"
                className="px-8 py-4 bg-card/50 backdrop-blur-sm text-foreground rounded-lg border border-border hover:border-[#3B82F6]/50 transition-all hover:shadow-lg"
              >
                {t("home.hero.cta2")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl mb-2 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-4">
              {t("home.features.title")} <span className="text-[#3B82F6]">{t("home.features.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm hover:border-[#3B82F6]/30 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-[#3B82F6]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-gradient-to-br from-card/50 to-background border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-4">
              {t("home.trust.title")} <span className="text-[#3B82F6]">{t("home.trust.titleAccent")}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t("home.trust.licensed.title"), desc: t("home.trust.licensed.desc") },
              { title: t("home.trust.privacy.title"), desc: t("home.trust.privacy.desc") },
              { title: t("home.trust.fiduciary.title"), desc: t("home.trust.fiduciary.desc") },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-[#3B82F6] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#3B82F6] text-white rounded-lg hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all group"
            >
              {t("home.cta.button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}