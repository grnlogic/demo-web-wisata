# 🏖️ Wisata Pangandaran - Portal Informasi Wisata

Website travel profesional untuk informasi wisata Pangandaran yang mewah, informatif, dan mudah digunakan.

## ✨ Fitur Utama

### 👥 Untuk Pengunjung Umum

- **Halaman Beranda** - Hero section menarik dengan informasi utama destinasi
- **Destinasi Wisata** - Katalog lengkap destinasi dengan:
  - Multiple images per destinasi
  - Daftar harga (tiket masuk, paket tour, sewa wahana)
  - Rating dari Google Maps
  - Lokasi dan Google Maps integration
  - Fasilitas dan aktivitas detail
  - Filter berdasarkan kategori
  - Search functionality
- **Event & Agenda** - Informasi event dan kegiatan upcoming
- **Galeri** - Foto dan video wisata dengan kategori
- **Tentang Pangandaran** - Informasi umum sejarah, geografi, tips wisata
- **Kuliner** - Rekomendasi tempat makan dan kuliner khas

### 🔐 Untuk Admin

- **Dashboard Analytics** - Statistik pengunjung dan konten
- **CRUD Lengkap**:
  - Destinasi (dengan multiple images dan pricing)
  - Event/Agenda
  - Galeri (foto & video)
  - Kuliner
  - Informasi Umum
- **User Management** - Kelola admin
- **Settings** - Konfigurasi website

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Form**: React Hook Form + Zod
- **Language**: TypeScript

## 📁 Struktur Project

```
wisata_pangandaran/
├── app/
│   ├── page.tsx                      # Homepage
│   ├── layout.tsx                    # Root layout dengan Navbar & Footer
│   ├── globals.css                   # Global styles (tema biru laut)
│   ├── destinasi/
│   │   ├── page.tsx                  # List destinasi dengan filter
│   │   └── [slug]/page.tsx           # Detail destinasi
│   ├── event/
│   │   ├── page.tsx                  # List event
│   │   └── [slug]/page.tsx           # Detail event
│   ├── galeri/
│   │   └── page.tsx                  # Galeri foto & video
│   ├── tentang/
│   │   └── page.tsx                  # About Pangandaran
│   ├── admin/
│   │   ├── layout.tsx                # Admin layout dengan sidebar
│   │   ├── login/page.tsx            # Admin login
│   │   ├── dashboard/page.tsx        # Admin dashboard
│   │   ├── destinasi/page.tsx        # CRUD Destinasi
│   │   ├── event/page.tsx            # CRUD Event
│   │   ├── galeri/page.tsx           # CRUD Galeri
│   │   ├── kuliner/page.tsx          # CRUD Kuliner
│   │   └── informasi/page.tsx        # CRUD Informasi
│   └── api/
│       └── auth/[...nextauth]/       # NextAuth API route
├── components/
│   ├── Navbar.tsx                    # Navbar dengan logo lingkaran
│   └── Footer.tsx                    # Footer dengan social media
├── lib/
│   ├── prisma.ts                     # Prisma client
│   ├── auth.ts                       # NextAuth config
│   ├── utils.ts                      # Helper functions
│   └── constants.ts                  # Constants & colors
├── prisma/
│   └── schema.prisma                 # Database schema
└── types/
    └── next-auth.d.ts                # NextAuth types
```

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+
- PostgreSQL
- npm atau yarn

### 2. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd wisata_pangandaran

# Install dependencies
npm install
```

### 3. Setup Database

```bash
# Buat database PostgreSQL
createdb wisata_pangandaran

# Copy .env.example ke .env
cp .env.example .env

# Edit .env dan isi DATABASE_URL dengan connection string Anda
# DATABASE_URL="postgresql://username:password@localhost:5432/wisata_pangandaran"
# NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. Migrate Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migration
npx prisma migrate dev --name init

# (Opsional) Seed data
npx prisma db seed
```

### 5. Create Admin User

```bash
# Buat admin user pertama via Prisma Studio atau script
npx prisma studio
```

Atau gunakan script berikut di Prisma Studio atau buat file `seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("admin123", 10);

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashedPassword,
      nama: "Administrator",
      email: "admin@wisatapangandaran.com",
    },
  });
}

main();
```

### 6. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat website.
Login admin di [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Default Admin Credentials** (setelah seed):

- Username: `admin`
- Password: `admin123`

## 🎨 Design System

### Warna Tema (Biru Laut)

```css
Primary Blue: #0073e6
Ocean Cyan: #00b8e6
Sand Beige: #e8d7bb
```

### Komponen Utama

- **Navbar**: Fixed, transparent on scroll, logo lingkaran Pangandaran
- **Hero**: Full screen dengan gradient biru laut
- **Cards**: Rounded-2xl dengan shadow-lg, hover effects
- **Buttons**: Rounded-full untuk CTA, rounded-lg untuk forms
- **Forms**: Clean dengan focus rings biru

## 📊 Database Schema

### Model Utama:

1. **Admin** - User authentication
2. **Destinasi** - Destinasi wisata dengan:
   - DestinasiImage (multiple images)
   - DestinasiHarga (pricing table)
   - DestinasiDetail (facilities, activities)
3. **Event** - Event dan agenda
4. **Galeri** - Photo & video gallery
5. **Kuliner** - Restaurants & food spots
6. **InformasiUmum** - General information
7. **Settings** - Site configuration

## 🔒 Authentication

- NextAuth.js dengan Credentials Provider
- Session strategy: JWT
- Protected routes untuk admin (/admin/\*)
- Middleware untuk route protection

## 🎯 Best Practices

- **SEO Optimized**: Meta tags, semantic HTML
- **Responsive**: Mobile-first design
- **Performance**: Image optimization, lazy loading
- **Accessibility**: ARIA labels, keyboard navigation
- **Clean Code**: TypeScript, ESLint, Prettier

## 📝 Development Workflow

1. **Feature Branch**: Buat branch dari `main`
2. **Development**: Kembangkan fitur dengan komponen reusable
3. **Testing**: Test functionality dan responsive design
4. **PR**: Pull request dengan deskripsi lengkap
5. **Deploy**: Deploy ke production

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Setup environment variables di Vercel dashboard:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start
```

## 📚 API Routes

- `/api/auth/[...nextauth]` - NextAuth endpoints
- Future: REST API untuk mobile app integration

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

© 2026 Wisata Pangandaran. All rights reserved.

## 👨‍💻 Developer

Developed with ❤️ for Pangandaran Tourism

---

## 📞 Support

For questions or support, please contact:

- Email: info@wisatapangandaran.com
- Website: [wisatapangandaran.com](http://wisatapangandaran.com)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
