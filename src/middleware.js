import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Skip redirects for localhost and development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next();
  }
  
  // Redirect non-www to www (301 permanent redirect)
  // This ensures canonical URLs and prevents duplicate content
  if (hostname === 'swagatamtech.com') {
    url.hostname = 'www.swagatamtech.com';
    url.protocol = 'https:';
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

