// Demo data initializer for the admin dashboard

export function initializeDemoData() {
  // Check if appointments already exist
  const existing = localStorage.getItem("appointments");
  if (existing) {
    return; // Don't overwrite existing data
  }

  // Create some demo appointments
  const demoAppointments = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 234-5678",
      insuranceType: "Life Insurance",
      date: "2026-02-15",
      time: "10:00 AM",
      notes: "Interested in term life insurance policy for family protection",
      status: "Scheduled",
      zoomLink: "https://zoom.us/j/123456789",
      createdAt: new Date("2026-02-08").toISOString(),
    },
    {
      id: "2",
      clientName: "Michael Chen",
      email: "m.chen@company.com",
      phone: "+1 (555) 345-6789",
      insuranceType: "Business Insurance",
      date: "2026-02-16",
      time: "2:00 PM",
      notes: "Looking for comprehensive business liability coverage",
      status: "Scheduled",
      zoomLink: "https://zoom.us/j/987654321",
      createdAt: new Date("2026-02-07").toISOString(),
    },
    {
      id: "3",
      clientName: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 456-7890",
      insuranceType: "Health Insurance",
      date: "2026-02-12",
      time: "11:00 AM",
      notes: "Family health insurance consultation",
      status: "Completed",
      createdAt: new Date("2026-02-01").toISOString(),
    },
    {
      id: "4",
      clientName: "David Thompson",
      email: "d.thompson@email.com",
      phone: "+1 (555) 567-8901",
      insuranceType: "Investment & Retirement",
      date: "2026-02-09",
      time: "3:00 PM",
      notes: "Retirement planning and wealth management",
      status: "Scheduled",
      createdAt: new Date("2026-02-05").toISOString(),
    },
  ];

  localStorage.setItem("appointments", JSON.stringify(demoAppointments));
}
