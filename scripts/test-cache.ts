import { translateText } from '../lib/translation';
import { prisma } from '../lib/prisma';

async function testCache() {
    const uniqueText = `Test Caching ${new Date().getTime()}`;
    console.log(`\n--- Test Start: "${uniqueText}" ---`);

    console.log("1. First call (Should be API/Cache Miss)...");
    const start1 = performance.now();
    const res1 = await translateText(uniqueText, 'id', 'en');
    const end1 = performance.now();
    console.log(`Result: "${res1}"`);
    console.log(`Time: ${(end1 - start1).toFixed(2)}ms`);

    console.log("\n2. Second call (Should be Cache Hit)...");
    const start2 = performance.now();
    const res2 = await translateText(uniqueText, 'id', 'en');
    const end2 = performance.now();
    console.log(`Result: "${res2}"`);
    console.log(`Time: ${(end2 - start2).toFixed(2)}ms`);

    if ((end2 - start2) < (end1 - start1)) {
        console.log("\n✅ SUCCESS: Second call was faster (Cache Hit)");
    } else {
        console.log("\n⚠️ WARNING: Second call was not significantly faster (Check logs)");
    }
}

testCache()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
