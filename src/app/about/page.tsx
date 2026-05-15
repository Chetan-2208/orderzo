"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="lockup" size={36} /></Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <Link href="/login" className="bg-[#635BFF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4D44E0]">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        {/* Page intro */}
        <div className="text-center mb-12">
          <p className="text-[#4D44E0] font-bold italic text-lg mb-3">"Apna dukan, apne haath mein."</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Orderzo exists</h1>
          <p className="text-xl text-gray-600">We're building the phone-first billing platform for Indian micro-businesses.</p>
        </div>

        <div className="space-y-6 text-gray-700">
          {/* The Problem */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">The Problem</h2>
            <p className="mb-3">India has over 60 million micro-businesses. Most of them still run on paper notebooks and WhatsApp chats — outgrowing one but underserved by the other.</p>
            <p className="mb-3">Orders get forgotten. Payment reminders get lost in long chats. Customers say "I'll pay later" and never do. Paper bills tear, fade, and disappear. Every month ends in accounting pain that should take minutes.</p>
            <p className="font-semibold text-gray-900">Indian business owners deserve a tool built for how they actually work — not how someone in a glass office thinks they should.</p>
          </section>

          {/* Our Mission */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Our Mission</h2>
            <p className="mb-3">Help every Indian business owner generate beautiful invoices in 10 seconds, get paid via UPI, and never lose a transaction again.</p>
            <p>Whether you take orders on WhatsApp, serve walk-in customers at your counter, or do both — Orderzo adapts to you. One phone. One app. No computer, no thermal printer, no Tally.</p>
          </section>

          {/* What we do */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">What we do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generate beautiful PDF invoices in 10 seconds</li>
              <li>Send UPI payment links via WhatsApp in one tap</li>
              <li>Replace expensive computer billing software entirely</li>
              <li>Track every customer — who paid, who owes, who's a regular</li>
              <li>Adapt to your business mode: online orders, walk-in counter, or both</li>
              <li>Show your business performance — daily, weekly, monthly</li>
            </ul>
          </section>

          {/* The Founder */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">The Founder</h2>
            <div className="bg-gradient-to-br from-[#F4F3FF] to-white border border-[#DAD8FF] rounded-2xl p-6 my-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  C
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Chetan Aitaraju</h3>
                  <p className="text-sm text-gray-600">Founder · Data Engineer in NYC, building Orderzo from home</p>
                </div>
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">
                India's micro-businesses are the country's quiet engine. Most of them still run on paper notebooks and WhatsApp chats — outgrowing one but underserved by the other.
              </p>
              <p className="text-gray-700 mb-3 leading-relaxed">
                I noticed something while talking to over 100 of them: they had moved past the notebook. But the tools available felt heavy, complicated, built for someone else.
              </p>
              <p className="text-gray-700 mb-3 leading-relaxed">
                Most billing apps treat the business owner like an accountant. They aren't. A business owner needs to send a beautiful bill in 10 seconds, get paid via UPI, and move on with their day. Nothing more, nothing less.
              </p>
              <p className="text-gray-700 mb-3 leading-relaxed">
                So I started Orderzo in 2026 while working full-time as a Data Engineer in New York City. Phone-only. WhatsApp-native. ₹249 per month. Built for how Indian businesses actually work — not how someone in a glass office thinks they should work.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                Orderzo is built for the way Indian businesses actually work. One phone. One app. Every business owner deserves that.
              </p>

              <div className="flex flex-wrap gap-3 mt-5">
                <a 
                  href="https://wa.me/918466089662" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  WhatsApp me
                </a>
                <a 
                  href="https://linkedin.com/in/chetan-aitaraju" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </section>

          {/* Where we're built */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Where we're built</h2>
            <p className="mb-3">Orderzo is built from New York City and operated from Hyderabad, Telangana — bridging US-grade engineering with India-first design.</p>
            <p>All customer data is securely hosted in Mumbai (AWS Mumbai region), per RBI data residency guidelines. Made in India 🇮🇳, for India.</p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-[#F4F3FF]0 to-[#4D44E0] rounded-3xl p-8 text-white mt-12 text-center">
            <p className="font-bold italic text-lg text-[#EFEEFF] mb-2">"Apna dukan, apne haath mein."</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Throw away your billing computer.</h2>
            <p className="text-[#EFEEFF] mb-6">Start free. Send your first invoice in 2 minutes.</p>
            <Link href="/login" className="inline-block bg-white text-[#4D44E0] px-8 py-3 rounded-xl font-bold hover:bg-[#F4F3FF] transition-colors">Get Started Free</Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
