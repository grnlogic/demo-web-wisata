"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Image, Tag, X, Search, Upload } from "lucide-react";
import ImageSearchModal from "@/components/ImageSearchModal";

export default function CreateBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    ringkasan: "",
    kategori: "Wisata",
    gambarUtama: "",
    tags: [] as string[],
    sourceUrl: "",
    sourceImage: "",
    isExternal: false,
    status: "DRAFT",
    featured: false,
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Gagal mengunggah gambar");
        return;
      }

      setFormData((prev) => ({ ...prev, gambarUtama: data.url }));
    } catch (error) {
      console.error("Error upload berita image:", error);
      alert("Terjadi kesalahan saat mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/berita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal membuat berita");
      }

      alert("Berita berhasil dibuat!");
      router.push("/admin/berita");
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat membuat berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tambah Berita</h1>
          <p className="text-slate-600 mt-1">Buat artikel berita baru</p>
        </div>
        <button
          onClick={() => router.push("/admin/berita")}
          className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Dasar */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Informasi Dasar
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Judul artikel berita"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Wisata">Wisata</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Budaya">Budaya</option>
              <option value="Event">Event</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Tips Wisata">Tips Wisata</option>
              <option value="Berita Lokal">Berita Lokal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ringkasan
            </label>
            <textarea
              name="ringkasan"
              value={formData.ringkasan}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ringkasan singkat berita (opsional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Konten <span className="text-red-500">*</span>
            </label>
            <textarea
              name="konten"
              value={formData.konten}
              onChange={handleChange}
              required
              rows={15}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Tulis konten berita di sini..."
            />
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Media</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL Gambar Utama
            </label>
            <div className="space-y-2">
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="text"
                  inputMode="url"
                  pattern="https?://.*|/.*"
                  title="Boleh URL penuh atau path /uploads/..."
                  name="gambarUtama"
                  value={formData.gambarUtama}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg atau /uploads/galeri/file.jpg"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageSearch(true)}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  Cari Gambar
                </button>
                <label
                  htmlFor="upload-gambar-utama"
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </label>
                <input
                  id="upload-gambar-utama"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
            {uploading && (
              <p className="text-xs text-blue-600 mt-1">Mengunggah gambar...</p>
            )}
            {formData.gambarUtama && (
              <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-300">
                <img
                  src={formData.gambarUtama}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Tags</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tambah Tag
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ketik tag dan tekan Enter"
                />
              </div>
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Source (Optional) */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Sumber (Opsional)
          </h2>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isExternal"
              name="isExternal"
              checked={formData.isExternal}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isExternal"
              className="ml-2 text-sm font-medium text-slate-700"
            >
              Berita dari sumber eksternal
            </label>
          </div>

          {formData.isExternal && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  URL Sumber
                </label>
                <input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://sumber-berita.com/artikel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  URL Gambar Sumber
                </label>
                <input
                  type="url"
                  name="sourceImage"
                  value={formData.sourceImage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://sumber-berita.com/image.jpg"
                />
              </div>
            </>
          )}
        </div>

        {/* Status & Publikasi */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Status & Publikasi
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status Publikasi
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="featured"
              className="ml-2 text-sm font-medium text-slate-700"
            >
              Jadikan Berita Featured
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/admin/berita")}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => setShowImageSearch(false)}
        onSelectImage={(imageUrl) => {
          setFormData((prev) => ({
            ...prev,
            gambarUtama: imageUrl,
          }));
        }}
        initialQuery={formData.judul || "berita pangandaran"}
      />
    </div>
  );
}
