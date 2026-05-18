import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F3FF] via-white to-[#F4F3FF] flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-10 py-4 sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo variant="lockup" size={40} />
          <nav className="flex items-center gap-3 sm:gap-6 text-sm">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 hidden sm:inline">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 hidden sm:inline">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 hidden sm:inline">Contact</Link>
            <Link href="/login" className="bg-[#635BFF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4D44E0] transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — Split layout with WhatsApp mockup */}
        <section className="px-4 sm:px-8 lg:px-12 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: Headline + CTA */}
            <div className="lg:col-span-7">
              <div className="inline-block bg-[#EFEEFF] text-[#3530B8] px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
                Made in India · For 60M micro-businesses
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6">
                <span className="text-[#635BFF]">Apna dukan,</span><br />
                <span className="text-[#635BFF]">apne haath mein.</span>
              </h1>
              
              <p className="text-2xl sm:text-3xl text-gray-800 font-semibold mb-6">
                Bill in 10 seconds.
              </p>

              <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
                Send invoices via WhatsApp. Take walk-in payments at your counter. Track every customer. All from your phone. <span className="font-semibold text-gray-900">₹249/month or use free.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link 
                  href="/login" 
                  className="bg-[#635BFF] text-white px-7 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#4D44E0] shadow-lg shadow-[#635BFF]/30 transition-all"
                >
                  Get Started Free →
                </Link>
                <a 
                  href="https://wa.me/918466089662?text=Hi%20Chetan%2C%20I%27d%20like%20to%20know%20more%20about%20Orderzo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-7 py-4 rounded-xl font-bold text-base sm:text-lg border-2 border-gray-200 hover:border-green-500 hover:text-green-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp us
                </a>
              </div>
              
              <p className="text-sm text-gray-500">
                Free for 30 invoices/month · No credit card · Setup in 2 minutes
              </p>
            </div>

            {/* RIGHT: WhatsApp chat mockup */}
            <div className="lg:col-span-5 lg:pl-4">
              <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {/* Subtle glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-purple-200/20 blur-3xl rounded-full"></div>
                
                {/* Phone frame */}
                <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  {/* Phone screen */}
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* WhatsApp header */}
                    <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-lg font-bold">
                        🏪
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Your Shop</p>
                        <p className="text-[10px] text-white/70">online</p>
                      </div>
                      <span className="text-lg">📞</span>
                    </div>
                    
                    {/* WhatsApp chat body */}
                    <div className="bg-[#ECE5DD] px-3 py-4 space-y-2 min-h-[420px]">
                      {/* Customer message */}
                      <div className="flex">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-gray-900">Aaj 2 tiffin chahiye 🙏</p>
                          <p className="text-[10px] text-gray-400 text-right mt-1">12:34 PM</p>
                        </div>
                      </div>
                      
                      {/* Owner reply with Orderzo invoice card */}
                      <div className="flex justify-end">
                        <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-2 max-w-[85%] shadow-sm">
                          {/* Invoice card */}
                          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                            {/* Invoice header */}
                            <div className="bg-[#635BFF] text-white px-3 py-2">
                              <p className="text-[10px] font-semibold opacity-90">YOUR SHOP</p>
                              <p className="text-xs font-bold">Order #1234</p>
                            </div>
                            
                            {/* Invoice items */}
                            <div className="px-3 py-2 text-xs space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-700">Lunch tiffin × 2</span>
                                <span className="text-gray-900 font-semibold">₹200</span>
                              </div>
                            </div>
                            
                            {/* Total */}
                            <div className="bg-gray-50 px-3 py-2 flex justify-between items-center border-t border-gray-100">
                              <span className="text-xs text-gray-600">Total</span>
                              <span className="text-base font-bold text-gray-900">₹200</span>
                            </div>
                            
                            {/* Pay button */}
                            <div className="bg-white px-3 py-2 border-t border-gray-100">
                              <button className="w-full bg-[#635BFF] text-white text-xs font-bold py-2 rounded-lg">
                                Pay via UPI →
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-500 text-right mt-1 px-1">12:34 PM ✓✓</p>
                        </div>
                      </div>

                      {/* Customer reply */}
                      <div className="flex">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-gray-900">Paid ✓</p>
                          <p className="text-[10px] text-gray-400 text-right mt-1">12:35 PM</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* WhatsApp input bar */}
                    <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">Type a message...</div>
                      <div className="w-7 h-7 bg-[#128C7E] rounded-full flex items-center justify-center text-white text-xs">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip — real numbers */}
        <section className="bg-white border-y border-gray-100 py-10 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-extrabold text-[#635BFF] mb-2">100+</p>
                <p className="text-base font-semibold text-gray-900">Indian businesses</p>
                <p className="text-sm text-gray-500 mt-1">signed up in our first weeks</p>
              </div>
              <div className="text-center sm:border-x sm:border-gray-100 sm:px-8">
                <p className="text-5xl sm:text-6xl font-extrabold text-[#635BFF] mb-2">60M</p>
                <p className="text-base font-semibold text-gray-900">Indian micro-businesses</p>
                <p className="text-sm text-gray-500 mt-1">we are built for</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-extrabold text-[#635BFF] mb-2">10<span className="text-3xl sm:text-4xl">s</span></p>
                <p className="text-base font-semibold text-gray-900">Average bill time</p>
                <p className="text-sm text-gray-500 mt-1">from order to paid invoice</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Orderzo works — 4 visual steps */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">How it works</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                4 steps. 60 seconds total.
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From your customer's message to a paid invoice. No computer, no Tally, no paper bills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-[#EFEEFF] text-[#635BFF] rounded-full font-bold text-base">1</span>
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Customer messages</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">They WhatsApp or call you with an order.</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-500 italic">"2 tiffin chahiye 🙏"</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-[#EFEEFF] text-[#635BFF] rounded-full font-bold text-base">2</span>
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tap 4 fields</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Phone, items, amount, send. That's it.</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-500 italic">10 seconds. No menus, no fluff.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-[#EFEEFF] text-[#635BFF] rounded-full font-bold text-base">3</span>
                  <span className="text-4xl">📤</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Invoice sent</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Beautiful PDF + UPI link delivered via WhatsApp.</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-500 italic">Auto-attached. Auto-formatted.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative bg-white rounded-2xl p-6 border-2 border-[#635BFF] shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-[#635BFF] text-white rounded-full font-bold text-base">4</span>
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Customer pays</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">One tap. UPI. You get auto-confirmation.</p>
                <div className="bg-[#EFEEFF] rounded-lg px-3 py-2 border border-[#DAD8FF]">
                  <p className="text-xs text-[#4D44E0] font-semibold italic">Done. Move to next customer.</p>
                </div>
              </div>
            </div>

            {/* Time summary below the steps */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 border border-gray-200 shadow-sm">
                <span className="text-2xl">⏱️</span>
                <p className="text-base font-semibold text-gray-900">Total time: under 60 seconds per customer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The 3 Modes — Split layout */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: Big headline + supporting copy */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">One app, three modes</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.05]">
                Built for the way<br />
                <span className="text-[#635BFF]">your business</span><br />
                actually works.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Tell us how customers reach you. Orderzo shapes itself around your reality — not the other way around.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#EFEEFF] text-[#3530B8] rounded-full px-4 py-2 text-sm font-semibold">
                <span>👉</span>
                <span>Pick your mode at signup. Change anytime.</span>
              </div>
            </div>

            {/* RIGHT: Stacked mode cards */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Mode 1: Online */}
              <div className="group bg-gradient-to-br from-[#EFEEFF] to-white border-2 border-[#DAD8FF] rounded-3xl p-6 sm:p-7 hover:shadow-xl hover:border-[#635BFF] transition-all">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    📱
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900">Online orders</h3>
                      <span className="text-xs font-semibold text-[#635BFF] bg-white px-2 py-1 rounded-full border border-[#DAD8FF]">WhatsApp-first</span>
                    </div>
                    <p className="text-[#4D44E0] font-bold italic text-base mb-3">"Order milte hi, bill bhej do."</p>
                    <p className="text-gray-700 leading-relaxed">Orderzo turns a WhatsApp message into a professional invoice + UPI link in 10 seconds. Customer pays. You move on.</p>
                  </div>
                </div>
              </div>

              {/* Mode 2: Offline */}
              <div className="group bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-3xl p-6 sm:p-7 hover:shadow-xl hover:border-green-500 transition-all">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    🏪
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900">Walk-in counter</h3>
                      <span className="text-xs font-semibold text-green-700 bg-white px-2 py-1 rounded-full border border-green-200">Counter sales</span>
                    </div>
                    <p className="text-green-800 font-bold italic text-base mb-3">"Computer hatao. Phone uthao."</p>
                    <p className="text-gray-700 leading-relaxed">Your phone is now your billing machine. 10-second bills. Cash, UPI, or card — Orderzo tracks every rupee.</p>
                  </div>
                </div>
              </div>

              {/* Mode 3: Both */}
              <div className="group bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-3xl p-6 sm:p-7 hover:shadow-xl hover:border-purple-500 transition-all">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                    🔄
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900">Both modes</h3>
                      <span className="text-xs font-semibold text-purple-700 bg-white px-2 py-1 rounded-full border border-purple-200">Best of both</span>
                    </div>
                    <p className="text-purple-800 font-bold italic text-base mb-3">"Kabhi WhatsApp, kabhi counter."</p>
                    <p className="text-gray-700 leading-relaxed">Many Indian businesses run both modes daily. Orderzo doesn't make you choose. Both modes. One app. One dashboard.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* What replaces */}
        <section className="px-4 sm:px-10 py-16 bg-gradient-to-br from-gray-50 to-[#F4F3FF]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Orderzo replaces:
              </h2>
              <p className="text-lg text-gray-600">Two old things. One new app.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Replace 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💬</span>
                  <h3 className="font-bold text-lg text-gray-900">WhatsApp chaos</h3>
                </div>
                <p className="text-gray-700 mb-3">No more typing "kitne hue?", "UPI bhejo", "payment ka screenshot send kar do"...</p>
                <div className="bg-[#F4F3FF] border border-[#EFEEFF] rounded-xl p-4 text-sm text-gray-700">
                  <span className="font-semibold text-[#3530B8]">With Orderzo:</span> Tap 4 fields. Send beautiful invoice + UPI payment link via WhatsApp. Customer pays in one tap. Done in 30 seconds.
                </div>
              </div>

              {/* Replace 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🖥️</span>
                  <h3 className="font-bold text-lg text-gray-900">Computer billing software</h3>
                </div>
                <p className="text-gray-700 mb-3">No more ₹25,000 desktop PC + ₹18,000/year Tally + thermal printer + barcode scanner...</p>
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-gray-700">
                  <span className="font-semibold text-green-700">With Orderzo:</span> Your phone is the billing machine. ₹249/month. Beautiful invoices on WhatsApp. End-of-day cash/UPI/card split.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust signal */}
        <section className="px-4 sm:px-10 py-16 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              ✨ Already trusted by 100+ Indian businesses
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Built for Indian micro-businesses. Across categories. Across cities.
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Real Indian micro-businesses are signing up. We onboard each one personally — because we believe in word of mouth, not ads.
            </p>
            <p className="text-sm text-gray-500">
              No bots. No fake reviews. Just real shops, getting bills done faster.
            </p>
          </div>
        </section>

        {/* Founder note */}
        <section className="px-4 sm:px-10 py-16 bg-gradient-to-br from-[#F4F3FF] to-white">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#EFEEFF]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  C
                </div>
                <div>
                  <p className="font-bold text-gray-900">Chetan Aitaraju</p>
                  <p className="text-sm text-gray-500">Founder · Data Engineer in NYC, building Orderzo from home</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                India's micro-businesses are the country's quiet engine. Most of them still run on paper notebooks and WhatsApp chats — outgrowing one but underserved by the other.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                I noticed something while talking to over 100 of them: they had moved past the notebook. But the tools available felt heavy, complicated, built for someone else.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most billing apps treat the business owner like an accountant. They aren't. A business owner needs to send a beautiful bill in 10 seconds, get paid via UPI, and move on with their day. Nothing more, nothing less.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                So I started Orderzo in 2026 while working full-time as a Data Engineer in New York City. Phone-only. WhatsApp-native. ₹249 per month. Built for how Indian businesses actually work — not how someone in a glass office thinks they should work.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
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
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-10 py-16 bg-gradient-to-r from-[#F4F3FF]0 to-[#4D44E0]">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Apna dukan, apne haath mein.
            </h2>
            <p className="text-lg text-[#EFEEFF] mb-8">
              Start free. Send your first invoice in 2 minutes.
            </p>
            <Link 
              href="/login" 
              className="inline-block bg-white text-[#4D44E0] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#F4F3FF] transition-colors shadow-xl"
            >
              Get Started Free →
            </Link>
            <p className="text-sm text-[#EFEEFF] mt-4">
              No credit card · 30 free invoices/month · Setup in 2 minutes
            </p>
          </div>
        </section>

        {/* Closing tagline */}
        <section className="px-4 py-12 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">Order. Bill. Done.</p>
            <p className="text-gray-500">The Indian dukan's billing app.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
