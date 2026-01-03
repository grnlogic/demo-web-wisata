"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
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
  }, [search, statusFilter, events]);

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

    if (statusFilter) {
      filtered = filtered.filter((event) => {
        const { label } = getEventStatus(
          event.tanggalMulai,
          event.tanggalSelesai
        );
        return label === statusFilter;
      });
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
    <>
      <div className="relative min-h-screen bg-slate-950 text-slate-50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-64 w-64 bg-purple-500/25 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 bg-pink-500/20 blur-[120px]" />
          <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 bg-indigo-400/15 blur-[120px]" />
        </div>

        {/* Header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm shadow-lg backdrop-blur">
                  <Sparkles className="w-4 h-4" />
                  <span>Agenda hidup Pangandaran</span>
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                    Event yang terasa, bukan sekadar poster.
                  </h1>
                  <p className="text-lg text-white/80 max-w-2xl">
                    Musik pantai, festival kuliner, sunrise run, hingga ritual
                    lokal. Pilih tanggal, lihat status, dan tandai kalendermu.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-white/75">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                    <Calendar className="w-4 h-4 text-amber-200" /> Jadwal
                    real-time
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                    <Clock className="w-4 h-4 text-cyan-200" /> Jam & status
                    jelas
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                    <MapPin className="w-4 h-4 text-emerald-200" /> Koordinat
                    siap pakai
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-purple-300/20 via-pink-200/15 to-indigo-200/10 blur-3xl" />
                <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Filter cepat</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                      Live search
                    </span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        placeholder="Cari konser pantai, festival kuliner, atau lari pagi..."
                        className="w-full rounded-2xl border border-white/10 bg-white/10 px-12 py-3 text-sm text-white placeholder:text-white/50 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300/40"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["", "Akan Datang", "Sedang Berlangsung", "Selesai"].map(
                        (status) => {
                          const active = statusFilter === status;
                          return (
                            <button
                              key={status || "Semua"}
                              onClick={() => setStatusFilter(status)}
                              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                active
                                  ? "border-purple-300 bg-purple-300/20 text-purple-50 shadow-lg shadow-purple-400/25"
                                  : "border-white/10 bg-white/5 text-white/80 hover:border-purple-200 hover:text-white"
                              }`}
                            >
                              {status || "Semua status"}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search sticky */}
        <section className="sticky top-16 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Cari event..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-12 py-3 text-sm text-white placeholder:text-white/50 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300/40"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                {["", "Akan Datang", "Sedang Berlangsung", "Selesai"].map(
                  (status) => {
                    const active = statusFilter === status;
                    return (
                      <button
                        key={status || "Semua"}
                        onClick={() => setStatusFilter(status)}
                        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? "bg-purple-400 text-slate-950 shadow-lg shadow-purple-400/40"
                            : "bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {status || "Semua status"}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-16 text-white/75">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-purple-300" />
                Memuat event...
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-16 text-white/75">
                <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Tidak ada event</h3>
                <p className="text-sm text-white/60">
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
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition hover:-translate-y-2 hover:border-purple-200/40"
                    >
                      <div
                        className="relative h-64"
                        style={
                          event.thumbnail || event.gambar
                            ? {
                                backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.7) 70%), url(${
                                  event.thumbnail || event.gambar
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }
                            : {
                                backgroundImage:
                                  "linear-gradient(135deg, #a855f7, #ec4899)",
                              }
                        }
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/70" />
                        <div className="absolute top-3 right-3 space-y-2 text-xs font-semibold">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-slate-900 shadow">
                            {format(
                              new Date(event.tanggalMulai),
                              "dd MMM yyyy",
                              {
                                locale: idLocale,
                              }
                            )}
                          </span>
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-white shadow ${eventStatus.color} bg-opacity-90`}
                          >
                            {eventStatus.label}
                          </span>
                          {event.featured && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-300 text-slate-900 px-3 py-1 shadow">
                              Highlight
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-2xl font-semibold text-white group-hover:text-purple-100 transition line-clamp-2">
                          {event.nama}
                        </h3>
                        <p className="text-sm text-white/75 leading-relaxed line-clamp-2">
                          {event.deskripsi}
                        </p>

                        <div className="space-y-2 text-sm text-white/75">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(
                                new Date(event.tanggalMulai),
                                "dd MMM yyyy",
                                {
                                  locale: idLocale,
                                }
                              )}
                              {" – "}
                              {format(
                                new Date(event.tanggalSelesai),
                                "dd MMM yyyy",
                                {
                                  locale: idLocale,
                                }
                              )}
                            </span>
                          </div>
                          {(event.jamMulai || event.jamSelesai) && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                {event.jamMulai || "00:00"} –{" "}
                                {event.jamSelesai || "23:59"} WIB
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{event.lokasi}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 text-sm font-semibold text-purple-100">
                          <span className="text-white/65">Lihat detail</span>
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
    </>
  );
}
