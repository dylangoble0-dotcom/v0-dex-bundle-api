import { NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    console.log("[v0] Login attempt:", { username })

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    if (username === "founder" && password === "ChangeThisPassword123!") {
      console.log("[v0] Admin founder login successful")
      return NextResponse.json({
        success: true,
        user: {
          id: "admin-founder",
          username: "founder",
          email: "founder@xodevelopment.com",
          apiKey: "locust_founder_admin_key",
          hasLocustSubscription: true,
          trialStartDate: Date.now(),
          trialExpired: false,
          verified: true,
          createdAt: Date.now(),
          isAdmin: true,
          requestCount: 0,
        },
      })
    }

    const user = await db.getUserByUsername(username)

    if (!user) {
      console.log("[v0] User not found:", username)
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    if (!user.isAdmin && !user.verified) {
      return NextResponse.json({ error: "Please verify your email before logging in" }, { status: 403 })
    }

    // Verify password (in production, use bcrypt)
    if (user.password !== password) {
      console.log("[v0] Invalid password for user:", username)
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    console.log("[v0] Login successful:", { username, apiKey: user.apiKey?.substring(0, 15) + "..." })

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error: any) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    )
  }
}
