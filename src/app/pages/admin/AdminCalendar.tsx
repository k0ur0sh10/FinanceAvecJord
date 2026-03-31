import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, Loader2 } from 'lucide-react';
import { appointmentsApi } from '../../services/api';

const STATUS_COLORS: Record<string, { bg: string; dot: string }> = {
  confirmed: { bg: 'bg-[#1e5aad]/30 border-[#3b82f6]/30 text-[#60a5fa]', dot: 'bg-green-400' },
  pending: { bg: 'bg-[#c9a84c]/15 border-[#c9a84c]/25 text-[#c9a84c]', dot: 'bg-yellow-400' },
  cancelled: { bg: 'bg-red-500/15 border-red-500/25 text-red-400', dot: 'bg-red-400' },
};

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year: number, month: number) { return new Date(year, month, 1).getDay(); }

export default function AdminCalendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  useEffect(() => {
    const month = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    setLoading(true);
    appointmentsApi.getAll({ month })
      .then(data => setAppointments(data.appointments))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentYear, currentMonth]);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
    setSelectedDay(null);
  };

  const getApptForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(a => a.date === dateStr);
  };

  const selectedAppts = selectedDay ? getApptForDay(selectedDay) : [];

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={32} className="text-[#3b82f6] animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Calendrier</h1>
        <p className="text-white/40 text-sm mt-1">Planning des rendez-vous</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-[#060f1e] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"><ChevronLeft size={18} /></button>
            <h2 className="text-white" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{monthNames[currentMonth]} {currentYear}</h2>
            <button onClick={nextMonth} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 mb-3">
            {dayNames.map(d => (<div key={d} className="text-center text-white/30 text-xs py-2 uppercase tracking-wider">{d}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayAppts = getApptForDay(day);
              const isSelected = selectedDay === day;
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              return (
                <motion.button key={day} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  className={`relative flex flex-col items-center justify-start p-2 rounded-xl transition-all duration-200 min-h-[64px] ${
                    isSelected ? 'bg-gradient-to-br from-[#1e5aad]/40 to-[#3b82f6]/20 border border-[#3b82f6]/40'
                    : isToday ? 'border border-[#3b82f6]/30 bg-[#1e5aad]/10'
                    : 'border border-transparent hover:border-white/10 hover:bg-white/5'
                  }`}>
                  <span className={`text-xs mb-1 ${isSelected || isToday ? 'text-white' : 'text-white/60'}`} style={{ fontWeight: isToday ? 700 : 400 }}>{day}</span>
                  {dayAppts.length > 0 && (
                    <>
                      <div className="flex flex-wrap gap-0.5 justify-center">
                        {dayAppts.slice(0, 3).map((a: any, idx: number) => (
                          <div key={idx} className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[a.status]?.dot || 'bg-gray-400'}`} />
                        ))}
                      </div>
                      <span className="text-white/30 mt-0.5" style={{ fontSize: '0.6rem' }}>{dayAppts.length} RDV</span>
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
          <div className="flex items-center gap-6 mt-6 pt-5 border-t border-white/5">
            <div className="flex items-center gap-2 text-white/40 text-xs"><div className="w-2 h-2 rounded-full bg-green-400" />Confirmé</div>
            <div className="flex items-center gap-2 text-white/40 text-xs"><div className="w-2 h-2 rounded-full bg-yellow-400" />En attente</div>
            <div className="flex items-center gap-2 text-white/40 text-xs"><div className="w-2 h-2 rounded-full bg-red-400" />Annulé</div>
          </div>
        </div>

        <div className="bg-[#060f1e] border border-white/8 rounded-2xl p-6">
          {selectedDay ? (
            <>
              <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>{selectedDay} {monthNames[currentMonth]} {currentYear}</h3>
              <p className="text-white/40 text-sm mb-5">{selectedAppts.length === 0 ? 'Aucun rendez-vous' : `${selectedAppts.length} rendez-vous`}</p>
              {selectedAppts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3"><Clock size={20} className="text-white/20" /></div>
                  <p className="text-white/30 text-sm">Journée disponible</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedAppts.sort((a: any, b: any) => a.time.localeCompare(b.time)).map((appt: any) => (
                    <motion.div key={appt.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className={`p-4 rounded-xl border ${STATUS_COLORS[appt.status]?.bg || ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><Clock size={13} /><span className="text-sm" style={{ fontWeight: 600 }}>{appt.time}</span></div>
                        <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[appt.status]?.dot || ''}`} />
                      </div>
                      <p className="text-white" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{appt.client}</p>
                      <p className="text-white/50 text-xs mt-0.5">{appt.service}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-48 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3"><Clock size={20} className="text-white/20" /></div>
              <p className="text-white/40 text-sm">Sélectionnez une date</p>
              <p className="text-white/20 text-xs mt-1">pour voir les rendez-vous</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
