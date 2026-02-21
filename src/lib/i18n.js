/**
 * Internationalization (i18n) Utilities
 * 
 * Provides helper functions for:
 * - Getting current locale from URL
 * - Loading translations
 * - Getting translated text
 * - Managing locale-aware routing
 */

// Supported locales
export const locales = ['en', 'hi', 'ar', 'fr', 'es', 'de', 'pt', 'ru', 'ja', 'ko', 'zh', 'it'];
export const defaultLocale = 'en';

/**
 * Get locale from request headers (set by middleware). Use in server layouts for canonical URLs.
 * @returns {Promise<string>} Locale code (e.g. 'en')
 */
export async function getLocaleFromHeaders() {
  try {
    const { headers } = await import('next/headers');
    const h = await headers();
    const locale = h.get('x-next-locale');
    return locale && locales.includes(locale) ? locale : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

// RTL languages
export const rtlLocales = ['ar'];

// Language names for display
export const languageNames = {
  en: 'English',
  hi: 'हिन्दी',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  it: 'Italiano',
};

/**
 * Check if a locale is RTL
 */
export function isRTL(locale) {
  return rtlLocales.includes(locale);
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return segments[0];
  }
  return defaultLocale;
}

/**
 * Remove locale from pathname
 */
export function removeLocaleFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

/**
 * Add locale to pathname
 */
export function addLocaleToPath(pathname, locale) {
  const pathWithoutLocale = removeLocaleFromPath(pathname);
  if (pathWithoutLocale === '/') {
    return `/${locale}`;
  }
  return `/${locale}${pathWithoutLocale}`;
}

/**
 * Load translations for a locale
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Uses dynamic imports which are resolved at build time
 * - Translations are bundled into the static pages
 * - No runtime API calls or server dependencies
 * - Works with SSG/static export
 * 
 * @param {string} locale - The locale code (e.g., 'en', 'hi', 'ar')
 * @returns {Promise<Object>} Translation object
 */
export async function getTranslations(locale) {
  try {
    // Dynamic import - Next.js will bundle this at build time
    // This works with static export because imports are resolved during build
    const translations = await import(`@/messages/${locale}.json`);
    return translations.default || {};
  } catch (error) {
    // In production, log warning but don't break the build
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Translation file for locale "${locale}" not found, falling back to English`);
    }
    
    // Fallback to English if translation file doesn't exist
    if (locale !== defaultLocale) {
      try {
        const translations = await import(`@/messages/${defaultLocale}.json`);
        return translations.default || {};
      } catch (fallbackError) {
        // Return empty object if even fallback fails (shouldn't happen)
        return {};
      }
    }
    return {};
  }
}

