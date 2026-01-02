"use client";

import Image from "next/image";
import { Users, Award, Heart, Target } from "lucide-react";
import { useState } from "react";

// Data struktur organisasi KKN 126
const teamStructure = [
  {
    position: "Koordinator",
    name: "Nama Koordinator",
    photo: "/placeholder-koor.jpg",
    gradient: "from-blue-500 to-cyan-500",
    icon: "👨‍💼",
  },
  {
    position: "Wakil Koordinator",
    name: "Nama Wakil Koordinator",
    photo: "/placeholder-wakoor.jpg",
    gradient: "from-purple-500 to-pink-500",
    icon: "👩‍💼",
  },
  {
    position: "Sekretaris",
    name: "Nama Sekretaris",
    photo: "/placeholder-sekretaris.jpg",
    gradient: "from-green-500 to-teal-500",
    icon: "📝",
  },
  {
    position: "Bendahara",
    name: "Nama Bendahara",
    photo: "/placeholder-bendahara.jpg",
    gradient: "from-yellow-500 to-orange-500",
    icon: "💰",
  },
  {
    position: "Koordinator Acara",
    name: "Nama Koordinator Acara",
    photo: "/placeholder-acara.jpg",
    gradient: "from-red-500 to-pink-500",
    icon: "🎉",
  },
  {
    position: "Koordinator Humas",
    name: "Nama Koordinator Humas",
    photo: "/placeholder-humas.jpg",
    gradient: "from-indigo-500 to-blue-500",
    icon: "📢",
  },
  {
    position: "Koordinator PDD",
    name: "Nama Koordinator PDD",
    photo: "/placeholder-pdd.jpg",
    gradient: "from-teal-500 to-green-500",
    icon: "📊",
  },
  {
    position: "Koordinator Logistik",
    name: "Nama Koordinator Logistik",
    photo: "/placeholder-logistik.jpg",
    gradient: "from-orange-500 to-red-500",
    icon: "📦",
  },
  {
    position: "Koordinator Konsumsi",
    name: "Nama Koordinator Konsumsi",
    photo: "/placeholder-konsumsi.jpg",
    gradient: "from-pink-500 to-purple-500",
    icon: "🍽️",
  },
];

// Galeri foto kegiatan (placeholder)
const galleryPhotos = [
  {
    id: 1,
    title: "Kegiatan Penyuluhan",
    image: "/placeholder-gallery-1.jpg",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "Gotong Royong",
    image: "/placeholder-gallery-2.jpg",
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 3,
    title: "Mengajar di Sekolah",
    image: "/placeholder-gallery-3.jpg",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    title: "Sosialisasi Wisata",
    image: "/placeholder-gallery-4.jpg",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    id: 5,
    title: "Kunjungan Wisata",
    image: "/placeholder-gallery-5.jpg",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    id: 6,
    title: "Pelatihan UMKM",
    image: "/placeholder-gallery-6.jpg",
    gradient: "from-teal-400 to-teal-600",
  },
];

export default function TentangKKNPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Kolaborasi & Dedikasi</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              KKN 126 Pangandaran
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Kuliah Kerja Nyata yang berdedikasi mengembangkan potensi wisata
              dan memberdayakan masyarakat Pangandaran melalui teknologi dan
              inovasi digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">2026</div>
                <div className="text-sm text-blue-100">Tahun Program</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">9+</div>
                <div className="text-sm text-blue-100">Anggota Tim</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-blue-100">Dedikasi</div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(248, 250, 252)"
            />
          </svg>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Visi</h3>
            <p className="text-slate-600 leading-relaxed">
              Menjadi pelopor dalam pengembangan wisata digital dan pemberdayaan
              masyarakat Pangandaran yang berkelanjutan.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Misi</h3>
            <p className="text-slate-600 leading-relaxed">
              Mengimplementasikan solusi digital untuk promosi wisata dan
              meningkatkan kesejahteraan masyarakat lokal.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-teal-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Nilai</h3>
            <p className="text-slate-600 leading-relaxed">
              Integritas, kolaborasi, inovasi, dan dedikasi dalam setiap program
              yang kami jalankan untuk masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Struktur Tim KKN 126
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tim solid yang berkomitmen penuh dalam mensukseskan program KKN
            Pangandaran
          </p>
        </div>

        <div className="space-y-8">
          {teamStructure.map((member, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-2 ${
                index % 2 === 0 ? "" : ""
              }`}
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                {/* Photo Section */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div
                      className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-7xl shadow-xl`}
                    >
                      {member.icon}
                    </div>
                    {/* Decorative Ring */}
                    <div
                      className={`absolute inset-0 w-40 h-40 rounded-3xl bg-gradient-to-br ${member.gradient} opacity-20 blur-2xl group-hover:scale-110 transition-transform duration-500`}
                    ></div>
                  </div>
                </div>

                {/* Info Section */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-left" : "md:text-right"} text-center`}>
                  <div
                    className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${member.gradient} text-white text-sm font-medium shadow-lg mb-3`}
                  >
                    {member.position}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Bertanggung jawab dalam mengelola dan mengkoordinasikan seluruh kegiatan di bidang {member.position.toLowerCase()}.
                  </p>
                </div>

                {/* Background Pattern */}
                <div
                  className={`absolute ${
                    index % 2 === 0 ? "right-0" : "left-0"
                  } top-0 w-32 h-32 opacity-5`}
                >
                  <div className="text-8xl">{member.icon}</div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Galeri Kegiatan */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Galeri Kegiatan
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan program KKN 126 di Pangandaran
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedImage(photo.id)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}
              >
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-2xl font-bold drop-shadow-lg">
                    {photo.title}
                  </h3>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                {photo.id}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Lihat Semua Galeri
          </button>
        </div>
      </section>

      {/* Program Kerja */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Program Kerja Utama
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-2xl font-bold mb-3">Website Wisata</h3>
                <p className="text-blue-100">
                  Pengembangan portal informasi wisata Pangandaran yang
                  informatif dan interaktif untuk memudahkan wisatawan.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-3">Digital Marketing</h3>
                <p className="text-blue-100">
                  Promosi destinasi wisata melalui media sosial dan platform
                  digital untuk menjangkau lebih banyak wisatawan.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold mb-3">Pemberdayaan UMKM</h3>
                <p className="text-blue-100">
                  Pelatihan dan pendampingan pelaku UMKM lokal untuk
                  meningkatkan daya saing dan pemasaran produk.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold mb-3">Edukasi Lingkungan</h3>
                <p className="text-blue-100">
                  Sosialisasi pentingnya menjaga kelestarian lingkungan dan
                  wisata berkelanjutan kepada masyarakat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Mari Berkolaborasi Bersama Kami
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Kami terbuka untuk kerjasama dan masukan dalam pengembangan wisata
          Pangandaran
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:kkn126@example.com"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Hubungi Kami
          </a>
          <a
            href="/galeri"
            className="px-8 py-4 bg-white text-slate-800 rounded-full font-semibold border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Lihat Galeri Lengkap
          </a>
        </div>
      </section>
    </div>
  );
}
