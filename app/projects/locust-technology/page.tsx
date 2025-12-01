import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Lock, Shield, Eye } from "lucide-react"

export default function LocustTechnologyPage() {
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
                src="/images/img-2804.jpeg"
                alt="Locust Technology"
                width={350}
                height={350}
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl font-bold text-amber-500 mb-4">Locust Technology</h1>
            <p className="text-xl text-slate-300">Revolutionary Platform - Confidential Information</p>
          </div>

          {/* Confidential Notice */}
          <section className="mb-12">
            <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500">
              <CardContent className="p-12">
                <Lock className="w-24 h-24 text-amber-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">Investors Only</h2>
                <p className="text-slate-300 text-lg text-center leading-relaxed mb-8">
                  Locust Technology represents our most ambitious and groundbreaking project to date. Due to the
                  sensitive and proprietary nature of this technology, detailed information is available exclusively to
                  qualified investors and partners who have signed appropriate non-disclosure agreements.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-950/50 p-6 rounded-lg text-center">
                    <Shield className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-amber-400 font-semibold mb-2">Protected IP</h3>
                    <p className="text-slate-400 text-sm">
                      Patent-pending technology with significant market potential
                    </p>
                  </div>

                  <div className="bg-slate-950/50 p-6 rounded-lg text-center">
                    <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-amber-400 font-semibold mb-2">NDA Required</h3>
                    <p className="text-slate-400 text-sm">Non-disclosure agreement mandatory for all stakeholders</p>
                  </div>

                  <div className="bg-slate-950/50 p-6 rounded-lg text-center">
                    <Eye className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-amber-400 font-semibold mb-2">High Value</h3>
                    <p className="text-slate-400 text-sm">Massive market opportunity with disruptive potential</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* What We Can Share */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">What We Can Share</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  While we cannot disclose specific technical details publicly, we can share that Locust Technology:
                </p>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <span>Addresses a multi-billion dollar market opportunity with limited existing competition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <span>Leverages cutting-edge technology to solve critical infrastructure challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <span>Has potential applications across multiple industries and sectors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <span>Builds upon proven technology foundations while introducing novel innovations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <span>Is being developed by a team with deep domain expertise and proven track records</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Investment Opportunity */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Investment Opportunity</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  We are currently seeking qualified investors and strategic partners for Locust Technology. This is an
                  exclusive opportunity to be part of a groundbreaking project from the ground floor.
                </p>

                <div className="bg-slate-950/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-amber-400 mb-4">Investor Requirements:</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span>Accredited investor status or institutional backing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span>Willingness to sign comprehensive NDA before disclosure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span>Long-term investment horizon (3-5+ years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span>Interest in strategic partnership opportunities beyond capital</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-amber-500 mb-4">Request Access to Confidential Materials</h3>
                <p className="text-slate-300 text-lg mb-6">
                  If you're a qualified investor interested in learning more about Locust Technology, please submit an
                  inquiry below. Our team will review your information and reach out to discuss next steps, including
                  NDA execution and detailed presentation.
                </p>
                <Link href="/#investor">
                  <Button size="lg" className="bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold">
                    Request Investor Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
