import {
  Home,
  Hotel,
  BedDouble,
  Star,
  Shield,
  Wifi,
  MapPin,
} from "lucide-react";
import { prisma, safeQuery } from "@/lib/prisma";
import { dummyHotelListing } from "@/lib/dummy-data";

const stays = [
  {
    title: "Budget nyaman",
    range: "250k - 400k/malam",
    detail:
      "Losmen dan homestay dekat Pantai Timur, cocok untuk backpacker. Pilih yang sudah menyediakan AC atau kipas sesuai kebutuhan.",
    icon: Home,
  },
  {
    title: "Keluarga & rombongan",
    range: "450k - 800k/malam",
    detail:
      "Guest house 2-3 kamar dengan dapur sederhana. Lokasi ideal di tengah kota agar mudah ke pasar ikan dan kuliner malam.",
    icon: BedDouble,
  },
  {
    title: "Resor tepi pantai",
    range: "900k - 1.8jt/malam",
    detail:
      "Pilihan dengan kolam renang dan view laut. Cocok untuk staycation singkat atau trip anniversary.",
    icon: Hotel,
  },
];

const checklist = [
  "Konfirmasi jarak ke pantai (jalan kaki atau perlu kendaraan)",
  "Tanya early check-in saat tiba pagi dari perjalanan malam",
  "Pastikan parkir tersedia jika bawa mobil pribadi",
  "Cek kebijakan refund & reschedule saat musim hujan",
];

export default async function AkomodasiPage() {
  const hotels = await safeQuery(
    () =>
      prisma.hotelListing.findMany({
        orderBy: [{ rating: "desc" }, { reviews: "desc" }, { fetchedAt: "desc" }],
        take: 12,
      }),
    dummyHotelListing.slice(0, 12),
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-amber-50 via-white to-emerald-50">
        <div className="absolute inset-0 opacity-70 blur-3xl" aria-hidden>
          <div className="absolute -top-16 -left-12 h-64 w-64 rounded-full bg-amber-200/50" />
          <div className="absolute top-8 right-0 h-72 w-72 rounded-full bg-emerald-200/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm ring-1 ring-slate-200 px-3 py-1 text-sm text-slate-600">
            <Star className="h-4 w-4 text-amber-500" />
            Pilih tempat tinggal yang pas
          </div>
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Akomodasi untuk tiap gaya liburan
            </h1>
            <p className="text-lg text-slate-600">
              Dari homestay ramah kantong sampai resor tepi laut. Ringkasan
              cepat supaya booking lebih tepat sasaran.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-700/70">
                Butuh hotel?
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                Kurasi singkat tempat menginap di sekitar Pangandaran
              </h2>
              <p className="text-sm text-slate-600">
                Data diambil periodik (sebulan sekali) untuk menghemat token.
                Klik salah satu untuk lanjut ke laman penyedia.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-800 bg-amber-100 px-4 py-2 rounded-full">
              <Star className="h-4 w-4" />
              Terbaru:{" "}
              {hotels[0]?.fetchedAt?.toLocaleDateString("id-ID") ??
                "belum tersedia"}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stays.map((stay) => (
              <div
                key={stay.title}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                    <stay.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-700">
                      {stay.range}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {stay.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {stay.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-700/70">
                Fasilitas penting
              </p>
              <div className="grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
                {[
                  "AC/Kipas sesuai kebutuhan",
                  "WiFi stabil",
                  "Air panas & laundry ringan",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 p-4 flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4 text-amber-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-white px-4 py-3 text-sm text-slate-700 inline-flex items-center gap-2">
                <Wifi className="h-4 w-4 text-emerald-700" />
                Kabar baik: banyak akomodasi sudah menyediakan WiFi dasar untuk
                kerja ringan atau streaming.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-700/70">
                Checklist booking
              </p>
              <ul className="space-y-3 text-sm text-slate-600 list-disc list-inside">
                {checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
              <Hotel className="h-5 w-5 text-amber-700" /> Pilihan hotel cepat
            </h3>
            {hotels.length === 0 ? (
              <p className="text-sm text-slate-600">
                Data hotel belum tersedia. Jalankan POST /api/hotels untuk
                refresh snapshot (50 hasil, 1×/bulan) lalu muat ulang halaman.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hotels.map((hotel) => {
                  const hasLink = Boolean(hotel.link);

                  return (
                    <div
                      key={hotel.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      {hotel.thumbnail ? (
                        <div className="h-40 w-full overflow-hidden bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={hotel.thumbnail}
                            alt={hotel.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm">
                          Tidak ada gambar
                        </div>
                      )}
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.18em] text-amber-700/80">
                              {hotel.source ?? "Google Hotels"}
                            </p>
                            <h4 className="text-base font-semibold text-slate-900">
                              {hotel.name}
                            </h4>
                          </div>
                          {hotel.rating ? (
                            <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                              <Star className="h-3 w-3" />{" "}
                              {hotel.rating.toFixed(1)}
                            </div>
                          ) : null}
                        </div>
                        {hotel.location ? (
                          <p className="flex items-center gap-1 text-xs text-slate-600">
                            <MapPin className="h-3 w-3 text-slate-500" />{" "}
                            {hotel.location}
                          </p>
                        ) : null}
                        <p className="text-sm text-slate-700 line-clamp-2">
                          {hotel.description ??
                            "Lihat detail harga dan ketersediaan di penyedia."}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-semibold text-emerald-700">
                            {hotel.price ?? "Lihat harga"}
                          </span>
                          <span className="text-xs text-slate-500">
                            {hotel.reviews
                              ? `${hotel.reviews} ulasan`
                              : "Ulasan belum ada"}
                          </span>
                        </div>
                        <div className="pt-1">
                          {hasLink ? (
                            <a
                              href={hotel.link as string}
                              className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Kunjungi halaman
                            </a>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-500">
                              Link tidak tersedia
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
