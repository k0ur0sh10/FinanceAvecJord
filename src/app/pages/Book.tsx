import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Clock, CheckCircle, ArrowRight,
  Phone, Mail, Loader2, Video, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePublicSettings } from '../context/SettingsContext';
import { appointmentsApi } from '../services/api';

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }

export default function BookPage() {
  const { t, lang }  = useLanguage();
  const { contact, services: ctxServices } = usePublicSettings();
  const today = new Date();

  const [currentMonth, setCurrentMonth]     = useState(today.getMonth());
  const [currentYear,  setCurrentYear]      = useState(today.getFullYear());
  const [selectedDate, setSelectedDate]     = useState<number | null>(null);
  const [selectedTime, setSelectedTime]     = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading,  setSlotsLoading]    = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookError,  setBookError]  = useState('');

  // Services from admin settings + "Autre" at the end
  const serviceOptions = [...ctxServices.map(s => s.name), 'Autre'];

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay    = getFirstDayOfMonth(currentYear, currentMonth);

  const monthNames = lang === 'fr'
    ? ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = lang === 'fr'
    ? ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Fetch available slots when a date is selected
  useEffect(() => {
    if (selectedDate === null) return;
    const ds = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    setSlotsLoading(true);
    setSelectedTime(null);
    appointmentsApi.getAvailableSlots(ds)
      .then(d => setAvailableSlots(d.slots || []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [selectedDate, currentMonth, currentYear]);

  const isAtMinMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();
  const isPastDay    = (d: number) => { const t2 = new Date(); t2.setHours(0, 0, 0, 0); return new Date(currentYear, currentMonth, d) < t2; };
  // Weekend days are allowed if admin has configured availability for them
  const isWeekend    = (_d: number) => false;

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setBookError(''); setSubmitting(true);
    try {
      const ds = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      await appointmentsApi.book({
        name: formData.name, email: formData.email, phone: formData.phone,
        date: ds, time: selectedTime, service: formData.service, message: formData.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setBookError(err.message || t('Erreur lors de la réservation', 'Booking error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#060f1e] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-4">{t('Réservation', 'Booking')}</p>
          <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
            {t('Planifiez votre consultation', 'Schedule Your Consultation')}
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t(
              'Choisissez un moment qui vous convient. La consultation initiale est gratuite et sans engagement.',
              'Choose a time that suits you. The initial consultation is free and without commitment.'
            )}
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              <CheckCircle size={14} /> {t('100% Gratuit', '100% Free')}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e5aad]/15 border border-[#3b82f6]/20 text-[#60a5fa] text-sm">
              <Video size={14} /> {t('En personne ou en ligne', 'In-person or online')}
            </span>
          </div>
        </motion.div>

        {/* Submitted success */}
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center">
            <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-12">
              <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={36} className="text-green-400" />
              </div>
              <h2 className="text-white mb-3 font-bold" style={{ fontSize: '1.5rem' }}>
                {t('Consultation réservée !', 'Consultation booked!')}
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                {t(
                  'Jordan vous contactera sous peu pour confirmer votre rendez-vous. Vérifiez votre courriel pour la confirmation.',
                  'Jordan will contact you shortly to confirm. Check your email for the confirmation.'
                )}
              </p>
              <div className="flex flex-col gap-3">
                <a href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
                  <Phone size={16} /> {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm">
                  <Mail size={16} /> {contact.email}
                </a>
              </div>
            </div>
          </motion.div>

        ) : (
          /* Booking form */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Calendar */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="bg-white/[0.03] border border-white/8 rounded-3xl p-6">

              {/* Month nav */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} disabled={isAtMinMonth}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft size={18} />
                </button>
                <h3 className="text-white font-semibold">{monthNames[currentMonth]} {currentYear}</h3>
                <button onClick={nextMonth}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {dayNames.map(d => (
                  <div key={d} className="text-center text-white/30 text-xs py-2 uppercase tracking-wider">{d}</div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day      = i + 1;
                  const disabled = isPastDay(day) || isWeekend(day);
                  const selected = selectedDate === day;
                  const isToday  = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  return (
                    <button key={day} disabled={disabled} onClick={() => setSelectedDate(selected ? null : day)}
                      className={`h-10 w-full rounded-xl text-sm transition-all duration-150 ${
                        disabled  ? 'text-white/15 cursor-not-allowed' :
                        selected  ? 'bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] text-white shadow-lg shadow-blue-500/30 font-semibold' :
                        isToday   ? 'border border-[#3b82f6]/40 text-white hover:bg-white/5' :
                                    'text-white/70 hover:bg-white/8 hover:text-white'
                      }`}>
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              {selectedDate !== null && (
                <motion.div key={`slots-${selectedDate}-${currentMonth}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-5 border-t border-white/8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} className="text-[#c9a84c]" />
                    <p className="text-white/60 text-sm">
                      {t('Créneaux disponibles', 'Available slots')} — {selectedDate} {monthNames[currentMonth]}
                    </p>
                  </div>
                  {slotsLoading ? (
                    <div className="flex justify-center py-6">
                      <Loader2 size={20} className="text-[#3b82f6] animate-spin" />
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <p className="text-white/30 text-sm text-center py-4 bg-white/[0.02] rounded-xl">
                      {t('Aucun créneau disponible ce jour', 'No slots available this day')}
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map(slot => (
                        <button key={slot} onClick={() => setSelectedTime(selectedTime === slot ? null : slot)}
                          className={`py-2.5 rounded-xl text-sm transition-all duration-150 ${
                            selectedTime === slot
                              ? 'bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white shadow-md shadow-blue-500/25 font-semibold'
                              : 'bg-white/5 border border-white/10 text-white/60 hover:border-[#3b82f6]/40 hover:text-white'
                          }`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/[0.03] border border-white/8 rounded-3xl p-6">
              <h3 className="text-white mb-6 font-semibold">{t('Vos informations', 'Your information')}</h3>

              {/* Selected slot summary */}
              {selectedDate && selectedTime && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-4 rounded-2xl bg-[#1e5aad]/15 border border-[#3b82f6]/25 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1e5aad]/30 border border-[#3b82f6]/30 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-[#60a5fa]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{selectedDate} {monthNames[currentMonth]} {currentYear}</p>
                    <p className="text-white/50 text-xs mt-0.5">{selectedTime}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { k: 'name',  label: t('Nom complet *', 'Full name *'),  type: 'text',  ph: 'Jean Tremblay'     },
                  { k: 'email', label: t('Courriel *', 'Email *'),          type: 'email', ph: 'jean@exemple.com'  },
                  { k: 'phone', label: t('Téléphone', 'Phone'),             type: 'tel',   ph: '514-555-0123'      },
                ].map(({ k, label, type, ph }) => (
                  <div key={k}>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">{label}</label>
                    <input type={type} required={label.includes('*')}
                      value={(formData as any)[k]}
                      onChange={e => setFormData(p => ({ ...p, [k]: e.target.value }))}
                      placeholder={ph}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none transition-all text-sm" />
                  </div>
                ))}

                {/* Service — from admin settings */}
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">
                    {t('Service souhaité', 'Desired service')}
                  </label>
                  <select value={formData.service}
                    onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3b82f6]/50 outline-none transition-all text-sm"
                    style={{ colorScheme: 'dark' }}>
                    <option value="">{t('Choisir…', 'Select…')}</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">
                    {t('Message (optionnel)', 'Message (optional)')}
                  </label>
                  <textarea rows={3} value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder={t('Décrivez votre besoin financier…', 'Describe your financial need…')}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none transition-all text-sm resize-none" />
                </div>

                {bookError && (
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{bookError}</p>
                )}

                <button type="submit"
                  disabled={!selectedDate || !selectedTime || !formData.name.trim() || !formData.email.trim() || submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-xl shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-semibold">
                  {submitting
                    ? <Loader2 size={18} className="animate-spin" />
                    : <>{t('Confirmer la consultation', 'Confirm consultation')} <ArrowRight size={16} /></>
                  }
                </button>

                {(!selectedDate || !selectedTime) && (
                  <p className="text-white/25 text-xs text-center">
                    {t('Sélectionnez une date et une heure pour continuer', 'Select a date and time to continue')}
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
