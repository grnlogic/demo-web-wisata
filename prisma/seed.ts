import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding database dengan dummy data untuk portofolio...')

  console.log('🧹 Clearing database tables...')
  await prisma.destinasiReview.deleteMany()
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
  await prisma.hotelListing.deleteMany()
  await prisma.settings.deleteMany()
  await prisma.user.deleteMany()
  await prisma.admin.deleteMany()

  console.log('🔐 Creating dummy admin users...')
  
  // Password yang sama untuk semua: "demo123"
  const demoPassword = await hash('demo123', 10)

  // Super Admin - Akses penuh semua divisi
  const superAdmin = await prisma.admin.create({
    data: {
      username: 'superadmin',
      password: demoPassword,
      nama: 'Super Admin (Demo)',
      email: 'superadmin@demo.com',
    },
  })
  console.log(`✅ Super Admin created: ${superAdmin.username}`)

  // Admin Destinasi & Pariwisata
  const adminDestinasi = await prisma.admin.create({
    data: {
      username: 'admin_destinasi',
      password: demoPassword,
      nama: 'Admin Destinasi Wisata (Demo)',
      email: 'destinasi@demo.com',
    },
  })
  console.log(`✅ Admin Destinasi created: ${adminDestinasi.username}`)

  // Admin Event & Agenda
  const adminEvent = await prisma.admin.create({
    data: {
      username: 'admin_event',
      password: demoPassword,
      nama: 'Admin Event & Agenda (Demo)',
      email: 'event@demo.com',
    },
  })
  console.log(`✅ Admin Event created: ${adminEvent.username}`)

  // Admin Kuliner
  const adminKuliner = await prisma.admin.create({
    data: {
      username: 'admin_kuliner',
      password: demoPassword,
      nama: 'Admin Kuliner & Gastronomi (Demo)',
      email: 'kuliner@demo.com',
    },
  })
  console.log(`✅ Admin Kuliner created: ${adminKuliner.username}`)

  // Admin Berita & Publikasi
  const adminBerita = await prisma.admin.create({
    data: {
      username: 'admin_berita',
      password: demoPassword,
      nama: 'Admin Berita & Publikasi (Demo)',
      email: 'berita@demo.com',
    },
  })
  console.log(`✅ Admin Berita created: ${adminBerita.username}`)

  // Admin UKM & UMKM
  const adminUkm = await prisma.admin.create({
    data: {
      username: 'admin_ukm',
      password: demoPassword,
      nama: 'Admin UKM & UMKM (Demo)',
      email: 'ukm@demo.com',
    },
  })
  console.log(`✅ Admin UKM created: ${adminUkm.username}`)

  // Admin Galeri & Media
  const adminGaleri = await prisma.admin.create({
    data: {
      username: 'admin_galeri',
      password: demoPassword,
      nama: 'Admin Galeri & Media (Demo)',
      email: 'galeri@demo.com',
    },
  })
  console.log(`✅ Admin Galeri created: ${adminGaleri.username}`)

  // Admin Hotel & Akomodasi
  const adminHotel = await prisma.admin.create({
    data: {
      username: 'admin_hotel',
      password: demoPassword,
      nama: 'Admin Hotel & Akomodasi (Demo)',
      email: 'hotel@demo.com',
    },
  })
  console.log(`✅ Admin Hotel created: ${adminHotel.username}`)

  // Admin Informasi Umum
  const adminInfo = await prisma.admin.create({
    data: {
      username: 'admin_informasi',
      password: demoPassword,
      nama: 'Admin Informasi Umum (Demo)',
      email: 'informasi@demo.com',
    },
  })
  console.log(`✅ Admin Informasi created: ${adminInfo.username}`)

  console.log('👤 Creating dummy regular users...')

  // Regular Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Budi Santoso (Demo User)',
      email: 'budi@demo.com',
      password: demoPassword,
      isVerified: true,
    },
  })
  console.log(`✅ User created: ${user1.email}`)

  const user2 = await prisma.user.create({
    data: {
      name: 'Siti Nurhaliza (Demo User)',
      email: 'siti@demo.com',
      password: demoPassword,
      isVerified: true,
    },
  })
  console.log(`✅ User created: ${user2.email}`)

  const user3 = await prisma.user.create({
    data: {
      name: 'Ahmad Wijaya (Demo User)',
      email: 'ahmad@demo.com',
      password: demoPassword,
      isVerified: true,
    },
  })
  console.log(`✅ User created: ${user3.email}`)

  console.log('\n📊 Summary:')
  console.log(`   - ${9} Admin accounts created`)
  console.log(`   - ${3} Regular user accounts created`)
  console.log(`   - Default password untuk semua akun: "demo123"`)
  console.log('\n🎭 Admin Roles/Divisi:')
  console.log('   1. Super Admin - Full Access')
  console.log('   2. Admin Destinasi - Mengelola destinasi wisata')
  console.log('   3. Admin Event - Mengelola event & agenda')
  console.log('   4. Admin Kuliner - Mengelola kuliner & restoran')
  console.log('   5. Admin Berita - Mengelola berita & publikasi')
  console.log('   6. Admin UKM - Mengelola UKM & UMKM')
  console.log('   7. Admin Galeri - Mengelola galeri & media')
  console.log('   8. Admin Hotel - Mengelola hotel & akomodasi')
  console.log('   9. Admin Informasi - Mengelola informasi umum')
  console.log('\n👥 Regular Users:')
  console.log('   - Budi, Siti, Ahmad (untuk testing review & komentar)')
}

main()
  .catch((err) => {
    console.error('❌ Seed failed', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
