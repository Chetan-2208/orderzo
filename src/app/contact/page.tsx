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
        {/* Page intro */}
        <div className="text-center mb-12">
          <p className="text-orange-600 font-bold italic text-lg mb-3">"Aapka business, hamari priority."</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in touch</h1>
          <p className="text-xl text-gray-600">We're a small team. Every message gets read.</p>
        </div>

        {/* WhatsApp — primary CTA */}
        <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">💬 WhatsApp (fastest)</h3>
              <p className="text-gray-700">Message us directly. We reply within 4 hours during business hours.</p>
              <p className="text-sm text-gray-500 mt-1">+91 84660 89662</p>
            </div>
            <a 
              href="https://wa.me/918466089662?text=Hi%20Orderzo%2C%20I%27d%20like%20to%20know%20more" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp us
            </a>
          </div>
        </div>

        {/* Email options */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
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

        {/* LinkedIn */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">🔗 Connect with us on LinkedIn</h3>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://linkedin.com/company/orderzo" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Orderzo on LinkedIn
            </a>
            <a 
              href="https://linkedin.com/in/chetan-aitaraju" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-blue-300 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Chetan Aitaraju (Founder)
            </a>
          </div>
        </div>

        {/* Business hours */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-2">⏰ Business Hours</h3>
          <p className="text-gray-700">Monday – Saturday: 9:00 AM – 9:00 PM IST</p>
          <p className="text-gray-700">Sunday: 10:00 AM – 6:00 PM IST</p>
          <p className="text-sm text-gray-600 mt-3">WhatsApp messages and emails are typically answered within 4 hours during business hours.</p>
        </div>

        {/* Address */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-3">🏢 Registered Office</h3>
          <address className="not-italic text-gray-700 leading-relaxed">
            <strong className="text-gray-900">Orderzo Technologies</strong><br /><br />
            Laqsh Residency, Plot No. 101<br />
            Gopalakrishnan Puram, Road No. 3<br />
            Anand Nagar, Beside Go Colours<br />
            Nagole, Hyderabad – 500068<br />
            Telangana, India 🇮🇳
          </address>
        </div>

        {/* Specific help */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Need help with something specific?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-orange-500">→</span>
              <div>
                <p className="font-semibold text-gray-900">Account & billing issues</p>
                <p className="text-gray-600">Email <a href="mailto:support@orderzo.io" className="text-orange-500 hover:underline">support@orderzo.io</a> with your registered phone number, or WhatsApp us directly.</p>
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
