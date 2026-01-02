"use client";

import Link from "next/link";
import { MapPin, Star, ArrowRight, Search } from "lucide-react";
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
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Destinasi Wisata</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Temukan berbagai destinasi wisata menarik di Pangandaran, dari
              pantai hingga cagar alam
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari destinasi..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Category */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {[
                "Semua",
                "PANTAI",
                "CAGAR_ALAM",
                "GOA",
                "WISATA_BUDAYA",
                "WISATA_BAHARI",
                "WAHANA_AIR",
                "KAMPUNG_TURIS",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "Semua" ? "" : category)
                  }
                  className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    (category === "Semua" && !selectedCategory) ||
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {category === "Semua"
                    ? "Semua"
                    : getKategoriLabel(category as KategoriDestinasi)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinasi Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-slate-600">Memuat destinasi...</p>
            </div>
          ) : destinasi.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                Tidak ada destinasi ditemukan
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinasi.map((dest) => {
                const primaryImage = dest.images.find((img) => img.isPrimary);
                return (
                  <div
                    key={dest.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {primaryImage ? (
                        <img
                          src={primaryImage.url}
                          alt={dest.nama}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <MapPin className="w-16 h-16 text-slate-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {getKategoriLabel(dest.kategori)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {dest.nama}
                      </h3>

                      <div className="flex items-center gap-2 text-slate-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{dest.lokasi}</span>
                      </div>

                      {dest.rating !== null && dest.rating > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {dest.rating.toFixed(1)}
                          </span>
                          <span className="text-slate-500 text-sm">
                            ({dest.jumlahReview} review)
                          </span>
                        </div>
                      )}

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {dest.deskripsi}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          {formatPrice(dest.harga) && (
                            <div className="text-blue-600 font-bold text-lg">
                              {formatPrice(dest.harga)}
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/destinasi/${dest.slug}`}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Lihat Detail
                          <ArrowRight className="w-4 h-4" />
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
