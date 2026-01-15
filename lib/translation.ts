import { prisma } from './prisma';
import crypto from 'crypto';

/**
 * Translation API Helper with Database Caching
 * Menggunakan LibreTranslate API yang di-host di server
 */

const TRANSLATION_API_URL = 'http://72.62.125.104:5000';

export interface TranslationOptions {
  q: string;
  source: 'en' | 'id';
  target: 'en' | 'id';
  format?: 'text' | 'html';
}

export interface TranslationResult {
  translatedText: string;
}

/**
 * Generate hash untuk lookup key cache
 */
function generateLookupKey(text: string, source: string, target: string): string {
  const content = `${text}:${source}:${target}`;
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Translate text menggunakan Caching + LibreTranslate API
 * 
 * Flow:
 * 1. Check Database (TranslationCache)
 * 2. If exists -> Return DB result
 * 3. If missing -> Call API
 * 4. Save API result to DB
 * 5. Return result
 */
export async function translateText(
  text: string,
  from: 'en' | 'id' = 'id',
  to: 'en' | 'id' = 'en',
  format: 'text' | 'html' = 'text'
): Promise<string> {
  // 1. Basic validation
  if (!text || text.trim() === '') return '';
  if (from === to) return text;

  try {
    // 2. Generate Lookup Key
    const lookupKey = generateLookupKey(text, from, to);

    // 4. API Call (Direct)
    if (process.env.DEBUG_TRANSLATION === 'true') {
      console.log(`[API Call] Translating "${text.substring(0, 20)}..."`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(`${TRANSLATION_API_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: format,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Translation API error: ${response.status} for text: "${text.substring(0, 20)}..."`);
      return text;
    }

    const result: TranslationResult = await response.json();
    const translatedText = result.translatedText;

    // Safety check: ensure we got a valid string
    if (!translatedText || translatedText.trim() === '') {
      console.warn(`Translation API returned empty for: "${text.substring(0, 20)}..."`);
      return text;
    }

    return translatedText;

  } catch (error) {
    console.error('Translation service error:', error);
    return text; // Fallback to original
  }
}

/**
 * Translate deep object recursively
 * Berguna untuk translate file messages json atau object complex
 */
export async function translateObject(obj: any, from: 'id' | 'en' = 'id', to: 'id' | 'en' = 'en'): Promise<any> {
  if (typeof obj === 'string') {
    return await translateText(obj, from, to);
  }

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, from, to)));
  }

  if (typeof obj === 'object' && obj !== null) {
    const newObj: any = {};
    const keys = Object.keys(obj);

    // Process in parallel to speed up
    await Promise.all(keys.map(async (key) => {
      newObj[key] = await translateObject(obj[key], from, to);
    }));

    return newObj;
  }

  return obj;
}

/**
 * Check apakah translation API tersedia
 */
export async function checkTranslationAPI(): Promise<boolean> {
  try {
    const response = await fetch(`${TRANSLATION_API_URL}/languages`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
