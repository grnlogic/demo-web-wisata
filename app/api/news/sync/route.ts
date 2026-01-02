import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Types for NewsData.io API
interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  content: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  category: string[];
}

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// Helper function to determine category
function determineCategory(categories: string[]): string {
  const categoryMap: Record<string, string> = {
    tourism: 'Tips Wisata',
    travel: 'Tips Wisata',
    entertainment: 'Event',
    business: 'Berita Lokal',
    politics: 'Pengumuman',
  };

  for (const cat of categories) {
    if (categoryMap[cat]) {
      return categoryMap[cat];
    }
  }

  return 'Berita Lokal';
}

export async function GET(request: Request) {
  try {
    // Check for authorization (optional - bisa pakai secret key)
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Uncomment this if you want to protect the endpoint
    // if (secret !== process.env.CRON_SECRET) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const API_KEY = process.env.NEWSDATA_API_KEY;
    
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Fetch news from NewsData.io
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=pangandaran&language=id`;
    
    console.log('Fetching news from NewsData.io...');
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`NewsData API error: ${response.status}`);
    }

    const data: NewsDataResponse = await response.json();
    
    console.log(`Found ${data.totalResults} articles`);

    // Get admin user (default admin for automated posts)
    const admin = await prisma.admin.findFirst({
      where: { username: 'admin' }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 500 }
      );
    }

    // Process and save articles
    let savedCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    for (const article of data.results) {
      try {
        // Skip articles without title or description
        if (!article.title || !article.description) {
          skippedCount++;
          continue;
        }

        const slug = generateSlug(article.title);
        
        // Check if article already exists
        const existing = await prisma.berita.findUnique({
          where: { slug }
        });

        if (existing) {
          skippedCount++;
          continue;
        }

        // Create news article
        await prisma.berita.create({
          data: {
            judul: article.title,
            slug: slug,
            konten: article.content || article.description || '',
            ringkasan: article.description,
            kategori: determineCategory(article.category || []),
            gambarUtama: article.image_url,
            sourceUrl: article.link,
            sourceImage: article.image_url,
            isExternal: true,
            tags: article.category || [],
            status: 'PUBLISHED',
            featured: false,
            publishedAt: new Date(article.pubDate),
            createdBy: admin.id,
          }
        });

        savedCount++;
        console.log(`✅ Saved: ${article.title}`);
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Failed to save "${article.title}": ${errorMsg}`);
        console.error(`❌ Error saving article:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'News sync completed',
      stats: {
        totalFetched: data.totalResults,
        saved: savedCount,
        skipped: skippedCount,
        errors: errors.length,
      },
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('News sync error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Optional: POST method untuk manual trigger dari admin dashboard
export async function POST(request: Request) {
  return GET(request);
}
