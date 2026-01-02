import { Image as ImageIcon, Play, Filter } from "lucide-react";

export default function GaleriPage() {
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
            {[
              "Semua",
              "Pantai",
              "Kuliner",
              "Budaya",
              "Wahana",
              "Sunset",
              "Underwater",
            ].map((cat, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-slate-100 hover:bg-pink-500 hover:text-white rounded-lg font-medium whitespace-nowrap transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="group relative aspect-square bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  {index % 4 === 0 ? (
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-white/50" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">
                    Pantai Pasir Putih
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold transition-colors shadow-lg">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
