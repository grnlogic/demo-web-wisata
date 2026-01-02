/*
  Warnings:

  - Added the required column `alamat` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "googleMapsUrl" TEXT,
ADD COLUMN     "koordinat" TEXT;
