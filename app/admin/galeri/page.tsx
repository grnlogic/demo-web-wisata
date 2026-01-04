"use client";

import {
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  X,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { KategoriGaleri, TipeMedia } from "@prisma/client";
import ImageSearchModal from "@/components/ImageSearchModal";

interface Galeri {
  id: string;
  judul: string;
  deskripsi: string | null;
  url: string;
  thumbnail: string | null;
  kategori: KategoriGaleri;
  tags: string[];
  tipeMedia: TipeMedia;
  featured: boolean;
  createdAt: string;
  admin: {
    nama: string;
  };
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminGaleriPage() {
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [tipeMedia, setTipeMedia] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    url: "",
    kategori: "PANTAI" as KategoriGaleri,
    tags: "",
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  const fetchGaleri = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) params.append("search", search);
      if (kategori) params.append("kategori", kategori);
      if (tipeMedia) params.append("tipeMedia", tipeMedia);

      const response = await fetch(`/api/admin/galeri?${params}`);
      const data = await response.json();

      if (response.ok) {
        setGaleri(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Failed to fetch galeri:", data.error);
      }
    } catch (error) {
      console.error("Error fetching galeri:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, [pagination.page, search, kategori, tipeMedia]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPagination({ ...pagination, page: 1 });
  };

  const handleKategoriChange = (value: string) => {
    setKategori(value);
    setPagination({ ...pagination, page: 1 });
  };

  const handleTipeMediaChange = (value: string) => {
    setTipeMedia(value);
    setPagination({ ...pagination, page: 1 });
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${judul}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/galeri/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Galeri berhasil dihapus!");
        fetchGaleri();
      } else {
        const data = await response.json();
        alert(`Gagal menghapus galeri: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting galeri:", error);
      alert("Terjadi kesalahan saat menghapus galeri");
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData({ ...formData, url: imageUrl });
    setPreviewUrl(imageUrl);
    setShowImageSearch(false);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Hanya file JPG, PNG, dan WebP yang diperbolehkan");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("Ukuran file maksimal 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload immediately
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({ ...formData, url: data.url });
        } else {
          const data = await response.json();
          alert(`Gagal upload file: ${data.error}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Terjadi kesalahan saat upload file");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        const data = await response.json();
        alert(`Gagal upload file: ${data.error}`);
        return null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Terjadi kesalahan saat upload file");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate URL is present
      if (!formData.url) {
        alert("URL gambar wajib diisi atau file harus diupload");
        setSaving(false);
        return;
      }

      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      const response = await fetch("/api/admin/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: formData.judul,
          deskripsi: formData.deskripsi,
          url: formData.url,
          kategori: formData.kategori,
          tags: tagsArray,
          featured: formData.featured,
        }),
      });

      if (response.ok) {
        alert("Galeri berhasil ditambahkan!");
        setShowAddModal(false);
        setFormData({
          judul: "",
          deskripsi: "",
          url: "",
          kategori: "PANTAI",
          tags: "",
          featured: false,
        });
        setSelectedFile(null);
        setPreviewUrl("");
        setUploadMethod("url");
        fetchGaleri();
      } else {
        const data = await response.json();
        alert(`Gagal menambahkan galeri: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding galeri:", error);
      alert("Terjadi kesalahan saat menambahkan galeri");
    } finally {
      setSaving(false);
    }
  };

  const getKategoriLabel = (kat: KategoriGaleri) => {
    const labels: Record<KategoriGaleri, string> = {
      PANTAI: "Pantai",
      KULINER: "Kuliner",
      BUDAYA: "Budaya",
      WAHANA: "Wahana",
      EVENT: "Event",
      SUNSET: "Sunset",
      SUNRISE: "Sunrise",
      UNDERWATER: "Underwater",
      LAINNYA: "Lainnya",
    };
    return labels[kat] || kat;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kelola Galeri</h1>
          <p className="text-slate-600 mt-1">
            Kelola foto dan video galeri wisata
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari media..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={tipeMedia}
            onChange={(e) => handleTipeMediaChange(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Tipe</option>
            <option value="IMAGE">Foto</option>
            <option value="VIDEO">Video</option>
          </select>
          <select
            value={kategori}
            onChange={(e) => handleKategoriChange(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            <option value="PANTAI">Pantai</option>
            <option value="KULINER">Kuliner</option>
            <option value="BUDAYA">Budaya</option>
            <option value="WAHANA">Wahana</option>
            <option value="EVENT">Event</option>
            <option value="SUNSET">Sunset</option>
            <option value="SUNRISE">Sunrise</option>
            <option value="UNDERWATER">Underwater</option>
            <option value="LAINNYA">Lainnya</option>
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">Memuat data...</p>
          </div>
        ) : galeri.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Belum Ada Media
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Mulai upload foto untuk galeri website.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Upload Media Pertama</span>
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galeri.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {item.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Featured
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(item.id, item.judul)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">
                      {item.judul}
                    </h3>
                    {item.deskripsi && (
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                        {item.deskripsi}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {getKategoriLabel(item.kategori)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Menampilkan {(pagination.page - 1) * pagination.limit + 1} -{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                dari {pagination.total} media
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Tambah Media Baru
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Upload Method Tabs */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Metode Upload *
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMethod("url");
                      setSelectedFile(null);
                      setPreviewUrl(formData.url);
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      uploadMethod === "url"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    📎 URL / Pinterest
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMethod("file");
                      setFormData({ ...formData, url: "" });
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      uploadMethod === "file"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    📁 Upload File
                  </button>
                </div>

                {/* URL Method */}
                {uploadMethod === "url" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      inputMode="url"
                      pattern="https?://.*|/.*"
                      title="Boleh URL penuh atau path lokal seperti /uploads/galeri/..."
                      value={formData.url}
                      onChange={(e) => {
                        setFormData({ ...formData, url: e.target.value });
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="https://example.com/image.jpg atau /uploads/galeri/file.jpg"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowImageSearch(true)}
                      className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                    >
                      🔍 Cari Gambar dari Pinterest
                    </button>
                  </div>
                )}

                {/* File Method */}
                {uploadMethod === "file" && (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-slate-500">
                      Format: JPG, PNG, WebP. Maksimal 5MB.
                    </p>
                    {uploading && (
                      <p className="text-sm text-blue-600 font-medium">
                        ⏳ Mengupload file...
                      </p>
                    )}
                    {formData.url && uploadMethod === "file" && (
                      <p className="text-sm text-green-600 font-medium">
                        ✅ File berhasil diupload: {formData.url}
                      </p>
                    )}
                  </div>
                )}

                {/* Image Preview */}
                {previewUrl && (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border border-slate-200"
                    />
                  </div>
                )}
              </div>

              {/* Judul */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Judul *
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  placeholder="Judul media"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  placeholder="Deskripsi singkat"
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kategori *
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kategori: e.target.value as KategoriGaleri,
                    })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="PANTAI">Pantai</option>
                  <option value="KULINER">Kuliner</option>
                  <option value="BUDAYA">Budaya</option>
                  <option value="WAHANA">Wahana</option>
                  <option value="EVENT">Event</option>
                  <option value="SUNSET">Sunset</option>
                  <option value="SUNRISE">Sunrise</option>
                  <option value="UNDERWATER">Underwater</option>
                  <option value="LAINNYA">Lainnya</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tags (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="wisata, pantai, sunset"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium text-slate-700"
                >
                  Tampilkan sebagai featured
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {uploading
                    ? "Mengupload..."
                    : saving
                    ? "Menyimpan..."
                    : "Simpan Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => setShowImageSearch(false)}
        onSelectImage={handleImageSelect}
      />
    </div>
  );
}
