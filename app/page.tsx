import type { SVGProps } from "react";
import React from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Image as ImageIcon,
  Star,
  ArrowRight,
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white shadow-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Jawa Barat, Indonesia</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                Jelajahi Keindahan
                <span className="block mt-2 bg-gradient-to-r from-cyan-200 via-white to-blue-300 bg-clip-text text-transparent">
                  Pangandaran
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 text-white/80 text-sm md:text-base flex-wrap">
                <Badge icon={Waves} label="Pantai & Surf" />
                <Badge icon={Trees} label="Hutan Tropis" />
                <Badge icon={Camera} label="Spot Foto" />
                <Badge icon={Compass} label="Petualangan" />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Dari pantai berpasir putih hingga goa eksotis, temukan surga
              tersembunyi di pesisir selatan Jawa Barat
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/destinasi"
                className="group px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2"
              >
                <span>Mulai Jelajah</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/galeri"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Lihat Galeri</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Access */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
                Akses Cepat
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                Mulai dari mana?
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/destinasi"
                className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              >
                <MapPin className="w-10 h-10 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-800">Pilih Wisata</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Jelajahi destinasi
                </p>
              </Link>
              <Link
                href="/event"
                className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              >
                <Calendar className="w-10 h-10 mx-auto mb-3 text-purple-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-800">Ringkasan Event</h4>
                <p className="text-xs text-slate-600 mt-1">Agenda terkini</p>
              </Link>
              <Link
                href="/ukm"
                className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              >
                <Store className="w-10 h-10 mx-auto mb-3 text-green-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-800">Profil UKM</h4>
                <p className="text-xs text-slate-600 mt-1">Produk lokal</p>
              </Link>
              <Link
                href="/berita"
                className="group p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl hover:from-orange-100 hover:to-amber-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              >
                <Newspaper className="w-10 h-10 mx-auto mb-3 text-orange-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-800">Berita</h4>
                <p className="text-xs text-slate-600 mt-1">Konten terbaru</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
                Angka yang berbicara
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                Selalu ada alasan untuk kembali
              </h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>Data kurasi tim lokal & komunitas</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: "Destinasi", value: "25+" },
              { icon: ImageIcon, label: "Galeri Foto", value: "500+" },
              { icon: Calendar, label: "Event/Tahun", value: "30+" },
              { icon: Star, label: "Rating", value: "4.8" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Destinasi Unggulan
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Jelajahi destinasi wisata terbaik yang wajib dikunjungi di
              Pangandaran
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((dest, index) => (
              <Link
                key={index}
                href={dest.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div
                  className="relative h-64 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.6) 70%), url(${dest.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 border-b border-white/10" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{dest.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white flex items-center space-x-2">
                    <dest.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{dest.vibe}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/destinasi"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Lihat Semua Destinasi</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rekomendasi Paket Wisata */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
              Rekomendasi Perjalanan
            </p>
            <h2 className="text-4xl font-bold text-slate-800 mb-4 mt-2">
              Paket Wisata Pilihan
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Itinerary lengkap untuk berbagai tema perjalanan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPackages.map((pkg, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div
                  className="relative h-56 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.6) 70%), url(${pkg.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold rounded-full">
                      {pkg.budget}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {pkg.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-slate-700">
                      Termasuk:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/rekomendasi/${pkg.slug}`}
                    className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Strip */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
                Kurasi Lokal
              </p>
              <h3 className="text-3xl font-bold text-slate-900">
                Mood liburan seperti apa?
              </h3>
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <Compass className="w-5 h-5 mr-2 text-blue-600" />
              Pilih vibe, ikuti rekomendasi cepat.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moodTrips.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-100"
              >
                <div
                  className="h-64"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.65) 70%), url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-white/80">
                    <item.icon className="w-5 h-5" />
                    <span>{item.badge}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Planner */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70 font-semibold">
                Rencana Singkat
              </p>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                48 jam di Pangandaran tanpa ribet
              </h3>
              <p className="text-white/80 text-lg">
                Ikuti langkah sederhana ini untuk jadwal padat berisi, cocok
                untuk first-timer maupun yang ingin rehat singkat.
              </p>
            </div>
            <Link
              href="/event"
              className="inline-flex items-center space-x-2 px-5 py-3 bg-white text-blue-700 rounded-full font-semibold hover:-translate-y-1 transition-transform shadow-xl"
            >
              <span>Lihat kalender</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickSteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-white/10 border border-white/15 rounded-2xl p-5 space-y-3 backdrop-blur-sm hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{step.time}</span>
                  <span className="px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs">
                    Hari {idx < 2 ? 1 : 2}
                  </span>
                </div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Toolkit */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">
                Travel Toolkit
              </p>
              <h3 className="text-3xl font-bold text-slate-900">
                Bekal praktis sebelum berangkat
              </h3>
            </div>
            <p className="text-slate-600 max-w-xl">
              Ringkas, bisa di-scan cepat: peta interaktif, opsi transport, dan
              estimasi budget harian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolkit.map((tool) => (
              <div
                key={tool.title}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg p-6 space-y-3 transition-transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-700">
                  <tool.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  {tool.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>{tool.cta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siap Memulai Petualangan Anda?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Temukan informasi lengkap tentang destinasi, event, dan tips wisata
            untuk pengalaman terbaik di Pangandaran
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/event"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:scale-105"
            >
              Lihat Event Terbaru
            </Link>
            <Link
              href="/tentang"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Tentang Pangandaran
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

const recommendedPackages = [
  {
    title: "Petualangan Alam",
    slug: "petualangan-alam",
    description:
      "Jelajahi Green Canyon, cliff jumping, dan trekking ke goa tersembunyi. Cocok untuk pencinta adrenalin.",
    duration: "2 Hari 1 Malam",
    budget: "Rp 500-700rb",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    includes: ["Green Canyon", "Goa Pananjung", "Cliff Jump", "Trekking"],
  },
  {
    title: "Romantis untuk Dua",
    slug: "romantis-untuk-dua",
    description:
      "Sunset dinner, private beach, dan malam di villa tepi pantai. Sempurna untuk pasangan.",
    duration: "2 Hari 1 Malam",
    budget: "Rp 1-1.5jt",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    includes: ["Sunset Point", "Beach Dinner", "Villa Tepi Pantai", "Spa"],
  },
  {
    title: "Liburan Keluarga",
    slug: "liburan-keluarga",
    description:
      "Paket lengkap untuk keluarga dengan anak-anak. Destinasi ramah anak dan edukatif.",
    duration: "3 Hari 2 Malam",
    budget: "Rp 2-3jt",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    includes: [
      "Pantai Pasir Putih",
      "Penyu Conservation",
      "Aquarium",
      "Playground",
    ],
  },
];

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
