"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="lockup" size={36} /></Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-orange-600 font-bold italic text-lg mb-3">"Apna dukan, apne haath mein."</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, honest pricing.
          </h1>
          <p className="text-xl text-gray-600">
            Start free. Upgrade when you grow.
          </p>
        </div>

        {/* Pricing Cards — 2 tiers */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          
          {/* FREE */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 flex flex-col hover:border-gray-300 transition-all">
            <div className="mb-6">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Free</h3>
              <p className="text-sm text-gray-500 mb-4">For getting started</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">No credit card. No trial limits.</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>30 invoices per month</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>One business mode (online OR offline)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Basic invoice template with logo</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>WhatsApp invoice sharing</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Customer notes & tags</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>UPI payment links</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-gray-300 mt-0.5">○</span>
                <span>7-day order history</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Start Free
            </Link>
          </div>

          {/* PRO — Most Popular */}
          <div className="bg-orange-500 text-white rounded-3xl p-8 flex flex-col relative shadow-2xl shadow-orange-500/40 transform md:scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="text-2xl font-bold mb-1">Pro</h3>
              <p className="text-sm text-orange-100 mb-4">For serious businesses</p>
              
              {/* Annual price (primary) */}
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold">₹2,499</span>
                <span className="text-orange-200">/year</span>
              </div>
              <p className="text-sm text-orange-100 mt-1 font-semibold">Save ₹489 vs monthly</p>
              <p className="text-xs text-orange-200 mt-2">Or ₹249/month</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span><strong>Unlimited invoices</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span><strong>All 3 modes</strong> (online + offline + both)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Beautiful invoice template + accent color picker</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Unlimited customer history</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Daily WhatsApp summary</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Smart reminders & festival messages</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Bluetooth thermal printer support</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Priority WhatsApp support</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-white text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
              Get Pro →
            </Link>
          </div>
        </div>

        {/* What replaces */}
        <div className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            ₹249/month replaces:
          </h2>
          <p className="text-center text-gray-600 mb-8">Everything you'd spend on old billing tools.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🖥️</div>
              <div className="font-semibold text-gray-900 mb-1">Desktop PC + Tally</div>
              <div className="text-sm text-gray-500">₹25,000 hardware + ₹18,000/year</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🖨️</div>
              <div className="font-semibold text-gray-900 mb-1">Thermal printer + paper</div>
              <div className="text-sm text-gray-500">₹3,000 + ongoing roll costs</div>
            </div>
            <div className="bg-white rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">📔</div>
              <div className="font-semibold text-gray-900 mb-1">Paper bill books</div>
              <div className="text-sm text-gray-500">Lost, torn, faded — every month</div>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Both plans include
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold text-sm">WhatsApp-native</div>
              <div className="text-xs text-gray-500">Where customers are</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold text-sm">Phone-first</div>
              <div className="text-xs text-gray-500">No computer needed</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🇮🇳</div>
              <div className="font-semibold text-sm">Made in India</div>
              <div className="text-xs text-gray-500">For Indian businesses</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold text-sm">Data in Mumbai</div>
              <div className="text-xs text-gray-500">RBI-compliant hosting</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is the Free plan really free forever?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                Yes. The Free plan stays free as long as you send 30 or fewer invoices per month. No credit card required. No automatic charges. Upgrade only when you grow.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Should I pay annually or monthly?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                Annual (₹2,499/year) saves you ₹489 compared to monthly (₹249 × 12 = ₹2,988). Most Indian businesses prefer annual — one payment, one decision, no monthly worries. But monthly works too if you want flexibility.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I cancel anytime?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                Yes. Cancel from your dashboard anytime, no questions asked. You keep access until your billing period ends. For annual plans, see our <Link href="/refund" className="text-orange-500 hover:underline">Refund Policy</Link>.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do I need a credit card to start?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                No. Start the Free plan with just your phone number. UPI, debit card, or net banking work when you upgrade to Pro.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What if I have a question before signing up?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                WhatsApp us at <strong>+91 84660 89662</strong> or email <a href="mailto:info@orderzo.io" className="text-orange-500 hover:underline">info@orderzo.io</a>. We're a small team — every message gets read.
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 mb-8">
          <p className="text-orange-600 font-bold italic text-lg mb-3">"Apna dukan, apne haath mein."</p>
          <Link href="/login" className="inline-block bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
            Start Free →
          </Link>
          <p className="text-sm text-gray-500 mt-3">No credit card · 30 invoices/month free · Made in India 🇮🇳</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
