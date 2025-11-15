"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Home } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminStats, setAdminStats] = useState<any>(null)
  const [apiKeyInfo, setApiKeyInfo] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem("xo_current_user")
    if (!userStr) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userStr)
    setUserInfo(user)

    fetchApiKey()

    if (user.isAdmin) {
      loadAdminStats()
    }

    setLoading(false)
  }, [router])

  const fetchApiKey = async () => {
    try {
      const response = await fetch("/api/user/api-key")
      if (response.ok) {
        const data = await response.json()
        setApiKeyInfo(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching API key:", error)
    }
  }

  const loadAdminStats = () => {
    const dbStr = localStorage.getItem("xo_dex_db")
    if (dbStr) {
      const data = JSON.parse(dbStr)
      const users = new Map(data.users || [])
      const apiUsage = data.apiUsage || []

      const totalUsers = users.size
      const freeUsers = Array.from(users.values()).filter((u: any) => u.tier === "free").length
      const proUsers = Array.from(users.values()).filter((u: any) => u.tier === "pro").length
      const totalRequests = Array.from(users.values()).reduce((sum: number, u: any) => sum + (u.requestCount || 0), 0)

      const apiBreakdown: Record<string, number> = {}
      apiUsage.forEach((usage: any) => {
        const action = usage.endpoint || "unknown"
        apiBreakdown[action] = (apiBreakdown[action] || 0) + 1
      })

      setAdminStats({
        totalUsers,
        freeUsers,
        proUsers,
        totalRequests,
        availableAPIs: 8, // Quote, Swap, Tokens, Price History, 1inch, Jupiter, Morphic, Phantom
        apiUsageLog: apiUsage.length,
        apiBreakdown,
      })
    }
  }

  const copyApiKey = () => {
    const keyToCopy = apiKeyInfo?.apiKey || userInfo?.apiKey
    if (keyToCopy) {
      navigator.clipboard.writeText(keyToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!userInfo) return null

  const hasSubscription = apiKeyInfo?.hasLocustSubscription || userInfo.isAdmin
  const tierColor = hasSubscription ? "bg-[#c87642]" : "bg-gray-500"
  const tierLabel = userInfo.isAdmin ? "ADMIN" : hasSubscription ? "LOCUST SUBSCRIBER" : "FREE TRIAL"
  const displayApiKey = apiKeyInfo?.apiKey || userInfo.apiKey || "Loading..."

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-4">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userInfo.username}!</p>
        </div>

        {userInfo.isAdmin && adminStats && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              Platform Analytics <Badge className="bg-[#c87642]">ADMIN ONLY</Badge>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-[#c87642]/40 bg-gradient-to-br from-[#1e3a5f]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                  <CardDescription>Registered accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-[#1e3a5f]">{adminStats.totalUsers}</p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="text-[#c87642] font-medium">{adminStats.freeUsers}</span> Free ·{" "}
                    <span className="text-[#c87642] font-medium">{adminStats.proUsers}</span> Pro
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#c87642]/40 bg-gradient-to-br from-[#1e3a5f]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Total API Requests</CardTitle>
                  <CardDescription>All users combined</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-[#1e3a5f]">{adminStats.totalRequests.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Platform-wide usage</p>
                </CardContent>
              </Card>

              <Card className="border-[#c87642]/40 bg-gradient-to-br from-[#1e3a5f]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Available APIs</CardTitle>
                  <CardDescription>Integrated aggregators</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-[#1e3a5f]">{adminStats.availableAPIs}</p>
                  <p className="mt-2 text-sm text-muted-foreground">1inch · Jupiter · Morphic · Phantom & more</p>
                </CardContent>
              </Card>

              <Card className="border-[#c87642]/40 bg-gradient-to-br from-[#1e3a5f]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg">Usage Events</CardTitle>
                  <CardDescription>Logged API calls</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-[#1e3a5f]">{adminStats.apiUsageLog.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Total event logs</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">API Usage Breakdown</h3>
              <Card className="border-[#c87642]/40">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(adminStats.apiBreakdown).map(([action, count]: [string, any]) => (
                      <div key={action} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium capitalize">{action}</p>
                          <p className="text-sm text-muted-foreground">API Action</p>
                        </div>
                        <p className="text-2xl font-bold text-[#c87642]">{count.toLocaleString()}</p>
                      </div>
                    ))}
                    {Object.keys(adminStats.apiBreakdown).length === 0 && (
                      <p className="text-muted-foreground col-span-full text-center py-4">No API usage data yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{userInfo.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{userInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subscription Tier</p>
                <Badge className={`${tierColor} mt-1`}>
                  {userInfo.isAdmin ? "ADMIN" : userInfo.tier?.toUpperCase() || "FREE"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>API Key</CardTitle>
              <CardDescription>Use this key to authenticate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your API Key</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono break-all">
                    {displayApiKey}
                  </code>
                  <Button size="icon" variant="outline" onClick={copyApiKey} className="shrink-0 bg-transparent">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                {!hasSubscription && apiKeyInfo?.trialExpired && (
                  <p className="text-sm text-red-600 mt-2">Your 7-day trial has expired. Subscribe to continue access.</p>
                )}
                {!hasSubscription && !apiKeyInfo?.trialExpired && apiKeyInfo?.trialStartDate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Trial expires: {new Date(new Date(apiKeyInfo.trialStartDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Your request statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Requests Made</p>
                <p className="text-3xl font-bold">{userInfo.requestCount || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subscription Status</p>
                <Badge className={`${tierColor} mt-1`}>{tierLabel}</Badge>
              </div>
              {!hasSubscription && (
                <Link href="/subscription">
                  <Button className="w-full bg-[#c87642] hover:bg-[#b86632]">Subscribe to Locust Protocol</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/docs">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>API reference and guides</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Analytics</CardTitle>
                <CardDescription>View detailed usage stats</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {(userInfo.tier === "pro" || userInfo.isAdmin) && (
            <>
              <Link href="/marketplace">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Marketplace <Badge className="bg-[#c87642]">Pro</Badge>
                    </CardTitle>
                    <CardDescription>Buy and sell domains</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Community <Badge className="bg-[#c87642]">Pro</Badge>
                    </CardTitle>
                    <CardDescription>Connect with developers</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
