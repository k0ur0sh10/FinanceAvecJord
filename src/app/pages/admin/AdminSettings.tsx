import { useState, useEffect, useCallback } from 'react';
import {
  Instagram, Facebook, Save, CheckCircle, Plus, Trash2,
  Clock, Loader2, Link2, Lock, Eye, EyeOff, ChevronDown, ChevronUp, RefreshCw, Wifi, WifiOff
} from 'lucide-react';
import { settingsApi, authApi, appointmentsApi } from '../../services/api';

// ─────────────────────────────────────────────────────────────────────────────
// ALL helper components MUST live OUTSIDE the main component.
// If defined inside, React creates a new type every render → inputs lose focus.
// ─────────────────────────────────────────────────────────────────────────────

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.15a8.16 8.16 0 0 0 4.77 1.52V7.22a4.85 4.85 0 0 1-1-.53z" />
    </svg>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#060f1e] border border-white/8 rounded-2xl p-6">
      <h2 className="text-white mb-5" style={{ fontWeight: 600 }}>{title}</h2>
      {children}
    </div>
  );
}

function FieldInput({
  label, value, onChange, type = 'text', placeholder = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none transition-all text-sm"
      />
    </div>
  );
}

// Rich service editor card — also outside main component
function ServiceCard({
  service, index, onChange, onRemove,
}: {
  service: { name: string; description: string; features: string[] };
  index: number;
  onChange: (i: number, s: { name: string; description: string; features: string[] }) => void;
  onRemove: (i: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  const update = useCallback((patch: Partial<typeof service>) => {
    onChange(index, { ...service, ...patch });
  }, [index, service, onChange]);

  const addFeature = () => {
    const t = newFeature.trim();
    if (t && !service.features.includes(t)) {
      update({ features: [...service.features, t] });
      setNewFeature('');
    }
  };

  const removeFeature = (f: string) => {
    update({ features: service.features.filter(x => x !== f) });
  };

  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-6 h-6 rounded-lg bg-[#1e5aad]/30 border border-[#3b82f6]/30 flex items-center justify-center text-[#60a5fa] text-xs font-bold shrink-0">
          {index + 1}
        </div>
        <input
          type="text"
          value={service.name}
          onChange={e => update({ name: e.target.value })}
          placeholder="Nom du service"
          className="flex-1 bg-transparent text-white text-sm font-semibold placeholder:text-white/20 outline-none border-none"
        />
        <button
          onClick={() => setExpanded(e => !e)}
          className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
        >
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        <button
          onClick={() => onRemove(index)}
          className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* Expandable body */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Description</label>
            <textarea
              rows={3}
              value={service.description}
              onChange={e => update({ description: e.target.value })}
              placeholder="Décrivez ce service en quelques phrases..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
              Points clés ({service.features.length})
            </label>
            <div className="space-y-2 mb-3">
              {service.features.map(f => (
                <div key={f} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/8 group">
                  <span className="flex-1 text-white/70 text-sm">{f}</span>
                  <button
                    onClick={() => removeFeature(f)}
                    className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Ajouter un point clé..."
                className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm"
              />
              <button
                onClick={addFeature}
                className="px-3 py-2.5 rounded-xl bg-[#1e5aad]/30 border border-[#3b82f6]/30 text-[#60a5fa] hover:bg-[#1e5aad]/40 transition-all"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── Teams Section (outside main component to avoid focus loss) ───────────────
function TeamsSection() {
  const [syncing,   setSyncing]   = useState(false);
  const [syncMsg,   setSyncMsg]   = useState('');
  const [syncError, setSyncError] = useState('');

  const handleSync = async () => {
    setSyncing(true); setSyncMsg(''); setSyncError('');
    try {
      const d = await appointmentsApi.syncTeams();
      setSyncMsg(d.message || 'Synchronisation terminée');
      setTimeout(() => setSyncMsg(''), 4000);
    } catch (err: any) {
      setSyncError(err.message || 'Erreur de connexion au serveur');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="bg-[#060f1e] border border-white/8 rounded-2xl p-6">
      <h2 className="text-white mb-5" style={{ fontWeight: 600 }}>Microsoft Teams — Synchronisation bidirectionnelle</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[#1e5aad]/10 border border-[#3b82f6]/20">
            <div className="flex items-center gap-2 mb-2">
              <Wifi size={15} className="text-[#60a5fa]" />
              <span className="text-white/70 text-sm font-medium">Site Web → Teams</span>
            </div>
            <p className="text-white/40 text-xs">Quand vous <strong className="text-white/60">Confirmez</strong> un RDV dans l'admin → réunion Teams créée automatiquement → lien envoyé au client par email.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw size={15} className="text-[#a78bfa]" />
              <span className="text-white/70 text-sm font-medium">Teams → Site Web</span>
            </div>
            <p className="text-white/40 text-xs">Votre calendrier Outlook/Teams est importé toutes les 30 min. Les événements Teams bloquent automatiquement les créneaux côté client.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={handleSync} disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-[#a78bfa] hover:bg-[#8b5cf6]/30 transition-all text-sm font-medium disabled:opacity-50">
            <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Synchronisation…' : 'Synchroniser maintenant'}
          </button>
          {syncMsg   && <span className="text-green-400 text-xs">{syncMsg}</span>}
          {syncError && <span className="text-red-400 text-xs">{syncError}</span>}
        </div>

        <div className="bg-[#1e5aad]/10 border border-[#3b82f6]/20 rounded-xl p-4 space-y-3">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Configuration Azure (gratuite, ~15 min)</p>
          <div className="space-y-1.5 text-white/50 text-xs">
            <div className="flex gap-2"><span className="text-[#3b82f6] font-bold shrink-0">1.</span><span><strong className="text-white/60">portal.azure.com</strong> → Azure Active Directory → App registrations → New registration (nom : Finance Avec Jord, Single tenant)</span></div>
            <div className="flex gap-2"><span className="text-[#3b82f6] font-bold shrink-0">2.</span><span>Copier <strong className="text-white/60">Application (client) ID</strong> et <strong className="text-white/60">Directory (tenant) ID</strong></span></div>
            <div className="flex gap-2"><span className="text-[#3b82f6] font-bold shrink-0">3.</span><span>Certificates &amp; secrets → New client secret → copier la valeur</span></div>
            <div className="flex gap-2"><span className="text-[#3b82f6] font-bold shrink-0">4.</span><span>API permissions → Microsoft Graph → Application → <strong className="text-white/60">Calendars.ReadWrite</strong> + <strong className="text-white/60">OnlineMeetings.ReadWrite.All</strong> → Grant admin consent</span></div>
            <div className="flex gap-2"><span className="text-[#3b82f6] font-bold shrink-0">5.</span><span>Ajouter dans <strong className="text-white/60">backend/.env</strong> : TEAMS_CLIENT_ID, TEAMS_CLIENT_SECRET, TEAMS_TENANT_ID, TEAMS_USER_EMAIL puis redémarrer le serveur.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const TIME_SLOTS_AVAILABLE = [
  '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
];
const WEEKEND_SLOTS = [
  '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '13:00 - 14:00', '14:00 - 15:00',
];
const WEEKDAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const WEEKEND   = ['Samedi', 'Dimanche'];
const DAYS      = [...WEEKDAYS, ...WEEKEND];

const EMPTY_SERVICE = () => ({ name: '', description: '', features: [] as string[] });

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [social, setSocial] = useState({
    instagram: '', tiktok: '', facebook: '',
    instagramUrl: '', tiktokUrl: '', facebookUrl: '',
  });
  const [contact, setContact] = useState({ phone: '', email: '', address: '' });
  const [services, setServices] = useState<{ name: string; description: string; features: string[] }[]>([]);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});

  // Password
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    settingsApi.getAll()
      .then(data => {
        if (data.social)        setSocial(data.social);
        if (data.contact)       setContact(data.contact);
        if (data.availability)  setAvailability(data.availability);
        // Handle both old string[] and new object[] formats
        if (data.services?.length) {
          setServices(data.services.map((s: any) =>
            typeof s === 'string'
              ? { name: s, description: '', features: [] }
              : s
          ));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleSlot = (day: string, slot: string) => {
    setAvailability(prev => {
      const cur = prev[day] || [];
      return { ...prev, [day]: cur.includes(slot) ? cur.filter(s => s !== slot) : [...cur, slot].sort() };
    });
  };

  const handleServiceChange = useCallback((i: number, s: { name: string; description: string; features: string[] }) => {
    setServices(prev => prev.map((item, idx) => idx === i ? s : item));
  }, []);

  const handleServiceRemove = useCallback((i: number) => {
    setServices(prev => prev.filter((_, idx) => idx !== i));
  }, []);

  const addService = () => setServices(prev => [...prev, EMPTY_SERVICE()]);

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    try {
      await settingsApi.update({ social, contact, services, availability });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(''); setPwMsg('');
    if (pwForm.next !== pwForm.confirm) { setPwError('Les mots de passe ne correspondent pas'); return; }
    if (pwForm.next.length < 6)         { setPwError('Minimum 6 caractères'); return; }
    setPwSaving(true);
    try {
      await authApi.changePassword(pwForm.current, pwForm.next);
      setPwMsg('Mot de passe modifié avec succès');
      setPwForm({ current: '', next: '', confirm: '' });
    } catch (err: any) {
      setPwError(err.message || 'Erreur lors du changement');
    } finally {
      setPwSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 size={32} className="text-[#3b82f6] animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Paramètres</h1>
          <p className="text-white/40 text-sm mt-1">Les modifications sont reflétées côté client après sauvegarde</p>
        </div>
        <div className="flex items-center gap-3">
          {saveError && <p className="text-red-400 text-xs max-w-xs">{saveError}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
              saved
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa]'
            }`}
            style={{ fontWeight: 600 }}
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <><CheckCircle size={16} /> Sauvegardé</> : <><Save size={16} /> Enregistrer</>}
          </button>
        </div>
      </div>

      {/* Top 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Social */}
        <SectionCard title="Réseaux sociaux">
          <div className="space-y-5">
            {[
              { key: 'instagram', urlKey: 'instagramUrl', label: 'Instagram', icon: <Instagram size={16} />, color: '#E1306C' },
              { key: 'tiktok',    urlKey: 'tiktokUrl',    label: 'TikTok',    icon: <TikTokIcon size={16} />, color: '#ffffff' },
              { key: 'facebook',  urlKey: 'facebookUrl',  label: 'Facebook',  icon: <Facebook size={16} />,  color: '#1877F2' },
            ].map(({ key, urlKey, label, icon, color }) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}20`, color }}>{icon}</div>
                  <span className="text-white/70 text-sm">{label}</span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={(social as any)[key]}
                    onChange={e => setSocial(p => ({ ...p, [key]: e.target.value }))}
                    placeholder="@handle"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm"
                  />
                  <input
                    type="url"
                    value={(social as any)[urlKey]}
                    onChange={e => setSocial(p => ({ ...p, [urlKey]: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Contact */}
        <SectionCard title="Informations de contact">
          <div className="space-y-4">
            <FieldInput label="Téléphone" value={contact.phone} onChange={v => setContact(p => ({ ...p, phone: v }))} type="tel" placeholder="+1 (438) 504-5033" />
            <FieldInput label="Courriel"  value={contact.email} onChange={v => setContact(p => ({ ...p, email: v }))} type="email" placeholder="jordan@exemple.com" />
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Adresse</label>
              <textarea
                rows={2}
                value={contact.address}
                onChange={e => setContact(p => ({ ...p, address: e.target.value }))}
                placeholder="Adresse complète..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm resize-none"
              />
            </div>
          </div>
        </SectionCard>



        {/* Microsoft Teams */}
        <TeamsSection />

        {/* Services — rich editor */}
        <SectionCard title="Services offerts">
          <p className="text-white/40 text-xs mb-4">
            Cliquez sur ▾ pour modifier la description et les points clés d'un service. Ces informations s'affichent sur la page Services du site.
          </p>
          <div className="space-y-3 mb-4">
            {services.map((s, i) => (
              <ServiceCard
                key={i}
                service={s}
                index={i}
                onChange={handleServiceChange}
                onRemove={handleServiceRemove}
              />
            ))}
          </div>
          <button
            onClick={addService}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-all text-sm"
          >
            <Plus size={15} /> Ajouter un service
          </button>
          <p className="text-white/25 text-xs mt-3">
            N'oubliez pas de cliquer sur <strong className="text-white/40">Enregistrer</strong> pour appliquer les changements.
          </p>
        </SectionCard>
      </div>

      {/* Availability */}
      <div className="bg-[#060f1e] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={18} className="text-[#c9a84c]" />
          <h2 className="text-white" style={{ fontWeight: 600 }}>Disponibilités</h2>
        </div>
        <p className="text-white/40 text-sm mb-6">Créneaux proposés aux clients lors de la réservation.</p>
        <div className="space-y-5">
          {DAYS.map(day => (
            <div key={day}>
              <p className="text-white/60 text-sm mb-3" style={{ fontWeight: 500 }}>{day}</p>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS_AVAILABLE.map(slot => {
                  const active = (availability[day] || []).includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(day, slot)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        active
                          ? 'bg-[#1e5aad]/30 border border-[#3b82f6]/40 text-[#60a5fa]'
                          : 'bg-white/[0.04] border border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-[#060f1e] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock size={18} className="text-white/60" />
          <h2 className="text-white" style={{ fontWeight: 600 }}>Changer le mot de passe</h2>
        </div>
        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { key: 'current', label: 'Actuel'   },
            { key: 'next',    label: 'Nouveau'   },
            { key: 'confirm', label: 'Confirmer' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">{label}</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={(pwForm as any)[key]}
                  onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 outline-none text-sm"
                />
                {key === 'current' && (
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="sm:col-span-3 space-y-3">
            {pwError && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{pwError}</p>}
            {pwMsg   && <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">{pwMsg}</p>}
            <button type="submit" disabled={pwSaving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
              style={{ fontWeight: 500 }}>
              {pwSaving ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
              Changer le mot de passe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
