import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Wallet,
  MapPin,
  Users,
  Star,
  Heart,
  Compass,
  Mountain,
  Users2,
  TrendingUp,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function RekomendasiPage() {
  const [destinasiTop, hotelsTop, kulinerTop, newsTop] = await Promise.all([
    prisma.destinasi.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [
        { featured: "desc" },
        { rating: "desc" },
        { jumlahReview: "desc" },
        { createdAt: "desc" },
      ],
      take: 6,
      select: {
        id: true,
        nama: true,
        slug: true,
        rating: true,
        jumlahReview: true,
        lokasi: true,
        kategori: true,
        images: {
          orderBy: { isPrimary: "desc" },
          take: 1,
          select: { url: true },
        },
      },
    }),
    prisma.hotelListing.findMany({
      orderBy: [{ rating: "desc" }, { reviews: "desc" }, { fetchedAt: "desc" }],
      take: 6,
      select: {
        id: true,
        name: true,
        location: true,
        price: true,
        rating: true,
        reviews: true,
        thumbnail: true,
        link: true,
      },
    }),
    prisma.kuliner.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
      take: 6,
      select: {
        id: true,
        nama: true,
        slug: true,
        kategori: true,
        lokasi: true,
        rating: true,
        gambar: true,
      },
    }),
    prisma.berita.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 6,
      select: {
        id: true,
        judul: true,
        slug: true,
        ringkasan: true,
        publishedAt: true,
        createdAt: true,
      },
    }),
  ]);

  const featuredRecommendations = destinasiTop.slice(0, 2);

  const combined = [
    ...destinasiTop.map((d) => ({
      key: `dest-${d.id}`,
      title: d.nama,
      href: `/destinasi/${d.slug}`,
      tag: "Destinasi",
      badge: d.kategori.replace("_", " "),
      meta: `${d.lokasi}`,
      rating: d.rating,
      extra: `${d.jumlahReview ?? 0} ulasan`,
      image:
        d.images?.[0]?.url ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    })),
    ...hotelsTop.map((h) => ({
      key: `hotel-${h.id}`,
      title: h.name,
      href: h.link || "/akomodasi",
      tag: "Hotel",
      badge: h.location || "Hotel",
      meta: h.price || "Harga dinamis",
      rating: h.rating,
      extra: h.reviews ? `${h.reviews} ulasan` : "",
      image:
        h.thumbnail ||
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1200&q=80",
    })),
    ...kulinerTop.map((k) => ({
      key: `kul-${k.id}`,
      title: k.nama,
      href: `/kuliner/${k.slug}`,
      tag: "Kuliner",
      badge: k.kategori,
      meta: k.lokasi,
      rating: k.rating,
      extra: "Kuliner lokal",
      image:
        k.gambar?.[0] ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white shadow-lg">
              <Compass className="w-4 h-4" />
              <span className="text-sm">Paket Wisata Terkurasi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Rekomendasi Perjalanan
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Itinerary lengkap untuk berbagai tema dan durasi perjalanan di
              Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Filter by Theme */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">
              Pilih Tema Perjalanan
            </h2>
            <p className="text-slate-600 mt-2">
              Temukan paket yang sesuai dengan mood liburanmu
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className="group p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-3 group-hover:scale-110 transition-transform">
                  <theme.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{theme.name}</h3>
                <p className="text-xs text-slate-600">{theme.count} paket</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recommendations (Destinasi unggulan) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Rekomendasi Unggulan
              </h2>
              <p className="text-slate-600 mt-2">
                Paling populer & recommended
              </p>
            </div>
            <div className="flex items-center text-purple-600">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Trending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredRecommendations.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
                Destinasi belum tersedia.
              </div>
            )}
            {featuredRecommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/destinasi/${rec.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className="relative h-72 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.6) 70%), url(${
                      rec.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                      {rec.kategori.replace("_", " ")}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-purple-200 transition-colors">
                      {rec.nama}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Destinasi unggulan</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Wallet className="w-4 h-4" />
                        <span>{rec.lokasi}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>{rec.rating?.toFixed(1) ?? "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    Rating {rec.rating?.toFixed(1) ?? "-"} ·{" "}
                    {rec.jumlahReview ?? 0} ulasan
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Lokasi:
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" /> {rec.lokasi}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Direkomendasikan pengunjung</span>
                    </div>
                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Recommendations (gabungan destinasi, hotel, kuliner) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Semua Rekomendasi
            </h2>
            <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Urutkan: Terpopuler</option>
              <option>Budget: Rendah - Tinggi</option>
              <option>Budget: Tinggi - Rendah</option>
              <option>Durasi: Terpendek</option>
              <option>Durasi: Terpanjang</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combined.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
                Data rekomendasi belum tersedia.
              </div>
            )}

            {combined.map((rec) => (
              <Link
                key={rec.key}
                href={rec.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${rec.image})`,
                  }}
                >
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded">
                      {rec.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {rec.meta}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{rec.badge}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">
                        {rec.rating ? rec.rating.toFixed(1) : "-"}
                      </span>
                    </div>
                  </div>
                  {rec.extra && (
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <span>{rec.extra}</span>
                      <div className="inline-flex items-center gap-1 text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Detail</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {combined.length > 9 && (
            <div className="text-center mt-12">
              <button className="inline-flex items-center space-x-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span>Muat Lebih Banyak</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Berita terkini */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/80">
                Update harian
              </p>
              <h2 className="text-3xl font-bold">Berita & tips terbaru</h2>
              <p className="text-white/85 mt-2">
                5 headline terbaru seputar wisata Pangandaran.
              </p>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-1"
            >
              Lihat semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {newsTop.length === 0 ? (
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white/80">
              Belum ada berita terbit.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsTop.map((news) => (
                <Link
                  key={news.id}
                  href={`/berita/${news.slug}`}
                  className="group rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-white/50"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-amber-200 line-clamp-2">
                    {news.judul}
                  </p>
                  <p className="text-xs text-white/70 mt-2">
                    {formatNewsDate(news.publishedAt ?? news.createdAt)}
                  </p>
                  {news.ringkasan && (
                    <p className="mt-3 text-xs text-white/75 line-clamp-2">
                      {news.ringkasan}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const themes = [
  { name: "Petualangan", icon: Mountain, count: 8 },
  { name: "Romantis", icon: Heart, count: 6 },
  { name: "Keluarga", icon: Users2, count: 10 },
  { name: "Budget Friendly", icon: Wallet, count: 12 },
];

function formatNewsDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
