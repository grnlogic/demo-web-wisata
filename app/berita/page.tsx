"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Eye,
  ArrowRight,
  Newspaper,
  TrendingUp,
  Clock,
  ExternalLink,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface Berita {
  id: string;
  judul: string;
  slug: string;
  konten: string;
  ringkasan: string | null;
  kategori: string;
  gambarUtama: string | null;
  tags: string[];
  sourceUrl: string | null;
  isExternal: boolean;
  views: number;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  admin: {
    nama: string;
    username: string;
  };
}

export default function BeritaPage() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");

  useEffect(() => {
    fetchBerita();
  }, [search, kategoriFilter]);

  const fetchBerita = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (kategoriFilter) params.append("kategori", kategoriFilter);

      const response = await fetch(`/api/berita?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data berita");

      const data = await response.json();
      setBerita(data);
    } catch (error) {
      console.error("Error fetching berita:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredNews = berita.filter((b) => b.featured).slice(0, 2);
  const latestNews = berita.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white shadow-lg">
              <Newspaper className="w-4 h-4" />
              <span className="text-sm">Portal Berita & Informasi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Berita & Artikel Pangandaran
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Informasi terkini seputar wisata, event, dan pengembangan
              Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Kategori</option>
              <option value="Wisata">Wisata</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Budaya">Budaya</option>
              <option value="Event">Event</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Tips Wisata">Tips Wisata</option>
              <option value="Berita Lokal">Berita Lokal</option>
            </select>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600">Memuat berita...</p>
        </div>
      ) : (
        <>
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                      Berita Utama
                    </h2>
                    <p className="text-slate-600 mt-2">
                      Berita terpopuler dan terbaru
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="text-sm font-semibold">Trending Now</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredNews.map((news) => (
                    <Link
                      key={news.id}
                      href={`/berita/${news.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div
                        className="relative h-64 lg:h-80 overflow-hidden"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.5) 70%), url(${
                            news.gambarUtama ||
                            "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                            {news.kategori}
                          </span>
                        </div>
                        {news.isExternal && (
                          <div className="absolute top-4 right-4">
                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs text-slate-700 rounded-full flex items-center">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              External
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                          <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-cyan-200 transition-colors">
                            {news.judul}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-white/80">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {news.publishedAt
                                ? format(
                                    new Date(news.publishedAt),
                                    "dd MMM yyyy",
                                    { locale: idLocale }
                                  )
                                : format(
                                    new Date(news.createdAt),
                                    "dd MMM yyyy",
                                    { locale: idLocale }
                                  )}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {news.views}
                            </span>
                          </div>
                        </div>
                      </div>
                      {news.ringkasan && (
                        <div className="p-6">
                          <p className="text-slate-600 line-clamp-3">
                            {news.ringkasan}
                          </p>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Latest News */}
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    Berita Terbaru
                  </h2>
                  <p className="text-slate-600 mt-2">Update terkini</p>
                </div>
                <div className="flex items-center text-slate-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm font-semibold">Latest Updates</span>
                </div>
              </div>

              {latestNews.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Belum Ada Berita
                  </h3>
                  <p className="text-slate-600">
                    Belum ada berita yang dipublikasikan.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {latestNews.map((news) => (
                    <Link
                      key={news.id}
                      href={`/berita/${news.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div
                        className="relative h-48 overflow-hidden"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.3) 100%), url(${
                            news.gambarUtama ||
                            "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                            {news.kategori}
                          </span>
                        </div>
                        {news.isExternal && (
                          <div className="absolute top-4 right-4">
                            <span className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                              <ExternalLink className="w-3 h-3 text-slate-700" />
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {news.judul}
                        </h3>
                        {news.ringkasan && (
                          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                            {news.ringkasan}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {news.publishedAt
                              ? format(
                                  new Date(news.publishedAt),
                                  "dd MMM yyyy",
                                  { locale: idLocale }
                                )
                              : format(
                                  new Date(news.createdAt),
                                  "dd MMM yyyy",
                                  {
                                    locale: idLocale,
                                  }
                                )}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {news.views}
                          </span>
                        </div>

                        {news.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {news.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center text-blue-600 font-semibold mt-4 group-hover:translate-x-2 transition-transform">
                          <span className="text-sm">Baca Selengkapnya</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

const categories = [
  {
    name: "Tips Wisata",
    slug: "tips-wisata",
    count: 24,
    icon: Newspaper,
  },
  {
    name: "Berita Lokal",
    slug: "berita-lokal",
    count: 18,
    icon: TrendingUp,
  },
  {
    name: "Event",
    slug: "event",
    count: 12,
    icon: Calendar,
  },
  {
    name: "Pengumuman",
    slug: "pengumuman",
    count: 15,
    icon: Newspaper,
  },
];
