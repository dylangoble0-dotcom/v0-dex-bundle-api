import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-amber-500 mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-amber max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              Locust Ecosystem ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your information when you visit our website or interact with
              our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">Information We Collect</h2>
            <p className="text-slate-300 leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Name and contact information when you submit an investor inquiry</li>
              <li>Payment information when you make a donation via Stripe</li>
              <li>Usage data and analytics about how you interact with our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Respond to your investor inquiries and communications</li>
              <li>Process donations and payments securely through Stripe</li>
              <li>Improve our website and services</li>
              <li>Send updates about our projects (only if you opt-in)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. Payment processing
              is handled securely by Stripe, and we never store your credit card information on our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">Third-Party Services</h2>
            <p className="text-slate-300 leading-relaxed">
              We use third-party services such as Stripe for payment processing. These services have their own privacy
              policies and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us through the investor inquiry form
              on our homepage.
            </p>
          </section>

          <p className="text-slate-400 text-sm mt-12">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
