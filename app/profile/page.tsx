"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Home, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [apiKeyInfo, setApiKeyInfo] = useState<any>(null)

  // Edit states
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const userStr = localStorage.getItem("xo_current_user")
    if (!userStr) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userStr)
    setUserInfo(user)
    fetchApiKey()
    setFormData({
      username: user.username || "",
      email: user.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
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

  const copyApiKey = () => {
    const keyToCopy = apiKeyInfo?.apiKey || userInfo?.apiKey
    if (keyToCopy) {
      navigator.clipboard.writeText(keyToCopy)
      setCopied(true)
      toast({
        title: "API Key Copied",
        description: "Your API key has been copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSaveChanges = () => {
    // Validation
    if (!formData.username.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    // Password validation if changing password
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        toast({
          title: "Error",
          description: "Please enter your current password to change it",
          variant: "destructive",
        })
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "New passwords do not match",
          variant: "destructive",
        })
        return
      }

      if (formData.newPassword.length < 8) {
        toast({
          title: "Error",
          description: "New password must be at least 8 characters",
          variant: "destructive",
        })
        return
      }
    }

    // Get database
    const dbStr = localStorage.getItem("xo_dex_db")
    const db = dbStr ? JSON.parse(dbStr) : { users: [], apiUsage: [] }
    const users = new Map(db.users || [])

    // Find user
    const user = users.get(userInfo.id)
    if (!user) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      })
      return
    }

    // If changing password, verify current password
    if (formData.newPassword) {
      if (user.password !== formData.currentPassword) {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive",
        })
        return
      }
      user.password = formData.newPassword
    }

    // Update user info
    user.username = formData.username
    user.email = formData.email

    // Save to database
    users.set(userInfo.id, user)
    db.users = Array.from(users.entries())
    localStorage.setItem("xo_dex_db", JSON.stringify(db))

    // Update current user session
    const updatedUser = { ...userInfo, username: formData.username, email: formData.email }
    localStorage.setItem("xo_current_user", JSON.stringify(updatedUser))
    setUserInfo(updatedUser)

    // Clear password fields
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setEditMode(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    })
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and API access</p>
        </div>

        <div className="space-y-6">
          {/* Account Information Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>View and update your profile details</CardDescription>
                </div>
                <Badge className={tierColor}>
                  {userInfo.isAdmin ? "ADMIN" : userInfo.tier?.toUpperCase() || "FREE"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={!editMode}
                  className="bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!editMode}
                  className="bg-transparent"
                />
              </div>

              {editMode && (
                <>
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">Change Password (Optional)</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                          className="bg-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          placeholder="Enter new password (min 8 characters)"
                          className="bg-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                          className="bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-4">
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)} className="bg-[#c87642] hover:bg-[#b86632]">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveChanges} className="bg-[#c87642] hover:bg-[#b86632]">
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditMode(false)
                        setFormData({
                          username: userInfo.username || "",
                          email: userInfo.email || "",
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        })
                      }}
                      className="bg-transparent"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* API Key Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>API Key</CardTitle>
              <CardDescription>Your unique key for API authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Your API Key</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={displayApiKey}
                      readOnly
                      className="font-mono bg-muted pr-10"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button size="icon" variant="outline" onClick={copyApiKey} className="shrink-0 bg-transparent">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Keep your API key secure. Do not share it publicly.</p>
                {!hasSubscription && apiKeyInfo?.trialExpired && (
                  <p className="text-sm text-red-600 mt-2">Your 7-day trial has expired. Subscribe to continue access.</p>
                )}
                {!hasSubscription && !apiKeyInfo?.trialExpired && apiKeyInfo?.trialStartDate && (
                  <p className="text-sm text-green-600 mt-2">
                    Trial expires: {new Date(new Date(apiKeyInfo.trialStartDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subscription Status</span>
                  <Badge className={tierColor}>{tierLabel}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account Created</span>
                  <span className="font-medium">
                    {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account ID</span>
                  <span className="font-mono text-xs">{userInfo.id || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/dashboard">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Dashboard</CardTitle>
                  <CardDescription>View your stats and usage</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/subscription">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Subscription</CardTitle>
                  <CardDescription>Manage your plan</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Documentation</CardTitle>
                  <CardDescription>API reference</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
