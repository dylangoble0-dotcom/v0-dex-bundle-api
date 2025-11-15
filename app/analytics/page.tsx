"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from 'lucide-react'

export default function AnalyticsPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [usage, setUsage] = useState<any[]>([])

  useEffect(() => {
    const userStr = localStorage.getItem("xo_current_user")
    if (!userStr) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userStr)
    setUserInfo(user)

    const dbStr = localStorage.getItem("xo_dex_db")
    if (dbStr) {
      const db = JSON.parse(dbStr)
      const apiUsage = db.apiUsage || []
      const userUsage = apiUsage.filter((u: any) => u.userId === user.id)
      setUsage(userUsage)
    }
  }, [router])

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const monthlyLimit = userInfo.isAdmin ? 999999 : userInfo.tier === "pro" ? 50000 : 1000
  const requestsUsed = userInfo.requestCount || 0
  const percentageUsed = (requestsUsed / monthlyLimit) * 100

  const endpointCounts: Record<string, number> = {}
  usage.forEach((u) => {
    endpointCounts[u.endpoint] = (endpointCounts[u.endpoint] || 0) + 1
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your API usage and performance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Total Requests</CardTitle>
              <CardDescription>Lifetime API calls</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{requestsUsed}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Monthly Usage</CardTitle>
              <CardDescription>
                {userInfo.isAdmin ? "Admin - Unlimited" : `${requestsUsed} / ${monthlyLimit.toLocaleString()}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!userInfo.isAdmin && (
                <>
                  <Progress value={percentageUsed} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {(monthlyLimit - requestsUsed).toLocaleString()} requests remaining
                  </p>
                  {percentageUsed > 80 && (
                    <p className="text-sm text-red-600 mt-2 font-semibold">
                      Warning: You've used {percentageUsed.toFixed(0)}% of your monthly limit
                    </p>
                  )}
                </>
              )}
              {userInfo.isAdmin && <Badge className="bg-[#c87642]">ADMIN - UNLIMITED</Badge>}
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Current plan</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className={userInfo.tier === "pro" ? "bg-[#c87642]" : "bg-gray-500"}>
                {userInfo.tier?.toUpperCase() || "FREE"}
              </Badge>
              {userInfo.tier === "free" && (
                <Link href="/subscription">
                  <Button className="w-full mt-4 bg-[#c87642] hover:bg-[#b86632]">Upgrade to Pro</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Endpoint Usage</CardTitle>
            <CardDescription>Requests by API endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(endpointCounts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(endpointCounts).map(([endpoint, count]) => (
                  <div key={endpoint}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{endpoint}</span>
                      <span className="text-muted-foreground">{count} requests</span>
                    </div>
                    <Progress value={(count / requestsUsed) * 100} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No API requests yet. Start using the API to see analytics here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
