/**
 * Next.js Middleware for Multilingual Support
 *
 * Placed in src/ for reliable Vercel build (avoids .next/server/middleware.js.nft.json path issues).
 *
 * This middleware handles:
 * 1. Language detection from cookie → browser header → default to "en"
 * 2. Redirects URLs without locale to locale-prefixed URLs
 * 3. Preserves the full path when redirecting
 *
 * Supported languages: en, hi, ar, fr, es, de, pt, ru, ja, ko, zh, it
 */

import { NextResponse } from 'next/server';

const locales = ['en', 'hi', 'ar', 'fr', 'es', 'de', 'pt', 'ru', 'ja', 'ko', 'zh', 'it'];
const defaultLocale = 'en';

function getLocale(request) {
  const cookieLocale = request.cookies.get('lang')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => lang.trim().split(';')[0].toLowerCase().split('-')[0]);
    for (const lang of languages) {
      if (locales.includes(lang)) return lang;
    }
  }
  return defaultLocale;
}

function hasLocale(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 && locales.includes(segments[0]);
}

function extractLocale(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 && locales.includes(segments[0]) ? segments[0] : null;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|json|xml|txt|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  if (hasLocale(pathname)) {
    const response = NextResponse.next();
    const locale = extractLocale(pathname);
    if (locale) response.headers.set('x-next-locale', locale);
    return response;
  }

  const locale = getLocale(request);
  const newPathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const newUrl = new URL(newPathname, request.url);
  newUrl.search = request.nextUrl.search;

  const redirectResponse = NextResponse.redirect(newUrl, 301);
  redirectResponse.headers.set('x-next-locale', locale);
  return redirectResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
