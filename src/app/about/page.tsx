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
            <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Orderzo exists</h1>
          <p className="text-xl text-gray-600">We're building the digital order book for every Indian dukan.</p>
        </div>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">The Problem</h2>
            <p className="mb-3">India has over 50 million small businesses. Tiffin services, retail shops, salons, tutors, home bakeries — they all run on paper bill books and WhatsApp messages.</p>
            <p className="mb-3">Forgotten orders. Lost payment reminders. Hours of monthly accounting pain. Customers who say "I'll pay later" and never do. Paper bills that get torn or lost.</p>
            <p className="font-semibold text-gray-900">The shop owner deserves better.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Our Mission</h2>
            <p className="mb-3">Help every shop owner in India get paid faster, never lose money, and look professional — without changing how they already work.</p>
            <p>You take orders on WhatsApp. You serve walk-in customers at your counter. That's not changing. We just make sure every transaction is captured, every customer is remembered, every payment is tracked, and every receipt looks beautiful.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">What we do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generate digital bills in 30 seconds</li>
              <li>Send UPI / Card / Net Banking payment links via WhatsApp</li>
              <li>Create branded PDF invoices automatically</li>
              <li>Track who paid, who owes, who's a regular</li>
              <li>Show your business performance — daily, weekly, monthly</li>
              <li>Replace your paper bill book entirely</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">The Founder</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 my-4">
              <h3 className="font-bold text-gray-900 mb-1">Chetan Aitaraju</h3>
              <p className="text-sm text-gray-600 mb-4">Founder & CEO · Based in New York City</p>
              <p className="text-gray-700 mb-3">Chetan moved from India to the United States in December 2021 to pursue his master's degree. Today, he works as a Data Engineer in NYC while building Orderzo on the side.</p>
              <p className="text-gray-700 mb-3">Tech startups have always been his passion. He's spent years studying how product gaps in emerging markets become real businesses — especially in India, where 50 million shops still run on paper bill books.</p>
              <p className="text-gray-700">Across friends and small businesses he saw back home, the same broken loop kept playing out: orders on WhatsApp, payments on paper, customers chased manually for what they owed. So in 2026, while still working full-time as a Data Engineer, he started Orderzo to solve it.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Where we're built</h2>
            <p className="mb-3">Orderzo is built in New York City and operated from Hyderabad, Telangana — bridging US-grade engineering with India-first design. All customer data is securely hosted in Mumbai (AWS Mumbai region), per RBI data residency guidelines.</p>
            <p>We are a registered Indian company (registration in progress) and proudly Made for India.</p>
          </section>

          <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white mt-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Order. Bill. Done.</h2>
            <p className="text-orange-100 mb-6">Replace your paper bill book today. Free to start.</p>
            <Link href="/login" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">Get Started Free</Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
