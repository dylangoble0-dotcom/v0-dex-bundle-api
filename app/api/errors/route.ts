import { type NextRequest, NextResponse } from 'next/server'
import { errorMonitor } from '@/lib/error-monitor'

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    const adminKey = process.env.ADMIN_API_KEY

    if (!adminKey || apiKey !== adminKey) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')

    const stats = errorMonitor.getErrorStats(endpoint || undefined)

    return NextResponse.json({
      success: true,
      stats,
      message: 'Error monitoring stats retrieved'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve error stats', message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    const adminKey = process.env.ADMIN_API_KEY

    if (!adminKey || apiKey !== adminKey) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }

    const body = await request.json()
    const { action, errorId, endpoint } = body

    if (action === 'resolve' && errorId) {
      errorMonitor.markErrorResolved(errorId)
      return NextResponse.json({
        success: true,
        message: 'Error marked as resolved'
      })
    }

    if (action === 'clear' && endpoint) {
      errorMonitor.clearResolvedErrors(endpoint)
      return NextResponse.json({
        success: true,
        message: 'Resolved errors cleared'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action or missing parameters' },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process error action', message: error.message },
      { status: 500 }
    )
  }
}
