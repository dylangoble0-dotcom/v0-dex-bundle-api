import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Globe, Plane, Building2, Smartphone, TrendingUp } from "lucide-react"

export default function LocustWirelessPage() {
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
            <div className="mb-8 flex justify-center bg-slate-950 rounded-2xl p-8">
              <Image
                src="/images/img-3014.jpeg"
                alt="Locust Wireless"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl font-bold text-amber-500 mb-4">Locust Wireless</h1>
            <p className="text-xl text-slate-300">Global eSIM Solutions & Enterprise Cloud Hosting</p>
          </div>

          {/* Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">What is Locust Wireless?</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  Locust Wireless is revolutionizing global connectivity through next-generation eSIM technology and
                  enterprise-grade cloud hosting services. We eliminate the hassle of physical SIM cards and provide
                  seamless, instant connectivity worldwide.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Our dual focus on travel eSIMs and cloud infrastructure makes us the perfect partner for businesses
                  and travelers seeking reliable, flexible connectivity solutions.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Travel eSIM Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Travel eSIM Solutions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Plane className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Instant Global Connectivity</h3>
                  <p className="text-slate-300">
                    Activate data plans in 150+ countries instantly. No more hunting for local SIM cards or paying
                    roaming fees.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Globe className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Flexible Data Plans</h3>
                  <p className="text-slate-300">
                    Choose from daily, weekly, or monthly plans. Pay only for what you need with transparent pricing.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Smartphone className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Seamless Setup</h3>
                  <p className="text-slate-300">
                    Download, scan QR code, connect. Get online in under 2 minutes on any eSIM-compatible device.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Cost-Effective</h3>
                  <p className="text-slate-300">
                    Save up to 90% on international roaming charges. Predictable pricing with no hidden fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Travel Agent Partnership */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Partnership Opportunities for Travel Agents</h2>
            <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Building2 className="w-16 h-16 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">Become a Locust Wireless Travel Partner</h3>
                    <p className="text-slate-300 text-lg mb-4">
                      We're actively seeking travel agencies and agents to offer Locust Wireless eSIMs to their clients.
                      This is a perfect value-add service that enhances the travel experience while generating
                      additional revenue.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-amber-400 mb-3">Benefits for Travel Agents:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>Competitive commission structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>White-label solutions available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>Marketing materials and support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>Easy integration with booking systems</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-amber-400 mb-3">Why Travelers Love It:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>Stay connected from the moment they land</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>No language barriers buying local SIMs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>Reliable 4G/5G coverage worldwide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">✓</span>
                        <span>24/7 customer support</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link href="/#investor">
                    <Button size="lg" className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold">
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cloud Hosting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Enterprise Cloud Hosting</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  Beyond eSIM connectivity, Locust Wireless offers robust cloud hosting infrastructure designed for
                  businesses that demand reliability, scalability, and performance.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-slate-950/50 p-4 rounded-lg">
                    <h4 className="text-amber-400 font-semibold mb-2">99.9% Uptime SLA</h4>
                    <p className="text-slate-400 text-sm">Enterprise-grade reliability you can count on</p>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-lg">
                    <h4 className="text-amber-400 font-semibold mb-2">Global CDN</h4>
                    <p className="text-slate-400 text-sm">Lightning-fast content delivery worldwide</p>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-lg">
                    <h4 className="text-amber-400 font-semibold mb-2">Auto-Scaling</h4>
                    <p className="text-slate-400 text-sm">Seamlessly handle traffic spikes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link href="/#investor">
              <Button size="lg" className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold">
                Become an Investor/Partner
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
