"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import CardNav, { CardNavItem } from "./CardNav";

interface NavbarClientProps {
  items: CardNavItem[];
  logoSubtext: string;
}

export default function NavbarClient({
  items,
  logoSubtext,
}: NavbarClientProps) {
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
    "User";
  const isAuthed = status === "authenticated" && !!session?.user;

  return (
    <div className="relative">
      <CardNav
        logo="/logo-dummy.svg"
        logoAlt="Logo Demo Portfolio"
        logoText="Wisata Demo"
        logoSubtext={logoSubtext}
        items={items}
        baseColor="#ffffff"
        menuColor="#1e293b"
        buttonBgColor="#0ea5e9"
        buttonTextColor="#ffffff"
        isAuthenticated={isAuthed}
        userName={displayName}
        onLogout={async () => await signOut({ callbackUrl: `/` })}
        onLogin={() => (window.location.href = "/admin/login")}
      />
    </div>
  );
}
