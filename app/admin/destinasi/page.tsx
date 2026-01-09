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
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Kelola Destinasi
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Kelola semua destinasi wisata Pangandaran
          </p>
        </div>
        <Link
          href="/admin/destinasi/create"
          className="inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Tambah Destinasi</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari destinasi..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={kategori}
              onChange={(e) => handleKategoriChange(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-sm sm:text-base text-slate-600">
              Memuat data...
            </p>
          </div>
        ) : destinasi.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <p className="text-sm sm:text-base text-slate-600">
              Tidak ada destinasi ditemukan
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50\">
                    {" "}
                    <tr>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Nama Destinasi
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Kategori
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Lokasi
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Rating
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-slate-700 whitespace-nowrap">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {destinasi.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            {item.images[0] ? (
                              <img
                                src={item.images[0].url}
                                alt={item.nama}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0"></div>
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 text-xs sm:text-sm truncate">
                                {item.nama}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-500 truncate">
                                {item.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                            {getKategoriLabel(item.kategori)}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600 text-xs sm:text-sm">
                          {item.lokasi}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                              {item.rating?.toFixed(1) || "0.0"}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({item.jumlahReview || 0})
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span
                            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
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
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                            <Link
                              href={`/destinasi/${item.slug}`}
                              target="_blank"
                              className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Lihat"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link
                              href={`/admin/destinasi/edit/${item.id}`}
                              className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id, item.nama)}
                              className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-600">
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
                  className="px-3 sm:px-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
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
                        <span className="px-1 sm:px-2 text-slate-400 text-xs sm:text-sm">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() =>
                          setPagination({ ...pagination, page: pageNum })
                        }
                        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
                  className="px-3 sm:px-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
