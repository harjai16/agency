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
 * This function will be used by components to load translation files
 */
export async function getTranslations(locale) {
  try {
    // Dynamic import of translation file
    const translations = await import(`@/messages/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Translation file for locale "${locale}" not found, falling back to English`);
    // Fallback to English if translation file doesn't exist
    if (locale !== defaultLocale) {
      try {
        const translations = await import(`@/messages/${defaultLocale}.json`);
        return translations.default;
      } catch (fallbackError) {
        return {};
      }
    }
    return {};
  }
}

