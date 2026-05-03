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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-xl text-gray-600">Start free. Upgrade when your shop grows.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Free */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Free</h3>
              <p className="text-sm text-gray-500 mb-4">For getting started</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">Rs. 0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Forever free</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Up to 5 transactions per day</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Digital order book</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>WhatsApp invoice sending</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>PDF invoices with QR code</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Customer history</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Basic stats dashboard</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span>—</span>
                <span>Razorpay payment links</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span>—</span>
                <span>Advanced reports</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Pro - Most Popular */}
          <div className="bg-orange-500 text-white rounded-3xl p-6 flex flex-col relative shadow-2xl shadow-orange-500/40 transform md:scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <p className="text-sm text-orange-100 mb-4">For serious shop owners</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Rs. 199</span>
                <span className="text-orange-200">/month</span>
              </div>
              <p className="text-xs text-orange-200 mt-1">Cancel anytime</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span><strong>Unlimited transactions</strong></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>Everything in Free, plus:</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>Razorpay payment links (UPI/Card/NetBanking)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>Auto-paid status via webhooks</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>Top customers & sales reports</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>Pending payment reminders</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>Priority email support (4hr response)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-white mt-0.5">✓</span>
                <span>CSV export for accountant</span>
              </li>
            </ul>

            <Link href="/login" className="block text-center bg-white text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">
              Start Pro Trial
            </Link>
          </div>

          {/* Business */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Business</h3>
              <p className="text-sm text-gray-500 mb-4">For growing teams</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">Rs. 499</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Cancel anytime</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Everything in Pro, plus:</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Multi-staff accounts (up to 5)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Custom branding on invoices</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Inventory tracking</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Daily WhatsApp business reports</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>API access</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Priority phone support</span>
              </li>
            </ul>

            <Link href="/contact" className="block text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing Questions</h2>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">Can I really start free?</summary>
              <p className="mt-2 text-sm text-gray-600">Yes! The Free Plan is forever free, no credit card required. You can do up to 5 transactions per day. Upgrade only when your business grows.</p>
            </details>

            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">What payment methods do you accept?</summary>
              <p className="mt-2 text-sm text-gray-600">We accept UPI, Credit Cards, Debit Cards, Net Banking, and major wallets via Razorpay.</p>
            </details>

            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">Can I cancel anytime?</summary>
              <p className="mt-2 text-sm text-gray-600">Yes. Cancel from Settings tab or email us. You'll continue to access paid features until the end of your billing cycle. See our <Link href="/refund" className="text-orange-600 underline">Refund Policy</Link> for details.</p>
            </details>

            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">Is there a free trial for Pro?</summary>
              <p className="mt-2 text-sm text-gray-600">The first 7 days of any paid plan are 100% refundable. Try Pro for a week, get a full refund if it's not for you.</p>
            </details>

            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">Are these prices including GST?</summary>
              <p className="mt-2 text-sm text-gray-600">All prices shown are inclusive of applicable Indian taxes (GST). What you see is what you pay.</p>
            </details>

            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">What happens to my data if I downgrade?</summary>
              <p className="mt-2 text-sm text-gray-600">All your data (orders, customers, items) is preserved. You'll just have access to fewer features. Upgrade anytime to restore full functionality.</p>
            </details>

            <details className="bg-white rounded-xl p-4 cursor-pointer">
              <summary className="font-semibold text-gray-900">Do you offer discounts for annual plans?</summary>
              <p className="mt-2 text-sm text-gray-600">Yes! Pay annually and get 2 months free. Email <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a> for annual pricing.</p>
            </details>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-orange-100 mb-6 text-lg">Join Indian shop owners ditching paper bill books.</p>
          <Link href="/login" className="inline-block bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors text-lg">
            Get Started Free →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
