-- CreateTable
CREATE TABLE "berita" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "ringkasan" TEXT,
    "kategori" TEXT NOT NULL,
    "gambarUtama" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "status" "status_publish" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profil_ukm" (
    "id" TEXT NOT NULL,
    "namaUsaha" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "pemilik" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "koordinat" TEXT,
    "nomorTelepon" TEXT,
    "email" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "gambar" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "produkLayanan" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hargaRata" TEXT,
    "jamOperasional" TEXT,
    "status" "status_publish" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "profil_ukm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rekomendasi" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "durasi" TEXT,
    "estimasiBudget" TEXT,
    "destinasiIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gambarUtama" TEXT,
    "status" "status_publish" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rekomendasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "berita_slug_key" ON "berita"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "profil_ukm_slug_key" ON "profil_ukm"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "rekomendasi_slug_key" ON "rekomendasi"("slug");

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil_ukm" ADD CONSTRAINT "profil_ukm_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
