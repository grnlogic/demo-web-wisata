
import { prisma } from "../lib/prisma";
import { translateText } from "../lib/translation";

async function main() {
    console.log("Starting translation worker...");

    // 1. Fetch all destinations
    const destinations = await prisma.destinasi.findMany({
        where: { status: "PUBLISHED" },
        include: {
            harga: true,
        },
    });

    console.log(`Found ${destinations.length} destinations to process.`);

    let processedCount = 0;
    let translatedCount = 0;
    let errorCount = 0;

    for (const dest of destinations) {
        processedCount++;
        console.log(`Processing [${processedCount}/${destinations.length}]: ${dest.nama}`);

        try {
            // Translate Name
            await translateText(dest.nama, "id", "en");

            // Translate Description
            if (dest.deskripsi) {
                // Chunk description if too long? For now let's trust the API or existing chunks
                await translateText(dest.deskripsi, "id", "en");
            }

            // Translate Location
            if (dest.lokasi) {
                await translateText(dest.lokasi, "id", "en");
            }

            // Translate Price Types
            if (dest.harga && dest.harga.length > 0) {
                for (const h of dest.harga) {
                    if (h.jenisHarga) {
                        await translateText(h.jenisHarga, "id", "en");
                    }
                }
            }

            translatedCount++;
            // Small delay to be polite to the API server
            await new Promise((resolve) => setTimeout(resolve, 200));

        } catch (error) {
            console.error(`Failed to translate destination ${dest.id}:`, error);
            errorCount++;
        }
    }

    console.log("Translation worker finished.");
    console.log(`Summary: Processed ${processedCount}, Success ${translatedCount}, Errors ${errorCount}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
