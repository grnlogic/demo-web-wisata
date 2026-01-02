"use client";

import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { KategoriDestinasi, StatusPublish } from "@prisma/client";

interface DestinasiImage {
  id: string;
  url: string;
  caption: string | null;
  isPrimary: boolean;
}

interface Destinasi {
  id: string;
  nama: string;
  slug: string;
  kategori: KategoriDestinasi;
  lokasi: string;
  rating: number | null;
  jumlahReview: number | null;
  status: StatusPublish;
  images: DestinasiImage[];
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminDestinasiPage() {
  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchDestinasi = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) params.append("search", search);
      if (kategori) params.append("kategori", kategori);
      if (status) params.append("status", status);

      const response = await fetch(`/api/admin/destinasi?${params}`);
      const data = await response.json();

      if (response.ok) {
        setDestinasi(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch destinasi:", data.error);
      }
    } catch (error) {
      console.error("Error fetching destinasi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinasi();
  }, [pagination.page, search, kategori, status]);

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus destinasi "${nama}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/destinasi/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Destinasi berhasil dihapus!");
        fetchDestinasi();
      } else {
        const data = await response.json();
        alert(`Gagal menghapus destinasi: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting destinasi:", error);
      alert("Terjadi kesalahan saat menghapus destinasi");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPagination({ ...pagination, page: 1 });
  };

  const handleKategoriChange = (value: string) => {
    setKategori(value);
    setPagination({ ...pagination, page: 1 });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPagination({ ...pagination, page: 1 });
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Kelola Destinasi
          </h1>
          <p className="text-slate-600 mt-1">
            Kelola semua destinasi wisata Pangandaran
          </p>
        </div>
        <Link
          href="/admin/destinasi/create"
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Destinasi</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari destinasi..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={kategori}
            onChange={(e) => handleKategoriChange(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            <option value="PANTAI">Pantai</option>
            <option value="CAGAR_ALAM">Cagar Alam</option>
            <option value="GOA">Goa</option>
            <option value="WISATA_BUDAYA">Wisata Budaya</option>
            <option value="WISATA_BAHARI">Wisata Bahari</option>
            <option value="WAHANA_AIR">Wahana Air</option>
            <option value="KAMPUNG_TURIS">Kampung Turis</option>
            <option value="LAINNYA">Lainnya</option>
          </select>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">Memuat data...</p>
          </div>
        ) : destinasi.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-600">Tidak ada destinasi ditemukan</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Nama Destinasi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Lokasi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {destinasi.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {item.images[0] ? (
                            <img
                              src={item.images[0].url}
                              alt={item.nama}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0"></div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-800">
                              {item.nama}
                            </p>
                            <p className="text-sm text-slate-500">
                              {item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                          {getKategoriLabel(item.kategori)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {item.lokasi}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-slate-800">
                            {item.rating?.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-sm text-slate-500">
                            ({item.jumlahReview || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : item.status === "DRAFT"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status === "PUBLISHED"
                            ? "Published"
                            : item.status === "DRAFT"
                            ? "Draft"
                            : "Archived"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Link
                            href={`/destinasi/${item.slug}`}
                            target="_blank"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Lihat"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link
                            href={`/admin/destinasi/edit/${item.id}`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id, item.nama)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Menampilkan {(pagination.page - 1) * pagination.limit + 1} -{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                dari {pagination.total} destinasi
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page - 1 })
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(
                    (pageNum) =>
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      Math.abs(pageNum - pagination.page) <= 1
                  )
                  .map((pageNum, idx, arr) => (
                    <div key={pageNum} className="flex items-center">
                      {idx > 0 && arr[idx - 1] !== pageNum - 1 && (
                        <span className="px-2 text-slate-400">...</span>
                      )}
                      <button
                        onClick={() =>
                          setPagination({ ...pagination, page: pageNum })
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          pagination.page === pageNum
                            ? "bg-blue-600 text-white"
                            : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </div>
                  ))}
                <button
                  onClick={() =>
                    setPagination({ ...pagination, page: pagination.page + 1 })
                  }
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
