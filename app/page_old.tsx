import type { SVGProps } from "react";
import React from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Image as ImageIcon,
  Star,
  ArrowRight,
  Hotel,
  Waves,
  Mountain,
  Camera,
  Sun,
  Compass,
  Trees,
  Ship,
  Sparkles,
  Store,
  Newspaper,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import QuickPlannerCalendar from "@/components/QuickPlannerCalendar";
import SafeImage from "@/components/SafeImage";
import { prisma } from "@/lib/prisma";
import { createBackgroundImageStyle } from "@/lib/utils";
import ToolkitSection from "@/components/Toolkit";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch real data from database
  const rekomendasi = await prisma.rekomendasi.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: [{ featured: "desc" }, { urutan: "asc" }, { createdAt: "desc" }],
    take: 3,
  });

  const hotels = await prisma.hotelListing.findMany({
    orderBy: [{ rating: "desc" }, { reviews: "desc" }, { fetchedAt: "desc" }],
    take: 24,
  });

  const latestNews = await prisma.berita.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 5,
    select: { judul: true, slug: true, publishedAt: true, createdAt: true },
  });

  const allGaleri = await prisma.galeri.findMany({
    where: {
      tipeMedia: "IMAGE",
    },
    orderBy: [{ urutan: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      judul: true,
      deskripsi: true,
      url: true,
      thumbnail: true,
      kategori: true,
      tags: true,
    },
  });

  const dailyHotels = pickDailySubset(hotels, 3);
  const galeriMoodboard = pickDailySubset(allGaleri, 3);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-slate-800">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 bg-blue-400/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-32 h-80 w-80 bg-cyan-400/15 blur-[100px] rounded-full" />
        <div className="absolute left-1/2 bottom-0 h-64 w-64 -translate-x-1/2 bg-blue-300/10 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <VideoBackground />
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-300/50 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-200/40 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left Content */}
            <div className="space-y-10">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/25 px-5 py-2.5 text-sm shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium tracking-wide">Pangandaran, Jawa Barat</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white drop-shadow-2xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
                    Jelajahi
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-white" style={{ textShadow: "none" }}>
                    Pangandaran
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-xl leading-relaxed font-light" style={{ textShadow: "0 2px 15px rgba(0,0,0,0.2)" }}>
                  Rasakan pesona pantai eksotis, jelajahi <span className="font-semibold text-cyan-200">Green Canyon</span> yang memukau, dan nikmati kuliner laut segar langsung dari nelayan lokal.
                </p>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge icon={Sun} label="Sunset Spot" />
                <Badge icon={Waves} label="Pantai Eksotis" />
                <Badge icon={Compass} label="Adventure" />
                <Badge icon={Camera} label="Instagramable" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/destinasi"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-white font-bold shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/25 hover:shadow-3xl"
                >
                  <span>Mulai Petualangan</span>
                  <ArrowRight className="w-5 h-5 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/galeri"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/60 bg-white/20 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/30 hover:border-white backdrop-blur-md"
                >
                  <Camera className="w-5 h-5" />
                  <span>Lihat Galeri</span>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  { label: "Destinasi", value: "25+", icon: MapPin },
                  { label: "Foto & Video", value: "500+", icon: ImageIcon },
                  { label: "Event/Tahun", value: "30+", icon: Calendar },
                  { label: "Rating", value: "4.8", icon: Star },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className="group rounded-2xl border border-white/30 bg-white/15 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:bg-white/25 hover:border-white/50 hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                      <item.icon className="w-4 h-4 text-cyan-300" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Cards */}
            <div className="relative hidden lg:block">
              {/* Glow effect behind cards */}
              <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-transparent blur-3xl rounded-full" />
              
              <div className="relative space-y-5">
                {/* Quick Plan Card */}
                <div className="rounded-3xl border border-white/30 bg-white/20 p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/25">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Rencana Instan</p>
                        <p className="text-xs text-white/60">Siap pakai, tinggal berangkat</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-xs font-bold text-white shadow">
                      GRATIS
                    </div>
                  </div>
                  <div className="space-y-4">
                    {quickSteps.slice(0, 3).map((step, idx) => (
                      <div key={step.title} className="flex items-start gap-4 group/step">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-gradient-to-r from-cyan-400 to-blue-400' : 'bg-white/40'} shadow`} />
                          {idx < 2 && <div className="w-0.5 h-8 bg-white/20 mt-1" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200 font-semibold">
                            {step.time}
                          </p>
                          <p className="font-semibold text-white mt-0.5">{step.title}</p>
                          <p className="text-sm text-white/70 line-clamp-1">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {moodTrips.slice(0, 2).map((item) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl border border-white/30 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div
                        className="h-44"
                        style={createBackgroundImageStyle(
                          item.image,
                          "linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(30, 64, 175, 0.6) 70%)"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-cyan-600/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 backdrop-blur">
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs text-white/90 font-medium">{item.badge}</span>
                        </div>
                        <p className="font-bold text-lg text-white group-hover:text-cyan-100 transition">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/60 text-xs font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Daily Hotels */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-semibold">
                Pilihan hotel hari ini
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                3 pilihan terbaik hari ini
              </h3>
              <p className="text-slate-600 text-lg">
                Rekomendasi hotel berubah setiap hari, jadi kamu selalu punya
                pilihan segar untuk menginap.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              <Star className="w-4 h-4" />
              Kurasi otomatis harian
            </div>
          </div>

          {dailyHotels.length === 0 ? (
            <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-10 text-center text-slate-600">
              Data hotel belum tersedia. Jalankan POST /api/hotels untuk memuat
              snapshot, lalu coba lagi.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dailyHotels.map((hotel) => {
                const hasLink = Boolean(hotel.link);

                return (
                  <div
                    key={hotel.id}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300"
                  >
                    <div className="h-48 w-full overflow-hidden bg-blue-100 relative">
                      <SafeImage
                        src={hotel.thumbnail}
                        alt={hotel.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-[0.18em] text-blue-600 font-semibold">
                            {hotel.source ?? "Google Hotels"}
                          </p>
                          <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">
                            {hotel.name}
                          </h4>
                        </div>
                        {hotel.rating ? (
                          <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 text-xs font-bold text-white shadow">
                            <Star className="h-3 w-3" />{" "}
                            {hotel.rating.toFixed(1)}
                          </div>
                        ) : null}
                      </div>
                      {hotel.location ? (
                        <p className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="h-4 w-4 text-blue-500" />{" "}
                          {hotel.location}
                        </p>
                      ) : null}
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {hotel.description ??
                          "Lihat detail harga dan ketersediaan di penyedia."}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-emerald-600">
                          {hotel.price ?? "Lihat harga"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {hotel.reviews
                            ? `${hotel.reviews} ulasan`
                            : "Ulasan belum ada"}
                        </span>
                      </div>
                      <div className="pt-3">
                        {hasLink ? (
                          <a
                            href={hotel.link as string}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Hotel className="w-4 h-4" /> Kunjungi halaman
                          </a>
                        ) : (
                          <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400">
                            <Hotel className="w-4 h-4" /> Link tidak tersedia
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-semibold">
                Akses cepat
              </p>
              <h3 className="text-3xl font-bold text-slate-800">
                Jalur singkat buat langsung aksi
              </h3>
              <p className="text-slate-600 text-lg">
                Tanpa scroll panjang. Pilih portal yang sesuai kebutuhanmu.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
              {[
                {
                  href: "/destinasi",
                  title: "Destinasi",
                  copy: "Kurasi lokal",
                  icon: MapPin,
                  tone: "from-blue-500 to-cyan-500",
                  bg: "bg-blue-50",
                },
                {
                  href: "/event",
                  title: "Agenda",
                  copy: "Kalender hidup",
                  icon: Calendar,
                  tone: "from-purple-500 to-pink-500",
                  bg: "bg-purple-50",
                },
                {
                  href: "/ukm",
                  title: "UKM",
                  copy: "Belanja lokal",
                  icon: Store,
                  tone: "from-emerald-500 to-teal-500",
                  bg: "bg-emerald-50",
                },
                {
                  href: "/berita",
                  title: "Berita",
                  copy: "Apa yang baru",
                  icon: Newspaper,
                  tone: "from-orange-500 to-amber-500",
                  bg: "bg-orange-50",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group rounded-2xl ${item.bg} border border-slate-200 p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-300`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.tone} text-white shadow-lg mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm text-slate-500 mb-1">{item.copy}</div>
                  <div className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">{item.title}</div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Lihat
                    <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Berita terkini */}
      <section className="py-16 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-orange-500 font-semibold">
                Berita terkini
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                Berita terbaru hari ini
              </h3>
              <p className="text-slate-600 text-lg">
                Informasi terkini seputar Pangandaran, diperbarui setiap hari.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              <Newspaper className="w-4 h-4" /> Live feed
            </span>
          </div>

          {latestNews.length === 0 ? (
            <div className="rounded-3xl border border-orange-100 bg-orange-50/50 p-8 text-slate-600 text-center">
              Belum ada berita terbit hari ini.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((news) => (
                <Link
                  key={news.slug}
                  href={`/berita/${news.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full" />
                  <div className="relative space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                      <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                      Update harian
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition line-clamp-2">
                      {news.judul}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {formatNewsDate(news.publishedAt ?? news.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rekomendasi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 font-semibold">
                Itinerary pilihan
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Paket anti bosan
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl">
                Tema disusun bareng warga dan pegiat lokal. Lengkap dengan
                durasi, estimasi budget, dan vibe unik tiap perjalanan.
              </p>
            </div>
            <Link
              href="/rekomendasi"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Lihat daftar lengkap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {rekomendasi.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {rekomendasi.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group h-full rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-300"
                >
                  <div
                    className="relative h-56"
                    style={createBackgroundImageStyle(
                      pkg.gambarUtama ||
                        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
                      "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 70%)"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {pkg.durasi && (
                      <span className="absolute top-4 left-4 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                        {pkg.durasi}
                      </span>
                    )}
                    {pkg.estimasiBudget && (
                      <span className="absolute top-4 right-4 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-800 shadow-lg">
                        {pkg.estimasiBudget}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold text-emerald-700">
                      <Sparkles className="w-4 h-4" /> {pkg.tema}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition">
                      {pkg.judul}
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      {pkg.deskripsi}
                    </p>
                    <Link
                      href={`/rekomendasi/${pkg.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:gap-3"
                    >
                      Detail perjalanan
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-12 text-center text-slate-600">
              Belum ada paket rekomendasi siap tampil. Kembali lagi sebentar
              lagi.
            </div>
          )}
        </div>
      </section>

      {/* Moodboard */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-semibold">
                Moodboard
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                Jelajahi koleksi foto dan momen terbaik.
              </h3>
              <p className="text-slate-600 text-lg max-w-2xl">
                Semua gambar tersedia sebagai referensi untuk membantu Anda
                mengenal tempat lebih dekat.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
              <Compass className="w-4 h-4" />
              Kurasi ekspres
            </div>
          </div>

          {galeriMoodboard.length === 0 ? (
            <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-10 text-center text-slate-600">
              Belum ada galeri tersedia. Silakan upload galeri di panel admin.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {galeriMoodboard.map((item) => {
                const KategoriIcon = getCategoryIcon(item.kategori);
                return (
                  <Link
                    key={item.id}
                    href="/galeri"
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <SafeImage
                        src={item.thumbnail || item.url}
                        alt={item.judul}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow">
                        <KategoriIcon className="w-4 h-4 text-blue-500" />
                        <span>{formatKategori(item.kategori)}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-blue-200 transition drop-shadow-lg">
                        {item.judul}
                      </h4>
                      <p className="text-sm text-white/90 leading-relaxed line-clamp-2 drop-shadow">
                        {item.deskripsi || "Lihat galeri untuk lebih detail"}
                      </p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-blue-500/80 px-2.5 py-1 text-[11px] font-medium text-white"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Quick Planner */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 -top-20 h-80 w-80 bg-white/10 blur-[100px] rounded-full" />
          <div className="absolute right-0 bottom-0 h-96 w-96 bg-cyan-400/20 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-200 font-semibold">
                Rencana 48 jam
              </p>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                Dua hari penuh cerita, tanpa detour.
              </h3>
              <p className="text-blue-100 text-lg">
                Blok jadwal ini tinggal diikuti. Sesuaikan tempo, tapi jangan
                skip bagian sunset.
              </p>
            </div>
            <QuickPlannerCalendar quickSteps={quickSteps} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {quickSteps.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                  <span>{step.time}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px]">
                    Hari {idx < 2 ? 1 : 2}
                  </span>
                </div>
                <h4 className="mt-4 text-xl font-bold">{step.title}</h4>
                <p className="mt-3 text-sm text-blue-100 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToolkitSection />

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-0 h-64 w-64 bg-white/10 blur-[80px] rounded-full" />
          <div className="absolute right-1/4 bottom-0 h-80 w-80 bg-cyan-300/20 blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">
            Siap merapat? Bawa rasa penasaranmu.
          </h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Mulai dari event terkini atau jelajahi cerita kota. Kamu tentukan
            alur, kami siapkan jalurnya.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Link
              href="/event"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 text-blue-600 font-bold shadow-2xl transition hover:-translate-y-1 hover:shadow-3xl hover:bg-blue-50"
            >
              Lihat event terbaru
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-10 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-white hover:bg-white/20 backdrop-blur"
            >
              Kenali Pangandaran
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredDestinations = [
  {
    name: "Pantai Pasir Putih",
    description:
      "Pantai dengan pasir putih halus dan air laut jernih, sempurna untuk bersantai dan snorkeling.",
    rating: 4.8,
    icon: Waves,
    vibe: "Sunrise walk",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    href: "/destinasi/pantai-pasir-putih",
  },
  {
    name: "Green Canyon",
    description:
      "Ngarai hijau dengan sungai jernih dan tebing batu yang menakjubkan.",
    rating: 4.9,
    icon: Mountain,
    vibe: "River trek",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
    href: "/destinasi/green-canyon",
  },
  {
    name: "Sunset Point",
    description:
      "Spot terbaik untuk menikmati matahari terbenam dengan pemandangan laut yang memukau.",
    rating: 4.7,
    icon: Sun,
    vibe: "Golden hour",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80",
    href: "/destinasi/sunset-point",
  },
];

const moodTrips = [
  {
    title: "Sunset pantai",
    badge: "Matahari Terbenam & santai",
    description:
      "Hamparan pasir, hammock, kopi dingin, plus sunset jingga untuk recharge total.",
    image: "/sunset.jpg",
    icon: Waves,
  },
  {
    title: "Tugu marlin",
    badge: "Pintu Masuk Pangandaran",
    description: "Landmark ikonik, pintu masuk pantai pangandaran.",
    image: "/tugu%20marlin.jpg",
    icon: Ship,
  },
  {
    title: "Rasa Lokal",
    badge: "Kuliner & budaya",
    description:
      "Pasar ikan pagi, kopi tubruk, sampai live angklung di tepi pantai malam hari.",
    image:
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1400&q=80",
    icon: Trees,
  },
];

const quickSteps = [
  {
    time: "Pagi",
    title: "Sunrise di Pasir Putih",
    detail:
      "Datang jam 5, nikmati warna langit, lanjut sarapan seafood bakar di warung tepi pantai.",
  },
  {
    time: "Siang",
    title: "Kayak Green Canyon",
    detail:
      "Sewa perahu kecil, bawa dry bag, dan stop untuk foto di dinding batu hijau yang ikonik.",
  },
  {
    time: "Sore",
    title: "Cafe hopping",
    detail:
      "Cari rooftop view laut, pesan es kopi gula aren, tunggu langit keemasan.",
  },
  {
    time: "Malam",
    title: "Kuliner & bazar",
    detail:
      "Cicip sate seafood, belanja kerajinan bambu, lalu jalan kaki di promenade.",
  },
];

function formatNewsDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function pickDailySubset<T>(items: T[], count: number) {
  if (items.length === 0 || count <= 0) return [] as T[];

  const today = new Date();
  const dayOfYear = Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(today.getFullYear(), 0, 0)) /
      86_400_000
  );

  const start = dayOfYear % items.length;
  const picked: T[] = [];
  for (let i = 0; i < count && i < items.length; i += 1) {
    picked.push(items[(start + i) % items.length]);
  }
  return picked;
}

type BadgeProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

function Badge({ icon: Icon, label }: BadgeProps) {
  return (
    <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/40 bg-white/20 backdrop-blur-md text-white text-sm font-medium shadow-lg">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
}

function getCategoryIcon(kategori: string) {
  switch (kategori) {
    case "PANTAI":
      return Waves;
    case "GUNUNG":
      return Mountain;
    case "KULINER":
      return Store;
    case "BUDAYA":
      return Trees;
    case "AKTIVITAS":
      return Ship;
    default:
      return Camera;
  }
}

function formatKategori(kategori: string) {
  const mapping: Record<string, string> = {
    PANTAI: "Pantai & Laut",
    GUNUNG: "Pegunungan",
    KULINER: "Kuliner Lokal",
    BUDAYA: "Budaya & Seni",
    AKTIVITAS: "Aktivitas Seru",
    UMUM: "Umum",
  };
  return mapping[kategori] || kategori;
}
