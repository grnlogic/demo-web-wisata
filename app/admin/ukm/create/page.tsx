"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X, Search, Plus } from "lucide-react";
import { StatusPublish } from "@prisma/client";
import dynamic from "next/dynamic";
import ImageSearchModal from "@/components/ImageSearchModal";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-center">
      <p className="text-slate-500">Memuat peta...</p>
    </div>
  ),
});

export default function CreateUKMPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<
    "logo" | number | null
  >(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState<
    Record<number, boolean>
  >({});

  const [formData, setFormData] = useState({
    namaUsaha: "",
    deskripsi: "",
    kategori: "Kerajinan",
    pemilik: "",
    lokasi: "",
    alamat: "",
    koordinat: "",
    nomorTelepon: "",
    email: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    website: "",
    logo: "",
    hargaRata: "",
    jamOperasional: "",
    status: "DRAFT" as StatusPublish,
    featured: false,
    verified: false,
  });

  const [gambar, setGambar] = useState<string[]>([""]);
  const [produkLayanan, setProdukLayanan] = useState<string[]>([""]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLocationSelect = (data: {
    lat: number;
    lon: number;
    address: string;
    displayName: string;
  }) => {
    setFormData({
      ...formData,
      koordinat: `${data.lat},${data.lon}`,
      lokasi: data.displayName || data.address,
      alamat: data.address || data.displayName,
    });
  };

  const openImageSearch = (field: "logo" | number) => {
    setCurrentImageField(field);
    setShowImageSearch(true);
  };

  const handleImageSelect = (imageUrl: string, alt: string) => {
    if (currentImageField === "logo") {
      setFormData({ ...formData, logo: imageUrl });
    } else if (typeof currentImageField === "number") {
      const updated = [...gambar];
      updated[currentImageField] = imageUrl;
      setGambar(updated);
    }
    setShowImageSearch(false);
  };

  const addGambar = () => {
    setGambar([...gambar, ""]);
  };

  const removeGambar = (index: number) => {
    setGambar(gambar.filter((_, i) => i !== index));
  };

  const updateGambar = (index: number, value: string) => {
    const updated = [...gambar];
    updated[index] = value;
    setGambar(updated);
  };

  const addProdukLayanan = () => {
    setProdukLayanan([...produkLayanan, ""]);
  };

  const removeProdukLayanan = (index: number) => {
    setProdukLayanan(produkLayanan.filter((_, i) => i !== index));
  };

  const updateProdukLayanan = (index: number, value: string) => {
    const updated = [...produkLayanan];
    updated[index] = value;
    setProdukLayanan(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        gambar: gambar.filter((g) => g.trim()),
        produkLayanan: produkLayanan.filter((p) => p.trim()),
      };

      const response = await fetch("/api/admin/ukm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("UKM berhasil dibuat!");
        router.push("/admin/ukm");
      } else {
        const data = await response.json();
        alert(`Gagal membuat UKM: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating UKM:", error);
      alert("Terjadi kesalahan saat membuat UKM");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (
    file: File,
    target: { type: "logo" } | { type: "gallery"; index: number }
  ) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    if (target.type === "logo") {
      setUploadingLogo(true);
    } else {
      setUploadingGallery((prev) => ({ ...prev, [target.index]: true }));
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal mengunggah gambar");
      }

      const data = await res.json();
      if (target.type === "logo") {
        setFormData((prev) => ({ ...prev, logo: data.url }));
      } else {
        setGambar((prev) => {
          const updated = [...prev];
          updated[target.index] = data.url;
          return updated;
        });
      }
    } catch (error: any) {
      alert(error.message || "Gagal mengunggah gambar");
    } finally {
      if (target.type === "logo") {
        setUploadingLogo(false);
      } else {
        setUploadingGallery((prev) => ({ ...prev, [target.index]: false }));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/ukm"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Tambah UKM Baru
            </h1>
            <p className="text-slate-600 mt-1">
              Isi form di bawah untuk menambahkan profil UKM
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Dasar */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Informasi Dasar
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaUsaha"
                value={formData.namaUsaha}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Kerajinan Bambu Pak Budi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pemilik <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pemilik"
                value={formData.pemilik}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Budi Santoso"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Kerajinan">Kerajinan</option>
                <option value="Kuliner">Kuliner</option>
                <option value="Fashion">Fashion</option>
                <option value="Souvenir">Souvenir</option>
                <option value="Jasa Wisata">Jasa Wisata</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Deskripsikan usaha Anda..."
              />
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Logo</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URL Logo
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="url"
                  pattern="https?://.*|/.*"
                  title="Boleh URL penuh atau path /uploads/..."
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/logo.jpg atau /uploads/galeri/logo.jpg"
                />
                <label className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2 cursor-pointer">
                  {uploadingLogo ? "Mengunggah..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUpload(file, { type: "logo" });
                        e.target.value = "";
                      }
                    }}
                    disabled={uploadingLogo}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => openImageSearch("logo")}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Cari
                </button>
              </div>
              {formData.logo && (
                <div className="mt-4">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="w-32 h-32 object-cover rounded-lg border border-slate-300"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Galeri Gambar */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Galeri Gambar
            </h2>
            <button
              type="button"
              onClick={addGambar}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Gambar
            </button>
          </div>
          <div className="space-y-4">
            {gambar.map((img, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  inputMode="url"
                  pattern="https?://.*|/.*"
                  title="Boleh URL penuh atau path /uploads/..."
                  value={img}
                  onChange={(e) => updateGambar(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/gambar.jpg atau /uploads/galeri/file.jpg"
                />
                <label className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2 cursor-pointer">
                  {uploadingGallery[index] ? "Mengunggah..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUpload(file, { type: "gallery", index });
                        e.target.value = "";
                      }
                    }}
                    disabled={uploadingGallery[index]}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => openImageSearch(index)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                {gambar.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGambar(index)}
                    className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {gambar.some((g) => g) && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {gambar
                .filter((g) => g)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gambar ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-slate-300"
                  />
                ))}
            </div>
          )}
        </div>

        {/* Produk & Layanan */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Produk & Layanan
            </h2>
            <button
              type="button"
              onClick={addProdukLayanan}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Item
            </button>
          </div>
          <div className="space-y-4">
            {produkLayanan.map((produk, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={produk}
                  onChange={(e) => updateProdukLayanan(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Tas Anyaman Bambu"
                />
                {produkLayanan.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProdukLayanan(index)}
                    className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lokasi */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Lokasi</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lokasi/Area <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Pangandaran Barat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Alamat lengkap..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pilih Lokasi di Peta
              </label>
              <LocationPicker
                initialLat={
                  formData.koordinat
                    ? parseFloat(formData.koordinat.split(",")[0])
                    : -7.68444
                }
                initialLon={
                  formData.koordinat
                    ? parseFloat(formData.koordinat.split(",")[1])
                    : 108.64917
                }
                onLocationSelect={handleLocationSelect}
              />
              {formData.koordinat && (
                <p className="text-sm text-slate-600 mt-2">
                  Koordinat: {formData.koordinat}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Informasi Kontak
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nomor Telepon <span className="text-slate-400">(Opsional)</span>
              </label>
              <input
                type="tel"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email <span className="text-slate-400">(Opsional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                WhatsApp <span className="text-slate-400">(Opsional)</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Instagram <span className="text-slate-400">(Opsional)</span>
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Facebook <span className="text-slate-400">(Opsional)</span>
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL Facebook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Website <span className="text-slate-400">(Opsional)</span>
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://website.com"
              />
            </div>
          </div>
        </div>

        {/* Informasi Tambahan */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Informasi Tambahan
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Harga Rata-rata
              </label>
              <input
                type="text"
                name="hargaRata"
                value={formData.hargaRata}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Rp 50.000 - Rp 200.000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jam Operasional
              </label>
              <input
                type="text"
                name="jamOperasional"
                value={formData.jamOperasional}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Senin-Sabtu, 08:00-17:00"
              />
            </div>
          </div>
        </div>

        {/* Status & Publikasi */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Status & Publikasi
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status Publikasi
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  Tampilkan di Featured
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  UKM Terverifikasi
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/ukm"
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? "Menyimpan..." : "Simpan UKM"}</span>
          </button>
        </div>
      </form>

      {/* Image Search Modal */}
      {showImageSearch && (
        <ImageSearchModal
          isOpen={showImageSearch}
          onClose={() => setShowImageSearch(false)}
          onSelectImage={handleImageSelect}
        />
      )}
    </div>
  );
}
