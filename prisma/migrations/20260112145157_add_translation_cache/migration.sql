-- CreateTable
CREATE TABLE "translation_cache" (
    "id" TEXT NOT NULL,
    "lookupKey" TEXT NOT NULL,
    "sourceText" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "sourceLang" TEXT NOT NULL DEFAULT 'id',
    "targetLang" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translation_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "translation_cache_lookupKey_key" ON "translation_cache"("lookupKey");

-- CreateIndex
CREATE INDEX "translation_cache_lookupKey_idx" ON "translation_cache"("lookupKey");
