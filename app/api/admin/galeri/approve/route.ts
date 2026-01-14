
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendGalleryApprovedEmail } from "@/lib/email";

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

        // 1. Update status to APPROVED
        await prisma.galeri.updateMany({
            where: {
                id: { in: ids },
            },
            data: {
                status: "APPROVED",
                approvedBy: session.user.id,
                approvedAt: new Date(),
            },
        });

        // 2. Group by User to send batch emails
        // We need to fetch the galleries with user info to know who to email
        const galleries = await prisma.galeri.findMany({
            where: {
                id: { in: ids },
                userId: { not: null }, // Only user uploads
            },
            include: {
                user: true,
            },
        });

        const userMap = new Map<string, { email: string; name: string; count: number }>();

        galleries.forEach((gal) => {
            if (gal.user && gal.user.email) {
                const existing = userMap.get(gal.user.email);
                if (existing) {
                    existing.count++;
                } else {
                    userMap.set(gal.user.email, {
                        email: gal.user.email,
                        name: gal.user.name || "Pengguna",
                        count: 1,
                    });
                }
            }
        });

        // 3. Send Emails
        const emailPromises = Array.from(userMap.values()).map((u) =>
            sendGalleryApprovedEmail(u.email, u.name, u.count)
        );
        await Promise.all(emailPromises);

        return NextResponse.json({ success: true, count: ids.length, emailsSent: emailPromises.length });
    } catch (error) {
        console.error("Error approving gallery:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
