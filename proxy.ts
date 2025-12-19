import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip static assets, API routes, and already localized paths
  if (
    pathname.startsWith('/en') || 
    pathname.startsWith('/api') || 
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|webp)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Check Cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (cookieLocale === 'en') {
    // User explicitly wants English, redirect to /en
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  } else if (cookieLocale === 'it') {
    // User explicitly wants Italian, stay on /
    return NextResponse.next();
  }

  // 3. Fallback: Check Accept-Language header
  // No cookie present, so detect from browser
  const acceptLanguage = request.headers.get('accept-language') || '';
  const isItalian = /\bit\b/i.test(acceptLanguage);

  let response: NextResponse;

  if (isItalian) {
    // Browser says Italian -> Stay on /
    response = NextResponse.next();
    // Set cookie for future visits
    response.cookies.set('NEXT_LOCALE', 'it');
  } else {
    // Browser says other -> Redirect to /en
    const newUrl = new URL(`/en${pathname}`, request.url);
    response = NextResponse.redirect(newUrl);
    // Set cookie for future visits
    response.cookies.set('NEXT_LOCALE', 'en');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
