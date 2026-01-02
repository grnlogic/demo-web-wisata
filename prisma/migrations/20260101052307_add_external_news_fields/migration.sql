-- AlterTable
ALTER TABLE "berita" ADD COLUMN     "isExternal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sourceImage" TEXT,
ADD COLUMN     "sourceUrl" TEXT;
