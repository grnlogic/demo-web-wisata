-- CreateTable
CREATE TABLE "hotel_listings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "thumbnail" TEXT,
    "source" TEXT,
    "location" TEXT,
    "price" TEXT,
    "rating" DOUBLE PRECISION,
    "reviews" INTEGER,
    "propertyToken" TEXT,
    "checkInDate" TEXT,
    "checkOutDate" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "hotel_listings_fetchedAt_idx" ON "hotel_listings"("fetchedAt");
