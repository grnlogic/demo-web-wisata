"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const router = useRouter();
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check initial cookie
    const match = document.cookie.match(/NEXT_LOCALE=(id|en)/);
    if (match) {
      setLang(match[1] as "id" | "en");
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "id" ? "en" : "id";
    setLang(newLang);
    
    // Set cookie that expires in 1 year
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Refresh to trigger server-side translation
    router.refresh();
  };

  return (
    <button
      onClick={toggleLanguage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 transition-all duration-300
        ${
          isHovered
            ? "border-blue-400 bg-blue-50/10 shadow-lg shadow-blue-500/20 backdrop-blur-md"
            : "border-white/20 bg-white/10 backdrop-blur-sm"
        }
      `}
      aria-label="Switch Language"
    >
      {/* Background Gradient Animation */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* Icon & Label Container */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Animated Globe Icon */}
        <div className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md transition-transform duration-500 ${lang === 'en' ? 'rotate-180' : 'rotate-0'}`}>
          <Globe className="h-4 w-4 text-white" />
        </div>

        {/* Text Switcher */}
        <div className="flex flex-col items-start justify-center overflow-hidden h-9 w-[4.5rem]">
          <div 
            className="flex flex-col transition-transform duration-500 ease-spring"
            style={{ transform: lang === 'id' ? 'translateY(0)' : 'translateY(-50%)' }}
          >
            {/* ID State - Show English option */}
            <div className="flex h-9 flex-col justify-center">
              <span className={`text-sm font-bold tracking-tight transition-colors ${isHovered ? 'text-blue-600' : 'text-slate-700'}`}>
                English
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Switch to
              </span>
            </div>

            {/* EN State - Show Indonesia option */}
            <div className="flex h-9 flex-col justify-center">
              <span className={`text-sm font-bold tracking-tight transition-colors ${isHovered ? 'text-blue-600' : 'text-slate-700'}`}>
                Indonesia
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Ganti ke
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
