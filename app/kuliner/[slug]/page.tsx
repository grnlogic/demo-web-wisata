"use client";

import Link from "next/link";
import {
  MapPin,
  Star,
  DollarSign,
  Phone,
  ChevronLeft,
  Image as ImageIcon,
  Clock,
  Navigation,
  Utensils,
  Share2,
} from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500">Memuat peta...</p>
    </div>
  ),
});

interface Kuliner {
  id: string;
  nama: string;
  slug: string;
  kategori: string;
  lokasi: string;
  alamat: string;
  koordinat: string | null;
  googleMapsUrl: string | null;
  deskripsi: string;
  hargaMin: number | null;
  hargaMax: number | null;
  rating: number | null;
  jamBuka: string | null;
  nomorTelepon: string | null;
  gambar: string[];
  featured: boolean;
}

export default function KulinerDetailPage() {
  const params = useParams();
  const [kuliner, setKuliner] = useState<Kuliner | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchKuliner();
  }, [params.slug]);

  const fetchKuliner = async () => {
    try {
      const response = await fetch(`/api/kuliner/${params.slug}`);
      if (!response.ok) {
        notFound();
        return;
      }
      const data = await response.json();
      setKuliner(data);
    } catch (error) {
      console.error("Error fetching kuliner:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (min: number | null, max: number | null) => {
    if (!min && !max) return "Harga belum tersedia";
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    }
    if (min) return `Mulai ${formatter.format(min)}`;
    return `Hingga ${formatter.format(max!)}`;
  };

  const getMapLocation = () => {
    if (!kuliner?.koordinat) return null;
    const [lat, lon] = kuliner.koordinat
      .split(",")
      .map((s) => parseFloat(s.trim()));
    return { lat, lon };
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!kuliner) {
    notFound();
    return null;
  }

  const mapLocation = getMapLocation();

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/kuliner"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali ke Daftar Kuliner</span>
          </Link>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="md:col-span-3 h-96 rounded-2xl overflow-hidden relative group">
              {kuliner.gambar && kuliner.gambar.length > 0 ? (
                <img
                  src={kuliner.gambar[selectedImage]}
                  alt={kuliner.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Utensils className="w-24 h-24 text-white/30" />
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span className="text-sm">
                  {kuliner.gambar?.length || 0} Foto
                </span>
              </div>
            </div>

            {/* Thumbnail Grid */}
            {kuliner.gambar && kuliner.gambar.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {kuliner.gambar.slice(0, 2).map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-44 rounded-xl cursor-pointer hover:scale-105 transition-transform overflow-hidden ${
                      selectedImage === index ? "ring-4 ring-orange-500" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${kuliner.nama} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
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
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {kuliner.kategori}
                      </span>
                      {kuliner.featured && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-3">
                      {kuliner.nama}
                    </h1>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{kuliner.lokasi}</span>
                    </div>
                  </div>
                  {kuliner.rating && kuliner.rating > 0 && (
                    <div className="text-right">
                      <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-xl">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold text-slate-800">
                          {kuliner.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Tentang
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p className="whitespace-pre-line">{kuliner.deskripsi}</p>
                </div>
              </div>

              {/* Location Map */}
              {mapLocation && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Lokasi
                  </h2>
                  <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                    <p className="text-slate-700">{kuliner.alamat}</p>
                  </div>
                  <LocationPicker
                    onLocationSelect={() => {}}
                    initialLocation={mapLocation}
                    readOnly={true}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & Hours Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Informasi
                </h3>

                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
                    <DollarSign className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Range Harga</p>
                      <p className="text-lg font-bold text-slate-800">
                        {formatPrice(kuliner.hargaMin, kuliner.hargaMax)}
                      </p>
                    </div>
                  </div>

                  {/* Jam Buka */}
                  {kuliner.jamBuka && (
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                      <Clock className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Jam Buka</p>
                        <p className="text-lg font-semibold text-slate-800">
                          {kuliner.jamBuka}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {kuliner.nomorTelepon && (
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                      <Phone className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Kontak</p>
                        <a
                          href={`tel:${kuliner.nomorTelepon}`}
                          className="text-lg font-semibold text-green-600 hover:text-green-700"
                        >
                          {kuliner.nomorTelepon}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {kuliner.googleMapsUrl && (
                    <a
                      href={kuliner.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      <Navigation className="w-5 h-5" />
                      Petunjuk Arah
                    </a>
                  )}

                  {kuliner.nomorTelepon && (
                    <a
                      href={`https://wa.me/${kuliner.nomorTelepon.replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      WhatsApp
                    </a>
                  )}

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: kuliner.nama,
                          text: kuliner.deskripsi,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Bagikan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
