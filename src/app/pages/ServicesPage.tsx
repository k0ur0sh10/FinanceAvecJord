import { motion } from "motion/react";
import { Link } from "react-router";
import { 
  Heart, 
  Car, 
  Home, 
  Briefcase, 
  TrendingUp, 
  Shield,
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ServicesPage() {
  const { t } = useLanguage();
  
  const products = [
    {
      icon: Heart,
      title: t("services.products.life.title"),
      description: t("services.products.life.desc"),
      features: t("services.products.life.features") as unknown as string[],
      color: "#60A5FA",
    },
    {
      icon: Shield,
      title: t("services.products.health.title"),
      description: t("services.products.health.desc"),
      features: t("services.products.health.features") as unknown as string[],
      color: "#60A5FA",
    },
    {
      icon: Car,
      title: t("services.products.auto.title"),
      description: t("services.products.auto.desc"),
      features: t("services.products.auto.features") as unknown as string[],
      color: "#3B82F6",
    },
    {
      icon: Home,
      title: t("services.products.home.title"),
      description: t("services.products.home.desc"),
      features: t("services.products.home.features") as unknown as string[],
      color: "#93C5FD",
    },
    {
      icon: Briefcase,
      title: t("services.products.business.title"),
      description: t("services.products.business.desc"),
      features: t("services.products.business.features") as unknown as string[],
      color: "#60A5FA",
    },
    {
      icon: TrendingUp,
      title: t("services.products.wealth.title"),
      description: t("services.products.wealth.desc"),
      features: t("services.products.wealth.features") as unknown as string[],
      color: "#3B82F6",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl tracking-tight mb-6">
              {t("services.hero.title")} <span className="text-[#3B82F6]">{t("services.hero.titleAccent")}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("services.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm hover:border-[#3B82F6]/30 transition-all duration-300">
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${product.color}15, transparent 70%)`,
                    }}
                  />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <product.icon 
                        className="w-7 h-7" 
                        style={{ color: product.color }}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl mb-3">{product.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: product.color }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 text-sm transition-all group/link"
                      style={{ color: product.color }}
                    >
                      {t("services.learnMore")}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/50 bg-gradient-to-br from-card/30 to-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
              {t("services.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("services.cta.subtitle")}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#3B82F6] text-white rounded-lg hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all group"
            >
              {t("services.cta.button")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}