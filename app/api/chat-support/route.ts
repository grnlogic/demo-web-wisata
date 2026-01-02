import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const AI_API_URL = process.env.AI_API_URL!;
const AI_API_KEY = process.env.AI_API_KEY!;

// Helper function to fetch website data
async function fetchWebsiteContext() {
  try {
    const [destinasi, events, berita, ukms] = await Promise.all([
      prisma.destinasi.findMany({
        where: { status: "PUBLISHED" },
        select: {
          nama: true,
          kategori: true,
          lokasi: true,
          deskripsi: true,
          rating: true,
          harga: {
            select: { jenisHarga: true, harga: true },
          },
        },
        take: 10,
        orderBy: { featured: "desc" },
      }),
      prisma.event.findMany({
        where: { status: "PUBLISHED" },
        select: {
          nama: true,
          lokasi: true,
          tanggalMulai: true,
          tanggalSelesai: true,
          deskripsi: true,
        },
        take: 5,
        orderBy: { tanggalMulai: "desc" },
      }),
      prisma.berita.findMany({
        where: { status: "PUBLISHED" },
        select: {
          judul: true,
          kategori: true,
          ringkasan: true,
        },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.profilUkm.findMany({
        where: { status: "PUBLISHED" },
        select: {
          namaUsaha: true,
          kategori: true,
          lokasi: true,
          deskripsi: true,
        },
        take: 5,
        orderBy: { featured: "desc" },
      }),
    ]);

    return { destinasi, events, berita, ukms };
  } catch (error) {
    console.error("Error fetching website context:", error);
    return { destinasi: [], events: [], berita: [], ukms: [] };
  }
}

// Helper function to build context string
function buildContextString(data: any) {
  let context = "\n\n=== DATA WEBSITE WISATA PANGANDARAN ===\n\n";

  // Destinasi
  if (data.destinasi.length > 0) {
    context += "DESTINASI WISATA:\n";
    data.destinasi.forEach((d: any, i: number) => {
      const harga = d.harga[0]
        ? `Rp ${d.harga[0].harga.toLocaleString("id-ID")}`
        : "Gratis";
      context += `${i + 1}. ${d.nama} (${d.kategori})\n`;
      context += `   Lokasi: ${d.lokasi}\n`;
      context += `   Harga mulai: ${harga}\n`;
      context += `   Rating: ${d.rating || "N/A"}/5\n`;
      context += `   Deskripsi: ${d.deskripsi.substring(0, 150)}...\n\n`;
    });
  }

  // Events
  if (data.events.length > 0) {
    context += "\nEVENT & AGENDA:\n";
    data.events.forEach((e: any, i: number) => {
      context += `${i + 1}. ${e.nama}\n`;
      context += `   Lokasi: ${e.lokasi}\n`;
      context += `   Tanggal: ${new Date(e.tanggalMulai).toLocaleDateString("id-ID")} - ${new Date(e.tanggalSelesai).toLocaleDateString("id-ID")}\n`;
      context += `   ${e.deskripsi.substring(0, 100)}...\n\n`;
    });
  }

  // Berita
  if (data.berita.length > 0) {
    context += "\nBERITA TERBARU:\n";
    data.berita.forEach((b: any, i: number) => {
      context += `${i + 1}. ${b.judul} (${b.kategori})\n`;
      if (b.ringkasan) {
        context += `   ${b.ringkasan.substring(0, 100)}...\n\n`;
      }
    });
  }

  // UKM
  if (data.ukms.length > 0) {
    context += "\nUKM LOKAL:\n";
    data.ukms.forEach((u: any, i: number) => {
      context += `${i + 1}. ${u.namaUsaha} (${u.kategori})\n`;
      context += `   Lokasi: ${u.lokasi}\n`;
      context += `   ${u.deskripsi.substring(0, 100)}...\n\n`;
    });
  }

  return context;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Fetch real website data
    const websiteData = await fetchWebsiteContext();
    const contextString = buildContextString(websiteData);

    // Enhance system message with real data
    const enhancedMessages = messages.map((msg: any) => {
      if (msg.role === "system") {
        return {
          ...msg,
          content: msg.content + contextString,
        };
      }
      return msg;
    });

    // Call AI API
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: enhancedMessages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("AI API Error:", errorData);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();

    // Extract message from AI response
    const aiMessage =
      data.choices?.[0]?.message?.content || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";

    return NextResponse.json({
      success: true,
      message: aiMessage,
    });
  } catch (error) {
    console.error("Error in chat-support API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process chat request",
        message:
          "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin kami.",
      },
      { status: 500 }
    );
  }
}
