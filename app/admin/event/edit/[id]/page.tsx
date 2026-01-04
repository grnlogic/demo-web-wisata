"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Calendar, Clock, MapPin, X, Search, Upload } from "lucide-react";
import LocationPicker from "@/components/LocationPicker";
import ImageSearchModal from "@/components/ImageSearchModal";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<
    "gambar" | "thumbnail" | null
  >(null);
  const [uploadingField, setUploadingField] = useState<
    "gambar" | "thumbnail" | null
  >(null);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    lokasi: "",
    alamat: "",
    koordinat: "",
    googleMapsUrl: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    jamMulai: "",
    jamSelesai: "",
    gambar: "",
    thumbnail: "",
    kontakPerson: "",
    nomorTelepon: "",
    hargaTiket: "",
    status: "DRAFT",
    featured: false,
  });

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/admin/event/${eventId}`);
      if (!response.ok) throw new Error("Gagal mengambil data event");

      const event = await response.json();

      // Format dates for input
      const tanggalMulai = new Date(event.tanggalMulai)
        .toISOString()
        .split("T")[0];
      const tanggalSelesai = new Date(event.tanggalSelesai)
        .toISOString()
        .split("T")[0];

      setFormData({
        nama: event.nama,
        deskripsi: event.deskripsi,
        lokasi: event.lokasi,
        alamat: event.alamat || "",
        koordinat: event.koordinat || "",
        googleMapsUrl: event.googleMapsUrl || "",
        tanggalMulai,
        tanggalSelesai,
        jamMulai: event.jamMulai || "",
        jamSelesai: event.jamSelesai || "",
        gambar: event.gambar || "",
        thumbnail: event.thumbnail || "",
        kontakPerson: event.kontakPerson || "",
        nomorTelepon: event.nomorTelepon || "",
        hargaTiket: event.hargaTiket || "",
        status: event.status,
        featured: event.featured,
      });
    } catch (error) {
      alert("Gagal mengambil data event");
      router.push("/admin/event");
    } finally {
      setFetching(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal mengupdate event");
      }

      alert("Event berhasil diupdate!");
      router.push("/admin/event");
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat mengupdate event");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (field: "gambar" | "thumbnail", file: File) => {
    setUploadingField(field);
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

      setFormData((prev) => ({ ...prev, [field]: data.url }));
    } catch (error) {
      console.error("Error upload event image:", error);
      alert("Terjadi kesalahan saat mengunggah gambar");
    } finally {
      setUploadingField(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus event ini?")) return;

    try {
      const response = await fetch(`/api/admin/event/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Gagal menghapus event");

      alert("Event berhasil dihapus!");
      router.push("/admin/event");
    } catch (error) {
      alert("Gagal menghapus event");
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Memuat data event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Edit Event</h1>
          <p className="text-slate-600 mt-1">
            Perbarui informasi event atau agenda
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/event")}
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
              Nama Event <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Festival Pantai Pangandaran 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jelaskan detail event..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nama Lokasi Singkat <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Pantai Barat Pangandaran"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Pilih Lokasi di Peta
            </label>
            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <LocationPicker
                initialLat={
                  formData.koordinat
                    ? parseFloat(formData.koordinat.split(",")[0])
                    : undefined
                }
                initialLon={
                  formData.koordinat
                    ? parseFloat(formData.koordinat.split(",")[1])
                    : undefined
                }
                onLocationSelect={(data) => {
                  setFormData((prev) => ({
                    ...prev,
                    alamat: data.displayName,
                    koordinat: `${data.lat},${data.lon}`,
                    googleMapsUrl: `https://www.google.com/maps?q=${data.lat},${data.lon}`,
                  }));
                }}
              />
            </div>
            {formData.koordinat && (
              <p className="text-sm text-slate-600 mt-2">
                📍 Koordinat: {formData.koordinat}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Alamat lengkap lokasi event..."
            />
          </div>
        </div>

        {/* Waktu Pelaksanaan */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Waktu Pelaksanaan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tanggal Mulai <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  name="tanggalMulai"
                  value={formData.tanggalMulai}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tanggal Selesai <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  name="tanggalSelesai"
                  value={formData.tanggalSelesai}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jam Mulai
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="time"
                  name="jamMulai"
                  value={formData.jamMulai}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jam Selesai
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="time"
                  name="jamSelesai"
                  value={formData.jamSelesai}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media & Gambar */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Media & Gambar
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL Gambar Utama
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="gambar"
                value={formData.gambar}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <label
                htmlFor="upload-gambar"
                className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                Upload
              </label>
              <input
                id="upload-gambar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload("gambar", file);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setCurrentImageField("gambar");
                  setShowImageSearch(true);
                }}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Cari Gambar
              </button>
            </div>
            {uploadingField === "gambar" && (
              <p className="text-xs text-blue-600 mt-1">Mengunggah gambar...</p>
            )}
            {formData.gambar && (
              <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-300">
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL Thumbnail
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/thumbnail.jpg"
              />
              <label
                htmlFor="upload-thumbnail"
                className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                Upload
              </label>
              <input
                id="upload-thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload("thumbnail", file);
                  e.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setCurrentImageField("thumbnail");
                  setShowImageSearch(true);
                }}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Cari Gambar
              </button>
            </div>
            {uploadingField === "thumbnail" && (
              <p className="text-xs text-blue-600 mt-1">
                Mengunggah thumbnail...
              </p>
            )}
            {formData.thumbnail && (
              <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-300">
                <img
                  src={formData.thumbnail}
                  alt="Preview Thumbnail"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Kontak & Tiket */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Kontak & Informasi Tiket
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kontak Person
              </label>
              <input
                type="text"
                name="kontakPerson"
                value={formData.kontakPerson}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nama kontak person"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Harga Tiket
            </label>
            <textarea
              name="hargaTiket"
              value={formData.hargaTiket}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Gratis / Rp 50.000 / Tiket VIP: Rp 100.000"
            />
          </div>
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
              Jadikan Event Featured
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            disabled={loading}
          >
            Hapus Event
          </button>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/event")}
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
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => {
          setShowImageSearch(false);
          setCurrentImageField(null);
        }}
        onSelectImage={(imageUrl) => {
          if (currentImageField) {
            setFormData((prev) => ({
              ...prev,
              [currentImageField]: imageUrl,
            }));
          }
        }}
        initialQuery={formData.nama || "event pangandaran"}
      />
    </div>
  );
}
