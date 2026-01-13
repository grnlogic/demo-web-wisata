/**
 * Contoh Penggunaan Translation API di Website
 * 
 * File ini berisi berbagai contoh cara menggunakan API translasi
 */

import { translateText, translateObject, translateBatch } from '@/lib/translation';

// ============================================
// CONTOH 1: Translate Simple Text
// ============================================
async function example1() {
  const text = 'Pantai Pangandaran sangat indah';
  const translated = await translateText(text, 'id', 'en');
  console.log(translated); // "Pangandaran Beach is very beautiful"
}

// ============================================
// CONTOH 2: Auto-translate saat Save Content di Admin
// ============================================
async function autoTranslateBerita(data: any) {
  // Ketika admin input berita dalam bahasa Indonesia
  const beritaIndo = {
    judul: 'Pantai Pangandaran Ramai Dikunjungi',
    konten: 'Libur tahun baru, Pantai Pangandaran ramai dikunjungi wisatawan...',
    deskripsi: 'Ribuan wisatawan memadati Pantai Pangandaran'
  };

  // Auto translate ke English
  const beritaEnglish = await translateObject(
    beritaIndo,
    ['judul', 'konten', 'deskripsi'],
    'id',
    'en'
  );

  // Save ke database dengan 2 bahasa
  // await prisma.berita.create({
  //   data: {
  //     judul_id: beritaIndo.judul,
  //     judul_en: beritaEnglish.judul,
  //     konten_id: beritaIndo.konten,
  //     konten_en: beritaEnglish.konten,
  //     ...
  //   }
  // });
}

// ============================================
// CONTOH 3: Translate Batch Data (Multiple Items)
// ============================================
async function translateMultipleDestinations() {
  const destinations = [
    'Pantai Pangandaran',
    'Green Canyon',
    'Batu Hiu',
    'Pantai Batu Karas'
  ];

  const translated = await translateBatch(destinations, 'id', 'en');
  console.log(translated);
  // ["Pangandaran Beach", "Green Canyon", "Shark Stone", "Batu Karas Beach"]
}

// ============================================
// CONTOH 4: Translate di API Route
// ============================================
// File: app/api/destinasi/route.ts
/*
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nama, deskripsi, alamat } = body;

  // Auto translate ke English
  const nama_en = await translateText(nama, 'id', 'en');
  const deskripsi_en = await translateText(deskripsi, 'id', 'en');
  const alamat_en = await translateText(alamat, 'id', 'en');

  const destinasi = await prisma.destinasi.create({
    data: {
      nama_id: nama,
      nama_en: nama_en,
      deskripsi_id: deskripsi,
      deskripsi_en: deskripsi_en,
      alamat_id: alamat,
      alamat_en: alamat_en,
    }
  });

  return NextResponse.json(destinasi);
}
*/

// ============================================
// CONTOH 5: Translate User Input di Form
// ============================================
// File: app/admin/berita/page.tsx
/*
'use client';

import { useState } from 'react';
import { useTranslate } from '@/components/TranslateButton';

export default function BeritaForm() {
  const [judulId, setJudulId] = useState('');
  const [judulEn, setJudulEn] = useState('');
  const { translate } = useTranslate();

  const handleAutoTranslate = async () => {
    const translated = await translate(judulId, 'id', 'en');
    setJudulEn(translated);
  };

  return (
    <form>
      <input
        value={judulId}
        onChange={(e) => setJudulId(e.target.value)}
        placeholder="Judul (Indonesia)"
      />
      
      <button type="button" onClick={handleAutoTranslate}>
        Auto Translate
      </button>
      
      <input
        value={judulEn}
        onChange={(e) => setJudulEn(e.target.value)}
        placeholder="Title (English)"
      />
    </form>
  );
}
*/

// ============================================
// CONTOH 6: Fallback Translation untuk Missing Content
// ============================================
async function getBeritaWithFallback(slug: string, locale: 'id' | 'en') {
  // const berita = await prisma.berita.findUnique({ where: { slug } });
  
  // Jika content English tidak ada, auto translate dari Indonesian
  // if (locale === 'en' && !berita.judul_en) {
  //   berita.judul_en = await translateText(berita.judul_id, 'id', 'en');
  //   berita.konten_en = await translateText(berita.konten_id, 'id', 'en');
  // }
  
  // return berita;
}

// ============================================
// CONTOH 7: Translate HTML Content
// ============================================
async function translateHTMLContent() {
  const htmlContent = '<p>Selamat datang di <strong>Pangandaran</strong></p>';
  const translated = await translateText(htmlContent, 'id', 'en', 'html');
  console.log(translated);
  // "<p>Welcome to <strong>Pangandaran</strong></p>"
}

export {
  example1,
  autoTranslateBerita,
  translateMultipleDestinations,
  getBeritaWithFallback,
  translateHTMLContent
};
