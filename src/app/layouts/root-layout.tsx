import { Outlet } from "react-router";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
