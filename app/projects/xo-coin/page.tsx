import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Coins, TrendingUp, Lock, ExternalLink, Droplet, Rocket } from "lucide-react"

export default function XOCoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to XO Development</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="mb-8 flex justify-center">
              <Image src="/xo-logo.png" alt="XO Coin Logo" width={200} height={200} className="object-contain" />
            </div>
            <h1 className="text-5xl font-bold text-amber-500 mb-4">XO Coin & XO Solana</h1>
            <p className="text-xl text-slate-300 mb-6">Decentralized Poker Platform on Solana Blockchain</p>
            <a href="https://xosolana.app" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold">
                Visit XOSolana.app <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>

          {/* Platform Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Platform Overview</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  XO Solana is a live decentralized poker platform built on the Solana blockchain, offering provably
                  fair gaming experiences with the speed and security of blockchain technology. Currently listed on{" "}
                  <a
                    href="https://dappradar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:underline"
                  >
                    DappRadar
                  </a>
                  , the platform is actively used by players worldwide.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  XO Coin is the native utility token that powers the entire ecosystem, creating a sustainable economic
                  model through innovative tokenomics and liquidity mechanisms.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Rake to Liquidity System */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Innovative Rake Collection System</h2>
            <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Droplet className="w-16 h-16 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">Rake → Liquidity Pool Model</h3>
                    <p className="text-slate-300 text-lg mb-4">
                      We've designed a revolutionary system where poker table rake fees are automatically converted and
                      deposited into the XO Coin liquidity pool, creating organic value growth and sustainable
                      tokenomics.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-semibold text-amber-400 mb-4">How It Works:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-slate-950 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </span>
                      <p className="text-slate-300">
                        <strong className="text-amber-400">Rake Collection:</strong> A small percentage is collected
                        from each poker hand played on the platform
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-slate-950 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </span>
                      <p className="text-slate-300">
                        <strong className="text-amber-400">Automatic Conversion:</strong> Collected rake is
                        automatically swapped for XO Coin through smart contracts
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-slate-950 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </span>
                      <p className="text-slate-300">
                        <strong className="text-amber-400">Liquidity Injection:</strong> Converted funds are deposited
                        directly into the XO Coin liquidity pool
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-amber-500 text-slate-950 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        4
                      </span>
                      <p className="text-slate-300">
                        <strong className="text-amber-400">Value Growth:</strong> Increased liquidity reduces slippage
                        and creates sustainable price appreciation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-950/50 p-4 rounded-lg text-center">
                    <TrendingUp className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <h5 className="text-amber-400 font-semibold mb-1">Growing Liquidity</h5>
                    <p className="text-slate-400 text-sm">Continuous rake feeds liquidity pool</p>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-lg text-center">
                    <Lock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <h5 className="text-amber-400 font-semibold mb-1">Stable Pricing</h5>
                    <p className="text-slate-400 text-sm">Deep liquidity reduces volatility</p>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-lg text-center">
                    <Coins className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <h5 className="text-amber-400 font-semibold mb-1">Token Utility</h5>
                    <p className="text-slate-400 text-sm">Real value from platform activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* IDO Plans */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Initial DEX Offering (IDO)</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Rocket className="w-12 h-12 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-amber-400 mb-3">Upcoming XO Coin Public Launch</h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-4">
                      We're planning an Initial DEX Offering (IDO) for XO Coin to bring the token to the broader crypto
                      community. This will allow early supporters and investors to participate in the growth of the XO
                      Solana ecosystem.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-amber-400 mb-4">IDO Details (Preliminary):</h4>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>
                        <strong className="text-amber-400">Launch Platform:</strong> Major Solana DEX launchpad
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>
                        <strong className="text-amber-400">Token Utility:</strong> Platform fees, governance, staking
                        rewards, VIP access
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>
                        <strong className="text-amber-400">Initial Liquidity:</strong> Seeded from existing rake
                        collection system
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>
                        <strong className="text-amber-400">Early Investor Benefits:</strong> Preferential allocation,
                        vesting bonuses
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Platform Stats */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Platform Status</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6 text-center">
                  <ExternalLink className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">Live on DappRadar</h3>
                  <p className="text-slate-300">Listed on the world's leading dApp analytics platform</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6 text-center">
                  <Coins className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">Active Platform</h3>
                  <p className="text-slate-300">Real users playing poker and generating rake daily</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6 text-center">
                  <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">Provably Fair</h3>
                  <p className="text-slate-300">Blockchain-verified game integrity and transparency</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center space-y-4">
            <div>
              <a href="https://xosolana.app" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold">
                  Play Now on XOSolana.app <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
            <div>
              <Link href="/#investor">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-500 hover:bg-amber-500/10 bg-transparent"
                >
                  Invest in XO Coin IDO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
