"use client";

import {
  Users,
  Heart,
  Target,
  Calendar,
  MapPin,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";
import CardSwap, { Card, CardSwapRef } from "@/components/CardSwap";

export default function TentangKKNPage() {
  const cardSwapRef = useRef<CardSwapRef>(null);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-0 h-72 w-72 bg-cyan-500/30 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 bg-blue-600/20 blur-[120px]" />
        <div className="absolute left-1/2 bottom-0 h-64 w-64 -translate-x-1/2 bg-emerald-400/15 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-lg backdrop-blur">
              <Users className="w-4 h-4" />
              <span>KKN 126 Universitas Komputer Indonesia</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-200 via-blue-200 to-emerald-200 bg-clip-text text-transparent">
              Tim KKN 126 Pangandaran
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Bersama membangun desa, memberdayakan masyarakat, dan
              mengembangkan potensi wisata Pangandaran melalui program kerja
              yang berkelanjutan.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
              <Target className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-2xl font-bold">9</div>
              <div className="text-sm text-white/70">Anggota Tim</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-white/70">Hari Program</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <div className="text-2xl font-bold">5+</div>
              <div className="text-sm text-white/70">Desa Binaan</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold">12+</div>
              <div className="text-sm text-white/70">Program Kerja</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with CardSwap */}
      <section className="py-20 bg-slate-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">
                  Struktur Organisasi
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Tim Solid, Kerja Nyata
                </h2>
                <p className="text-white/70 text-lg">
                  Setiap posisi memiliki peran vital dalam mewujudkan program
                  KKN yang berdampak positif bagi masyarakat Pangandaran. Dari
                  koordinasi hingga eksekusi, kami bergerak bersama.
                </p>
              </div>

              {/* Vision & Mission */}
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visi Kami</h3>
                      <p className="text-white/70">
                        Menjadi tim KKN yang memberikan kontribusi nyata dalam
                        pengembangan potensi wisata dan pemberdayaan masyarakat
                        Pangandaran secara berkelanjutan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-6 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Misi Kami</h3>
                      <ul className="text-white/70 space-y-2">
                        <li>
                          • Mengembangkan platform digital wisata Pangandaran
                        </li>
                        <li>• Memberdayakan UMKM lokal melalui digitalisasi</li>
                        <li>
                          • Meningkatkan kesadaran masyarakat tentang potensi
                          wisata
                        </li>
                        <li>• Membangun kolaborasi dengan stakeholder lokal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Program Highlights */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Program Unggulan</h3>
                <div className="grid gap-3">
                  {programs.map((program, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20">
                        <program.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-medium">{program.title}</div>
                        <div className="text-sm text-white/60">
                          {program.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - CardSwap */}
            <div className="relative" style={{ height: "800px" }}>
              <CardSwap
                ref={cardSwapRef}
                width={550}
                height={650}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
                easing="elastic"
                showNavigation={true}
              >
                {teamMembers.map((member, idx) => (
                  <Card key={idx}>
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="inline-block rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-1 text-xs font-medium text-cyan-200 border border-cyan-500/30 mb-3">
                            {member.position}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {member.name}
                          </h3>
                          <p className="text-sm text-white/60">{member.nim}</p>
                        </div>

                        <p className="text-white/70 text-sm leading-relaxed">
                          {member.description}
                        </p>

                        <div className="pt-2 border-t border-white/10">
                          <div className="text-xs text-white/50 mb-2">
                            Tanggung Jawab:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {member.responsibilities.map((resp, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70 border border-white/10"
                              >
                                {resp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>

              {/* Navigation Buttons */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
                <button
                  onClick={() => cardSwapRef.current?.prev()}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-slate-900/80 backdrop-blur transition hover:border-cyan-400 hover:bg-slate-800 hover:-translate-y-0.5"
                  aria-label="Previous member"
                >
                  <ChevronLeft className="h-6 w-6 text-white group-hover:text-cyan-400 transition" />
                </button>
                <div className="rounded-full border border-white/20 bg-slate-900/60 px-4 py-2 backdrop-blur">
                  <div className="flex items-center gap-2">
                    {teamMembers.map((_, idx) => (
                      <div
                        key={idx}
                        className="h-1.5 w-1.5 rounded-full bg-white/40 transition"
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => cardSwapRef.current?.next()}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-slate-900/80 backdrop-blur transition hover:border-cyan-400 hover:bg-slate-800 hover:-translate-y-0.5"
                  aria-label="Next member"
                >
                  <ChevronRight className="h-6 w-6 text-white group-hover:text-cyan-400 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-emerald-500/10 p-12 backdrop-blur text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mari Berkolaborasi
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Punya ide atau ingin bekerja sama dengan tim KKN 126? Kami terbuka
              untuk diskusi dan kolaborasi yang bermanfaat bagi Pangandaran.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:kkn126.unikom@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-slate-900 font-semibold shadow-xl transition hover:-translate-y-1"
              >
                Hubungi Kami
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:border-white"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const teamMembers = [
  {
    name: "Ahmad Rizki Pratama",
    nim: "41520010001",
    position: "Koordinator Desa",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    description:
      "Memimpin dan mengkoordinasikan seluruh kegiatan KKN, memastikan program berjalan sesuai rencana dan target tercapai.",
    responsibilities: ["Koordinasi Tim", "Perencanaan Program", "Monitoring"],
  },
  {
    name: "Siti Nurhaliza",
    nim: "41520010002",
    position: "Wakil Koordinator Desa",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    description:
      "Mendampingi koordinator dalam menjalankan program, siap mengambil alih tugas saat diperlukan dan membantu koordinasi.",
    responsibilities: ["Backup Koordinator", "Koordinasi", "Evaluasi"],
  },
  {
    name: "Budi Santoso",
    nim: "41520010003",
    position: "Sekretaris",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    description:
      "Mengelola administrasi, dokumentasi, dan surat-menyurat. Memastikan semua kegiatan terdokumentasi dengan baik.",
    responsibilities: ["Administrasi", "Dokumentasi", "Surat Menyurat"],
  },
  {
    name: "Dewi Lestari",
    nim: "41520010004",
    position: "Bendahara",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    description:
      "Mengelola keuangan tim, membuat laporan anggaran, dan memastikan transparansi dalam penggunaan dana program.",
    responsibilities: ["Keuangan", "Laporan Anggaran", "Transparansi"],
  },
  {
    name: "Andi Wijaya",
    nim: "41520010005",
    position: "Koordinator Acara",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    description:
      "Merencanakan dan mengeksekusi seluruh acara KKN, dari persiapan hingga evaluasi kegiatan.",
    responsibilities: ["Perencanaan Acara", "Eksekusi", "Evaluasi"],
  },
  {
    name: "Rina Puspita",
    nim: "41520010006",
    position: "Koordinator Humas",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    description:
      "Menjalin komunikasi dengan masyarakat, stakeholder, dan media. Mengelola publikasi program KKN.",
    responsibilities: ["Komunikasi", "Publikasi", "Media Sosial"],
  },
  {
    name: "Dimas Prasetyo",
    nim: "41520010007",
    position: "Koordinator PDD",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    description:
      "Bertanggung jawab atas program Pemberdayaan dan Pengembangan Desa, fokus pada pemberdayaan masyarakat.",
    responsibilities: ["Pemberdayaan", "Pengembangan", "Pendampingan"],
  },
  {
    name: "Fajar Ramadhan",
    nim: "41520010008",
    position: "Koordinator Logistik",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
    description:
      "Mengelola dan memastikan ketersediaan logistik untuk semua kegiatan, dari peralatan hingga perlengkapan.",
    responsibilities: ["Inventaris", "Pengadaan", "Distribusi"],
  },
  {
    name: "Maya Anggraini",
    nim: "41520010009",
    position: "Koordinator Konsumsi",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    description:
      "Mengatur kebutuhan konsumsi tim dan acara, memastikan semua kebutuhan pangan terpenuhi dengan baik.",
    responsibilities: ["Katering", "Menu Planning", "Budgeting"],
  },
];

const programs = [
  {
    icon: MapPin,
    title: "Platform Digital Wisata",
    description: "Website informasi wisata Pangandaran",
  },
  {
    icon: Users,
    title: "Pemberdayaan UMKM",
    description: "Digitalisasi produk lokal",
  },
  {
    icon: Award,
    title: "Pelatihan Digital",
    description: "Workshop media sosial untuk pelaku usaha",
  },
  {
    icon: Heart,
    title: "Gerakan Bersih Pantai",
    description: "Aksi peduli lingkungan bersama warga",
  },
];
