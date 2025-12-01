import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Wifi, Coins, Lock } from "lucide-react"
import { CoffeeButton } from "@/components/coffee-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-amber-100">
      {/* Header */}
      <header className="border-b border-amber-700 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-amber-500">XO DEVELOPMENT</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#projects" className="text-amber-200 hover:text-amber-500 transition-colors">
              Projects
            </Link>
            <Link href="#investor" className="text-amber-200 hover:text-amber-500 transition-colors">
              Investor/Partner
            </Link>
          </nav>
          <CoffeeButton className="bg-amber-500 text-black hover:bg-amber-400 font-semibold" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300 mb-6">
            XO Development
          </h1>

          <p className="text-2xl md:text-3xl text-amber-200 italic font-light mb-8 leading-relaxed">
            "Vision is the art of seeing what is invisible to others."
          </p>

          <p className="text-lg text-amber-300 mb-10">
            Building the future of cloud automation, wireless connectivity, and decentralized finance
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#projects">
              <Button size="lg" className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                View Projects
              </Button>
            </Link>
            <Link href="#investor">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-500 hover:bg-amber-500/20"
              >
                Become an Investor/Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-amber-500 mb-12">Our Projects</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Locust Protocol */}
          <Link href="/projects/locust-protocol">
            <Card className="bg-black border border-amber-600 hover:border-amber-400 transition-all duration-300 cursor-pointer h-full">
              <div className="relative h-48 bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/d5573275-5b41-4ae7-98b5.jpeg"
                  alt="Locust Protocol"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-amber-500 flex items-center gap-2">
                  <Server className="w-6 h-6" />
                  Locust Protocol
                </CardTitle>
                <CardDescription className="text-amber-200 text-base">
                  AI-powered cloud infrastructure automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-amber-300">
                  Automated provisioning, SSH, VCN, DNS automation, and more.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Locust Wireless */}
          <Link href="/projects/locust-wireless">
            <Card className="bg-black border border-amber-600 hover:border-amber-400 transition-all duration-300 cursor-pointer h-full">
              <div className="relative h-48 bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/img-3014.jpeg"
                  alt="Locust Wireless"
                  fill
                  className="object-contain"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl text-amber-500 flex items-center gap-2">
                  <Wifi className="w-6 h-6" />
                  Locust Wireless
                </CardTitle>
                <CardDescription className="text-amber-200 text-base">
                  Global eSIM solutions & enterprise hosting
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-amber-300">
                  International travel eSIMs and cloud hosting infrastructure.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* XO Coin / Solana */}
          <Link href="/projects/xo-coin">
            <Card className="bg-black border border-amber-600 hover:border-amber-400 transition-all duration-300 cursor-pointer h-full">
              <div className="relative h-48 bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/xo-logo.png"
                  alt="XO Coin Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl text-amber-500 flex items-center gap-2">
                  <Coins className="w-6 h-6" />
                  XO Coin & XO Solana
                </CardTitle>
                <CardDescription className="text-amber-200 text-base">
                  Decentralized poker platform on Solana
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-amber-300">
                  Live on DappRadar. Rake → liquidity. IDO planned.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Locust Technology */}
          <Link href="/projects/locust-technology">
            <Card className="bg-black border border-amber-600 hover:border-amber-400 transition-all duration-300 cursor-pointer h-full">
              <div className="relative h-48 bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/img-2804.jpeg"
                  alt="Locust Technology"
                  fill
                  className="object-contain"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl text-amber-500 flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Locust Technology
                </CardTitle>
                <CardDescription className="text-amber-200 text-base">
                  Private — Investors Only
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-amber-300">
                  Confidential project with breakthrough technology.
                </p>
              </CardContent>
            </Card>
          </Link>

        </div>
      </section>

      {/* Investor Section */}
      <section id="investor" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black border border-amber-600">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-amber-500 mb-4">
                Become an Investor or Partner
              </CardTitle>
              <CardDescription className="text-amber-200 text-lg">
                Join us in building the future of technology.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form action="/api/contact" method="POST" className="space-y-4">

                {/* Input Fields */}
                {[
                  { id: "name", label: "Full Name *", type: "text", required: true },
                  { id: "email", label: "Email Address *", type: "email", required: true },
                  { id: "company", label: "Company / Organization", type: "text", required: false }
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-amber-300 mb-2">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      className="w-full px-4 py-2 bg-black border border-amber-700 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 placeholder:text-amber-600"
                    />
                  </div>
                ))}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-amber-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 bg-black border border-amber-700 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 placeholder:text-amber-600 resize-none"
                    placeholder="Tell us about your investment or partnership interests..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-500 text-black hover:bg-amber-400 font-semibold text-lg py-6"
                >
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-700 py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-lg font-bold text-amber-500">XO DEVELOPMENT</span>
            <p className="text-amber-300">&copy; 2025 XO Development. All rights reserved.</p>

            <div className="flex gap-6">
              <Link href="/contact" className="text-amber-300 hover:text-amber-500 transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-amber-300 hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}