import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Server, Cloud, Key, Network, Zap, Shield } from "lucide-react"

export default function LocustProtocolPage() {
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
              <Image
                src="/images/d5573275-5b41-4ae7-98b5.jpeg"
                alt="Locust Protocol"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl font-bold text-amber-500 mb-4">Locust Protocol</h1>
            <p className="text-xl text-slate-300">AI-Powered Cloud Infrastructure Automation</p>
          </div>

          {/* Problem Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">The Problem We Solve</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  Cloud infrastructure setup is complex, time-consuming, and error-prone. DevOps teams spend countless
                  hours manually configuring instances, managing SSH keys, setting up virtual networks, and handling DNS
                  configurations. This repetitive work drains resources and delays product launches.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Locust Protocol eliminates these pain points by automating the entire cloud infrastructure lifecycle
                  with AI-powered intelligence, reducing setup time from hours to minutes.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">How Locust Protocol Helps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Server className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Automated Instance Provisioning</h3>
                  <p className="text-slate-300">
                    Instantly deploy cloud instances across multiple providers with AI-optimized configurations. No
                    manual setup required.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Key className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">SSH Key Management</h3>
                  <p className="text-slate-300">
                    Secure, automated SSH key generation, distribution, and rotation. Access control made simple and
                    secure.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Network className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">VCN Configuration</h3>
                  <p className="text-slate-300">
                    Intelligent Virtual Cloud Network setup with optimal routing, subnets, and security groups
                    configured automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Cloud className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">DNS Automation</h3>
                  <p className="text-slate-300">
                    Smart DNS configuration and management. Automatic record creation, updates, and health monitoring.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Zap className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Lightning Fast Deployment</h3>
                  <p className="text-slate-300">
                    Go from zero to production in minutes. AI-powered orchestration handles complex workflows
                    automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-amber-500/30">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-3">Security First</h3>
                  <p className="text-slate-300">
                    Built-in security best practices, compliance monitoring, and automated vulnerability patching.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Use Cases</h2>
            <Card className="bg-slate-900/50 border-amber-500/30">
              <CardContent className="p-6">
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <div>
                      <strong className="text-amber-400">Startups:</strong> Launch your MVP infrastructure in minutes,
                      not weeks. Focus on building your product, not managing servers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <div>
                      <strong className="text-amber-400">Enterprises:</strong> Scale infrastructure across multiple
                      regions with consistent, compliant configurations.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <div>
                      <strong className="text-amber-400">DevOps Teams:</strong> Eliminate repetitive tasks and reduce
                      human error with AI-powered automation.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-1">•</span>
                    <div>
                      <strong className="text-amber-400">Agencies:</strong> Rapidly provision client infrastructure with
                      standardized, secure configurations.
                    </div>
                  </li>
                </ul>
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
