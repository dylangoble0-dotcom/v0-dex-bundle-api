"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Home } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { loadStripe } from "@stripe/stripe-js"
import Link from "next/link"
import Image from "next/image"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function SubscriptionPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem("xo_current_user")
    if (!userStr) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userStr)
    setUserInfo(user)
  }, [router])

  const handleSubscribe = async () => {
    setLoading(true)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error("Stripe failed to load")

      // Create checkout session for Locust Protocol
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userInfo.id,
          tier: "locust",
          priceId: "price_locust_protocol_monthly",
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Failed to start subscription. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5573275-5b41-4ae7-98b5-560b05481ec9.jpeg"
              alt="Locust Protocol"
              width={400}
              height={200}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Subscribe to Locust Protocol</h1>
          <p className="text-xl text-muted-foreground">Complete DEX aggregation in one unified package</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-[#c87642] relative shadow-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-[#c87642] text-white px-6 py-2 text-base">Complete Package</Badge>
            </div>
            <CardHeader className="bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white rounded-t-lg">
              <CardTitle className="text-3xl text-center">Locust Protocol</CardTitle>
              <CardDescription className="text-center text-gray-300 text-lg">
                Everything you need for DEX development
              </CardDescription>
              <div className="text-center mt-4">
                <span className="text-6xl font-bold">$49</span>
                <span className="text-2xl text-gray-300">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>Unlimited API requests</strong> - No rate limits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>Multi-chain aggregation</strong> - Ethereum, Solana, BSC & more</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>Smart swap quotes</strong> - Best prices from 100+ DEXs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>Wallet management</strong> - Universal integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>AI assistant</strong> - Claude-powered DeFi insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>Real-time price data</strong> - Historical analytics included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>Priority support</strong> - Direct developer assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#c87642] shrink-0 mt-0.5" />
                  <span className="text-lg"><strong>One API key</strong> - Single endpoint for everything</span>
                </li>
              </ul>

              <Button
                className="w-full bg-[#c87642] hover:bg-[#b86632] text-white text-lg py-6"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Subscribe to Locust Protocol
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                30-day money-back guarantee. Cancel anytime.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Why Locust Protocol?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-4xl font-bold text-[#c87642] mb-2">1</div>
              <h3 className="font-semibold mb-2">One Endpoint</h3>
              <p className="text-sm text-muted-foreground">
                All DEX functionality through a single, unified API
              </p>
            </div>
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-4xl font-bold text-[#c87642] mb-2">100+</div>
              <h3 className="font-semibold mb-2">DEXs Aggregated</h3>
              <p className="text-sm text-muted-foreground">
                Access liquidity from all major decentralized exchanges
              </p>
            </div>
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-4xl font-bold text-[#c87642] mb-2">∞</div>
              <h3 className="font-semibold mb-2">Unlimited Requests</h3>
              <p className="text-sm text-muted-foreground">
                No rate limits, scale as much as you need
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
