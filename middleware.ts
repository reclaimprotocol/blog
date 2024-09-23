import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // redirect to new blog link
  if (url.hostname === 'blog.reclaimprotocol.org') {
    url.protocol = 'https';
    url.port = '443';
    url.host = 'reclaimprotocol.org';
    url.pathname = `/blog${url.pathname}`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};