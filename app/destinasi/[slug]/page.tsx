import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Phone,
  Navigation,
  ChevronLeft,
  Image as ImageIcon,
  Calendar,
  Check,
} from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KategoriDestinasi } from "@prisma/client";
import DestinasiReviews from "@/components/DestinasiReviews";

async function getDestinasiBySlug(slug: string) {
  const destinasi = await prisma.destinasi.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      images: {
        orderBy: { isPrimary: "desc" },
      },
      harga: true,
      fasilitas: true,
    },
  });

  if (!destinasi) {
    return null;
  }

  return destinasi;
}

export default async function DestinasiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destinasi = await getDestinasiBySlug(slug);

  if (!destinasi) {
    notFound();
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

  const primaryImage = destinasi.images.find((img) => img.isPrimary);
  const otherImages = destinasi.images.filter((img) => !img.isPrimary);

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="md:col-span-3 h-96 rounded-2xl overflow-hidden relative group cursor-pointer">
              {primaryImage ? (
                <>
                  <img
                    src={primaryImage.url}
                    alt={destinasi.nama}
                    className="w-full h-full object-cover"
                  />
                  {primaryImage.caption && (
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                      <span className="text-sm">{primaryImage.caption}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-white/50" />
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span className="text-sm">{destinasi.images.length} Foto</span>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {otherImages.slice(0, 2).map((img) => (
                <div
                  key={img.id}
                  className="h-44 rounded-xl cursor-pointer hover:scale-105 transition-transform overflow-hidden"
                >
                  <img
                    src={img.url}
                    alt={img.caption || destinasi.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
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
                    {destinasi.fasilitas.map((item) => (
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
              {destinasi.harga && destinasi.harga.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Harga Tiket
                  </h3>
                  <div className="space-y-3">
                    {destinasi.harga.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0"
                      >
                        <span className="text-slate-700">
                          {item.jenisHarga}
                        </span>
                        <span className="font-semibold text-blue-600">
                          {formatPrice(item.harga)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                            .map((s) => parseFloat(s.trim()));
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
