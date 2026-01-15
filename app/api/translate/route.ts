import { NextRequest, NextResponse } from 'next/server';
import { translateText } from '@/lib/translation';

/**
 * API Route untuk translate text
 * 
 * Contoh penggunaan:
 * POST /api/translate
 * Body: {
 *   "text": "Selamat datang di Pangandaran",
 *   "from": "id",
 *   "to": "en"
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, from = 'id', to = 'en', format = 'text' } = body;

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        // Validasi bahasa
        if (!['en', 'id'].includes(from) || !['en', 'id'].includes(to)) {
            return NextResponse.json(
                { error: 'Invalid language code. Use "en" or "id"' },
                { status: 400 }
            );
        }

        const translatedText = await translateText(text, from as 'en' | 'id', to as 'en' | 'id', format);

        return NextResponse.json({
            original: text,
            translated: translatedText,
            from,
            to,
        });
    } catch (error) {
        console.error('Translation API error:', error);
        return NextResponse.json(
            { error: 'Translation failed' },
            { status: 500 }
        );
    }
}
