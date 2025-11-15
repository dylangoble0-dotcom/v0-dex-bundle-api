import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const priceAmount = 4900 // $49.00 in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Locust Protocol`,
              description:
                "Complete DEX aggregation package - Multi-chain swaps, wallet management, AI assistance, and DeFi data",
            },
            unit_amount: priceAmount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.nextUrl.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/subscription`,
      client_reference_id: userId,
      metadata: {
        userId,
        subscription: "locust",
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("[v0] Stripe session creation error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
