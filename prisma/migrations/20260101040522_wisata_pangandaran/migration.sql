-- CreateEnum
CREATE TYPE "kategori_destinasi" AS ENUM ('PANTAI', 'CAGAR_ALAM', 'GOA', 'WISATA_BUDAYA', 'WISATA_BAHARI', 'WAHANA_AIR', 'KAMPUNG_TURIS', 'LAINNYA');

-- CreateEnum
CREATE TYPE "jenis_detail" AS ENUM ('FASILITAS', 'AKTIVITAS', 'TIPS', 'ATURAN', 'AKSES', 'LAINNYA');

-- CreateEnum
CREATE TYPE "kategori_galeri" AS ENUM ('PANTAI', 'KULINER', 'BUDAYA', 'WAHANA', 'EVENT', 'SUNSET', 'SUNRISE', 'UNDERWATER', 'LAINNYA');

-- CreateEnum
CREATE TYPE "tipe_media" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "kategori_info" AS ENUM ('SEJARAH', 'GEOGRAFI', 'TRANSPORTASI', 'AKOMODASI', 'TIPS_WISATA', 'KONTAK_PENTING', 'FAQ', 'LAINNYA');

-- CreateEnum
CREATE TYPE "status_publish" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinasi" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" "kategori_destinasi" NOT NULL,
    "lokasi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "koordinat" TEXT,
    "googleMapsUrl" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "jumlahReview" INTEGER DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "status" "status_publish" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "destinasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinasi_images" (
    "id" TEXT NOT NULL,
    "destinasiId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "destinasi_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinasi_harga" (
    "id" TEXT NOT NULL,
    "destinasiId" TEXT NOT NULL,
    "jenisHarga" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "keterangan" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "destinasi_harga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinasi_detail" (
    "id" TEXT NOT NULL,
    "destinasiId" TEXT NOT NULL,
    "jenis" "jenis_detail" NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "destinasi_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3) NOT NULL,
    "jamMulai" TEXT,
    "jamSelesai" TEXT,
    "gambar" TEXT,
    "thumbnail" TEXT,
    "kontakPerson" TEXT,
    "nomorTelepon" TEXT,
    "hargaTiket" TEXT,
    "status" "status_publish" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "kategori" "kategori_galeri" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tipeMedia" "tipe_media" NOT NULL DEFAULT 'IMAGE',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uploadedBy" TEXT NOT NULL,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informasi_umum" (
    "id" TEXT NOT NULL,
    "kategori" "kategori_info" NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "icon" TEXT,
    "gambar" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "status" "status_publish" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "informasi_umum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kuliner" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "koordinat" TEXT,
    "googleMapsUrl" TEXT,
    "hargaMin" INTEGER,
    "hargaMax" INTEGER,
    "nomorTelepon" TEXT,
    "jamBuka" TEXT,
    "gambar" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" DOUBLE PRECISION DEFAULT 0,
    "status" "status_publish" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kuliner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "destinasi_slug_key" ON "destinasi"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "informasi_umum_slug_key" ON "informasi_umum"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "kuliner_slug_key" ON "kuliner"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- AddForeignKey
ALTER TABLE "destinasi" ADD CONSTRAINT "destinasi_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinasi_images" ADD CONSTRAINT "destinasi_images_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "destinasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinasi_harga" ADD CONSTRAINT "destinasi_harga_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "destinasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinasi_detail" ADD CONSTRAINT "destinasi_detail_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "destinasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri" ADD CONSTRAINT "galeri_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informasi_umum" ADD CONSTRAINT "informasi_umum_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
