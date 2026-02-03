import { PrismaClient } from '@prisma/client'

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

// Track database connection status
export let dbConnected = globalForPrisma.dbConnected ?? false;

// Add connection check (non-blocking)
prisma.$connect()
  .then(() => {
    console.log('✓ Database connected successfully');
    dbConnected = true;
    globalForPrisma.dbConnected = true;
  })
  .catch((error) => {
    console.warn('⚠ Database connection failed - Running in DEMO MODE with dummy data');
    console.warn('DATABASE_URL:', process.env.DATABASE_URL ? 'Set but invalid' : 'Not set');
    dbConnected = false;
    globalForPrisma.dbConnected = false;
  });

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
