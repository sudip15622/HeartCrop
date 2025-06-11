import { NextResponse } from 'next/server';
import { defaultLocale, locales } from './app/i18n';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Redirect '/' to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico).*)'],
};
