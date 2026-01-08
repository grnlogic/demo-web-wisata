import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Get safe background image URL with fallback
 * @param src - Image source URL
 * @param fallback - Fallback image URL (default: marlin pangandaran.jpg)
 * @returns Safe image URL
 */
export function getSafeImageUrl(
  src: string | null | undefined,
  fallback: string = '/marlin pangandaran.jpg'
): string {
  return src || fallback
}

/**
 * Create background image style with gradient overlay and fallback
 * @param src - Image source URL
 * @param gradient - CSS gradient string
 * @param fallback - Fallback image URL
 * @returns CSS style object
 */
export function createBackgroundImageStyle(
  src: string | null | undefined,
  gradient: string = 'linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.7) 70%)',
  fallback: string = '/marlin pangandaran.jpg'
): React.CSSProperties {
  const imageUrl = getSafeImageUrl(src, fallback)
  return {
    backgroundImage: `${gradient}, url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}

