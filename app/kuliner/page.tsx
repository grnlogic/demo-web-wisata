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
    <div className="min-h-screen pt-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Utensils className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold">Kuliner Pangandaran</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nikmati beragam kuliner khas Pangandaran, dari seafood segar
              hingga makanan tradisional
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
                placeholder="Cari kuliner..."
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Category */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {[
                "Semua",
                "Restoran",
                "Warung",
                "Cafe",
                "Seafood",
                "Makanan Tradisional",
                "Street Food",
                "Bakery",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "Semua" ? "" : category)
                  }
                  className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    (category === "Semua" && !selectedCategory) ||
                    selectedCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-slate-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : kuliner.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
              <Utensils className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Tidak Ada Kuliner Ditemukan
            </h3>
            <p className="text-slate-600 mb-6">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kuliner.map((item) => (
              <Link
                key={item.id}
                href={`/kuliner/${item.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  {item.gambar && item.gambar.length > 0 ? (
                    <img
                      src={item.gambar[0]}
                      alt={item.nama}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Utensils className="w-20 h-20 text-white/30" />
                    </div>
                  )}

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-700">
                    {item.kategori}
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {item.nama}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-slate-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="text-sm line-clamp-1">
                        {item.lokasi}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2">
                    {item.deskripsi}
                  </p>

                  <div className="space-y-2">
                    {/* Price */}
                    <div className="flex items-center gap-2 text-slate-700">
                      <DollarSign className="w-4 h-4 shrink-0 text-orange-600" />
                      <span className="text-sm font-semibold">
                        {formatPrice(item.hargaMin, item.hargaMax)}
                      </span>
                    </div>

                    {/* Rating */}
                    {item.rating && item.rating > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" />
                        <span className="text-sm font-semibold text-slate-700">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Jam Buka */}
                    {item.jamBuka && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{item.jamBuka}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-orange-600 group-hover:text-orange-700 font-semibold">
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Featured Section */}
        {!loading && kuliner.length > 0 && kuliner.some((k) => k.featured) && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Kuliner Pilihan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {kuliner
                .filter((k) => k.featured)
                .slice(0, 2)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/kuliner/${item.slug}`}
                    className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
                  >
                    <div className="flex gap-6">
                      <div className="relative w-48 h-48 shrink-0 rounded-xl overflow-hidden bg-slate-200">
                        {item.gambar && item.gambar.length > 0 ? (
                          <img
                            src={item.gambar[0]}
                            alt={item.nama}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Utensils className="w-16 h-16 text-white/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold mb-2">
                            ⭐ Featured
                          </span>
                          <h3 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                            {item.nama}
                          </h3>
                        </div>
                        <p className="text-slate-600 line-clamp-3">
                          {item.deskripsi}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <DollarSign className="w-4 h-4 text-orange-600" />
                            <span className="font-semibold">
                              {formatPrice(item.hargaMin, item.hargaMax)}
                            </span>
                          </div>
                          {item.rating && item.rating > 0 && (
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {item.rating.toFixed(1)}
                              </span>
                            </div>
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
      <section className="py-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Punya Rekomendasi Kuliner?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bantu wisatawan lain menemukan kuliner terbaik di Pangandaran
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-colors shadow-xl hover:shadow-2xl"
          >
            <Phone className="w-5 h-5" />
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  );
}
