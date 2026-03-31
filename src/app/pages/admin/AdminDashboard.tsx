import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  Users, Calendar, MessageSquare, TrendingUp,
  ArrowUpRight, ArrowDownRight, Clock, ArrowRight, Loader2, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import { dashboardApi } from '../../services/api';

// ─── Month selector helpers ────────────────────────────────────────────────
const MONTH_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

function toYM(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}
function fromYM(ym: string): { year: number; month: number } {
  const [y, m] = ym.split('-').map(Number);
  return { year: y, month: m };
}
function prevYM(ym: string): string {
  const { year, month } = fromYM(ym);
  return month === 1 ? toYM(year - 1, 12) : toYM(year, month - 1);
}
function nextYM(ym: string): string {
  const { year, month } = fromYM(ym);
  return month === 12 ? toYM(year + 1, 1) : toYM(year, month + 1);
}
function ymLabel(ym: string): string {
  const { year, month } = fromYM(ym);
  return `${MONTH_FR[month - 1]} ${year}`;
}

function MonthPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(prevYM(value))}
        className="p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all">
        <ChevronLeft size={14} />
      </button>
      <span className="text-white/50 text-xs min-w-[110px] text-center">{ymLabel(value)}</span>
      <button onClick={() => onChange(nextYM(value))}
        className="p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, change, color }: {
  icon: any; label: string; value: string; change: string; color: string
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const isPos  = !change.startsWith('-');
  const isNeu  = change === '0%' || change === 'Nouveaux';
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-[#060f1e] border border-white/8 rounded-2xl p-6 relative overflow-hidden group hover:border-white/15 transition-all duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: color }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <span className={`flex items-center gap-1 text-xs ${isNeu ? 'text-white/40' : isPos ? 'text-green-400' : 'text-red-400'}`}>
          {!isNeu && (isPos ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />)}
          {change}
        </span>
      </div>
      <p className="text-white text-2xl mb-1 font-bold">{value}</p>
      <p className="text-white/40 text-sm">{label}</p>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const today = new Date();
  const currentYM = toYM(today.getFullYear(), today.getMonth() + 1);

  const [data,         setData]         = useState<any>(null);
  const [loading,      setLoading]      = useState(true);
  const [statsEnd,     setStatsEnd]     = useState(currentYM);
  const [serviceMonth, setServiceMonth] = useState(currentYM);

  const fetchData = useCallback((se: string, sm: string) => {
    setLoading(true);
    dashboardApi.get({ statsEnd: se, serviceMonth: sm })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchData(statsEnd, serviceMonth); }, [fetchData, statsEnd, serviceMonth]);

  const handleStatsEndChange = (v: string) => {
    setStatsEnd(v);
  };
  const handleServiceMonthChange = (v: string) => {
    setServiceMonth(v);
  };

  if (loading && !data) {
    return <div className="flex items-center justify-center h-64"><Loader2 size={32} className="text-[#3b82f6] animate-spin" /></div>;
  }

  const stats      = data?.stats || {};
  const dayNames   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Tableau de bord</h1>
          <p className="text-white/40 text-sm mt-1">
            {dayNames[today.getDay()]} {today.getDate()} {monthNames[today.getMonth()]} {today.getFullYear()}
          </p>
        </div>
        <Link to="/admin/appointments"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm hover:from-[#2563eb] hover:to-[#60a5fa] transition-all font-semibold">
          <Calendar size={16} /> Nouveau RDV
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}        label="Clients totaux"      value={String(stats.totalClients   ?? 0)} change={stats.clientsChange  || '0%'}    color="#3b82f6" />
        <StatCard icon={Calendar}     label="RDV ce mois"         value={String(stats.apptsThisMonth ?? 0)} change={stats.apptsChange    || '0%'}    color="#c9a84c" />
        <StatCard icon={MessageSquare}label="Messages non lus"    value={String(stats.unreadMessages ?? 0)} change="Nouveaux"                          color="#10b981" />
        <StatCard icon={TrendingUp}   label="Taux de conversion"  value={`${stats.conversionRate    ?? 0}%`} change={`${stats.totalConverted ?? 0} convertis`} color="#8b5cf6" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Area chart — 12 months */}
        <div className="lg:col-span-2 bg-[#060f1e] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h3 className="text-white font-semibold">Statistiques mensuelles</h3>
              <p className="text-white/40 text-sm mt-0.5">Réservations, conversions et nouveaux clients</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MonthPicker value={statsEnd} onChange={handleStatsEndChange} />
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-white/50"><span className="w-3 h-3 rounded-full bg-[#3b82f6] inline-block"/>RDV</span>
                <span className="flex items-center gap-1.5 text-white/50"><span className="w-3 h-3 rounded-full bg-[#8b5cf6] inline-block"/>Conversions</span>
                <span className="flex items-center gap-1.5 text-white/50"><span className="w-3 h-3 rounded-full bg-[#c9a84c] inline-block"/>Clients</span>
              </div>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.monthlyStats || []}>
                <defs>
                  <linearGradient id="gBook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCli" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#c9a84c" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '12px' }} />
                <Area type="monotone" dataKey="bookings"    stroke="#3b82f6" fill="url(#gBook)" strokeWidth={2} dot={false} name="RDV" />
                <Area type="monotone" dataKey="conversions" stroke="#8b5cf6" fill="url(#gConv)" strokeWidth={2} dot={false} name="Conversions" />
                <Area type="monotone" dataKey="clients"     stroke="#c9a84c" fill="url(#gCli)"  strokeWidth={2} dot={false} name="Clients" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart — RDV by service */}
        <div className="bg-[#060f1e] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
            <h3 className="text-white font-semibold">RDV par service</h3>
          </div>
          <div className="mb-4">
            <MonthPicker value={serviceMonth} onChange={handleServiceMonthChange} />
          </div>
          <div className="h-52">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={20} className="text-[#3b82f6] animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={data?.serviceStats || []} margin={{ left: 0, right: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '12px' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} name="RDV" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          {!loading && (data?.serviceStats?.[0]?.name === 'Aucun') && (
            <p className="text-white/30 text-xs text-center mt-2">Aucun RDV ce mois</p>
          )}
        </div>
      </div>

      {/* Upcoming + Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-[#060f1e] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Prochains rendez-vous</h3>
            <Link to="/admin/appointments" className="text-[#3b82f6] text-xs hover:underline flex items-center gap-1">Voir tout <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {(data?.upcomingAppointments || []).map((apt: any) => (
              <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#1e5aad]/20 border border-[#1e5aad]/20 flex items-center justify-center text-white text-sm shrink-0 font-bold">
                  {apt.client.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate font-medium">{apt.client}</p>
                  <p className="text-white/40 text-xs truncate">{apt.service || 'Consultation'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white/70 text-xs">{new Date(apt.date + 'T12:00:00').toLocaleDateString('fr-CA', { weekday:'short', day:'numeric', month:'short' })}</p>
                  <p className="text-white/40 text-xs flex items-center gap-1 justify-end mt-0.5"><Clock size={10}/>{apt.time}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${apt.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                    {apt.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </span>
                  {apt.isConverted && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20">Client ✓</span>
                  )}
                </div>
              </div>
            ))}
            {(!data?.upcomingAppointments?.length) && (
              <p className="text-white/30 text-sm text-center py-8">Aucun rendez-vous à venir</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#060f1e] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Messages récents</h3>
            <Link to="/admin/messages" className="text-[#3b82f6] text-xs hover:underline flex items-center gap-1">Voir tout <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {(data?.recentMessages || []).map((msg: any, i: number) => (
              <Link key={i} to="/admin/messages"
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e5aad]/30 to-[#3b82f6]/20 border border-[#3b82f6]/20 flex items-center justify-center text-white text-xs shrink-0 font-bold">
                  {msg.from[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-xs truncate" style={{ fontWeight: msg.unread ? 600 : 400 }}>{msg.from}</p>
                    <p className="text-white/30 text-xs shrink-0 ml-2">{msg.time}</p>
                  </div>
                  <p className="text-white/40 text-xs truncate mt-0.5">{msg.preview}</p>
                </div>
                {msg.unread && <div className="w-2 h-2 rounded-full bg-[#3b82f6] shrink-0 mt-1" />}
              </Link>
            ))}
            {(!data?.recentMessages?.length) && (
              <p className="text-white/30 text-sm text-center py-8">Aucun message récent</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
