import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ITALIAN_COUNTRIES = ['it', 'IT', 'SM', 'VA'];

export async function proxy(request: NextRequest) {

/*
  better if you check for 
  {
"ip": "178.249.211.68",
"hostname": "unn-178-249-211-68.datapacket.com",
"city": "Milan",
"region": "Lombardy",
"country": "IT",
"loc": "45.4643,9.1895",
"org": "AS212238 Datacamp Limited",
"postal": "20121",
"timezone": "Europe/Rome",
"readme": "https://ipinfo.io/missingauth"
}
*/

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/en') || pathname.startsWith('/api') || pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|webp)$/)) {
    return NextResponse.next();
  }

  let country = request.headers.get('x-vercel-ip-country') || 
                 request.headers.get('cf-ipcountry');

  if (!country) {
    try {
      const res = await fetch('https://ipinfo.io/json');
      if (res.ok) {
        const data = await res.json();
        country = data.country;
      }
    } catch (e) {
      console.error('Failed to fetch IP info:', e);
    }
  }

  if (country && !ITALIAN_COUNTRIES.includes(country)) {
    const newUrl = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
