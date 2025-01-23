// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the hostname (e.g., blog.reclaimprotocol.org)
  const hostname = request.headers.get('host')

  // Check if it's the blog subdomain
  if (hostname === 'blog.reclaimprotocol.org') {
    // Get the pathname from the request URL
    const pathname = new URL(request.url).pathname
    
    // Construct the new URL
    const newUrl = `https://reclaimprotocol.org/blog${pathname}`
    
    // Return a redirect response
    return NextResponse.redirect(newUrl, {
      // 308 is permanent redirect
      status: 308
    })
  }

  // If no redirect is needed, continue with the request
  return NextResponse.next()
}

// Configure matcher for which paths this middleware should run on
export const config = {
  // Match all paths
  matcher: '/:path*'
}
