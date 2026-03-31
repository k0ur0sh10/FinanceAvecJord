import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Users, Calendar, CalendarDays, MessageSquare,
  Settings, LogOut, Menu, X, Bell
} from 'lucide-react';
import logoImg from '../../../assets/5cd219d9afe328db6196c812cd74b522e89396af.png';
import { authApi, messagesApi } from '../../services/api';

const navItems = [
  { path: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { path: '/admin/clients', label: 'Clients', icon: Users },
  { path: '/admin/appointments', label: 'Rendez-vous', icon: Calendar },
  { path: '/admin/calendar', label: 'Calendrier', icon: CalendarDays },
  { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { path: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const admin = authApi.getAdmin();

  useEffect(() => {
    messagesApi.getAll().then(d => setUnreadCount(d.unreadCount)).catch(() => {});
  }, [location.pathname]);

  const handleLogout = () => {
    authApi.logout();
    navigate('/admin');
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link to="/admin/dashboard" onClick={onClose}>
          <img src={logoImg} alt="Finance Avec Jord" className="h-10 w-auto object-contain" />
        </Link>
        <p className="text-white/30 text-xs mt-2 uppercase tracking-widest">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-[#1e5aad]/30 to-[#3b82f6]/10 text-white border border-[#3b82f6]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} className={active ? 'text-[#3b82f6]' : 'text-white/40 group-hover:text-white/70'} />
              <span className="flex-1">{item.label}</span>
              {item.label === 'Messages' && unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#3b82f6] text-white text-xs flex items-center justify-center" style={{ fontWeight: 700 }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>
            {(admin?.name || 'J')[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm truncate" style={{ fontWeight: 600 }}>{admin?.name || 'Jordan'}</p>
            <p className="text-white/30 text-xs truncate">{admin?.email || 'admin'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={17} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#040c1a] flex">
      {/* Desktop Sidebar */}
      <AnimatePresence mode="wait">
        {desktopSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:flex flex-col bg-[#060f1e] border-r border-white/5 shrink-0 overflow-hidden"
            style={{ width: 260 }}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#060f1e] border-r border-white/5 z-50 lg:hidden"
            >
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[#060f1e]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 sm:px-6 gap-4 shrink-0 sticky top-0 z-30">
          {/* Desktop: toggle sidebar */}
          <button
            onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
            className="hidden lg:flex p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Menu size={20} />
          </button>

          {/* Mobile: open sidebar */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1" />

          {/* Notification bell */}
          <Link
            to="/admin/messages"
            className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3b82f6]" />
            )}
          </Link>

          {/* Admin info chip */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/5 border border-white/[0.08]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1e5aad] to-[#3b82f6] flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>
              {(admin?.name || 'J')[0]}
            </div>
            <div className="hidden sm:block">
              <p className="text-white text-xs" style={{ fontWeight: 600 }}>{admin?.name || 'Jordan'}</p>
              <p className="text-white/40 text-xs">Admin</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
