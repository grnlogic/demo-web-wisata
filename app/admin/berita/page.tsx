"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Newspaper,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface Berita {
  id: string;
  judul: string;
  slug: string;
  konten: string;
  ringkasan: string | null;
  kategori: string;
  gambarUtama: string | null;
  tags: string[];
  sourceUrl: string | null;
  sourceImage: string | null;
  isExternal: boolean;
  views: number;
  status: string;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  admin: {
    nama: string;
    username: string;
  };
}

export default function AdminBeritaPage() {
  const router = useRouter();
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchBerita();
  }, [search, kategoriFilter, statusFilter]);

  const fetchBerita = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (kategoriFilter) params.append("kategori", kategoriFilter);
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/admin/berita?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data berita");

      const data = await response.json();
      setBerita(data);
    } catch (error) {
      console.error("Error fetching berita:", error);
      alert("Gagal mengambil data berita");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berita "${judul}"?`))
      return;

    try {
      const response = await fetch(`/api/admin/berita/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Gagal menghapus berita");

      alert("Berita berhasil dihapus!");
      fetchBerita();
    } catch (error) {
      alert("Gagal menghapus berita");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kelola Berita</h1>
          <p className="text-slate-600 mt-1">
            Kelola artikel dan berita wisata Pangandaran
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/berita/create")}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Berita</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            <option value="Wisata">Wisata</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Budaya">Budaya</option>
            <option value="Event">Event</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Tips Wisata">Tips Wisata</option>
            <option value="Berita Lokal">Berita Lokal</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Berita List */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600">Memuat data berita...</p>
        </div>
      ) : berita.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
            <Newspaper className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Belum Ada Berita
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Mulai tambahkan berita dan artikel wisata untuk ditampilkan di
            website.
          </p>
          <button
            onClick={() => router.push("/admin/berita/create")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Berita Pertama</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {berita.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {item.gambarUtama && (
                    <img
                      src={item.gambarUtama}
                      alt={item.judul}
                      className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-800">
                        {item.judul}
                      </h3>
                      {item.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          item.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {item.kategori}
                      </span>
                      {item.isExternal && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                          External
                        </span>
                      )}
                    </div>

                    {item.ringkasan && (
                      <p className="text-slate-600 mb-3 line-clamp-2">
                        {item.ringkasan}
                      </p>
                    )}

                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views} views
                      </span>
                      <span>•</span>
                      <span>
                        {item.publishedAt
                          ? format(new Date(item.publishedAt), "dd MMM yyyy", {
                              locale: idLocale,
                            })
                          : format(new Date(item.createdAt), "dd MMM yyyy", {
                              locale: idLocale,
                            })}
                      </span>
                      <span>•</span>
                      <span>oleh {item.admin.nama}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => router.push(`/admin/berita/edit/${item.id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.judul)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                  <a
                    href={`/berita/${item.slug}`}
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
          ))}
        </div>
      )}
    </div>
  );
}
