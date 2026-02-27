import { motion } from "motion/react";
import { Award, GraduationCap, Shield, Users, TrendingUp, Heart, Building2 } from "lucide-react";
import advisorPhoto from "figma:asset/3cdfcf1cdb2fbf33290d26acfffac159f4cf8857.png";
import { useLanguage } from "../contexts/LanguageContext";

export function AboutPage() {
  const { t } = useLanguage();
  
  const certifications = t("about.profile.certs") as unknown as string[];

  const values = [
    {
      icon: Shield,
      title: t("about.values.integrity.title"),
      description: t("about.values.integrity.desc"),
    },
    {
      icon: TrendingUp,
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.desc"),
    },
    {
      icon: Heart,
      title: t("about.values.trust.title"),
      description: t("about.values.trust.desc"),
    },
    {
      icon: Users,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.desc"),
    },
  ];

  const affiliations = t("about.affiliations.list") as unknown as string[];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-5" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl tracking-tight mb-6">
              {t("about.hero.title")} <span className="text-[#3B82F6]">{t("about.hero.titleAccent")}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advisor Profile */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Profile Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-card/80 to-card/40 border-2 border-[#3B82F6]/30 shadow-2xl">
                <img 
                  src={advisorPhoto} 
                  alt="Jordan Beaulieu - Senior Insurance Advisor"
                  className="w-full h-full object-cover"
                />
                {/* Decorative Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-[#3B82F6]/20 mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-sm text-muted-foreground">{t("about.badge")}</span>
              </div>

              <h2 className="text-4xl mb-2">{t("about.profile.name")}</h2>
              <p className="text-lg text-[#3B82F6] mb-2">{t("about.profile.title")}</p>
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-4 h-4 text-[#60A5FA]" />
                <p className="text-sm text-[#60A5FA]">{t("about.profile.affiliation")}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("about.profile.bio1")}
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("about.profile.bio2")}
              </p>

              <div>
                <h3 className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
                  {t("about.profile.certifications")}
                </h3>
                <ul className="space-y-2">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 flex-shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-br from-card/30 to-background border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-4">
              {t("about.values.title")} <span className="text-[#3B82F6]">{t("about.values.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#3B82F6]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Affiliations */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-4">
              {t("about.affiliations.title")} <span className="text-[#3B82F6]">{t("about.affiliations.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("about.affiliations.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 backdrop-blur-sm"
          >
            <ul className="space-y-4">
              {affiliations.map((affiliation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{affiliation}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}