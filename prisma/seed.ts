import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { KategoriDestinasi, StatusPublish, KategoriGaleri, TipeMedia, KategoriInfo, JenisDetail } from '@prisma/client'

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🧹 Cleaning database...')
  await prisma.destinasiDetail.deleteMany()
  await prisma.destinasiHarga.deleteMany()
  await prisma.destinasiImage.deleteMany()
  await prisma.destinasi.deleteMany()
  await prisma.event.deleteMany()
  await prisma.galeri.deleteMany()
  await prisma.informasiUmum.deleteMany()
  await prisma.kuliner.deleteMany()
  await prisma.berita.deleteMany()
  await prisma.profilUkm.deleteMany()
  await prisma.rekomendasi.deleteMany()
  await prisma.settings.deleteMany()
  await prisma.admin.deleteMany()

  // Create Admin Users
  const hashedPassword = await hash('admin123', 10)
  
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      nama: 'Administrator',
      email: 'admin@wisatapangandaran.com',
    },
  })

  const admin2 = await prisma.admin.create({
    data: {
      username: 'editor',
      password: hashedPassword,
      nama: 'Editor Content',
      email: 'editor@wisatapangandaran.com',
    },
  })

  console.log('✅ Admin users created:', admin.username, admin2.username)

  // Create Comprehensive Destinasi Data
  const destinasiData = [
    {
      nama: 'Pantai Pasir Putih',
      slug: 'pantai-pasir-putih',
      deskripsi: 'Pantai dengan pasir putih yang halus dan air laut jernih. Cocok untuk berenang, snorkeling, dan menikmati sunset yang memukau. Terletak di sisi barat Pangandaran dengan fasilitas lengkap seperti area parkir luas, toilet bersih, mushola, dan warung makan.',
      kategori: 'PANTAI' as KategoriDestinasi,
      lokasi: 'Pantai Barat',
      alamat: 'Jl. Pantai Barat, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Pasir+Putih+Pangandaran',
      rating: 4.8,
      jumlahReview: 1234,
      metaTitle: 'Pantai Pasir Putih Pangandaran - Destinasi Wisata Terbaik',
      metaDescription: 'Nikmati keindahan Pantai Pasir Putih dengan sunset yang memukau, cocok untuk keluarga',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 1,
      createdBy: admin.id,
    },
    {
      nama: 'Green Canyon',
      slug: 'green-canyon',
      deskripsi: 'Ngarai dengan sungai jernih berwarna hijau tosca yang dikelilingi tebing batu tinggi mencapai 40 meter. Nikmati body rafting, cliff jumping, dan jelajahi goa dengan stalaktit alami. Salah satu destinasi paling populer di Pangandaran yang wajib dikunjungi. Air sungai yang jernih berasal dari mata air pegunungan.',
      kategori: 'WISATA_BAHARI' as KategoriDestinasi,
      lokasi: 'Cijulang',
      alamat: 'Desa Kertayasa, Cijulang, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.696111,108.489167',
      googleMapsUrl: 'https://maps.google.com/?q=Green+Canyon+Pangandaran',
      rating: 4.9,
      jumlahReview: 2856,
      metaTitle: 'Green Canyon Pangandaran - Wisata Alam Spektakuler',
      metaDescription: 'Eksplorasi keindahan Green Canyon dengan body rafting dan cliff jumping',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 2,
      createdBy: admin.id,
    },
    {
      nama: 'Cagar Alam Pananjung',
      slug: 'cagar-alam-pananjung',
      deskripsi: 'Hutan lindung seluas 530 hektar dengan berbagai flora dan fauna endemik Jawa. Terdapat Goa Jepang peninggalan zaman kolonial, tracking trail sepanjang 3 km, dan spot untuk melihat monyet ekor panjang yang jinak. Pemandangan laut dari atas bukit sangat menakjubkan dengan ketinggian 130 mdpl.',
      kategori: 'CAGAR_ALAM' as KategoriDestinasi,
      lokasi: 'Pantai Timur',
      alamat: 'Pantai Timur, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.702778,108.666667',
      googleMapsUrl: 'https://maps.google.com/?q=Cagar+Alam+Pananjung',
      rating: 4.7,
      jumlahReview: 1643,
      metaTitle: 'Cagar Alam Pananjung - Hutan Lindung Pangandaran',
      metaDescription: 'Jelajahi hutan lindung dengan tracking trail dan Goa Jepang bersejarah',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 3,
      createdBy: admin.id,
    },
    {
      nama: 'Pantai Batu Hiu',
      slug: 'pantai-batu-hiu',
      deskripsi: 'Pantai eksotis dengan formasi batu karang menyerupai sirip hiu yang menjulang di tengah laut. Spot foto Instagram yang sangat populer dengan pemandangan sunset spektakuler. Ombak cukup besar sehingga tidak disarankan untuk berenang. Cocok untuk foto pre-wedding dan fotografi landscape.',
      kategori: 'PANTAI' as KategoriDestinasi,
      lokasi: 'Cimerak',
      alamat: 'Desa Cimerak, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.768889,108.595833',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Batu+Hiu+Pangandaran',
      rating: 4.6,
      jumlahReview: 987,
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 4,
      createdBy: admin.id,
    },
    {
      nama: 'Pantai Batu Karas',
      slug: 'pantai-batu-karas',
      deskripsi: 'Surga surfing di Pangandaran dengan ombak konsisten sepanjang tahun. Pantai dengan pasir hitam vulkanik dan air laut yang jernih. Terdapat berbagai sekolah surfing untuk pemula dan rental papan selancar. Suasana tenang dan tidak terlalu ramai, cocok untuk relaksasi dan menikmati keindahan alam.',
      kategori: 'PANTAI' as KategoriDestinasi,
      lokasi: 'Cijulang',
      alamat: 'Desa Cijulang, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.732222,108.524167',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Batu+Karas',
      rating: 4.7,
      jumlahReview: 756,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 5,
      createdBy: admin.id,
    },
    {
      nama: 'Goa Buniayu',
      slug: 'goa-buniayu',
      deskripsi: 'Goa alami dengan stalaktit dan stalagmit yang indah. Memiliki 3 ruangan utama dengan formasi batu yang unik. Dilengkapi dengan pencahayaan untuk memudahkan pengunjung menjelajah. Suhu di dalam goa sejuk dan terdapat kolam air alami. Cocok untuk wisata edukasi dan petualangan keluarga.',
      kategori: 'GOA' as KategoriDestinasi,
      lokasi: 'Cijulang',
      alamat: 'Desa Buniayu, Cijulang, Pangandaran, Jawa Barat',
      koordinat: '-7.715000,108.503333',
      googleMapsUrl: 'https://maps.google.com/?q=Goa+Buniayu+Pangandaran',
      rating: 4.4,
      jumlahReview: 423,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 6,
      createdBy: admin2.id,
    },
    {
      nama: 'Kampung Turis Cijulang',
      slug: 'kampung-turis-cijulang',
      deskripsi: 'Desa wisata yang menawarkan pengalaman hidup bersama masyarakat lokal. Belajar membuat kerajinan tradisional, mengikuti aktivitas pertanian, dan menikmati kuliner khas desa. Homestay tradisional tersedia dengan harga terjangkau. Program edukasi budaya dan lingkungan untuk pelajar.',
      kategori: 'KAMPUNG_TURIS' as KategoriDestinasi,
      lokasi: 'Cijulang',
      alamat: 'Desa Cijulang, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.720000,108.510000',
      googleMapsUrl: 'https://maps.google.com/?q=Kampung+Turis+Cijulang',
      rating: 4.5,
      jumlahReview: 289,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 7,
      createdBy: admin2.id,
    },
    {
      nama: 'Citumang Body Rafting',
      slug: 'citumang-body-rafting',
      deskripsi: 'Destinasi body rafting dengan sungai alami yang jernih dan arus sedang. Cocok untuk pemula dan keluarga. Nikmati sensasi mengapung di sungai dengan pelampung dan helm safety. Terdapat beberapa spot jumping dari ketinggian 2-5 meter. Pemanduan oleh guide berpengalaman dan peralatan lengkap tersedia.',
      kategori: 'WAHANA_AIR' as KategoriDestinasi,
      lokasi: 'Cijulang',
      alamat: 'Desa Kertayasa, Cijulang, Pangandaran, Jawa Barat',
      koordinat: '-7.705000,108.495000',
      googleMapsUrl: 'https://maps.google.com/?q=Citumang+Body+Rafting',
      rating: 4.8,
      jumlahReview: 1523,
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 8,
      createdBy: admin.id,
    },
    {
      nama: 'Santirah River Tubing',
      slug: 'santirah-river-tubing',
      deskripsi: 'Aktivitas river tubing menyusuri sungai Santirah sepanjang 3 km dengan pemandangan alam yang asri. Menggunakan ban pelampung khusus dengan safety standar internasional. Cocok untuk family gathering dan team building. Terdapat area piknik dan camping ground di sekitar sungai.',
      kategori: 'WAHANA_AIR' as KategoriDestinasi,
      lokasi: 'Parigi',
      alamat: 'Desa Santirah, Parigi, Pangandaran, Jawa Barat',
      koordinat: '-7.678000,108.582000',
      googleMapsUrl: 'https://maps.google.com/?q=Santirah+River+Tubing',
      rating: 4.6,
      jumlahReview: 678,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 9,
      createdBy: admin2.id,
    },
    {
      nama: 'Batu Nunggul Beach',
      slug: 'batu-nunggul-beach',
      deskripsi: 'Pantai tersembunyi dengan batu karang raksasa menjulang setinggi 15 meter di tengah laut. Air laut jernih dengan gradasi warna biru yang indah. Ombak tenang cocok untuk berenang dan snorkeling. Spot sunrise terbaik di Pangandaran. Masih alami dan belum banyak pengunjung.',
      kategori: 'PANTAI' as KategoriDestinasi,
      lokasi: 'Parigi',
      alamat: 'Desa Karangsari, Parigi, Pangandaran, Jawa Barat',
      koordinat: '-7.701000,108.671000',
      googleMapsUrl: 'https://maps.google.com/?q=Batu+Nunggul+Beach',
      rating: 4.5,
      jumlahReview: 234,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 10,
      createdBy: admin2.id,
    },
    {
      nama: 'Pantai Madasari',
      slug: 'pantai-madasari',
      deskripsi: 'Pantai dengan pemandangan taman bunga colorful di sepanjang pesisir. Konsep taman edukasi dan rekreasi yang cocok untuk keluarga. Terdapat berbagai spot foto instagramable dengan latar bunga dan laut. Fasilitas lengkap dengan playground anak, gazebo, dan area kuliner.',
      kategori: 'PANTAI' as KategoriDestinasi,
      lokasi: 'Parigi',
      alamat: 'Desa Madasari, Parigi, Pangandaran, Jawa Barat',
      koordinat: '-7.712000,108.679000',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Madasari',
      rating: 4.3,
      jumlahReview: 456,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 11,
      createdBy: admin.id,
    },
    {
      nama: 'Situs Karang Nini',
      slug: 'situs-karang-nini',
      deskripsi: 'Situs megalitikum dengan batu menhir berusia ribuan tahun. Tempat bersejarah yang dianggap keramat oleh masyarakat setempat. Terdapat formasi batu alam yang unik dan area terbuka untuk meditasi. Pemandangan alam pegunungan yang asri. Wisata edukasi sejarah dan budaya Pangandaran.',
      kategori: 'WISATA_BUDAYA' as KategoriDestinasi,
      lokasi: 'Cijulang',
      alamat: 'Desa Karang Nini, Cijulang, Pangandaran, Jawa Barat',
      koordinat: '-7.693000,108.456000',
      googleMapsUrl: 'https://maps.google.com/?q=Situs+Karang+Nini',
      rating: 4.2,
      jumlahReview: 167,
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 12,
      createdBy: admin2.id,
    },
  ]

  for (const data of destinasiData) {
    const destinasi = await prisma.destinasi.create({
      data,
    })

    // Add sample images (3-5 images per destinasi)
    const imageCount = Math.floor(Math.random() * 3) + 3 // 3-5 images
    const images = []
    for (let i = 0; i < imageCount; i++) {
      images.push({
        destinasiId: destinasi.id,
        url: `https://picsum.photos/seed/${destinasi.slug}-${i}/1200/800`,
        caption: i === 0 ? 'Pemandangan utama' : `Suasana ${i === 1 ? 'sore' : i === 2 ? 'pagi' : i === 3 ? 'siang' : 'malam'}`,
        isPrimary: i === 0,
        urutan: i + 1,
      })
    }
    await prisma.destinasiImage.createMany({ data: images })

    // Add pricing based on category
    const pricingData = []
    if (data.kategori === 'PANTAI') {
      pricingData.push(
        { destinasiId: destinasi.id, jenisHarga: 'Tiket Masuk Dewasa', harga: 15000, urutan: 1 },
        { destinasiId: destinasi.id, jenisHarga: 'Tiket Masuk Anak-anak', harga: 10000, urutan: 2 },
        { destinasiId: destinasi.id, jenisHarga: 'Parkir Motor', harga: 5000, urutan: 3 },
        { destinasiId: destinasi.id, jenisHarga: 'Parkir Mobil', harga: 10000, urutan: 4 },
      )
    } else if (data.kategori === 'WISATA_BAHARI' || data.kategori === 'WAHANA_AIR') {
      pricingData.push(
        { destinasiId: destinasi.id, jenisHarga: 'Paket Wisata + Guide', harga: 150000, keterangan: 'Include peralatan safety', urutan: 1 },
        { destinasiId: destinasi.id, jenisHarga: 'Sewa Pelampung', harga: 25000, urutan: 2 },
        { destinasiId: destinasi.id, jenisHarga: 'Dokumentasi (Gopro)', harga: 50000, keterangan: 'File langsung dikirim', urutan: 3 },
      )
    } else if (data.kategori === 'CAGAR_ALAM' || data.kategori === 'GOA') {
      pricingData.push(
        { destinasiId: destinasi.id, jenisHarga: 'Tiket Masuk', harga: 10000, urutan: 1 },
        { destinasiId: destinasi.id, jenisHarga: 'Guide (opsional)', harga: 50000, keterangan: 'Per grup max 10 orang', urutan: 2 },
      )
    } else {
      pricingData.push(
        { destinasiId: destinasi.id, jenisHarga: 'Tiket Masuk', harga: 5000, urutan: 1 },
      )
    }
    if (pricingData.length > 0) {
      await prisma.destinasiHarga.createMany({ data: pricingData })
    }

    // Add detail information
    const detailData = []
    detailData.push(
      { 
        destinasiId: destinasi.id, 
        jenis: 'FASILITAS' as JenisDetail, 
        judul: 'Fasilitas Tersedia', 
        konten: 'Area parkir luas\nToilet bersih\nMushola\nWarung makan\nGazebo/Saung\nPenyewaan ban/pelampung\nPos keamanan 24 jam', 
        urutan: 1 
      },
      { 
        destinasiId: destinasi.id, 
        jenis: 'AKTIVITAS' as JenisDetail, 
        judul: 'Aktivitas yang Bisa Dilakukan', 
        konten: 'Berenang dan bermain air\nFotografi landscape\nPiknik keluarga\nSurfing (musim ombak)\nSnorkeling\nMemancing\nCamping (area khusus)', 
        urutan: 2 
      },
      { 
        destinasiId: destinasi.id, 
        jenis: 'TIPS' as JenisDetail, 
        judul: 'Tips Berkunjung', 
        konten: 'Datang pagi hari untuk menghindari keramaian\nBawa sunblock dan topi\nJaga kebersihan dengan tidak membuang sampah sembarangan\nPerhatikan rambu keselamatan\nBawa pakaian ganti\nSiapkan uang cash untuk parkir dan tiket', 
        urutan: 3 
      },
      { 
        destinasiId: destinasi.id, 
        jenis: 'AKSES' as JenisDetail, 
        judul: 'Cara Menuju Lokasi', 
        konten: 'Dari pusat kota Pangandaran:\n- Berkendara sekitar 15-30 menit\n- Jalan beraspal mulus\n- Tersedia angkutan umum dan ojek online\n- GPS: ' + data.koordinat + '\nPetunjuk jalan cukup jelas dengan signage', 
        urutan: 4 
      },
      { 
        destinasiId: destinasi.id, 
        jenis: 'ATURAN' as JenisDetail, 
        judul: 'Peraturan Berkunjung', 
        konten: 'Dilarang membawa minuman beralkohol\nWajib menjaga kebersihan\nDisarankan menggunakan sunblock ramah lingkungan\nIkuti instruksi guide dan petugas\nJam operasional: 06:00 - 18:00 WIB\nBayi dan anak kecil wajib dalam pengawasan', 
        urutan: 5 
      },
    )
    await prisma.destinasiDetail.createMany({ data: detailData })

    console.log(`✅ Created destinasi: ${destinasi.nama}`)
  }

  // Create Comprehensive Events
  const events = [
    {
      nama: 'Festival Pantai Pangandaran 2026',
      slug: 'festival-pantai-pangandaran-2026',
      deskripsi: 'Festival tahunan yang menampilkan kebudayaan lokal, kuliner khas, dan berbagai lomba pantai. Acara meriah untuk keluarga dengan berbagai hiburan menarik. Menampilkan pertunjukan musik tradisional dan modern, lomba layang-layang, lomba perahu hias, dan bazar kuliner nusantara. Gratis untuk umum!',
      lokasi: 'Pantai Barat Pangandaran',
      alamat: 'Jl. Pantai Barat, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Barat+Pangandaran',
      tanggalMulai: new Date('2026-07-15'),
      tanggalSelesai: new Date('2026-07-17'),
      jamMulai: '08:00',
      jamSelesai: '22:00',
      gambar: 'https://picsum.photos/seed/festival-pantai/1200/800',
      thumbnail: 'https://picsum.photos/seed/festival-pantai/400/300',
      kontakPerson: 'Dinas Pariwisata Pangandaran',
      nomorTelepon: '0265-639123',
      hargaTiket: 'GRATIS',
      status: StatusPublish.PUBLISHED,
      featured: true,
      createdBy: admin.id,
    },
    {
      nama: 'Pangandaran Jazz Festival 2026',
      slug: 'pangandaran-jazz-festival-2026',
      deskripsi: 'Festival musik jazz terbesar di Pangandaran yang menghadirkan musisi jazz nasional dan internasional. Diadakan di tepi pantai dengan sunset view yang memukau. Food court dengan berbagai pilihan kuliner lokal dan internasional.',
      lokasi: 'Pantai Timur Pangandaran',
      alamat: 'Pantai Timur, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.702778,108.666667',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Timur+Pangandaran',
      tanggalMulai: new Date('2026-08-20'),
      tanggalSelesai: new Date('2026-08-21'),
      jamMulai: '16:00',
      jamSelesai: '23:00',
      gambar: 'https://picsum.photos/seed/jazz-festival/1200/800',
      thumbnail: 'https://picsum.photos/seed/jazz-festival/400/300',
      kontakPerson: 'Pangandaran Events',
      nomorTelepon: '0812-3456-7890',
      hargaTiket: 'Presale: Rp 150.000 | On The Spot: Rp 200.000',
      status: StatusPublish.PUBLISHED,
      featured: true,
      createdBy: admin.id,
    },
    {
      nama: 'Lomba Perahu Tradisional',
      slug: 'lomba-perahu-tradisional-2026',
      deskripsi: 'Kompetisi perahu tradisional dengan peserta dari berbagai daerah. Lomba dilakukan di perairan Pantai Pangandaran dengan rute sepanjang 2 km. Hadiah total puluhan juta rupiah. Terbuka untuk umum sebagai penonton.',
      lokasi: 'Pantai Barat Pangandaran',
      alamat: 'Jl. Pantai Barat, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Barat+Pangandaran',
      tanggalMulai: new Date('2026-09-05'),
      tanggalSelesai: new Date('2026-09-05'),
      jamMulai: '07:00',
      jamSelesai: '15:00',
      gambar: 'https://picsum.photos/seed/lomba-perahu/1200/800',
      kontakPerson: 'Panitia Lomba',
      nomorTelepon: '0813-4567-8901',
      hargaTiket: 'GRATIS untuk penonton',
      status: StatusPublish.PUBLISHED,
      featured: false,
      createdBy: admin2.id,
    },
    {
      nama: 'Kuliner Night Market Pangandaran',
      slug: 'kuliner-night-market-2026',
      deskripsi: 'Pasar malam kuliner yang diadakan setiap akhir pekan menampilkan berbagai makanan tradisional dan modern. Lebih dari 100 tenant kuliner, live music, dan games untuk anak-anak. Suasana meriah dan family friendly.',
      lokasi: 'Alun-alun Pangandaran',
      alamat: 'Alun-alun Pangandaran, Jawa Barat 46396',
      koordinat: '-7.688000,108.655000',
      googleMapsUrl: 'https://maps.google.com/?q=Alun-alun+Pangandaran',
      tanggalMulai: new Date('2026-01-10'),
      tanggalSelesai: new Date('2026-12-27'),
      jamMulai: '18:00',
      jamSelesai: '23:00',
      gambar: 'https://picsum.photos/seed/night-market/1200/800',
      kontakPerson: 'Pengelola Night Market',
      nomorTelepon: '0821-3456-7890',
      hargaTiket: 'GRATIS',
      status: StatusPublish.PUBLISHED,
      featured: true,
      createdBy: admin.id,
    },
    {
      nama: 'Pangandaran Triathlon Championship',
      slug: 'pangandaran-triathlon-2026',
      deskripsi: 'Kompetisi triathlon bergengsi yang menggabungkan berenang, bersepeda, dan lari. Rute melewati destinasi wisata indah di Pangandaran. Kategori professional dan amateur. Terbuka untuk peserta nasional dan internasional.',
      lokasi: 'Start: Pantai Barat | Finish: Pantai Timur',
      alamat: 'Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Pangandaran',
      tanggalMulai: new Date('2026-10-12'),
      tanggalSelesai: new Date('2026-10-12'),
      jamMulai: '05:00',
      jamSelesai: '14:00',
      gambar: 'https://picsum.photos/seed/triathlon/1200/800',
      kontakPerson: 'Pangandaran Sports',
      nomorTelepon: '0822-5678-9012',
      hargaTiket: 'Pendaftaran: Rp 500.000 - Rp 1.000.000',
      status: StatusPublish.PUBLISHED,
      featured: true,
      createdBy: admin2.id,
    },
    {
      nama: 'Workshop Fotografi Pantai',
      slug: 'workshop-fotografi-pantai-2026',
      deskripsi: 'Workshop fotografi landscape dan sunset khusus untuk pemula hingga menengah. Dipandu oleh fotografer profesional. Peserta akan belajar teknik komposisi, lighting, dan editing. Include sertifikat dan makan siang.',
      lokasi: 'Pantai Batu Hiu',
      alamat: 'Desa Cimerak, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.768889,108.595833',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Batu+Hiu',
      tanggalMulai: new Date('2026-03-15'),
      tanggalSelesai: new Date('2026-03-15'),
      jamMulai: '14:00',
      jamSelesai: '19:00',
      gambar: 'https://picsum.photos/seed/workshop-foto/1200/800',
      kontakPerson: 'Pangandaran Photography Club',
      nomorTelepon: '0823-6789-0123',
      hargaTiket: 'Rp 350.000 per peserta (max 20 orang)',
      status: StatusPublish.PUBLISHED,
      featured: false,
      createdBy: admin.id,
    },
    {
      nama: 'Peringatan Hari Lingkungan Hidup',
      slug: 'hari-lingkungan-hidup-2026',
      deskripsi: 'Aksi bersih pantai dan tanam mangrove untuk menjaga kelestarian alam Pangandaran. Diikuti ratusan relawan dari berbagai komunitas. Ada talk show tentang konservasi laut dan doorprize menarik.',
      lokasi: 'Pantai Barat & Area Mangrove',
      alamat: 'Pantai Barat, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Barat+Pangandaran',
      tanggalMulai: new Date('2026-06-05'),
      tanggalSelesai: new Date('2026-06-05'),
      jamMulai: '06:00',
      jamSelesai: '12:00',
      gambar: 'https://picsum.photos/seed/lingkungan/1200/800',
      kontakPerson: 'Dinas Lingkungan Hidup',
      nomorTelepon: '0265-639456',
      hargaTiket: 'GRATIS (Pendaftaran wajib)',
      status: StatusPublish.PUBLISHED,
      featured: false,
      createdBy: admin2.id,
    },
    {
      nama: 'Surfing Competition Batu Karas',
      slug: 'surfing-competition-2026',
      deskripsi: 'Kompetisi surfing dengan hadiah total 50 juta rupiah. Kategori pro dan junior. Spot surfing terbaik di Pangandaran dengan ombak konsisten. Ratusan surfer dari seluruh Indonesia berkompetisi.',
      lokasi: 'Pantai Batu Karas',
      alamat: 'Desa Cijulang, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.732222,108.524167',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Batu+Karas',
      tanggalMulai: new Date('2026-11-20'),
      tanggalSelesai: new Date('2026-11-22'),
      jamMulai: '07:00',
      jamSelesai: '17:00',
      gambar: 'https://picsum.photos/seed/surfing/1200/800',
      kontakPerson: 'Batu Karas Surf Club',
      nomorTelepon: '0824-7890-1234',
      hargaTiket: 'GRATIS untuk penonton',
      status: StatusPublish.PUBLISHED,
      featured: true,
      createdBy: admin.id,
    },
  ]

  for (const eventData of events) {
    const event = await prisma.event.create({
      data: eventData,
    })
    console.log(`✅ Created event: ${event.nama}`)
  }

  // Create Comprehensive Galeri
  const galeriData = [
    { judul: 'Sunset Spektakuler Pantai Barat', deskripsi: 'Pemandangan sunset yang menakjubkan di Pantai Barat Pangandaran', url: 'https://picsum.photos/seed/sunset1/1200/800', kategori: 'SUNSET' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: true, urutan: 1, uploadedBy: admin.id },
    { judul: 'Green Canyon dari Atas', deskripsi: 'View aerial Green Canyon yang menakjubkan', url: 'https://picsum.photos/seed/greencanyon1/1200/800', kategori: 'PANTAI' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: true, urutan: 2, uploadedBy: admin.id },
    { judul: 'Sunrise di Pantai Timur', deskripsi: 'Momen matahari terbit yang memukau', url: 'https://picsum.photos/seed/sunrise1/1200/800', kategori: 'SUNRISE' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: true, urutan: 3, uploadedBy: admin.id },
    { judul: 'Kuliner Seafood Segar', deskripsi: 'Hidangan seafood khas Pangandaran yang menggugah selera', url: 'https://picsum.photos/seed/seafood1/1200/800', kategori: 'KULINER' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 4, uploadedBy: admin2.id },
    { judul: 'Tarian Tradisional Ronggeng Bugis', deskripsi: 'Pertunjukan tarian tradisional khas Pangandaran', url: 'https://picsum.photos/seed/budaya1/1200/800', kategori: 'BUDAYA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 5, uploadedBy: admin2.id },
    { judul: 'Body Rafting Green Canyon', deskripsi: 'Serunya body rafting di sungai hijau tosca', url: 'https://picsum.photos/seed/rafting1/1200/800', kategori: 'WAHANA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: true, urutan: 6, uploadedBy: admin.id },
    { judul: 'Underwater Snorkeling', deskripsi: 'Keindahan bawah laut Pangandaran', url: 'https://picsum.photos/seed/underwater1/1200/800', kategori: 'UNDERWATER' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 7, uploadedBy: admin.id },
    { judul: 'Batu Hiu Formasi Unik', deskripsi: 'Batu karang berbentuk sirip hiu yang ikonik', url: 'https://picsum.photos/seed/batuhiu1/1200/800', kategori: 'PANTAI' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: true, urutan: 8, uploadedBy: admin2.id },
    { judul: 'Festival Layang-layang', deskripsi: 'Ratusan layang-layang menghiasi langit Pangandaran', url: 'https://picsum.photos/seed/event1/1200/800', kategori: 'EVENT' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 9, uploadedBy: admin.id },
    { judul: 'Camping di Tepi Pantai', deskripsi: 'Suasana camping dengan view laut lepas', url: 'https://picsum.photos/seed/camping1/1200/800', kategori: 'PANTAI' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 10, uploadedBy: admin2.id },
    { judul: 'Ikan Bakar Khas Pangandaran', deskripsi: 'Ikan segar dibakar dengan bumbu rahasia', url: 'https://picsum.photos/seed/ikanbakar/1200/800', kategori: 'KULINER' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 11, uploadedBy: admin.id },
    { judul: 'Monyet di Cagar Alam', deskripsi: 'Monyet ekor panjang yang jinak di Pananjung', url: 'https://picsum.photos/seed/monyet/1200/800', kategori: 'LAINNYA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 12, uploadedBy: admin.id },
    { judul: 'Surfer di Batu Karas', deskripsi: 'Aksi surfer menaklukkan ombak Batu Karas', url: 'https://picsum.photos/seed/surfer/1200/800', kategori: 'WAHANA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: true, urutan: 13, uploadedBy: admin2.id },
    { judul: 'Pemandangan dari Bukit Pananjung', deskripsi: 'View 360 derajat dari atas bukit Pananjung', url: 'https://picsum.photos/seed/bukit/1200/800', kategori: 'PANTAI' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 14, uploadedBy: admin.id },
    { judul: 'Night Market Kuliner', deskripsi: 'Suasana meriah pasar malam kuliner', url: 'https://picsum.photos/seed/nightmarket/1200/800', kategori: 'EVENT' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 15, uploadedBy: admin2.id },
    { judul: 'Coral Reef Underwater', deskripsi: 'Terumbu karang yang masih terjaga', url: 'https://picsum.photos/seed/coral/1200/800', kategori: 'UNDERWATER' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 16, uploadedBy: admin.id },
    { judul: 'Perahu Nelayan Tradisional', deskripsi: 'Perahu nelayan saat sore hari', url: 'https://picsum.photos/seed/perahu/1200/800', kategori: 'BUDAYA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 17, uploadedBy: admin2.id },
    { judul: 'Cliff Jumping Green Canyon', deskripsi: 'Melompat dari tebing setinggi 5 meter', url: 'https://picsum.photos/seed/cliffjump/1200/800', kategori: 'WAHANA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 18, uploadedBy: admin.id },
    { judul: 'Pemandangan Goa Stalaktit', deskripsi: 'Formasi stalaktit dan stalagmit di Goa Buniayu', url: 'https://picsum.photos/seed/goa/1200/800', kategori: 'LAINNYA' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 19, uploadedBy: admin.id },
    { judul: 'Festival Jazz di Tepi Pantai', deskripsi: 'Konser musik jazz dengan background sunset', url: 'https://picsum.photos/seed/jazz/1200/800', kategori: 'EVENT' as KategoriGaleri, tipeMedia: 'IMAGE' as TipeMedia, featured: false, urutan: 20, uploadedBy: admin2.id },
  ]

  for (const data of galeriData) {
    const galeri = await prisma.galeri.create({ data })
    console.log(`✅ Created galeri: ${galeri.judul}`)
  }

  // Create Comprehensive Informasi Umum
  const informasiData = [
    {
      kategori: 'SEJARAH' as KategoriInfo,
      judul: 'Sejarah Pangandaran',
      slug: 'sejarah-pangandaran',
      konten: 'Pangandaran memiliki sejarah panjang sejak zaman kerajaan. Nama Pangandaran berasal dari kata "Pangeran Dalem" yang merupakan putra dari Prabu Siliwangi. Wilayah ini pernah menjadi pelabuhan penting pada masa kerajaan Galuh. Pada tahun 2012, Pangandaran resmi menjadi kabupaten yang terpisah dari Kabupaten Ciamis.',
      icon: '📜',
      status: StatusPublish.PUBLISHED,
      urutan: 1,
      createdBy: admin.id,
    },
    {
      kategori: 'GEOGRAFI' as KategoriInfo,
      judul: 'Geografi dan Iklim',
      slug: 'geografi-dan-iklim',
      konten: 'Pangandaran terletak di pesisir selatan Jawa Barat dengan luas wilayah 1.010 km². Memiliki garis pantai sepanjang 91 km yang menghadap Samudra Hindia. Iklim tropis dengan suhu rata-rata 26-30°C. Musim kemarau April-Oktober, musim hujan November-Maret.',
      icon: '🌍',
      status: StatusPublish.PUBLISHED,
      urutan: 2,
      createdBy: admin.id,
    },
    {
      kategori: 'TRANSPORTASI' as KategoriInfo,
      judul: 'Akses dan Transportasi',
      slug: 'akses-transportasi',
      konten: 'Dari Jakarta: 7-8 jam via tol Cipularang-Kanci (380 km)\nDari Bandung: 5-6 jam (230 km)\nDari Yogyakarta: 6-7 jam (320 km)\n\nTransportasi lokal:\n- Ojek online (Gojek, Grab)\n- Angkutan umum (elf, travel)\n- Rental motor/mobil\n- Becak\n\nTerminal: Terminal Pangandaran\nBandara terdekat: Bandara Nusawiru (60 km)',
      icon: '🚗',
      status: StatusPublish.PUBLISHED,
      urutan: 3,
      createdBy: admin.id,
    },
    {
      kategori: 'AKOMODASI' as KategoriInfo,
      judul: 'Pilihan Akomodasi',
      slug: 'pilihan-akomodasi',
      konten: 'Pangandaran menyediakan berbagai pilihan penginapan:\n\n🏨 Hotel Bintang (Rp 500.000 - 2.000.000)\n🏡 Villa & Resort (Rp 800.000 - 3.000.000)\n🏠 Homestay (Rp 150.000 - 400.000)\n🏕️ Camping Ground (Rp 50.000 - 150.000)\n\nArea populer: Pantai Barat, Pantai Timur, Cijulang.\nBooking online: Traveloka, Tiket.com, Agoda, Booking.com',
      icon: '🏨',
      status: StatusPublish.PUBLISHED,
      urutan: 4,
      createdBy: admin2.id,
    },
    {
      kategori: 'TIPS_WISATA' as KategoriInfo,
      judul: 'Tips Wisata ke Pangandaran',
      slug: 'tips-wisata-pangandaran',
      konten: 'Waktu terbaik: April-Oktober (musim kemarau)\n\nBarang yang dibawa:\n✅ Sunblock SPF 50+\n✅ Pakaian renang & ganti\n✅ Topi & kacamata hitam\n✅ Obat-obatan pribadi\n✅ Powerbank\n✅ Kamera/HP waterproof\n✅ Uang cash (banyak tempat belum ada EDC)\n\nHal yang perlu diperhatikan:\n⚠️ Perhatikan jadwal pasang-surut air laut\n⚠️ Jangan berenang saat bendera merah\n⚠️ Jaga barang berharga\n⚠️ Patuhi aturan cagar alam',
      icon: '💡',
      status: StatusPublish.PUBLISHED,
      urutan: 5,
      createdBy: admin.id,
    },
    {
      kategori: 'KONTAK_PENTING' as KategoriInfo,
      judul: 'Kontak Darurat',
      slug: 'kontak-darurat',
      konten: '🚨 Nomor Darurat:\nPolisi: 110\nAmbulans: 118\nPemadam Kebakaran: 113\nBasarnas: 115\n\n🏥 Rumah Sakit:\nRSUD Pangandaran: (0265) 639065\n\n🏛️ Instansi:\nDinas Pariwisata: (0265) 639123\nPolres Pangandaran: (0265) 639110\nKantor Pos: (0265) 639056\n\n📱 Informasi Wisata:\nWhatsApp: 0812-xxxx-xxxx\nEmail: info@wisatapangandaran.com',
      icon: '📞',
      status: StatusPublish.PUBLISHED,
      urutan: 6,
      createdBy: admin2.id,
    },
    {
      kategori: 'FAQ' as KategoriInfo,
      judul: 'Pertanyaan yang Sering Ditanyakan',
      slug: 'faq',
      konten: 'Q: Kapan waktu terbaik berkunjung?\nA: April-Oktober saat musim kemarau, cuaca cerah ideal untuk aktivitas pantai.\n\nQ: Berapa budget minimal liburan ke Pangandaran?\nA: Budget backpacker: Rp 300.000-500.000/hari. Budget keluarga: Rp 1.000.000-2.000.000/hari.\n\nQ: Apakah aman berenang di pantai?\nA: Aman saat bendera hijau. Hindari saat bendera merah dan perhatikan peringatan petugas.\n\nQ: Apakah ada ATM?\nA: Ada beberapa ATM di pusat kota (BRI, BCA, Mandiri, BNI).\n\nQ: Makanan khas apa yang wajib dicoba?\nA: Ikan bakar, seafood segar, nasi lengko, rujak kangkung, pangandaran delight.',
      icon: '❓',
      status: StatusPublish.PUBLISHED,
      urutan: 7,
      createdBy: admin.id,
    },
  ]

  for (const data of informasiData) {
    const info = await prisma.informasiUmum.create({ data })
    console.log(`✅ Created informasi: ${info.judul}`)
  }

  // Create Comprehensive Kuliner
  const kulinerData = [
    {
      nama: 'Warung Seafood Pak Ujang',
      slug: 'warung-seafood-pak-ujang',
      deskripsi: 'Warung seafood legendaris dengan menu ikan segar pilihan. Bumbu rahasia khas Pangandaran membuat rasa tak terlupakan. Lokasi strategis di tepi pantai dengan view sunset. Tempat favorit wisatawan lokal dan mancanegara.',
      kategori: 'Restoran',
      lokasi: 'Pantai Barat',
      alamat: 'Jl. Pantai Barat No. 45, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Warung+Seafood+Pak+Ujang',
      hargaMin: 50000,
      hargaMax: 200000,
      nomorTelepon: '0812-3456-7890',
      jamBuka: 'Setiap hari: 10:00 - 22:00 WIB',
      gambar: ['https://picsum.photos/seed/pakujang1/800/600', 'https://picsum.photos/seed/pakujang2/800/600'],
      rating: 4.8,
      status: StatusPublish.PUBLISHED,
      featured: true,
    },
    {
      nama: 'Depot Bu Tini',
      slug: 'depot-bu-tini',
      deskripsi: 'Depot masakan rumahan dengan harga terjangkau. Menu nasi lengko, soto, dan ayam goreng menjadi favorit. Porsi besar dan rasa autentik khas Jawa Barat. Buka sejak pagi untuk sarapan.',
      kategori: 'Warung',
      lokasi: 'Pusat Kota',
      alamat: 'Jl. Kidang Pananjung No. 23, Pangandaran',
      koordinat: '-7.688000,108.655000',
      hargaMin: 15000,
      hargaMax: 35000,
      nomorTelepon: '0813-2345-6789',
      jamBuka: 'Setiap hari: 06:00 - 21:00 WIB',
      gambar: ['https://picsum.photos/seed/butini1/800/600'],
      rating: 4.6,
      status: StatusPublish.PUBLISHED,
      featured: false,
    },
    {
      nama: 'Kopi Aroma Laut',
      slug: 'kopi-aroma-laut',
      deskripsi: 'Cafe modern dengan konsep semi outdoor menghadap laut. Menyajikan berbagai jenis kopi arabika dan robusta lokal. Menu makanan ringan dan dessert tersedia. WiFi gratis dan instagramable banget!',
      kategori: 'Cafe',
      lokasi: 'Pantai Timur',
      alamat: 'Jl. Pantai Timur No. 12, Pangandaran',
      koordinat: '-7.702778,108.666667',
      hargaMin: 20000,
      hargaMax: 75000,
      nomorTelepon: '0821-4567-8901',
      jamBuka: 'Setiap hari: 08:00 - 23:00 WIB',
      gambar: ['https://picsum.photos/seed/kopiaroma1/800/600', 'https://picsum.photos/seed/kopiaroma2/800/600'],
      rating: 4.7,
      status: StatusPublish.PUBLISHED,
      featured: true,
    },
    {
      nama: 'Rujak Kangkung Mang Ade',
      slug: 'rujak-kangkung-mang-ade',
      deskripsi: 'Rujak kangkung legendaris dengan bumbu kacang yang khas. Kangkung segar direbus dengan tingkat kematangan pas. Bumbu kacang dibuat dari resep turun temurun. Wajib dicoba saat ke Pangandaran!',
      kategori: 'Warung',
      lokasi: 'Dekat Alun-alun',
      alamat: 'Jl. Merdeka No. 67, Pangandaran',
      koordinat: '-7.688500,108.654500',
      hargaMin: 10000,
      hargaMax: 25000,
      nomorTelepon: '0822-5678-9012',
      jamBuka: 'Setiap hari: 15:00 - 22:00 WIB',
      gambar: ['https://picsum.photos/seed/rujakkangkung/800/600'],
      rating: 4.9,
      status: StatusPublish.PUBLISHED,
      featured: true,
    },
    {
      nama: 'Ikan Bakar Cipta Rasa',
      slug: 'ikan-bakar-cipta-rasa',
      deskripsi: 'Spesialis ikan bakar dengan berbagai pilihan sambal. Ikan segar langsung dari nelayan. Bisa pilih ikan sendiri dan cara masak sesuai selera. Paket nasi liwet dengan lauk lengkap tersedia.',
      kategori: 'Restoran',
      lokasi: 'Pantai Barat',
      alamat: 'Jl. Pantai Barat No. 78, Pangandaran',
      koordinat: '-7.685000,108.649000',
      hargaMin: 40000,
      hargaMax: 150000,
      nomorTelepon: '0823-6789-0123',
      jamBuka: 'Setiap hari: 11:00 - 22:00 WIB',
      gambar: ['https://picsum.photos/seed/ciptarasa1/800/600'],
      rating: 4.7,
      status: StatusPublish.PUBLISHED,
      featured: false,
    },
    {
      nama: 'Sate Maranggi Pak Kumis',
      slug: 'sate-maranggi-pak-kumis',
      deskripsi: 'Sate maranggi dengan bumbu khas dan daging empuk. Dibakar menggunakan arang kayu pilihan. Sambal kecap dan kecap manis melengkapi cita rasa. Cocok untuk makan malam bersama keluarga.',
      kategori: 'Warung',
      lokasi: 'Cijulang',
      alamat: 'Jl. Cijulang Raya No. 34, Pangandaran',
      koordinat: '-7.720000,108.510000',
      hargaMin: 25000,
      hargaMax: 60000,
      nomorTelepon: '0824-7890-1234',
      jamBuka: 'Setiap hari: 16:00 - 23:00 WIB',
      gambar: ['https://picsum.photos/seed/satemaranggi/800/600'],
      rating: 4.5,
      status: StatusPublish.PUBLISHED,
      featured: false,
    },
    {
      nama: 'Bakso Seuseupan Kang Asep',
      slug: 'bakso-seuseupan-kang-asep',
      deskripsi: 'Bakso jumbo dengan isian yang melimpah. Kuah kaldu segar tanpa MSG. Tersedia bakso urat, bakso halus, dan bakso beranak. Mie kuning homemade menambah kelezatan.',
      kategori: 'Warung',
      lokasi: 'Pusat Kota',
      alamat: 'Jl. Raya Pangandaran No. 89, Pangandaran',
      koordinat: '-7.687000,108.656000',
      hargaMin: 15000,
      hargaMax: 35000,
      nomorTelepon: '0825-8901-2345',
      jamBuka: 'Setiap hari: 09:00 - 21:00 WIB',
      gambar: ['https://picsum.photos/seed/bakso/800/600'],
      rating: 4.6,
      status: StatusPublish.PUBLISHED,
      featured: false,
    },
    {
      nama: 'Cendol Elizabeth',
      slug: 'cendol-elizabeth',
      deskripsi: 'Cendol legendaris dengan santan kental dan gula merah asli. Es serut halus dibuat manual. Topping durian dan tape ketan menambah kesegaran. Cocok untuk penghilang dahaga setelah main di pantai.',
      kategori: 'Warung',
      lokasi: 'Dekat Pasar',
      alamat: 'Jl. Pasar Pangandaran No. 12, Pangandaran',
      koordinat: '-7.689000,108.653000',
      hargaMin: 8000,
      hargaMax: 20000,
      nomorTelepon: '0826-9012-3456',
      jamBuka: 'Setiap hari: 10:00 - 20:00 WIB',
      gambar: ['https://picsum.photos/seed/cendol/800/600'],
      rating: 4.8,
      status: StatusPublish.PUBLISHED,
      featured: true,
    },
  ]

  for (const data of kulinerData) {
    const kuliner = await prisma.kuliner.create({ data })
    console.log(`✅ Created kuliner: ${kuliner.nama}`)
  }

  // Create Settings
  const settings = [
    {
      key: 'site_name',
      value: 'Wisata Pangandaran',
      description: 'Nama website',
    },
    {
      key: 'site_description',
      value: 'Portal Informasi Wisata Pangandaran - Jelajahi keindahan alam, budaya, dan kuliner Pangandaran',
      description: 'Deskripsi website',
    },
    {
      key: 'contact_email',
      value: 'info@wisatapangandaran.com',
      description: 'Email kontak',
    },
    {
      key: 'contact_phone',
      value: '+62 265 639 xxx',
      description: 'Nomor telepon',
    },
  ]

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
    console.log(`✅ Created setting: ${setting.key}`)
  }

  // Create Comprehensive Berita
  const beritaData = [
    {
      judul: 'Festival Pantai Pangandaran 2026 Siap Digelar',
      slug: 'festival-pantai-pangandaran-2026',
      konten: 'Pemerintah Kabupaten Pangandaran mengumumkan akan menggelar Festival Pantai Pangandaran 2026 pada bulan Juli mendatang. Festival ini akan menampilkan berbagai kegiatan menarik seperti lomba perahu hias, lomba layang-layang, pertunjukan seni budaya lokal, dan bazar kuliner nusantara.\n\nKepala Dinas Pariwisata Pangandaran menyatakan bahwa festival ini bertujuan untuk mempromosikan Pangandaran sebagai destinasi wisata unggulan di Jawa Barat. Diharapkan acara ini dapat menarik wisatawan domestik maupun mancanegara.\n\nBerbagai sponsor dan partner telah dikonfirmasi untuk mendukung acara ini. Panitia juga memastikan protokol kesehatan akan tetap diterapkan untuk kenyamanan dan keselamatan pengunjung.',
      ringkasan: 'Festival Pantai Pangandaran 2026 akan digelar pada Juli dengan berbagai kegiatan menarik dan pertunjukan budaya.',
      kategori: 'Pengumuman',
      gambarUtama: 'https://picsum.photos/seed/berita-festival/1200/800',
      tags: ['festival', 'event', 'pangandaran', 'wisata'],
      views: 234,
      status: StatusPublish.PUBLISHED,
      featured: true,
      publishedAt: new Date('2026-01-02'),
      createdBy: admin.id,
    },
    {
      judul: '10 Spot Foto Instagramable di Pangandaran',
      slug: '10-spot-foto-instagramable-pangandaran',
      konten: 'Pangandaran tidak hanya menawarkan keindahan alam, tetapi juga berbagai spot foto yang instagramable. Berikut 10 spot foto terbaik yang wajib dikunjungi:\n\n1. Pantai Batu Hiu - Formasi batu unik menyerupai sirip hiu\n2. Green Canyon - Ngarai hijau tosca yang menakjubkan\n3. Sunset di Pantai Barat - Golden hour yang sempurna\n4. Cagar Alam Pananjung - View dari atas bukit\n5. Pantai Madasari - Taman bunga warna-warni\n6. Goa Buniayu - Stalaktit dan stalagmit alami\n7. Pantai Batu Karas - Pantai pasir hitam dengan ombak surfing\n8. Kampung Turis Cijulang - Suasana desa tradisional\n9. Sungai Citumang - Body rafting yang menantang\n10. Mercusuar Pangandaran - View 360 derajat laut selatan\n\nJangan lupa bawa kamera dan powerbank! Selamat hunting foto!',
      ringkasan: 'Temukan 10 spot foto paling instagramable di Pangandaran untuk feed Instagram yang memukau.',
      kategori: 'Tips Wisata',
      gambarUtama: 'https://picsum.photos/seed/spot-foto/1200/800',
      tags: ['tips', 'fotografi', 'instagram', 'destinasi'],
      views: 1567,
      status: StatusPublish.PUBLISHED,
      featured: true,
      publishedAt: new Date('2026-01-01'),
      createdBy: admin2.id,
    },
    {
      judul: 'Green Canyon Raih Penghargaan Destinasi Terbaik',
      slug: 'green-canyon-penghargaan-destinasi-terbaik',
      konten: 'Green Canyon Pangandaran meraih penghargaan sebagai Destinasi Wisata Alam Terbaik 2025 dalam ajang Indonesia Tourism Award. Penghargaan ini diberikan berdasarkan penilaian dari aspek keindahan alam, pengelolaan yang baik, dan kepuasan pengunjung.\n\nPengelola Green Canyon menyatakan rasa syukur dan berterima kasih atas dukungan dari pemerintah daerah dan masyarakat. Mereka berkomitmen untuk terus menjaga kelestarian alam dan meningkatkan kualitas pelayanan.\n\nGreen Canyon yang terletak di Cijulang ini memang menjadi salah satu ikon wisata Pangandaran dengan keindahan ngarai dan sungai berwarna hijau tosca yang memukau.',
      ringkasan: 'Green Canyon Pangandaran dinobatkan sebagai Destinasi Wisata Alam Terbaik 2025 dalam Indonesia Tourism Award.',
      kategori: 'Berita Lokal',
      gambarUtama: 'https://picsum.photos/seed/greencanyon-award/1200/800',
      tags: ['green canyon', 'penghargaan', 'wisata alam', 'cijulang'],
      views: 892,
      status: StatusPublish.PUBLISHED,
      featured: true,
      publishedAt: new Date('2025-12-28'),
      createdBy: admin.id,
    },
    {
      judul: 'Panduan Lengkap Liburan Budget di Pangandaran',
      slug: 'panduan-liburan-budget-pangandaran',
      konten: 'Liburan ke Pangandaran tidak harus mahal! Dengan budget Rp 500.000 per orang untuk 2 hari 1 malam, Anda sudah bisa menikmati keindahan Pangandaran.\n\nBreakdown Budget:\n- Transportasi (PP dari Bandung): Rp 150.000\n- Penginapan homestay: Rp 150.000\n- Makan (3x): Rp 100.000\n- Tiket wisata: Rp 50.000\n- Lain-lain: Rp 50.000\n\nTips Hemat:\n1. Pilih homestay atau guesthouse\n2. Makan di warung lokal\n3. Kunjungi pantai umum yang gratis\n4. Naik angkutan umum\n5. Bawa bekal snack dari rumah\n\nDengan perencanaan yang matang, liburan murah meriah tetap bisa menyenangkan!',
      ringkasan: 'Tips dan panduan lengkap liburan ke Pangandaran dengan budget minimal Rp 500.000 untuk 2 hari 1 malam.',
      kategori: 'Tips Wisata',
      gambarUtama: 'https://picsum.photos/seed/budget-travel/1200/800',
      tags: ['tips', 'budget', 'backpacker', 'hemat'],
      views: 2134,
      status: StatusPublish.PUBLISHED,
      featured: true,
      publishedAt: new Date('2025-12-30'),
      createdBy: admin2.id,
    },
    {
      judul: 'Kuliner Khas Pangandaran yang Wajib Dicoba',
      slug: 'kuliner-khas-pangandaran-wajib-dicoba',
      konten: 'Pangandaran tidak hanya terkenal dengan pantainya, tapi juga kuliner yang menggugah selera. Berikut kuliner khas yang wajib dicoba:\n\n1. Rujak Kangkung - Kangkung rebus dengan bumbu kacang khas\n2. Ikan Bakar - Ikan segar dengan sambal terasi\n3. Nasi Lengko - Nasi dengan tahu, tempe, tauge, dan bumbu kacang\n4. Seafood Segar - Lobster, cumi, kerang\n5. Cendol Elizabeth - Cendol legendaris dengan santan kental\n6. Sate Maranggi - Sate daging empuk bumbu khas\n7. Pangandaran Delight - Oleh-oleh kue khas\n\nHarga kuliner di Pangandaran sangat bersahabat di kantong. Selamat menikmati!',
      ringkasan: 'Daftar kuliner khas Pangandaran yang wajib dicoba saat berkunjung, dari rujak kangkung hingga seafood segar.',
      kategori: 'Tips Wisata',
      gambarUtama: 'https://picsum.photos/seed/kuliner-khas/1200/800',
      tags: ['kuliner', 'makanan', 'seafood', 'pangandaran'],
      views: 1789,
      status: StatusPublish.PUBLISHED,
      featured: false,
      publishedAt: new Date('2025-12-29'),
      createdBy: admin.id,
    },
    {
      judul: 'Program Konservasi Penyu di Pantai Pangandaran',
      slug: 'program-konservasi-penyu-pangandaran',
      konten: 'Pantai Pangandaran kembali menjadi lokasi pendaratan penyu untuk bertelur. Pemerintah daerah bersama komunitas lingkungan meluncurkan program konservasi penyu untuk melindungi habitat dan populasi penyu di Pangandaran.\n\nProgram ini meliputi patroli pantai, penetasan telur penyu di penangkaran, dan pelepasan tukik ke laut. Wisatawan juga bisa berpartisipasi dalam kegiatan pelepasan tukik yang dilakukan setiap minggu.\n\nKonservasi ini penting untuk menjaga ekosistem laut dan meningkatkan kesadaran masyarakat tentang pentingnya menjaga kelestarian alam.',
      ringkasan: 'Program konservasi penyu diluncurkan di Pantai Pangandaran untuk melindungi habitat dan populasi penyu.',
      kategori: 'Berita Lokal',
      gambarUtama: 'https://picsum.photos/seed/konservasi-penyu/1200/800',
      tags: ['konservasi', 'penyu', 'lingkungan', 'pantai'],
      views: 567,
      status: StatusPublish.PUBLISHED,
      featured: false,
      publishedAt: new Date('2025-12-27'),
      createdBy: admin2.id,
    },
    {
      judul: 'Pembukaan Rute Baru ke Destinasi Wisata Tersembunyi',
      slug: 'rute-baru-destinasi-wisata-tersembunyi',
      konten: 'Dinas Pekerjaan Umum Pangandaran meresmikan pembukaan akses jalan baru menuju beberapa destinasi wisata tersembunyi yang selama ini sulit dijangkau. Rute baru ini menghubungkan Pantai Batu Nunggul, Air Terjun Curug Batu, dan Bukit Sunrise.\n\nDengan akses yang lebih mudah, diharapkan destinasi-destinasi ini akan lebih ramai dikunjungi wisatawan. Jalan beraspal mulus sepanjang 8 km ini juga dilengkapi dengan rambu petunjuk dan rest area.\n\nBupati Pangandaran menyatakan komitmen untuk terus mengembangkan infrastruktur pariwisata demi meningkatkan kunjungan wisatawan dan ekonomi masyarakat.',
      ringkasan: 'Pembukaan rute jalan baru memudahkan akses ke destinasi wisata tersembunyi di Pangandaran.',
      kategori: 'Berita Lokal',
      gambarUtama: 'https://picsum.photos/seed/rute-baru/1200/800',
      tags: ['infrastruktur', 'akses', 'destinasi baru', 'pembangunan'],
      views: 445,
      status: StatusPublish.PUBLISHED,
      featured: false,
      publishedAt: new Date('2025-12-26'),
      createdBy: admin.id,
    },
    {
      judul: 'Cara Menuju Pangandaran dari Jakarta, Bandung, dan Yogyakarta',
      slug: 'cara-menuju-pangandaran',
      konten: 'Panduan lengkap akses menuju Pangandaran dari berbagai kota:\n\nDari Jakarta (380 km, 7-8 jam):\n- Via Tol Cipularang - Palimanan - Cikopo - Pangandaran\n- Bus: Berangkat dari Terminal Kampung Rambutan\n- Travel: Tersedia door to door\n\nDari Bandung (230 km, 5-6 jam):\n- Via Nagreg - Ciamis - Pangandaran\n- Bus: Terminal Leuwi Panjang\n- Kereta: Stasiun Banjar lalu lanjut travel\n\nDari Yogyakarta (320 km, 6-7 jam):\n- Via Wates - Kebumen - Cilacap - Pangandaran\n- Bus: Terminal Giwangan\n\nTips: Berangkat pagi hari untuk menghindari macet dan sampai siang.',
      ringkasan: 'Panduan lengkap rute dan transportasi menuju Pangandaran dari Jakarta, Bandung, dan Yogyakarta.',
      kategori: 'Tips Wisata',
      gambarUtama: 'https://picsum.photos/seed/cara-menuju/1200/800',
      tags: ['transportasi', 'akses', 'rute', 'panduan'],
      views: 3421,
      status: StatusPublish.PUBLISHED,
      featured: true,
      publishedAt: new Date('2025-12-31'),
      createdBy: admin2.id,
    },
  ]

  for (const data of beritaData) {
    const berita = await prisma.berita.create({ data })
    console.log(`✅ Created berita: ${berita.judul}`)
  }

  // Create Comprehensive Profil UKM
  const ukmData = [
    {
      namaUsaha: 'Warung Seafood Pak Ujang',
      slug: 'ukm-warung-seafood-pak-ujang',
      deskripsi: 'Warung seafood keluarga yang telah berdiri sejak 1995. Menyajikan seafood segar pilihan dengan bumbu rahasia khas Pangandaran yang turun temurun. Buka setiap hari dengan view pantai yang menakjubkan. Spesialisasi: lobster bakar, cumi saus padang, ikan gurame asam manis.',
      kategori: 'Kuliner',
      pemilik: 'Pak Ujang Suryadi',
      lokasi: 'Pantai Barat',
      alamat: 'Jl. Pantai Barat No. 45, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.684722,108.648889',
      nomorTelepon: '0812-3456-7890',
      email: 'seafoodpakujang@gmail.com',
      instagram: '@seafoodpakujang',
      whatsapp: '6281234567890',
      gambar: ['https://picsum.photos/seed/pakujang-ukm1/800/600', 'https://picsum.photos/seed/pakujang-ukm2/800/600'],
      produkLayanan: ['Seafood', 'Makanan Lokal', 'Catering Event', 'Private Dining'],
      hargaRata: 'Rp 50.000 - 200.000',
      jamOperasional: 'Setiap hari: 09:00 - 22:00 WIB',
      status: StatusPublish.PUBLISHED,
      featured: true,
      verified: true,
      createdBy: admin.id,
    },
    {
      namaUsaha: 'Kerajinan Bambu Ibu Siti',
      slug: 'kerajinan-bambu-ibu-siti',
      deskripsi: 'Produsen kerajinan bambu berkualitas tinggi dengan desain modern dan tradisional. Melayani custom order dan pengiriman ke seluruh Indonesia. Produk unggulan: tas bambu, keranjang anyaman, lampion, hiasan dinding, furniture bambu. Sudah mengekspor ke beberapa negara ASEAN.',
      kategori: 'Kerajinan',
      pemilik: 'Ibu Siti Maryam',
      lokasi: 'Desa Wonoharjo',
      alamat: 'Desa Wonoharjo RT 03 RW 02, Pangandaran, Jawa Barat 46396',
      koordinat: '-7.695000,108.640000',
      nomorTelepon: '0813-2345-6789',
      instagram: '@bambukraften',
      whatsapp: '6281323456789',
      facebook: 'Bambu Kraften Pangandaran',
      website: 'www.bambukraften.com',
      gambar: ['https://picsum.photos/seed/bambu1/800/600', 'https://picsum.photos/seed/bambu2/800/600'],
      produkLayanan: ['Kerajinan Tangan', 'Custom Design', 'Souvenir', 'Furniture', 'Workshop'],
      hargaRata: 'Rp 25.000 - 500.000',
      jamOperasional: 'Senin-Sabtu: 08:00 - 17:00 WIB',
      status: StatusPublish.PUBLISHED,
      featured: true,
      verified: true,
      createdBy: admin.id,
    },
    {
      namaUsaha: 'Tour Guide & Travel Pangandaran Explore',
      slug: 'pangandaran-explore-tour',
      deskripsi: 'Jasa tour guide profesional dan travel agent terpercaya di Pangandaran. Melayani paket wisata harian, paket honeymoon, study tour, gathering, dan custom trip. Guide berpengalaman dan ramah, kendaraan nyaman dan terawat. Include dokumentasi gratis!',
      kategori: 'Jasa Wisata',
      pemilik: 'Budi Santoso',
      lokasi: 'Pusat Kota Pangandaran',
      alamat: 'Jl. Kidang Pananjung No. 56, Pangandaran',
      koordinat: '-7.688000,108.655000',
      nomorTelepon: '0821-9876-5432',
      email: 'info@pangandaranexplore.com',
      instagram: '@pangandaranexplore',
      whatsapp: '6282198765432',
      website: 'www.pangandaranexplore.com',
      gambar: ['https://picsum.photos/seed/tour1/800/600', 'https://picsum.photos/seed/tour2/800/600'],
      produkLayanan: ['Tour Guide', 'Rental Mobil', 'Paket Wisata', 'Hotel Booking', 'Travel Consulting'],
      hargaRata: 'Rp 300.000 - 2.000.000',
      jamOperasional: '24 Jam (On Call)',
      status: StatusPublish.PUBLISHED,
      featured: true,
      verified: true,
      createdBy: admin2.id,
    },
    {
      namaUsaha: 'Oleh-oleh Pangandaran Delight',
      slug: 'pangandaran-delight',
      deskripsi: 'Toko oleh-oleh khas Pangandaran dengan produk berkualitas dan harga bersaing. Produk unggulan: dodol garut, amplang ikan, keripik rumput laut, abon ikan, manisan buah, kopi robusta Pangandaran. Bisa beli online dengan pengiriman ke seluruh Indonesia.',
      kategori: 'Kuliner',
      pemilik: 'Hendra Wijaya',
      lokasi: 'Jalan Utama Pangandaran',
      alamat: 'Jl. Merdeka No. 123, Pangandaran',
      koordinat: '-7.687500,108.654000',
      nomorTelepon: '0822-3456-7891',
      email: 'pangandarandelight@gmail.com',
      instagram: '@pangandarandelight',
      whatsapp: '6282234567891',
      gambar: ['https://picsum.photos/seed/oleholeh1/800/600', 'https://picsum.photos/seed/oleholeh2/800/600'],
      produkLayanan: ['Oleh-oleh Khas', 'Snack', 'Kopi', 'Kerajinan', 'Delivery'],
      hargaRata: 'Rp 15.000 - 100.000',
      jamOperasional: 'Setiap hari: 07:00 - 21:00 WIB',
      status: StatusPublish.PUBLISHED,
      featured: false,
      verified: true,
      createdBy: admin.id,
    },
    {
      namaUsaha: 'Rental Alat Snorkeling & Diving Aqua Fun',
      slug: 'aqua-fun-rental',
      deskripsi: 'Penyewaan alat snorkeling dan diving lengkap dengan harga terjangkau. Peralatan bersih, terawat, dan safety standar. Tersedia juga paket snorkeling tour dengan guide berpengalaman. Lokasi strategis dekat pantai.',
      kategori: 'Jasa Wisata',
      pemilik: 'Dedi Kurniawan',
      lokasi: 'Pantai Timur',
      alamat: 'Jl. Pantai Timur No. 78, Pangandaran',
      koordinat: '-7.702778,108.666667',
      nomorTelepon: '0823-4567-8912',
      instagram: '@aquafunpangandaran',
      whatsapp: '6282345678912',
      gambar: ['https://picsum.photos/seed/aquafun1/800/600'],
      produkLayanan: ['Rental Snorkeling', 'Rental Diving', 'Tour Guide', 'Underwater Photo'],
      hargaRata: 'Rp 50.000 - 500.000',
      jamOperasional: 'Setiap hari: 07:00 - 18:00 WIB',
      status: StatusPublish.PUBLISHED,
      featured: false,
      verified: false,
      createdBy: admin2.id,
    },
    {
      namaUsaha: 'Homestay Keluarga Bu Umi',
      slug: 'homestay-bu-umi',
      deskripsi: 'Penginapan homestay dengan suasana kekeluargaan dan harga bersahabat. Kamar bersih, AC, WiFi gratis, dapur bersama. Cocok untuk backpacker dan keluarga. Dekat dengan pantai dan pusat kuliner. Terdapat 8 kamar dengan berbagai tipe.',
      kategori: 'Penginapan',
      pemilik: 'Ibu Umi Kalsum',
      lokasi: 'Dekat Pantai Barat',
      alamat: 'Jl. Pamugaran No. 34, Pangandaran',
      koordinat: '-7.686000,108.650000',
      nomorTelepon: '0824-5678-9123',
      instagram: '@homestaybuumi',
      whatsapp: '6282456789123',
      gambar: ['https://picsum.photos/seed/homestay1/800/600', 'https://picsum.photos/seed/homestay2/800/600'],
      produkLayanan: ['Penginapan', 'Breakfast', 'WiFi', 'Parkir', 'Tour Info'],
      hargaRata: 'Rp 150.000 - 350.000/malam',
      jamOperasional: '24 Jam (Check-in: 14:00, Check-out: 12:00)',
      status: StatusPublish.PUBLISHED,
      featured: true,
      verified: true,
      createdBy: admin.id,
    },
  ]

  for (const data of ukmData) {
    const ukm = await prisma.profilUkm.create({ data })
    console.log(`✅ Created UKM: ${ukm.namaUsaha}`)
  }

  // Create Comprehensive Rekomendasi
  const rekomendasiData = [
    {
      judul: 'Petualangan Alam 3 Hari 2 Malam',
      slug: 'petualangan-alam-3-hari',
      deskripsi: 'Paket wisata petualangan lengkap untuk pecinta alam! Eksplorasi Green Canyon dengan body rafting dan cliff jumping, trekking ke Cagar Alam Pananjung sambil melihat monyet liar, camping di Pantai Batu Karas dengan api unggun, dan menikmati sunrise spektakuler. Sudah termasuk guide profesional, peralatan lengkap, dan dokumentasi.',
      tema: 'Petualangan',
      durasi: '3 Hari 2 Malam',
      estimasiBudget: 'Rp 800.000 - Rp 1.000.000 per orang',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/petualangan/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 1,
    },
    {
      judul: 'Romantis Sunset Honeymoon',
      slug: 'romantis-sunset-getaway',
      deskripsi: 'Paket bulan madu romantis untuk pasangan baru menikah. Nikmati private beach dinner dengan sunset view, spa couple di resort mewah, sunrise di Pantai Batu Hiu, menginap di villa tepi laut dengan jacuzzi, dan tour wisata eksklusif. Include dekorasi romantis dan fotografi profesional. Moment tak terlupakan untuk pasangan!',
      tema: 'Romantis',
      durasi: '2 Hari 1 Malam',
      estimasiBudget: 'Rp 1.500.000 - Rp 2.500.000 per pasangan',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/romantis/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 2,
    },
    {
      judul: 'Family Fun Weekend',
      slug: 'family-fun-weekend',
      deskripsi: 'Paket wisata keluarga yang cocok untuk anak-anak dan orang tua. Bermain di Pantai Barat yang tenang, mengunjungi Taman Madasari dengan playground anak, snorkeling di spot aman untuk pemula, makan malam seafood bersama keluarga, dan menginap di hotel family friendly. Aktivitas edukatif dan menyenangkan untuk semua umur.',
      tema: 'Keluarga',
      durasi: '2 Hari 1 Malam',
      estimasiBudget: 'Rp 600.000 - Rp 900.000 per orang',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/family/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 3,
    },
    {
      judul: 'Budget Backpacker 2 Hari',
      slug: 'budget-backpacker-2-hari',
      deskripsi: 'Paket hemat untuk backpacker dan traveler budget. Explore Pantai Barat dan Timur, trekking ke Pananjung, makan di warung lokal favorit, menginap di homestay nyaman, dan mengunjungi spot foto gratis. Transport sharing dan guide lokal ramah. Liburan murah meriah tapi tetap seru dan berkesan!',
      tema: 'Budget Friendly',
      durasi: '2 Hari 1 Malam',
      estimasiBudget: 'Rp 350.000 - Rp 500.000 per orang',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/backpacker/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: true,
      urutan: 4,
    },
    {
      judul: 'Surfing Adventure Batu Karas',
      slug: 'surfing-adventure-batu-karas',
      deskripsi: 'Paket khusus untuk surfer pemula hingga advanced. Surfing lesson di Pantai Batu Karas dengan instruktur bersertifikat, rental papan selancar, menginap di surfer camp, morning session dan sunset session, video analysis teknik surfing. Ombak Batu Karas cocok untuk semua level. Spot surfing terbaik di Pangandaran!',
      tema: 'Olahraga',
      durasi: '3 Hari 2 Malam',
      estimasiBudget: 'Rp 900.000 - Rp 1.200.000 per orang',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/surfing/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 5,
    },
    {
      judul: 'Cultural Heritage Tour',
      slug: 'cultural-heritage-tour',
      deskripsi: 'Wisata budaya dan sejarah Pangandaran. Mengunjungi Situs Karang Nini yang bersejarah, belajar kerajinan bambu di desa Wonoharjo, melihat pertunjukan ronggeng bugis, mencicipi kuliner tradisional, dan menginap di kampung wisata Cijulang. Dipandu oleh pemandu lokal yang menguasai sejarah dan budaya. Pengalaman budaya yang otentik!',
      tema: 'Budaya',
      durasi: '2 Hari 1 Malam',
      estimasiBudget: 'Rp 700.000 - Rp 950.000 per orang',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/cultural/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 6,
    },
    {
      judul: 'Photography Expedition',
      slug: 'photography-expedition',
      deskripsi: 'Paket khusus untuk fotografer dan content creator. Hunting sunrise di Pantai Timur, golden hour di Batu Hiu, milky way photography di pantai, landscape di Green Canyon, underwater photography, dan portrait session. Dipandu fotografer profesional dengan tips & trik fotografi. Sudah termasuk akses spot foto terbaik dan permit khusus.',
      tema: 'Fotografi',
      durasi: '3 Hari 2 Malam',
      estimasiBudget: 'Rp 1.000.000 - Rp 1.500.000 per orang',
      destinasiIds: [],
      gambarUtama: 'https://picsum.photos/seed/photography/1200/800',
      status: StatusPublish.PUBLISHED,
      featured: false,
      urutan: 7,
    },
  ]

  for (const data of rekomendasiData) {
    const rekomendasi = await prisma.rekomendasi.create({ data })
    console.log(`✅ Created rekomendasi: ${rekomendasi.judul}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
