"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

interface UKM {
  id: string;
  namaUsaha: string;
  slug: string;
  deskripsi: string;
  kategori: string;
  pemilik: string;
  lokasi: string;
  nomorTelepon?: string;
  email?: string;
  logo?: string;
  status: string;
  featured: boolean;
  verified: boolean;
  createdAt: string;
  admin: {
    nama: string;
    username: string;
  };
}

export default function AdminUKMPage() {
  const [ukms, setUkms] = useState<UKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchUKMs();
  }, [search, kategori, status]);

  const fetchUKMs = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (kategori) params.append("kategori", kategori);
      if (status) params.append("status", status);

      const response = await fetch(`/api/admin/ukm?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setUkms(data);
      } else {
        console.error("Failed to fetch UKMs");
      }
    } catch (error) {
      console.error("Error fetching UKMs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, namaUsaha: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus UKM "${namaUsaha}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/ukm/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("UKM berhasil dihapus!");
        fetchUKMs();
      } else {
        alert("Gagal menghapus UKM");
      }
    } catch (error) {
      console.error("Error deleting UKM:", error);
      alert("Terjadi kesalahan saat menghapus UKM");
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      PUBLISHED: "bg-green-100 text-green-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
      ARCHIVED: "bg-slate-100 text-slate-800",
    };
    return badges[status as keyof typeof badges] || badges.DRAFT;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kelola UKM</h1>
          <p className="text-slate-600 mt-1">
            Kelola profil UKM dan produk lokal
          </p>
        </div>
        <Link
          href="/admin/ukm/create"
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah UKM</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari UKM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            <option value="Kerajinan">Kerajinan</option>
            <option value="Kuliner">Kuliner</option>
            <option value="Fashion">Fashion</option>
            <option value="Souvenir">Souvenir</option>
            <option value="Jasa Wisata">Jasa Wisata</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat data UKM...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && ukms.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
            <Store className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Belum Ada UKM
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Mulai tambahkan profil UKM dan produk lokal untuk ditampilkan di
            website.
          </p>
          <Link
            href="/admin/ukm/create"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah UKM Pertama</span>
          </Link>
        </div>
      )}

      {/* UKM List */}
      {!loading && ukms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ukms.map((ukm) => (
            <div
              key={ukm.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Logo/Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                {ukm.logo ? (
                  <img
                    src={ukm.logo}
                    alt={ukm.namaUsaha}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Store className="w-20 h-20 text-white opacity-50" />
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {ukm.featured && (
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  {ukm.verified && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1">
                      {ukm.namaUsaha}
                    </h3>
                    <p className="text-sm text-slate-500">{ukm.pemilik}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      ukm.status
                    )}`}
                  >
                    {ukm.status}
                  </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {ukm.deskripsi}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Store className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="font-medium">{ukm.kategori}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="line-clamp-1">{ukm.lokasi}</span>
                  </div>
                  {ukm.nomorTelepon && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{ukm.nomorTelepon}</span>
                    </div>
                  )}
                  {ukm.email && (
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" />
                      <span className="line-clamp-1">{ukm.email}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <Link
                    href={`/admin/ukm/edit/${ukm.id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(ukm.id, ukm.namaUsaha)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && ukms.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{ukms.length}</p>
              <p className="text-sm text-slate-600 mt-1">Total UKM</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {ukms.filter((u) => u.status === "PUBLISHED").length}
              </p>
              <p className="text-sm text-slate-600 mt-1">Published</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {ukms.filter((u) => u.featured).length}
              </p>
              <p className="text-sm text-slate-600 mt-1">Featured</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {ukms.filter((u) => u.verified).length}
              </p>
              <p className="text-sm text-slate-600 mt-1">Verified</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
