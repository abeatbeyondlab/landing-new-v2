import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IP whitelist for API access
const ALLOWED_IPS = [
  '127.0.0.1',    // localhost
  '::1',          // localhost IPv6
  'localhost',    // localhost hostname
  // Add your production server IPs here
  // '203.0.113.1', // Example production IP
];

// Allowed origins for API access
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3002', // Admin CMS
  'https://www.abeatbeyond.com',
  'https://abeatbeyond.com',
  // Add your production domains here
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => {
    // Exact match for origins
    if (origin === allowed) return true;
    
    // Also match if it's a same-origin request (same hostname)
    try {
      const originUrl = new URL(origin);
      const allowedUrl = new URL(allowed);
      // Compare hostnames (handles www vs non-www)
      const originHostname = originUrl.hostname.replace(/^www\./, '');
      const allowedHostname = allowedUrl.hostname.replace(/^www\./, '');
      return originHostname === allowedHostname && originUrl.protocol === allowedUrl.protocol;
    } catch {
      return false;
    }
  });
}

function isAllowedIp(ip: string | null): boolean {
  if (!ip) return false;
  return ALLOWED_IPS.includes(ip);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle API routes with security checks
  if (pathname.startsWith('/api/v1')) {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                    request.headers.get('x-real-ip') ||
                    request.headers.get('x-client-ip') ||
                    'unknown';
    
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    // Check if request is from allowed origin or IP
    const isOriginAllowed = isAllowedOrigin(origin) || 
                           (referer && isAllowedOrigin(referer));
    const isIpAllowed = isAllowedIp(clientIp);
    
    // Allow requests with valid API key (for server-to-server)
    const apiKey = request.headers.get('x-api-key');
    const hasValidApiKey = apiKey === process.env.API_KEY;
    
    // Block unauthorized requests
    if (!isOriginAllowed && !isIpAllowed && !hasValidApiKey) {
      return NextResponse.json(
        { error: 'Forbidden: Access denied' },
        { status: 403 }
      );
    }
    
    // Add security headers and continue
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    // Set validation header for allowed origins (bypasses API key requirement)
    if (isOriginAllowed && !hasValidApiKey) {
      response.headers.set('x-middleware-validated', 'true');
    }
    
    // Set CORS headers for allowed origins
    if (isOriginAllowed || hasValidApiKey) {
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      response.headers.set('Access-Control-Allow-Headers', 
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key'
      );
    }
    
    return response;
  }

  // Localization logic for non-API routes
  // Skip static assets and already localized paths
  if (
    pathname.startsWith('/en') || 
    pathname.startsWith('/api') || 
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|webp)$/)
  ) {
    return NextResponse.next();
  }

  // Check Cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (cookieLocale === 'en') {
    // User explicitly wants English, redirect to /en
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  } else if (cookieLocale === 'it') {
    // User explicitly wants Italian, stay on /
    return NextResponse.next();
  }

  // Fallback: Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const isItalian = /\bit\b/i.test(acceptLanguage);

  let response: NextResponse;

  if (isItalian) {
    // Browser says Italian -> Stay on /
    response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'it');
  } else {
    // Browser says other -> Redirect to /en
    const newUrl = new URL(`/en${pathname}`, request.url);
    response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', 'en');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
