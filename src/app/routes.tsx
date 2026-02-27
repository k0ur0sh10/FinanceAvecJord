import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { BookingPage } from "./pages/BookingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminCalendar } from "./pages/AdminCalendar";
import { AdminClients } from "./pages/AdminClients";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "booking", element: <BookingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminLogin /> },
      {
        path: "dashboard",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "calendar", element: <AdminCalendar /> },
          { path: "clients", element: <AdminClients /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);