import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/database"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`[v0] Webhook signature verification failed:`, err.message)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log(`[v0] Stripe webhook received: ${event.type}`)

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId || session.client_reference_id

        if (userId) {
          const subscriptionExpirationDate = Date.now() + (30 * 24 * 60 * 60 * 1000)
          
          const subscriptionId = session.subscription as string
          
          await db.updateUser(userId, {
            hasLocustSubscription: true,
            trialExpired: false,
            subscriptionId: subscriptionId,
            subscriptionStatus: 'active',
            subscriptionExpirationDate: subscriptionExpirationDate,
            stripeCustomerId: session.customer as string,
          })

          console.log(`[v0] Subscription activated for user ${userId}, expires in 30 days: ${new Date(subscriptionExpirationDate)}`)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          const isActive = subscription.status === "active"
          const subscriptionExpirationDate = Date.now() + (30 * 24 * 60 * 60 * 1000)
          
          await db.updateUser(userId, {
            hasLocustSubscription: isActive,
            subscriptionStatus: subscription.status,
            subscriptionExpirationDate: subscriptionExpirationDate,
          })

          console.log(`[v0] Subscription ${isActive ? 'activated' : 'deactivated'} for user ${userId}, expires in 30 days: ${new Date(subscriptionExpirationDate)}`)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          await db.updateUser(userId, {
            hasLocustSubscription: false,
            subscriptionStatus: 'cancelled',
            subscriptionExpirationDate: Date.now(),
          })

          console.log(`[v0] Subscription cancelled for user ${userId}`)
        }
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const userId = subscription.metadata?.userId
          const subscriptionExpirationDate = Date.now() + (30 * 24 * 60 * 60 * 1000)

          if (userId) {
            await db.updateUser(userId, {
              hasLocustSubscription: true,
              subscriptionStatus: 'active',
              subscriptionExpirationDate: subscriptionExpirationDate,
            })

            console.log(`[v0] Payment succeeded, subscription renewed for user ${userId} for 30 days until ${new Date(subscriptionExpirationDate)}`)
          }
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const userId = subscription.metadata?.userId

          if (userId) {
            await db.updateUser(userId, {
              hasLocustSubscription: false,
              subscriptionStatus: 'past_due',
            })

            console.log(`[v0] Payment failed for user ${userId}, subscription marked past_due`)
          }
        }
        break
      }

      default:
        console.log(`[v0] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed", message: error.message },
      { status: 500 }
    )
  }
}
