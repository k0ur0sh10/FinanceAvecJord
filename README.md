# JB Advisor - Premium Insurance Advisory Website

A luxurious, modern, and premium website for insurance advisors and sellers, featuring a secure admin dashboard for managing appointments and clients.

## 🌟 Features

### Public Website
- **Home Page**: Hero section with bold messaging, trust indicators, and smooth animations
- **Services Page**: Premium cards showcasing all insurance products
- **Booking Page**: Elegant appointment scheduling with calendar-based UI
- **About Page**: Advisor profile, certifications, and professional values
- **Contact Page**: Elegant contact form and office information

### Admin Dashboard
- **Secure Login**: Protected admin access (Demo: admin@jbadvisor.com / admin123)
- **Dashboard Overview**: Real-time statistics and KPIs
- **Appointments Management**: 
  - View, add, edit, and delete appointments
  - Change appointment status (Scheduled/Completed/Cancelled)
  - Generate and copy Zoom meeting links
  - Filter and search appointments
- **Calendar View**: Visual calendar representation
- **Client Details**: Comprehensive client information and notes

## 🎨 Design Features

- **Dark Mode Theme**: Deep charcoal and midnight blue color palette
- **Luxury Accents**: Gold, champagne, emerald, and soft blue highlights
- **Glassmorphism**: Subtle transparency and backdrop blur effects
- **Smooth Animations**: Motion-powered transitions and micro-interactions
- **Modern Typography**: Clean, spacious layout with strong hierarchy
- **Premium Feel**: Design inspired by luxury private banking and wealth management

## 🔐 Admin Credentials

**Email**: admin@jbadvisor.com  
**Password**: admin123

## 📱 Pages

### Public Pages
- `/` - Home
- `/services` - Insurance Products
- `/booking` - Book Appointment
- `/about` - About the Advisor
- `/contact` - Contact Us

### Admin Pages
- `/admin` - Admin Login
- `/admin/dashboard` - Dashboard (protected)

## 🛠 Technologies

- **React 18** with TypeScript
- **React Router** for navigation
- **Motion** for animations
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **Sonner** for toast notifications
- **date-fns** for date handling
- **LocalStorage** for data persistence (demo)

## 💾 Data Storage

Currently using localStorage for appointment and client data. In production, this should be connected to a backend API or database (e.g., Supabase, Firebase).

## 🚀 Getting Started

The application is ready to use. Simply:

1. Navigate to the home page to explore the public website
2. Book an appointment through the booking page
3. Access the admin dashboard at `/admin` using the credentials above
4. Manage appointments, generate Zoom links, and track clients

## ✨ Key Highlights

- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Premium UX**: Smooth transitions, hover effects, and micro-interactions
- **Accessible**: Proper semantic HTML and ARIA labels
- **Type Safe**: Full TypeScript support
- **Modern Stack**: Latest React patterns and best practices