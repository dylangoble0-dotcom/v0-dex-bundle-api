import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get("x-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 })
    }

    const user = await db.getUserByApiKey(apiKey)

    if (!user || !user.verified) {
      return NextResponse.json({ error: "Invalid or unverified API key" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const inputMint = searchParams.get("inputMint")
    const outputMint = searchParams.get("outputMint")
    const amount = searchParams.get("amount")

    if (!inputMint || !outputMint || !amount) {
      return NextResponse.json(
        {
          error: "Missing required parameters: inputMint, outputMint, amount",
        },
        { status: 400 },
      )
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jupiter?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DEX_BUNDLE_API_KEY}`,
        },
      },
    )

    const data = await response.json()

    await db.logApiUsage(user.id, "/api/jupiter", response.ok)

    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error("[v0] Jupiter API error:", error)
    return NextResponse.json({ 
      error: "Internal server error",
      message: error.message 
    }, { status: 500 })
  }
}
