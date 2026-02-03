# 🎭 Demo Portfolio Mode

Aplikasi ini dikonfigurasi untuk berjalan dalam **Demo Mode** tanpa memerlukan database aktif.

## ✨ Fitur Demo Mode

### 🔐 Login System

- **Hardcoded dummy users** - Tidak perlu database
- **Dropdown selection** untuk memilih role
- **Auto-fill** username dan password
- **9 Admin roles** dengan divisi berbeda
- **3 Regular users** untuk testing

### 👥 Available Users

#### Admin Roles (Password: `demo123`)

| Username          | Nama            | Divisi                        |
| ----------------- | --------------- | ----------------------------- |
| `superadmin`      | Super Admin     | Full Access - Semua Modul     |
| `admin_destinasi` | Admin Destinasi | Destinasi Wisata & Pariwisata |
| `admin_event`     | Admin Event     | Event & Agenda Kegiatan       |
| `admin_kuliner`   | Admin Kuliner   | Kuliner & Gastronomi          |
| `admin_berita`    | Admin Berita    | Berita & Publikasi            |
| `admin_ukm`       | Admin UKM       | UKM & UMKM Lokal              |
| `admin_galeri`    | Admin Galeri    | Galeri & Media Visual         |
| `admin_hotel`     | Admin Hotel     | Hotel & Akomodasi             |
| `admin_informasi` | Admin Informasi | Informasi Umum & Panduan      |

#### Regular Users (Password: `demo123`)

| Email            | Nama           | Role |
| ---------------- | -------------- | ---- |
| `budi@demo.com`  | Budi Santoso   | USER |
| `siti@demo.com`  | Siti Nurhaliza | USER |
| `ahmad@demo.com` | Ahmad Wijaya   | USER |

## 🚀 Quick Start

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd wisata_pangandaran
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Setup environment** (minimal untuk demo)

   ```bash
   cp .env.example .env
   ```

   Edit `.env` dan pastikan ada:

   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="demo-portfolio-secret-key-minimum-32-characters-long-here"
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Login**
   - Buka `http://localhost:3000/admin/login`
   - Pilih role dari dropdown
   - Klik "Masuk" (username & password auto-fill)

## 🎯 Cara Menggunakan

### Login sebagai Admin

1. Buka halaman login: `/admin/login`
2. Pilih salah satu role admin dari dropdown
3. Username dan password akan otomatis terisi
4. Klik tombol "Masuk sebagai [Nama Role]"
5. Anda akan diarahkan ke `/admin/dashboard`

### Login sebagai User

1. Pilih salah satu user (Budi, Siti, atau Ahmad)
2. Login untuk testing fitur review dan komentar
3. Anda akan diarahkan ke homepage

## 📁 File Konfigurasi Penting

### Dummy Users Configuration

- **Frontend**: `app/admin/login/page.tsx` - Hardcoded user list dengan dropdown
- **Backend**: `lib/auth.ts` - Authentication logic dengan fallback ke dummy users

### Database Fallback

- **Wrapper**: `lib/prisma.ts` - Safe query wrapper dengan fallback ke empty data
- **Usage**: Import `safeQuery` untuk query yang aman tanpa database

## ⚙️ Environment Variables

### Required (Minimal)

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="minimum-32-characters-secret-key"
```

### Optional (Untuk fitur lengkap dengan database)

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
# Dan API keys lainnya...
```

## 🔧 Technical Details

### Authentication Flow

1. User memilih role dari dropdown
2. Form auto-fill dengan credentials
3. Submit ke NextAuth credentials provider
4. Auth handler cek dummy users **DULU** sebelum database
5. Jika match, create JWT session
6. Redirect ke dashboard/homepage sesuai role

### Database Handling

```typescript
// Pattern yang digunakan:
import { safeQuery } from '@/lib/prisma';

const data = await safeQuery(
  () => prisma.model.findMany(...),
  [] // fallback value jika database error
);
```

### Error Handling

- Database connection errors → Auto fallback ke demo mode
- Missing data → Return empty arrays
- Auth errors → Show friendly error message
- API errors → Graceful degradation

## 🎨 Portfolio Showcase

Aplikasi ini mendemonstrasikan:

- ✅ Multi-role authentication system
- ✅ NextJS 14 App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Prisma ORM (dengan fallback)
- ✅ NextAuth.js
- ✅ Internationalization (i18n)
- ✅ Responsive design
- ✅ Modern UI/UX

## 📝 Notes

- **Demo data**: Semua data adalah dummy untuk portfolio
- **No database required**: Bisa jalan tanpa PostgreSQL
- **Production ready**: Tinggal connect database real untuk produksi
- **Secure**: Password di-hash dengan bcrypt di production mode
- **Scalable**: Architecture siap untuk scale

## 🔗 Related Files

- `/app/admin/login/page.tsx` - Login UI dengan dropdown
- `/lib/auth.ts` - NextAuth configuration
- `/lib/prisma.ts` - Database client dengan safe query
- `/.env` - Environment variables
- `/prisma/schema.prisma` - Database schema (optional)

## 💡 Tips

1. **Testing berbagai role**: Logout dan login dengan role berbeda untuk melihat akses yang berbeda
2. **No database setup**: Tidak perlu install PostgreSQL untuk demo
3. **Portfolio friendly**: Perfect untuk showcase di GitHub/portfolio
4. **Easy deployment**: Deploy ke Vercel/Netlify tanpa database setup

## 📞 Support

Untuk pertanyaan atau issues, silakan buka issue di repository ini.

---

**Happy coding! 🚀**
