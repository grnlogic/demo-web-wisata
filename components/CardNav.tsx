"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, User } from "lucide-react";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor?: string; // Kept for type compatibility, used as accent
  textColor?: string; // Kept for type compatibility
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  logoText?: string;
  logoSubtext?: string;
  items: CardNavItem[];
  className?: string; // Kept for compatibility
  ease?: string; // Kept for compatibility
  baseColor?: string; // Kept for compatibility
  menuColor?: string; // Kept for compatibility
  buttonBgColor?: string; // Kept for compatibility
  buttonTextColor?: string; // Kept for compatibility
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
}

export default function CardNav({
  logo,
  logoAlt = "Logo",
  logoText,
  logoSubtext,
  items,
  isAuthenticated = false,
  userName,
  onLogout,
  onLogin,
}: CardNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 border-b ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-white/10 py-3 shadow-xl"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group z-[101]">
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                  isScrolled ? "bg-slate-900 border border-white/10" : "bg-white/10 backdrop-blur-sm border border-white/20"
                }`}
              >
                <img
                  src={logo}
                  alt={logoAlt}
                  className="w-8 h-8 object-contain"
                />
              </div>
              {(logoText || logoSubtext) && (
                <div className="flex flex-col">
                  {logoText && (
                    <span
                      className={`font-bold text-lg leading-tight tracking-tight ${
                        isScrolled ? "text-white" : "text-white drop-shadow-md"
                      }`}
                    >
                      {logoText}
                    </span>
                  )}
                  {logoSubtext && (
                    <span
                      className={`text-xs font-medium tracking-wide ${
                        isScrolled
                          ? "text-slate-400"
                          : "text-slate-200 drop-shadow-sm"
                      }`}
                    >
                      {logoSubtext}
                    </span>
                  )}
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
              {items.map((group, idx) => (
                <div
                  key={group.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeDropdown === idx
                        ? "bg-white text-slate-900 shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 p-2 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 origin-top ${
                      activeDropdown === idx
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 translate-y-2 invisible"
                    }`}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900/95 rotate-45 border-l border-t border-white/10" />
                    <div className="relative flex flex-col gap-1">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group/link"
                        >
                          <span className="text-sm font-medium text-slate-200 group-hover/link:text-white">
                            {link.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 group-hover/link:text-cyan-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Login/Profile */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 pl-4">
                  <div className="flex items-center gap-2 text-right">
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold ${isScrolled ? "text-white" : "text-white drop-shadow-md"}`}>
                        {userName}
                      </span>
                      <button
                        onClick={onLogout}
                        className="text-xs text-slate-400 hover:text-white transition-colors text-right"
                      >
                        Sign out
                      </button>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                        <User className="w-4 h-4 text-cyan-200" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="relative group px-6 py-2.5 rounded-full overflow-hidden shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-opacity group-hover:opacity-90" />
                  <span className="relative text-sm font-bold text-white flex items-center gap-2">
                    Masuk
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-900/50 backdrop-blur border border-white/10 text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[150] bg-slate-950/90 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-white">{logoText}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {items.map((group) => (
              <div key={group.label} className="space-y-3">
                <h3 className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                  {group.label}
                </h3>
                <div className="grid gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 active:scale-[0.98] transition-all"
                    >
                      <span className="text-base font-medium text-slate-200">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-200">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{userName}</p>
                    <p className="text-xs text-slate-400">Sedang aktif</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-red-400 hover:text-red-300"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg active:scale-[0.98] transition-transform"
              >
                Masuk / Daftar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
