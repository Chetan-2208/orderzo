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

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🎁 7 days free trial · No credit card required
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-gray-600">
            Try Orderzo free for 7 days. Pick your plan after.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Pro */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 flex flex-col hover:border-gray-300 transition-all">
            <div className="mb-6">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
              <p className="text-sm text-gray-500 mb-4">For solo small businesses</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">Rs. 249</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">7 days free, cancel anytime</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Unlimited customers</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span><strong>Unlimited orders</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>WhatsApp invoices with branded PDFs</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Customer database + history</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Channel tagging (WhatsApp, Swiggy, etc.)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Recurring monthly bills</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Customer profile pages</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Razorpay UPI payments</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Start 7-day free trial
            </Link>
          </div>

          {/* Business - Most Popular */}
          <div className="bg-orange-500 text-white rounded-3xl p-6 flex flex-col relative shadow-2xl shadow-orange-500/40 transform md:scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="text-xl font-bold mb-1">Business</h3>
              <p className="text-sm text-orange-100 mb-4">For growing businesses</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Rs. 449</span>
                <span className="text-orange-200">/month</span>
              </div>
              <p className="text-xs text-orange-200 mt-1">7 days free, cancel anytime</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span><strong>Everything in Pro, plus:</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Multi-staff (up to 3 users)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Bulk WhatsApp messaging</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Customer segments (VIP, Regulars, Lost)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Daily WhatsApp summary</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>GST monthly reports</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>White-label (no Orderzo branding)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-white mt-0.5">✓</span>
                <span>Custom subdomain (yourname.orderzo.io)</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-white text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
              Start 7-day free trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-gray-900 text-white rounded-3xl p-6 flex flex-col">
            <div className="mb-6">
              <div className="text-3xl mb-2">🏢</div>
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <p className="text-sm text-gray-400 mb-4">For multi-brand cloud kitchens</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Rs. 979</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">7 days free, cancel anytime</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span><strong>Everything in Business, plus:</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Multi-brand support (3+ brands)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Unlimited staff users</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Advanced analytics dashboard</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>API access</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Priority support (24-hour response)</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
              Start 7-day free trial
            </Link>
          </div>
        </div>

        {/* Trust signals */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            All plans include
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">🎁</div>
              <div className="font-semibold text-sm">7-day free trial</div>
              <div className="text-xs text-gray-500">No card required</div>
            </div>
            <div>
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold text-sm">WhatsApp-native</div>
              <div className="text-xs text-gray-500">Where customers are</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🇮🇳</div>
              <div className="font-semibold text-sm">Made in India</div>
              <div className="text-xs text-gray-500">For Indian businesses</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold text-sm">Mobile-first</div>
              <div className="text-xs text-gray-500">Built for phones</div>
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
                What happens after 7 days?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                Your trial ends and you can pick any plan to continue. No automatic charges. We'll send you a friendly reminder before the trial ends.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I cancel anytime?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                Yes, cancel anytime from your dashboard. No questions asked. You'll keep access until your billing period ends.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Do I need a credit card to start?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                No. Start your 7-day free trial with just your phone number. We'll only ask for payment when you choose to continue.
              </p>
            </details>
            <details className="bg-white border border-gray-200 rounded-2xl p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Which plan is right for me?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                <strong>Pro</strong> works for most small businesses (cafes, tiffin services, home bakers, salons). <strong>Business</strong> is for growing teams that need multi-staff access and advanced features. <strong>Enterprise</strong> is built for cloud kitchens running multiple brands.
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 mb-8">
          <Link href="/login" className="inline-block bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
            Start your 7-day free trial →
          </Link>
          <p className="text-sm text-gray-500 mt-3">No credit card · Cancel anytime · Made in India</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
