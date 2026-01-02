import Link from "next/link";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  ShoppingBag,
  Utensils,
  PalmtreeIcon as Palm,
  Waves,
  Paintbrush,
  Camera,
} from "lucide-react";

export default function UkmPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white shadow-lg">
              <Store className="w-4 h-4" />
              <span className="text-sm">Dukung Ekonomi Lokal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Profil UKM Pangandaran
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Temukan produk dan layanan dari pelaku usaha lokal terbaik di
              Pangandaran
            </p>
          </div>
        </div>
      </section>

      {/* Featured UKM */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                UKM Unggulan
              </h2>
              <p className="text-slate-600 mt-2">
                UKM terverifikasi dengan reputasi terbaik
              </p>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Terverifikasi</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredUkm.map((ukm) => (
              <Link
                key={ukm.id}
                href={`/ukm/${ukm.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className="flex flex-col md:flex-row">
                  <div
                    className="h-64 md:h-auto md:w-1/3 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${ukm.image})`,
                    }}
                  />
                  <div className="p-6 md:w-2/3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {ukm.logo ? (
                          <img
                            src={ukm.logo}
                            alt={ukm.name}
                            className="w-16 h-16 rounded-lg object-cover border-2 border-slate-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <Store className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                            {ukm.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {ukm.category}
                          </p>
                        </div>
                      </div>
                      {ukm.verified && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>

                    <p className="text-slate-600 line-clamp-2">
                      {ukm.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{ukm.location}</span>
                      </div>
                      {ukm.rating && (
                        <div className="flex items-center text-sm">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{ukm.rating}</span>
                          <span className="text-slate-500 ml-1">
                            ({ukm.reviews} ulasan)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ukm.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center space-x-3">
                        {ukm.phone && (
                          <Phone className="w-4 h-4 text-slate-400" />
                        )}
                        {ukm.instagram && (
                          <Instagram className="w-4 h-4 text-slate-400" />
                        )}
                        {ukm.website && (
                          <Globe className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex items-center text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Kategori UKM</h2>
            <p className="text-slate-600 mt-2">
              Temukan UKM berdasarkan kategori usaha
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/ukm/kategori/${category.slug}`}
                className="group p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white mb-3 group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500">{category.count} UKM</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All UKM List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Semua UKM</h2>
            <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Semua Kategori</option>
              <option>Kuliner</option>
              <option>Kerajinan</option>
              <option>Jasa Wisata</option>
              <option>Souvenir</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUkm.map((ukm) => (
              <Link
                key={ukm.id}
                href={`/ukm/${ukm.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${ukm.image})`,
                  }}
                >
                  {ukm.verified && (
                    <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                      {ukm.name}
                    </h3>
                    <p className="text-sm text-slate-600">{ukm.category}</p>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {ukm.description}
                  </p>
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="line-clamp-1">{ukm.location}</span>
                  </div>
                  {ukm.rating && (
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{ukm.rating}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/ukm/semua"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Lihat Semua UKM</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Daftarkan UKM Anda</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas UKM Pangandaran dan tingkatkan
            visibilitas usaha Anda
          </p>
          <Link
            href="/ukm/daftar"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-green-600 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 shadow-xl hover:scale-105"
          >
            <Store className="w-5 h-5" />
            <span>Daftar Sekarang</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

const featuredUkm = [
  {
    id: 1,
    name: "Warung Seafood Pak Ujang",
    slug: "warung-seafood-pak-ujang",
    category: "Kuliner",
    description:
      "Menyajikan seafood segar pilihan dengan bumbu rahasia khas Pangandaran. Buka setiap hari dengan view pantai yang menakjubkan.",
    location: "Pantai Barat, Pangandaran",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    logo: null,
    verified: true,
    rating: 4.8,
    reviews: 124,
    services: ["Seafood", "Makanan Lokal", "Catering"],
    phone: true,
    instagram: true,
    website: false,
  },
  {
    id: 2,
    name: "Kerajinan Bambu Ibu Siti",
    slug: "kerajinan-bambu-ibu-siti",
    category: "Kerajinan",
    description:
      "Produsen kerajinan bambu berkualitas tinggi dengan desain modern dan tradisional. Melayani custom order dan pengiriman ke seluruh Indonesia.",
    location: "Desa Wonoharjo, Pangandaran",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    logo: null,
    verified: true,
    rating: 4.9,
    reviews: 87,
    services: ["Kerajinan Tangan", "Custom Design", "Souvenir"],
    phone: true,
    instagram: true,
    website: true,
  },
];

const allUkm = [
  {
    id: 3,
    name: "Tour Guide Pangandaran",
    slug: "tour-guide-pangandaran",
    category: "Jasa Wisata",
    description:
      "Layanan guide profesional untuk wisata di Pangandaran dengan paket lengkap.",
    location: "Pangandaran Kota",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    verified: true,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Souvenir Khas Pangandaran",
    slug: "souvenir-khas-pangandaran",
    category: "Souvenir",
    description:
      "Aneka souvenir khas Pangandaran dengan harga terjangkau dan kualitas terbaik.",
    location: "Pasar Pangandaran",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
    verified: false,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Rental Peralatan Snorkeling",
    slug: "rental-snorkeling",
    category: "Jasa Wisata",
    description:
      "Sewa peralatan snorkeling lengkap dengan instruktur berpengalaman.",
    location: "Pantai Pasir Putih",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    verified: true,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Kopi Pangandaran",
    slug: "kopi-pangandaran",
    category: "Kuliner",
    description:
      "Kopi lokal premium dari kebun sendiri dengan cita rasa khas Pangandaran.",
    location: "Cijulang",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    verified: true,
    rating: 4.8,
  },
  {
    id: 7,
    name: "Batik Pangandaran",
    slug: "batik-pangandaran",
    category: "Kerajinan",
    description:
      "Batik tulis khas Pangandaran dengan motif ombak dan fauna laut.",
    location: "Pangandaran Kota",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    verified: false,
    rating: 4.4,
  },
  {
    id: 8,
    name: "Fotografer Wisata",
    slug: "fotografer-wisata",
    category: "Jasa Wisata",
    description:
      "Jasa foto profesional untuk dokumentasi liburan Anda di Pangandaran.",
    location: "Pangandaran",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80",
    verified: true,
    rating: 4.9,
  },
];

const categories = [
  {
    name: "Kuliner",
    slug: "kuliner",
    count: 45,
    icon: Utensils,
  },
  {
    name: "Kerajinan",
    slug: "kerajinan",
    count: 32,
    icon: Paintbrush,
  },
  {
    name: "Jasa Wisata",
    slug: "jasa-wisata",
    count: 28,
    icon: Palm,
  },
  {
    name: "Souvenir",
    slug: "souvenir",
    count: 38,
    icon: ShoppingBag,
  },
  {
    name: "Aktivitas Air",
    slug: "aktivitas-air",
    count: 15,
    icon: Waves,
  },
  {
    name: "Fotografi",
    slug: "fotografi",
    count: 12,
    icon: Camera,
  },
];
