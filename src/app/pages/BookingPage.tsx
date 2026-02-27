import { motion } from "motion/react";
import { useState } from "react";
import { Calendar, Clock, Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

export function BookingPage() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    insuranceType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const insuranceTypes = [
    t("booking.insuranceTypes.life"),
    t("booking.insuranceTypes.health"),
    t("booking.insuranceTypes.auto"),
    t("booking.insuranceTypes.home"),
    t("booking.insuranceTypes.business"),
    t("booking.insuranceTypes.investment"),
    t("booking.insuranceTypes.general"),
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing appointments
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    
    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      clientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      insuranceType: formData.insuranceType,
      date: formData.preferredDate,
      time: formData.preferredTime,
      notes: formData.notes,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    
    setIsSubmitted(true);
    toast.success("Appointment booked successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-[#3B82F6]/30 backdrop-blur-sm"
          >
            <div className="w-20 h-20 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#3B82F6]" />
            </div>
            <h2 className="text-4xl mb-4">{t("booking.confirmation.title")}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("booking.confirmation.message")} <span className="text-[#3B82F6]">{formData.email}</span>.
            </p>
            <div className="space-y-3 mb-8 text-left bg-background/50 p-6 rounded-xl">
              <p className="text-sm font-semibold mb-3">{t("booking.confirmation.details")}</p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("booking.confirmation.name")}</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("booking.confirmation.date")}</span>
                <span>{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("booking.confirmation.time")}</span>
                <span>{formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("booking.confirmation.type")}</span>
                <span>{formData.insuranceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("booking.confirmation.email")}</span>
                <span>{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("booking.confirmation.phone")}</span>
                <span>{formData.phone}</span>
              </div>
            </div>
            <div className="mb-8 p-4 bg-background/50 rounded-lg">
              <p className="text-sm font-semibold mb-3">{t("booking.confirmation.next")}</p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                  <span>{t("booking.confirmation.step1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                  <span>{t("booking.confirmation.step2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
                  <span>{t("booking.confirmation.step3")}</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    insuranceType: "",
                    preferredDate: "",
                    preferredTime: "",
                    notes: "",
                  });
                }}
                className="px-8 py-3 bg-[#3B82F6] text-white rounded-lg hover:shadow-xl transition-all"
              >
                {t("booking.confirmation.backButton")}
              </button>
              <button
                onClick={() => window.location.href = "/"}
                className="px-8 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-accent transition-all"
              >
                {t("booking.confirmation.homeButton")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-5" />
        
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-[#3B82F6]/20 mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm text-muted-foreground">{t("booking.confirmationBadge")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl tracking-tight mb-6">
              {t("booking.hero.title")} <span className="text-[#3B82F6]">{t("booking.hero.titleAccent")}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("booking.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Calendar, title: t("booking.benefits.flexible.title"), desc: t("booking.benefits.flexible.desc") },
              { icon: Clock, title: t("booking.benefits.expert.title"), desc: t("booking.benefits.expert.desc") },
              { icon: Shield, title: t("booking.benefits.consultation.title"), desc: t("booking.benefits.consultation.desc") },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card/30 border border-border/50"
              >
                <item.icon className="w-8 h-8 text-[#3B82F6] mx-auto mb-3" />
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm">{t("booking.form.name")} *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                  placeholder={t("booking.form.namePlaceholder")}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">{t("booking.form.email")} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                    placeholder={t("booking.form.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t("booking.form.phone")} *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                    placeholder={t("booking.form.phonePlaceholder")}
                  />
                </div>
              </div>

              {/* Insurance Type */}
              <div>
                <label className="block mb-2 text-sm">{t("booking.form.insuranceType")} *</label>
                <select
                  name="insuranceType"
                  required
                  value={formData.insuranceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                >
                  <option value="">{t("booking.form.insuranceTypePlaceholder")}</option>
                  {insuranceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">{t("booking.form.date")} *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">{t("booking.form.time")} *</label>
                  <select
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-foreground"
                  >
                    <option value="">{t("booking.form.timePlaceholder")}</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block mb-2 text-sm">{t("booking.form.notes")}</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all resize-none text-foreground"
                  placeholder={t("booking.form.notesPlaceholder")}
                />
              </div>

              {/* Privacy Notice */}
              <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 inline mr-2 text-[#3B82F6]" />
                  {t("booking.form.privacy")}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#3B82F6] text-white rounded-lg hover:shadow-xl hover:shadow-[#3B82F6]/20 transition-all"
              >
                {t("booking.form.submit")}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}