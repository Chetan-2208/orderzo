"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo variant="lockup" size={36} />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in touch</h1>
          <p className="text-xl text-gray-600">We're here to help. Real humans, fast replies.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* General */}
          <a href="mailto:info@orderzo.io" className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-500 transition-all">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-bold text-gray-900 mb-1">General Inquiries</h3>
            <p className="text-orange-500 font-semibold mb-2">info@orderzo.io</p>
            <p className="text-sm text-gray-600">Sales, partnerships, press, general questions</p>
          </a>

          {/* Support */}
          <a href="mailto:support@orderzo.io" className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-500 transition-all">
            <div className="text-3xl mb-3">🙏</div>
            <h3 className="font-bold text-gray-900 mb-1">Customer Support</h3>
            <p className="text-orange-500 font-semibold mb-2">support@orderzo.io</p>
            <p className="text-sm text-gray-600">Issues with your account, billing, technical help</p>
          </a>
        </div>

        {/* Business hours */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-2">⏰ Business Hours</h3>
          <p className="text-gray-700">Monday - Saturday: 9:00 AM - 9:00 PM IST</p>
          <p className="text-gray-700">Sunday: 10:00 AM - 6:00 PM IST</p>
          <p className="text-sm text-gray-600 mt-3">We typically respond to all emails within 4 hours during business hours.</p>
        </div>

        {/* Address */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-3">🏢 Registered Office</h3>
          <address className="not-italic text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Orderzo Technologies Pvt Ltd</strong><br />
            <span className="text-sm text-gray-500">(Registration in progress)</span><br /><br />
            Laqsh Residency, Plot No. 101<br />
            Gopalakrishnan Puram, Road No. 3<br />
            Anand Nagar, Beside Go Colours<br />
            Nagole, Hyderabad - 500068<br />
            Telangana, India
          </address>
        </div>

        {/* For specific issues */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Need help with something specific?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-orange-500">→</span>
              <div>
                <p className="font-semibold text-gray-900">Account & billing issues</p>
                <p className="text-gray-600">Email <a href="mailto:support@orderzo.io" className="text-orange-500 hover:underline">support@orderzo.io</a> with your registered phone number</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">→</span>
              <div>
                <p className="font-semibold text-gray-900">Privacy & data requests</p>
                <p className="text-gray-600">Email <a href="mailto:info@orderzo.io" className="text-orange-500 hover:underline">info@orderzo.io</a> with subject "DPDPA Request"</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">→</span>
              <div>
                <p className="font-semibold text-gray-900">Refunds & cancellations</p>
                <p className="text-gray-600">See our <Link href="/refund" className="text-orange-500 hover:underline">Refund Policy</Link>, or email <a href="mailto:support@orderzo.io" className="text-orange-500 hover:underline">support@orderzo.io</a></p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">→</span>
              <div>
                <p className="font-semibold text-gray-900">Press & media</p>
                <p className="text-gray-600">Email <a href="mailto:info@orderzo.io" className="text-orange-500 hover:underline">info@orderzo.io</a> with subject "Press"</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
