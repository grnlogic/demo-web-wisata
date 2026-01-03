"use client";

import { Image as ImageIcon, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { KategoriGaleri } from "@prisma/client";

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

      const response = await fetch(`/api/galeri?${params}`);
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
  }, [pagination.page, selectedKategori]);

  const handleKategoriChange = (kategori: string) => {
    setSelectedKategori(kategori);
    setPagination({ ...pagination, page: 1 });
  };

  const handleLoadMore = () => {
    setPagination({ ...pagination, page: pagination.page + 1 });
  };

  const getKategoriLabel = (kat: string) => {
    const labels: Record<string, string> = {
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
    return labels[kat] || kat;
  };

  const categories = [
    "SEMUA",
    "PANTAI",
    "KULINER",
    "BUDAYA",
    "WAHANA",
    "EVENT",
    "SUNSET",
    "SUNRISE",
    "UNDERWATER",
  ];
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-600 via-pink-700 to-rose-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Galeri</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Jelajahi keindahan Pangandaran melalui foto dan video pilihan
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleKategoriChange(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedKategori === cat
                    ? "bg-pink-600 text-white"
                    : "bg-slate-100 hover:bg-pink-500 hover:text-white"
                }`}
              >
                {getKategoriLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && pagination.page === 1 ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
              <p className="mt-4 text-slate-600">Memuat galeri...</p>
            </div>
          ) : galeri.length === 0 ? (
            <div className="py-20 text-center">
              <ImageIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Belum Ada Galeri
              </h3>
              <p className="text-slate-600">
                Belum ada foto atau video untuk kategori ini
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galeri.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg"
                  >
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold line-clamp-2">
                          {item.judul}
                        </p>
                        {item.deskripsi && (
                          <p className="text-white/80 text-sm line-clamp-1 mt-1">
                            {item.deskripsi}
                          </p>
                        )}
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-white/20 text-white px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {item.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More */}
              {pagination.page < pagination.totalPages && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold transition-colors shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Memuat..." : "Muat Lebih Banyak"}
                  </button>
                </div>
              )}

              <div className="text-center mt-6 text-sm text-slate-600">
                Menampilkan {galeri.length} dari {pagination.total} foto
              </div>
            </>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.judul}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedImage.judul}
              </h2>
              {selectedImage.deskripsi && (
                <p className="text-white/90 mb-4">
                  {selectedImage.deskripsi}
                </p>
              )}
              {selectedImage.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {selectedImage.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-white/20 text-white px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
