import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // redirect to new blog link
  if (url.host === 'blog.reclaimprotocol.org') {
    return NextResponse.redirect(`https://reclaimprotocol.org/blog${url.pathname}`);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};