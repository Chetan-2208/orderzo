"use client";

import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/"><Logo variant="lockup" size={36} /></Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
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
              Aapka business, hamari priority.
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
              Let's talk.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We're a small team. Every message gets read. Usually within 4 hours.
            </p>
          </div>
        </section>

        {/* WhatsApp — big primary CTA */}
        <section className="px-4 sm:px-8 lg:px-12 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-200 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
              
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Fastest way to reach us
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    WhatsApp us directly.
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">Reply within 4 hours during business hours.</p>
                  <p className="text-base text-gray-600 font-semibold">+91 84660 89662</p>
                </div>
                
                <a 
                  href="https://wa.me/918466089662?text=Hi%20Orderzo%2C%20I%27d%20like%20to%20know%20more" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-green-500/40 whitespace-nowrap"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp us now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Email options + LinkedIn — visual grid */}
        <section className="px-4 sm:px-8 lg:px-12 pb-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-6">Or reach us by</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* General Email */}
              <a href="mailto:info@orderzo.io" className="group bg-white rounded-2xl p-7 border-2 border-gray-200 hover:border-[#635BFF] hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#EFEEFF] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📧</div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-gray-900 mb-1 text-lg">General Inquiries</h3>
                    <p className="text-[#635BFF] font-bold mb-2 text-sm">info@orderzo.io</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Sales, partnerships, press, general questions</p>
                  </div>
                </div>
              </a>

              {/* Support Email */}
              <a href="mailto:support@orderzo.io" className="group bg-white rounded-2xl p-7 border-2 border-gray-200 hover:border-[#635BFF] hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#EFEEFF] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🙏</div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-gray-900 mb-1 text-lg">Customer Support</h3>
                    <p className="text-[#635BFF] font-bold mb-2 text-sm">support@orderzo.io</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Account, billing, technical help</p>
                  </div>
                </div>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="bg-gradient-to-br from-[#EFEEFF] to-white border-2 border-[#DAD8FF] rounded-2xl p-7">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-[#635BFF] rounded-2xl flex items-center justify-center text-white">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-gray-900 mb-3 text-lg">Connect on LinkedIn</h3>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href="https://linkedin.com/company/orderzo" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Orderzo Page
                    </a>
                    <a 
                      href="https://linkedin.com/in/chetan-aitaraju" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white border-2 border-[#DAD8FF] hover:border-[#635BFF] text-[#4D44E0] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Chetan (Founder)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business hours + Address grid */}
        <section className="px-4 sm:px-8 lg:px-12 py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hours */}
              <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-xl">⏰</div>
                  <h3 className="font-extrabold text-gray-900 text-lg">Business hours</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-medium">Monday – Saturday</span>
                    <span className="text-gray-600 text-sm">9 AM – 9 PM IST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-600 text-sm">10 AM – 6 PM IST</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">WhatsApp messages and emails answered within 4 hours during business hours.</p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#EFEEFF] rounded-xl flex items-center justify-center text-xl">🏢</div>
                  <h3 className="font-extrabold text-gray-900 text-lg">Registered office</h3>
                </div>
                <address className="not-italic text-gray-700 leading-relaxed text-sm">
                  <strong className="text-gray-900 block mb-1">Orderzo Technologies</strong>
                  Laqsh Residency, Plot No. 101<br />
                  Gopalakrishnan Puram, Road No. 3<br />
                  Anand Nagar, Beside Go Colours<br />
                  Nagole, Hyderabad – 500068<br />
                  Telangana, India 🇮🇳
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* Specific help — redesigned */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">Need specific help?</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                Right route, right answer.
              </h2>
            </div>

            <div className="space-y-3">
              <div className="group bg-gray-50 hover:bg-[#F4F3FF] rounded-2xl p-6 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-extrabold text-gray-900 mb-1">Account & billing issues</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Email <a href="mailto:support@orderzo.io" className="text-[#635BFF] hover:underline font-semibold">support@orderzo.io</a> with your registered phone number, or WhatsApp us directly.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50 hover:bg-[#F4F3FF] rounded-2xl p-6 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-extrabold text-gray-900 mb-1">Privacy & data requests</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Email <a href="mailto:info@orderzo.io" className="text-[#635BFF] hover:underline font-semibold">info@orderzo.io</a> with subject "DPDPA Request"</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50 hover:bg-[#F4F3FF] rounded-2xl p-6 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <p className="font-extrabold text-gray-900 mb-1">Refunds & cancellations</p>
                    <p className="text-sm text-gray-600 leading-relaxed">See our <Link href="/refund" className="text-[#635BFF] hover:underline font-semibold">Refund Policy</Link>, or email <a href="mailto:support@orderzo.io" className="text-[#635BFF] hover:underline font-semibold">support@orderzo.io</a></p>
                  </div>
                </div>
              </div>

              <div className="group bg-gray-50 hover:bg-[#F4F3FF] rounded-2xl p-6 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div className="flex-1">
                    <p className="font-extrabold text-gray-900 mb-1">Press & media</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Email <a href="mailto:info@orderzo.io" className="text-[#635BFF] hover:underline font-semibold">info@orderzo.io</a> with subject "Press"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final soft CTA */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-br from-[#635BFF] to-[#3530B8] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Ready to try Orderzo?
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
              Start free. No credit card. Setup in 2 minutes.
            </p>
            
            <Link 
              href="/login" 
              className="inline-block bg-white text-[#3530B8] px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-[#F4F3FF] shadow-2xl transition-all"
            >
              Get Started Free →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}