import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding admin only...')

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

  const password = await hash('admin123', 10)

  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password,
      nama: 'Administrator',
      email: 'admin@wisatapangandaran.com',
    },
  })

  console.log(`✅ Admin created: ${admin.username}`)
}

main()
  .catch((err) => {
    console.error('❌ Seed failed', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
