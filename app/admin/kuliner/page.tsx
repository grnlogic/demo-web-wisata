"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Utensils,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Star,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

interface Kuliner {
  id: string;
  nama: string;
  slug: string;
  kategori: string;
  lokasi: string;
  alamat: string;
  hargaMin?: number;
  hargaMax?: number;
  rating?: number;
  status: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminKulinerPage() {
  const router = useRouter();
  const [kuliner, setKuliner] = useState<Kuliner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchKuliner();
  }, [search, kategoriFilter, statusFilter]);

  const fetchKuliner = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (kategoriFilter) params.append("kategori", kategoriFilter);
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/admin/kuliner?${params}`);
      if (!response.ok) throw new Error("Gagal mengambil data kuliner");

      const data = await response.json();
      setKuliner(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus kuliner "${nama}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/kuliner/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Gagal menghapus kuliner");

      alert("Kuliner berhasil dihapus!");
      fetchKuliner();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const formatPrice = (min?: number, max?: number) => {
    if (!min && !max) return "-";
    if (min && max)
      return `Rp ${min.toLocaleString()} - Rp ${max.toLocaleString()}`;
    if (min) return `Mulai Rp ${min.toLocaleString()}`;
    return `Hingga Rp ${max?.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kelola Kuliner</h1>
          <p className="text-slate-600 mt-1">
            Kelola informasi kuliner dan restoran
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/kuliner/create")}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Kuliner</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kuliner..."
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
            <option value="Restoran">Restoran</option>
            <option value="Warung">Warung</option>
            <option value="Cafe">Cafe</option>
            <option value="Seafood">Seafood</option>
            <option value="Makanan Tradisional">Makanan Tradisional</option>
            <option value="Street Food">Street Food</option>
            <option value="Bakery">Bakery</option>
          </select>
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

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
        </div>
      ) : kuliner.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
            <Utensils className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Belum Ada Kuliner
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Mulai tambahkan informasi kuliner dan restoran di Pangandaran.
          </p>
          <button
            onClick={() => router.push("/admin/kuliner/create")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Kuliner Pertama</span>
          </button>
        </div>
      ) : (
        /* Kuliner List */
        <div className="grid gap-6">
          {kuliner.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {item.nama}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {item.kategori}
                        </span>
                        {item.featured && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            item.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status === "PUBLISHED" ? (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              Published
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <EyeOff className="w-3 h-3" />
                              Draft
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{item.lokasi}</span>
                    </div>
                    {(item.hargaMin || item.hargaMax) && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">
                          {formatPrice(item.hargaMin, item.hargaMax)}
                        </span>
                      </div>
                    )}
                    {item.rating && item.rating > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2">
                    {item.alamat}
                  </p>

                  <p className="text-xs text-slate-500">
                    Dibuat:{" "}
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/kuliner/edit/${item.id}`)
                    }
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.nama)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
