"use client";

import Link from "next/link";
import {
  MapPin,
  Star,
  ArrowRight,
  Search,
  Utensils,
  DollarSign,
  Clock,
  Phone,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Kuliner {
  id: string;
  nama: string;
  slug: string;
  kategori: string;
  lokasi: string;
  alamat: string;
  deskripsi: string;
  hargaMin: number | null;
  hargaMax: number | null;
  rating: number | null;
  jamBuka: string | null;
  nomorTelepon: string | null;
  gambar: string[];
  featured: boolean;
}

export default function KulinerPage() {
  const [kuliner, setKuliner] = useState<Kuliner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchKuliner();
  }, [search, selectedCategory]);

  const fetchKuliner = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: "PUBLISHED",
      });

      if (search) params.append("search", search);
      if (selectedCategory && selectedCategory !== "Semua")
        params.append("kategori", selectedCategory);

      const response = await fetch(`/api/kuliner?${params}`);
      const data = await response.json();

      if (response.ok) {
        setKuliner(data);
      } else {
        console.error("Failed to fetch kuliner:", data.error);
      }
    } catch (error) {
      console.error("Error fetching kuliner:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (min: number | null, max: number | null) => {
    if (!min && !max) return "Harga belum tersedia";
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    }
    if (min) return `Mulai ${formatter.format(min)}`;
    return `Hingga ${formatter.format(max!)}`;
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-64 w-64 bg-orange-400/25 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 bg-pink-500/20 blur-[120px]" />
        <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 bg-amber-300/15 blur-[120px]" />
      </div>

      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-lg backdrop-blur">
                <Utensils className="w-4 h-4" />
                <span>Radar rasa Pangandaran</span>
              </div>
              <div className="space-y-3">
                eg
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Kuliner favorit wisatawan pangandaran
                </h1>
                <p className="text-lg text-white/80 max-w-2xl">
                  Dari hidangan laut segar di pesisir pantai hingga kopi hangat
                  untuk menemani malam Jelajahi kategori pilihan, temukan cita
                  rasa terbaik dan duduk di meja favorit Anda.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/75">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  Pilihan Kuliner Lokal
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <DollarSign className="w-4 h-4 text-emerald-200" />
                  Informasi Harga
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <Clock className="w-4 h-4 text-cyan-200" />
                  Jam Operasional
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-300/20 via-pink-200/15 to-amber-200/10 blur-3xl" />
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
                      placeholder="Cari seafood asap, kopi malam, atau jajanan pasar..."
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-12 py-3 text-sm text-white placeholder:text-white/50 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Semua",
                      "Restoran",
                      "Warung",
                      "Cafe",
                      "Seafood",
                      "Makanan Tradisional",
                      "Street Food",
                      "Bakery",
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
                              ? "border-amber-300 bg-amber-300/20 text-amber-50 shadow-lg shadow-amber-400/25"
                              : "border-white/10 bg-white/5 text-white/80 hover:border-amber-200 hover:text-white"
                          }`}
                        >
                          {category}
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

      {/* Search & Filter */}
      <section className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Cari kuliner..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-12 py-3 text-sm text-white placeholder:text-white/50 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {[
                "Semua",
                "Restoran",
                "Warung",
                "Cafe",
                "Seafood",
                "Makanan Tradisional",
                "Street Food",
                "Bakery",
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
                        ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/40"
                        : "bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl animate-pulse"
              >
                <div className="h-56 bg-white/10" />
                <div className="p-6 space-y-3">
                  <div className="h-5 rounded bg-white/10" />
                  <div className="h-4 rounded bg-white/10 w-2/3" />
                  <div className="h-4 rounded bg-white/10 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : kuliner.length === 0 ? (
          <div className="text-center py-16 text-white/75">
            <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
              <Utensils className="h-10 w-10 text-white/50" />
            </div>
            <h3 className="text-2xl font-semibold">
              Tidak ada kuliner ditemukan
            </h3>
            <p className="text-sm text-white/60">
              Coba ubah kata kunci atau kategori.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kuliner.map((item) => (
              <Link
                key={item.id}
                href={`/kuliner/${item.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition hover:-translate-y-2 hover:border-amber-200/40"
              >
                <div className="relative h-60 overflow-hidden">
                  {item.gambar && item.gambar.length > 0 ? (
                    <img
                      src={item.gambar[0]}
                      alt={item.nama}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500">
                      <Utensils className="h-14 w-14 text-white/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/60" />
                  {item.featured && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-amber-300 text-slate-900 px-3 py-1 text-xs font-bold shadow">
                      <Star className="h-4 w-4" /> Favorit
                    </div>
                  )}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                    {item.kategori}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-100 transition line-clamp-1">
                      {item.nama}
                    </h3>
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                      {formatPrice(item.hargaMin, item.hargaMax)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{item.lokasi}</span>
                  </div>

                  <p className="text-sm text-white/75 leading-relaxed line-clamp-3">
                    {item.deskripsi}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                    {item.rating && item.rating > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold">
                        <Star className="h-4 w-4 text-amber-300" />
                        {item.rating.toFixed(1)}
                      </span>
                    )}
                    {item.jamBuka && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                        <Clock className="h-4 w-4" /> {item.jamBuka}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 text-sm font-semibold text-amber-100">
                    <span className="text-white/60">Lihat detail</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Featured Section */}
        {!loading && kuliner.length > 0 && kuliner.some((k) => k.featured) && (
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Pilihan Tim & Warga
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kuliner
                .filter((k) => k.featured)
                .slice(0, 2)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/kuliner/${item.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/15 via-pink-500/10 to-amber-400/10 p-6 shadow-2xl transition hover:-translate-y-2 hover:border-amber-200/40"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                      <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-white/10">
                        {item.gambar && item.gambar.length > 0 ? (
                          <img
                            src={item.gambar[0]}
                            alt={item.nama}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500">
                            <Utensils className="h-12 w-12 text-white/40" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-amber-300 text-slate-900 px-3 py-1 text-xs font-bold shadow">
                          <Star className="h-4 w-4" /> Favorit
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/85">
                          <Sparkles className="h-4 w-4 text-amber-300" />
                          Direkomendasikan
                        </div>
                        <h3 className="text-2xl font-semibold text-white group-hover:text-amber-100 transition">
                          {item.nama}
                        </h3>
                        <p className="text-white/75 leading-relaxed line-clamp-3">
                          {item.deskripsi}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold">
                            <DollarSign className="h-4 w-4 text-emerald-200" />
                            {formatPrice(item.hargaMin, item.hargaMax)}
                          </span>
                          {item.rating && item.rating > 0 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold">
                              <Star className="h-4 w-4 text-amber-300" />
                              {item.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 via-pink-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Punya rekomendasi rasa baru?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            ada hidden gem atau tempat favorit keluarga? Jangan disimpan
            sendiri, Yuk, bagikan ke semua!
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-orange-600 font-semibold shadow-xl transition hover:-translate-y-1"
          >
            <Phone className="w-5 h-5" />
            Hubungi kami
          </a>
        </div>
      </section>
    </div>
  );
}
