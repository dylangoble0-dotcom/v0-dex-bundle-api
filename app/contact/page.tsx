import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/xo-logo.png" alt="XO Logo" width={40} height={40} />
            <span className="text-xl font-bold text-amber-500">LOCUST ECOSYSTEM</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10 bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold text-amber-500 mb-4 text-center">Contact Us</h1>
        <p className="text-slate-300 text-lg text-center mb-12">Get in touch with the Locust Ecosystem team</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="bg-slate-900/50 border-2 border-amber-500/30 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-500">Send us a message</CardTitle>
                <CardDescription className="text-slate-300">
                  Fill out the form and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action="/api/contact" method="POST" className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500 resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-2 border-amber-500/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-500 mb-1">Email</h3>
                    <p className="text-slate-300">Contact us via the investor inquiry form</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-2 border-amber-500/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-500 mb-1">Location</h3>
                    <p className="text-slate-300">Operating globally with distributed teams</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-2 border-amber-500/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-amber-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-500 mb-1">Projects</h3>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Locust Protocol - Cloud Infrastructure</li>
                      <li>• Locust Wireless - eSIM & Hosting</li>
                      <li>• XO Coin - Solana Gaming</li>
                      <li>• Locust Technology - Confidential</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
