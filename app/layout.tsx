import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import ChatSupport from "@/components/ChatSupport";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wisata Pangandaran - Portal Informasi Wisata",
  description:
    "Jelajahi keindahan alam, budaya, dan kuliner Pangandaran. Portal informasi wisata terpercaya untuk destinasi wisata terbaik di Pangandaran.",
  keywords: [
    "wisata pangandaran",
    "pantai pangandaran",
    "green canyon",
    "cagar alam",
    "wisata jawa barat",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50`}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatSupport />
        </SessionProvider>
      </body>
    </html>
  );
}
