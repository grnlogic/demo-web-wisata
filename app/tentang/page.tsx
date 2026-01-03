import {
  Calendar,
  Compass,
  MapPin,
  Mountain,
  Sun,
  Users,
  Waves,
} from "lucide-react";

const highlights = [
  {
    title: "Sejarah Pangandaran",
    body: "Nama Pangandaran berasal dari kata 'Pang' (tempat) dan 'andaran' (hutan). Pada masa kolonial sudah populer sebagai tujuan wisata; peninggalan seperti Goa Jepang di Cagar Alam Pananjung menjadi saksi sejarah.",
  },
  {
    title: "Geografi & Iklim",
    body: "Luas ~68 km², ketinggian 0-200 mdpl, dua sisi pantai dipisahkan Cagar Alam Pananjung. Iklim tropis 27-32°C dengan musim hujan Nov–Mar dan kemarau Apr–Okt.",
  },
  {
    title: "Budaya & Tradisi",
    body: "Mayoritas Sunda dengan tradisi Nadran/Hajat Laut, festival budaya, serta seni wayang golek, jaipongan, dan musik calung. Kuliner laut segar menjadi identitas kuat.",
  },
];

const facts = [
  { label: "Provinsi", value: "Jawa Barat" },
  { label: "Kabupaten", value: "Pangandaran" },
  { label: "Luas Wilayah", value: "~68 km²" },
  { label: "Populasi", value: "~50.000 jiwa" },
  { label: "Bahasa", value: "Sunda, Indonesia" },
];

const stats = [
  { icon: MapPin, label: "Destinasi", value: "25+" },
  { icon: Users, label: "Wisatawan/Tahun", value: "500K+" },
  { icon: Calendar, label: "Event Tahunan", value: "30+" },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950">
        <div className="absolute inset-0 opacity-60 blur-3xl" aria-hidden>
          <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-emerald-500/25" />
          <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-cyan-400/20" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <Compass className="h-4 w-4" />
            Profil destinasi selatan Jawa Barat
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                Tentang Pangandaran: alam, budaya, dan laut dalam satu tempat
              </h1>
              <p className="text-lg text-white/80">
                Kenali karakter pesisir yang tenang, cagar alam Pananjung, serta
                budaya Sunda yang tetap hidup. Disajikan dengan estetika gelap
                kaca yang konsisten dengan halaman lain.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                  <Waves className="h-4 w-4" />
                  Dua sisi pantai ikonik
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                  <Mountain className="h-4 w-4" />
                  Cagar alam & karst
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                  <Sun className="h-4 w-4" />
                  Sunrise & sunset spot
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur shadow-lg shadow-emerald-950/20"
                >
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <stat.icon className="h-4 w-4" />
                    {stat.label}
                  </div>
                  <p className="text-2xl font-semibold text-white mt-2">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur shadow-lg shadow-emerald-950/20"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80 mb-2">
                      Highlight
                    </p>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur shadow-xl shadow-emerald-950/25 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">
                      Cerita panjang
                    </p>
                    <h2 className="text-3xl font-semibold text-white">
                      Sejarah, geografi, dan budaya
                    </h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-white/70">
                    <Compass className="h-4 w-4" />
                    Ringkasan kurasi tim
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-white/75 leading-relaxed">
                  <div className="space-y-4">
                    <p>
                      Pangandaran telah dikenal sejak era kerajaan sebagai
                      pelabuhan dan titik singgah. Statusnya kian kuat di masa
                      kolonial ketika jalur wisata dibuka, menghadirkan
                      penginapan dan infrastruktur pantai.
                    </p>
                    <p>
                      Bentang alamnya unik: dua pantai yang saling membelakangi,
                      hutan tropis Pananjung, formasi karang, dan garis ombak
                      yang berbeda karakter antara barat dan timur.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p>
                      Budaya Sunda terasa di keramahan warga, musik calung, dan
                      kuliner laut segar. Upacara laut seperti Nadran menjaga
                      hubungan masyarakat dengan alam dan laut sebagai sumber
                      hidup.
                    </p>
                    <p>
                      Modernisasi pariwisata tetap diracik dengan kearifan
                      lokal, menempatkan Pangandaran sebagai destinasi yang
                      selaras antara alam, budaya, dan pengalaman wisata.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-lg shadow-emerald-950/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Fakta singkat
                </h3>
                <div className="space-y-4 text-sm text-white/75">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-white/60">{fact.label}</span>
                      <span className="font-semibold text-white">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-400/20 to-cyan-400/15 p-6 text-white backdrop-blur shadow-lg shadow-emerald-950/25">
                <h3 className="text-lg font-semibold mb-4">
                  Waktu terbaik berkunjung
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Sun className="w-5 h-5 text-amber-300" />
                    <div>
                      <p className="font-semibold text-white">
                        April - Oktober
                      </p>
                      <p className="text-white/80">
                        Musim kemarau, langit cerah untuk pantai dan aktivitas
                        laut.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Waves className="w-5 h-5 text-cyan-200" />
                    <div>
                      <p className="font-semibold text-white">
                        November - Maret
                      </p>
                      <p className="text-white/80">
                        Musim hujan, debit sungai naik, air terjun dan hijauan
                        lebih segar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
