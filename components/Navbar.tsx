"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search, MapPin, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Destinasi", href: "/destinasi" },
  { name: "Event & Agenda", href: "/event" },
  { name: "Berita", href: "/berita" },
  { name: "UKM Lokal", href: "/ukm" },
  { name: "Galeri", href: "/galeri" },
  { name: "Tentang", href: "/tentang" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-slate-900/50 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                isScrolled
                  ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                  : "bg-white/20 backdrop-blur-sm border-2 border-white/30"
              )}
            >
              <MapPin
                className={cn(
                  "w-6 h-6 transition-colors",
                  isScrolled ? "text-white" : "text-white"
                )}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-bold text-lg transition-colors",
                  isScrolled ? "text-slate-800" : "text-white"
                )}
              >
                Pangandaran
              </span>
              <span
                className={cn(
                  "text-xs transition-colors",
                  isScrolled ? "text-slate-500" : "text-white/80"
                )}
              >
                Portal Wisata
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? isScrolled
                        ? "bg-blue-500 text-white"
                        : "bg-white/20 text-white backdrop-blur-sm"
                      : isScrolled
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white/90 hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Admin Login Button */}
            <Link
              href="/admin/login"
              className={cn(
                "ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center space-x-2",
                isScrolled
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30"
              )}
            >
              <LogIn className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Search & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button
              className={cn(
                "p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/20">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-500 text-white"
                        : isScrolled
                        ? "text-slate-700 hover:bg-slate-100"
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Admin Login Button for Mobile */}
              <Link
                href="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2",
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                    : "bg-white/20 text-white backdrop-blur-sm border border-white/30"
                )}
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
