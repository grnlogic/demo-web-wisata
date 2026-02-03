"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { useState, useEffect } from "react";

const footerLinks = {
  destinasi: [
    { name: "Pantai Pasir Putih", href: "/destinasi/pantai-pasir-putih" },
    { name: "Cagar Alam", href: "/destinasi/cagar-alam" },
    { name: "Green Canyon", href: "/destinasi/green-canyon" },
    { name: "Kampung Turis", href: "/destinasi/kampung-turis" },
  ],
  informasi: [
    { name: "Tentang Pangandaran", href: "/tentang" },
    { name: "Tentang KKN 126", href: "/tentang-kkn" },
    { name: "Event & Agenda", href: "/event" },
    { name: "Galeri", href: "/galeri" },
    { name: "Kontak", href: "/kontak" },
  ],
  bantuan: [
    { name: "FAQ", href: "/faq" },
    { name: "Tips Wisata", href: "/tips" },
    { name: "Transportasi", href: "/transportasi" },
    { name: "Akomodasi", href: "/akomodasi" },
  ],
};

interface Settings {
  site_about?: string;
  site_email?: string;
  site_phone?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_youtube?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to fetch settings:", err));
  }, []);
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
                <Image
                  src="/logo-dummy.svg"
                  alt="Logo Demo Portfolio"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">Wisata Demo</h3>
                <p className="text-sm text-slate-300">🎭 Demo Portfolio</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              {settings.site_about ||
                "Platform wisata demo dengan multi-role admin system, i18n, dan modern tech stack. Menggunakan dummy data untuk portfolio showcase."}
            </p>
            <Link
              href="/akomodasi"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md transition hover:from-amber-400 hover:to-amber-500"
            >
              Butuh hotel? Lihat pilihan
            </Link>
            <div className="flex space-x-3">
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-pink-600 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.social_twitter && (
                <a
                  href={settings.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-sky-600 flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.social_youtube && (
                <a
                  href={settings.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Destinasi */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Destinasi Populer</h4>
            <ul className="space-y-2">
              {footerLinks.destinasi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Informasi</h4>
            <ul className="space-y-2">
              {footerLinks.informasi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan & Kontak */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Bantuan</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.bantuan.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">
                    {settings.site_email || "demo@portfolio.com"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">
                    {settings.site_phone || "+62 265 639 xxx"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Wisata Demo - Portfolio Project
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
