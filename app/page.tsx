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
  Map,
  Bus,
  Wallet,
  Store,
  Newspaper,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import QuickPlannerCalendar from "@/components/QuickPlannerCalendar";
import SafeImage from "@/components/SafeImage";
import { prisma } from "@/lib/prisma";
import { createBackgroundImageStyle, getSafeImageUrl } from "@/lib/utils";

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

  const dailyHotels = pickDailySubset(hotels, 3);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-0 h-72 w-72 bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 bg-blue-600/20 blur-[120px]" />
        <div className="absolute left-1/2 bottom-0 h-64 w-64 -translate-x-1/2 bg-emerald-400/15 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <VideoBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-lg backdrop-blur">
                <MapPin className="w-4 h-4" />
                <span>Pangandaran, Jawa Barat</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
                  Jelajahi Pangandaran, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200">
                    rasakan pengalaman lokal yang asli.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl">
                  Temukan destinasi tersembunyi favorit warga lokal, hadiri
                  event budaya yang unik, dan nikmati kuliner khas yang tidak
                  akan Anda temukan di panduan wisata biasa.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge icon={Sun} label="Sunset Spot" />
                <Badge icon={Sun} label="Sunrise Spot" />
                <Badge icon={Waves} label="Wisata Air" />
                <Badge icon={Compass} label="Kuliner" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/destinasi"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-slate-900 font-semibold shadow-xl ring-2 ring-white/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Mulai eksplor
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/galeri"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Buka galeri
                  <Camera className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {[
                  { label: "Total Destinasi", value: "25+", icon: MapPin },
                  { label: "Galeri", value: "500+", icon: ImageIcon },
                  { label: "Event setahun", value: "30+", icon: Calendar },
                  { label: "Skor puas", value: "4.8", icon: Star },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner"
                  >
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-cyan-300/10 via-blue-200/10 to-emerald-200/5 blur-3xl" />
              <div className="relative grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Rencana instan</span>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {quickSteps.slice(0, 3).map((step) => (
                      <div key={step.title} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                            {step.time}
                          </p>
                          <p className="font-semibold">{step.title}</p>
                          <p className="text-sm text-white/70">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {moodTrips.slice(0, 2).map((item) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl"
                    >
                      <div
                        className="h-40"
                        style={createBackgroundImageStyle(
                          item.image,
                          "linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.75) 70%)"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-white/80">
                          <item.icon className="w-4 h-4" />
                          <span>{item.badge}</span>
                        </div>
                        <p className="font-semibold">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Hotels */}
      <section className="py-16 bg-slate-900/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Pilihan hotel hari ini
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                3 pilihan terbaik hari ini
              </h3>
              <p className="text-white/70">
                Rekomendasi hotel berubah setiap hari, jadi kamu selalu punya
                pilihan segar untuk menginap.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <Star className="w-4 h-4 text-amber-300" />
              Kurasi otomatis harian
            </div>
          </div>

          {dailyHotels.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
              Data hotel belum tersedia. Jalankan POST /api/hotels untuk memuat
              snapshot, lalu coba lagi.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dailyHotels.map((hotel) => {
                const hasLink = Boolean(hotel.link);

                return (
                  <div
                    key={hotel.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/40"
                  >
                    <div className="h-44 w-full overflow-hidden bg-slate-800/60 relative">
                      <SafeImage
                        src={hotel.thumbnail}
                        alt={hotel.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                            {hotel.source ?? "Google Hotels"}
                          </p>
                          <h4 className="text-lg font-semibold text-white">
                            {hotel.name}
                          </h4>
                        </div>
                        {hotel.rating ? (
                          <div className="inline-flex items-center gap-1 rounded-full bg-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-900">
                            <Star className="h-3 w-3" />{" "}
                            {hotel.rating.toFixed(1)}
                          </div>
                        ) : null}
                      </div>
                      {hotel.location ? (
                        <p className="flex items-center gap-1 text-xs text-white/70">
                          <MapPin className="h-3 w-3 text-white/60" />{" "}
                          {hotel.location}
                        </p>
                      ) : null}
                      <p className="text-sm text-white/75 line-clamp-2">
                        {hotel.description ??
                          "Lihat detail harga dan ketersediaan di penyedia."}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-semibold text-emerald-200">
                          {hotel.price ?? "Lihat harga"}
                        </span>
                        <span className="text-xs text-white/60">
                          {hotel.reviews
                            ? `${hotel.reviews} ulasan`
                            : "Ulasan belum ada"}
                        </span>
                      </div>
                      <div className="pt-2">
                        {hasLink ? (
                          <a
                            href={hotel.link as string}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-slate-900"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Hotel className="w-4 h-4" /> Kunjungi halaman
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/70">
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
      <section className="py-14 bg-slate-900/60 backdrop-blur border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Akses cepat
              </p>
              <h3 className="text-2xl font-semibold">
                Jalur singkat buat langsung aksi
              </h3>
              <p className="text-white/70">
                Tanpa scroll panjang. Pilih portal yang sesuai kebutuhanmu.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full lg:w-auto">
              {[
                {
                  href: "/destinasi",
                  title: "Destinasi",
                  copy: "Kurasi lokal",
                  icon: MapPin,
                  tone: "from-cyan-500/20 to-blue-500/20",
                },
                {
                  href: "/event",
                  title: "Agenda",
                  copy: "Kalender hidup",
                  icon: Calendar,
                  tone: "from-purple-500/20 to-pink-500/20",
                },
                {
                  href: "/ukm",
                  title: "UKM",
                  copy: "Belanja lokal",
                  icon: Store,
                  tone: "from-emerald-500/20 to-green-500/20",
                },
                {
                  href: "/berita",
                  title: "Berita",
                  copy: "Apa yang baru",
                  icon: Newspaper,
                  tone: "from-amber-500/20 to-orange-500/20",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${item.tone} p-4 shadow-lg transition hover:-translate-y-1 hover:border-white/20`}
                >
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>{item.copy}</span>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="mt-2 text-lg font-semibold">{item.title}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-100">
                    Lihat
                    <ArrowRight className="w-3 h-3 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Berita terkini */}
      <section className="py-14 bg-slate-900/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                Berita terkini
              </p>
              <h3 className="text-3xl font-semibold text-white">
                Berita terbaru hari ini
              </h3>
              <p className="text-white/70 text-sm">
                Informasi terkini seputar Pangandaran, diperbarui setiap hari.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/10 px-4 py-2 text-sm font-semibold text-amber-100 border border-amber-200/30">
              <Newspaper className="w-4 h-4" /> Live feed
            </span>
          </div>

          {latestNews.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Belum ada berita terbit hari ini.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((news) => (
                <Link
                  key={news.slug}
                  href={`/berita/${news.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-amber-100/20 bg-white/5 p-5 shadow-lg transition hover:-translate-y-1 hover:border-amber-200/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 via-transparent to-white/5" />
                  <div className="relative space-y-2">
                    <p className="text-sm font-semibold text-white group-hover:text-amber-100 transition line-clamp-2">
                      {news.judul}
                    </p>
                    <p className="text-xs text-white/60">
                      {formatNewsDate(news.publishedAt ?? news.createdAt)}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/10 px-3 py-1 text-[11px] font-semibold text-amber-100 border border-amber-200/30">
                      <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
                      Update harian
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Rekomendasi */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                Itinerary pilihan
              </p>
              <h2 className="text-3xl font-semibold text-white">
                Paket anti bosan
              </h2>
              <p className="text-white/70 max-w-2xl">
                Tema disusun bareng warga dan pegiat lokal. Lengkap dengan
                durasi, estimasi budget, dan vibe unik tiap perjalanan.
              </p>
            </div>
            <Link
              href="/rekomendasi"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-emerald-200"
            >
              Lihat daftar lengkap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {rekomendasi.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {rekomendasi.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group h-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900 p-5 shadow-2xl transition hover:-translate-y-2 hover:border-emerald-200/40"
                >
                  <div
                    className="relative h-48 rounded-2xl overflow-hidden"
                    style={createBackgroundImageStyle(
                      pkg.gambarUtama ||
                        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
                      "linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.7) 70%)"
                    )}
                  >
                    <div className="absolute inset-0 border border-white/10" />
                    {pkg.durasi && (
                      <span className="absolute top-3 left-3 rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                        {pkg.durasi}
                      </span>
                    )}
                    {pkg.estimasiBudget && (
                      <span className="absolute top-3 right-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                        {pkg.estimasiBudget}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                      <Sparkles className="w-4 h-4" /> {pkg.tema}
                    </span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-100 transition">
                      {pkg.judul}
                    </h3>
                    <p className="text-sm text-white/70 line-clamp-3">
                      {pkg.deskripsi}
                    </p>
                    <Link
                      href={`/rekomendasi/${pkg.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 transition hover:gap-3"
                    >
                      Detail perjalanan
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
              Belum ada paket rekomendasi siap tampil. Kembali lagi sebentar
              lagi.
            </div>
          )}
        </div>
      </section>

      {/* Moodboard */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Moodboard
              </p>
              <h3 className="text-3xl font-semibold text-white">
                Pilih vibe, tinggal ikuti
              </h3>
              <p className="text-white/70 max-w-2xl">
                Kombinasi foto, rute, dan rasa yang langsung bisa kamu duplikat.
                Tidak perlu mikir lama.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Compass className="w-4 h-4 text-cyan-200" />
              Kurasi ekspres.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moodTrips.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-slate-900 shadow-2xl"
              >
                <div
                  className="h-60"
                  style={createBackgroundImageStyle(
                    item.image,
                    "linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.8) 70%)"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/85">
                    <item.icon className="w-4 h-4" />
                    <span>{item.badge}</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white group-hover:text-cyan-100 transition">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Planner */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-indigo-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/80">
                Rencana 48 jam
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                Dua hari penuh cerita, tanpa detour.
              </h3>
              <p className="text-white/80 text-lg">
                Blok jadwal ini tinggal diikuti. Sesuaikan tempo, tapi jangan
                skip bagian sunset.
              </p>
            </div>
            <QuickPlannerCalendar quickSteps={quickSteps} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickSteps.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  <span>{step.time}</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                    Hari {idx < 2 ? 1 : 2}
                  </span>
                </div>
                <h4 className="mt-3 text-xl font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                Toolkit
              </p>
              <h3 className="text-3xl font-semibold text-white">
                Perlengkapan cepat sebelum berangkat
              </h3>
              <p className="text-white/70 max-w-2xl">
                Peta, transport, dan budget yang bisa dibaca sepintas tapi cukup
                detail untuk langsung dipakai.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolkit.map((tool) => (
              <div
                key={tool.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-200/40"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-100">
                  <tool.icon className="w-6 h-6" />
                </div>
                <h4 className="mt-4 text-xl font-semibold text-white">
                  {tool.title}
                </h4>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:gap-3">
                  {tool.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Siap merapat? Bawa rasa penasaranmu.
          </h2>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
            Mulai dari event terkini atau jelajahi cerita kota. Kamu tentukan
            alur, kami siapkan jalurnya.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/event"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-slate-900 font-semibold shadow-xl transition hover:-translate-y-1"
            >
              Lihat event terbaru
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:border-white"
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
    title: "Escape Tropis",
    badge: "Santai di pantai",
    description:
      "Hamparan pasir, hammock, kopi dingin, plus sunset jingga untuk recharge total.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    icon: Waves,
  },
  {
    title: "Adrenalin Hijau",
    badge: "Arung jeram & goa",
    description:
      "Kayak di sungai jernih, susur goa, dan cliff jump ringan ditemani guide lokal.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
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

const toolkit = [
  {
    title: "Peta interaktif",
    description:
      "Navigasi spot foto, parkir, toilet umum, dan titik kuliner favorit warga.",
    cta: "Buka peta",
    icon: Map,
  },
  {
    title: "Transport & akses",
    description:
      "Rute bus/travel, sewa motor/mobil, plus estimasi waktu tempuh dari Bandung/Jakarta.",
    cta: "Lihat opsi",
    icon: Bus,
  },
  {
    title: "Kalkulator budget",
    description:
      "Hitung cepat biaya makan, tiket, sewa, dan aktivitas utama per orang per hari.",
    cta: "Cek estimasi",
    icon: Wallet,
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
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
}
