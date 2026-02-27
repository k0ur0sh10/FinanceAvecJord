import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Plus,
  X,
  Video,
  Copy,
} from "lucide-react";
import { format, parseISO, startOfDay, isSameDay } from "date-fns";
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

export function AdminCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem("appointments");
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Get appointments for selected date
  const selectedDateAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      try {
        const aptDate = parseISO(apt.date);
        return isSameDay(aptDate, selectedDate);
      } catch {
        return false;
      }
    }).sort((a, b) => {
      // Sort by time
      return a.time.localeCompare(b.time);
    });
  }, [appointments, selectedDate]);

  // Get all dates with appointments for highlighting
  const appointmentDates = useMemo(() => {
    return appointments.map((apt) => {
      try {
        return startOfDay(parseISO(apt.date));
      } catch {
        return null;
      }
    }).filter((date): date is Date => date !== null);
  }, [appointments]);

  const handleCopyZoomLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Zoom link copied to clipboard!");
  };

  const modifiers = {
    hasAppointments: appointmentDates,
  };

  const modifiersStyles = {
    hasAppointments: {
      backgroundColor: "var(--gold)",
      color: "var(--background)",
      fontWeight: "bold",
      borderRadius: "8px",
    },
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl mb-2">Calendar</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          View and manage your appointments by date
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl">Select Date</h2>
                <p className="text-sm text-muted-foreground">
                  {format(selectedDate, "MMMM yyyy")}
                </p>
              </div>
            </div>

            <style>{`
              .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: var(--gold);
                --rdp-background-color: transparent;
                margin: 0;
                color: var(--foreground);
              }
              .rdp-month {
                width: 100%;
              }
              .rdp-caption {
                display: flex;
                justify-content: center;
                padding: 0;
                margin-bottom: 1rem;
              }
              .rdp-caption_label {
                font-size: 1rem;
                font-weight: 500;
                color: var(--foreground);
              }
              .rdp-nav {
                display: flex;
                gap: 0.5rem;
              }
              .rdp-nav_button {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                background: transparent;
                border: 1px solid var(--border);
                color: var(--muted-foreground);
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .rdp-nav_button:hover {
                background: var(--accent);
                color: var(--gold);
              }
              .rdp-head_cell {
                color: var(--muted-foreground);
                font-size: 0.75rem;
                font-weight: 500;
                text-transform: uppercase;
                padding: 0.5rem 0;
              }
              .rdp-cell {
                padding: 2px;
              }
              .rdp-day {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                font-size: 0.875rem;
                color: var(--foreground);
                border: none;
                background: transparent;
              }
              .rdp-day:hover:not(.rdp-day_selected) {
                background: var(--accent);
                color: var(--gold);
              }
              .rdp-day_selected {
                background: var(--gold) !important;
                color: var(--background) !important;
                font-weight: 600;
              }
              .rdp-day_today:not(.rdp-day_selected) {
                background: var(--accent);
                font-weight: 600;
              }
              .rdp-day_outside {
                color: var(--muted-foreground);
                opacity: 0.4;
              }
            `}</style>

            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />

            <div className="mt-6 p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[var(--gold)]"></div>
                <span className="text-muted-foreground">Has appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments for Selected Date */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedDateAppointments.length} appointment
                  {selectedDateAppointments.length !== 1 ? "s" : ""} scheduled
                </p>
              </div>
            </div>

            {selectedDateAppointments.length === 0 ? (
              <div className="py-16 text-center">
                <CalendarIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl mb-2 text-muted-foreground">
                  No appointments
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  No appointments scheduled for this date
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateAppointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl bg-background/50 border border-border/50 hover:border-[var(--gold)]/50 transition-all cursor-pointer"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-lg mb-1">{apt.clientName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{apt.time}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
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

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{apt.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{apt.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <span className="inline-block px-3 py-1 rounded-full text-xs bg-[var(--gold)]/10 text-[var(--gold)]">
                        {apt.insuranceType}
                      </span>
                    </div>

                    {apt.zoomLink && (
                      <div className="mt-4 flex items-center gap-2">
                        <Video className="w-4 h-4 text-[var(--gold)]" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyZoomLink(apt.zoomLink!);
                          }}
                          className="text-sm text-[var(--gold)] hover:underline"
                        >
                          Copy Zoom Link
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
                  <div className="text-sm text-muted-foreground mb-1">
                    Client Name
                  </div>
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
                  <div className="text-sm text-muted-foreground mb-1">
                    Insurance Type
                  </div>
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
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedAppointment.status === "Completed"
                      ? "bg-[var(--emerald)]/10 text-[var(--emerald)]"
                      : selectedAppointment.status === "Cancelled"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-[var(--luxury-blue)]/10 text-[var(--luxury-blue)]"
                  }`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              {selectedAppointment.zoomLink && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Zoom Link
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={selectedAppointment.zoomLink}
                      readOnly
                      className="flex-1 px-4 py-2 rounded-lg bg-input border border-border"
                    />
                    <button
                      onClick={() =>
                        handleCopyZoomLink(selectedAppointment.zoomLink!)
                      }
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
                  <div className="p-4 rounded-lg bg-background/50">
                    {selectedAppointment.notes}
                  </div>
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