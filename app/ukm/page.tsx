"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  Globe,
  Instagram,
  Loader2,
  MapPin,
  PalmtreeIcon as Palm,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Utensils,
  Waves,
  Paintbrush,
  Camera,
} from "lucide-react";

interface UKM {
  id: string;
  namaUsaha: string;
  slug: string;
  deskripsi: string;
  kategori: string;
  pemilik: string;
  lokasi: string;
  logo?: string;
  gambar: string[];
  produkLayanan: string[];
  featured: boolean;
  verified: boolean;
  nomorTelepon?: string;
  email?: string;
  instagram?: string;
  website?: string;
}

export default function UkmPage() {
  const [ukms, setUkms] = useState<UKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchUKMs = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("kategori", selectedCategory);

      const response = await fetch(`/api/ukm?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setUkms(data);
      }
    } catch (error) {
      console.error("Error fetching UKMs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUKMs();
  }, [selectedCategory]);

  const featuredUkms = ukms.filter((u) => u.featured && u.verified);
  const regularUkms = ukms.filter((u) => !(u.featured && u.verified));

  // Count UKMs by category
  const categories = [
    { name: "Semua", slug: "", icon: Store },
    { name: "Kuliner", slug: "Kuliner", icon: Utensils },
    { name: "Kerajinan", slug: "Kerajinan", icon: Paintbrush },
    { name: "Jasa Wisata", slug: "Jasa Wisata", icon: Palm },
    { name: "Souvenir", slug: "Souvenir", icon: ShoppingBag },
    { name: "Fashion", slug: "Fashion", icon: Camera },
  ].map((cat) => ({
    ...cat,
    count: cat.slug
      ? ukms.filter((u) => u.kategori === cat.slug).length
      : ukms.length,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border-b border-white/5">
        <div className="absolute inset-0 opacity-60 blur-3xl" aria-hidden>
          <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-emerald-500/30" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-teal-400/20" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm text-white/80">Kurasi UKM Lokal</span>
              </div>
              <div className="hidden md:inline-flex items-center gap-2 text-xs text-white/70 uppercase tracking-[0.2em]">
                <div className="h-px w-8 bg-white/20" />
                <span>Profil premium</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                  UKM Pangandaran versi butik, bukan katalog generik
                </h1>
                <p className="text-lg text-slate-200/80">
                  Jelajahi brand kuliner, kerajinan, hingga jasa wisata dengan
                  presentasi rapi dan info kontak siap pakai.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                    <TrendingUp className="h-4 w-4" />
                    Terlaris mingguan
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                    <BadgeCheck className="h-4 w-4" />
                    Terverifikasi
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                    <Waves className="h-4 w-4" />
                    Khas pesisir
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                {["Kuliner", "Kerajinan", "Jasa Wisata", "Souvenir"].map(
                  (label) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/80 shadow-lg shadow-emerald-900/30"
                    >
                      <div className="text-xs uppercase tracking-[0.08em] text-white/50">
                        Sektor
                      </div>
                      <div className="font-semibold text-white">{label}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl shadow-emerald-900/30 p-6 md:p-7 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Cari UKM, kategori, atau lokasi..."
                value={selectedCategory ? selectedCategory : undefined}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/70"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition ${
                    selectedCategory === cat.slug
                      ? "bg-emerald-300 text-slate-950 border-emerald-200"
                      : "bg-white/5 border-white/10 text-white/80 hover:border-white/30"
                  }`}
                >
                  {cat.name}
                  <span className="ml-2 text-xs text-white/60">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              UKM terverifikasi tampil di atas
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Lokasi dan kontak siap pakai
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Visual glassy non-template
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistik kategori ringan
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border border-white/5 bg-white/5 h-64"
            />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {featuredUkms.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-200/80 uppercase tracking-[0.18em]">
                    Unggulan
                  </p>
                  <h2 className="text-3xl font-semibold text-white mt-1">
                    UKM terverifikasi pilihan
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-white/70">
                  <BadgeCheck className="h-4 w-4" />
                  Kurasi redaksi
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredUkms.map((ukm) => (
                  <Link
                    key={ukm.id}
                    href={`/ukm/${ukm.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur shadow-2xl shadow-emerald-900/30"
                  >
                    <div
                      className="relative h-64 overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.1) 0%, rgba(2,6,23,0.6) 70%), url(${
                          ukm.gambar[0] ||
                          ukm.logo ||
                          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white border border-white/10">
                        <Store className="h-4 w-4" />
                        {ukm.kategori}
                      </div>
                      <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                        <BadgeCheck className="h-4 w-4" />
                        Verified
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {ukm.logo ? (
                            <img
                              src={ukm.logo}
                              alt={ukm.namaUsaha}
                              className="w-14 h-14 rounded-xl object-cover border border-white/15"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center border border-white/15">
                              <Store className="w-7 h-7 text-white" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-emerald-200 transition-colors">
                              {ukm.namaUsaha}
                            </h3>
                            <p className="text-sm text-white/60">
                              {ukm.pemilik}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-200 text-sm">
                          <Star className="h-4 w-4" />
                          Unggulan
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                        {ukm.deskripsi}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-white/70">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                          <MapPin className="h-4 w-4" />
                          {ukm.lokasi}
                        </span>
                        {ukm.produkLayanan.slice(0, 3).map((produk, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-100 border border-emerald-300/30"
                          >
                            {produk}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-3 text-white/70">
                          {ukm.nomorTelepon && <Phone className="h-4 w-4" />}
                          {ukm.instagram && <Instagram className="h-4 w-4" />}
                          {ukm.website && <Globe className="h-4 w-4" />}
                        </div>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 group-hover:translate-x-1 transition-transform">
                          Lihat detail
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-200/80 uppercase tracking-[0.18em]">
                  Semua UKM
                </p>
                <h2 className="text-3xl font-semibold text-white mt-1">
                  {selectedCategory
                    ? `UKM ${selectedCategory}`
                    : "Direktori lengkap"}
                </h2>
                <p className="text-white/60 mt-1">
                  {regularUkms.length} UKM ditemukan
                </p>
              </div>
            </div>

            {regularUkms.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/70">
                <Store className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Belum ada UKM
                </h3>
                <p>Data akan muncul setelah ada pendaftar baru.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularUkms.map((ukm) => (
                  <Link
                    key={ukm.id}
                    href={`/ukm/${ukm.slug}`}
                    className="group flex flex-col h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-white/5 p-4 backdrop-blur shadow-xl shadow-emerald-950/25 transition hover:-translate-y-1 hover:border-emerald-300/60"
                  >
                    <div
                      className="relative h-44 rounded-2xl overflow-hidden mb-4"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.45) 100%), url(${
                          ukm.gambar[0] ||
                          ukm.logo ||
                          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white border border-white/10">
                        <Store className="h-3.5 w-3.5" />
                        {ukm.kategori}
                      </div>
                      {ukm.featured && (
                        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-300/90 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow">
                          <Star className="h-3.5 w-3.5" />
                          Featured
                        </span>
                      )}
                      {ukm.verified && (
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-400/90 px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-emerald-200 transition">
                          {ukm.namaUsaha}
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-1">
                          {ukm.deskripsi}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{ukm.lokasi}</span>
                      </div>
                      {ukm.produkLayanan.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {ukm.produkLayanan.slice(0, 2).map((produk, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80 border border-white/10"
                            >
                              {produk}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-sm">
                        <div className="flex items-center gap-2 text-white/70">
                          {ukm.nomorTelepon && <Phone className="h-4 w-4" />}
                          {ukm.instagram && <Instagram className="h-4 w-4" />}
                          {ukm.website && <Globe className="h-4 w-4" />}
                        </div>
                        <div className="inline-flex items-center gap-2 font-semibold text-emerald-200 group-hover:translate-x-1 transition-transform">
                          Detail
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-emerald-200/80 uppercase tracking-[0.18em]">
                  Ajukan UKM
                </p>
                <h3 className="text-2xl font-semibold text-white mt-1">
                  Punya usaha? Tampilkan dengan gaya premium
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Sparkles className="h-4 w-4" />
                Gratis onboarding & foto sampul
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/hubungi-kami"
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-emerald-300 text-slate-950 font-semibold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40 transition"
              >
                Daftar sekarang
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 text-sm">
                Kami kurasi profil lengkap: logo, galeri foto, produk unggulan,
                dan kontak.
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
