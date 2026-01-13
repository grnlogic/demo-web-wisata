/**
 * Locale constants
 * Separated from i18n-helpers to avoid 'use client' directive issues
 */

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';
