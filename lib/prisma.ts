import { PrismaClient } from '@prisma/client'

// Agar Prisma tidak throw "Environment variable not found" saat build/deploy tanpa .env (Vercel demo)
if (typeof process !== 'undefined' && !process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/dummy'
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  dbConnected: boolean | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['error', 'warn'] // Reduced logging
      : ['error'],
    errorFormat: 'pretty',
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Track database connection status — skip connect jika tidak ada DATABASE_URL (demo/Vercel tanpa DB)
export let dbConnected = globalForPrisma.dbConnected ?? false;

const isDummyUrl = process.env.DATABASE_URL === 'postgresql://dummy:dummy@localhost:5432/dummy'
const hasDatabaseUrl = typeof process !== 'undefined' && process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '' && !isDummyUrl;

if (hasDatabaseUrl) {
  prisma.$connect()
    .then(() => {
      console.log('✓ Database connected successfully');
      dbConnected = true;
      globalForPrisma.dbConnected = true;
    })
    .catch((error) => {
      console.warn('⚠ Database connection failed - Running in DEMO MODE with dummy data');
      dbConnected = false;
      globalForPrisma.dbConnected = false;
    });
} else {
  dbConnected = false;
  globalForPrisma.dbConnected = false;
  if (process.env.NODE_ENV === 'development') {
    console.log('ℹ No DATABASE_URL — running with dummy data (Vercel/demo mode)');
  }
}

// Safe database query wrapper with fallback to empty data
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    console.warn('Database query failed, using fallback data:', error instanceof Error ? error.message : 'Unknown error');
    return fallback;
  }
}
