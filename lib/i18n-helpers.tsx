'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { translateText } from './translation';
import { type Locale } from './locale-config';

export { locales, type Locale } from './locale-config';

// Translation cache untuk menghindari re-translate yang sama
const translationCache = new Map<string, string>();

/**
 * Hook untuk mendapatkan locale saat ini
 */
export function useLocale(): Locale {
  const params = useParams();
  const locale = params?.locale as Locale;
  return locale || 'id';
}

/**
 * Hook untuk mendapatkan localized path
 */
export function useLocalizedPath() {
  const locale = useLocale();

  return (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
  };
}

/**
 * Hook untuk auto-translate text menggunakan LibreTranslate API
 * Menggantikan useTranslations dari next-intl
 */
export function useTranslate() {
  const locale = useLocale();
  
  return (text: string): string => {
    // Jika sudah bahasa Indonesia, return langsung
    if (locale === 'id') {
      return text;
    }

    // Check cache
    const cacheKey = `${text}_${locale}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // Return original text (akan diganti dengan translated text via useAsyncTranslate)
    return text;
  };
}

/**
 * Hook untuk translate dengan state management
 * Cocok untuk text yang perlu di-translate secara async
 */
export function useAsyncTranslate(text: string, enabled = true) {
  const locale = useLocale();
  const [translated, setTranslated] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!enabled || locale === 'id' || !text) {
      setTranslated(text);
      return;
    }

    const cacheKey = `${text}_${locale}`;
    
    // Check cache
    if (translationCache.has(cacheKey)) {
      setTranslated(translationCache.get(cacheKey)!);
      return;
    }

    // Translate
    setIsLoading(true);
    translateText(text, 'id', locale as 'en' | 'id')
      .then(result => {
        translationCache.set(cacheKey, result);
        setTranslated(result);
      })
      .catch(() => {
        setTranslated(text); // Fallback ke text asli
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [text, locale, enabled]);

  return { translated, isLoading };
}

/**
 * Component wrapper untuk auto-translate text
 */
export function T({ children, enabled = true }: { children: string; enabled?: boolean }) {
  const { translated } = useAsyncTranslate(children, enabled);
  return <>{translated}</>;
}

/**
 * Fungsi helper untuk translate di server component
 */
export async function translateServer(text: string, locale: Locale): Promise<string> {
  if (locale === 'id') return text;
  
  const cacheKey = `${text}_${locale}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const result = await translateText(text, 'id', locale as 'en' | 'id');
    translationCache.set(cacheKey, result);
    return result;
  } catch {
    return text;
  }
}
