"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Component, ErrorInfo, ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import CardNav, { CardNavItem } from "./CardNav";
import { useModal } from "./ModalContext";

// Error Boundary Component
class NavbarErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Navbar Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback Simple Navbar
function SimpleFallbackNavbar({
  isAuthed,
  displayName,
  onLogout,
  onLogin,
}: {
  isAuthed: boolean;
  displayName: string;
  onLogout: () => void;
  onLogin: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("🔄 Using SimpleFallbackNavbar");
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[998] bg-slate-900/95 border-b border-white/10 shadow-xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-white font-bold text-xl">Pangandaran</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition"
            >
              Beranda
            </Link>
            <Link
              href="/destinasi"
              className="text-white/80 hover:text-white transition"
            >
              Destinasi
            </Link>
            <Link
              href="/kuliner"
              className="text-white/80 hover:text-white transition"
            >
              Kuliner
            </Link>
            <Link
              href="/event"
              className="text-white/80 hover:text-white transition"
            >
              Event
            </Link>
            <Link
              href="/galeri"
              className="text-white/80 hover:text-white transition"
            >
              Galeri
            </Link>
            <Link
              href="/berita"
              className="text-white/80 hover:text-white transition"
            >
              Berita
            </Link>

            {isAuthed ? (
              <div className="flex items-center gap-3">
                <span className="text-white/70 text-sm">{displayName}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition text-sm"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <Link
              href="/"
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition rounded"
            >
              Beranda
            </Link>
            <Link
              href="/destinasi"
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition rounded"
            >
              Destinasi
            </Link>
            <Link
              href="/kuliner"
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition rounded"
            >
              Kuliner
            </Link>
            <Link
              href="/event"
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition rounded"
            >
              Event
            </Link>
            <Link
              href="/galeri"
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition rounded"
            >
              Galeri
            </Link>
            <Link
              href="/berita"
              className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 transition rounded"
            >
              Berita
            </Link>
            <div className="px-4 pt-4 border-t border-white/10">
              {isAuthed ? (
                <>
                  <div className="text-white/70 text-sm mb-2">
                    {displayName}
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={onLogin}
                  className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const cardNavItems: CardNavItem[] = [
  {
    label: "Jelajah Wisata",
    bgColor: "#0f172a",
    textColor: "#e2e8f0",
    links: [
      {
        label: "Beranda",
        href: "/",
        ariaLabel: "Kembali ke beranda",
      },
      {
        label: "Destinasi",
        href: "/destinasi",
        ariaLabel: "Jelajahi Destinasi Wisata",
      },
      {
        label: "Kuliner",
        href: "/kuliner",
        ariaLabel: "Kuliner Khas Pangandaran",
      },
      { label: "Galeri", href: "/galeri", ariaLabel: "Galeri Foto Wisata" },
    ],
  },
  {
    label: "Informasi",
    bgColor: "#111827",
    textColor: "#e2e8f0",
    links: [
      { label: "Berita", href: "/berita", ariaLabel: "Berita Terkini" },
      {
        label: "Event & Agenda",
        href: "/event",
        ariaLabel: "Event dan Agenda",
      },
      { label: "UKM Lokal", href: "/ukm", ariaLabel: "UKM Lokal Pangandaran" },
    ],
  },
  {
    label: "Lainnya",
    bgColor: "#0b1224",
    textColor: "#e2e8f0",
    links: [
      {
        label: "Tentang",
        href: "/tentang",
        ariaLabel: "Tentang Wisata Pangandaran",
      },
      { label: "Tips Perjalanan", href: "/tips", ariaLabel: "Tips Perjalanan" },
      {
        label: "Transportasi",
        href: "/transportasi",
        ariaLabel: "Info Transportasi",
      },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [useFallback, setUseFallback] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Safe modal hook usage - will not crash if ModalProvider is missing
  let isModalOpen = false;
  try {
    const modalContext = useModal();
    isModalOpen = modalContext?.isModalOpen ?? false;
  } catch (e) {
    console.warn("Modal context not available in Navbar");
  }

  // Track mount status
  useEffect(() => {
    setMounted(true);
    console.log("Navbar mounted successfully");
  }, []);

  // Don't show navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const displayName =
    session?.user?.name ||
    session?.user?.username ||
    session?.user?.email?.split("@")[0] ||
    "Pengguna";
  const isAuthed = status === "authenticated" && !!session?.user;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleLogin = () => {
    window.location.href = "/admin/login";
  };

  // Fallback detector - check if CardNav fails to mount
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const navElement = document.querySelector('[data-cardnav="true"]');
      if (!navElement) {
        console.warn("⚠️ CardNav not detected after 1.5s, switching to fallback navbar");
        setUseFallback(true);
      } else {
        console.log("✓ CardNav detected and rendered successfully");
        // CardNav found, make sure fallback is not shown
        setUseFallback(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [mounted]);

  // If fallback mode is triggered, use simple navbar
  if (useFallback) {
    return (
      <SimpleFallbackNavbar
        isAuthed={isAuthed}
        displayName={displayName}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <NavbarErrorBoundary
      fallback={
        <SimpleFallbackNavbar
          isAuthed={isAuthed}
          displayName={displayName}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      }
    >
      <div
        className={`transition-all duration-300 ${
          isModalOpen
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <CardNav
          logo="/logo.png"
          logoAlt="Logo Wisata Pangandaran"
          logoText="Pangandaran"
          logoSubtext="Portal Wisata"
          items={cardNavItems}
          baseColor="#ffffff"
          menuColor="#1e293b"
          buttonBgColor="#0ea5e9"
          buttonTextColor="#ffffff"
          isAuthenticated={isAuthed}
          userName={displayName}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      </div>
    </NavbarErrorBoundary>
  );
}
