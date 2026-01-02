import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Starting seed...')

  // Create Admin User
  const hashedPassword = await hash('admin123', 10)
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      nama: 'Administrator',
      email: 'admin@wisatapangandaran.com',
    },
  })

  console.log('✅ Admin user created:', admin.username)

  // Create Sample Destinasi
  const destinasiData = [
    {
      nama: 'Pantai Pasir Putih',
      slug: 'pantai-pasir-putih',
      deskripsi: 'Pantai dengan pasir putih yang halus dan air laut jernih. Cocok untuk berenang, snorkeling, dan menikmati sunset yang memukau. Terletak di sisi barat Pangandaran dengan fasilitas lengkap.',
      kategori: 'PANTAI',
      lokasi: 'Pantai Barat',
      alamat: 'Jl. Pantai Barat, Pangandaran, Jawa Barat',
      koordinat: '-7.684722,108.648889',
      googleMapsUrl: 'https://maps.google.com/?q=Pantai+Pasir+Putih+Pangandaran',
      rating: 4.8,
      jumlahReview: 1234,
      status: 'PUBLISHED',
      featured: true,
      createdBy: admin.id,
    },
    {
      nama: 'Green Canyon',
      slug: 'green-canyon',
      deskripsi: 'Ngarai dengan sungai jernih berwarna hijau tosca yang dikelilingi tebing batu tinggi. Nikmati body rafting dan jelajahi goa di dalam tebing. Salah satu destinasi paling populer di Pangandaran.',
      kategori: 'WISATA_BAHARI',
      lokasi: 'Cijulang',
      alamat: 'Desa Kertayasa, Cijulang, Pangandaran, Jawa Barat',
      koordinat: '-7.696111,108.489167',
      googleMapsUrl: 'https://maps.google.com/?q=Green+Canyon+Pangandaran',
      rating: 4.9,
      jumlahReview: 856,
      status: 'PUBLISHED',
      featured: true,
      createdBy: admin.id,
    },
    {
      nama: 'Cagar Alam Pananjung',
      slug: 'cagar-alam-pananjung',
      deskripsi: 'Hutan lindung dengan berbagai flora dan fauna endemik. Terdapat Goa Jepang, tracking trail, dan spot untuk melihat monyet liar. Pemandangan laut dari atas bukit sangat menakjubkan.',
      kategori: 'CAGAR_ALAM',
      lokasi: 'Pantai Timur',
      alamat: 'Pantai Timur, Pangandaran, Jawa Barat',
      koordinat: '-7.702778,108.666667',
      googleMapsUrl: 'https://maps.google.com/?q=Cagar+Alam+Pananjung',
      rating: 4.7,
      jumlahReview: 643,
      status: 'PUBLISHED',
      featured: true,
      createdBy: admin.id,
    },
  ]

  for (const data of destinasiData) {
    const destinasi = await prisma.destinasi.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    })

    // Add sample images
    await prisma.destinasiImage.createMany({
      data: [
        {
          destinasiId: destinasi.id,
          url: '/images/destinasi/placeholder-1.jpg',
          caption: 'Pemandangan utama',
          isPrimary: true,
          urutan: 1,
        },
        {
          destinasiId: destinasi.id,
          url: '/images/destinasi/placeholder-2.jpg',
          caption: 'Suasana sore',
          isPrimary: false,
          urutan: 2,
        },
      ],
    })

    // Add sample pricing
    if (data.slug === 'pantai-pasir-putih') {
      await prisma.destinasiHarga.createMany({
        data: [
          {
            destinasiId: destinasi.id,
            jenisHarga: 'Tiket Masuk Dewasa',
            harga: 15000,
            urutan: 1,
          },
          {
            destinasiId: destinasi.id,
            jenisHarga: 'Tiket Masuk Anak-anak',
            harga: 10000,
            urutan: 2,
          },
          {
            destinasiId: destinasi.id,
            jenisHarga: 'Paket Snorkeling',
            harga: 75000,
            keterangan: 'Termasuk peralatan dan guide',
            urutan: 3,
          },
        ],
      })
    }

    console.log(`✅ Created destinasi: ${destinasi.nama}`)
  }

  // Create Sample Event
  const events = [
    {
      nama: 'Festival Pantai Pangandaran 2026',
      slug: 'festival-pantai-pangandaran-2026',
      deskripsi: 'Festival tahunan yang menampilkan kebudayaan lokal, kuliner khas, dan berbagai lomba pantai. Acara meriah untuk keluarga dengan berbagai hiburan menarik.',
      lokasi: 'Pantai Barat Pangandaran',
      tanggalMulai: new Date('2026-07-15'),
      tanggalSelesai: new Date('2026-07-17'),
      jamMulai: '08:00',
      jamSelesai: '22:00',
      kontakPerson: 'Dinas Pariwisata',
      nomorTelepon: '0265-639123',
      status: 'PUBLISHED',
      featured: true,
      createdBy: admin.id,
    },
  ]

  for (const eventData of events) {
    const event = await prisma.event.upsert({
      where: { slug: eventData.slug },
      update: eventData,
      create: eventData,
    })
    console.log(`✅ Created event: ${event.nama}`)
  }

  // Create Sample Settings
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

  // Create Sample Berita
  // Berita sekarang diambil dari API NewsData.io secara otomatis
  // Tidak perlu sample data manual lagi
  console.log('ℹ️  Berita akan diambil dari API NewsData.io')

  // Create Sample Profil UKM
  const ukmData = [
    {
      namaUsaha: 'Warung Seafood Pak Ujang',
      slug: 'warung-seafood-pak-ujang',
      deskripsi: 'Menyajikan seafood segar pilihan dengan bumbu rahasia khas Pangandaran. Buka setiap hari dengan view pantai yang menakjubkan.',
      kategori: 'Kuliner',
      pemilik: 'Pak Ujang',
      lokasi: 'Pantai Barat',
      alamat: 'Jl. Pantai Barat No. 45, Pangandaran',
      nomorTelepon: '0812-3456-7890',
      instagram: '@seafoodpakujang',
      whatsapp: '6281234567890',
      gambar: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'],
      produkLayanan: ['Seafood', 'Makanan Lokal', 'Catering'],
      hargaRata: 'Rp 50.000 - 150.000',
      jamOperasional: '09:00 - 22:00',
      status: 'PUBLISHED',
      featured: true,
      verified: true,
      createdBy: admin.id,
    },
    {
      namaUsaha: 'Kerajinan Bambu Ibu Siti',
      slug: 'kerajinan-bambu-ibu-siti',
      deskripsi: 'Produsen kerajinan bambu berkualitas tinggi dengan desain modern dan tradisional. Melayani custom order dan pengiriman ke seluruh Indonesia.',
      kategori: 'Kerajinan',
      pemilik: 'Ibu Siti',
      lokasi: 'Desa Wonoharjo',
      alamat: 'Desa Wonoharjo, Pangandaran',
      nomorTelepon: '0813-2345-6789',
      instagram: '@bambukraften',
      whatsapp: '6281323456789',
      website: 'www.bambukraften.com',
      gambar: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'],
      produkLayanan: ['Kerajinan Tangan', 'Custom Design', 'Souvenir'],
      hargaRata: 'Rp 25.000 - 500.000',
      jamOperasional: '08:00 - 17:00',
      status: 'PUBLISHED',
      featured: true,
      verified: true,
      createdBy: admin.id,
    },
  ]

  for (const data of ukmData) {
    const ukm = await prisma.profilUkm.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    })
    console.log(`✅ Created UKM: ${ukm.namaUsaha}`)
  }

  // Create Sample Rekomendasi
  const rekomendasiData = [
    {
      judul: 'Petualangan Alam 3 Hari',
      slug: 'petualangan-alam-3-hari',
      deskripsi: 'Eksplorasi lengkap Green Canyon dengan kayak, cliff jumping, trekking goa Pananjung, dan camping di tepi pantai dengan api unggun.',
      tema: 'Petualangan',
      durasi: '3 Hari 2 Malam',
      estimasiBudget: 'Rp 800.000 - Rp 1.000.000',
      destinasiIds: [],
      gambarUtama: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
      featured: true,
      urutan: 1,
    },
    {
      judul: 'Romantis Sunset Getaway',
      slug: 'romantis-sunset-getaway',
      deskripsi: 'Paket khusus untuk pasangan dengan private beach dinner, spa couple, sunrise di pantai, dan menginap di villa mewah tepi laut.',
      tema: 'Romantis',
      durasi: '2 Hari 1 Malam',
      estimasiBudget: 'Rp 1.500.000 - Rp 2.000.000',
      destinasiIds: [],
      gambarUtama: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      status: 'PUBLISHED',
      featured: true,
      urutan: 2,
    },
  ]

  for (const data of rekomendasiData) {
    const rekomendasi = await prisma.rekomendasi.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    })
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
