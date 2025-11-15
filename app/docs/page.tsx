"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Copy, Check } from 'lucide-react'

export default function DocsPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(id)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="text-[#1e3a5f] border-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white bg-transparent"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5573275-5b41-4ae7-98b5-560b05481ec9.jpeg"
              alt="Locust Protocol"
              width={300}
              height={150}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4 text-center">Locust Protocol Documentation</h1>
          <p className="text-gray-600 text-lg mb-4 text-center">
            Complete DEX aggregation in one unified API package.
          </p>
          <p className="text-gray-600 text-lg font-semibold mb-4 text-center">One API endpoint. One API key. Simple integration.</p>
          <div className="mt-6 p-6 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] border-2 border-[#c87642] rounded-lg">
            <h2 className="text-white font-bold text-2xl mb-3">Your Locust Protocol API Key</h2>
            <p className="text-gray-100 text-lg mb-4">
              When you sign up, you receive a unique <span className="font-mono font-bold text-[#c87642]">locust_</span> prefixed API key. This key connects your application directly to <span className="bold">Locust Protocol's unified DEX aggregation API</span>.
            </p>
            <div className="bg-white/10 border border-[#c87642] rounded-lg p-4 mb-4">
              <p className="text-white font-semibold mb-2">Your API key provides access to:</p>
              <ul className="space-y-2 text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="text-[#c87642] font-bold">→</span>
                  <span>Multi-chain DEX aggregation (Ethereum + Solana)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c87642] font-bold">→</span>
                  <span>300+ liquidity sources on Ethereum via 1inch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c87642] font-bold">→</span>
                  <span>18+ DEXs on Solana via Jupiter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c87642] font-bold">→</span>
                  <span>Wallet management (Phantom + MetaMask)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c87642] font-bold">→</span>
                  <span>AI-powered DeFi assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c87642] font-bold">→</span>
                  <span>Real-time price data and historical charts</span>
                </li>
              </ul>
            </div>
            <p className="text-gray-100 text-lg">
              All API requests to <span className="font-mono font-bold text-[#c87642]">/api/dex</span> are authenticated using your Locust Protocol API key in the request header.
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
            <p className="text-red-800 font-bold text-lg mb-2">IMPORTANT: Secure Your API Key</p>
            <p className="text-red-700">
              Get your personal Locust Protocol API key from the{" "}
              <Link href="/dashboard" className="underline font-bold">
                Dashboard
              </Link>
              . Keep it private and never share it publicly or commit it to version control.
            </p>
          </div>
        </div>

        <Card className="mb-8 border-2 border-[#c87642] shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] text-white">
            <CardTitle className="text-2xl">Locust Protocol Integration</CardTitle>
            <CardDescription className="text-gray-200 text-base">One endpoint for complete DEX functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h3 className="font-semibold text-[#1e3a5f] mb-2 text-lg">Locust Protocol API Endpoint</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-100 px-4 py-3 rounded text-base font-mono font-bold text-[#c87642]">
                  https://xodevelopment.com/api/dex
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("https://xodevelopment.com/api/dex", "endpoint")}
                  className="border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                >
                  {copiedItem === "endpoint" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-[#1e3a5f] rounded-lg p-6">
              <h3 className="font-semibold text-[#1e3a5f] mb-4 text-xl">Locust Protocol Actions</h3>
              <p className="text-gray-700 mb-4">Access all DEX functionality through the action parameter.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">ETH</h4>
                  <p className="text-gray-600 text-sm">Ethereum DEX aggregation via 1inch (300+ sources)</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">SOL</h4>
                  <p className="text-gray-600 text-sm">Solana DEX aggregation via Jupiter (18+ DEXs)</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">quote</h4>
                  <p className="text-gray-600 text-sm">Get swap quotes using 1inch aggregation</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">swap (POST)</h4>
                  <p className="text-gray-600 text-sm">Execute token swaps via 1inch</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">wallet</h4>
                  <p className="text-gray-600 text-sm">Wallet operations (connect, balance, transactions)</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">phantom</h4>
                  <p className="text-gray-600 text-sm">Phantom wallet operations (connect, sign, transactions)</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">tokens</h4>
                  <p className="text-gray-600 text-sm">Get token list with addresses and decimals</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">price-history</h4>
                  <p className="text-gray-600 text-sm">Historical price data for tokens</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">claude</h4>
                  <p className="text-gray-600 text-sm">AI assistance powered by Claude</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">moralis-nft</h4>
                  <p className="text-gray-600 text-sm">NFT portfolio via Moralis</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">moralis-wallet</h4>
                  <p className="text-gray-600 text-sm">Wallet balance and analytics via Moralis</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">moralis-token</h4>
                  <p className="text-gray-600 text-sm">Token metadata via Moralis</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-[#c87642]">
                  <h4 className="font-bold text-[#c87642] mb-2">morphic (POST)</h4>
                  <p className="text-gray-600 text-sm">AI-powered DeFi insights</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-2 border-[#1e3a5f] rounded-lg p-6">
              <h3 className="font-semibold text-[#1e3a5f] mb-4 text-2xl">Complete API Integration Examples</h3>
              <p className="text-gray-700 mb-6">Copy and paste these examples to integrate all Locust Protocol features.</p>

              {/* Ethereum DEX Aggregation */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">1. Ethereum DEX Aggregation (ETH)</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Get Ethereum swap quote (1 ETH to USDC)
const ethQuote = await fetch(
  'https://xodevelopment.com/api/dex?action=ETH&fromToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amount=1000000000000000000&chainId=1',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

console.log(ethQuote); // 300+ liquidity sources via 1inch`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const ethQuote = await fetch(\n  'https://xodevelopment.com/api/dex?action=ETH&fromToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amount=1000000000000000000&chainId=1',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconsole.log(ethQuote);`,
                        "eth-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "eth-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Solana DEX Aggregation */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">2. Solana DEX Aggregation (SOL)</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Get Solana swap quote (1 SOL to USDC)
const solQuote = await fetch(
  'https://xodevelopment.com/api/dex?action=SOL&inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=1000000000',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

console.log(solQuote); // Aggregates 18+ DEXs via Jupiter`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const solQuote = await fetch(\n  'https://xodevelopment.com/api/dex?action=SOL&inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=1000000000',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconsole.log(solQuote);`,
                        "sol-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "sol-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Wallet Management */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">3. Wallet Management (Phantom + MetaMask)</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Connect multi-chain wallet (includes Phantom)
const walletConnect = await fetch(
  'https://xodevelopment.com/api/dex?action=wallet&operation=connect',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

// Get wallet balance
const balance = await fetch(
  'https://xodevelopment.com/api/dex?action=wallet&operation=balance&address=0x...&chain=ethereum',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

// Get transaction history
const transactions = await fetch(
  'https://xodevelopment.com/api/dex?action=wallet&operation=transactions&address=0x...&chain=ethereum',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const walletConnect = await fetch(\n  'https://xodevelopment.com/api/dex?action=wallet&operation=connect',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconst balance = await fetch(\n  'https://xodevelopment.com/api/dex?action=wallet&operation=balance&address=0x...&chain=ethereum',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());`,
                        "wallet-full-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "wallet-full-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Phantom Wallet */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">4. Phantom Wallet Integration</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Connect Phantom wallet
const phantomConnect = await fetch(
  'https://xodevelopment.com/api/dex?action=phantom&operation=connect',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

// Sign transaction with Phantom
const phantomSign = await fetch(
  'https://xodevelopment.com/api/dex?action=phantom&operation=sign&address=YourSolanaAddress...',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

// Get Phantom transaction history
const phantomTxs = await fetch(
  'https://xodevelopment.com/api/dex?action=phantom&operation=transaction&address=YourSolanaAddress...',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const phantomConnect = await fetch(\n  'https://xodevelopment.com/api/dex?action=phantom&operation=connect',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconst phantomSign = await fetch(\n  'https://xodevelopment.com/api/dex?action=phantom&operation=sign&address=YourSolanaAddress...',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());`,
                        "phantom-full-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "phantom-full-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Execute Swap */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">5. Execute Token Swap (POST)</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Execute swap transaction
const swap = await fetch('https://xodevelopment.com/api/dex', {
  method: 'POST',
  headers: {
    'X-API-Key': 'locust_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'swap',
    fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    toToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    amount: '1000000000000000000',
    userAddress: '0xYourWalletAddress',
    slippage: 1,
    chain: '1'
  })
}).then(res => res.json());

console.log(swap); // Transaction data for execution`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const swap = await fetch('https://xodevelopment.com/api/dex', {\n  method: 'POST',\n  headers: {\n    'X-API-Key': 'locust_your_api_key_here',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    action: 'swap',\n    fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',\n    toToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',\n    amount: '1000000000000000000',\n    userAddress: '0xYourWalletAddress',\n    slippage: 1,\n    chain: '1'\n  })\n}).then(res => res.json());`,
                        "swap-full-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "swap-full-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Token Lists */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">6. Get Token Lists</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Get aggregated token list
const tokens = await fetch(
  'https://xodevelopment.com/api/dex?action=tokens',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

console.log(tokens); // Returns token addresses, symbols, decimals`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const tokens = await fetch(\n  'https://xodevelopment.com/api/dex?action=tokens',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconsole.log(tokens);`,
                        "tokens-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "tokens-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Price History */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">7. Get Price History</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Get historical price data
const priceHistory = await fetch(
  'https://xodevelopment.com/api/dex?action=price-history&token=ETH&period=24h',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

console.log(priceHistory); // Array of price points with timestamps`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const priceHistory = await fetch(\n  'https://xodevelopment.com/api/dex?action=price-history&token=ETH&period=24h',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconsole.log(priceHistory);`,
                        "price-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "price-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">8. AI Assistant (Claude)</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Get AI-powered DeFi assistance
const aiResponse = await fetch(
  'https://xodevelopment.com/api/dex?action=claude&prompt=Explain how token swaps work',
  {
    headers: { 'X-API-Key': 'locust_your_api_key_here' }
  }
).then(res => res.json());

console.log(aiResponse.response); // AI-generated explanation`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const aiResponse = await fetch(\n  'https://xodevelopment.com/api/dex?action=claude&prompt=Explain how token swaps work',\n  {\n    headers: { 'X-API-Key': 'locust_your_api_key_here' }\n  }\n).then(res => res.json());\n\nconsole.log(aiResponse.response);`,
                        "claude-full-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "claude-full-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Morphic AI */}
              <div className="mb-6">
                <h4 className="font-bold text-[#c87642] mb-3 text-lg">9. Morphic AI Insights (POST)</h4>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Get AI-powered DeFi insights
const morphic = await fetch('https://xodevelopment.com/api/dex', {
  method: 'POST',
  headers: {
    'X-API-Key': 'locust_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'morphic',
    query: 'What are the best liquidity pools for ETH/USDC?'
  })
}).then(res => res.json());

console.log(morphic.response); // AI-generated DeFi insights`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const morphic = await fetch('https://xodevelopment.com/api/dex', {\n  method: 'POST',\n  headers: {\n    'X-API-Key': 'locust_your_api_key_here',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    action: 'morphic',\n    query: 'What are the best liquidity pools for ETH/USDC?' \n  })\n}).then(res => res.json());`,
                        "morphic-full-example"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-[#c87642] text-[#c87642] hover:bg-[#c87642] hover:text-white"
                  >
                    {copiedItem === "morphic-full-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Complete Integration Example */}
              <div className="mb-6 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] p-6 rounded-lg">
                <h4 className="font-bold text-white mb-3 text-xl">Complete Integration Example</h4>
                <p className="text-gray-200 mb-4">All actions integrated in a single implementation:</p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                    <code>{`// Locust Protocol - Complete API Integration
const API_BASE = 'https://xodevelopment.com/api/dex';
const API_KEY = 'locust_your_api_key_here';

// Helper function for API calls
async function locustAPI(action, params = {}, method = 'GET') {
  const url = method === 'GET' 
    ? \`\${API_BASE}?action=\${action}&\${new URLSearchParams(params)}\`
    : API_BASE;
    
  const options = {
    method,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json'
    }
  };
  
  if (method === 'POST') {
    options.body = JSON.stringify({ action, ...params });
  }
  
  return fetch(url, options).then(res => res.json());
}

// Usage examples:
// 1. Ethereum swap quote via 1inch
const ethQuote = await locustAPI('ETH', {
  fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  toToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  amount: '1000000000000000000',
  chainId: '1'
});

// 2. Solana swap quote via Jupiter
const solQuote = await locustAPI('SOL', {
  inputMint: 'So11111111111111111111111111111111111111112',
  outputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  amount: '1000000000'
});

// 3. Wallet connection (supports MetaMask, Phantom, etc.)
const wallet = await locustAPI('wallet', { operation: 'connect' });
const balance = await locustAPI('wallet', { 
  operation: 'balance', 
  address: '0x...', 
  chain: 'ethereum' 
});

// 4. Phantom wallet operations
const phantom = await locustAPI('phantom', { operation: 'connect' });

// 5. Execute swap via 1inch
const swap = await locustAPI('swap', {
  fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  toToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  amount: '1000000000000000000',
  userAddress: '0x...',
  slippage: 1,
  chain: '1'
}, 'POST');

// 6. Token list
const tokens = await locustAPI('tokens');

// 7. Price history
const prices = await locustAPI('price-history', { 
  token: 'ETH', 
  period: '24h' 
});

// 8. Claude AI Assistant
const ai = await locustAPI('claude', { 
  prompt: 'Explain how DEX aggregation works' 
});

// 9. Moralis NFT data
const nfts = await locustAPI('moralis-nft', {
  address: '0x...',
  chain: 'eth'
});

// 10. Moralis wallet analytics
const walletData = await locustAPI('moralis-wallet', {
  address: '0x...',
  chain: 'eth'
});

// 11. Moralis token metadata
const tokenMeta = await locustAPI('moralis-token', {
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  chain: 'eth'
});

console.log('Locust Protocol integration complete!');`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `const API_BASE = 'https://xodevelopment.com/api/dex';\nconst API_KEY = 'locust_your_api_key_here';\n\nasync function locustAPI(action, params = {}, method = 'GET') {\n  const url = method === 'GET' \n    ? \`\${API_BASE}?action=\${action}&\${new URLSearchParams(params)}\`\n    : API_BASE;\n  const options = {\n    method,\n    headers: {\n      'X-API-Key': API_KEY,\n      'Content-Type': 'application/json'\n    }\n  };\n  if (method === 'POST') {\n    options.body = JSON.stringify({ action, ...params });\n  }\n  return fetch(url, options).then(res => res.json());\n}`,
                        "complete-integration"
                      )
                    }
                    className="absolute top-2 right-2 bg-white border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-white"
                  >
                    {copiedItem === "complete-integration" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-[#1e3a5f]">
          <CardHeader>
            <CardTitle className="text-[#1e3a5f]">Get Started</CardTitle>
            <CardDescription>Three simple steps to DEX integration</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li className="font-semibold text-lg">
                <Link href="/signup" className="text-[#c87642] hover:underline">
                  Create your free account
                </Link>
              </li>
              <li className="font-semibold text-lg">
                Copy your API key from the{" "}
                <Link href="/dashboard" className="text-[#c87642] hover:underline">
                  Dashboard
                </Link>
              </li>
              <li className="font-semibold text-lg">Add the API endpoint to your code</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mt-8 border-[#1e3a5f]">
          <CardHeader>
            <CardTitle className="text-[#1e3a5f]">Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 font-semibold">Include your API key in every request header:</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm mb-4">
              <code>X-API-Key: locust_your_api_key_here</code>
            </pre>
            <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mb-4">
              <p className="text-gray-800 font-semibold mb-2">Get Your API Key:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-2">
                <li>
                  <Link href="/dashboard" className="text-[#c87642] hover:underline font-semibold">
                    Go to Dashboard
                  </Link>
                </li>
                <li>Copy your unique API key</li>
                <li>Add it to your request headers</li>
              </ol>
            </div>
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#c87642] rounded-lg p-6 text-white">
              <p className="font-bold mb-3 text-xl text-[#c87642]">Locust Protocol - $49/month</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="text-[#c87642]">✓</span> Unlimited API requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#c87642]">✓</span> Multi-chain DEX aggregation (ETH + SOL)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#c87642]">✓</span> Complete wallet management (Phantom + MetaMask)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#c87642]">✓</span> AI assistant access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#c87642]">✓</span> Real-time price data
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#c87642]">✓</span> Priority support
                </li>
              </ul>
              <Link href="/subscription">
                <Button className="w-full bg-[#c87642] hover:bg-[#b86532] text-white">
                  Subscribe to Locust Protocol
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 border-[#c87642]">
          <CardHeader>
            <CardTitle className="text-[#1e3a5f]">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">Questions about integration?</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-[#c87642] hover:bg-[#b86532] text-white">Contact Support</Button>
              </Link>
              <Link href="/community">
                <Button
                  variant="outline"
                  className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white bg-transparent"
                >
                  Join Community Forum
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
