'use client';

import { useState } from 'react';

/**
 * Hook untuk auto-translate content
 * 
 * Contoh penggunaan:
 * const { translate, isTranslating } = useTranslate();
 * const result = await translate('Halo dunia', 'id', 'en');
 */
export function useTranslate() {
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = async (
    text: string,
    from: 'en' | 'id' = 'id',
    to: 'en' | 'id' = 'en'
  ): Promise<string> => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, from, to }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text jika gagal
    } finally {
      setIsTranslating(false);
    }
  };

  return { translate, isTranslating };
}

/**
 * Component untuk translate button/form
 */
export function TranslateButton({
  text,
  from = 'id',
  to = 'en',
  onTranslated,
}: {
  text: string;
  from?: 'en' | 'id';
  to?: 'en' | 'id';
  onTranslated?: (translated: string) => void;
}) {
  const { translate, isTranslating } = useTranslate();

  const handleTranslate = async () => {
    const result = await translate(text, from, to);
    onTranslated?.(result);
  };

  return (
    <button
      onClick={handleTranslate}
      disabled={isTranslating}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {isTranslating ? 'Translating...' : `Translate to ${to.toUpperCase()}`}
    </button>
  );
}
