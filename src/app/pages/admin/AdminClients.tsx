import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Pencil, Trash2, X, User, Mail, Phone, FileText, Briefcase, Loader2 } from 'lucide-react';
import { clientsApi } from '../../services/api';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  services: string[];
  createdAt: string;
}

const SERVICES = [
  'Planification financière',
  "Solutions d'assurance",
  "Stratégies d'investissement",
  'Planification retraite',
  'Protection du patrimoine',
  "Stratégies d'épargne",
];

function ClientModal({ client, onClose, onSave }: { client: Partial<Client> | null; onClose: () => void; onSave: (c: any) => void }) {
  const [form, setForm] = useState<Partial<Client>>(client || { name: '', email: '', phone: '', notes: '', services: [] });
  const [saving, setSaving] = useState(false);

  const toggleService = (s: string) => {
    const services = form.services || [];
    setForm(p => ({ ...p, services: services.includes(s) ? services.filter(x => x !== s) : [...services, s] }));
  };

  const handleSave = async () => {
    if (!form.name?.trim() || !form.email?.trim()) return;
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a1628] border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white" style={{ fontWeight: 700 }}>{form.id ? 'Modifier le client' : 'Nouveau client'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Nom complet *', key: 'name', icon: User, type: 'text', placeholder: 'Jean Tremblay' },
            { label: 'Courriel *', key: 'email', icon: Mail, type: 'email', placeholder: 'jean@example.com' },
            { label: 'Téléphone', key: 'phone', icon: Phone, type: 'tel', placeholder: '514-555-0123' },
          ].map(({ label, key, icon: Icon, type, placeholder }) => (
            <div key={key}>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">{label}</label>
              <div className="relative">
                <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input type={type} value={(form as any)[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none transition-all text-sm" />
              </div>
            </div>
          ))}
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Services utilisés</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map(s => (
                <button key={s} type="button" onClick={() => toggleService(s)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition-all text-left ${(form.services || []).includes(s) ? 'bg-[#1e5aad]/30 border border-[#3b82f6]/40 text-white' : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/20'}`}>
                  <Briefcase size={12} className={`shrink-0 ${(form.services || []).includes(s) ? 'text-[#3b82f6]' : 'text-white/30'}`} />
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Notes</label>
            <div className="relative">
              <FileText size={14} className="absolute left-3.5 top-3.5 text-white/25" />
              <textarea rows={3} value={form.notes || ''} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Notes sur le client..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none transition-all text-sm resize-none" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all text-sm">Annuler</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm transition-all flex items-center justify-center gap-2" style={{ fontWeight: 600 }}>
            {saving && <Loader2 size={14} className="animate-spin" />} Enregistrer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Client | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchClients = useCallback((q?: string) => {
    clientsApi.getAll(q).then(data => setClients(data.clients)).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  useEffect(() => {
    const timer = setTimeout(() => fetchClients(search), 300);
    return () => clearTimeout(timer);
  }, [search, fetchClients]);

  const handleSave = async (form: any) => {
    try {
      if (form.id) {
        await clientsApi.update(form.id, form);
      } else {
        await clientsApi.create(form);
      }
      fetchClients(search);
      setModal(null);
      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await clientsApi.delete(id);
      fetchClients(search);
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 size={32} className="text-[#3b82f6] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Clients</h1>
          <p className="text-white/40 text-sm mt-1">{clients.length} clients au total</p>
        </div>
        <button onClick={() => { setSelected(null); setModal('create'); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm hover:from-[#2563eb] hover:to-[#60a5fa] transition-all" style={{ fontWeight: 600 }}>
          <Plus size={16} /> Nouveau client
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un client..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#3b82f6]/50 outline-none transition-all text-sm" />
      </div>

      <div className="bg-[#060f1e] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider">Client</th>
                <th className="text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider hidden sm:table-cell">Téléphone</th>
                <th className="text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider hidden lg:table-cell">Services</th>
                <th className="text-left px-6 py-4 text-white/40 text-xs uppercase tracking-wider hidden md:table-cell">Depuis</th>
                <th className="text-right px-6 py-4 text-white/40 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <motion.tr key={client.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e5aad]/30 to-[#3b82f6]/20 border border-[#3b82f6]/20 flex items-center justify-center text-white text-xs shrink-0" style={{ fontWeight: 700 }}>
                        {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white text-sm" style={{ fontWeight: 500 }}>{client.name}</p>
                        <p className="text-white/40 text-xs">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell"><p className="text-white/60 text-sm">{client.phone}</p></td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {client.services.slice(0, 2).map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-full bg-[#1e5aad]/15 border border-[#3b82f6]/20 text-[#3b82f6] text-xs">{s.split(' ')[0]}</span>
                      ))}
                      {client.services.length > 2 && <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs">+{client.services.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell"><p className="text-white/40 text-sm">{new Date(client.createdAt).toLocaleDateString('fr-CA', { year: 'numeric', month: 'short' })}</p></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setSelected(client); setModal('edit'); }} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteConfirm(client.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {clients.length === 0 && (
          <div className="py-16 text-center"><User size={40} className="text-white/10 mx-auto mb-3" /><p className="text-white/30 text-sm">Aucun client trouvé</p></div>
        )}
      </div>

      <AnimatePresence>
        {(modal === 'create' || modal === 'edit') && (
          <ClientModal client={modal === 'edit' ? selected : null} onClose={() => { setModal(null); setSelected(null); }} onSave={handleSave} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a1628] border border-white/10 rounded-2xl p-6 max-w-sm w-full z-10 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4"><Trash2 size={20} className="text-red-400" /></div>
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>Supprimer ce client ?</h3>
              <p className="text-white/50 text-sm mb-6">Cette action est irréversible.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm transition-all hover:text-white">Annuler</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm transition-all hover:bg-red-500/30" style={{ fontWeight: 600 }}>Supprimer</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
