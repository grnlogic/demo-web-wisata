import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check database connection
  await prisma.$connect()
  console.log('✅ Database connected successfully!')

  // Check tables
  const adminCount = await prisma.admin.count()
  const destinasiCount = await prisma.destinasi.count()
  const eventCount = await prisma.event.count()

  console.log(`\n📊 Database Statistics:`)
  console.log(`- Admins: ${adminCount}`)
  console.log(`- Destinasi: ${destinasiCount}`)
  console.log(`- Events: ${eventCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
