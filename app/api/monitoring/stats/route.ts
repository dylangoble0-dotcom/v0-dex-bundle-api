import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import * as neonCache from "@/lib/neon/client"

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get("x-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 })
    }

    const user = await db.getUserByApiKey(apiKey)

    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get system stats
    const [allUsers, totalRequests, recentAnalytics] = await Promise.all([
      db.getAllUsers(),
      db.getTotalRequests(),
      neonCache.getRecentAnalytics(100)
    ])

    const activeSubscribers = allUsers.filter(u => u.hasLocustSubscription).length
    const trialUsers = allUsers.filter(u => !u.hasLocustSubscription && db.isTrialValid(u)).length
    const expiredUsers = allUsers.filter(u => !u.hasLocustSubscription && !db.isTrialValid(u)).length

    // Calculate average response time
    const avgResponseTime = recentAnalytics.length > 0
      ? recentAnalytics.reduce((sum, a) => sum + a.responseTimeMs, 0) / recentAnalytics.length
      : 0

    // Count requests by action
    const actionCounts: Record<string, number> = {}
    recentAnalytics.forEach(a => {
      actionCounts[a.action] = (actionCounts[a.action] || 0) + 1
    })

    // Calculate success rate
    const successfulRequests = recentAnalytics.filter(a => a.statusCode === 200).length
    const successRate = recentAnalytics.length > 0
      ? (successfulRequests / recentAnalytics.length) * 100
      : 100

    return NextResponse.json({
      system: {
        totalUsers: allUsers.length,
        activeSubscribers,
        trialUsers,
        expiredUsers,
        totalRequests,
      },
      performance: {
        avgResponseTimeMs: Math.round(avgResponseTime),
        successRate: successRate.toFixed(2),
        recentRequests: recentAnalytics.length,
      },
      endpoints: actionCounts,
      topUsers: recentAnalytics
        .reduce((acc: any[], curr) => {
          const existing = acc.find(u => u.userId === curr.userId)
          if (existing) {
            existing.requests++
          } else {
            acc.push({ userId: curr.userId, requests: 1 })
          }
          return acc
        }, [])
        .sort((a, b) => b.requests - a.requests)
        .slice(0, 10),
    })
  } catch (error: any) {
    console.error("[v0] Monitoring stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats", message: error.message },
      { status: 500 }
    )
  }
}
