import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Check if the host is the old blog domain
  if (request.headers.get('host') === 'blog.reclaimprotocol.org') {
    // Create the new URL with the blog prefix
    const newUrl = new URL('/blog' + request.nextUrl.pathname, 'https://reclaimprotocol.org')
    return NextResponse.redirect(newUrl)
  }
}
 
export const config = {
  matcher: '/:path*',
}