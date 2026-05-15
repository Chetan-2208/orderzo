"use client";

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SupportPage() {
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [issueText, setIssueText] = useState('')
  const [issueSent, setIssueSent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)

    supabase
      .from('businesses')
      .select('business_name')
      .eq('owner_phone', savedPhone)
      .single()
      .then(({ data }) => {
        if (data) setBusinessName(data.business_name)
      })
  }, [router])

  const handleEmailSupport = () => {
    const subject = `Support request from ${businessName || 'Orderzo user'}`
    const body = `Hi Orderzo team,\n\nMy phone: +91 ${phone}\nBusiness: ${businessName || 'Not set'}\n\nIssue:\n[describe your issue here]\n\nThanks!`
    window.location.href = `mailto:support@orderzo.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleReportIssue = () => {
    if (!issueText.trim()) {
      alert('Please describe your issue')
      return
    }
    const subject = `Issue report: ${businessName || 'Orderzo user'}`
    const body = `From: +91 ${phone}\nBusiness: ${businessName || 'Not set'}\n\nIssue:\n${issueText}\n\nReported via in-app form.`
    window.location.href = `mailto:support@orderzo.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setIssueSent(true)
    setTimeout(() => { setIssueSent(false); setIssueText('') }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Help & Support</h1>
            <p className="text-xs text-gray-500">We're here to help</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/30">
          <div className="text-4xl mb-2">🙏</div>
          <h2 className="text-xl font-bold mb-1">How can we help, {businessName ? businessName.split(' ')[0] : 'Founder'}?</h2>
          <p className="text-orange-100 text-sm">We typically reply within 4 hours during business hours (9 AM - 9 PM IST)</p>
        </div>

        
        <a
          href="https://wa.me/918466089662?text=Hi%20Orderzo%2C%20I%20need%20help"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white rounded-2xl p-5 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">💬</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">WhatsApp Support (fastest)</h3>
              <p className="text-sm text-gray-500">+91 84660 89662</p>
              <p className="text-xs text-gray-400 mt-1">Reply within 4 hours</p>
            </div>
            <span className="text-green-600 text-2xl">→</span>
          </div>
        </a>

        <button
          onClick={handleEmailSupport}
          className="w-full bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📧</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
              <p className="text-sm text-gray-500">support@orderzo.io</p>
              <p className="text-xs text-gray-400 mt-1">Reply within 4 hours</p>
            </div>
            <span className="text-orange-500 text-2xl">→</span>
          </div>
        </button>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-xl">🐛</div>
            <div>
              <h3 className="font-semibold text-gray-900">Report a Problem</h3>
              <p className="text-xs text-gray-500">Tell us what went wrong</p>
            </div>
          </div>
          <textarea
            placeholder="Describe the issue — what happened, what you expected, any error messages..."
            value={issueText}
            onChange={(e) => setIssueText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 mb-3 resize-none"
          />
          <button
            onClick={handleReportIssue}
            disabled={!issueText.trim() || issueSent}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {issueSent ? 'Email opened' : 'Send Issue Report'}
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Common Questions</h3>
          <div className="space-y-3">
            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">How do I add menu items?</summary>
              <p className="text-sm text-gray-600 mt-2">
                Go to Settings tab → Menu / Items → Add new item. Add the name and price. Items appear when creating new orders or bills.
              </p>
            </details>

            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">How does payment work?</summary>
              <p className="text-sm text-gray-600 mt-2">
                When you create a bill with UPI mode, customer gets a Razorpay payment link via WhatsApp. They pay using UPI, card, or net banking. Order auto-marks as PAID once received.
              </p>
            </details>

            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">Can I edit or delete an order?</summary>
              <p className="text-sm text-gray-600 mt-2">
                Yes. Go to Settings → All Orders. Each order has options to mark as paid, send reminder, or delete.
              </p>
            </details>

            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">How do I send a customer their bill?</summary>
              <p className="text-sm text-gray-600 mt-2">
                When creating an order/bill, add the customer's WhatsApp number. After tapping Send, WhatsApp opens with a pre-filled message including bill details, payment link, and PDF invoice. Tap Send to share.
              </p>
            </details>

            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">Where is my data stored?</summary>
              <p className="text-sm text-gray-600 mt-2">
                Your business data is securely stored in Mumbai (Supabase). It's encrypted in transit and at rest. We follow Indian data residency rules.
              </p>
            </details>

            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">What if I forget my phone or change it?</summary>
              <p className="text-sm text-gray-600 mt-2">
                Email us at support@orderzo.io with your old + new number, and your business name. We'll migrate your account within 24 hours.
              </p>
            </details>

            <details className="bg-gray-50 rounded-xl p-3 cursor-pointer">
              <summary className="font-medium text-gray-900 text-sm">How much does Orderzo cost?</summary>
              <p className="text-sm text-gray-600 mt-2">
                Two simple plans. <strong>Free:</strong> 30 invoices/month, one business mode, basic template. <strong>Pro:</strong> ₹2,499/year (save ₹489) or ₹249/month — unlimited invoices, all 3 modes, full template, daily WhatsApp summary, priority support.
              </p>
            </details>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          <p>Orderzo · Order. Bill. Done.</p>
          <p className="mt-1">Made for India 🇮🇳</p>
        </div>
      </main>
    </div>
  )
}
