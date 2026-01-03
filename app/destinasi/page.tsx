"use client";

import Link from "next/link";
import {
  MapPin,
  Star,
  ArrowRight,
  Search,
  Compass,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { KategoriDestinasi } from "@prisma/client";

interface DestinasiImage {
  url: string;
  caption: string | null;
  isPrimary: boolean;
}

interface Destinasi {
  id: string;
  nama: string;
  slug: string;
  kategori: KategoriDestinasi;
  lokasi: string;
  deskripsi: string;
  rating: number | null;
  jumlahReview: number | null;
  images: DestinasiImage[];
  harga: Array<{
    jenisHarga: string;
    harga: number;
  }>;
}

export default function DestinasiPage() {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchDestinasi();
  }, [search, selectedCategory]);

  const fetchDestinasi = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: "PUBLISHED",
      });

      if (search) params.append("search", search);
      if (selectedCategory && selectedCategory !== "Semua")
        params.append("kategori", selectedCategory);

      const response = await fetch(`/api/destinasi?${params}`);
      const data = await response.json();

      if (response.ok) {
        setDestinasi(data.data);
      } else {
        console.error("Failed to fetch destinasi:", data.error);
      }
    } catch (error) {
      console.error("Error fetching destinasi:", error);
    } finally {
      setLoading(false);
    }
  };

  const getKategoriLabel = (kat: KategoriDestinasi) => {
    const labels: Record<KategoriDestinasi, string> = {
      PANTAI: "Pantai",
      CAGAR_ALAM: "Cagar Alam",
      GOA: "Goa",
      WISATA_BUDAYA: "Wisata Budaya",
      WISATA_BAHARI: "Wisata Bahari",
      WAHANA_AIR: "Wahana Air",
      KAMPUNG_TURIS: "Kampung Turis",
      LAINNYA: "Lainnya",
    };
    return labels[kat] || kat;
  };

  const formatPrice = (
    hargaList: Array<{ jenisHarga: string; harga: number }>
  ) => {
    if (!hargaList || hargaList.length === 0) return null;
    const minPrice = Math.min(...hargaList.map((h) => h.harga));
    if (minPrice === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(minPrice);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-64 w-64 bg-cyan-500/25 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 bg-blue-600/20 blur-[120px]" />
        <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 bg-emerald-400/15 blur-[120px]" />
      </div>

      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/70 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-lg backdrop-blur">
                <Compass className="w-4 h-4" />
                <span>Peta rasa Pangandaran</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Destinasi yang punya cerita, bukan cuma spot foto.
                </h1>
                <p className="text-lg text-white/80 max-w-2xl">
                  Kurasi pantai, cagar alam, dan sudut lokal yang biasanya cuma
                  dibisikkan warga. Pilih vibe, sesuaikan tempo, langsung jalan.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  Kurasi warga
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  Koordinat siap pakai
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <Star className="w-4 h-4 text-amber-200" />
                  Rating real visitor
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-300/15 via-blue-200/10 to-indigo-300/10 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Filter cepat</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    Live search
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      placeholder="Cari pantai sepi, gua hijau, atau kuliner..."
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-12 py-3 text-sm text-white placeholder:text-white/50 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Semua",
                      "PANTAI",
                      "CAGAR_ALAM",
                      "GOA",
                      "WISATA_BUDAYA",
                      "WISATA_BAHARI",
                      "WAHANA_AIR",
                      "KAMPUNG_TURIS",
                    ].map((category) => {
                      const active =
                        (category === "Semua" && !selectedCategory) ||
                        selectedCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(
                              category === "Semua" ? "" : category
                            )
                          }
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                            active
                              ? "border-cyan-300 bg-cyan-400/20 text-cyan-50 shadow-lg shadow-cyan-500/20"
                              : "border-white/10 bg-white/5 text-white/80 hover:border-cyan-200 hover:text-white"
                          }`}
                        >
                          {category === "Semua"
                            ? "Semua"
                            : getKategoriLabel(category as KategoriDestinasi)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter (sticky) */}
      <section className="sticky top-16 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Cari destinasi..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-12 py-3 text-sm text-white placeholder:text-white/50 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {[
                "Semua",
                "PANTAI",
                "CAGAR_ALAM",
                "GOA",
                "WISATA_BUDAYA",
                "WISATA_BAHARI",
                "WAHANA_AIR",
                "KAMPUNG_TURIS",
              ].map((category) => {
                const active =
                  (category === "Semua" && !selectedCategory) ||
                  selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category === "Semua" ? "" : category)
                    }
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30"
                        : "bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {category === "Semua"
                      ? "Semua"
                      : getKategoriLabel(category as KategoriDestinasi)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Destinasi Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 text-white/70">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
              Memuat destinasi...
            </div>
          ) : destinasi.length === 0 ? (
            <div className="text-center py-16 text-white/70">
              <p className="text-lg">Tidak ada destinasi ditemukan</p>
              <p className="text-sm text-white/50">
                Coba kata kunci atau kategori lain.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinasi.map((dest) => {
                const primaryImage = dest.images.find((img) => img.isPrimary);
                return (
                  <div
                    key={dest.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition hover:-translate-y-2 hover:border-cyan-200/40"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {primaryImage ? (
                        <img
                          src={primaryImage.url}
                          alt={dest.nama}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-800">
                          <MapPin className="h-12 w-12 text-white/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/60" />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                        {getKategoriLabel(dest.kategori)}
                      </div>
                      {dest.rating !== null && dest.rating > 0 && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                          <Star className="h-4 w-4" /> {dest.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-100 transition">
                          {dest.nama}
                        </h3>
                        {formatPrice(dest.harga) && (
                          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100 border border-emerald-300/30">
                            {formatPrice(dest.harga)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{dest.lokasi}</span>
                      </div>

                      <p className="text-sm text-white/75 leading-relaxed line-clamp-3">
                        {dest.deskripsi}
                      </p>

                      <div className="flex items-center justify-between pt-2 text-sm font-semibold text-cyan-100">
                        {dest.jumlahReview ? (
                          <span className="text-white/60">
                            {dest.jumlahReview} ulasan nyata
                          </span>
                        ) : (
                          <span className="text-white/50">
                            Belum ada ulasan
                          </span>
                        )}
                        <Link
                          href={`/destinasi/${dest.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 px-3 py-1.5 text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-100"
                        >
                          Lihat detail
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
