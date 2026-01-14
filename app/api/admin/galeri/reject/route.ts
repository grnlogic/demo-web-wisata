
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { ids } = body; // Array of IDs

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: "No IDs provided" },
                { status: 400 }
            );
        }

        await prisma.galeri.updateMany({
            where: {
                id: { in: ids },
            },
            data: {
                status: "REJECTED",
                approvedBy: session.user.id,
                approvedAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, count: ids.length });
    } catch (error) {
        console.error("Error rejecting gallery:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
