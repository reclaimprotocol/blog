import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Only redirect if coming from blog subdomain
  if (request.headers.get('host') === 'blog.reclaimprotocol.org' && 
      !url.pathname.startsWith('/blog')) {
    return NextResponse.redirect(
      `https://reclaimprotocol.org/blog${url.pathname}`,
      { status: 308 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}