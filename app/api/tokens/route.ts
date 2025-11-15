import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get("x-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 })
    }

    const user = db.getUserByApiKey(apiKey)

    if (!user || !user.verified) {
      return NextResponse.json({ error: "Invalid or unverified API key" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const chain = searchParams.get("chain") || "ethereum"

    // Call your backend DEX Bundle API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tokens?chain=${chain}`, {
      headers: {
        Authorization: `Bearer ${process.env.DEX_BUNDLE_API_KEY}`,
      },
    })

    const data = await response.json()

    db.logApiUsage(user.id, "/api/tokens", response.ok)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[v0] Tokens API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
