import { Bus, Train, Plane, Ship, MapPin, Clock, Ticket } from "lucide-react";

const routes = [
  {
    icon: Bus,
    title: "Bus langsung",
    detail:
      "Jakarta / Bandung → Pangandaran via jalur selatan. Pilih kelas eksekutif malam untuk tiba pagi dan langsung check-in.",
    note: "Terminal Pangandaran dekat pantai timur, lanjut ojek/angkot 10-15 menit.",
  },
  {
    icon: Train,
    title: "Kereta + shuttle",
    detail:
      "Stasiun Banjar (KA arah timur) lalu lanjut travel/shuttle ~1,5 jam ke Pangandaran. Booking travel lebih dulu saat akhir pekan.",
    note: "Cocok untuk perjalanan nyaman dengan waktu tempuh stabil.",
  },
  {
    icon: Plane,
    title: "Pesawat (opsional)",
    detail:
      "Bandara terdekat Cakrabhuwana/Ciamis atau Nusa Wiru jika tersedia charter. Umumnya wisatawan memilih bus/kereta karena jadwal terbatas.",
    note: "Cek jadwal terbaru; opsi ini tidak selalu beroperasi.",
  },
  {
    icon: Ship,
    title: "Kapal nelayan lokal",
    detail:
      "Untuk island hopping kecil di sekitar pantai timur atau ke spot snorkeling. Gunakan jaket pelampung dan negosiasikan tarif sebelum naik.",
    note: "Pilih cuaca tenang dan berangkat pagi.",
  },
];

const lokal = [
  {
    title: "Sewa motor",
    detail:
      "Paling fleksibel untuk keliling pantai barat–timur dan cagar alam. Pastikan helm & STNK lengkap.",
    time: "60-80k/hari",
  },
  {
    title: "Angkot/Ojek",
    detail:
      "Rute utama pantai timur–barat dan terminal. Ojek cocok untuk titik singkat atau malam hari.",
    time: "Tarif nego wajar",
  },
  {
    title: "Sewa mobil + driver",
    detail:
      "Nyaman untuk rombongan atau keluarga, terutama jika ingin ke Green Canyon atau Batu Hiu.",
    time: "Mulai 450k/hari",
  },
];

export default function TransportasiPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 via-white to-emerald-50">
        <div className="absolute inset-0 opacity-70 blur-3xl" aria-hidden>
          <div className="absolute -top-16 -left-12 h-64 w-64 rounded-full bg-blue-200/50" />
          <div className="absolute top-8 right-0 h-72 w-72 rounded-full bg-emerald-200/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm ring-1 ring-slate-200 px-3 py-1 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            Rute & transport
          </div>
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Cara paling mudah ke Pangandaran
            </h1>
            <p className="text-lg text-slate-600">
              Ringkasan opsi perjalanan dari kota besar dan pilihan transport
              lokal setibanya di Pangandaran.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            {routes.map((route) => (
              <div
                key={route.title}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                    <route.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {route.title}
                  </h3>
                </div>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {route.detail}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                  <Clock className="h-3.5 w-3.5" />
                  {route.note}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700/70">
                Setibanya di Pangandaran
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                Transport lokal yang praktis
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
                {lokal.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-slate-50 p-4 h-full flex flex-col gap-2"
                  >
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="leading-relaxed">{item.detail}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                      <Ticket className="h-3.5 w-3.5" /> {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700/70">
                Catatan singkat
              </p>
              <ul className="space-y-3 text-sm text-slate-600 list-disc list-inside">
                <li>Berangkat malam → tiba pagi, lebih sedikit macet.</li>
                <li>
                  Pesan travel/ojek online lebih awal saat akhir pekan atau
                  libur panjang.
                </li>
                <li>Bawa uang tunai untuk parkir dan tiket spot lokal.</li>
                <li>
                  Jika membawa mobil pribadi, parkir resmi tersedia di Pantai
                  Barat & Timur.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
