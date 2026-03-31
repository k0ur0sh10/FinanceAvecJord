const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken(): string | null { return sessionStorage.getItem('faj_token'); }
function setToken(t: string)       { sessionStorage.setItem('faj_token', t); }
function clearAuth()               { sessionStorage.removeItem('faj_token'); sessionStorage.removeItem('faj_admin'); }
function isAuthenticated(): boolean { return !!getToken(); }

async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    clearAuth();
    window.location.hash = '#/admin';
    throw new Error('Session expirée — veuillez vous reconnecter.');
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erreur serveur');
  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; admin: any }>('/auth/login', {
      method: 'POST', body: JSON.stringify({ email, password }),
    }).then(data => {
      setToken(data.token);
      sessionStorage.setItem('faj_admin', JSON.stringify(data.admin));
      return data;
    }),

  me:              () => apiFetch<{ admin: any }>('/auth/me'),
  logout:          () => clearAuth(),
  isAuthenticated,
  getAdmin:        () => { const s = sessionStorage.getItem('faj_admin'); return s ? JSON.parse(s) : null; },
  changePassword:  (currentPassword: string, newPassword: string) =>
    apiFetch('/auth/change-password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) }),
};

// ─── Clients ─────────────────────────────────────────────────────────────────
export const clientsApi = {
  getAll: (search?: string) =>
    apiFetch<{ clients: any[] }>(`/clients${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  get:    (id: number) => apiFetch<{ client: any }>(`/clients/${id}`),
  create: (data: any)  => apiFetch<{ client: any }>('/clients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    apiFetch<{ client: any }>(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch<{ message: string }>(`/clients/${id}`, { method: 'DELETE' }),
};

// ─── Appointments ────────────────────────────────────────────────────────────
export const appointmentsApi = {
  getAll: (params?: { search?: string; status?: string; month?: string }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set('search', params.search);
    if (params?.status) q.set('status', params.status);
    if (params?.month)  q.set('month',  params.month);
    const qs = q.toString();
    return apiFetch<{ appointments: any[] }>(`/appointments${qs ? `?${qs}` : ''}`);
  },
  create:  (data: any)            => apiFetch<{ appointment: any }>('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  update:  (id: number, data: any) => apiFetch<{ appointment: any }>(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:  (id: number)            => apiFetch<{ message: string }>(`/appointments/${id}`, { method: 'DELETE' }),
  convert: (id: number)            => apiFetch<{ appointment: any; message: string }>(`/appointments/${id}/convert`, { method: 'POST' }),

  getAvailableSlots: (date: string) =>
    fetch(`${API_BASE}/appointments/available-slots?date=${date}`)
      .then(r => r.json()).then(d => d as { slots: string[] }),

  syncTeams: () => apiFetch<{ message: string }>('/appointments/sync-teams', { method: 'POST' }),

  book: (data: any) =>
    fetch(`${API_BASE}/appointments/book`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    }).then(r => r.json()).then(d => { if (d.error) throw new Error(d.error); return d; }),
};

// ─── Messages ────────────────────────────────────────────────────────────────
export const messagesApi = {
  getAll: (params?: { search?: string; archived?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.search)   q.set('search', params.search);
    if (params?.archived) q.set('archived', 'true');
    const qs = q.toString();
    return apiFetch<{ messages: any[]; unreadCount: number }>(`/messages${qs ? `?${qs}` : ''}`);
  },
  markRead: (id: number)               => apiFetch<{ message: any }>(`/messages/${id}/read`,    { method: 'PUT' }),
  archive:  (id: number)               => apiFetch<{ message: any }>(`/messages/${id}/archive`, { method: 'PUT' }),
  reply:    (id: number, text: string) => apiFetch<{ message: any }>(`/messages/${id}/reply`,   { method: 'POST', body: JSON.stringify({ text }) }),
  delete:   (id: number)               => apiFetch<{ message: string }>(`/messages/${id}`,      { method: 'DELETE' }),
  submitContact: (data: any) =>
    fetch(`${API_BASE}/messages/contact`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    }).then(r => r.json()).then(d => { if (d.error) throw new Error(d.error); return d; }),
};

// ─── Settings ────────────────────────────────────────────────────────────────
export const settingsApi = {
  getPublic: () =>
    fetch(`${API_BASE}/settings/public`)
      .then(r => r.json())
      .then(d => d as { services: any[]; social: any; contact: any }),
  getAll: () =>
    apiFetch<{ services: any[]; social: any; contact: any; availability: any }>('/settings'),
  update: (data: any) =>
    apiFetch<{ message: string }>('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const dashboardApi = {
  get: (params?: { statsEnd?: string; serviceMonth?: string }) => {
    const q = new URLSearchParams();
    if (params?.statsEnd)      q.set('stats_end',      params.statsEnd);
    if (params?.serviceMonth)  q.set('service_month',  params.serviceMonth);
    const qs = q.toString();
    return apiFetch<{
      stats: any;
      upcomingAppointments: any[];
      recentMessages: any[];
      monthlyStats: any[];
      serviceStats: any[];
      selectedStatsEnd: string;
      selectedServiceMonth: string;
    }>(`/dashboard${qs ? `?${qs}` : ''}`);
  },
};

// ─── Calendar / iCal ─────────────────────────────────────────────────────────
export const calendarApi = {
  getIcalToken: () => apiFetch<{ token: string; feedUrl: string }>('/calendar/token'),
};
