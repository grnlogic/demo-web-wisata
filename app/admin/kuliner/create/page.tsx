"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Utensils,
  Image,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  X,
} from "lucide-react";
import LocationPicker from "@/components/LocationPicker";

export default function CreateKulinerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    kategori: "Restoran",
    lokasi: "",
    alamat: "",
    koordinat: "",
    googleMapsUrl: "",
    hargaMin: "",
    hargaMax: "",
    nomorTelepon: "",
    jamBuka: "",
    gambar: [] as string[],
    rating: "0",
    status: "DRAFT",
    featured: false,
  });

  const [gambarInput, setGambarInput] = useState("");

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

  const addGambar = () => {
    if (gambarInput.trim() && !formData.gambar.includes(gambarInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        gambar: [...prev.gambar, gambarInput.trim()],
      }));
      setGambarInput("");
    }
  };

  const removeGambar = (gambarToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      gambar: prev.gambar.filter((img) => img !== gambarToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/kuliner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal membuat kuliner");
      }

      alert("Kuliner berhasil dibuat!");
      router.push("/admin/kuliner");
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat membuat kuliner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tambah Kuliner</h1>
          <p className="text-slate-600 mt-1">Tambahkan tempat kuliner baru</p>
        </div>
        <button
          onClick={() => router.push("/admin/kuliner")}
          className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Informasi Dasar
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nama Kuliner *
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Warung Seafood Pak Joko"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kategori *
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Restoran">Restoran</option>
                  <option value="Warung">Warung</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Makanan Tradisional">
                    Makanan Tradisional
                  </option>
                  <option value="Street Food">Street Food</option>
                  <option value="Bakery">Bakery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Deskripsi *
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsikan tempat kuliner ini..."
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Lokasi
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Lokasi (Area) *
                </label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Pantai Timur, Pusat Kota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Alamat Lengkap *
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Alamat lengkap tempat kuliner"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Koordinat
                </label>
                <input
                  type="text"
                  name="koordinat"
                  value={formData.koordinat}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  placeholder="-7.6845,108.6501"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Terisi otomatis dari peta di bawah
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  placeholder="https://maps.google.com/..."
                />
                <p className="text-xs text-slate-500 mt-1">
                  Terisi otomatis dari peta di bawah
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Picker */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Pilih Lokasi di Peta
          </h2>
          <LocationPicker
            onLocationSelect={(data: {
              lat: number;
              lon: number;
              address: string;
              displayName: string;
            }) => {
              setFormData({
                ...formData,
                alamat: data.address,
                koordinat: `${data.lat}, ${data.lon}`,
                googleMapsUrl: `https://www.google.com/maps?q=${data.lat},${data.lon}`,
              });
            }}
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          {/* Contact & Hours */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Kontak & Jam Operasional
            </h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Phone className="w-4 h-4" />
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="08123456789"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Clock className="w-4 h-4" />
                  Jam Buka
                </label>
                <input
                  type="text"
                  name="jamBuka"
                  value={formData.jamBuka}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 08:00 - 22:00 WIB"
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Range Harga
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Harga Minimum (Rp)
                </label>
                <input
                  type="number"
                  name="hargaMin"
                  value={formData.hargaMin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Harga Maximum (Rp)
                </label>
                <input
                  type="number"
                  name="hargaMax"
                  value={formData.hargaMax}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100000"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Image className="w-5 h-5" />
              Gambar
            </h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={gambarInput}
                  onChange={(e) => setGambarInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL gambar"
                />
                <button
                  type="button"
                  onClick={addGambar}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Tambah
                </button>
              </div>

              {formData.gambar.length > 0 && (
                <div className="space-y-2">
                  {formData.gambar.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                    >
                      <Image className="w-4 h-4 text-slate-400" />
                      <span className="flex-1 text-sm text-slate-700 truncate">
                        {img}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGambar(img)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="4.5"
            />
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
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

            <div className="flex items-center pt-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Tampilkan di Featured
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/kuliner")}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Kuliner"}
          </button>
        </div>
      </form>
    </div>
  );
}
