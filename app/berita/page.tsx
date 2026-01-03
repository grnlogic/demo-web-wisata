"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookmarkCheck,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  Flame,
  Newspaper,
  Search,
  Sparkles,
  TrendingUp,
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

const categories = [
  { name: "Wisata", slug: "wisata", count: 24, icon: Newspaper },
  { name: "Kuliner", slug: "kuliner", count: 18, icon: Flame },
  { name: "Budaya", slug: "budaya", count: 12, icon: BookmarkCheck },
  { name: "Event", slug: "event", count: 16, icon: Calendar },
  { name: "Pengumuman", slug: "pengumuman", count: 10, icon: Newspaper },
  { name: "Tips Wisata", slug: "tips-wisata", count: 20, icon: TrendingUp },
  { name: "Berita Lokal", slug: "berita-lokal", count: 14, icon: Clock },
];

export default function BeritaPage() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");

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

  useEffect(() => {
    void fetchBerita();
  }, [search, kategoriFilter]);

  const featuredNews = berita.filter((b) => b.featured).slice(0, 2);
  const latestNews = berita.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-b border-white/5">
        <div className="absolute inset-0 opacity-50 blur-3xl" aria-hidden>
          <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-blue-600/30" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-cyan-400/20" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm text-white/80">
                  Edisi Kurasi Redaksi
                </span>
              </div>
              <div className="hidden md:inline-flex items-center gap-2 text-xs text-white/70 uppercase tracking-[0.2em]">
                <div className="h-px w-8 bg-white/20" />
                <span>Berita & Insight</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                  Berita Pangandaran dengan rasa majalah premium
                </h1>
                <p className="text-lg text-slate-200/80">
                  Sorotan wisata, event, kuliner, dan pengembangan daerah yang
                  dikurasi dengan visual rapi, bukan portal generik.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                    <TrendingUp className="h-4 w-4" />
                    Tren harian
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                    <Flame className="h-4 w-4" />
                    Lokal populer
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                    <BookmarkCheck className="h-4 w-4" />
                    Arsip terverifikasi
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                {["Destinasi", "Kuliner", "Event", "Rekomendasi"].map(
                  (label) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/80 shadow-lg shadow-blue-900/20"
                    >
                      <div className="text-xs uppercase tracking-[0.08em] text-white/50">
                        Kanal
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
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl shadow-blue-900/30 p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Cari berita, topik, atau nama lokasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-12 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              <button
                onClick={() => setKategoriFilter("")}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition ${
                  kategoriFilter === ""
                    ? "bg-cyan-400 text-slate-950 border-cyan-300"
                    : "bg-white/5 border-white/10 text-white/80 hover:border-white/30"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setKategoriFilter(cat.name)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition ${
                    kategoriFilter === cat.name
                      ? "bg-cyan-400 text-slate-950 border-cyan-300"
                      : "bg-white/5 border-white/10 text-white/80 hover:border-white/30"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Rilis terkini diperbarui otomatis
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Pantau berita paling dibaca
            </div>
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Kurasi redaksi non-template
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Algoritma rekomendasi ringan
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
          {featuredNews.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-300/80 uppercase tracking-[0.18em]">
                    Pilihan utama
                  </p>
                  <h2 className="text-3xl font-semibold text-white mt-1">
                    Berita utama yang sedang hangat
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-white/70">
                  <TrendingUp className="h-4 w-4" />
                  Live pulse
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/berita/${news.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur shadow-2xl shadow-blue-900/30"
                  >
                    <div
                      className="relative h-64 overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.1) 0%, rgba(2,6,23,0.55) 70%), url(${
                          news.gambarUtama ||
                          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute top-5 left-5 flex items-center gap-2">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white border border-white/20">
                          {news.kategori}
                        </span>
                        {news.isExternal && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white border border-white/15">
                            <ExternalLink className="h-3 w-3" />
                            External
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 space-y-3 text-white">
                        <h3 className="text-2xl font-semibold leading-tight line-clamp-2 group-hover:text-cyan-200 transition">
                          {news.judul}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
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
                          <span className="inline-flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            {news.views}
                          </span>
                        </div>
                      </div>
                    </div>
                    {news.ringkasan && (
                      <div className="p-6 text-white/80">
                        <p className="line-clamp-3 text-sm leading-relaxed">
                          {news.ringkasan}
                        </p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300/80 uppercase tracking-[0.18em]">
                  Rilis terbaru
                </p>
                <h2 className="text-3xl font-semibold text-white mt-1">
                  Update cepat tanpa rasa portal murahan
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-white/70">
                <Clock className="h-4 w-4" />
                Terakhir diperbarui otomatis
              </div>
            </div>

            {latestNews.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/70">
                <Newspaper className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Belum ada berita
                </h3>
                <p>Konten akan segera hadir setelah redaksi mempublikasikan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/berita/${news.slug}`}
                    className="group flex flex-col h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-white/5 p-5 backdrop-blur shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:border-cyan-400/60"
                  >
                    <div
                      className="relative h-44 rounded-2xl overflow-hidden mb-4"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.45) 100%), url(${
                          news.gambarUtama ||
                          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=900&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white border border-white/10">
                          {news.kategori}
                        </span>
                        {news.isExternal && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[11px] text-slate-800 border border-black/10">
                            <ExternalLink className="h-3 w-3" />
                            External
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-cyan-200 transition">
                        {news.judul}
                      </h3>
                      {news.ringkasan && (
                        <p className="text-sm text-white/70 line-clamp-3 leading-relaxed">
                          {news.ringkasan}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {news.publishedAt
                            ? format(
                                new Date(news.publishedAt),
                                "dd MMM yyyy",
                                { locale: idLocale }
                              )
                            : format(new Date(news.createdAt), "dd MMM yyyy", {
                                locale: idLocale,
                              })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          {news.views}
                        </span>
                      </div>
                      {news.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {news.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80 border border-white/10"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                        Baca selengkapnya
                        <ArrowRight className="h-4 w-4" />
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
                <p className="text-sm text-cyan-300/80 uppercase tracking-[0.18em]">
                  Kurasi kategori
                </p>
                <h3 className="text-2xl font-semibold text-white mt-1">
                  Jelajahi kanal favorit pembaca
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Sparkles className="h-4 w-4" />
                Disusun berdasar performa mingguan
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setKategoriFilter(cat.name)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                    kategoriFilter === cat.name
                      ? "border-cyan-300/80 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-white/5 text-white/80 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className="h-5 w-5" />
                    <div>
                      <div className="font-semibold">{cat.name}</div>
                      <div className="text-xs text-white/60">
                        {cat.count} artikel
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
