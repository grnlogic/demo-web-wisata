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

interface DestinasiClientProps {
  initialDestinasi: Destinasi[];
  content: {
    badge: string;
    title: string;
    description: string;
    features: {
      kurasi: string;
      coords: string;
      rating: string;
    };
    filter: {
      label: string;
      live: string;
      searchPlaceholder: string;
    };
    searchBar: {
      placeholder: string;
    };
    categories: {
      [key: string]: string;
    };
    loading: string;
    empty: {
      title: string;
      desc: string;
    };
    card: {
      reviews: string;
      noReviews: string;
      detail: string;
      free: string;
    };
  };
}

export default function DestinasiClient({
  initialDestinasi,
  content,
}: DestinasiClientProps) {
  const [destinasi, setDestinasi] = useState<Destinasi[]>(initialDestinasi);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Only fetch if search or category changes (client-side filtering)
  useEffect(() => {
    if (search === "" && selectedCategory === "") {
      setDestinasi(initialDestinasi);
      return;
    }
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

  const getKategoriLabel = (kat: KategoriDestinasi | string) => {
    // Use translated labels from content prop, fallback to key
    return content.categories[kat as string] || kat;
  };

  const formatPrice = (
    hargaList: Array<{ jenisHarga: string; harga: number }>
  ) => {
    if (!hargaList || hargaList.length === 0) return null;
    const minPrice = Math.min(...hargaList.map((h) => h.harga));
    if (minPrice === 0) return content.card.free;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(minPrice);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-slate-800">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-64 w-64 bg-blue-400/20 blur-[100px] rounded-full" />
        <div className="absolute right-0 top-10 h-80 w-80 bg-cyan-400/15 blur-[100px] rounded-full" />
        <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 bg-blue-300/10 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-80 w-80 bg-white/20 blur-[80px] rounded-full" />
          <div className="absolute right-0 bottom-0 h-96 w-96 bg-cyan-300/30 blur-[100px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm shadow-lg backdrop-blur text-white">
                <Compass className="w-4 h-4" />
                <span>{content.badge}</span>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  {content.title}
                </h1>
                <p className="text-lg text-blue-100 max-w-2xl">
                  {content.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  {content.features.kurasi}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  {content.features.coords}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur">
                  <Star className="w-4 h-4 text-amber-200" />
                  {content.features.rating}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-white/20 via-cyan-200/15 to-transparent blur-3xl rounded-full" />
              <div className="relative rounded-3xl border border-white/20 bg-white/15 p-6 shadow-2xl backdrop-blur-lg">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>{content.filter.label}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                    {content.filter.live}
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      placeholder={content.filter.searchPlaceholder}
                      className="w-full rounded-2xl border border-white/20 bg-white/20 px-12 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
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
                              ? "border-white bg-white text-blue-600 shadow-lg"
                              : "border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
                          }`}
                        >
                          {category === "Semua"
                            ? content.categories.Semua || "Semua"
                            : getKategoriLabel(category)}
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

      {/* Search & Filter Sticky */}
      <section className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={content.searchBar.placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category === "Semua"
                      ? content.categories.Semua || "Semua"
                      : getKategoriLabel(category)}
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
            <div className="text-center py-16 text-slate-600">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500" />
              {content.loading}
            </div>
          ) : destinasi.length === 0 ? (
            <div className="text-center py-16 text-slate-600">
              <p className="text-lg">{content.empty.title}</p>
              <p className="text-sm text-slate-400">
                {content.empty.desc}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinasi.map((dest) => {
                const primaryImage = dest.images.find((img) => img.isPrimary);
                return (
                  <div
                    key={dest.id}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {primaryImage ? (
                        <img
                          src={primaryImage.url}
                          alt={dest.nama}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
                          <MapPin className="h-12 w-12 text-blue-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-lg">
                        {getKategoriLabel(dest.kategori)}
                      </div>
                      {dest.rating !== null && dest.rating > 0 && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                          <Star className="h-3.5 w-3.5" /> {dest.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">
                          {dest.nama}
                        </h3>
                        {formatPrice(dest.harga) && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                            {formatPrice(dest.harga)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{dest.lokasi}</span>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {dest.deskripsi}
                      </p>

                      <div className="flex items-center justify-between pt-2 text-sm">
                        {dest.jumlahReview ? (
                          <span className="text-slate-400">
                            {dest.jumlahReview} {content.card.reviews}
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            {content.card.noReviews}
                          </span>
                        )}
                        <Link
                          href={`/destinasi/${dest.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          {content.card.detail}
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
