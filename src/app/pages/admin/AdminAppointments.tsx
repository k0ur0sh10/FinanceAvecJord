import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Search, Pencil, Trash2, X, User, Calendar, Clock,
  Video, Loader2, AlertCircle, UserCheck, CheckCircle2
} from 'lucide-react';
import { appointmentsApi } from '../../services/api';

interface Appointment {
  id: number; clientId: number | null; client: string; email: string; phone: string;
  date: string; time: string; service: string; notes: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  teamsLink: string; isConverted: boolean; convertedAt: string | null;
}

const SERVICES = [
  'Planification financière', "Solutions d'assurance", "Stratégies d'investissement",
  'Planification retraite', 'Protection du patrimoine', "Stratégies d'épargne", 'Autre',
];
const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
];
const STATUS_LABELS: Record<string, string> = { confirmed:'Confirmé', pending:'En attente', cancelled:'Annulé' };
const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

// ─── Modal ─────────────────────────────────────────────────────────────────
function AppointmentModal({ appt, onClose, onSave }: {
  appt: Partial<Appointment> | null; onClose: () => void;
  onSave: (a: any) => Promise<void>;
}) {
  const isEdit = !!(appt as any)?.id;
  const [form, setForm] = useState<Partial<Appointment>>(
    appt ?? { client:'',email:'',phone:'',date:'',time:'',service:'',notes:'',status:'pending',teamsLink:'' }
  );
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  const f = (k: keyof Appointment, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.client?.trim() || !form.date || !form.time) {
      setError('Nom du client, date et heure sont obligatoires.'); return;
    }
    setError(''); setSaving(true);
    try { await onSave(form); }
    catch (err: any) { setError(err.message || 'Erreur lors de la sauvegarde'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity:0, scale:0.95, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
        className="relative bg-[#0a1628] border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold">{isEdit ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"><X size={18}/></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Nom du client *</label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input type="text" value={form.client||''} onChange={e=>f('client',e.target.value)} placeholder="Marie Dubois"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{k:'email' as const,l:'Email',t:'email',ph:'client@exemple.com'},{k:'phone' as const,l:'Téléphone',t:'tel',ph:'514-555-0123'}].map(({k,l,t,ph})=>(
              <div key={k}>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">{l}</label>
                <input type={t} value={(form as any)[k]||''} onChange={e=>f(k,e.target.value)} placeholder={ph}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Date *</label>
              <input type="date" value={form.date||''} onChange={e=>f('date',e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3b82f6]/50 outline-none text-sm" style={{colorScheme:'dark'}} />
            </div>
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Heure *</label>
              <select value={form.time||''} onChange={e=>f('time',e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3b82f6]/50 outline-none text-sm" style={{colorScheme:'dark'}}>
                <option value="">Choisir…</option>
                {TIME_SLOTS.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Service</label>
            <select value={form.service||''} onChange={e=>f('service',e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3b82f6]/50 outline-none text-sm" style={{colorScheme:'dark'}}>
              <option value="">Choisir…</option>
              {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Statut</label>
            <select value={form.status||'pending'} onChange={e=>f('status',e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3b82f6]/50 outline-none text-sm" style={{colorScheme:'dark'}}>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5"><Video size={12}/>Lien Microsoft Teams</label>
            <input type="url" value={form.teamsLink||''} onChange={e=>f('teamsLink',e.target.value)} placeholder="https://teams.microsoft.com/l/meetup-join/…"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Notes internes</label>
            <textarea rows={3} value={form.notes||''} onChange={e=>f('notes',e.target.value)} placeholder="Notes visibles uniquement dans l'administration…"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm resize-none" />
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <AlertCircle size={15} className="shrink-0"/> {error}
          </div>
        )}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all text-sm">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm disabled:opacity-50 flex items-center justify-center gap-2 font-semibold">
            {saving && <Loader2 size={14} className="animate-spin"/>} Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Convert confirmation dialog ──────────────────────────────────────────
function ConvertModal({ appt, onClose, onConfirm }: {
  appt: Appointment; onClose: () => void; onConfirm: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const handle = async () => { setLoading(true); await onConfirm(); setLoading(false); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
        className="relative bg-[#0a1628] border border-white/10 rounded-2xl p-6 max-w-sm w-full z-10 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 flex items-center justify-center mx-auto mb-4">
          <UserCheck size={26} className="text-[#a78bfa]" />
        </div>
        <h3 className="text-white mb-2 font-semibold">Marquer comme client converti ?</h3>
        <p className="text-white/50 text-sm mb-2">
          <strong className="text-white">{appt.client}</strong>
        </p>
        <p className="text-white/40 text-xs mb-6">
          Cela confirmera le RDV, créera automatiquement une fiche client et mettra à jour le taux de conversion.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white text-sm transition-all">Annuler</button>
          <button onClick={handle} disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-[#a78bfa] hover:bg-[#8b5cf6]/30 text-sm transition-all flex items-center justify-center gap-2 font-semibold">
            {loading ? <Loader2 size={14} className="animate-spin"/> : <UserCheck size={14}/>} Convertir
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading,       setLoading]      = useState(true);
  const [search,        setSearch]       = useState('');
  const [statusFilter,  setStatusFilter] = useState('');
  const [modal,         setModal]        = useState<'create'|'edit'|null>(null);
  const [selected,      setSelected]     = useState<Appointment|null>(null);
  const [deleteConfirm, setDeleteConfirm]= useState<number|null>(null);
  const [deleteLoading, setDeleteLoading]= useState(false);
  const [convertTarget, setConvertTarget]= useState<Appointment|null>(null);

  const fetch = useCallback((q?: string, s?: string) => {
    setLoading(true);
    appointmentsApi.getAll({ search: q, status: s })
      .then(d => setAppointments(d.appointments))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  useEffect(() => { const t = setTimeout(() => fetch(search, statusFilter), 300); return () => clearTimeout(t); }, [search, statusFilter, fetch]);

  const handleSave = async (form: any) => {
    if (form.id) await appointmentsApi.update(form.id, form);
    else         await appointmentsApi.create(form);
    fetch(search, statusFilter);
    setModal(null); setSelected(null);
  };

  const handleDelete = async (id: number) => {
    setDeleteLoading(true);
    try { await appointmentsApi.delete(id); fetch(search, statusFilter); setDeleteConfirm(null); }
    catch (e) { console.error(e); }
    finally { setDeleteLoading(false); }
  };

  const handleConvert = async () => {
    if (!convertTarget) return;
    try {
      await appointmentsApi.convert(convertTarget.id);
      fetch(search, statusFilter);
      setConvertTarget(null);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white" style={{ fontSize:'1.5rem', fontWeight:700 }}>Rendez-vous</h1>
          <p className="text-white/40 text-sm mt-1">{appointments.length} rendez-vous</p>
        </div>
        <button onClick={() => { setSelected(null); setModal('create'); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm hover:from-[#2563eb] hover:to-[#60a5fa] transition-all font-semibold">
          <Plus size={16}/> Nouveau RDV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"/>
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#3b82f6]/50 outline-none text-sm" />
        </div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#3b82f6]/50 outline-none text-sm" style={{colorScheme:'dark'}}>
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmé</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>

      <div className="bg-[#060f1e] border border-white/8 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><Loader2 size={24} className="text-[#3b82f6] animate-spin"/></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Client','Date & Heure','Service','Statut','Converti','Actions'].map((h,i)=>(
                    <th key={h} className={`text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider ${i===1?'hidden sm:table-cell':i===2?'hidden lg:table-cell':i===4?'hidden md:table-cell':i===5?'text-right':''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map(appt => (
                  <motion.tr key={appt.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e5aad]/30 to-[#3b82f6]/20 border border-[#3b82f6]/20 flex items-center justify-center text-white text-xs shrink-0 font-bold">
                          {appt.client.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{appt.client}</p>
                          <p className="text-white/40 text-xs truncate">{appt.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-white/70 text-sm">{new Date(appt.date+'T12:00:00').toLocaleDateString('fr-CA',{weekday:'short',day:'numeric',month:'short'})}</p>
                      <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5"><Clock size={10}/>{appt.time}</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell"><p className="text-white/60 text-sm">{appt.service||'—'}</p></td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs border ${STATUS_COLORS[appt.status]}`}>{STATUS_LABELS[appt.status]}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {appt.isConverted ? (
                        <span className="flex items-center gap-1 text-[#a78bfa] text-xs">
                          <CheckCircle2 size={13}/> Client
                        </span>
                      ) : appt.clientId ? (
                        <span className="text-white/25 text-xs">Déjà client</span>
                      ) : (
                        <button onClick={() => setConvertTarget(appt)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-xs hover:bg-[#8b5cf6]/20 transition-all">
                          <UserCheck size={12}/> Convertir
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {appt.teamsLink && (
                          <a href={appt.teamsLink} target="_blank" rel="noopener noreferrer"
                            className="p-2 rounded-lg text-[#60a5fa] hover:bg-white/10 transition-all" title="Rejoindre Teams">
                            <Video size={15}/>
                          </a>
                        )}
                        <button onClick={() => { setSelected(appt); setModal('edit'); }}
                          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Pencil size={15}/></button>
                        <button onClick={() => setDeleteConfirm(appt.id)}
                          className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={15}/></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && appointments.length === 0 && (
          <div className="py-16 text-center"><Calendar size={40} className="text-white/10 mx-auto mb-3"/><p className="text-white/30 text-sm">Aucun rendez-vous trouvé</p></div>
        )}
      </div>

      <AnimatePresence>
        {(modal === 'create' || modal === 'edit') && (
          <AppointmentModal appt={modal==='edit'?selected:null} onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
        )}
        {convertTarget && (
          <ConvertModal appt={convertTarget} onClose={() => setConvertTarget(null)} onConfirm={handleConvert} />
        )}
        {deleteConfirm !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setDeleteConfirm(null)}/>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} className="relative bg-[#0a1628] border border-white/10 rounded-2xl p-6 max-w-sm w-full z-10 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4"><Trash2 size={20} className="text-red-400"/></div>
              <h3 className="text-white mb-2 font-semibold">Supprimer ce rendez-vous ?</h3>
              <p className="text-white/50 text-sm mb-6">Cette action est irréversible.</p>
              <div className="flex gap-3">
                <button onClick={()=>setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white text-sm transition-all">Annuler</button>
                <button onClick={()=>handleDelete(deleteConfirm!)} disabled={deleteLoading}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 text-sm transition-all flex items-center justify-center gap-2 font-semibold">
                  {deleteLoading&&<Loader2 size={13} className="animate-spin"/>} Supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
