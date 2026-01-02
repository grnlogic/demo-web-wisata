# Event Management - Dokumentasi

## Overview

Sistem manajemen event telah dibuat dengan fitur lengkap untuk admin dan publik.

## Fitur yang Sudah Dibuat

### 1. Admin Panel

- **List Event**: `/admin/event`
  - Tampilkan semua event dengan pagination
  - Search dan filter berdasarkan status (DRAFT/PUBLISHED)
  - Status event otomatis (Akan Datang, Sedang Berlangsung, Selesai)
  - Edit dan hapus event
- **Create Event**: `/admin/event/create`

  - Form lengkap untuk membuat event baru
  - Auto-generate slug dari nama event
  - Upload gambar dan thumbnail
  - Set tanggal, waktu, lokasi
  - Informasi kontak dan harga tiket
  - Status publikasi dan featured

- **Edit Event**: `/admin/event/edit/[id]`
  - Edit semua informasi event
  - Hapus event

### 2. Public Pages

- **List Event**: `/event`
  - Tampilkan semua event yang PUBLISHED
  - Search event
  - Status badge (Akan Datang, Sedang Berlangsung, Selesai)
  - Featured badge
- **Detail Event**: `/event/[slug]`
  - Detail lengkap event
  - Informasi kontak dengan link WhatsApp
  - Share button
  - Back to list

### 3. API Endpoints

#### Admin Endpoints (Authentication Required)

- `GET /api/admin/event` - List semua event
- `POST /api/admin/event` - Create event baru
- `GET /api/admin/event/[id]` - Get single event by ID
- `PUT /api/admin/event/[id]` - Update event
- `DELETE /api/admin/event/[id]` - Delete event

#### Public Endpoints

- `GET /api/event` - List event published
- `GET /api/event/[slug]` - Get event by slug

## Database Schema

```prisma
model Event {
  id             String   @id @default(cuid())
  nama           String
  slug           String   @unique
  deskripsi      String   @db.Text
  lokasi         String
  tanggalMulai   DateTime
  tanggalSelesai DateTime
  jamMulai       String?
  jamSelesai     String?
  gambar         String?  @db.Text
  thumbnail      String?  @db.Text
  kontakPerson   String?
  nomorTelepon   String?
  hargaTiket     String?  @db.Text
  status         StatusPublish @default(DRAFT)
  featured       Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  createdBy      String
  admin          Admin    @relation(fields: [createdBy], references: [id])
}
```

## Dependencies

- `date-fns` - Format tanggal dengan locale Indonesia
- `slugify` - Generate URL-friendly slug dari nama event

## Status Event Otomatis

Event secara otomatis akan menampilkan status berdasarkan tanggal:

- **Akan Datang**: Jika `tanggalMulai > now`
- **Sedang Berlangsung**: Jika `tanggalMulai <= now <= tanggalSelesai`
- **Selesai**: Jika `tanggalSelesai < now`

## Cara Penggunaan

1. Login ke admin panel
2. Buka menu Event
3. Klik "Tambah Event" untuk membuat event baru
4. Isi semua informasi yang diperlukan
5. Set status PUBLISHED agar tampil di halaman publik
6. Event akan tampil di `/event`
