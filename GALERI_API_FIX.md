# Fix untuk Error 500 di API Galeri (Production)

## Masalah
```
GET https://amazingpangandaran.com/api/galeri?page=1&limit=20 500 (Internal Server Error)
```

## Penyebab Kemungkinan

### 1. **DATABASE_URL tidak terkonfigurasi di Production**
- Prisma memerlukan environment variable `DATABASE_URL` untuk koneksi ke database PostgreSQL
- Jika tidak ada, semua query akan gagal dengan error 500

### 2. **Prisma Client belum di-generate**
- Setelah deploy, Prisma Client harus di-generate di production server
- Build command harus include `prisma generate`

### 3. **Connection Pool Issues**
- Database mungkin kehabisan connection pool
- Prisma client tidak di-disconnect dengan benar

## Solusi yang Sudah Diterapkan

### 1. Enhanced Error Logging di API Route
File: `app/api/galeri/route.ts`

**Perubahan:**
- ✅ Tambah check Prisma client initialization
- ✅ Log detail error message dan stack trace
- ✅ Log environment variables (DATABASE_URL status, NODE_ENV)
- ✅ Return error details di development mode

### 2. Improved Prisma Configuration
File: `lib/prisma.ts`

**Perubahan:**
- ✅ Conditional logging (verbose di dev, error only di prod)
- ✅ Pretty error format untuk debugging
- ✅ Connection check dengan proper error logging
- ✅ Log DATABASE_URL status (tanpa expose value)

## Langkah Deployment di Production

### 1. Set Environment Variables di Vercel/Host

```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
NODE_ENV="production"
```

### 2. Update Build Command

Di `package.json`, pastikan build command include prisma generate:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 3. Di Vercel Dashboard

1. **Project Settings → Environment Variables**
   - Tambahkan `DATABASE_URL` dengan connection string PostgreSQL
   - Pastikan tersedia untuk Production, Preview, dan Development

2. **Project Settings → General → Build & Development Settings**
   - Build Command: `npm run build` atau `prisma generate && next build`
   - Install Command: `npm install`

3. **Redeploy Project**
   - Setelah set environment variables
   - Klik "Deployments" → "Redeploy" pada deployment terakhir

## Debugging di Production

### 1. Check Logs di Vercel

```bash
# Via Vercel CLI
vercel logs

# Atau di Dashboard:
# Project → Deployments → [Latest] → Function Logs
```

**Cari log dengan pattern:**
- `Database connection failed`
- `Database connected successfully`
- `Error fetching galeri`
- `DATABASE_URL: Not set` (ini masalahnya!)

### 2. Test Database Connection

Buat test endpoint untuk verify database:

```typescript
// app/api/health/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ 
      status: "ok", 
      database: "connected",
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
        NODE_ENV: process.env.NODE_ENV
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: "error", 
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown",
        env: {
          DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
          NODE_ENV: process.env.NODE_ENV
        }
      },
      { status: 500 }
    );
  }
}
```

Akses: `https://amazingpangandaran.com/api/health`

### 3. Check Prisma Migration Status

```bash
# Di local, connect ke production database
npx prisma migrate status

# Deploy migrations jika diperlukan
npx prisma migrate deploy
```

## Common Issues & Solutions

### Issue: "PrismaClient is unable to run in this browser environment"
**Solution:** Pastikan import `@/lib/prisma` tidak di client component. Gunakan hanya di:
- API Routes
- Server Components
- Server Actions

### Issue: "Can't reach database server"
**Solution:**
1. Check DATABASE_URL format
2. Check IP whitelist di database host (e.g., Supabase, Railway)
3. Vercel IP harus di-whitelist: `0.0.0.0/0` atau specific Vercel IPs

### Issue: "Too many connections"
**Solution:**
```typescript
// Tambah connection pool settings di DATABASE_URL
?connection_limit=10&pool_timeout=20
```

### Issue: Error setelah schema change
**Solution:**
```bash
# Generate Prisma Client baru
npx prisma generate

# Push ke production
git add .
git commit -m "Update Prisma Client"
git push

# Atau manual di Vercel:
# Redeploy dengan clear cache
```

## Checklist Verifikasi

- [ ] DATABASE_URL sudah di-set di Vercel Environment Variables
- [ ] Build command include `prisma generate`
- [ ] Redeploy sudah dilakukan setelah set env vars
- [ ] Check logs untuk "Database connected successfully"
- [ ] Test endpoint `/api/health` return status ok
- [ ] Test `/api/galeri?page=1&limit=20` return data
- [ ] No error di browser console
- [ ] Images loading correctly

## Monitor Logs

Setelah deploy, monitor untuk messages:
```
✓ Database connected successfully
✗ Database connection failed: [error message]
```

## Contact & Support

Jika masalah masih terjadi setelah semua langkah di atas:

1. Check detailed error di Vercel Function Logs
2. Verify DATABASE_URL connection string dengan:
   ```bash
   psql "postgresql://user:pass@host:5432/db"
   ```
3. Check database host status (Supabase/Railway dashboard)
4. Verify Prisma schema compatibility dengan database

---

**Last Updated:** 2026-01-14
**Status:** Fixed with enhanced error logging
