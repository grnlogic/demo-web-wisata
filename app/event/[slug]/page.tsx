"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Ticket,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface Event {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  lokasi: string;
  alamat: string | null;
  koordinat: string | null;
  googleMapsUrl: string | null;
  tanggalMulai: string;
  tanggalSelesai: string;
  jamMulai: string | null;
  jamSelesai: string | null;
  gambar: string | null;
  thumbnail: string | null;
  kontakPerson: string | null;
  nomorTelepon: string | null;
  hargaTiket: string | null;
  featured: boolean;
  createdAt: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchEvent();
    }
  }, [slug]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/event/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push("/event");
          return;
        }
        throw new Error("Gagal mengambil data event");
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      alert("Gagal mengambil data event");
      router.push("/event");
    } finally {
      setLoading(false);
    }
  };

  const getEventStatus = (tanggalMulai: string, tanggalSelesai: string) => {
    const now = new Date();
    const start = new Date(tanggalMulai);
    const end = new Date(tanggalSelesai);

    if (now < start) {
      return { label: "Akan Datang", color: "bg-blue-500" };
    } else if (now >= start && now <= end) {
      return { label: "Sedang Berlangsung", color: "bg-green-500" };
    } else {
      return { label: "Selesai", color: "bg-gray-500" };
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.nama,
        text: event?.deskripsi,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-slate-600">Memuat detail event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const eventStatus = getEventStatus(event.tanggalMulai, event.tanggalSelesai);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image */}
      <section className="relative h-[500px] bg-gradient-to-br from-purple-600 to-pink-600">
        {event.gambar && (
          <>
            <img
              src={event.gambar}
              alt={event.nama}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          </>
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <button
              onClick={() => router.push("/event")}
              className="mb-6 inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Event</span>
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`${eventStatus.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                  >
                    {eventStatus.label}
                  </span>
                  {event.featured && (
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {event.nama}
                </h1>
              </div>

              <button
                onClick={handleShare}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Tentang Event
                </h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {event.deskripsi}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Informasi Event
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Tanggal Mulai
                      </p>
                      <p className="font-semibold text-slate-800">
                        {format(
                          new Date(event.tanggalMulai),
                          "EEEE, dd MMMM yyyy",
                          { locale: idLocale }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Tanggal Selesai
                      </p>
                      <p className="font-semibold text-slate-800">
                        {format(
                          new Date(event.tanggalSelesai),
                          "EEEE, dd MMMM yyyy",
                          { locale: idLocale }
                        )}
                      </p>
                    </div>
                  </div>

                  {(event.jamMulai || event.jamSelesai) && (
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Waktu</p>
                        <p className="font-semibold text-slate-800">
                          {event.jamMulai || "00:00"} -{" "}
                          {event.jamSelesai || "23:59"} WIB
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 mb-1">Lokasi</p>
                      <p className="font-semibold text-slate-800">
                        {event.lokasi}
                      </p>
                      {event.alamat && (
                        <p className="text-sm text-slate-600 mt-1">
                          {event.alamat}
                        </p>
                      )}
                      {event.googleMapsUrl && (
                        <a
                          href={event.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mt-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Lihat di Google Maps
                        </a>
                      )}
                    </div>
                  </div>

                  {event.hargaTiket && (
                    <div className="flex items-start space-x-3">
                      <Ticket className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-500 mb-1">
                          Harga Tiket
                        </p>
                        <p className="font-semibold text-slate-800 whitespace-pre-wrap">
                          {event.hargaTiket}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              {(event.kontakPerson || event.nomorTelepon) && (
                <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Informasi Kontak
                  </h3>

                  <div className="space-y-4">
                    {event.kontakPerson && (
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-slate-500 mb-1">
                            Kontak Person
                          </p>
                          <p className="font-semibold text-slate-800">
                            {event.kontakPerson}
                          </p>
                        </div>
                      </div>
                    )}

                    {event.nomorTelepon && (
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-slate-500 mb-1">
                            No. Telepon
                          </p>
                          <a
                            href={`tel:${event.nomorTelepon}`}
                            className="font-semibold text-purple-600 hover:text-purple-700"
                          >
                            {event.nomorTelepon}
                          </a>
                        </div>
                      </div>
                    )}

                    {event.nomorTelepon && (
                      <a
                        href={`https://wa.me/${event.nomorTelepon.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                      >
                        Hubungi via WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
