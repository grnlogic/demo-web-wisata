"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import CardNav, { CardNavItem } from "./CardNav";

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

  return (
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
      onLogout={async () => await signOut({ callbackUrl: "/" })}
      onLogin={() => (window.location.href = "/admin/login")}
    />
  );
}
