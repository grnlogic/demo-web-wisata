"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { KategoriGaleri } from "@prisma/client";
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
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKategori, setSelectedKategori] = useState("SEMUA");
  const [selectedImage, setSelectedImage] = useState<Galeri | null>(null);
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

  const handleLoadMore = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const getKategoriLabel = (kat: string) => kategoriLabels[kat] || kat;

  const gridSkeleton = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, idx) => (
        <div
          key={idx}
          className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950">
        <div className="absolute inset-0 opacity-70 blur-3xl" aria-hidden>
          <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-emerald-500/20" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-cyan-400/15" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Kurasi visual Pangandaran
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                Galeri premium: suasana, laut, kuliner, dan budaya
              </h1>
              <p className="text-lg text-white/80">
                Koleksi foto dan video dengan presentasi gelap elegan, filter
                kategori cepat, dan modal detail yang kinclong.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                  <Camera className="h-4 w-4" />
                  Foto & video siap unduh
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                  <Waves className="h-4 w-4" />
                  Pantai, sunrise, underwater
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/10">
                  <Sparkles className="h-4 w-4" />
                  Sorotan featured terpilih
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs text-white/60">Total item</p>
                <p className="text-2xl font-semibold text-white">
                  {pagination.total}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <p className="text-xs text-white/60">Halaman</p>
                <p className="text-2xl font-semibold text-white">
                  {pagination.page}/{pagination.totalPages || 1}
                </p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-400/15 to-cyan-400/10 px-4 py-3 backdrop-blur flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-emerald-200" />
                <div>
                  <p className="text-xs text-white/70">Kategori aktif</p>
                  <p className="text-sm font-semibold text-white">
                    {getKategoriLabel(selectedKategori)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-lg">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const active = selectedKategori === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleKategoriChange(cat)}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition border ${
                      active
                        ? "bg-emerald-300 text-slate-950 border-emerald-200 shadow-emerald-900/30 shadow"
                        : "bg-white/10 border-white/15 text-white/80 hover:border-white/40"
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

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {loading && pagination.page === 1 ? (
            gridSkeleton
          ) : galeri.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <ImageIcon className="w-14 h-14 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Belum ada galeri
              </h3>
              <p className="text-white/70 max-w-xl mx-auto">
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
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-emerald-950/20 transition hover:-translate-y-1 hover:border-emerald-200/70"
                  >
                    <div
                      className="aspect-[4/3] w-full overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.25) 0%, rgba(2,6,23,0.75) 100%), url(${
                          item.thumbnail || item.url
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 space-y-2 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent">
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        {kategoriIcons[item.kategori] || (
                          <Layers className="h-4 w-4" />
                        )}
                        <span>{getKategoriLabel(item.kategori)}</span>
                        {item.featured && (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-300 text-slate-950 px-2 py-0.5 text-[11px] font-semibold">
                            <Sparkles className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-emerald-200 transition">
                        {item.judul}
                      </h3>
                      {item.deskripsi && (
                        <p className="text-sm text-white/70 line-clamp-2">
                          {item.deskripsi}
                        </p>
                      )}
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] rounded-full bg-white/10 px-3 py-1 text-white/80 border border-white/10"
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

              {pagination.page < pagination.totalPages && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-300 text-slate-950 px-6 py-3 font-semibold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40 transition disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Memuat...
                      </>
                    ) : (
                      "Muat lebih banyak"
                    )}
                  </button>
                </div>
              )}

              <div className="text-center text-sm text-white/60">
                Menampilkan {galeri.length} dari {pagination.total} konten
              </div>
            </>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.judul}
                className="w-full max-h-[70vh] object-contain bg-slate-900"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  {kategoriIcons[selectedImage.kategori] || (
                    <Layers className="h-4 w-4" />
                  )}
                  <span>{getKategoriLabel(selectedImage.kategori)}</span>
                  {selectedImage.featured && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-300 text-slate-950 px-2.5 py-0.5 text-[11px] font-semibold">
                      <Sparkles className="h-3.5 w-3.5" />
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  {selectedImage.judul}
                </h2>
                {selectedImage.deskripsi && (
                  <p className="text-white/75 leading-relaxed">
                    {selectedImage.deskripsi}
                  </p>
                )}
                {selectedImage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs rounded-full bg-white/10 px-3 py-1 text-white/80 border border-white/10"
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
      )}
    </div>
  );
}
