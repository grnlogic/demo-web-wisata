"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Clock,
  Award,
  ShoppingBag,
  Loader2,
  Navigation,
} from "lucide-react";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500">Memuat peta...</p>
    </div>
  ),
});

interface UKM {
  id: string;
  namaUsaha: string;
  slug: string;
  deskripsi: string;
  kategori: string;
  pemilik: string;
  lokasi: string;
  alamat?: string;
  koordinat?: string;
  logo?: string;
  gambar: string[];
  produkLayanan: string[];
  featured: boolean;
  verified: boolean;
  nomorTelepon?: string;
  email?: string;
  instagram?: string;
  website?: string;
  createdAt?: string;
}

export default function UkmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [ukm, setUkm] = useState<UKM | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUKMDetail();
  }, [slug]);

  const fetchUKMDetail = async () => {
    try {
      const response = await fetch(`/api/ukm?slug=${slug}`);
      if (response.ok) {
        const data = await response.json();
        // API returns array, get first item
        if (Array.isArray(data) && data.length > 0) {
          setUkm(data[0]);
        } else if (!Array.isArray(data)) {
          setUkm(data);
        } else {
          notFound();
        }
      } else {
        notFound();
      }
    } catch (error) {
      console.error("Error fetching UKM detail:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Memuat detail UKM...</p>
        </div>
      </div>
    );
  }

  if (!ukm) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/ukm"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Daftar UKM
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          {ukm.gambar && ukm.gambar.length > 0 && (
            <div className="relative h-96 bg-slate-200">
              <img
                src={
                  ukm.gambar[0] ||
                  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
                }
                alt={ukm.namaUsaha}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 lg:p-12">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
              <div className="flex items-start space-x-6 mb-6 lg:mb-0">
                {ukm.logo ? (
                  <img
                    src={ukm.logo}
                    alt={ukm.namaUsaha}
                    className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Store className="w-12 h-12 text-white" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
                      {ukm.namaUsaha}
                    </h1>
                    {ukm.verified && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          Terverifikasi
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-slate-600">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium">
                      <ShoppingBag className="w-4 h-4" />
                      {ukm.kategori}
                    </span>
                    {ukm.featured && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-semibold">
                        <Award className="w-4 h-4" />
                        UKM Unggulan
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-6 bg-slate-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 mb-1">Lokasi</p>
                  <p className="text-slate-800 font-medium">{ukm.lokasi}</p>
                </div>
              </div>

              {ukm.nomorTelepon && (
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Telepon</p>
                    <a
                      href={`tel:${ukm.nomorTelepon}`}
                      className="text-slate-800 font-medium hover:text-green-600 transition-colors"
                    >
                      {ukm.nomorTelepon}
                    </a>
                  </div>
                </div>
              )}

              {ukm.email && (
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Email</p>
                    <a
                      href={`mailto:${ukm.email}`}
                      className="text-slate-800 font-medium hover:text-green-600 transition-colors break-all"
                    >
                      {ukm.email}
                    </a>
                  </div>
                </div>
              )}

              {ukm.pemilik && (
                <div className="flex items-start space-x-3">
                  <Store className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Pemilik</p>
                    <p className="text-slate-800 font-medium">{ukm.pemilik}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Tentang {ukm.namaUsaha}
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {ukm.deskripsi}
              </p>
            </div>

            {/* Map Location */}
            {ukm.koordinat && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Lokasi
                </h2>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 mb-1">
                        {ukm.lokasi}
                      </p>
                      {ukm.alamat && (
                        <p className="text-slate-600 text-sm">{ukm.alamat}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <LocationPicker
                    initialLocation={
                      ukm.koordinat
                        ? {
                            lat: parseFloat(ukm.koordinat.split(",")[0]),
                            lon: parseFloat(ukm.koordinat.split(",")[1]),
                          }
                        : undefined
                    }
                    readOnly={true}
                    onLocationSelect={() => {}}
                  />
                </div>
                {ukm.koordinat && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${ukm.koordinat}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Buka di Google Maps
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.waze.com/ul?ll=${ukm.koordinat}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Buka di Waze
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Products/Services */}
            {ukm.produkLayanan && ukm.produkLayanan.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Produk & Layanan
                </h2>
                <div className="flex flex-wrap gap-3">
                  {ukm.produkLayanan.map((produk: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-full font-medium"
                    >
                      {produk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {ukm.gambar && ukm.gambar.length > 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Galeri
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ukm.gambar.slice(1).map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-xl overflow-hidden bg-slate-200"
                    >
                      <img
                        src={img}
                        alt={`${ukm.namaUsaha} - Gambar ${idx + 2}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media Links */}
            {(ukm.instagram || ukm.website) && (
              <div className="border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Temukan Kami Di
                </h2>
                <div className="flex flex-wrap gap-4">
                  {ukm.instagram && (
                    <a
                      href={
                        ukm.instagram.startsWith("http")
                          ? ukm.instagram
                          : `https://instagram.com/${ukm.instagram}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                      Instagram
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {ukm.website && (
                    <a
                      href={
                        ukm.website.startsWith("http")
                          ? ukm.website
                          : `https://${ukm.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      <Globe className="w-5 h-5" />
                      Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Tertarik dengan UKM ini?</h2>
          <p className="text-white/90 mb-6">
            Hubungi langsung untuk informasi lebih lanjut
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {ukm.nomorTelepon && (
              <a
                href={`tel:${ukm.nomorTelepon}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-slate-50 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Hubungi via Telepon
              </a>
            )}
            {ukm.email && (
              <a
                href={`mailto:${ukm.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Kirim Email
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
