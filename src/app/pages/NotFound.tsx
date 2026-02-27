import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-5" />
      
      <div className="relative text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-9xl mb-6 bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">{t("notFound.title")}</h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
            {t("notFound.subtitle")}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#3B82F6] text-white rounded-lg hover:shadow-xl hover:shadow-[#3B82F6]/20 transition-all"
            >
              <Home className="w-5 h-5" />
              {t("notFound.home")}
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover:border-[#3B82F6]/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("notFound.back")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}