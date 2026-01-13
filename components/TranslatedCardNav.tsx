'use client';

import React from 'react';
import CardNav, { CardNavProps, CardNavItem } from './CardNav';
import { useLocale, useAsyncTranslate } from '@/lib/i18n-helpers';

/**
 * Wrapper untuk CardNav yang auto-translate labels
 */
export default function TranslatedCardNav(props: CardNavProps) {
  const locale = useLocale();

  // Jika bahasa Indonesia, tidak perlu translate
  if (locale === 'id') {
    return <CardNav {...props} />;
  }

  // Translate items
  const translatedItems: CardNavItem[] = props.items.map(item => ({
    ...item,
    label: item.label, // Label akan di-translate by TranslatedNavLink
    links: item.links.map(link => ({
      ...link,
      label: link.label, // Label akan di-translate by TranslatedNavLink
      ariaLabel: link.ariaLabel,
    })),
  }));

  return <CardNav {...props} items={translatedItems} />;
}

/**
 * Component untuk translate individual text
 */
export function TranslatedText({ text }: { text: string }) {
  const locale = useLocale();
  const { translated } = useAsyncTranslate(text, locale !== 'id');
  
  return <>{translated}</>;
}
