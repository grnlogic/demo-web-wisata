import Link from "next/link";
import { MapPin, Star, Navigation, ChevronLeft, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma, safeQuery } from "@/lib/prisma";
import { dummyDestinasi } from "@/lib/dummy-data";
import { KategoriDestinasi } from "@prisma/client";
import DestinasiReviews from "@/components/DestinasiReviews";
import PriceList from "@/components/PriceList";
import ImageGallery from "@/components/ImageGallery";

async function getDestinasiBySlug(slug: string) {
  const fromDb = await safeQuery(
    () =>
      prisma.destinasi.findUnique({
        where: { slug, status: "PUBLISHED" },
        include: {
          images: {
            orderBy: { isPrimary: "desc" },
          },
          harga: true,
          fasilitas: true,
        },
      }),
    null,
  );
  if (fromDb) return fromDb;

  const dummy = dummyDestinasi.find((d) => d.slug === slug);
  if (dummy) return dummy;

  return null;
}

import { translateText } from "@/lib/translation";
import { cookies } from "next/headers";

export default async function DestinasiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let destinasi = await getDestinasiBySlug(slug);

  if (!destinasi) {
    notFound();
  }

  // Handle Translation
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as "id" | "en") || "id";

  if (lang === "en") {
    destinasi = {
      ...destinasi,
      nama: await translateText(destinasi.nama, "id", "en"),
      deskripsi: await translateText(destinasi.deskripsi, "id", "en"),
      lokasi: await translateText(destinasi.lokasi, "id", "en"),
      harga: await Promise.all(
        destinasi.harga.map(async (h) => ({
          ...h,
          jenisHarga: await translateText(h.jenisHarga, "id", "en"),
        })),
      ),
      // Fasilitas translation can be added here if needed, but it's complex structure
    };
  }

  const getKategoriLabel = (kat: KategoriDestinasi) => {
    const labels: Record<KategoriDestinasi, string> = {
      PANTAI: "Pantai",
      CAGAR_ALAM: "Cagar Alam",
      GOA: "Goa",
      WISATA_BUDAYA: "Wisata Budaya",
      WISATA_BAHARI: "Wisata Bahari",
      WAHANA_AIR: "Wahana Air",
      KAMPUNG_TURIS: "Kampung Turis",
      LAINNYA: "Lainnya",
    };
    return labels[kat] || kat;
  };

  const formatPrice = (harga: number) => {
    if (harga === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/destinasi"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali ke Destinasi</span>
          </Link>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ImageGallery
            images={destinasi.images}
            destinationName={destinasi.nama}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {getKategoriLabel(destinasi.kategori)}
                      </span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-3">
                      {destinasi.nama}
                    </h1>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{destinasi.lokasi}</span>
                    </div>
                  </div>
                  {destinasi.rating !== null && destinasi.rating > 0 && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-xl">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold text-slate-800">
                          {destinasi.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">
                        {destinasi.jumlahReview} review
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Deskripsi
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p className="whitespace-pre-line">{destinasi.deskripsi}</p>
                </div>
              </div>

              {/* Fasilitas */}
              {destinasi.fasilitas && destinasi.fasilitas.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Fasilitas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destinasi.fasilitas.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 text-slate-600"
                      >
                        <Check className="w-5 h-5 text-green-600 shrink-0" />
                        <span>{item.judul}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <DestinasiReviews slug={slug} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Harga */}
              <PriceList prices={destinasi.harga} />

              {/* Info & Map */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Informasi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">Alamat</div>
                      <div className="text-sm text-slate-600">
                        {destinasi.alamat}
                      </div>
                    </div>
                  </div>

                  {destinasi.koordinat && (
                    <>
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-slate-800 mb-2">
                          Lokasi
                        </h4>
                        {(() => {
                          const [lat, lon] = destinasi.koordinat
                            .split(",")
                            .map((s: string) => parseFloat(s.trim()));
                          if (!isNaN(lat) && !isNaN(lon)) {
                            return (
                              <>
                                <div className="aspect-video bg-slate-200 rounded-lg mb-3 overflow-hidden">
                                  <iframe
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                                      lon - 0.01
                                    },${lat - 0.01},${lon + 0.01},${
                                      lat + 0.01
                                    }&layer=mapnik&marker=${lat},${lon}`}
                                    className="w-full h-full"
                                  ></iframe>
                                </div>
                                <a
                                  href={
                                    destinasi.googleMapsUrl ||
                                    `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                                >
                                  <Navigation className="w-5 h-5" />
                                  <span>Buka di Google Maps</span>
                                </a>
                              </>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
