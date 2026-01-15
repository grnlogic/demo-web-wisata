-- Migration: Add status field to Galeri table
-- This fixes the error: "The column `galeri.status` does not exist in the current database"

-- Step 1: Create the enum type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE "status_galeri" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add the status column with default value APPROVED
ALTER TABLE "galeri" 
ADD COLUMN IF NOT EXISTS "status" "status_galeri" NOT NULL DEFAULT 'APPROVED';

-- Step 3: Create index for better query performance
CREATE INDEX IF NOT EXISTS "galeri_status_idx" ON "galeri"("status");

-- Verification query (run this separately to check)
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'galeri' AND column_name = 'status';
