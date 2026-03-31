import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Loader2, Calendar, Clock, ArrowRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '/api';

export default function CancelAppointmentPage() {
  const { token } = useParams<{ token: string }>();
  const [appt,       setAppt]       = useState<any>(null);
  const [loading,    setLoading]    = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [done,       setDone]       = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    if (!token) { setError('Lien invalide.'); setLoading(false); return; }
    fetch(`${API}/appointments/by-token/${token}`)
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setAppt(d.appointment); })
      .catch(() => setError('Erreur lors du chargement.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCancel = async () => {
    if (!token) return;
    setCancelling(true);
    try {
      const r = await fetch(`${API}/appointments/cancel/${token}`, { method: 'POST' });
      const d = await r.json();
      if (d.error) setError(d.error);
      else setDone(true);
    } catch {
      setError("Erreur lors de l'annulation.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">

          {loading && (
            <div className="py-8">
              <Loader2 size={32} className="text-[#3b82f6] animate-spin mx-auto mb-4" />
              <p className="text-white/50">Chargement…</p>
            </div>
          )}

          {!loading && error && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
                <XCircle size={30} className="text-red-400" />
              </div>
              <h2 className="text-white text-xl font-bold mb-3">Lien invalide</h2>
              <p className="text-white/50 mb-6">{error}</p>
              <Link to="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm font-semibold">
                Prendre un nouveau rendez-vous <ArrowRight size={15} />
              </Link>
            </>
          )}

          {!loading && !error && done && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={30} className="text-green-400" />
              </div>
              <h2 className="text-white text-xl font-bold mb-3">Rendez-vous annulé</h2>
              <p className="text-white/50 mb-6">Votre rendez-vous a bien été annulé. Jordan en a été notifié.</p>
              <Link to="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white text-sm font-semibold">
                Prendre un nouveau rendez-vous <ArrowRight size={15} />
              </Link>
            </>
          )}

          {!loading && !error && !done && appt && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-5">
                <XCircle size={30} className="text-red-400" />
              </div>
              <h2 className="text-white text-xl font-bold mb-2">Annuler votre rendez-vous ?</h2>
              <p className="text-white/50 text-sm mb-6">Confirmez l'annulation du rendez-vous suivant :</p>

              {appt.status === 'cancelled' ? (
                <p className="text-yellow-400 text-sm bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 mb-6">
                  Ce rendez-vous est déjà annulé.
                </p>
              ) : (
                <>
                  <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-4 mb-6 text-left space-y-3">
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <Calendar size={16} className="text-[#c9a84c] shrink-0" />
                      <span>
                        {new Date(appt.date + 'T12:00:00').toLocaleDateString('fr-CA', {
                          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <Clock size={16} className="text-[#c9a84c] shrink-0" />
                      <span>{appt.time}</span>
                    </div>
                    {appt.service && (
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <span className="text-[#c9a84c] shrink-0 text-base">📋</span>
                        <span>{appt.service}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button onClick={handleCancel} disabled={cancelling}
                      className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all text-sm font-semibold flex items-center justify-center gap-2">
                      {cancelling ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                      Confirmer l'annulation
                    </button>
                    <Link to="/"
                      className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm text-center block">
                      Garder mon rendez-vous
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
