import { Backpack, Sun, Umbrella, Shield, Camera, Clock } from "lucide-react";

const tips = [
  {
    title: "Susun itinerary realistis",
    detail:
      "Prioritaskan 2-3 aktivitas utama per hari: sunrise Pantai Timur, siang ke cagar alam, sore kulineran di Pasar Ikan.",
    icon: Clock,
  },
  {
    title: "Bawa perlengkapan wajib pantai",
    detail:
      "Kacamata UV, topi, sunblock, sandal anti selip, dan dry bag kecil untuk gadget. Malam hari siapkan jaket tipis.",
    icon: Sun,
  },
  {
    title: "Cash + e-wallet",
    detail:
      "Gunakan e-wallet di kafe/ritel, tapi tetap siapkan uang tunai pecahan kecil untuk tiket masuk dan warung lokal.",
    icon: Shield,
  },
  {
    title: "Dokumentasi anti burem",
    detail:
      "Bersihkan lensa sebelum foto, manfaatkan golden hour 06.00–08.00 & 16.30–17.30, dan gunakan mode HDR di pantai.",
    icon: Camera,
  },
  {
    title: "Hormati adat dan area konservasi",
    detail:
      "Ikuti jalur trekking yang ditandai, jangan memberi makan satwa, dan bawa kembali sampah pribadi ke titik kumpul.",
    icon: Umbrella,
  },
  {
    title: "Packing ringan, efisien",
    detail:
      "Gunakan tas 20-30L untuk day trip, masukkan botol minum reusable, tisu basah, P3K mini, dan charger cadangan.",
    icon: Backpack,
  },
];

const snacks = [
  {
    title: "Kuliner wajib",
    items: [
      "Seafood bakar pasar ikan",
      "Mie pangsit lokal",
      "Kopi pantai senja",
    ],
  },
  {
    title: "Belanja bijak",
    items: [
      "Beli di UMKM tepi pantai",
      "Cek harga dulu sebelum order",
      "Tawar dengan sopan",
    ],
  },
];

export default function TipsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-70 blur-3xl" aria-hidden>
          <div className="absolute -top-16 -left-12 h-64 w-64 rounded-full bg-emerald-200/50" />
          <div className="absolute top-8 right-0 h-72 w-72 rounded-full bg-cyan-200/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm ring-1 ring-slate-200 px-3 py-1 text-sm text-slate-600">
            <Backpack className="h-4 w-4" />
            Tips siap pakai
          </div>
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Tips wisata Pangandaran tanpa ribet
            </h1>
            <p className="text-lg text-slate-600">
              Checklist singkat supaya perjalananmu lebih ringan, aman, dan
              fotonya cakep. Bisa langsung dipakai besok.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                    <tip.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {tip.title}
                  </h3>
                </div>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {tip.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-700/70">
                    Checklist cuaca
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                    Siang terik, malam sejuk
                  </h3>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Siang</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Sunblock SPF 30+</li>
                    <li>Topi / kacamata UV</li>
                    <li>Botol minum isi ulang</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Sore/Malam</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Jaket tipis</li>
                    <li>Obat nyamuk oles</li>
                    <li>Powerbank</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {snacks.map((box) => (
                <div
                  key={box.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-700/70">
                    {box.title}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600 list-disc list-inside">
                    {box.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
