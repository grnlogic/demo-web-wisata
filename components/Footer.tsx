import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Pangandaran</h3>
                <p className="text-sm text-slate-300">Portal Wisata</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Portal informasi wisata Pangandaran hasil kolaborasi dengan KKN
              126. Menjelajahi keindahan Pangandaran, dari pantai hingga budaya
              lokal.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
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
                    info@wisatapangandaran.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">+62 265 639 xxx</p>
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
              © {new Date().getFullYear()} Wisata Pangandaran. All rights
              reserved.
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
