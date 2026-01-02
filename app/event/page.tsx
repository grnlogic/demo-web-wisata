"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Search } from "lucide-react";
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

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [search, events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/event");
      if (!response.ok) throw new Error("Gagal mengambil data event");

      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (search) {
      filtered = filtered.filter(
        (event) =>
          event.nama.toLowerCase().includes(search.toLowerCase()) ||
          event.lokasi.toLowerCase().includes(search.toLowerCase()) ||
          event.deskripsi.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
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

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Event & Agenda</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Temukan berbagai event menarik dan agenda kegiatan wisata di
              Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-slate-600">Memuat event...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Tidak Ada Event
              </h3>
              <p className="text-slate-600">
                {search
                  ? "Tidak ada event yang sesuai dengan pencarian Anda."
                  : "Belum ada event yang tersedia saat ini."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.map((event) => {
                const eventStatus = getEventStatus(
                  event.tanggalMulai,
                  event.tanggalSelesai
                );
                return (
                  <Link
                    key={event.id}
                    href={`/event/${event.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div
                      className="relative h-64 bg-gradient-to-br from-purple-500 to-pink-500"
                      style={
                        event.thumbnail || event.gambar
                          ? {
                              backgroundImage: `url(${
                                event.thumbnail || event.gambar
                              })`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : {}
                      }
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4 space-y-2">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-sm font-bold text-purple-600">
                            {format(
                              new Date(event.tanggalMulai),
                              "dd MMM yyyy",
                              { locale: idLocale }
                            )}
                          </span>
                        </div>
                        <div
                          className={`${eventStatus.color} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                        >
                          {eventStatus.label}
                        </div>
                        {event.featured && (
                          <div className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {event.nama}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {event.deskripsi}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-slate-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(
                              new Date(event.tanggalMulai),
                              "dd MMM yyyy",
                              { locale: idLocale }
                            )}{" "}
                            -{" "}
                            {format(
                              new Date(event.tanggalSelesai),
                              "dd MMM yyyy",
                              { locale: idLocale }
                            )}
                          </span>
                        </div>
                        {(event.jamMulai || event.jamSelesai) && (
                          <div className="flex items-center space-x-2 text-slate-600 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>
                              {event.jamMulai || "00:00"} -{" "}
                              {event.jamSelesai || "23:59"} WIB
                            </span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-slate-600 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{event.lokasi}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
