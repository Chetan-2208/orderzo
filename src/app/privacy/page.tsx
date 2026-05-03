"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
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

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: 3 May 2026 · Effective from: 3 May 2026</p>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm">
              <strong>In simple words:</strong> We collect only what we need to run your shop's order book. We don't sell your data. We follow Indian data protection law (DPDP Act 2023). You can ask us to delete everything anytime by emailing <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Who we are</h2>
            <p>This Privacy Policy applies to services provided by <strong>Orderzo Technologies Pvt Ltd</strong> ("Orderzo", "we", "us", "our") — a company registered in India (registration in progress), with its registered office at:</p>
            <address className="not-italic mt-2 bg-gray-50 p-3 rounded-lg text-sm">
              Laqsh Residency, Plot No. 101<br />
              Gopalakrishnan Puram, Road No. 3<br />
              Anand Nagar, Beside Go Colours<br />
              Nagole, Hyderabad - 500068<br />
              Telangana, India
            </address>
            <p className="mt-3">For privacy concerns or data requests, contact us at <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a> with subject "DPDPA Request".</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Information we collect</h2>
            <p className="mb-3">We collect the following categories of personal data:</p>
            
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">From shop owners (our customers):</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Mobile phone number (used as unique identifier)</li>
              <li>Business name, business type, business address (if provided)</li>
              <li>UPI ID (for receiving payments from your customers)</li>
              <li>Items / menu / pricing you create in the app</li>
              <li>Order and transaction records you create</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mt-4 mb-2">From shop owners' customers (data you enter):</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Customer name and phone number (entered by shop owner)</li>
              <li>Order history and payment records</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mt-4 mb-2">Automatic collection:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>IP address, browser type, device information</li>
              <li>Pages visited, features used, timestamps</li>
              <li>Crash logs and error reports (no personal content)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. How we use your information</h2>
            <p className="mb-2">We use your data only for:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Operating Orderzo — your account, orders, bills, payments, invoices</li>
              <li>Sending OTPs for login (via Twilio)</li>
              <li>Generating and storing PDF invoices</li>
              <li>Creating payment links (via Razorpay) when you use UPI mode</li>
              <li>Customer support requests you send us</li>
              <li>Improving the product (anonymized analytics)</li>
              <li>Legal compliance (tax records, audit trails)</li>
            </ul>
            <p className="mt-3"><strong>We do NOT:</strong> sell your data to third parties, share it for advertising, or use it for purposes other than running Orderzo.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Lawful basis (DPDP Act 2023)</h2>
            <p className="mb-2">Under the Digital Personal Data Protection Act, 2023, we process your data based on:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Consent</strong> — you sign up willingly and accept these terms</li>
              <li><strong>Contract performance</strong> — to deliver the service you signed up for</li>
              <li><strong>Legal obligation</strong> — tax records, regulatory filings</li>
              <li><strong>Legitimate interest</strong> — security, fraud prevention, product improvement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Third-party services we use</h2>
            <p className="mb-3">To run Orderzo, we use these trusted third-party providers, each with their own privacy policies:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Supabase Inc.</strong> (database + storage hosting) — data hosted in AWS Mumbai, India</li>
              <li><strong>Vercel Inc.</strong> (web hosting + serverless functions)</li>
              <li><strong>Twilio Inc.</strong> (SMS / OTP delivery)</li>
              <li><strong>Razorpay Software Pvt Ltd</strong> (payment processing — only when you use UPI mode)</li>
              <li><strong>Cloudflare Inc.</strong> (DNS + DDoS protection)</li>
              <li><strong>Google Workspace</strong> (our business email)</li>
            </ul>
            <p className="mt-3">Each of these has signed data processing agreements with us and complies with Indian and international data protection laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">6. Data storage and security</h2>
            <p className="mb-2">All data is stored in <strong>AWS Mumbai (Asia Pacific - Mumbai region)</strong> — fully compliant with RBI data residency guidelines.</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Encrypted in transit (HTTPS/TLS 1.3)</li>
              <li>Encrypted at rest (AES-256)</li>
              <li>Regular automated backups</li>
              <li>Access restricted to authorized personnel only</li>
              <li>SOC 2 Type II certified infrastructure (Supabase)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">7. Data retention</h2>
            <p>We retain your data only as long as your account is active or as required by law.</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Active accounts: kept indefinitely while in use</li>
              <li>Deleted accounts: data removed within 90 days, except records required for tax/legal purposes (kept for 7 years per Indian tax law)</li>
              <li>Crash logs and analytics: 90 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">8. Your rights (DPDP Act 2023)</h2>
            <p className="mb-2">As an Indian Data Principal, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Access</strong> — request a copy of your personal data</li>
              <li><strong>Correction</strong> — fix incorrect data about yourself</li>
              <li><strong>Deletion</strong> — ask us to delete your data</li>
              <li><strong>Withdraw consent</strong> — at any time</li>
              <li><strong>Grievance redressal</strong> — contact us first; if unsatisfied, escalate to the Data Protection Board of India</li>
              <li><strong>Nominate</strong> — designate someone to exercise rights on your behalf</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a> with subject "DPDPA Request" and your registered phone number. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">9. Children's privacy</h2>
            <p>Orderzo is built for businesses run by adults (18+). We do not knowingly collect data from anyone under 18. If you believe we have inadvertently collected data from a minor, contact us at <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a> and we will delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">10. Cookies</h2>
            <p>We use minimal cookies — only what is needed to keep you logged in and to remember your preferences. We do not use advertising or tracking cookies. We use Vercel's built-in analytics (no personal data captured).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">11. Data breach notification</h2>
            <p>In case of any personal data breach, we will notify affected users within 72 hours via email and notify the Data Protection Board of India per DPDP Act requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">12. Changes to this policy</h2>
            <p>We may update this Privacy Policy when we add new features or to comply with new laws. Changes take effect when posted. We will notify users of material changes via email or in-app notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">13. Governing law</h2>
            <p>This Privacy Policy is governed by the laws of India. Any disputes are subject to exclusive jurisdiction of courts in Hyderabad, Telangana.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">14. Contact us</h2>
            <div className="bg-gray-50 rounded-xl p-4 text-sm">
              <p><strong>Orderzo Technologies Pvt Ltd</strong></p>
              <p>Laqsh Residency, Plot No. 101, Gopalakrishnan Puram, Road No. 3, Anand Nagar, Beside Go Colours, Nagole, Hyderabad - 500068, Telangana, India</p>
              <p className="mt-2">Privacy / DPDPA inquiries: <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a></p>
              <p>Customer support: <a href="mailto:support@orderzo.io" className="text-orange-600 underline">support@orderzo.io</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
