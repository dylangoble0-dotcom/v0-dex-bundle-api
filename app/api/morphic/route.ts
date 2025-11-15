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
    const { query, context } = body

    if (!query) {
      return NextResponse.json(
        {
          error: "Missing required parameter: query",
        },
        { status: 400 },
      )
    }

    // Call OpenAI API for Morphic AI functionality
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for DeFi and DEX operations. Provide accurate information about token swaps, liquidity, and blockchain operations.",
          },
          {
            role: "user",
            content: query,
          },
        ],
        ...(context && { context }),
      }),
    })

    const data = await response.json()

    db.logApiUsage(user.id, "/api/morphic", response.ok)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[v0] Morphic AI API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
