import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Calendar, Users, LogOut } from "lucide-react";
import { toast } from "sonner";
import logo from "figma:asset/5cd219d9afe328db6196c812cd74b522e89396af.png";

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin");
    onClose?.();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="w-64 h-full bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Finance Avec Jordi" 
            className="h-10 w-auto object-contain" 
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">Admin Dashboard</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button 
            onClick={() => handleNavigation("/admin/dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive("/admin/dashboard")
                ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                : "text-muted-foreground hover:bg-accent/50"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => handleNavigation("/admin/dashboard/calendar")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive("/admin/dashboard/calendar")
                ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                : "text-muted-foreground hover:bg-accent/50"
            }`}
          >
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span>Calendar</span>
          </button>
          
          <button 
            onClick={() => handleNavigation("/admin/dashboard/clients")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive("/admin/dashboard/clients")
                ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                : "text-muted-foreground hover:bg-accent/50"
            }`}
          >
            <Users className="w-5 h-5" strokeWidth={1.5} />
            <span>Clients</span>
          </button>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}