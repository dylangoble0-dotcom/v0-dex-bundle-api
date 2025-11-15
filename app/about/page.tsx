"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Zap, Lock, BarChart3, Database, Wallet } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5573275-5b41-4ae7-98b5-560b05481ec9.jpeg"
                alt="Locust Protocol"
                width={300}
                height={150}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-primary">About Locust Protocol</h1>
            <p className="text-lg text-muted-foreground">The complete DEX aggregation package</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                What Is Locust Protocol?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  <strong>Locust Protocol</strong> is XO's unified DEX aggregation package that combines multi-chain swaps, 
                  wallet management, AI assistance, and comprehensive DeFi data into a single, easy-to-integrate API endpoint.
                </p>
                <p className="text-muted-foreground mb-4">
                  Single Unified Endpoint (<code className="bg-muted px-2 py-1 rounded">/api/dex</code>) that provides 
                  complete DEX functionality through simple action parameters:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    <strong>quote</strong> - Get aggregated swap quotes across chains
                  </li>
                  <li>
                    <strong>swap</strong> - Execute optimized swaps
                  </li>
                  <li>
                    <strong>tokens</strong> - Get comprehensive token information
                  </li>
                  <li>
                    <strong>price-history</strong> - Access historical price data
                  </li>
                  <li>
                    <strong>morphic</strong> - AI-powered DeFi assistance
                  </li>
                  <li>
                    <strong>wallet</strong> - Connect and manage crypto wallets (MetaMask, WalletConnect, Coinbase, Phantom)
                  </li>
                  <li>
                    <strong>claude</strong> - Advanced AI insights
                  </li>
                  <li>
                    <strong>ETH</strong> - Ethereum DEX aggregation
                  </li>
                  <li>
                    <strong>SOL</strong> - Solana DEX aggregation
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-accent" />
                  Wallet Management
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Connect wallets across all major providers (MetaMask, WalletConnect, Coinbase, Phantom)</li>
                  <li>Check balances across multiple chains (Ethereum, Solana, BSC, Polygon, Arbitrum, Optimism)</li>
                  <li>Retrieve transaction history for any wallet address</li>
                  <li>Seamless wallet integration for dApps using your API key</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  Authentication & Access Control
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>User account management (signup/login)</li>
                  <li>Unique API key generation for each user</li>
                  <li>Simple $49/month subscription for unlimited access</li>
                  <li>Usage tracking and analytics dashboard</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Platform Features
                </h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Dashboard with API key and usage stats</li>
                  <li>Analytics page showing request usage</li>
                  <li>Domain Marketplace for buying and selling premium domains</li>
                  <li>Community Forum for developers</li>
                  <li>Secure payment processing through Stripe</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-accent" />
                  How It Works
                </h3>
                <p className="text-muted-foreground mb-3">
                  Locust Protocol acts as a <strong>unified gateway</strong> that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Authenticates requests with user API keys</li>
                  <li>Tracks and logs all API usage</li>
                  <li>Aggregates liquidity from multiple DEX sources</li>
                  <li>Delivers optimal swap rates across all major chains</li>
                  <li>Provides AI-powered insights and assistance</li>
                </ul>
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="font-semibold text-lg mb-3">The Locust Protocol Advantage</h3>
                <p className="text-muted-foreground">
                  One package. One endpoint. One API key. Locust Protocol delivers complete DEX aggregation 
                  with built-in authentication, usage tracking, and comprehensive analytics. Access liquidity 
                  across all major chains plus wallet management, AI assistance, and advanced DeFi features - 
                  all seamlessly integrated for just $49/month.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Link href="/subscription">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-yellow-400 border-2 border-red-600">
                Subscribe - $49/month
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
