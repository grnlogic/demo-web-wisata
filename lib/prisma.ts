import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    errorFormat: 'pretty',
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Add connection check
prisma.$connect()
  .then(() => {
    console.log('✓ Database connected successfully');
  })
  .catch((error) => {
    console.error('✗ Database connection failed:', error);
    console.error('DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set');
  });
