import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log the contact form submission
    console.log("[v0] Investor inquiry received:", {
      name,
      email,
      company: company || "N/A",
      message,
      timestamp: new Date().toISOString(),
    })

    // In a production app, you would:
    // - Save to database
    // - Send email notification
    // - Integrate with CRM
    // For now, we just log it and return success

    return NextResponse.redirect(`${request.nextUrl.origin}/?inquiry=sent`, 303)
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}
