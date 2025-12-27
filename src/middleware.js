import { NextResponse } from 'next/server';

export function middleware(request) {
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
  
  // Canonical domain: www.swagatamtech.com
  // Redirect non-www to www (301 permanent redirect)
  // This ensures canonical URLs and prevents duplicate content issues for SEO
  const hostnameWithoutPort = hostname.split(':')[0]; // Remove port if present
  
  if (hostnameWithoutPort === 'swagatamtech.com') {
    url.hostname = 'www.swagatamtech.com';
    url.protocol = 'https:'; // Always use HTTPS for production redirects
    // Preserve the path and query parameters
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

