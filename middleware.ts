import { NextRequest, NextResponse } from 'next/server';

const NEW_ORIGIN = 'https://blog.reclaimprotocol.org';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const newUrl = `${NEW_ORIGIN}${url.pathname}${url.search}`;

  return NextResponse.redirect(newUrl, 308);
}

export const config = {
  matcher: '/:path*',
};