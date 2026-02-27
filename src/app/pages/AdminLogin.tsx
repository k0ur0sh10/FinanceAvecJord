import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication (in production, this would be handled by a backend)
    if (formData.email === "admin@jbadvisor.com" && formData.password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials. Try admin@jbadvisor.com / admin123");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--gold)] rounded-full blur-3xl opacity-5" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[var(--luxury-blue)] rounded-full blur-3xl opacity-5" />

      <div className="relative w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-xl"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[var(--gold)]" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl mb-2">Admin Login</h1>
            <p className="text-sm text-muted-foreground">
              JB Advisor Dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 transition-all text-foreground"
                  placeholder="admin@jbadvisor.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-input border border-border focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20 transition-all text-foreground"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[var(--gold)] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[var(--gold)] text-background rounded-lg hover:shadow-xl hover:shadow-[var(--gold)]/20 transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 rounded-lg bg-background/50 border border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              <strong className="text-foreground">Demo Credentials:</strong><br />
              Email: admin@jbadvisor.com<br />
              Password: admin123
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="w-3 h-3 text-[var(--gold)]" />
              Secure Admin Access - All activity is logged
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}