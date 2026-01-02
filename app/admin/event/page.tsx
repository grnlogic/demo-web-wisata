"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface Event {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  lokasi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  jamMulai: string | null;
  jamSelesai: string | null;
  gambar: string | null;
  thumbnail: string | null;
  kontakPerson: string | null;
  nomorTelepon: string | null;
  hargaTiket: string | null;
  status: string;
  featured: boolean;
  createdAt: string;
  admin: {
    nama: string;
    username: string;
  };
}

export default function AdminEventPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [search, statusFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/admin/event?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data event");

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Gagal mengambil data event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus event "${nama}"?`)) return;

    try {
      const response = await fetch(`/api/admin/event/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Gagal menghapus event");

      alert("Event berhasil dihapus!");
      fetchEvents();
    } catch (error) {
      alert("Gagal menghapus event");
    }
  };

  const getEventStatus = (tanggalMulai: string, tanggalSelesai: string) => {
    const now = new Date();
    const start = new Date(tanggalMulai);
    const end = new Date(tanggalSelesai);

    if (now < start) {
      return { label: "Akan Datang", color: "bg-blue-100 text-blue-800" };
    } else if (now >= start && now <= end) {
      return {
        label: "Sedang Berlangsung",
        color: "bg-green-100 text-green-800",
      };
    } else {
      return { label: "Selesai", color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Kelola Event & Agenda
          </h1>
          <p className="text-slate-600 mt-1">
            Kelola event dan agenda wisata Pangandaran
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/event/create")}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Event</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari event..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600">Memuat data event...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
            <Calendar className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Belum Ada Event
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Mulai tambahkan event dan agenda wisata untuk ditampilkan di
            website.
          </p>
          <button
            onClick={() => router.push("/admin/event/create")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Event Pertama</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((event) => {
            const eventStatus = getEventStatus(
              event.tanggalMulai,
              event.tanggalSelesai
            );
            return (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-800">
                          {event.nama}
                        </h3>
                        {event.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                            Featured
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            event.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${eventStatus.color}`}
                        >
                          {eventStatus.label}
                        </span>
                      </div>

                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {event.deskripsi}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{event.lokasi}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
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
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>
                              {event.jamMulai || "00:00"} -{" "}
                              {event.jamSelesai || "23:59"}
                            </span>
                          </div>
                        )}
                        {event.hargaTiket && (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Tiket:</span>
                            <span className="font-medium">
                              {event.hargaTiket}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 text-xs text-slate-500">
                        Dibuat oleh {event.admin.nama} •{" "}
                        {format(new Date(event.createdAt), "dd MMM yyyy", {
                          locale: idLocale,
                        })}
                      </div>
                    </div>

                    {event.thumbnail && (
                      <img
                        src={event.thumbnail}
                        alt={event.nama}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
                    <button
                      onClick={() =>
                        router.push(`/admin/event/edit/${event.id}`)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.nama)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Hapus</span>
                    </button>
                    <a
                      href={`/event/${event.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Lihat</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
