import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  DollarSign,
  Shield,
  Filter,
  X,
  User,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

interface Appointment {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  insuranceType: string;
  date: string;
  time: string;
  notes: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  zoomLink?: string;
  createdAt: string;
}

interface Client {
  name: string;
  email: string;
  phone: string;
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  lastAppointment?: string;
  insuranceTypes: string[];
  appointments: Appointment[];
}

export function AdminClients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  // Load and process client data from appointments
  const clients = useMemo(() => {
    const stored = localStorage.getItem("appointments");
    const appointments: Appointment[] = stored ? JSON.parse(stored) : [];

    // Group appointments by client email
    const clientMap = new Map<string, Client>();

    appointments.forEach((apt) => {
      const existing = clientMap.get(apt.email);
      
      if (existing) {
        existing.totalAppointments++;
        if (apt.status === "Completed") existing.completedAppointments++;
        if (apt.status === "Scheduled") existing.upcomingAppointments++;
        if (!existing.insuranceTypes.includes(apt.insuranceType)) {
          existing.insuranceTypes.push(apt.insuranceType);
        }
        existing.appointments.push(apt);
        
        // Update last appointment date
        try {
          const aptDate = parseISO(apt.date);
          const lastDate = existing.lastAppointment ? parseISO(existing.lastAppointment) : null;
          if (!lastDate || aptDate > lastDate) {
            existing.lastAppointment = apt.date;
          }
        } catch {}
      } else {
        clientMap.set(apt.email, {
          name: apt.clientName,
          email: apt.email,
          phone: apt.phone,
          totalAppointments: 1,
          completedAppointments: apt.status === "Completed" ? 1 : 0,
          upcomingAppointments: apt.status === "Scheduled" ? 1 : 0,
          lastAppointment: apt.date,
          insuranceTypes: [apt.insuranceType],
          appointments: [apt],
        });
      }
    });

    return Array.from(clientMap.values()).sort((a, b) => 
      b.totalAppointments - a.totalAppointments
    );
  }, []);

  // Filter clients based on search and status
  const filteredClients = useMemo(() => {
    let filtered = clients;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.phone.includes(searchQuery)
      );
    }

    // Status filter
    if (filterStatus === "active") {
      filtered = filtered.filter((client) => client.upcomingAppointments > 0);
    } else if (filterStatus === "inactive") {
      filtered = filtered.filter((client) => client.upcomingAppointments === 0);
    }

    return filtered;
  }, [clients, searchQuery, filterStatus]);

  // Statistics
  const stats = {
    total: clients.length,
    active: clients.filter((c) => c.upcomingAppointments > 0).length,
    totalAppointments: clients.reduce((sum, c) => sum + c.totalAppointments, 0),
    avgAppointments: clients.length > 0 
      ? (clients.reduce((sum, c) => sum + c.totalAppointments, 0) / clients.length).toFixed(1)
      : "0",
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl mb-2">Clients</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your client relationships and history
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {[
          {
            label: "Total Clients",
            value: stats.total,
            icon: Users,
            color: "var(--gold)",
          },
          {
            label: "Active Clients",
            value: stats.active,
            icon: TrendingUp,
            color: "var(--emerald)",
          },
          {
            label: "Total Appointments",
            value: stats.totalAppointments,
            icon: Calendar,
            color: "var(--luxury-blue)",
          },
          {
            label: "Avg per Client",
            value: stats.avgAppointments,
            icon: CheckCircle2,
            color: "var(--champagne)",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: stat.color }}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="text-3xl mb-1" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-lg bg-card/50 border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterStatus === "all"
                ? "bg-[var(--gold)] text-background"
                : "bg-card/50 text-muted-foreground hover:bg-card"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("active")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterStatus === "active"
                ? "bg-[var(--gold)] text-background"
                : "bg-card/50 text-muted-foreground hover:bg-card"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus("inactive")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filterStatus === "inactive"
                ? "bg-[var(--gold)] text-background"
                : "bg-card/50 text-muted-foreground hover:bg-card"
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="py-16 text-center rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
          <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl mb-2 text-muted-foreground">No clients found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search criteria"
              : "No clients have been added yet"}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.email}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedClient(client)}
              className="p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm hover:border-[var(--gold)]/50 transition-all cursor-pointer"
            >
              {/* Client Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                  <User
                    className="w-6 h-6 text-[var(--gold)]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg mb-1 truncate">{client.name}</h3>
                  <div className="flex items-center gap-2">
                    {client.upcomingAppointments > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--emerald)]/10 text-[var(--emerald)]">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted/20 text-muted-foreground">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-border/50">
                <div className="text-center">
                  <div className="text-lg text-[var(--gold)]">
                    {client.totalAppointments}
                  </div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-[var(--emerald)]">
                    {client.completedAppointments}
                  </div>
                  <div className="text-xs text-muted-foreground">Done</div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-[var(--luxury-blue)]">
                    {client.upcomingAppointments}
                  </div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </div>
              </div>

              {/* Insurance Types */}
              <div className="flex flex-wrap gap-1">
                {client.insuranceTypes.slice(0, 2).map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 rounded text-xs bg-background/50 text-muted-foreground"
                  >
                    {type}
                  </span>
                ))}
                {client.insuranceTypes.length > 2 && (
                  <span className="px-2 py-1 rounded text-xs bg-background/50 text-muted-foreground">
                    +{client.insuranceTypes.length - 2}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl p-8 rounded-2xl bg-gradient-to-br from-card/95 to-card/80 border border-border/50 backdrop-blur-xl my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 flex items-center justify-center">
                  <User
                    className="w-8 h-8 text-[var(--gold)]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h2 className="text-2xl mb-1">{selectedClient.name}</h2>
                  <div className="flex items-center gap-2">
                    {selectedClient.upcomingAppointments > 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-[var(--emerald)]/10 text-[var(--emerald)]">
                        Active Client
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs bg-muted/20 text-muted-foreground">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 hover:bg-accent rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-6 p-6 rounded-xl bg-background/50 border border-border/50">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--gold)]" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Email</div>
                  <div className="text-sm">{selectedClient.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--gold)]" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Phone</div>
                  <div className="text-sm">{selectedClient.phone}</div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                <div className="text-2xl text-[var(--gold)] mb-1">
                  {selectedClient.totalAppointments}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Appointments
                </div>
              </div>
              <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                <div className="text-2xl text-[var(--emerald)] mb-1">
                  {selectedClient.completedAppointments}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="p-4 rounded-xl bg-background/50 border border-border/50 text-center">
                <div className="text-2xl text-[var(--luxury-blue)] mb-1">
                  {selectedClient.upcomingAppointments}
                </div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
            </div>

            {/* Insurance Types */}
            <div className="mb-6">
              <h3 className="text-sm text-muted-foreground mb-3">
                Insurance Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedClient.insuranceTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Appointment History */}
            <div>
              <h3 className="text-lg mb-4">Appointment History</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedClient.appointments
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-lg bg-background/50 border border-border/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm mb-1">{apt.insuranceType}</div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {apt.time}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            apt.status === "Completed"
                              ? "bg-[var(--emerald)]/10 text-[var(--emerald)]"
                              : apt.status === "Cancelled"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-[var(--luxury-blue)]/10 text-[var(--luxury-blue)]"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      {apt.notes && (
                        <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/30">
                          {apt.notes}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedClient(null)}
                className="flex-1 py-3 bg-card/50 rounded-lg hover:bg-card transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}