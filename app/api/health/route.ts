import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1 as test`;
    
    // Test galeri table
    const galeriCount = await prisma.galeri.count();
    
    const duration = Date.now() - startTime;
    
    return NextResponse.json({ 
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        status: "connected",
        responseTime: `${duration}ms`,
        tables: {
          galeri: {
            count: galeriCount,
            accessible: true
          }
        }
      },
      environment: {
        DATABASE_URL: process.env.DATABASE_URL ? "✓ Set" : "✗ Not set",
        NODE_ENV: process.env.NODE_ENV || "not set",
      },
      prisma: {
        version: "Connected",
        client: "Initialized"
      }
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    
    return NextResponse.json(
      { 
        status: "error",
        timestamp: new Date().toISOString(),
        database: {
          status: "disconnected",
          responseTime: `${duration}ms`,
          error: {
            message: error instanceof Error ? error.message : "Unknown error",
            type: error instanceof Error ? error.constructor.name : "Unknown",
            stack: process.env.NODE_ENV === "development" && error instanceof Error 
              ? error.stack 
              : undefined
          }
        },
        environment: {
          DATABASE_URL: process.env.DATABASE_URL ? "✓ Set (but connection failed)" : "✗ Not set",
          NODE_ENV: process.env.NODE_ENV || "not set",
        },
        troubleshooting: {
          steps: [
            "1. Verify DATABASE_URL is set in environment variables",
            "2. Check database server is running and accessible",
            "3. Verify database credentials are correct",
            "4. Check IP whitelist if using cloud database",
            "5. Ensure Prisma Client is generated (npm run build)"
          ]
        }
      },
      { status: 500 }
    );
  }
}
