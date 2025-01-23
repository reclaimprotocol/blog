import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase()
  
  if (host === 'blog.reclaimprotocol.org') {
    // Preserve query parameters and hash fragments
    const newUrl = new URL(request.nextUrl.pathname, 'https://reclaimprotocol.org')
    newUrl.pathname = `/blog${newUrl.pathname}`
    newUrl.search = request.nextUrl.search
    newUrl.hash = request.nextUrl.hash
    
    // Return permanent redirect (301) for SEO benefits
    return NextResponse.redirect(newUrl, { status: 301 })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}