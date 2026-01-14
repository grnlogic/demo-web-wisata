
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        // Support both single object and array
        const items = Array.isArray(body) ? body : [body];

        if (items.length === 0) {
            return NextResponse.json(
                { error: "Tidak ada data yang dikirim" },
                { status: 400 }
            );
        }

        // Validate all items
        for (const item of items) {
            const { judul, url, kategori } = item;
            if (!judul || !url || !kategori) {
                return NextResponse.json(
                    { error: "Judul, URL, dan Kategori wajib diisi untuk setiap foto" },
                    { status: 400 }
                );
            }
        }

        const createdItems = await prisma.$transaction(
            items.map((item: any) =>
                prisma.galeri.create({
                    data: {
                        judul: item.judul,
                        deskripsi: item.deskripsi,
                        url: item.url,
                        kategori: item.kategori,
                        tags: item.tags || [],
                        tipeMedia: item.tipeMedia || "IMAGE",
                        status: "PENDING",
                        userId: session.user.id,
                    },
                })
            )
        );

        return NextResponse.json({ success: true, data: createdItems });
    } catch (error) {
        console.error("Error uploading gallery:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
