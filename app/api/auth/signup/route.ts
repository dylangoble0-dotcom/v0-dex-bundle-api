import { NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    console.log("[v0] Signup attempt:", { username, email })

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      )
    }

    // Check if username exists
    const existingUser = await db.getUserByUsername(username)
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    // Check if email exists
    const existingEmail = await db.getUserByEmail(email)
    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const user = await db.createUser(username, email, password)

    console.log("[v0] User created successfully:", {
      id: user.id,
      username: user.username,
      apiKey: user.apiKey?.substring(0, 15) + "...",
    })

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Account created successfully! You have 7 days of free trial.",
      user: userWithoutPassword,
    })
  } catch (error: any) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json(
      { error: "Failed to create account", message: error.message },
      { status: 500 }
    )
  }
}
