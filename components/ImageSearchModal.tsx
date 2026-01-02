"use client";

import { useState, useEffect } from "react";
import { Search, X, Loader2, Download, CheckCircle } from "lucide-react";

interface Photo {
  id: number;
  url: string;
  thumbnail: string;
  photographer: string;
  photographer_url: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string, alt: string) => void;
  initialQuery?: string;
}

export default function ImageSearchModal({
  isOpen,
  onClose,
  onSelectImage,
  initialQuery = "",
}: ImageSearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (isOpen && initialQuery) {
      setQuery(initialQuery);
      searchImages(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const searchImages = async (
    searchQuery: string = query,
    pageNum: number = 1
  ) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/image-search?query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNum}&per_page=20`
      );
      const data = await response.json();

      if (data.success) {
        setPhotos(data.photos);
        setTotalResults(data.total_results);
        setPage(pageNum);
      } else {
        alert(
          "Gagal mencari gambar. Pastikan Pexels API key sudah dikonfigurasi."
        );
      }
    } catch (error) {
      console.error("Error searching images:", error);
      alert("Terjadi kesalahan saat mencari gambar");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (photo: Photo) => {
    setSelectedId(photo.id);
    onSelectImage(photo.url, photo.alt);
    setTimeout(() => {
      onClose();
      setSelectedId(null);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchImages(query, 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Cari Gambar</h2>
            <p className="text-sm text-slate-600 mt-1">
              Powered by Pexels - Gambar gratis berkualitas tinggi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari gambar... (contoh: pantai pangandaran)"
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Mencari...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Cari
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && photos.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-slate-600">Mencari gambar...</p>
              </div>
            </div>
          ) : photos.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">
                  {query
                    ? "Tidak ada hasil ditemukan"
                    : "Masukkan kata kunci untuk mencari gambar"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-slate-600">
                Ditemukan {totalResults.toLocaleString()} gambar
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:ring-4 hover:ring-blue-500 transition-all"
                    onClick={() => handleSelectImage(photo)}
                  >
                    <img
                      src={photo.thumbnail}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-xs font-medium truncate">
                          Photo by {photo.photographer}
                        </p>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Download className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    {selectedId === photo.id && (
                      <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalResults > 20 && (
                <div className="mt-6 flex justify-center gap-2">
                  <button
                    onClick={() => searchImages(query, page - 1)}
                    disabled={page === 1 || loading}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <div className="px-4 py-2 bg-slate-100 rounded-lg">
                    Halaman {page}
                  </div>
                  <button
                    onClick={() => searchImages(query, page + 1)}
                    disabled={photos.length < 20 || loading}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-slate-50 text-center text-xs text-slate-600">
          Gambar dari{" "}
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Pexels
          </a>
          . Gratis untuk penggunaan komersial.
        </div>
      </div>
    </div>
  );
}
