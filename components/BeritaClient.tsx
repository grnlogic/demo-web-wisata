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
import { id as idLocale, enUS as enLocale } from "date-fns/locale";

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

interface BeritaClientProps {
  initialBerita: Berita[];
  content: {
    hero: {
      badge: string;
      subbadge: string;
      title: string;
      subtitle: string;
      stats: {
        trend: string;
        popular: string;
        verified: string;
      };
      channel: string;
    };
    search: {
      placeholder: string;
      all: string;
      features: {
        release: string;
        monitor: string;
        curation: string;
        algo: string;
      };
    };
    featured: {
      badge: string;
      title: string;
      pulse: string;
      external: string;
    };
    latest: {
      badge: string;
      title: string;
      updated: string;
      empty: {
        title: string;
        desc: string;
      };
      readMore: string;
    };
    categories: {
      badge: string;
      title: string;
      desc: string;
      articles: string;
      items: {
        [key: string]: string; // key: slug, value: name
      }
    };
  };
  lang: 'id' | 'en';
}

// Static fallback, will be replaced by API/Props later or just used for icons
const categoryIcons: Record<string, any> = {
  wisata: Newspaper,
  kuliner: Flame,
  budaya: BookmarkCheck,
  event: Calendar,
  pengumuman: Newspaper,
  "tips-wisata": TrendingUp,
  "berita-lokal": Clock,
};

