import NavbarClient from "./NavbarClient";
import { CardNavItem } from "./CardNav";

export default function Navbar() {
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

  const logoSubtext = "Portal Wisata";

  return <NavbarClient items={defaultItems} logoSubtext={logoSubtext} />;
}
