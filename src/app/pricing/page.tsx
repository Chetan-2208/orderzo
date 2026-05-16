"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="lockup" size={36} /></Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            <Link href="/login" className="bg-[#635BFF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4D44E0] transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — Big and bold */}
        <section className="px-4 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-[#EFEEFF] text-[#3530B8] px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
              Pricing · No surprises · Cancel anytime
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
              Start free.<br />
              <span className="text-[#635BFF]">Upgrade when you grow.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Two plans. Honest pricing. Built for Indian micro-businesses who hate hidden fees.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="px-4 sm:px-8 lg:px-12 pb-20 lg:pb-28">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* FREE card */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 lg:p-10 flex flex-col hover:border-gray-400 hover:shadow-xl transition-all">
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">For getting started</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Free</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-6xl font-extrabold text-gray-900">₹0</span>
                  <span className="text-gray-500 text-lg">/forever</span>
                </div>
                <p className="text-sm text-gray-500">No credit card · No trial limits</p>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-800"><strong className="text-gray-900">30 invoices</strong> per month</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-800">One business mode</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-800">Basic invoice with logo</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-800">WhatsApp invoice sharing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-800">Customer notes & tags</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-800">UPI payment links</span>
                </div>
                <div className="flex items-start gap-3 opacity-50">
                  <div className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-gray-400 text-xs">−</span>
                  </div>
                  <span className="text-gray-500 line-through">Unlimited history</span>
                </div>
              </div>

              <Link href="/login" className="block text-center bg-white text-gray-900 border-2 border-gray-300 py-3.5 rounded-xl font-bold text-base hover:border-gray-900 transition-colors">
                Start Free →
              </Link>
            </div>

            {/* PRO card — featured */}
            <div className="relative bg-gradient-to-br from-[#635BFF] to-[#4D44E0] text-white rounded-3xl p-8 lg:p-10 flex flex-col shadow-2xl shadow-[#635BFF]/40 transform md:scale-105">
              {/* Most popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#635BFF] text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                Most popular
              </div>
              
              <div className="mb-8 mt-2">
                <p className="text-sm font-semibold text-[#DAD8FF] uppercase tracking-wider mb-3">For serious businesses</p>
                <h3 className="text-3xl font-extrabold mb-4">Pro</h3>
                
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-6xl font-extrabold">₹2,499</span>
                  <span className="text-[#DAD8FF] text-lg">/year</span>
                </div>
                <div className="inline-block bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold mt-2 mb-1">
                  💰 Save ₹489 vs monthly
                </div>
                <p className="text-sm text-[#DAD8FF] mt-1">Or ₹249/month</p>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white"><strong>Unlimited invoices</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white"><strong>All 3 modes</strong> (online + offline + both)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white">Beautiful invoice + color picker</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white">Unlimited customer history</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white">Daily WhatsApp summary</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white">Smart reminders + festival messages</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white">Bluetooth thermal printer</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-white">Priority WhatsApp support</span>
                </div>
              </div>

              <Link href="/login" className="block text-center bg-white text-[#635BFF] py-3.5 rounded-xl font-bold text-base hover:bg-[#F4F3FF] transition-colors shadow-lg">
                Get Pro →
              </Link>
            </div>
          </div>
        </section>

        {/* Both plans include — Cleaner trust section */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">Both plans include</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                The fundamentals.<br />Without compromise.
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-bold text-gray-900 mb-1">WhatsApp-native</h3>
                <p className="text-xs text-gray-500">Where your customers live</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-bold text-gray-900 mb-1">Phone-first</h3>
                <p className="text-xs text-gray-500">No computer needed</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-3">🇮🇳</div>
                <h3 className="font-bold text-gray-900 mb-1">Made in India</h3>
                <p className="text-xs text-gray-500">For Indian businesses</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold text-gray-900 mb-1">Data in Mumbai</h3>
                <p className="text-xs text-gray-500">RBI-compliant hosting</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — bigger and bolder */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">FAQ</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                Common questions.
              </h2>
            </div>

            <div className="space-y-3">
              <details className="bg-gray-50 rounded-2xl px-6 py-5 group hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between text-lg">
                  Is the Free plan really free forever?
                  <span className="text-[#635BFF] group-open:rotate-180 transition-transform text-xl flex-shrink-0 ml-3">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  Yes. The Free plan stays free as long as you send 30 or fewer invoices per month. No credit card required. No automatic charges. Upgrade only when you grow.
                </p>
              </details>

              <details className="bg-gray-50 rounded-2xl px-6 py-5 group hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between text-lg">
                  Should I pay annually or monthly?
                  <span className="text-[#635BFF] group-open:rotate-180 transition-transform text-xl flex-shrink-0 ml-3">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  Annual (₹2,499/year) saves you ₹489 compared to monthly. Most Indian businesses prefer annual — one payment, one decision, no monthly worries. But monthly works too if you want flexibility.
                </p>
              </details>

              <details className="bg-gray-50 rounded-2xl px-6 py-5 group hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between text-lg">
                  Can I cancel anytime?
                  <span className="text-[#635BFF] group-open:rotate-180 transition-transform text-xl flex-shrink-0 ml-3">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  Yes. Cancel from your dashboard anytime, no questions asked. You keep access until your billing period ends. For annual plans, see our <Link href="/refund" className="text-[#635BFF] hover:underline font-semibold">Refund Policy</Link>.
                </p>
              </details>

              <details className="bg-gray-50 rounded-2xl px-6 py-5 group hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between text-lg">
                  Do I need a credit card to start?
                  <span className="text-[#635BFF] group-open:rotate-180 transition-transform text-xl flex-shrink-0 ml-3">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  No. Start the Free plan with just your phone number. UPI, debit card, or net banking work when you upgrade to Pro.
                </p>
              </details>

              <details className="bg-gray-50 rounded-2xl px-6 py-5 group hover:bg-gray-100 transition-colors">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between text-lg">
                  Have a question before signing up?
                  <span className="text-[#635BFF] group-open:rotate-180 transition-transform text-xl flex-shrink-0 ml-3">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  WhatsApp us at <strong>+91 84660 89662</strong> or email <a href="mailto:info@orderzo.io" className="text-[#635BFF] hover:underline font-semibold">info@orderzo.io</a>. We are a small team. Every message gets read.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA — matching homepage */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-br from-[#635BFF] to-[#3530B8] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Ready when you are.
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
              Start free in 2 minutes. No credit card.
            </p>
            
            <Link 
              href="/login" 
              className="inline-block bg-white text-[#3530B8] px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-[#F4F3FF] shadow-2xl transition-all"
            >
              Start Free →
            </Link>
            
            <p className="text-sm sm:text-base text-white/70 mt-6">
              30 invoices/month free · No credit card · Setup in 2 minutes
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}