export default function BeritaClient({ initialBerita, content, lang }: BeritaClientProps) {
  const [berita, setBerita] = useState<Berita[]>(initialBerita);
  const [loading, setLoading] = useState(false);
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
    // Only fetch if search or filter changes
    if (!search && !kategoriFilter) {
      setBerita(initialBerita);
      return;
    }
    void fetchBerita();
  }, [search, kategoriFilter]);

  const featuredNews = berita.filter((b) => b.featured).slice(0, 2);
  const latestNews = berita.filter((b) => !b.featured);
  const dateLocale = lang === 'en' ? enLocale : idLocale;

  // Transform content.categories.items back to array for display
  const categoriesList = Object.entries(content.categories.items).map(([slug, name]) => ({
    slug,
    name,
    icon: categoryIcons[slug] || Newspaper,
    count: 0 // Count logic was hardcoded in original file, we can skip or pass it in content if needed. Original had hardcoded counts :D
  }));

  // Restore hardcoded counts from original file for UI consistency if needed, or just ignore.
  // Original file had hardcoded counts. Let's keep it simple or maybe mock it.
  const categoriesWithCounts = [
      { name: content.categories.items.wisata, slug: "wisata", count: 24, icon: Newspaper },
      { name: content.categories.items.kuliner, slug: "kuliner", count: 18, icon: Flame },
      { name: content.categories.items.budaya, slug: "budaya", count: 12, icon: BookmarkCheck },
      { name: content.categories.items.event, slug: "event", count: 16, icon: Calendar },
      { name: content.categories.items.pengumuman, slug: "pengumuman", count: 10, icon: Newspaper },
      { name: content.categories.items["tips-wisata"], slug: "tips-wisata", count: 20, icon: TrendingUp },
      { name: content.categories.items["berita-lokal"], slug: "berita-lokal", count: 14, icon: Clock },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-slate-800">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 border-b border-blue-500">
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-white/30 blur-[80px]" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-cyan-300/30 blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-3 py-1 backdrop-blur text-white">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">
                  {content.hero.badge}
                </span>
              </div>
              <div className="hidden md:inline-flex items-center gap-2 text-xs text-white/80 uppercase tracking-[0.2em]">
                <div className="h-px w-8 bg-white/30" />
                <span>{content.hero.subbadge}</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  {content.hero.title}
                </h1>
                <p className="text-lg text-blue-100">
                  {content.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white border border-white/20">
                    <TrendingUp className="h-4 w-4" />
                    {content.hero.stats.trend}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white border border-white/20">
                    <Flame className="h-4 w-4" />
                    {content.hero.stats.popular}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white border border-white/20">
                    <BookmarkCheck className="h-4 w-4" />
                    {content.hero.stats.verified}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                {["Destinasi", "Kuliner", "Event", "Rekomendasi"].map(
                  (label) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-center text-sm backdrop-blur shadow-lg"
                    >
                      <div className="text-xs uppercase tracking-[0.08em] text-white/70">
                        {content.hero.channel}
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

      {/* Search Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="rounded-3xl border border-slate-200 bg-white backdrop-blur shadow-2xl p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder={content.search.placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-12 py-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              <button
                onClick={() => setKategoriFilter("")}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition ${
                  kategoriFilter === ""
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {content.search.all}
              </button>
              {categoriesWithCounts.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setKategoriFilter(cat.name)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition ${
                    kategoriFilter === cat.name
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              {content.search.features.release}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              {content.search.features.monitor}
            </div>
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-blue-500" />
              {content.search.features.curation}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              {content.search.features.algo}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border border-slate-200 bg-slate-50 h-64"
            />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 uppercase tracking-[0.18em] font-semibold">
                    {content.featured.badge}
                  </p>
                  <h2 className="text-3xl font-bold text-slate-800 mt-1">
                    {content.featured.title}
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  {content.featured.pulse}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/berita/${news.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300"
                  >
                    <div
                      className="relative h-64 overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 70%), url(${
                          news.gambarUtama ||
                          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute top-5 left-5 flex items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow">
                          {news.kategori}
                        </span>
                        {news.isExternal && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/60 px-2.5 py-1 text-[11px] text-white border border-white/20">
                            <ExternalLink className="h-3 w-3" />
                            {content.featured.external}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 space-y-3 text-white">
                        <h3 className="text-2xl font-bold leading-tight line-clamp-2 group-hover:text-blue-200 transition drop-shadow-lg">
                          {news.judul}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/90">
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {news.publishedAt
                              ? format(
                                  new Date(news.publishedAt),
                                  "dd MMM yyyy",
                                  { locale: dateLocale }
                                )
                              : format(
                                  new Date(news.createdAt),
                                  "dd MMM yyyy",
                                  { locale: dateLocale }
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
                      <div className="p-6 text-slate-600">
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

          {/* Latest News */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 uppercase tracking-[0.18em] font-semibold">
                  {content.latest.badge}
                </p>
                <h2 className="text-3xl font-bold text-slate-800 mt-1">
                  {content.latest.title}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4 text-blue-500" />
                {content.latest.updated}
              </div>
            </div>

            {latestNews.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-lg">
                <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {content.latest.empty.title}
                </h3>
                <p>{content.latest.empty.desc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/berita/${news.slug}`}
                    className="group flex flex-col h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300"
                  >
                    <div
                      className="relative h-44 rounded-2xl overflow-hidden mb-4"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%), url(${
                          news.gambarUtama ||
                          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=900&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                          {news.kategori}
                        </span>
                        {news.isExternal && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-1 text-[11px] text-white">
                            <ExternalLink className="h-3 w-3" />
                            {content.featured.external}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition">
                        {news.judul}
                      </h3>
                      {news.ringkasan && (
                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                          {news.ringkasan}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {news.publishedAt
                            ? format(
                                new Date(news.publishedAt),
                                "dd MMM yyyy",
                                { locale: dateLocale }
                              )
                            : format(new Date(news.createdAt), "dd MMM yyyy", {
                                locale: dateLocale,
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
                              className="rounded-full bg-blue-100 px-3 py-1 text-[11px] text-blue-700 border border-blue-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                        {content.latest.readMore}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Categories Section */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-blue-600 uppercase tracking-[0.18em] font-semibold">
                  {content.categories.badge}
                </p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {content.categories.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Sparkles className="h-4 w-4 text-blue-500" />
                {content.categories.desc}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoriesWithCounts.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setKategoriFilter(cat.name)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                    kategoriFilter === cat.name
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-semibold">{cat.name}</div>
                      <div className="text-xs text-slate-400">
                        {cat.count} {content.categories.articles}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
