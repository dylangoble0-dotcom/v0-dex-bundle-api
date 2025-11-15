import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // Validate inputs
    if (!username || username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = db.getUserByUsername(username) || db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Username or email already exists" }, { status: 409 })
    }

    const user = db.createUser(username, email, password)
    db.updateUser(user.id, { verified: true })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        apiKey: user.apiKey,
        tier: user.tier,
        isAdmin: user.isAdmin || false,
      },
      message: "Account created successfully!",
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 })
  }
}
