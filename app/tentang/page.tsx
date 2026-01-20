import { Target, Flag, Users, Building2, UserCircle } from "lucide-react";
import Image from "next/image";

const misiList = [
  "Meningkatkan transparansi dan akuntabilitas tata kelola pemerintahan desa.",
  "Mengembangkan pelayanan publik yang cepat, partisipatif, dan efisien.",
  "Pemberdayaan masyarakat melalui peningkatan kapasitas SDM dan ekonomi lokal.",
  "Digitalisasi layanan desa untuk mendukung akses informasi dan layanan publik.",
  "Peningkatan sarana prasarana desa secara merata untuk kesejahteraan masyarakat.",
  "Mendorong partisipasi aktif masyarakat dalam pembangunan dan pelestarian potensi lokal.",
];

const perangkatDesa = {
  kepala: {
    nama: "Adi Fitriadi, S.IP.",
    jabatan: "Kepala Desa",
    foto: "/koordinasi%20desa/ADI FITRIADI, S.I.P.jpg",
  },
  sekretariat: [
    {
      nama: "Imah Suherman, S.E",
      jabatan: "Sekretaris Desa",
      foto: "/koordinasi%20desa/IMAN SAHMAN, S.E.png",
    },
    {
      nama: "Alvi Anisyah",
      jabatan: "Kaur Tata Usaha & Umum",
      foto: "/koordinasi%20desa/ALVI ANISYAH.png",
    },
    {
      nama: "Fauzi, S.Ak",
      jabatan: "Staf Tata Usaha & Umum",
      foto: "/koordinasi%20desa/FAUZI, S.Ak.png",
    },
    {
      nama: "Wenny Damayanti, S.E",
      jabatan: "Kaur Keuangan",
      foto: "/koordinasi%20desa/WENNY DAMAYANTI, S.E.png",
    },
    {
      nama: "Wiwi Widaningsih",
      jabatan: "Staf Keuangan Bidang Pendapatan",
      foto: "/koordinasi%20desa/WIWI WIDANINGSIH.png",
    },
    {
      nama: "N. Intan Gumilang, S.I.K",
      jabatan: "Kaur Perencanaan",
      foto: "/koordinasi%20desa/N. INTAN GUMILANG, S.I.K.png",
    },
  ],
  pelaksanaTeknis: [
    {
      nama: "Slamet",
      jabatan: "Kasi Pemerintahan",
      foto: "/koordinasi%20desa/SLAMET.png",
    },
    {
      nama: "Kuswanto Haditama",
      jabatan: "Staf Pemerintahan",
      foto: "/koordinasi%20desa/KUSWANTO HADITAMA.png",
    },
    {
      nama: "Dini Indriandini. Y",
      jabatan: "Kasi Kesejahteraan",
      foto: "/koordinasi%20desa/DINI INDRIANDINI. Y.png",
    },
    {
      nama: "Nuryamin",
      jabatan: "Kasi Pelayanan",
      foto: "/koordinasi%20desa/nuryamin.jpg",
    },
    {
      nama: "Yoyo Suryono, S.IP",
      jabatan: "Staf Pelayanan",
      foto: "/koordinasi%20desa/YOYO SURYONO, S.IP.png",
    },
  ],
  pelaksanaKewilayahan: [
    {
      nama: "Onih Ratnaningsih",
      jabatan: "Kadus Pangandaran Timur",
      foto: "/koordinasi%20desa/ONIH RATNANINGSIH.png",
    },
    {
      nama: "Suryanti",
      jabatan: "Kadus Pangandaran Barat",
      foto: "/koordinasi%20desa/suryanti.png",
    },
    {
      nama: "Wanto",
      jabatan: "Kadus Parapat",
      foto: "/koordinasi%20desa/wanto png.png",
    },
  ],
};

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-emerald-200 bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-40 blur-3xl" aria-hidden>
          <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-emerald-300/30" />
          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-cyan-300/25" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-sm text-emerald-800 backdrop-blur">
            <Building2 className="h-4 w-4" />
            Profil Desa Pangandaran
          </div>
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
              Tentang Desa Pangandaran
            </h1>
            <p className="text-lg text-slate-700">
              Desa Pangandaran berkomitmen untuk mewujudkan tata kelola
              pemerintahan yang baik, transparan, dan berorientasi pada
              kesejahteraan masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* Visi Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-8 md:p-12 shadow-2xl shadow-emerald-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="rounded-full bg-emerald-100 p-3">
                <Target className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 mb-2">
                  Visi Desa Pangandaran
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Mewujudkan Desa yang Sejahtera
                </h2>
              </div>
            </div>
            <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed italic border-l-4 border-emerald-500 pl-6">
              "Terbangunnya Tata Kelola Pemerintahan Desa yang Baik, Merata, dan
              Transparan guna mewujudkan Desa Pangandaran yang memiliki jati
              diri dan berkarya menuju masyarakat sejahtera."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-cyan-100 p-3">
              <Flag className="w-6 h-6 text-cyan-700" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-700">
                Misi Desa Pangandaran
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                Program Strategis Pembangunan Desa
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {misiList.map((misi, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-all hover:border-cyan-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center">
                    <span className="text-sm font-semibold text-cyan-700">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{misi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-emerald-100 p-3">
              <Users className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">
                Struktur Organisasi
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                Perangkat Desa Pangandaran
              </h2>
            </div>
          </div>

          {/* Kepala Desa */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-2xl text-center">
            <div className="inline-flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full border-4 border-emerald-300 overflow-hidden bg-white shadow-lg">
                <Image
                  src={perangkatDesa.kepala.foto}
                  alt={perangkatDesa.kepala.nama}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {perangkatDesa.kepala.nama}
                </h3>
                <p className="text-emerald-700 font-medium mt-1">
                  {perangkatDesa.kepala.jabatan}
                </p>
              </div>
            </div>
          </div>

          {/* Sekretariat Desa */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <h3 className="text-xl font-semibold px-4">Sekretariat Desa</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {perangkatDesa.sekretariat.map((person, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md text-center hover:shadow-lg hover:border-emerald-300 transition-all"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full border-2 border-slate-200 overflow-hidden bg-white shadow-sm">
                    <Image
                      src={person.foto}
                      alt={person.nama}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">
                    {person.nama}
                  </h4>
                  <p className="text-sm text-slate-600">{person.jabatan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pelaksana Teknis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <h3 className="text-xl font-semibold px-4">Pelaksana Teknis</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {perangkatDesa.pelaksanaTeknis.map((person, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md text-center hover:shadow-lg hover:border-emerald-300 transition-all"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full border-2 border-slate-200 overflow-hidden bg-white shadow-sm">
                    <Image
                      src={person.foto}
                      alt={person.nama}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">
                    {person.nama}
                  </h4>
                  <p className="text-sm text-slate-600">{person.jabatan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pelaksana Kewilayahan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <h3 className="text-xl font-semibold px-4">
                Pelaksana Kewilayahan
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {perangkatDesa.pelaksanaKewilayahan.map((person, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md text-center hover:shadow-lg hover:border-emerald-300 transition-all"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full border-2 border-slate-200 overflow-hidden bg-white shadow-sm">
                    <Image
                      src={person.foto}
                      alt={person.nama}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-1">
                    {person.nama}
                  </h4>
                  <p className="text-sm text-slate-600">{person.jabatan}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
