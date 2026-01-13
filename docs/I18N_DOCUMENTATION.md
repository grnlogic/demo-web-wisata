# Dokumentasi Sistem Translate (i18n)

## Instalasi
Library `next-intl` telah diinstall dan dikonfigurasi untuk mendukung 2 bahasa:
- 🇮🇩 Indonesia (id) - Default
- 🇬🇧 English (en)

## Struktur File

```
├── i18n.ts                 # Konfigurasi utama i18n
├── middleware.ts           # Middleware untuk routing locale
├── messages/              
│   ├── id.json            # Terjemahan Bahasa Indonesia
│   └── en.json            # Terjemahan Bahasa Inggris
├── app/
│   ├── page.tsx           # Redirect ke locale default
│   └── [locale]/          # Semua halaman dalam folder ini
│       ├── layout.tsx     # Layout dengan NextIntlClientProvider
│       └── page.tsx       # Homepage
└── components/
    └── LanguageSwitcher.tsx  # Komponen untuk ganti bahasa
```

## Cara Menggunakan Translate di Komponen

### 1. Client Component
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav'); // 'nav' adalah key di messages/*.json
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('destinations')}</p>
    </div>
  );
}
```

### 2. Server Component
```tsx
import { useTranslations } from 'next-intl';

export default async function MyServerComponent() {
  const t = await useTranslations('home');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### 3. Menggunakan Locale di Link
```tsx
'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function MyNav() {
  const locale = useLocale();
  
  return (
    <Link href={`/${locale}/destinasi`}>
      Destinations
    </Link>
  );
}
```

## Menambahkan Terjemahan Baru

1. Buka file `messages/id.json` dan `messages/en.json`
2. Tambahkan key baru dengan terjemahannya

**messages/id.json:**
```json
{
  "myPage": {
    "title": "Judul Halaman",
    "description": "Deskripsi halaman"
  }
}
```

**messages/en.json:**
```json
{
  "myPage": {
    "title": "Page Title",
    "description": "Page description"
  }
}
```

3. Gunakan di komponen:
```tsx
const t = useTranslations('myPage');
<h1>{t('title')}</h1>
```

## Language Switcher

Komponen `LanguageSwitcher` sudah ditambahkan di Navbar. User bisa mengklik icon globe untuk mengganti bahasa.

## URL Structure

- `/id/` - Homepage Bahasa Indonesia
- `/en/` - Homepage Bahasa Inggris  
- `/id/destinasi` - Halaman Destinasi Bahasa Indonesia
- `/en/destinasi` - Halaman Destinasi Bahasa Inggris

## Tips

1. **Gunakan nested keys** untuk organisasi yang lebih baik:
   ```json
   {
     "destinations": {
       "title": "Destinasi Wisata",
       "list": {
         "beach": "Pantai",
         "mountain": "Gunung"
       }
     }
   }
   ```
   
   Akses dengan: `t('destinations.list.beach')`

2. **Fallback ke default locale** jika terjemahan tidak ditemukan

3. **Middleware** sudah dikonfigurasi untuk:
   - Skip admin routes (tidak perlu locale)
   - Auto-redirect dari `/` ke `/id` (default locale)
   - Preserve auth state

## Halaman Yang Perlu Dimigrasi

Untuk mengimplementasikan translate di semua halaman, setiap halaman perlu:
1. Dipindahkan ke folder `app/[locale]/`
2. Menambahkan useTranslations hook
3. Update semua hard-coded text dengan `t('key')`
4. Update semua Link href dengan `/${locale}/path`

Contoh halaman yang perlu dimigrasi:
- `app/destinasi/page.tsx` → `app/[locale]/destinasi/page.tsx`
- `app/kuliner/page.tsx` → `app/[locale]/kuliner/page.tsx`
- `app/berita/page.tsx` → `app/[locale]/berita/page.tsx`
- Dan seterusnya...
