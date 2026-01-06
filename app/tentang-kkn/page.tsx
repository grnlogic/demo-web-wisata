"use client";

import type { Metadata } from "next";
import LogoLoop from "@/components/LogoLoop";
import Image from "next/image";

const metadata: Metadata = {
  title: "Tentang KKN - Wisata Pangandaran",
  description:
    "Profil KKN dan struktur divisi proker utama Desa, lengkap dengan deskripsi peran dan misi kami di Pangandaran.",
};

const divisions = [
  {
    title: "Koor & Wakoor",
    role: "Koordinator & Wakil Koordinator Desa",
    description:
      "Duet pemimpin lapangan yang menyatukan arah strategis dengan eksekusi harian, menjaga seluruh divisi tetap selaras.",
    image: "/divisi%20kkn/ketua%20dan%20wakil.jpeg",
    focus: "Strategi & Koordinasi",
  },
  {
    title: "Sekretaris",
    role: "Dokumentasi & Administrasi",
    description:
      "Merangkum setiap progres, mengatur perizinan, serta memastikan komunikasi tertata rapi.",
    image: "/divisi%20kkn/sekertaris.jpeg",
    focus: "Administrasi",
  },
  {
    title: "Bendahara",
    role: "Keuangan & Transparansi",
    description:
      "Mengelola anggaran proker utama secara transparan dengan laporan terbuka untuk tim dan mitra.",
    image: "/divisi%20kkn/bendahara.jpeg",
    focus: "Pengelolaan Dana",
  },
  {
    title: "Acara",
    role: "Perancangan Aktivitas",
    description:
      "Mendesain rangkaian acara yang dekat dengan warga: edukasi, promosi wisata, hingga hiburan komunitas.",
    image: "/divisi%20kkn/acara.jpeg",
    focus: "Rangkaian Event",
    imagePosition: "object-[center_35%]",
  },
  {
    title: "Humas",
    role: "Hubungan Masyarakat",
    description:
      "Membangun kepercayaan warga dan mitra, memastikan pesan proker utama tersampaikan hangat dan jelas.",
    image: "/divisi%20kkn/humas.jpeg",
    focus: "Komunikasi Publik",
  },
  {
    title: "PDD",
    role: "Publikasi & Dokumentasi",
    description:
      "Menangkap cerita visual KKN, mengemas konten digital yang inspiratif dan mudah dibagikan.",
    image: "/divisi%20kkn/PDD.jpeg",
    focus: "Konten & Media",
  },
  {
    title: "Logistik",
    role: "Kesiapan Operasional",
    description:
      "Menjaga ketersediaan alat, transportasi, dan kebutuhan teknis agar setiap kegiatan berjalan mulus.",
    image: "/divisi%20kkn/Logistik.jpeg",
    focus: "Supply & Transport",
  },
  {
    title: "Konsumsi",
    role: "Nutrisi Tim & Warga",
    description:
      "Menyiapkan konsumsi yang sehat untuk tim dan kegiatan warga, menjaga energi kolektif tetap prima.",
    image: "/divisi%20kkn/Konsumsi.jpeg",
    focus: "Kuliner Komunitas",
  },
];

const highlights = [
  {
    title: "Proker Utama",
    detail:
      "Mempromosikan wisata desa, memperkuat UKM lokal, dan merancang event yang mendekatkan warga dan wisatawan.",
  },
  {
    title: "Cara Kerja",
    detail:
      "Kolaboratif, transparan, dan berkelanjutan. Setiap divisi punya ruang eksperimen untuk solusi nyata di lapangan.",
  },
  {
    title: "Ruang Dampak",
    detail:
      "Dari edukasi lingkungan, digitalisasi UKM, hingga aktivasi budaya. Fokus pada efek jangka panjang bagi desa.",
  },
];

