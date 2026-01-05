"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, X, Search } from "lucide-react";
import { KategoriDestinasi, StatusPublish, JenisDetail } from "@prisma/client";
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

export default function CreateDestinasiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [uploadingImageIndex, setUploadingImageIndex] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState({
    nama: "",
    slug: "",
    deskripsi: "",
    kategori: "PANTAI" as KategoriDestinasi,
    lokasi: "",
    alamat: "",
    koordinat: "",
    googleMapsUrl: "",
    rating: "",
    jumlahReview: "",
    metaTitle: "",
    metaDescription: "",
    status: "DRAFT" as StatusPublish,
    featured: false,
  });

  const [images, setImages] = useState<
    Array<{ url: string; caption: string; isPrimary: boolean }>
  >([{ url: "", caption: "", isPrimary: true }]);

  const [harga, setHarga] = useState<
    Array<{ jenisHarga: string; harga: string; keterangan: string }>
  >([{ jenisHarga: "", harga: "", keterangan: "" }]);

  const [fasilitas, setFasilitas] = useState<
    Array<{ jenis: JenisDetail; judul: string; konten: string }>
  >([{ jenis: "FASILITAS" as JenisDetail, judul: "", konten: "" }]);

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

      // Auto-generate slug from nama
      if (name === "nama") {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        setFormData((prev) => ({ ...prev, slug }));
      }
    }
  };

  const addImage = () => {
    setImages([...images, { url: "", caption: "", isPrimary: false }]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [field]: value };
    setImages(updated);
  };

  const openImageSearch = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageSearch(true);
  };

  const handleImageUpload = async (index: number, file: File) => {
    setUploadingImageIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Gagal mengunggah gambar");
        return;
      }

      updateImage(index, "url", data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Terjadi kesalahan saat mengunggah gambar");
    } finally {
      setUploadingImageIndex(null);
    }
  };

  const handleImageSelect = (imageUrl: string, alt: string) => {
    if (currentImageIndex !== null) {
      const updated = [...images];
      updated[currentImageIndex] = {
        ...updated[currentImageIndex],
        url: imageUrl,
        caption: alt,
      };
      setImages(updated);
      setShowImageSearch(false);
    }
  };

  const addHarga = () => {
    setHarga([...harga, { jenisHarga: "", harga: "", keterangan: "" }]);
  };

  const removeHarga = (index: number) => {
    setHarga(harga.filter((_, i) => i !== index));
  };

  const updateHarga = (index: number, field: string, value: string) => {
    const updated = [...harga];
    updated[index] = { ...updated[index], [field]: value };
    setHarga(updated);
  };

  const addFasilitas = () => {
    setFasilitas([...fasilitas, { jenis: "FASILITAS", judul: "", konten: "" }]);
  };

  const removeFasilitas = (index: number) => {
    setFasilitas(fasilitas.filter((_, i) => i !== index));
  };

  const updateFasilitas = (index: number, field: string, value: string) => {
    const updated = [...fasilitas];
    updated[index] = { ...updated[index], [field]: value };
    setFasilitas(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        images: images.filter((img) => img.url),
        harga: harga.filter((h) => h.jenisHarga && h.harga),
        fasilitas: fasilitas.filter((f) => f.judul && f.konten),
      };

      const response = await fetch("/api/admin/destinasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Destinasi berhasil dibuat!");
        router.push("/admin/destinasi");
      } else {
        const data = await response.json();
        alert(`Gagal membuat destinasi: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating destinasi:", error);
      alert("Terjadi kesalahan saat membuat destinasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/destinasi"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Tambah Destinasi Baru
            </h1>
            <p className="text-slate-600 mt-1">
              Isi form di bawah untuk menambahkan destinasi wisata
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Informasi Dasar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Destinasi *
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kategori *
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PANTAI">Pantai</option>
                <option value="CAGAR_ALAM">Cagar Alam</option>
                <option value="GOA">Goa</option>
                <option value="WISATA_BUDAYA">Wisata Budaya</option>
                <option value="WISATA_BAHARI">Wisata Bahari</option>
                <option value="WAHANA_AIR">Wahana Air</option>
                <option value="KAMPUNG_TURIS">Kampung Turis</option>
                <option value="LAINNYA">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lokasi *
              </label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleInputChange}
                required
                placeholder="Contoh: Pantai Barat, Cijulang"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Alamat Lengkap *
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={handleInputChange}
                placeholder="Contoh: -7.684444, 108.645556"
                disabled
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
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
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
              <p className="text-xs text-slate-500 mt-1">
                Terisi otomatis dari peta di bawah
              </p>
            </div>
          </div>
        </div>

        {/* Location Picker */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-800">
            Pilih Lokasi di Peta
          </h2>
          <LocationPicker
            onLocationSelect={(data) => {
              setFormData((prev) => ({
                ...prev,
                alamat: data.address,
                koordinat: `${data.lat}, ${data.lon}`,
                googleMapsUrl: `https://www.google.com/maps?q=${data.lat},${data.lon}`,
              }));
            }}
          />
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Rating & Review</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="5"
                placeholder="0.0 - 5.0"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jumlah Review
              </label>
              <input
                type="number"
                name="jumlahReview"
                value={formData.jumlahReview}
                onChange={handleInputChange}
                min="0"
                placeholder="0"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Deskripsi</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Gambar</h2>
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              + Tambah Gambar
            </button>
          </div>

          {images.map((image, index) => (
            <div
              key={index}
              className="border border-slate-300 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-800">
                  Gambar {index + 1}
                </h3>
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL Gambar
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={image.url}
                      onChange={(e) =>
                        updateImage(index, "url", e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label
                        htmlFor={`upload-${index}`}
                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                      >
                        Upload
                      </label>
                      <input
                        id={`upload-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(index, file);
                          }
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => openImageSearch(index)}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Search className="w-4 h-4" />
                        Cari Gambar
                      </button>
                    </div>
                  </div>
                  {uploadingImageIndex === index && (
                    <p className="text-xs text-blue-600 mt-1">
                      Mengunggah gambar...
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    Atau klik "Cari Gambar" untuk mencari gambar gratis dari
                    Pexels
                  </p>
                  {image.url && (
                    <div className="mt-3">
                      <img
                        src={image.url}
                        alt={image.caption || `Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-slate-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f1f5f9' width='400' height='300'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EGambar tidak dapat dimuat%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={image.caption}
                    onChange={(e) =>
                      updateImage(index, "caption", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 mt-7">
                    <input
                      type="checkbox"
                      checked={image.isPrimary}
                      onChange={(e) =>
                        updateImage(index, "isPrimary", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Gambar Utama
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Harga */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Harga</h2>
            <button
              type="button"
              onClick={addHarga}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              + Tambah Harga
            </button>
          </div>

          {harga.map((h, index) => (
            <div
              key={index}
              className="border border-slate-300 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-800">
                  Harga {index + 1}
                </h3>
                {harga.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHarga(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Jenis Harga
                  </label>
                  <input
                    type="text"
                    value={h.jenisHarga}
                    onChange={(e) =>
                      updateHarga(index, "jenisHarga", e.target.value)
                    }
                    placeholder="Contoh: Tiket Masuk"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    value={h.harga}
                    onChange={(e) =>
                      updateHarga(index, "harga", e.target.value)
                    }
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    value={h.keterangan}
                    onChange={(e) =>
                      updateHarga(index, "keterangan", e.target.value)
                    }
                    placeholder="Per orang"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fasilitas & Detail */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">
              Fasilitas & Detail
            </h2>
            <button
              type="button"
              onClick={addFasilitas}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              + Tambah Detail
            </button>
          </div>

          {fasilitas.map((f, index) => (
            <div
              key={index}
              className="border border-slate-300 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-800">
                  Detail {index + 1}
                </h3>
                {fasilitas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFasilitas(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Jenis
                    </label>
                    <select
                      value={f.jenis}
                      onChange={(e) =>
                        updateFasilitas(index, "jenis", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="FASILITAS">Fasilitas</option>
                      <option value="AKTIVITAS">Aktivitas</option>
                      <option value="TIPS">Tips</option>
                      <option value="ATURAN">Aturan</option>
                      <option value="AKSES">Akses</option>
                      <option value="LAINNYA">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={f.judul}
                      onChange={(e) =>
                        updateFasilitas(index, "judul", e.target.value)
                      }
                      placeholder="Contoh: Toilet & Kamar Mandi"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Konten
                  </label>
                  <textarea
                    value={f.konten}
                    onChange={(e) =>
                      updateFasilitas(index, "konten", e.target.value)
                    }
                    rows={3}
                    placeholder="Deskripsi detail..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-800">SEO</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Status & Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Status Publikasi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
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

            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">
                  Tandai sebagai Featured
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? "Menyimpan..." : "Simpan Destinasi"}</span>
            </button>

            <Link
              href="/admin/destinasi"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-semibold transition-colors"
            >
              Batal
            </Link>
          </div>
        </div>
      </form>

      {/* Image Search Modal */}
      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => setShowImageSearch(false)}
        onSelectImage={handleImageSelect}
        initialQuery={formData.nama || "pangandaran"}
      />
    </div>
  );
}
