import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";
import { CardNavItem } from "./CardNav";
import { translateText } from "@/lib/translation";

export default async function Navbar() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "id" | "en") || "id";

  // Default Items (Indonesian)
  const defaultItems: CardNavItem[] = [
    {
      label: "Beranda",
      bgColor: "#0f172a",
      textColor: "#e2e8f0",
      links: [
        {
          label: "Beranda",
          href: `/`,
          ariaLabel: "Beranda",
        },
        {
          label: "Destinasi",
          href: `/destinasi`,
          ariaLabel: "Destinasi Wisata",
        },
        {
          label: "Kuliner",
          href: `/kuliner`,
          ariaLabel: "Kuliner Khas",
        },
        { 
          label: "Galeri", 
          href: `/galeri`, 
          ariaLabel: "Galeri Foto"
        },
      ],
    },
    {
      label: "Berita",
      bgColor: "#111827",
      textColor: "#e2e8f0",
      links: [
        { 
          label: "Berita", 
          href: `/berita`, 
          ariaLabel: "Berita Terkini"
        },
        {
          label: "Event",
          href: `/event`,
          ariaLabel: "Event & Acara",
        },
        { 
          label: "UKM", 
          href: `/ukm`, 
          ariaLabel: "Usaha Kecil Menengah"
        },
      ],
    },
    {
      label: "Tentang",
      bgColor: "#0b1224",
      textColor: "#e2e8f0",
      links: [
        {
          label: "Tentang Kami",
          href: `/tentang`,
          ariaLabel: "Tentang Pangandaran",
        },
        { 
          label: "Tips Wisata", 
          href: `/tips`, 
          ariaLabel: "Tips Berwisata"
        },
        {
          label: "Transportasi",
          href: `/transportasi`,
          ariaLabel: "Transportasi & Akses",
        },
      ],
    },
  ];

  let items = defaultItems;
  let logoSubtext = "Portal Wisata";

  // Translate if English
  if (lang === "en") {
    // Parallel translation for performance
    logoSubtext = await translateText("Portal Wisata", "id", "en");
    
    items = await Promise.all(
      defaultItems.map(async (group) => {
        const groupLabel = await translateText(group.label, "id", "en");
        
        const links = await Promise.all(
          group.links.map(async (link) => ({
            ...link,
            label: await translateText(link.label, "id", "en"),
            ariaLabel: await translateText(link.ariaLabel, "id", "en"),
          }))
        );

        return {
          ...group,
          label: groupLabel,
          links,
        };
      })
    );
  }

  return <NavbarClient items={items} logoSubtext={logoSubtext} />;
}
