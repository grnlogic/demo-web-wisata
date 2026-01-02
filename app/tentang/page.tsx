import { MapPin, Users, Calendar, Waves, Mountain, Sun } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Tentang Pangandaran</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Kenali lebih dekat pesona wisata di ujung selatan Jawa Barat
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Sejarah */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Sejarah Pangandaran
                </h2>
                <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Pangandaran adalah sebuah kecamatan di Kabupaten
                    Pangandaran, Provinsi Jawa Barat. Nama Pangandaran berasal
                    dari kata "Pang" yang berarti tempat dan "andaran" yang
                    berarti hutan. Daerah ini telah dikenal sejak zaman kerajaan
                    sebagai tempat yang indah dan strategis.
                  </p>
                  <p>
                    Pada masa penjajahan Belanda, Pangandaran sudah menjadi
                    tujuan wisata favorit. Hal ini dibuktikan dengan banyaknya
                    peninggalan bersejarah seperti Goa Jepang di Cagar Alam
                    Pananjung yang menjadi saksi bisu perjuangan kemerdekaan.
                  </p>
                  <p>
                    Setelah kemerdekaan, Pangandaran berkembang pesat menjadi
                    salah satu destinasi wisata unggulan di Jawa Barat.
                    Keindahan alamnya yang memukau, pantai yang eksotis, dan
                    budaya lokal yang kaya menjadikan Pangandaran sebagai surga
                    wisata yang wajib dikunjungi.
                  </p>
                </div>
              </div>

              {/* Geografi */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Geografi & Iklim
                </h2>
                <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Pangandaran terletak di pesisir selatan Pulau Jawa dengan
                    posisi geografis yang unik. Kota ini memiliki dua sisi
                    pantai - Pantai Barat yang tenang dan Pantai Timur yang
                    berombak - yang dipisahkan oleh Cagar Alam Pananjung.
                  </p>
                  <p>
                    Dengan luas wilayah sekitar 68 km² dan ketinggian 0-200
                    mdpl, Pangandaran memiliki iklim tropis dengan suhu
                    rata-rata 27-32°C. Musim hujan berlangsung dari November
                    hingga Maret, sementara musim kemarau dari April hingga
                    Oktober.
                  </p>
                  <p>
                    Kondisi geografis ini menciptakan ekosistem yang beragam,
                    mulai dari pantai berpasir putih, hutan tropis, ngarai
                    sungai, hingga formasi batu karang yang menakjubkan.
                  </p>
                </div>
              </div>

              {/* Budaya */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Budaya & Tradisi
                </h2>
                <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Masyarakat Pangandaran mayoritas adalah suku Sunda dengan
                    budaya dan tradisi yang masih dijaga hingga kini. Keramahan
                    penduduk lokal menjadi daya tarik tersendiri bagi wisatawan.
                  </p>
                  <p>
                    Berbagai upacara adat dan ritual masih dijalankan, seperti
                    Nadran (upacara laut), Hajat Laut, dan berbagai festival
                    budaya yang rutin diselenggarakan. Seni tradisional seperti
                    wayang golek, jaipongan, dan musik calung masih lestari.
                  </p>
                  <p>
                    Kuliner khas Pangandaran juga menjadi bagian penting dari
                    budaya lokal, dengan seafood segar dan masakan tradisional
                    Sunda yang menggugah selera.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Fakta Singkat
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Provinsi</div>
                    <div className="font-semibold text-slate-800">
                      Jawa Barat
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Kabupaten</div>
                    <div className="font-semibold text-slate-800">
                      Pangandaran
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">
                      Luas Wilayah
                    </div>
                    <div className="font-semibold text-slate-800">~68 km²</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Populasi</div>
                    <div className="font-semibold text-slate-800">
                      ~50.000 jiwa
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Bahasa</div>
                    <div className="font-semibold text-slate-800">
                      Bahasa Sunda, Indonesia
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-6">Statistik Wisata</h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Destinasi", value: "25+" },
                    { icon: Users, label: "Wisatawan/Tahun", value: "500K+" },
                    { icon: Calendar, label: "Event Tahunan", value: "30+" },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Waktu Terbaik Berkunjung
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        April - Oktober
                      </p>
                      <p className="text-slate-600">
                        Musim kemarau, cuaca cerah sempurna untuk pantai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Waves className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        November - Maret
                      </p>
                      <p className="text-slate-600">
                        Musim hujan, air terjun dan sungai lebih indah
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
