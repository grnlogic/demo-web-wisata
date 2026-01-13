# 🌐 Real-time Translation System

Sistem translasi real-time menggunakan LibreTranslate API untuk menerjemahkan konten secara otomatis dari Bahasa Indonesia ke Bahasa Inggris.

## 🔧 Konfigurasi

API Translation Server: `http://72.62.125.104:5000`
- Bahasa tersedia: Indonesia (id), English (en)
- Auto-caching untuk performa optimal
- Fallback ke teks asli jika translasi gagal

## 📖 Cara Penggunaan

### 1. **Di Client Component (React)**

```tsx
'use client';

import { useLocale, useAsyncTranslate, T } from '@/lib/i18n-helpers';

export default function MyComponent() {
  const locale = useLocale();
  
  // Method 1: Menggunakan hook
  const { translated, isLoading } = useAsyncTranslate('Selamat datang di Pangandaran');
  
  // Method 2: Menggunakan component wrapper
  return (
    <div>
      <h1><T>Selamat datang di Pangandaran</T></h1>
      <p>{translated}</p>
      <p>Locale: {locale}</p>
    </div>
  );
}
```

### 2. **Di Server Component**

```tsx
import { translateServer } from '@/lib/i18n-helpers';

export default async function ServerPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  
  const title = await translateServer(
    'Destinasi Wisata Pangandaran', 
    locale as 'id' | 'en'
  );
  
  return <h1>{title}</h1>;
}
```

### 3. **Translate dari Database Content**

```tsx
import { translateObject } from '@/lib/translation';

// Di API route atau server action
const destinasi = await prisma.destinasi.findUnique({
  where: { slug: 'pantai-pangandaran' }
});

// Auto-translate field tertentu
const translated = await translateObject(
  destinasi,
  ['nama', 'deskripsi', 'alamat'],
  'id',
  'en'
);

// Sekarang translated memiliki field yang sudah diterjemahkan
console.log(translated.nama); // "Pangandaran Beach"
```

### 4. **Batch Translation**

```tsx
import { translateBatch } from '@/lib/translation';

const items = ['Pantai', 'Gunung', 'Sungai', 'Hutan'];

const translated = await translateBatch(items, 'id', 'en');
// ["Beach", "Mountain", "River", "Forest"]
```

### 5. **Manual Translation**

```tsx
import { translateText } from '@/lib/translation';

const result = await translateText(
  'Pantai Pangandaran sangat indah',
  'id',  // from
  'en',  // to
  'text' // format: 'text' atau 'html'
);

console.log(result); // "Pangandaran Beach is very beautiful"
```

### 6. **Via API Endpoint**

```bash
# Test translation API
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Selamat datang di Pangandaran",
    "from": "id",
    "to": "en"
  }'
```

## 🎨 Best Practices

### ✅ DO:

1. **Gunakan text Indonesia sebagai source**
   ```tsx
   // ✅ Good
   <T>Selamat datang</T>
   
   // ❌ Bad - jangan pakai variabel
   <T>{variableText}</T>
   ```

2. **Simpan text asli di database**
   ```tsx
   // Simpan dalam Bahasa Indonesia
   await prisma.destinasi.create({
     data: {
       nama: 'Pantai Pangandaran',
       deskripsi: 'Pantai yang indah...'
     }
   });
   ```

3. **Gunakan cache untuk performa**
   - Cache sudah built-in di hook
   - Translation yang sama tidak akan di-request ulang

### ❌ DON'T:

1. **Jangan translate text yang sama berulang kali**
   ```tsx
   // ❌ Bad - akan translate setiap render
   {items.map(item => (
     <T>{item.name}</T>
   ))}
   
   // ✅ Good - translate sekali di parent
   const translatedItems = await translateBatch(
     items.map(i => i.name), 'id', 'en'
   );
   ```

2. **Jangan translate ID atau slug**
   ```tsx
   // ❌ Bad
   const slug = await translateText('pantai-pangandaran', 'id', 'en');
   
   // ✅ Good - slug tetap sama
   const slug = 'pantai-pangandaran';
   ```

## 🚀 Migration dari next-intl

### Before (JSON-based):
```tsx
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('nav');
  return <h1>{t('home')}</h1>;
}
```

### After (API-based):
```tsx
import { T } from '@/lib/i18n-helpers';

export default function Page() {
  return <h1><T>Beranda</T></h1>;
}
```

## 📊 Struktur File

```
lib/
├── translation.ts          # Core translation functions
├── i18n-helpers.ts        # React hooks & helpers
└── translation-examples.ts # Contoh penggunaan

app/api/
└── translate/
    └── route.ts           # API endpoint untuk translation

components/
├── TranslateButton.tsx    # UI component untuk translate
└── TranslatedCardNav.tsx  # Wrapper dengan auto-translate
```

## 🔍 Troubleshooting

### Translation tidak muncul?
1. Cek koneksi ke translation server: `curl http://72.62.125.104:5000/languages`
2. Cek console browser untuk error
3. Pastikan locale sudah benar: `useLocale()`

### Translation lambat?
1. Gunakan batch translation untuk multiple items
2. Translation akan di-cache otomatis
3. Untuk static content, translate di build time

### Translation tidak akurat?
1. LibreTranslate belum sempurna untuk nama tempat
2. Untuk nama destinasi, simpan 2 versi di database
3. Atau gunakan translation API lain (Google Translate, DeepL)

## 🎯 Use Cases

| Scenario | Solution |
|----------|----------|
| Static text (nav, buttons) | `<T>Text Indonesia</T>` |
| Dynamic content dari DB | `translateObject()` atau `translateBatch()` |
| User-generated content | `translateText()` on-demand |
| API response | Use `/api/translate` endpoint |
| Server component | `translateServer()` |

## ⚡ Performance Tips

1. **Lazy load translations** - Hanya translate yang terlihat
2. **Batch requests** - Combine multiple translations
3. **Cache aggressively** - Built-in caching sudah aktif
4. **Static generation** - Pre-translate di build time untuk static pages

---

**Note:** Sistem ini menggantikan `next-intl` dengan real-time translation API. File JSON messages tidak lagi digunakan.
