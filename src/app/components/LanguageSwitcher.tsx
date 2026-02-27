import { useLanguage } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/30 border border-border/50">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          language === "en"
            ? "bg-[#3B82F6] text-white"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("fr")}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          language === "fr"
            ? "bg-[#3B82F6] text-white"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </button>
    </div>
  );
}
