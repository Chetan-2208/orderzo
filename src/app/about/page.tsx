"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="lockup" size={36} /></Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            <Link href="/login" className="bg-[#635BFF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4D44E0] transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero — editorial style */}
        <section className="px-4 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#EFEEFF] text-[#3530B8] px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
              The story behind Orderzo
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
              Built by one founder.<br />
              <span className="text-[#635BFF]">In NYC. For India.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Phone-first billing for 60 million Indian micro-businesses. No computer. No Tally. No nonsense.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">The problem</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              Indian micro-businesses are <span className="text-[#635BFF]">stuck.</span>
            </h2>
            
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                India has over <strong className="text-gray-900">60 million micro-businesses</strong>. Most of them still run on paper notebooks and WhatsApp chats — outgrowing one but underserved by the other.
              </p>
              <p>
                Orders get forgotten. Payment reminders get lost in long chats. Customers say "I'll pay later" and never do. Paper bills tear, fade, and disappear. Every month ends in accounting pain that should take minutes.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Indian business owners deserve a tool built for how they actually work — not how someone in a glass office thinks they should.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">Our mission</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              Help every Indian business owner<br />
              <span className="text-[#635BFF]">bill in 10 seconds.</span>
            </h2>
            
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                Whether you take orders on WhatsApp, serve walk-in customers at your counter, or do both — Orderzo adapts to you.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                One phone. One app. No computer, no thermal printer, no Tally.
              </p>
            </div>
          </div>
        </section>

        {/* What we do — visual list */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">What we do</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                Built for one job.<br />Done well.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">⚡</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Bill in 10 seconds</h3>
                    <p className="text-sm text-gray-600">Beautiful PDF invoices in seconds. Tap 4 fields. Done.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💬</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Pay via WhatsApp</h3>
                    <p className="text-sm text-gray-600">UPI links sent in WhatsApp. Customer pays in one tap.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📱</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Replace your computer</h3>
                    <p className="text-sm text-gray-600">No more ₹25,000 PC + ₹18,000/year Tally + thermal printer.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">👥</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Track every customer</h3>
                    <p className="text-sm text-gray-600">Who paid, who owes, who is a regular. All saved.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🔄</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Adapt to your business</h3>
                    <p className="text-sm text-gray-600">Online orders, walk-in counter, or both — your choice.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📊</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">See your performance</h3>
                    <p className="text-sm text-gray-600">Daily earnings. Weekly trends. Monthly summary.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Founder — redesigned with visual richness */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">The founder</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                A note from Chetan.
              </h2>
            </div>

            {/* Founder card with stronger visual design */}
            <div className="relative bg-gradient-to-br from-[#F4F3FF] via-white to-[#EFEEFF] rounded-3xl p-8 sm:p-12 border-2 border-[#DAD8FF] shadow-2xl overflow-hidden">
              
              {/* Decorative pattern overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#635BFF]/10 to-transparent rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full blur-3xl translate-y-20 -translate-x-20"></div>
              
              {/* Decorative quote mark in background */}
              <div className="absolute top-4 right-8 text-9xl font-serif text-[#635BFF]/10 leading-none select-none">"</div>

              {/* Content wrapper - relative to stack above decorations */}
              <div className="relative">
                
                {/* Header: avatar + name */}
                <div className="flex items-center gap-5 mb-10">
                  {/* Avatar with glowing ring */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF] to-purple-400 rounded-2xl blur-md opacity-50"></div>
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#635BFF] to-[#3530B8] text-white rounded-2xl flex items-center justify-center font-extrabold text-3xl sm:text-4xl shadow-xl ring-4 ring-white">
                      C
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-extrabold text-2xl sm:text-3xl text-gray-900">Chetan Aitaraju</p>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Founder · Data Engineer in NYC</p>
                    <p className="text-xs sm:text-sm text-gray-500">Building Orderzo from home</p>
                    {/* Accent line */}
                    <div className="mt-3 w-16 h-1 bg-gradient-to-r from-[#635BFF] to-purple-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Story with paragraph breaks */}
                <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>
                    India's micro-businesses are the country's <strong className="text-gray-900">quiet engine</strong>. Most of them still run on paper notebooks and WhatsApp chats — outgrowing one but underserved by the other.
                  </p>
                  
                  {/* Visual divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DAD8FF] to-transparent"></div>
                    <div className="w-2 h-2 bg-[#635BFF] rounded-full"></div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#DAD8FF] to-transparent"></div>
                  </div>
                  
                  <p>
                    I noticed something while talking to <strong className="text-gray-900">over 100 of them</strong>: they had moved past the notebook. But the tools available felt heavy, complicated, built for someone else.
                  </p>
                  
                  {/* Pull quote — elevated paragraph */}
                  <div className="my-8 pl-6 border-l-4 border-[#635BFF]">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                      Most billing apps treat the business owner like an accountant. They aren't.
                    </p>
                    <p className="text-base text-gray-600 mt-3 leading-relaxed">
                      A business owner needs to send a beautiful bill in 10 seconds, get paid via UPI, and move on with their day. <span className="font-bold text-gray-900">Nothing more, nothing less.</span>
                    </p>
                  </div>
                  
                  <p>
                    So I started Orderzo in 2026 while working full-time as a Data Engineer in New York City. <strong className="text-gray-900">Phone-only. WhatsApp-native. ₹249 per month.</strong> Built for how Indian businesses actually work — not how someone in a glass office thinks they should work.
                  </p>
                  
                  {/* Final statement with emphasis */}
                  <div className="mt-8 p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#DAD8FF]">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                      Orderzo is built for the way Indian businesses actually work. One phone. One app. <span className="text-[#635BFF]">Every business owner deserves that.</span>
                    </p>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="flex flex-wrap gap-3 mt-10">
                  <a 
                    href="https://wa.me/918466089662" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-md"
                  >
                    <span className="text-base">💬</span> WhatsApp me
                  </a>
                  <a 
                    href="https://linkedin.com/in/chetan-aitaraju" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-md"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Where we are built */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">Where we are built</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              NYC engineering.<br />
              <span className="text-[#635BFF]">India-first design.</span>
            </h2>
            
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              <p>
                Orderzo is built from New York City and operated from Hyderabad, Telangana — bridging US-grade engineering with India-first design.
              </p>
              <p>
                All customer data is securely hosted in Mumbai (AWS Mumbai region), per RBI data residency guidelines.
              </p>
              <p className="text-xl font-bold text-gray-900">
                Made in India 🇮🇳 · For India.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA — matches homepage and pricing */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-br from-[#635BFF] to-[#3530B8] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Throw away your<br />billing computer.
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
              Start free. Send your first invoice in 2 minutes.
            </p>
            
            <Link 
              href="/login" 
              className="inline-block bg-white text-[#3530B8] px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-[#F4F3FF] shadow-2xl transition-all"
            >
              Get Started Free →
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