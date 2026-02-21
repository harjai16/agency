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

export function proxy(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const pathname = url.pathname;

  // Skip dev environments
  if (
    hostname.includes('localhost') ||
    hostname.includes('127.0.0.1') ||
    hostname.includes('.vercel.app') ||
    hostname.includes('.netlify.app')
  ) {
    return NextResponse.next();
  }

  // Skip internal/static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|json|xml|txt|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // 🌍 Canonical Domain Redirect
  const canonicalDomain =
    process.env.NEXT_PUBLIC_CANONICAL_DOMAIN || 'www.swagatamtech.com';

  const baseDomain = canonicalDomain.replace(/^www\./, '');
  const hostnameWithoutPort = hostname.split(':')[0];

  const isWwwDomain = hostnameWithoutPort === `www.${baseDomain}`;
  const isNonWwwDomain = hostnameWithoutPort === baseDomain;

  let shouldRedirectDomain = false;

  if (canonicalDomain.startsWith('www.')) {
    if (isNonWwwDomain) shouldRedirectDomain = true;
  } else {
    if (isWwwDomain) shouldRedirectDomain = true;
  }

  if (shouldRedirectDomain) {
    url.hostname = canonicalDomain;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // 🌐 Locale Redirect
  if (!hasLocale(pathname)) {
    const locale = getLocale(request);
    const newPathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    const newUrl = new URL(newPathname, request.url);
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl, 301);
  }

  // Attach locale header
  const response = NextResponse.next();
  const locale = extractLocale(pathname);
  if (locale) response.headers.set('x-next-locale', locale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};