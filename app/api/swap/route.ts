import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get("x-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 })
    }

    const user = db.getUserByApiKey(apiKey)

    if (!user || !user.verified) {
      return NextResponse.json({ error: "Invalid or unverified API key" }, { status: 401 })
    }

    const body = await request.json()
    const { fromToken, toToken, amount, chain, slippage } = body

    if (!fromToken || !toToken || !amount) {
      return NextResponse.json(
        {
          error: "Missing required parameters: fromToken, toToken, amount",
        },
        { status: 400 },
      )
    }

    // Call your backend DEX Bundle API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/swap`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEX_BUNDLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromToken, toToken, amount, chain, slippage }),
    })

    const data = await response.json()

    db.logApiUsage(user.id, "/api/swap", response.ok)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[v0] Swap API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
