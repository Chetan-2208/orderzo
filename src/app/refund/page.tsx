"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="lockup" size={36} /></Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</Link>
            <Link href="/login" className="bg-[#635BFF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4D44E0] transition-colors">Sign In</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#EFEEFF] text-[#3530B8] px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
              Legal · Refund & Cancellation Policy
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
              Refund & Cancellation Policy
            </h1>
            <p className="text-base text-gray-500">Last updated: 18 May 2026 · Effective from: 18 May 2026</p>
          </div>
        </section>

        {/* Legal content */}
        <section className="px-4 sm:px-8 lg:px-12 pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3 text-gray-700 leading-relaxed text-base">
              {/* In simple words callout — upgraded */}
              <div className="bg-gradient-to-br from-[#F4F3FF] to-[#EFEEFF] border-2 border-[#DAD8FF] rounded-2xl p-6 sm:p-7 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#635BFF] text-white rounded-xl flex items-center justify-center text-xl">💡</div>
                  <p className="text-base text-gray-800 leading-relaxed flex-1">
<strong>In simple words:</strong> You can cancel your subscription anytime. Refunds are processed within 5-7 business days. Free plan has no fees, so no refunds apply.
                  </p>
                </div>
              </div>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">1. Free Plan</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>Our Free Plan has no charges. There is nothing to refund.</p>
            <p className="mt-2">You can stop using the service at any time without notice.</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">2. Pro Plan (Rs. 249/month or Rs. 2,499/year)</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>If you are not satisfied with the Pro Plan, you can request a refund within 7 days of payment. Refund eligibility:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Within first 7 days: full refund, no questions asked</li>
              <li>After 7 days: pro-rated refund for unused days in current billing cycle</li>
              <li>Refund is processed to the original payment method</li>
            </ul>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">3. How to request a refund</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>Email us at <a href="mailto:support@orderzo.io" className="text-[#4D44E0] underline">support@orderzo.io</a> with:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Subject line: "Refund Request"</li>
              <li>Your registered phone number</li>
              <li>Business name</li>
              <li>Reason for refund (helps us improve)</li>
              <li>Date of payment</li>
            </ul>
            <p className="mt-3">We will respond within 24 hours and process eligible refunds within 5-7 business days.</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">4. Cancellation</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>You can cancel your subscription at any time:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>From the Settings tab in your account</li>
              <li>Or by emailing <a href="mailto:support@orderzo.io" className="text-[#4D44E0] underline">support@orderzo.io</a></li>
            </ul>
            <p className="mt-3">After cancellation, you can continue using paid features until the end of your current billing cycle. Your account will revert to the Free Plan after that.</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">5. Refund processing time</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Credit/Debit Card:</strong> 5-7 business days</li>
              <li><strong>UPI:</strong> 3-5 business days</li>
              <li><strong>Net Banking:</strong> 5-7 business days</li>
              <li><strong>Wallet:</strong> 24-48 hours</li>
            </ul>
            <p className="mt-3 text-sm">Note: Processing time depends on your bank/payment provider. Some banks may take longer to reflect the refund in your account.</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">6. Non-refundable cases</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>Refunds will not be processed in the following cases:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Account terminated for violation of <Link href="/terms" className="text-[#4D44E0] underline">Terms of Service</Link></li>
              <li>Misuse of the service or fraudulent activity</li>
              <li>Free plan usage (nothing was charged)</li>
              <li>Abuse of refund policy (e.g. heavy service usage immediately followed by refund request, repeated sign-up + refund cycles)</li>
            </ul>
            <p className="mt-3 text-sm"><strong>Note on pro-rated refunds:</strong> After the first 7 days, you can still cancel anytime and receive a pro-rated refund for unused days in your current billing cycle (as described in Section 2).</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">7. Failed payments</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>If your auto-renewal fails:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>We will retry payment 3 times over 7 days</li>
              <li>Email reminders will be sent before downgrading</li>
              <li>After 7 days of failed retries, account will be downgraded to Free Plan</li>
              <li>Your data is retained for 90 days; resume Pro by paying within that window</li>
            </ul>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">8. Disputes and chargebacks</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>If you have a dispute about a charge or refund, contact us first at <a href="mailto:support@orderzo.io" className="text-[#4D44E0] underline">support@orderzo.io</a>. We aim to acknowledge within 24 hours and resolve all disputes within 15 days.</p>
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-1">⚠️ Chargebacks</p>
              <p>If you initiate a chargeback with your bank or card issuer without first contacting us, we reserve the right to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1.5">
                <li>Suspend your account pending investigation</li>
                <li>Provide evidence of service delivery to the payment processor</li>
                <li>Recover the chargeback fee (typically Rs. 500-Rs. 1,500) if the dispute is found in our favour</li>
              </ul>
              <p className="mt-2">Please contact us first — we resolve almost all refund requests within 5-7 business days.</p>
            </div>
            <p className="mt-3">For unresolved disputes, contact our Grievance Officer: <a href="mailto:chetan@orderzo.io" className="text-[#4D44E0] underline">chetan@orderzo.io</a>. See full grievance redressal process in our <Link href="/terms" className="text-[#4D44E0] underline">Terms of Service, Section 16</Link>.</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">9. Changes to this policy</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <p>We may update this Refund Policy from time to time. Changes will not affect refund requests made before the change. Material changes will be communicated via email 30 days in advance.</p>
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">10. Contact</h2>
              <span className="flex-shrink-0 w-8 h-8 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-4 text-sm">
              <p><strong>Orderzo Technologies Private Limited</strong></p>
              <p>Laqsh Residency, Plot No. 101, Gopalakrishnan Puram, Road No. 3, Anand Nagar, Beside Go Colours, Nagole, Hyderabad - 500068, Telangana, India</p>
              <p className="mt-2">Refund inquiries: <a href="mailto:support@orderzo.io" className="text-[#4D44E0] underline">support@orderzo.io</a></p>
              <p>Grievance Officer: <a href="mailto:chetan@orderzo.io" className="text-[#4D44E0] underline">chetan@orderzo.io</a></p>
              <p>Response within 24 hours during business hours (Mon-Sat, 9 AM - 9 PM IST)</p>
            </div>
            </div>
          </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
