"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Activity, Users, TrendingUp, Zap } from 'lucide-react'

export default function MonitoringPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userStr = localStorage.getItem("xo_current_user")
    if (!userStr) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userStr)
    if (!user.isAdmin) {
      router.push("/dashboard")
      return
    }

    setUserInfo(user)
    fetchStats(user.apiKey)
  }, [router])

  const fetchStats = async (apiKey: string) => {
    try {
      const response = await fetch("/api/monitoring/stats", {
        headers: {
          "X-API-Key": apiKey,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch monitoring stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!userInfo || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

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
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-8 w-8 text-[#c87642]" />
            <h1 className="text-4xl font-bold">System Monitoring</h1>
          </div>
          <p className="text-muted-foreground">Real-time analytics and performance metrics</p>
        </div>

        {stats && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#c87642]" />
                    <CardTitle>Total Users</CardTitle>
                  </div>
                  <CardDescription>Platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{stats.system.totalUsers}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-green-600">{stats.system.activeSubscribers} subscribers</Badge>
                    <Badge className="bg-blue-600">{stats.system.trialUsers} trial</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#c87642]" />
                    <CardTitle>Total Requests</CardTitle>
                  </div>
                  <CardDescription>API calls processed</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{stats.system.totalRequests.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stats.performance.recentRequests} recent
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#c87642]" />
                    <CardTitle>Response Time</CardTitle>
                  </div>
                  <CardDescription>Average latency</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{stats.performance.avgResponseTimeMs}ms</p>
                  <Badge className={stats.performance.avgResponseTimeMs < 500 ? "bg-green-600" : "bg-yellow-600"}>
                    {stats.performance.avgResponseTimeMs < 500 ? "Excellent" : "Good"}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#c87642]" />
                    <CardTitle>Success Rate</CardTitle>
                  </div>
                  <CardDescription>API reliability</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{stats.performance.successRate}%</p>
                  <Badge className={parseFloat(stats.performance.successRate) > 95 ? "bg-green-600" : "bg-red-600"}>
                    {parseFloat(stats.performance.successRate) > 95 ? "Healthy" : "Issues"}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Endpoint Usage</CardTitle>
                  <CardDescription>Most popular API actions</CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.keys(stats.endpoints).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(stats.endpoints)
                        .sort(([, a]: any, [, b]: any) => b - a)
                        .slice(0, 10)
                        .map(([action, count]: any) => (
                          <div key={action} className="flex justify-between items-center">
                            <span className="font-medium">{action}</span>
                            <Badge variant="outline">{count} requests</Badge>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No endpoint data</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Top Users</CardTitle>
                  <CardDescription>Most active API consumers</CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.topUsers.length > 0 ? (
                    <div className="space-y-3">
                      {stats.topUsers.map((user: any, index: number) => (
                        <div key={user.userId} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#c87642]">#{index + 1}</Badge>
                            <span className="font-mono text-sm">{user.userId.substring(0, 8)}...</span>
                          </div>
                          <Badge variant="outline">{user.requests} requests</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No user data</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
