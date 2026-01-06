/**
 * Navigation Utilities
 * 
 * Helper functions for locale-aware navigation
 */

import { locales, defaultLocale, addLocaleToPath, getLocaleFromPath } from './i18n';

/**
 * Create a locale-aware href
 * @param {string} href - The original href (e.g., "/about")
 * @param {string} currentLocale - The current locale from the URL
 * @returns {string} - Locale-aware href (e.g., "/en/about" or "/about" for default locale)
 */
export function createLocalizedHref(href, currentLocale) {
  // If href already includes a locale, return as is
  const segments = href.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return href;
  }

  // Add locale prefix
  return addLocaleToPath(href, currentLocale);
}

/**
 * Get locale from current pathname
 * @param {string} pathname - Current pathname
 * @returns {string} - Current locale
 */
export function getCurrentLocale(pathname) {
  return getLocaleFromPath(pathname);
}

