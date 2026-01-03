import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Skip redirects for localhost and development environments
  if (
    hostname.includes('localhost') || 
    hostname.includes('127.0.0.1') ||
    hostname.includes('.vercel.app') ||
    hostname.includes('.netlify.app')
  ) {
    return NextResponse.next();
  }
  
  // Get canonical domain from environment variable or use default
  // Canonical domain: www.swagatamtech.com (with www)
  const canonicalDomain = process.env.NEXT_PUBLIC_CANONICAL_DOMAIN || 'www.swagatamtech.com';
  const baseDomain = canonicalDomain.replace(/^www\./, ''); // Remove www if present
  
  // Remove port if present
  const hostnameWithoutPort = hostname.split(':')[0];
  
  // Check if this is the same domain (base domain match)
  const isWwwDomain = hostnameWithoutPort === `www.${baseDomain}`;
  const isNonWwwDomain = hostnameWithoutPort === baseDomain;
  
  // Determine if we need to redirect
  let shouldRedirect = false;
  let targetHostname = canonicalDomain;
  
  // If canonical is www, redirect non-www to www
  if (canonicalDomain.startsWith('www.')) {
    if (isNonWwwDomain) {
      shouldRedirect = true;
    }
  } 
  // If canonical is non-www, redirect www to non-www
  else {
    if (isWwwDomain) {
      shouldRedirect = true;
    }
  }
  
  // Perform 301 redirect if needed
  if (shouldRedirect) {
    url.hostname = targetHostname;
    url.protocol = 'https:'; // Always use HTTPS for production redirects
    // Preserve the pathname and search params (query string)
    // The pathname and search are already preserved in the cloned URL
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