export default function TentangKKNPage() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 via-white to-ocean-50">
      <div
        className="absolute inset-x-0 top-[-10%] h-60 bg-[radial-gradient(circle_at_top,_rgba(0,179,255,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 sm:pt-20 lg:pt-24">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary-500 via-ocean-400 to-primary-500"
            aria-hidden
          />
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                Proker Utama KKN Desa
              </p>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Kolaborasi tim KKN untuk mengangkat potensi wisata Pangandaran
              </h1>
              <p className="text-lg text-slate-700">
                Kami hadir sebagai motor penggerak program kerja utama desa:
                menata promosi wisata, memperkuat UKM, serta menghadirkan
                acara-acara yang membuat warga dan wisatawan merasa lebih dekat.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-ocean-100 px-4 py-2 text-sm font-semibold text-ocean-800">
                  Gotong royong
                </span>
                <span className="rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-800">
                  Transparan
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
                  Berkelanjutan
                </span>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-200/40 via-white to-ocean-200/40 blur-3xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-slate-900 text-white shadow-2xl">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,184,230,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(0,115,230,0.18),transparent_30%)]"
                  aria-hidden
                />
                <div className="relative space-y-4 p-7">
                  <div className="flex items-center justify-between text-sm uppercase tracking-[0.08em] text-ocean-100">
                    <span>KKN Desa 2026</span>
                    <span>Wisata Pangandaran</span>
                  </div>
                  <p className="text-xl font-semibold leading-relaxed">
                    Tim lintas divisi yang gesit, kreatif, dan siap menjadikan
                    proker utama desa lebih berdampak.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Digitalisasi UKM
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Aktivasi Event
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1">
                      Promosi Wisata
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                Struktur Divisi
              </p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Tim di balik setiap aksi lapangan
              </h2>
              <p className="text-slate-600">
                Penanggung jawab dan pelaksana KKN 126 Pangandaran.
              </p>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              9 Divisi inti
            </span>
          </div>

          <div className="relative py-4">
            <LogoLoop
              logos={divisions.map((division) => ({
                node: (
                  <article className="relative w-[280px] shrink-0 snap-start rounded-3xl border border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl sm:w-[320px] md:w-[360px]">
                    <div
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-ocean-400 to-primary-500"
                      aria-hidden
                    />
                    <div className="relative h-44 overflow-hidden rounded-t-3xl">
                      <Image
                        src={division.image}
                        alt={division.role}
                        fill
                        sizes="(max-width: 768px) 320px, 360px"
                        className={`object-cover transition duration-500 group-hover:scale-[1.05] ${
                          division.imagePosition ?? ""
                        }`}
                        priority
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
                        aria-hidden
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                        {division.focus}
                      </span>
                    </div>
                    <div className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">
                            {division.role}
                          </p>
                          <h3 className="text-xl font-bold text-slate-900">
                            {division.title}
                          </h3>
                        </div>
                        <div className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold text-ocean-700">
                          Aktif
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {division.description}
                      </p>
                    </div>
                  </article>
                ),
                title: division.title,
                ariaLabel: `${division.title} - ${division.role}`,
              }))}
              speed={60}
              direction="left"
              logoHeight={400}
              gap={24}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="rgb(248 250 252)"
              ariaLabel="Divisi KKN"
              className="py-2"
            />
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
              Kenapa kami ada
            </p>
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Proker utama yang berfokus pada wisata dan kemandirian desa
            </h3>
            <p className="text-slate-600">
              KKN ini menjadi wadah praktik nyata untuk memajukan pariwisata
              Pangandaran. Kami menyatukan kreativitas, teknologi, serta
              pendekatan budaya lokal agar setiap aktivitas meninggalkan manfaat
              berkelanjutan.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold text-primary-700">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-primary-600 via-ocean-500 to-primary-700 p-7 text-white shadow-xl">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_30%)]"
              aria-hidden
            />
            <div className="relative space-y-4">
              <p className="text-sm uppercase tracking-[0.14em] text-ocean-50">
                Visi lapangan
              </p>
              <h4 className="text-2xl font-semibold leading-snug">
                Pengalaman wisata yang humanis, digital, dan ramah lingkungan.
              </h4>
              <ul className="space-y-3 text-sm text-slate-100">
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-white"
                    aria-hidden
                  />
                  Digitalisasi informasi destinasi, kuliner, dan rute
                  transportasi.
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-white"
                    aria-hidden
                  />
                  Pendampingan UKM agar lebih siap menyambut wisatawan.
                </li>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-white"
                    aria-hidden
                  />
                  Aktivasi event budaya yang merangkul komunitas lokal.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
