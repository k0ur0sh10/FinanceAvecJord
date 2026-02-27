import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

export function ContactPage() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Message sent successfully!");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.info.phone.title"),
      details: [t("contact.info.phone.value"), "Mon-Fri, 9AM-6PM EST"],
    },
    {
      icon: Mail,
      title: t("contact.info.email.title"),
      details: [t("contact.info.email.value"), "24h response time"],
    },
    {
      icon: MapPin,
      title: t("contact.info.location.title"),
      details: t("contact.info.location.value").split("\n"),
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: By Appointment"],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-5" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl tracking-tight mb-6">
              {t("contact.hero.title")} <span className="text-[#3B82F6]">{t("contact.hero.titleAccent")}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("contact.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-[#3B82F6]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-2xl mb-3">{t("contact.confirmation.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("contact.confirmation.subtitle")}
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl mb-3">{t("contact.form.title")}</h2>
                    <p className="text-muted-foreground">
                      {t("contact.hero.subtitle")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm">{t("contact.form.name")} *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                          placeholder={t("contact.form.namePlaceholder")}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">{t("contact.form.email")} *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm">{t("contact.form.phone")}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                          placeholder={t("contact.form.phonePlaceholder")}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">{t("contact.form.subject")} *</label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                          placeholder={t("contact.form.subjectPlaceholder")}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block mb-2 text-sm">{t("contact.form.message")} *</label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all resize-none text-foreground"
                        placeholder={t("contact.form.messagePlaceholder")}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#3B82F6] text-white rounded-lg hover:shadow-xl hover:shadow-[#3B82F6]/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      {t("contact.form.submit")}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Private Consultation CTA */}
      <section className="py-24 border-t border-border/50 bg-gradient-to-br from-card/30 to-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
              {t("contact.cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t("contact.cta.subtitle")}
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#3B82F6] text-white rounded-lg hover:shadow-2xl hover:shadow-[#3B82F6]/20 transition-all"
            >
              {t("contact.cta.button")}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}