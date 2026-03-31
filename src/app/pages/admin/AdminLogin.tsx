import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logoImg from '../../../assets/5cd219d9afe328db6196c812cd74b522e89396af.png';
import { authApi } from '../../services/api';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.login(email.trim().toLowerCase(), password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden pt-8 pb-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1e5aad]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <img src={logoImg} alt="Finance Avec Jord" className="h-16 w-auto object-contain mx-auto mb-4" />
            <p className="text-white/40 text-sm">Administration</p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30">
            <Lock size={24} className="text-white" />
          </div>

          <h1 className="text-white text-center mb-8" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Connexion Admin
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                Adresse courriel
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@financeavecjord.ca"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 focus:bg-white/8 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  required
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#3b82f6]/50 focus:bg-white/8 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full py-4 rounded-xl bg-gradient-to-r from-[#1e5aad] to-[#3b82f6] text-white hover:from-[#2563eb] hover:to-[#60a5fa] transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ fontWeight: 600 }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © 2026 Finance Avec Jord · Panneau d'administration sécurisé
        </p>
      </motion.div>
    </div>
  );
}
