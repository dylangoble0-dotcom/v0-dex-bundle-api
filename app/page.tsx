import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserMenu } from "@/components/user-menu"

export default function Home() {
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/xo-logo.png" alt="XO Logo" width={40} height={40} />
            <span className="text-xl font-bold text-[#c87642]">XO DEVELOPMENT</span>
          </Link>
          <UserMenu />
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-foreground leading-relaxed">
            XO Development is a tech branch established by XO Holdings. Our mission is to create, innovate, and improve web3 development.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="bg-black border-2 border-[#FF0000] rounded-lg p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5573275-5b41-4ae7-98b5-560b05481ec9.jpeg"
              alt="Locust Protocol"
              width={500}
              height={250}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#FF0000] text-center">Locust Protocol</h1>
          
          <div className="bg-black/50 backdrop-blur-sm border border-[#FF0000] rounded-lg p-8 max-w-md mx-auto mb-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-[#FFD700] mb-6">
                $49<span className="text-2xl text-[#FFD700]">/month</span>
              </p>
              <ul className="space-y-2 text-left text-[#FFD700] mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-[#FFD700]">✓</span> Unlimited API requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FFD700]">✓</span> Multi-chain DEX aggregation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FFD700]">✓</span> Wallet management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FFD700]">✓</span> AI assistant access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FFD700]">✓</span> Real-time price data
                </li>
              </ul>
              <Link href="/subscription">
                <Button 
                  size="lg" 
                  className="w-full bg-transparent border-2 border-[#FF0000] text-[#FFD700] hover:bg-[#FF0000]/10 font-semibold"
                >
                  Subscribe to Locust Protocol
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black bg-transparent"
              >
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl text-[#c87642] font-semibold">
            Coming Soon: XO Poker Platform and Poker API Package for Developers
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#c87642]/10 to-[#1e3a8a]/10 border-2 border-[#c87642] rounded-lg p-12 shadow-2xl max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#c87642] mb-4">TRY FOR FREE</h2>
          <p className="text-xl text-foreground mb-6">
            Get 7 days of free access to Locust Protocol. No credit card required.
          </p>
          <Link href="/signup">
            <Button 
              size="lg" 
              className="bg-[#c87642] text-white hover:bg-[#c87642]/90 font-bold text-lg px-8"
            >
              Start Free Trial
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            After your trial ends, subscribe for $49/month to continue using Locust Protocol
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">&copy; 2025 XO Development. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/contact" className="text-muted-foreground hover:text-[#c87642] transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-[#c87642] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
