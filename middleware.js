/**
 * Next.js Middleware for Multilingual Support
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Middleware runs at edge/runtime (not build time)
 * - Works with static export on platforms that support edge functions
 * - For pure static hosting, configure redirects in hosting platform
 * - Alternative: Use client-side redirect (see LanguageSwitcher component)
 * 
 * This middleware handles:
 * 1. Language detection from cookie → browser header → default to "en"
 * 2. Redirects URLs without locale to locale-prefixed URLs
 * 3. Preserves the full path when redirecting
 * 
 * Supported languages: en, hi, ar, fr, es, de, pt, ru, ja, ko, zh, it
 * 
 * NOTE: For static export without edge support, use hosting platform redirects
 * or implement client-side redirect in app/layout.js
 */

import { NextResponse } from 'next/server';

// Supported locales
const locales = ['en', 'hi', 'ar', 'fr', 'es', 'de', 'pt', 'ru', 'ja', 'ko', 'zh', 'it'];
const defaultLocale = 'en';

// RTL languages
const rtlLocales = ['ar'];

/**
 * Get the preferred locale from cookie, browser header, or default
 */
function getLocale(request) {
  // Priority 1: Check cookie
  const cookieLocale = request.cookies.get('lang')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Priority 2: Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,fr;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code] = lang.trim().split(';');
        return code.toLowerCase().split('-')[0]; // Get base language code
      });

    // Find first matching supported locale
    for (const lang of languages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  // Priority 3: Default to English
  return defaultLocale;
}

/**
 * Check if a pathname already has a locale prefix
 */
function hasLocale(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 && locales.includes(segments[0]);
}

/**
 * Extract locale from pathname if present
 */
function extractLocale(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // - API routes
  // - Static files (_next, images, etc.)
  // - Files with extensions
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|json|xml|txt|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // If locale already exists in URL, do nothing
  if (hasLocale(pathname)) {
    return NextResponse.next();
  }

  // Get preferred locale
  const locale = getLocale(request);

  // Build new URL with locale prefix
  const newPathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const newUrl = new URL(newPathname, request.url);

  // Preserve query parameters
  newUrl.search = request.nextUrl.search;

  // Redirect to locale-prefixed URL
  return NextResponse.redirect(newUrl);
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Files with extensions (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

