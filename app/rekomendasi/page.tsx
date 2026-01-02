import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Wallet,
  MapPin,
  Users,
  Star,
  Heart,
  Compass,
  Mountain,
  Waves,
  Users2,
  Baby,
  TrendingUp,
} from "lucide-react";

export default function RekomendasiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white shadow-lg">
              <Compass className="w-4 h-4" />
              <span className="text-sm">Paket Wisata Terkurasi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Rekomendasi Perjalanan
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Itinerary lengkap untuk berbagai tema dan durasi perjalanan di
              Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Filter by Theme */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">
              Pilih Tema Perjalanan
            </h2>
            <p className="text-slate-600 mt-2">
              Temukan paket yang sesuai dengan mood liburanmu
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className="group p-6 bg-white rounded-xl border-2 border-slate-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-3 group-hover:scale-110 transition-transform">
                  <theme.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{theme.name}</h3>
                <p className="text-xs text-slate-600">{theme.count} paket</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recommendations */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Rekomendasi Unggulan
              </h2>
              <p className="text-slate-600 mt-2">
                Paling populer & recommended
              </p>
            </div>
            <div className="flex items-center text-purple-600">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Trending</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredRecommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/rekomendasi/${rec.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className="relative h-72 overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.6) 70%), url(${rec.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                      {rec.theme}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-purple-200 transition-colors">
                      {rec.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{rec.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Wallet className="w-4 h-4" />
                        <span>{rec.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>{rec.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Highlight Destinasi:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {rec.destinations.map((dest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full flex items-center"
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Cocok untuk {rec.suitableFor}</span>
                    </div>
                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Recommendations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Semua Rekomendasi
            </h2>
            <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Urutkan: Terpopuler</option>
              <option>Budget: Rendah - Tinggi</option>
              <option>Budget: Tinggi - Rendah</option>
              <option>Durasi: Terpendek</option>
              <option>Durasi: Terpanjang</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRecommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/rekomendasi/${rec.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${rec.image})`,
                  }}
                >
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded">
                      {rec.theme}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{rec.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wallet className="w-3 h-3" />
                      <span>{rec.budget}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center text-xs text-slate-600">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{rec.suitableFor}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{rec.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>Muat Lebih Banyak</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Butuh Paket Custom?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk membuat itinerary khusus sesuai kebutuhan dan
            budget Anda
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 shadow-xl hover:scale-105"
          >
            <span>Hubungi Kami</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const themes = [
  { name: "Petualangan", icon: Mountain, count: 8 },
  { name: "Romantis", icon: Heart, count: 6 },
  { name: "Keluarga", icon: Users2, count: 10 },
  { name: "Budget Friendly", icon: Wallet, count: 12 },
];

const featuredRecommendations = [
  {
    id: 1,
    title: "Petualangan Alam 3 Hari",
    slug: "petualangan-alam-3-hari",
    theme: "Petualangan",
    description:
      "Eksplorasi lengkap Green Canyon dengan kayak, cliff jumping, trekking goa Pananjung, dan camping di tepi pantai dengan api unggun.",
    duration: "3 Hari 2 Malam",
    budget: "Rp 800rb-1jt",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    destinations: ["Green Canyon", "Goa Pananjung", "Pantai Batu Karas"],
    suitableFor: "Adventure Seekers",
  },
  {
    id: 2,
    title: "Romantis Sunset Getaway",
    slug: "romantis-sunset-getaway",
    theme: "Romantis",
    description:
      "Paket khusus untuk pasangan dengan private beach dinner, spa couple, sunrise di pantai, dan menginap di villa mewah tepi laut.",
    duration: "2 Hari 1 Malam",
    budget: "Rp 1.5-2jt",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    destinations: ["Sunset Point", "Private Beach", "Villa Tepi Laut"],
    suitableFor: "Pasangan",
  },
];

const allRecommendations = [
  {
    id: 3,
    title: "Liburan Keluarga Hemat",
    slug: "liburan-keluarga-hemat",
    theme: "Budget Friendly",
    description:
      "Paket lengkap untuk keluarga dengan budget terbatas namun tetap menyenangkan.",
    duration: "2 Hari 1 Malam",
    budget: "Rp 300-500rb",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    suitableFor: "Keluarga",
  },
  {
    id: 4,
    title: "Weekend Surf & Chill",
    slug: "weekend-surf-chill",
    theme: "Petualangan",
    description:
      "Surfing lesson, yoga pagi, dan beach barbecue untuk weekend yang menyegarkan.",
    duration: "2 Hari 1 Malam",
    budget: "Rp 600-800rb",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&w=800&q=80",
    suitableFor: "Solo/Grup",
  },
  {
    id: 5,
    title: "Edukasi Anak & Konservasi",
    slug: "edukasi-anak-konservasi",
    theme: "Keluarga",
    description:
      "Program edukatif tentang penyu, mangrove, dan ekosistem pantai untuk anak-anak.",
    duration: "1 Hari",
    budget: "Rp 200-300rb",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    suitableFor: "Keluarga dengan Anak",
  },
  {
    id: 6,
    title: "Honeymoon Paradise",
    slug: "honeymoon-paradise",
    theme: "Romantis",
    description:
      "Paket bulan madu eksklusif dengan private tour dan romantic dinner.",
    duration: "4 Hari 3 Malam",
    budget: "Rp 3-4jt",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    suitableFor: "Newlyweds",
  },
];
