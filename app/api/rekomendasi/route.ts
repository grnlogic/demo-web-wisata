import { NextResponse } from "next/server";
import { prisma, dbConnected } from "@/lib/prisma";
import { dummyRekomendasi } from "@/lib/dummy-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  try {
    if (dbConnected && prisma) {
      const rekomendasi = await prisma.rekomendasi.findMany({
        where: {
          status: "PUBLISHED",
          ...(featured === "true" && { featured: true }),
        },
        orderBy: [{ featured: "desc" }, { urutan: "asc" }, { createdAt: "desc" }],
      });
      return NextResponse.json(rekomendasi);
    }
  } catch (_) {}

  let list = dummyRekomendasi.filter((r) => r.status === "PUBLISHED");
  if (featured === "true") list = list.filter((r) => r.featured);
  return NextResponse.json(list);
}
