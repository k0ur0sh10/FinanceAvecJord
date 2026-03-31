import { createHashRouter, redirect } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import AboutPage from './pages/About';
import BookPage from './pages/Book';
import ContactPage from './pages/Contact';
import CancelAppointmentPage from './pages/CancelAppointment';
import AdminLoginPage from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminCalendar from './pages/admin/AdminCalendar';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

function requireAuth() {
  const token = sessionStorage.getItem('faj_token');
  if (!token) return redirect('/admin');
  return null;
}

export const router = createHashRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true,           Component: HomePage },
      { path: 'services',      Component: ServicesPage },
      { path: 'about',         Component: AboutPage },
      { path: 'book',          Component: BookPage },
      { path: 'contact',       Component: ContactPage },
      { path: 'admin',         Component: AdminLoginPage },
      { path: 'cancel/:token', Component: CancelAppointmentPage },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    loader: requireAuth,
    children: [
      { path: 'dashboard',    Component: AdminDashboard },
      { path: 'clients',      Component: AdminClients },
      { path: 'appointments', Component: AdminAppointments },
      { path: 'calendar',     Component: AdminCalendar },
      { path: 'messages',     Component: AdminMessages },
      { path: 'settings',     Component: AdminSettings },
    ],
  },
]);
