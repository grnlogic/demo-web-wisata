"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  ShoppingBag,
  Utensils,
  PalmtreeIcon as Palm,
  Paintbrush,
  Camera,
  Loader2,
  Waves,
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

  useEffect(() => {
    fetchUKMs();
  }, [selectedCategory]);

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

  const featuredUkms = ukms.filter((u) => u.featured && u.verified);
  const regularUkms = ukms.filter((u) => !u.featured || !selectedCategory);

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white shadow-lg">
              <Store className="w-4 h-4" />
              <span className="text-sm">Dukung Ekonomi Lokal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Profil UKM Pangandaran
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Temukan produk dan layanan dari pelaku usaha lokal terbaik di
              Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <p className="text-slate-600">Memuat data UKM...</p>
            </div>
          </div>
        </section>
      )}

      {/* Featured UKM */}
      {!loading && featuredUkms.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  UKM Unggulan
                </h2>
                <p className="text-slate-600 mt-2">
                  UKM terverifikasi dengan reputasi terbaik
                </p>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">Terverifikasi</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredUkms.map((ukm) => (
                <Link
                  key={ukm.id}
                  href={`/ukm/${ukm.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="h-64 md:h-auto md:w-1/3 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          ukm.gambar[0] ||
                          ukm.logo ||
                          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
                        })`,
                      }}
                    />
                    <div className="p-6 md:w-2/3 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {ukm.logo ? (
                            <img
                              src={ukm.logo}
                              alt={ukm.namaUsaha}
                              className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                              <Store className="w-8 h-8 text-white" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                              {ukm.namaUsaha}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {ukm.kategori}
                            </p>
                          </div>
                        </div>
                        {ukm.verified && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                      </div>

                      <p className="text-slate-600 line-clamp-2">
                        {ukm.deskripsi}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                          <span>{ukm.lokasi}</span>
                        </div>
                      </div>

                      {ukm.produkLayanan.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {ukm.produkLayanan.slice(0, 3).map((produk: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                            >
                              {produk}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center space-x-3">
                          {ukm.nomorTelepon && (
                            <Phone className="w-4 h-4 text-slate-400" />
                          )}
                          {ukm.instagram && (
                            <Instagram className="w-4 h-4 text-slate-400" />
                          )}
                          {ukm.website && (
                            <Globe className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="flex items-center text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                          <span>Lihat Detail</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {!loading && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">
                Kategori UKM
              </h2>
              <p className="text-slate-600 mt-2">
                Temukan UKM berdasarkan kategori usaha
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`group p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center ${
                    selectedCategory === category.slug
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-16 h-16 mx-auto rounded-full mb-3 group-hover:scale-110 transition-transform ${
                      selectedCategory === category.slug
                        ? "bg-white/20"
                        : "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                    }`}
                  >
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3
                    className={`font-bold text-sm mb-1 ${
                      selectedCategory === category.slug
                        ? "text-white"
                        : "text-slate-800"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-xs ${
                      selectedCategory === category.slug
                        ? "text-white/80"
                        : "text-slate-500"
                    }`}
                  >
                    {category.count} UKM
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All UKM */}
      {!loading && regularUkms.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  {selectedCategory
                    ? `UKM ${selectedCategory}`
                    : "Semua UKM"}
                </h2>
                <p className="text-slate-600 mt-2">
                  {regularUkms.length} UKM ditemukan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularUkms.map((ukm) => (
                <Link
                  key={ukm.id}
                  href={`/ukm/${ukm.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                >
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${
                        ukm.gambar[0] ||
                        ukm.logo ||
                        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
                      })`,
                    }}
                  >
                    {ukm.featured && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    {ukm.verified && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-600 transition-colors line-clamp-1">
                          {ukm.namaUsaha}
                        </h3>
                        <p className="text-sm text-slate-600">{ukm.kategori}</p>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm line-clamp-2">
                      {ukm.deskripsi}
                    </p>

                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                      <span className="line-clamp-1">{ukm.lokasi}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center space-x-2">
                        {ukm.nomorTelepon && (
                          <Phone className="w-4 h-4 text-slate-400" />
                        )}
                        {ukm.instagram && (
                          <Instagram className="w-4 h-4 text-slate-400" />
                        )}
                        {ukm.website && (
                          <Globe className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex items-center text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        <span>Detail</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading && ukms.length === 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
                <Store className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Belum Ada UKM Terdaftar
              </h3>
              <p className="text-slate-600">
                Saat ini belum ada UKM yang terdaftar. Silakan cek kembali nanti.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!loading && ukms.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Punya Usaha di Pangandaran?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Daftarkan UKM Anda dan jangkau lebih banyak pelanggan!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/hubungi-kami"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-full font-semibold hover:bg-slate-50 transition-colors shadow-lg"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
