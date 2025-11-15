import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { errorMonitor } from './lib/error-monitor'

export async function middleware(request: NextRequest) {
  const startTime = Date.now()

  try {
    const response = NextResponse.next()
    
    const responseTime = Date.now() - startTime
    
    if (responseTime > 5000) {
      console.warn(`[MIDDLEWARE] Slow request detected: ${request.url} took ${responseTime}ms`)
    }

    return response
  } catch (error: any) {
    await errorMonitor.logError(
      request.url,
      error,
      {
        method: request.method,
        headers: Object.fromEntries(request.headers),
        url: request.url
      }
    )

    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

export const config = {
  matcher: '/api/:path*'
}
