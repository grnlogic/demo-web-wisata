"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { KategoriGaleri } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Image as ImageIcon,
  Layers,
  Loader2,
  Sparkles,
  Sunrise,
  Sunset,
  Trees,
  Waves,
  X,

  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Galeri {
  id: string;
  judul: string;
  deskripsi: string | null;
  url: string;
  thumbnail: string | null;
  kategori: KategoriGaleri;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const kategoriLabels: Record<string, string> = {
  SEMUA: "Semua",
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

const kategoriIcons: Record<string, JSX.Element> = {
  SEMUA: <Layers className="h-4 w-4" />,
  PANTAI: <Waves className="h-4 w-4" />,
  KULINER: <Camera className="h-4 w-4" />,
  BUDAYA: <Sparkles className="h-4 w-4" />,
  WAHANA: <Trees className="h-4 w-4" />,
  EVENT: <Camera className="h-4 w-4" />,
  SUNSET: <Sunset className="h-4 w-4" />,
  SUNRISE: <Sunrise className="h-4 w-4" />,
  UNDERWATER: <Waves className="h-4 w-4" />,
  LAINNYA: <ImageIcon className="h-4 w-4" />,
};

export default function GaleriPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("SEMUA");
  const [selectedImage, setSelectedImage] = useState<Galeri | null>(null);
  
  // Upload State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("file");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Array of previews
  const [previewUrl, setPreviewUrl] = useState(""); // Kept for URL method compatibility
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
     judul: "",
     deskripsi: "",
     url: "",
     kategori: "PANTAI",
  });
  
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });

  const categories = useMemo(
    () => [
      "SEMUA",
      "PANTAI",
      "KULINER",
      "BUDAYA",
      "WAHANA",
      "EVENT",
      "SUNSET",
      "SUNRISE",
      "UNDERWATER",
      "LAINNYA",
    ],
    []
  );

  const fetchGaleri = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (selectedKategori !== "SEMUA") {
        params.append("kategori", selectedKategori);
      }

      const response = await fetch(`/api/galeri?${params.toString()}`);
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
    void fetchGaleri();
  }, [pagination.page, selectedKategori]);

  const handleKategoriChange = (kategori: string) => {
    setSelectedKategori(kategori);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = galeri.findIndex(g => g.id === selectedImage.id);
    if (currentIndex !== -1 && currentIndex < galeri.length - 1) {
      setSelectedImage(galeri[currentIndex + 1]);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = galeri.findIndex(g => g.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(galeri[currentIndex - 1]);
    }
  };
    
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!selectedImage) return;
        if (e.key === "ArrowRight") handleNextImage();
        if (e.key === "ArrowLeft") handlePrevImage();
        if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, galeri]);

  const getKategoriLabel = (kat: string) => kategoriLabels[kat] || kat;

  const gridSkeleton = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="aspect-square rounded-2xl bg-slate-100 border border-slate-200 animate-pulse"
        />
      ))}
    </div>
  );

  const handleUploadClick = () => {
    if (!session) {
      // Redirect to login or show logic
      if (confirm("Anda perlu login untuk mengupload foto. Login sekarang?")) {
        router.push("/admin/login"); // Or user login path
      }
      return;
    }
    setShowUploadModal(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: File[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} terlalu besar (Max 5MB)`);
          continue;
        }
        newFiles.push(file);
      }

      if (newFiles.length === 0) return;

      setSelectedFiles(newFiles);
      
      // Generate previews
      const promises = newFiles.map(file => {
          return new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
          });
      });
      
      const previews = await Promise.all(promises);
      setPreviewUrls(previews);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadMethod === 'file' && selectedFiles.length === 0) {
        alert("Pilih minimal satu foto");
        return;
    }
    if (uploadMethod === 'url' && !formData.url) {
        alert("Masukkan URL foto");
        return;
    }

    setSaving(true);
    setUploading(true);

    try {
      const itemsToUpload = [];

      if (uploadMethod === 'file') {
          // 1. Upload files first
          for (let i = 0; i < selectedFiles.length; i++) {
              const file = selectedFiles[i];
              const fd = new FormData();
              fd.append("file", file);
              
              // Helper to upload single file
              const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
              if (!uploadRes.ok) throw new Error(`Gagal upload file ${file.name}`);
              const uploadData = await uploadRes.json();
              
              itemsToUpload.push({
                  ...formData,
                  judul: selectedFiles.length > 1 ? `${formData.judul} (${i+1})` : formData.judul,
                  url: uploadData.url,
                  tags: []
              });
          }
      } else {
          // URL method (single)
          itemsToUpload.push({
              ...formData,
              tags: []
          });
      }

      // 2. Submit to Gallery API (Batch)
      const response = await fetch("/api/galeri/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemsToUpload)
      });

      if (response.ok) {
        const count = itemsToUpload.length;
        alert(`Berhasil! ${count} foto telah dikirim dan menunggu persetujuan admin.`);
        setShowUploadModal(false);
        setFormData({ judul: "", deskripsi: "", url: "", kategori: "PANTAI" });
        setPreviewUrls([]);
        setSelectedFiles([]);
      } else {
        const data = await response.json();
        alert(data.error || "Gagal mengirim foto");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan sistem");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white text-slate-800">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 border-b border-emerald-500">
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-white/30 blur-[80px]" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-cyan-300/30 blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-sm text-white backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Kurasi visual Pangandaran
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Galeri premium: suasana, laut, kuliner, dan budaya
              </h1>
              <p className="text-lg text-emerald-100">
                Koleksi foto dan video dengan presentasi elegan, filter
                kategori cepat, dan modal detail yang kinclong.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white border border-white/20">
                  <Camera className="h-4 w-4" />
                  Foto & video siap unduh
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white border border-white/20">
                  <Waves className="h-4 w-4" />
                  Pantai, sunrise, underwater
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white border border-white/20">
                  <Sparkles className="h-4 w-4" />
                  Sorotan featured terpilih
                </span>
                <button 
                  onClick={handleUploadClick}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-700 px-4 py-1.5 font-bold shadow-lg hover:bg-emerald-50 transition"
                >
                  <Plus className="h-4 w-4" />
                  Upload Foto
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur">
                <p className="text-xs text-white/70">Total item</p>
                <p className="text-2xl font-bold text-white">
                  {pagination.total}
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur">
                <p className="text-xs text-white/70">Halaman</p>
                <p className="text-2xl font-bold text-white">
                  {pagination.page}/{pagination.totalPages || 1}
                </p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/20 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 px-4 py-3 backdrop-blur flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-white" />
                <div>
                  <p className="text-xs text-white/70">Kategori aktif</p>
                  <p className="text-sm font-semibold text-white">
                    {getKategoriLabel(selectedKategori)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur p-4 shadow-lg">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const active = selectedKategori === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleKategoriChange(cat)}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition border ${
                      active
                        ? "bg-white text-emerald-700 border-white shadow-lg"
                        : "bg-white/10 border-white/20 text-white hover:border-white hover:bg-white/20"
                    }`}
                  >
                    {kategoriIcons[cat] || <Layers className="h-4 w-4" />}
                    {getKategoriLabel(cat)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {loading && pagination.page === 1 ? (
            gridSkeleton
          ) : galeri.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg">
              <ImageIcon className="w-14 h-14 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Belum ada galeri
              </h3>
              <p className="text-slate-500 max-w-xl mx-auto">
                Konten akan muncul setelah tim mengunggah foto atau video pada
                kategori ini.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galeri.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-300"
                  >
                    <div
                      className="aspect-[4/3] w-full overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%), url(${
                          item.thumbnail || item.url
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 space-y-2 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        {kategoriIcons[item.kategori] || (
                          <Layers className="h-4 w-4" />
                        )}
                        <span>{getKategoriLabel(item.kategori)}</span>
                        {item.featured && (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-2 py-0.5 text-[11px] font-semibold">
                            <Sparkles className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-emerald-200 transition">
                        {item.judul}
                      </h3>
                      {item.deskripsi && (
                        <p className="text-sm text-white/80 line-clamp-2">
                          {item.deskripsi}
                        </p>
                      )}
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] rounded-full bg-white/20 px-3 py-1 text-white"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {loading && pagination.page > 1 && gridSkeleton}

              {pagination.totalPages > 1 && (
                 <div className="flex justify-center gap-2 mt-8">
                   <button
                     onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                     disabled={pagination.page === 1 || loading}
                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                   >
                     <ChevronLeft className="w-5 h-5" />
                   </button>
                   
                   {/* Logic for page numbers can be simple for now: show all or a range */}
                   {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => {
                      // Simple pagination logic: show first, last, current, and adjacent
                      if (
                        p === 1 ||
                        p === pagination.totalPages ||
                        (p >= pagination.page - 1 && p <= pagination.page + 1)
                      ) {
                        return (
                          <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            disabled={loading}
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition ${
                              pagination.page === p
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                : "bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      } else if (
                        p === pagination.page - 2 ||
                        p === pagination.page + 2
                      ) {
                        return <span key={p} className="flex items-end px-1 text-slate-400">...</span>;
                      }
                      return null;
                   })}

                   <button
                     onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                     disabled={pagination.page === pagination.totalPages || loading}
                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                   >
                     <ChevronRight className="w-5 h-5" />
                   </button>
                 </div>
              )}

              <div className="text-center text-sm text-slate-500">
                Menampilkan {galeri.length} dari {pagination.total} konten
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="hidden md:block absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition z-50"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="max-w-7xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl flex flex-col md:flex-row h-[85vh]">
              {/* Image Section */}
              <div className="flex-1 bg-slate-900 flex items-center justify-center relative group overflow-hidden">
                 {/* Blurry Background Layer */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-125 transition-all duration-700"
                    style={{ backgroundImage: `url(${selectedImage.url})` }}
                 />
                 <div className="absolute inset-0 bg-black/20" /> {/* Dim overlay */}

                 {/* Navigation Buttons */}
                 <button
                    onClick={handlePrevImage}
                    className="absolute left-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur transition opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    disabled={!selectedImage || galeri.findIndex(g => g.id === selectedImage.id) === 0}
                 >
                    <ChevronLeft className="w-8 h-8" />
                 </button>
                 <button
                    onClick={handleNextImage}
                    className="absolute right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur transition opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    disabled={!selectedImage || galeri.findIndex(g => g.id === selectedImage.id) === galeri.length - 1}
                 >
                    <ChevronRight className="w-8 h-8" />
                 </button>

                 <img
                   src={selectedImage.url}
                   alt={selectedImage.judul}
                   className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                 />
              </div>
              
              {/* Details Section - Right Side on Desktop */}
              <div className="w-full md:w-96 bg-white overflow-y-auto border-l border-slate-100 flex flex-col">
                  {/* Mobile Close Button (Top Right inside details) */}
                  <div className="md:hidden p-4 flex justify-end">
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="rounded-full bg-slate-100 p-2 text-slate-500"
                       >
                       <X className="h-5 w-5" />
                      </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {kategoriIcons[selectedImage.kategori] || (
                        <Layers className="h-4 w-4" />
                      )}
                      <span>{getKategoriLabel(selectedImage.kategori)}</span>
                      {selectedImage.featured && (
                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-0.5 text-[11px] font-semibold">
                          <Sparkles className="h-3.5 w-3.5" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {selectedImage.judul}
                    </h2>
                    {selectedImage.deskripsi && (
                      <p className="text-slate-600 leading-relaxed">
                        {selectedImage.deskripsi}
                      </p>
                    )}
                    {selectedImage.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 border border-emerald-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-slate-800">
                Upload Foto Kamu
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-6">
              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700">
                INFO: Foto yang kamu upload akan diperiksa oleh admin terlebih dahulu.
              </div>

               {/* Upload Method Tabs */}
               <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Metode Upload
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMethod("url");
                      setSelectedFiles([]);
                      setPreviewUrls([]);
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      uploadMethod === "url"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    📎 Link Gambar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMethod("file");
                      setFormData(prev => ({ ...prev, url: "" }));
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                      uploadMethod === "file"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    📁 Upload File (Batch)
                  </button>
                </div>

                {uploadMethod === "url" && (
                  <div>
                    <input
                      type="url"
                      required={uploadMethod === "url"}
                      placeholder="https://..."
                      value={formData.url}
                      onChange={(e) => {
                        setFormData({ ...formData, url: e.target.value });
                        setPreviewUrl(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                    {previewUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                      </div>
                    )}
                  </div>
                )}

                 {uploadMethod === "file" && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition cursor-pointer relative">
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                            <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <Plus className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                Klik untuk memilih foto (Bisa banyak sekaligus)
                            </p>
                            <p className="text-xs text-slate-500">
                                JPG, PNG, WebP. Maks 5MB per file.
                            </p>
                        </div>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                          {previewUrls.map((url, idx) => (
                              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                                  <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                                      Foto #{idx + 1}
                                  </div>
                              </div>
                          ))}
                      </div>
                    )}
                    
                    {selectedFiles.length > 0 && (
                        <p className="text-sm text-emerald-600 font-medium text-center">
                            ✅ {selectedFiles.length} foto terpilih
                        </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Judul Foto {selectedFiles.length > 1 && "(Akan diterapkan ke semua foto)"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedFiles.length > 1 ? "Contoh: Liburan Keluarga (nanti jadi Liburan Keluarga 1, 2, dst)" : "Judul foto..."}
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition bg-white"
                >
                  {categories.filter(c => c !== "SEMUA").map(c => (
                    <option key={c} value={c}>{getKategoriLabel(c)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cerita dibalik foto (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan sedikit tentang foto ini..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {uploading ? "Mengupload..." : "Mengirim..."}
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      {selectedFiles.length > 1 ? `Kirim ${selectedFiles.length} Foto` : "Kirim Foto"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
