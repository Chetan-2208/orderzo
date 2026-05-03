"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: 3 May 2026 · Effective from: 3 May 2026</p>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-sm">
              <strong>In simple words:</strong> By using Orderzo, you agree to use it lawfully, you stay responsible for your business data, we provide the service "as is" without guarantees of perfection, and any disputes go to courts in Hyderabad, Telangana.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Agreement</h2>
            <p>These Terms of Service ("Terms") govern your access to and use of Orderzo, a software-as-a-service platform provided by <strong>Orderzo Technologies Pvt Ltd</strong> ("Orderzo", "we", "us", "our"). By creating an account or using our service, you agree to be bound by these Terms.</p>
            <p className="mt-2">If you do not agree, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Eligibility</h2>
            <p>You must be at least 18 years old and legally capable of entering into binding contracts under Indian law to use Orderzo. By signing up, you confirm that:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>You are 18 years or older</li>
              <li>You operate a legitimate business in India</li>
              <li>The information you provide is accurate and current</li>
              <li>You will use Orderzo for lawful business purposes only</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Account responsibilities</h2>
            <p>Your account is identified by your mobile phone number. You agree to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Keep your phone number secure and not share OTPs with anyone</li>
              <li>Notify us immediately if you suspect unauthorized access</li>
              <li>Take responsibility for all activity under your account</li>
              <li>Provide accurate business information during setup</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Service description</h2>
            <p>Orderzo provides a digital platform to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Create and manage orders, bills, and invoices</li>
              <li>Generate and share PDF invoices</li>
              <li>Send payment links via WhatsApp (using third-party Razorpay)</li>
              <li>Track customer history and business performance</li>
              <li>Manage your menu/items catalog</li>
            </ul>
            <p className="mt-3">We do not act as a payment gateway. Payments flow through Razorpay (or directly via UPI from customer to your bank). Orderzo never holds your money.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Acceptable use</h2>
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Use Orderzo for illegal goods, services, or activities</li>
              <li>Send spam, harassment, or unwanted messages to customers</li>
              <li>Reverse-engineer, decompile, or attempt to extract our source code</li>
              <li>Resell, sublicense, or white-label Orderzo without written permission</li>
              <li>Upload viruses, malware, or harmful code</li>
              <li>Impersonate another business or person</li>
              <li>Violate any Indian law (IT Act, Consumer Protection Act, etc.)</li>
              <li>Bypass usage limits or attempt to defraud us</li>
            </ul>
            <p className="mt-3 font-semibold">Violation may result in immediate account termination and legal action.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">6. Subscription plans and fees</h2>
            <p>Current plans (subject to change with 30 days notice):</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li><strong>Free Plan</strong> — limited to 5 transactions/day</li>
              <li><strong>Pro Plan</strong> — Rs. 199/month, unlimited transactions</li>
              <li><strong>Business Plan</strong> — Rs. 499/month, unlimited + advanced features</li>
            </ul>
            <p className="mt-3">All prices are inclusive of applicable taxes. We reserve the right to modify pricing with 30 days advance notice via email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">7. Payment, billing, and cancellation</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Subscriptions are billed monthly in advance</li>
              <li>You authorize automatic renewal unless cancelled before next billing cycle</li>
              <li>Cancel anytime from your account settings</li>
              <li>Refunds are governed by our <Link href="/refund" className="text-orange-600 underline">Refund Policy</Link></li>
              <li>Failed payments will result in service suspension after 7 days grace period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">8. Your data and content</h2>
            <p>You own all data you input into Orderzo (customer info, orders, items, etc.). We store and process it on your behalf to deliver the service.</p>
            <p className="mt-2">By using Orderzo, you grant us a limited license to host, store, and process your data only as needed to operate the service.</p>
            <p className="mt-2">For full details on data handling, see our <Link href="/privacy" className="text-orange-600 underline">Privacy Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">9. Intellectual property</h2>
            <p>All Orderzo content — software, logos, designs, trademarks, and branding (including "Orderzo", "Order. Bill. Done.", and the orange checkmark logo) — is owned by Orderzo Technologies Pvt Ltd and protected by Indian and international intellectual property laws.</p>
            <p className="mt-2">You may not copy, reproduce, or use our brand without written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">10. Service availability</h2>
            <p>We aim for 99% uptime but do not guarantee uninterrupted service. We may need to perform maintenance, updates, or downtime for reasons including:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Scheduled maintenance (with advance notice when possible)</li>
              <li>Emergency bug fixes or security patches</li>
              <li>Third-party service outages (Supabase, Vercel, Razorpay, Twilio)</li>
              <li>Force majeure events</li>
            </ul>
            <p className="mt-3">We are not liable for losses due to temporary unavailability.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">11. Disclaimers and limitation of liability</h2>
            <p>Orderzo is provided "as is" and "as available" without warranties of any kind, express or implied. To the maximum extent permitted by Indian law:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>We do not guarantee that the service will be error-free or meet every business need</li>
              <li>We are not responsible for losses caused by user error, third-party services, or events outside our control</li>
              <li>Our total liability is limited to the fees you paid in the 12 months preceding the claim, or Rs. 2,000, whichever is higher</li>
              <li>We are not liable for indirect, incidental, consequential, or punitive damages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">12. Indemnification</h2>
            <p>You agree to indemnify and hold Orderzo harmless from any claims, damages, or expenses arising from:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Your use of the service</li>
              <li>Your violation of these Terms</li>
              <li>Your business's interactions with your customers</li>
              <li>Tax disputes related to your business operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">13. Termination</h2>
            <p>You may terminate your account at any time through account settings or by emailing <a href="mailto:support@orderzo.io" className="text-orange-600 underline">support@orderzo.io</a>.</p>
            <p className="mt-2">We may suspend or terminate your account if you violate these Terms. Upon termination, your data will be deleted per our <Link href="/privacy" className="text-orange-600 underline">Privacy Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">14. Changes to these Terms</h2>
            <p>We may update these Terms from time to time. Material changes will be communicated via email or in-app notice 30 days before taking effect. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">15. Governing law and jurisdiction</h2>
            <p>These Terms are governed by the laws of India, including:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
              <li>Indian Contract Act, 1872</li>
              <li>Information Technology Act, 2000</li>
              <li>Consumer Protection Act, 2019</li>
              <li>Digital Personal Data Protection Act, 2023</li>
              <li>Goods and Services Tax (GST) Act</li>
            </ul>
            <p className="mt-3">Any disputes shall be subject to the exclusive jurisdiction of courts in <strong>Hyderabad, Telangana, India</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">16. Grievance redressal</h2>
            <p>Per the IT Act, 2000, our designated Grievance Officer is:</p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm mt-2">
              <p><strong>Chetan Aitaraju</strong></p>
              <p>Founder, Orderzo Technologies Pvt Ltd</p>
              <p>Email: <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a> (Subject: "Grievance")</p>
              <p>Response time: within 15 days of receipt</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">17. Contact us</h2>
            <div className="bg-gray-50 rounded-xl p-4 text-sm">
              <p><strong>Orderzo Technologies Pvt Ltd</strong></p>
              <p>Laqsh Residency, Plot No. 101, Gopalakrishnan Puram, Road No. 3, Anand Nagar, Beside Go Colours, Nagole, Hyderabad - 500068, Telangana, India</p>
              <p className="mt-2">General: <a href="mailto:info@orderzo.io" className="text-orange-600 underline">info@orderzo.io</a></p>
              <p>Support: <a href="mailto:support@orderzo.io" className="text-orange-600 underline">support@orderzo.io</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
