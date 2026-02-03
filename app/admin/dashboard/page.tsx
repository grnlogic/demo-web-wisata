import Link from "next/link";
import type { ComponentType } from "react";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock3,
  Image,
  ArrowRight,
  MapPin,
  MessageSquare,
  Newspaper,
  Sparkles,
  Store,
  TrendingUp,
  Utensils,
} from "lucide-react";
import { StatusPublish } from "@prisma/client";
import { prisma, safeQuery } from "@/lib/prisma";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type StatCard = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
  changeTone: "up" | "down" | "flat";
  gradient: string;
};

type ActivityItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  time: Date;
  href: string;
  gradient: string;
};

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const statCards: StatCard[] = [
    {
      icon: MapPin,
      label: "Destinasi",
      value: formatNumber(data.counts.destinationsTotal),
      change: `${formatChange(
        data.counts.destinationsThisMonth,
        data.counts.destinationsPrevMonth,
      )} vs bulan lalu`,
      changeTone: getTone(
        data.counts.destinationsThisMonth,
        data.counts.destinationsPrevMonth,
      ),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Calendar,
      label: "Event Aktif",
      value: formatNumber(data.counts.eventsAktif),
      change: `${formatNumber(data.counts.eventsUpcoming)} jadwal ke depan`,
      changeTone: "up",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Image,
      label: "Galeri",
      value: formatNumber(data.counts.galeriTotal),
      change: `${formatChange(
        data.counts.galeriThisMonth,
        data.counts.galeriPrevMonth,
      )} konten baru`,
      changeTone: getTone(
        data.counts.galeriThisMonth,
        data.counts.galeriPrevMonth,
      ),
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: Newspaper,
      label: "Berita Publikasi",
      value: formatNumber(data.counts.beritaPublished),
      change: `${formatChange(
        data.counts.beritaThisMonth,
        data.counts.beritaPrevMonth,
      )} bulan ini`,
      changeTone: getTone(
        data.counts.beritaThisMonth,
        data.counts.beritaPrevMonth,
      ),
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: Utensils,
      label: "Kuliner",
      value: formatNumber(data.counts.kulinerTotal),
      change: "Dipublikasikan",
      changeTone: "flat",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Store,
      label: "Profil UKM",
      value: formatNumber(data.counts.ukmTotal),
      change: "Terdata",
      changeTone: "flat",
      gradient: "from-slate-600 to-slate-800",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-white to-transparent" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Dasbor Langsung
              <Sparkles className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight lg:text-4xl">
              Selamat datang di pusat kendali konten
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-white/80">
              Lihat performa terbaru destinasi, event, berita, serta kelola
              konten wisata Pangandaran dengan data real-time.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur">
            <div className="flex items-center gap-2 sm:gap-3">
              <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-white flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-white/70">
                  Update bulan ini
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {formatNumber(
                    data.counts.destinationsThisMonth +
                      data.counts.galeriThisMonth +
                      data.counts.beritaThisMonth,
                  )}
                  <span className="text-sm sm:text-base font-semibold text-white/80">
                    {" "}
                    entri baru
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-0 opacity-60" />
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient}`}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span
                className={`rounded-full px-2 sm:px-3 py-1 text-xs font-semibold ${
                  stat.changeTone === "up"
                    ? "bg-emerald-50 text-emerald-700"
                    : stat.changeTone === "down"
                      ? "bg-red-50 text-red-700"
                      : "bg-slate-100 text-slate-700"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4 sm:mt-6 space-y-1">
              <p className="text-xs sm:text-sm text-slate-500">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Aksi Cepat
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Buat konten baru tanpa membuka menu lain
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-3 sm:gap-4 rounded-lg sm:rounded-xl border border-slate-200 p-3 sm:p-4 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br ${action.gradient} text-white transition-transform group-hover:scale-105 flex-shrink-0`}
                >
                  <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                      {action.title}
                    </h3>
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                    {action.description}
                  </p>
                  <p className="text-xs font-semibold text-blue-600">
                    {action.cta}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Event Mendatang
            </h2>
            <Link
              href="/admin/event"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Lihat semua
            </Link>
          </div>
          <div className="space-y-4">
            {data.upcomingEvents.length === 0 && (
              <p className="text-sm text-slate-500">
                Belum ada jadwal event berikutnya.
              </p>
            )}
            {data.upcomingEvents.map((event) => (
              <div
                key={event.slug}
                className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {event.nama}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(event.tanggalMulai)} · {event.lokasi}
                  </p>
                </div>
                <Link
                  href={`/admin/event`}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Kelola
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Aktivitas Terbaru
              </h2>
              <p className="text-sm text-slate-500">
                Entri terbaru dari seluruh modul konten
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Otomatis tersinkron
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {data.recentActivities.length === 0 && (
              <p className="py-3 text-sm text-slate-500">
                Belum ada aktivitas terbaru.
              </p>
            )}
            {data.recentActivities.map((activity) => (
              <div
                key={`${activity.title}-${activity.time.toISOString()}`}
                className="flex items-start gap-4 py-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${activity.gradient} text-white`}
                >
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-500">{activity.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-blue-600">
                    {formatRelativeTime(activity.time)}
                  </p>
                  <Link
                    href={activity.href}
                    className="text-[11px] font-semibold text-slate-500 hover:text-blue-600"
                  >
                    Buka
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Destinasi Populer
              </h2>
              <Link
                href="/admin/destinasi"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Kelola
              </Link>
            </div>
            <div className="space-y-4">
              {data.popularDestinations.length === 0 && (
                <p className="text-sm text-slate-500">
                  Belum ada destinasi dengan rating.
                </p>
              )}
              {data.popularDestinations.map((dest, index) => (
                <div
                  key={dest.slug}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-300">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {dest.nama}
                      </p>
                      <p className="text-xs text-slate-500">
                        Rating
                        {dest.rating !== null && dest.rating !== undefined
                          ? ` ${dest.rating.toFixed(1)}`
                          : " -"}{" "}
                        • {formatNumber(dest.jumlahReview ?? 0)} ulasan
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <TrendingUp className="mr-1 h-4 w-4" /> Tren
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Berita Terbaca
              </h2>
              <Link
                href="/admin/berita"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Kelola
              </Link>
            </div>
            <div className="space-y-4">
              {data.topNews.length === 0 && (
                <p className="text-sm text-slate-500">
                  Belum ada berita publikasi.
                </p>
              )}
              {data.topNews.map((news) => (
                <div
                  key={news.slug}
                  className="flex items-start justify-between rounded-xl border border-slate-100 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{news.judul}</p>
                    <p className="text-xs text-slate-500">
                      {formatNumber(news.views)} pembaca ·{" "}
                      {news.publishedAt
                        ? formatDate(news.publishedAt)
                        : "Belum dijadwalkan"}
                    </p>
                  </div>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    {news.views > 0 ? "Trending" : "Baru"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Komentar Destinasi
              </h2>
              <Link
                href="/admin/destinasi"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Pantau
              </Link>
            </div>
            <div className="space-y-4">
              {data.latestReviews.length === 0 && (
                <p className="text-sm text-slate-500">
                  Belum ada komentar masuk.
                </p>
              )}
              {data.latestReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-amber-500 font-semibold">
                      <MessageSquare className="h-4 w-4" />
                      <span>{review.rating}/5</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {formatRelativeTime(review.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 line-clamp-2">
                    {review.comment}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">
                      {review.userName || "Pengguna"}
                    </span>
                    <Link
                      href={`/destinasi/${review.destinasi.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {review.destinasi.nama}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Ringkasan Sistem</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> Data langsung terhubung
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Destinasi baru bulan ini</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatNumber(data.counts.destinationsThisMonth)}
            </p>
            <p className="text-xs text-slate-500">
              dibanding {formatNumber(data.counts.destinationsPrevMonth)} bulan
              lalu
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Konten media terbaru</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatNumber(data.counts.galeriThisMonth)} galeri
            </p>
            <p className="text-xs text-slate-500">gambar dan video unggahan</p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="text-sm text-slate-500">Berita terbit bulan ini</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatNumber(data.counts.beritaThisMonth)} artikel
            </p>
            <p className="text-xs text-slate-500">publikasi status PUBLISHED</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const quickActions = [
  {
    icon: MapPin,
    title: "Tambah Destinasi",
    description: "Lengkapi detail lokasi dan foto utama",
    href: "/admin/destinasi/create",
    cta: "Buka formulir",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Calendar,
    title: "Jadwalkan Event",
    description: "Isi tanggal, lokasi, dan harga tiket",
    href: "/admin/event/create",
    cta: "Buat event",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Image,
    title: "Upload Galeri",
    description: "Tambah foto atau video terbaru",
    href: "/admin/galeri/create",
    cta: "Mulai unggah",
    gradient: "from-pink-500 to-pink-600",
  },
];

async function getDashboardData() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    destinationsTotal,
    destinationsThisMonth,
    destinationsPrevMonth,
    eventsAktif,
    eventsUpcoming,
    galeriTotal,
    galeriThisMonth,
    galeriPrevMonth,
    beritaPublished,
    beritaThisMonth,
    beritaPrevMonth,
    kulinerTotal,
    ukmTotal,
    popularDestinations,
    topNews,
    upcomingEvents,
    recentDestinations,
    recentEvents,
    recentNews,
    recentGalleries,
    recentUkm,
    latestNews,
    latestReviews,
  ] = await Promise.all([
    safeQuery(() => prisma.destinasi.count(), 0),
    safeQuery(
      () =>
        prisma.destinasi.count({ where: { createdAt: { gte: startOfMonth } } }),
      0,
    ),
    safeQuery(
      () =>
        prisma.destinasi.count({
          where: { createdAt: { gte: startOfPrevMonth, lt: startOfMonth } },
        }),
      0,
    ),
    safeQuery(
      () =>
        prisma.event.count({
          where: {
            status: StatusPublish.PUBLISHED,
            tanggalMulai: { lte: now },
            tanggalSelesai: { gte: now },
          },
        }),
      0,
    ),
    safeQuery(
      () =>
        prisma.event.count({
          where: {
            status: StatusPublish.PUBLISHED,
            tanggalMulai: { gte: now },
          },
        }),
      0,
    ),
    safeQuery(() => prisma.galeri.count(), 0),
    safeQuery(
      () =>
        prisma.galeri.count({ where: { createdAt: { gte: startOfMonth } } }),
      0,
    ),
    safeQuery(
      () =>
        prisma.galeri.count({
          where: { createdAt: { gte: startOfPrevMonth, lt: startOfMonth } },
        }),
      0,
    ),
    safeQuery(
      () => prisma.berita.count({ where: { status: StatusPublish.PUBLISHED } }),
      0,
    ),
    safeQuery(
      () =>
        prisma.berita.count({
          where: {
            status: StatusPublish.PUBLISHED,
            createdAt: { gte: startOfMonth },
          },
        }),
      0,
    ),
    safeQuery(
      () =>
        prisma.berita.count({
          where: {
            status: StatusPublish.PUBLISHED,
            createdAt: { gte: startOfPrevMonth, lt: startOfMonth },
          },
        }),
      0,
    ),
    safeQuery(() => prisma.kuliner.count(), 0),
    safeQuery(() => prisma.profilUkm.count(), 0),
    safeQuery(
      () =>
        prisma.destinasi.findMany({
          where: { status: StatusPublish.PUBLISHED },
          orderBy: [
            { rating: "desc" },
            { jumlahReview: "desc" },
            { createdAt: "desc" },
          ],
          take: 5,
          select: { nama: true, rating: true, jumlahReview: true, slug: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.berita.findMany({
          where: { status: StatusPublish.PUBLISHED },
          orderBy: [
            { views: "desc" },
            { publishedAt: "desc" },
            { createdAt: "desc" },
          ],
          take: 5,
          select: { judul: true, views: true, slug: true, publishedAt: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.event.findMany({
          where: {
            status: StatusPublish.PUBLISHED,
            tanggalMulai: { gte: now },
          },
          orderBy: { tanggalMulai: "asc" },
          take: 5,
          select: { nama: true, slug: true, tanggalMulai: true, lokasi: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.destinasi.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: { nama: true, slug: true, createdAt: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.event.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: { nama: true, slug: true, createdAt: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.berita.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: { judul: true, slug: true, createdAt: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.galeri.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: { judul: true, id: true, createdAt: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.profilUkm.findMany({
          orderBy: { createdAt: "desc" },
          take: 3,
          select: { namaUsaha: true, slug: true, createdAt: true },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.berita.findMany({
          where: { status: StatusPublish.PUBLISHED },
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
          take: 5,
          select: {
            judul: true,
            slug: true,
            publishedAt: true,
            createdAt: true,
          },
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.destinasiReview.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          select: {
            id: true,
            rating: true,
            comment: true,
            userName: true,
            createdAt: true,
            destinasi: { select: { nama: true, slug: true } },
          },
        }),
      [],
    ),
  ]);

  const recentActivities: ActivityItem[] = [
    ...recentDestinations.map((item) => ({
      icon: MapPin,
      title: item.nama,
      subtitle: "Destinasi baru ditambahkan",
      href: "/admin/destinasi",
      time: item.createdAt,
      gradient: "from-blue-500 to-blue-600",
    })),
    ...recentEvents.map((item) => ({
      icon: Calendar,
      title: item.nama,
      subtitle: "Event disimpan",
      href: "/admin/event",
      time: item.createdAt,
      gradient: "from-purple-500 to-purple-600",
    })),
    ...recentNews.map((item) => ({
      icon: Newspaper,
      title: item.judul,
      subtitle: "Berita diterbitkan",
      href: "/admin/berita",
      time: item.createdAt,
      gradient: "from-orange-500 to-amber-500",
    })),
    ...recentGalleries.map((item) => ({
      icon: Image,
      title: item.judul,
      subtitle: "Galeri diperbarui",
      href: "/admin/galeri",
      time: item.createdAt,
      gradient: "from-pink-500 to-pink-600",
    })),
    ...recentUkm.map((item) => ({
      icon: Store,
      title: item.namaUsaha,
      subtitle: "Profil UKM baru",
      href: "/admin/ukm",
      time: item.createdAt,
      gradient: "from-slate-600 to-slate-800",
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 8);

  return {
    counts: {
      destinationsTotal,
      destinationsThisMonth,
      destinationsPrevMonth,
      eventsAktif,
      eventsUpcoming,
      galeriTotal,
      galeriThisMonth,
      galeriPrevMonth,
      beritaPublished,
      beritaThisMonth,
      beritaPrevMonth,
      kulinerTotal,
      ukmTotal,
    },
    popularDestinations,
    topNews,
    upcomingEvents,
    recentActivities,
    latestNews,
    latestReviews,
  };
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatChange(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? "0" : `+${current}`;
  }
  const diff = ((current - previous) / previous) * 100;
  const rounded = Math.round(diff);
  return `${diff >= 0 ? "+" : ""}${rounded}%`;
}

function getTone(current: number, previous: number): StatCard["changeTone"] {
  if (current === previous) return "flat";
  return current > previous ? "up" : "down";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatRelativeTime(date: Date) {
  const diff = date.getTime() - Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

  if (Math.abs(diff) < hour) {
    return rtf.format(Math.round(diff / minute), "minute");
  }
  if (Math.abs(diff) < day) {
    return rtf.format(Math.round(diff / hour), "hour");
  }
  return rtf.format(Math.round(diff / day), "day");
}
