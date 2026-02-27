import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Calendar as CalendarIcon, 
  Users, 
  TrendingUp, 
  Clock,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
  XCircle,
  Video,
  Plus,
  X
} from "lucide-react";
import { format, isToday, isFuture, parseISO } from "date-fns";
import { toast } from "sonner";
import { initializeDemoData } from "../utils/demoData";

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

export function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    clientName: "",
    email: "",
    phone: "",
    insuranceType: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    initializeDemoData(); // Initialize demo data if needed
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  };

  const saveAppointments = (updatedAppointments: Appointment[]) => {
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  const generateZoomLink = () => {
    return `https://zoom.us/j/${Math.floor(Math.random() * 900000000) + 100000000}`;
  };

  const handleAddZoomLink = (id: string) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, zoomLink: generateZoomLink() } : apt
    );
    saveAppointments(updated);
    toast.success("Zoom link generated!");
  };

  const handleCopyZoomLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Zoom link copied to clipboard!");
  };

  const handleStatusChange = (id: string, status: Appointment["status"]) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    saveAppointments(updated);
    toast.success(`Appointment marked as ${status}`);
  };

  const handleDeleteAppointment = (id: string) => {
    const updated = appointments.filter(apt => apt.id !== id);
    saveAppointments(updated);
    toast.success("Appointment deleted");
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };
    
    saveAppointments([...appointments, appointment]);
    setIsAddingAppointment(false);
    setNewAppointment({
      clientName: "",
      email: "",
      phone: "",
      insuranceType: "",
      date: "",
      time: "",
      notes: "",
    });
    toast.success("Appointment added successfully!");
  };

  // Statistics
  const stats = {
    total: appointments.length,
    today: appointments.filter(apt => {
      try {
        return isToday(parseISO(apt.date));
      } catch {
        return false;
      }
    }).length,
    upcoming: appointments.filter(apt => {
      try {
        return isFuture(parseISO(apt.date)) && apt.status === "Scheduled";
      } catch {
        return false;
      }
    }).length,
    completed: appointments.filter(apt => apt.status === "Completed").length,
  };

  const insuranceTypes = [
    "Life Insurance",
    "Health Insurance",
    "Auto Insurance",
    "Home Insurance",
    "Business Insurance",
    "Investment & Retirement",
    "General Consultation",
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your appointments and clients</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {[
          { label: "Total Appointments", value: stats.total, icon: CalendarIcon, color: "var(--gold)" },
          { label: "Today's Appointments", value: stats.today, icon: Clock, color: "var(--luxury-blue)" },
          { label: "Upcoming", value: stats.upcoming, icon: TrendingUp, color: "var(--emerald)" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "var(--champagne)" },
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
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-3xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg transition-all ${
              view === "list" 
                ? "bg-[var(--gold)] text-background" 
                : "bg-card/50 text-muted-foreground hover:bg-card"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-lg transition-all ${
              view === "calendar" 
                ? "bg-[var(--gold)] text-background" 
                : "bg-card/50 text-muted-foreground hover:bg-card"
            }`}
          >
            Calendar View
          </button>
        </div>
        
        <button
          onClick={() => setIsAddingAppointment(true)}
          className="flex items-center gap-2 px-6 py-2 bg-[var(--gold)] text-background rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Appointment
        </button>
      </div>

      {/* Add Appointment Modal */}
      {isAddingAppointment && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-card/95 to-card/80 border border-border/50 backdrop-blur-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Add New Appointment</h2>
              <button
                onClick={() => setIsAddingAppointment(false)}
                className="p-2 hover:bg-accent rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newAppointment.clientName}
                    onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Email *</label>
                  <input
                    type="email"
                    required
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newAppointment.phone}
                    onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Insurance Type *</label>
                  <select
                    required
                    value={newAppointment.insuranceType}
                    onChange={(e) => setNewAppointment({...newAppointment, insuranceType: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
                  >
                    <option value="">Select type...</option>
                    {insuranceTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Date *</label>
                  <input
                    type="date"
                    required
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Time *</label>
                  <select
                    required
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none text-foreground"
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Notes</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none resize-none text-foreground"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[var(--gold)] text-background rounded-lg hover:shadow-lg transition-all"
                >
                  Add Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAppointment(false)}
                  className="px-6 py-3 bg-card/50 rounded-lg hover:bg-card transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Appointments Table */}
      {view === "list" && (
        <div className="rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-card/50">
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Client</th>
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Contact</th>
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Insurance Type</th>
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Zoom Link</th>
                  <th className="px-6 py-4 text-left text-sm text-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      No appointments yet. Add your first appointment to get started.
                    </td>
                  </tr>
                ) : (
                  appointments
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((apt) => (
                      <tr key={apt.id} className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm">{apt.clientName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-muted-foreground">
                            <div>{apt.email}</div>
                            <div>{apt.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div>{apt.date}</div>
                            <div className="text-muted-foreground">{apt.time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm px-3 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                            {apt.insuranceType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={apt.status}
                            onChange={(e) => handleStatusChange(apt.id, e.target.value as Appointment["status"])}
                            className={`text-sm px-3 py-1 rounded-full border-0 cursor-pointer ${
                              apt.status === "Completed" ? "bg-[var(--emerald)]/10 text-[var(--emerald)]" :
                              apt.status === "Cancelled" ? "bg-destructive/10 text-destructive" :
                              "bg-[var(--luxury-blue)]/10 text-[var(--luxury-blue)]"
                            }`}
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          {apt.zoomLink ? (
                            <button
                              onClick={() => handleCopyZoomLink(apt.zoomLink!)}
                              className="flex items-center gap-2 text-sm text-[var(--gold)] hover:underline"
                            >
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddZoomLink(apt.id)}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gold)]"
                            >
                              <Video className="w-4 h-4" />
                              Generate
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedAppointment(apt)}
                              className="p-2 hover:bg-accent rounded-lg transition-all"
                              title="View Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAppointment(apt.id)}
                              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="p-8 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" />
            <h3 className="text-2xl mb-2">Calendar View</h3>
            <p className="text-muted-foreground mb-6">
              Advanced calendar integration coming soon
            </p>
            <div className="space-y-4 max-w-md mx-auto text-left">
              {appointments
                .filter(apt => {
                  try {
                    return isFuture(parseISO(apt.date)) || isToday(parseISO(apt.date));
                  } catch {
                    return false;
                  }
                })
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((apt) => (
                  <div key={apt.id} className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm mb-1">{apt.clientName}</div>
                        <div className="text-xs text-muted-foreground">{apt.insuranceType}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[var(--gold)]">{apt.date}</div>
                        <div className="text-xs text-muted-foreground">{apt.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-card/95 to-card/80 border border-border/50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Appointment Details</h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-accent rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Client Name</div>
                  <div>{selectedAppointment.clientName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Email</div>
                  <div>{selectedAppointment.email}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Phone</div>
                  <div>{selectedAppointment.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Insurance Type</div>
                  <div>{selectedAppointment.insuranceType}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Date</div>
                  <div>{selectedAppointment.date}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Time</div>
                  <div>{selectedAppointment.time}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  selectedAppointment.status === "Completed" ? "bg-[var(--emerald)]/10 text-[var(--emerald)]" :
                  selectedAppointment.status === "Cancelled" ? "bg-destructive/10 text-destructive" :
                  "bg-[var(--luxury-blue)]/10 text-[var(--luxury-blue)]"
                }`}>
                  {selectedAppointment.status}
                </span>
              </div>

              {selectedAppointment.zoomLink && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Zoom Link</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={selectedAppointment.zoomLink}
                      readOnly
                      className="flex-1 px-4 py-2 rounded-lg bg-input border border-border"
                    />
                    <button
                      onClick={() => handleCopyZoomLink(selectedAppointment.zoomLink!)}
                      className="px-4 py-2 bg-[var(--gold)] text-background rounded-lg hover:shadow-lg transition-all"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {selectedAppointment.notes && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Notes</div>
                  <div className="p-4 rounded-lg bg-background/50">{selectedAppointment.notes}</div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedAppointment(null)}
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