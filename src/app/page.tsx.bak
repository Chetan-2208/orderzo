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

        {/* Works on phone + laptop — proof of real product on multiple devices */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            
            {/* Section header */}
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">Works everywhere you do</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-4">
                Phone in the field.<br />
                <span className="text-[#635BFF]">Laptop in the office.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built phone-first. Works seamlessly on any device with a browser. No app store install needed.
              </p>
            </div>

            {/* Devices showcase */}
            <div className="relative max-w-5xl mx-auto">
              
              {/* Decorative gradient blob behind devices */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/10 via-purple-100/30 to-[#EFEEFF]/40 blur-3xl rounded-full"></div>

              {/* LAPTOP MOCKUP — responsive */}
              <div className="relative max-w-full">
                {/* Outer laptop body (silver bezel) */}
                <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-xl sm:rounded-t-2xl p-1 sm:p-2 shadow-2xl">
                  {/* Screen border (black bezel) */}
                  <div className="bg-gray-900 rounded-t-lg sm:rounded-t-xl p-1.5 sm:p-3">
                    {/* Browser window */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-inner">
                      
                      {/* Browser chrome (URL bar + traffic lights) */}
                      <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 border border-gray-200 flex items-center gap-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                            <span>app.orderzo.io</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">↻</div>
                      </div>

                      {/* Dashboard content */}
                      <div className="flex" >
                        
                        {/* Sidebar */}
                        <div className="hidden md:block w-48 bg-white border-r border-gray-100 py-4 flex-shrink-0">
                          {/* Logo */}
                          <div className="px-4 mb-6">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#635BFF] rounded-lg flex items-center justify-center text-white font-bold text-xs">O</div>
                              <span className="font-bold text-gray-900 text-sm">Orderzo</span>
                            </div>
                          </div>
                          
                          {/* Nav */}
                          <div className="space-y-1 px-2">
                            <div className="px-3 py-2 bg-[#F4F3FF] text-[#635BFF] rounded-lg text-sm font-semibold flex items-center gap-2">
                              <span>📊</span> Today
                            </div>
                            <div className="px-3 py-2 text-gray-600 rounded-lg text-sm flex items-center gap-2">
                              <span>📦</span> Orders
                            </div>
                            <div className="px-3 py-2 text-gray-600 rounded-lg text-sm flex items-center gap-2">
                              <span>👥</span> Customers
                            </div>
                            <div className="px-3 py-2 text-gray-600 rounded-lg text-sm flex items-center gap-2">
                              <span>📝</span> Items
                            </div>
                            <div className="px-3 py-2 text-gray-600 rounded-lg text-sm flex items-center gap-2">
                              <span>⚙️</span> Me
                            </div>
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="flex-1 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-white">
                          {/* Top bar */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Mon, 15 May 2026</p>
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-900">Today</h3>
                            </div>
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                              <div className="w-6 h-6 bg-[#635BFF] text-white rounded-full flex items-center justify-center text-xs font-bold">P</div>
                              <span className="text-xs font-semibold text-gray-700">Padma's Kitchen</span>
                            </div>
                          </div>

                          {/* Stats row */}
                          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3 mb-3 sm:mb-5">
                            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Earnings</p>
                              <p className="text-xl font-extrabold text-gray-900">₹4,250</p>
                              <p className="text-[10px] text-[#635BFF] font-bold mt-0.5">+18% vs yesterday</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Invoices</p>
                              <p className="text-xl font-extrabold text-gray-900">12</p>
                              <p className="text-[10px] text-green-600 font-bold mt-0.5">8 paid · 4 pending</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Customers</p>
                              <p className="text-xl font-extrabold text-gray-900">9</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">3 new today</p>
                            </div>
                          </div>

                          {/* Chart card */}
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-xs font-bold text-gray-900">Last 7 days</p>
                              <p className="text-[10px] text-gray-500">₹28,400 total</p>
                            </div>
                            <div className="flex items-end justify-between gap-1.5 h-16">
                              <div className="flex-1 bg-[#EFEEFF] rounded-t" style={{height: '40%'}}></div>
                              <div className="flex-1 bg-[#DAD8FF] rounded-t" style={{height: '60%'}}></div>
                              <div className="flex-1 bg-[#BDB9FF] rounded-t" style={{height: '50%'}}></div>
                              <div className="flex-1 bg-[#9F99FF] rounded-t" style={{height: '70%'}}></div>
                              <div className="flex-1 bg-[#7C73FF] rounded-t" style={{height: '85%'}}></div>
                              <div className="flex-1 bg-[#635BFF] rounded-t" style={{height: '95%'}}></div>
                              <div className="flex-1 bg-[#4D44E0] rounded-t" style={{height: '100%'}}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                          </div>

                          {/* Recent orders */}
                          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold text-gray-900 mb-3">Recent orders</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between py-1 text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-[10px]">L</div>
                                  <span className="text-gray-900 font-medium">Lakshmi · 2 tiffins</span>
                                </div>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">Paid ₹200</span>
                              </div>
                              <div className="flex items-center justify-between py-1 text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-[10px]">R</div>
                                  <span className="text-gray-900 font-medium">Ravi · 3 tiffins</span>
                                </div>
                                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold">Pending ₹300</span>
                              </div>
                              <div className="flex items-center justify-between py-1 text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px]">S</div>
                                  <span className="text-gray-900 font-medium">Sita · 1 tiffin + dal</span>
                                </div>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">Paid ₹130</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Laptop bottom hinge */}
                <div className="relative">
                  <div className="bg-gradient-to-b from-gray-300 to-gray-400 h-3 rounded-b-2xl shadow-lg"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-b-full"></div>
                </div>
                <div className="bg-gradient-to-b from-gray-200 to-gray-100 h-2 mx-auto rounded-b-3xl shadow-md" style={{width: '40%'}}></div>

                {/* Phone mockup tucked in front-right */}
                <div className="absolute -bottom-4 -right-4 sm:right-8 lg:-right-2 w-32 sm:w-40 lg:w-48 hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/30 to-purple-200/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gray-900 rounded-[1.25rem] p-1.5 shadow-2xl">
                      <div className="bg-white rounded-[1rem] overflow-hidden">
                        {/* Phone Today screen — compact */}
                        <div className="bg-gradient-to-br from-[#F4F3FF] to-white px-3 py-3 border-b border-gray-100">
                          <p className="text-[10px] text-gray-500">Today</p>
                          <p className="text-lg font-extrabold text-gray-900">₹4,250</p>
                          <p className="text-[8px] text-[#635BFF] font-bold">+18% vs yesterday</p>
                        </div>
                        <div className="grid grid-cols-3 px-2 py-2 text-center">
                          <div>
                            <p className="text-sm font-bold text-gray-900">12</p>
                            <p className="text-[7px] text-gray-500">Inv</p>
                          </div>
                          <div className="border-x border-gray-100">
                            <p className="text-sm font-bold text-green-600">8</p>
                            <p className="text-[7px] text-gray-500">Paid</p>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-amber-600">4</p>
                            <p className="text-[7px] text-gray-500">Pend</p>
                          </div>
                        </div>
                        <div className="px-2 pb-2">
                          <div className="flex items-end justify-between gap-0.5 h-6">
                            <div className="flex-1 bg-[#EFEEFF] rounded-t" style={{height: '40%'}}></div>
                            <div className="flex-1 bg-[#DAD8FF] rounded-t" style={{height: '60%'}}></div>
                            <div className="flex-1 bg-[#BDB9FF] rounded-t" style={{height: '50%'}}></div>
                            <div className="flex-1 bg-[#9F99FF] rounded-t" style={{height: '70%'}}></div>
                            <div className="flex-1 bg-[#7C73FF] rounded-t" style={{height: '85%'}}></div>
                            <div className="flex-1 bg-[#635BFF] rounded-t" style={{height: '95%'}}></div>
                            <div className="flex-1 bg-[#4D44E0] rounded-t" style={{height: '100%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust microcopy below */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-16 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-lg">📱</span>
                <span className="font-medium">Phone (Android &amp; iPhone)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">💻</span>
                <span className="font-medium">Mac &amp; Windows laptops</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🌐</span>
                <span className="font-medium">Any modern browser</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">✓</span>
                <span className="font-medium">No app store install</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works — Vertical narrative with phone mockups */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero */}
            <div className="text-center mb-20">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">How it works</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-5">
                Message in.<br />
                <span className="text-[#635BFF]">Paid invoice out.</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                From customer&apos;s WhatsApp to UPI payment, in <strong className="text-gray-900">60 seconds</strong>. No computer, no Tally, no paper bills.
              </p>
            </div>

            {/* Vertical narrative — 4 steps zig-zagging */}
            <div className="relative space-y-16 lg:space-y-24">
              
              {/* Vertical connecting line (desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-0.5 bg-gradient-to-b from-green-300 via-[#635BFF] to-green-300 -translate-x-1/2"></div>

              {/* STEP 1 — Customer messages */}
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="lg:text-right lg:pr-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full font-extrabold text-xl shadow-lg shadow-green-500/40">1</span>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">~5 seconds</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    Customer messages.
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Your regular customer drops you a WhatsApp like always. No app to download, no link to click. They use the same WhatsApp they already use.
                  </p>
                </div>
                
                <div className="lg:pl-12 flex justify-center">
                  <div className="relative w-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-200/30 blur-3xl rounded-full"></div>
                    <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                          <div className="w-9 h-9 bg-pink-300 rounded-full flex items-center justify-center text-base font-bold text-pink-800">L</div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">Lakshmi (Regular)</p>
                            <p className="text-[10px] text-white/70">online</p>
                          </div>
                        </div>
                        <div className="bg-[#ECE5DD] px-3 py-6 min-h-[200px]">
                          <div className="flex">
                            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                              <p className="text-sm text-gray-900">Aaj 2 tiffin chahiye 🙏</p>
                              <p className="text-[10px] text-gray-400 text-right mt-1">12:34 PM</p>
                            </div>
                          </div>
                          <div className="flex mt-2">
                            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                              <p className="text-sm text-gray-900">Aur 1 extra dal</p>
                              <p className="text-[10px] text-gray-400 text-right mt-1">12:34 PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 — Tap 4 fields */}
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="lg:pr-12 flex justify-center lg:order-1 order-2">
                  <div className="relative w-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-purple-200/30 blur-3xl rounded-full"></div>
                    <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        <div className="bg-[#635BFF] text-white px-4 py-3 flex items-center gap-2">
                          <span className="text-base">⚡</span>
                          <p className="font-bold text-sm">New invoice</p>
                          <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">10s</span>
                        </div>
                        <div className="p-4 space-y-3 bg-gradient-to-br from-[#F4F3FF] to-white min-h-[280px]">
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">1. Customer</label>
                            <div className="bg-white border-2 border-[#635BFF] rounded-lg px-3 py-2 mt-1 text-sm font-semibold text-gray-900">+91 98... · Lakshmi ✓</div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">2. Item</label>
                            <div className="bg-white border-2 border-[#635BFF] rounded-lg px-3 py-2 mt-1 text-sm font-semibold text-gray-900">Lunch tiffin × 2</div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">3. Amount</label>
                            <div className="bg-white border-2 border-[#635BFF] rounded-lg px-3 py-2 mt-1 text-sm font-bold text-gray-900">₹230</div>
                          </div>
                          <button className="w-full bg-[#635BFF] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#635BFF]/30">
                            4. Send invoice →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:pl-12 lg:order-2 order-1">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 bg-[#635BFF] text-white rounded-full font-extrabold text-xl shadow-lg shadow-[#635BFF]/40">2</span>
                    <span className="text-xs font-bold text-[#635BFF] uppercase tracking-wider">~10 seconds</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    Tap 4 fields.
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Open Orderzo. Customer phone, item, amount, send. That&apos;s it. No menus to navigate, no settings to configure, no Tally-style data entry.
                  </p>
                </div>
              </div>

              {/* STEP 3 — Invoice sent */}
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="lg:text-right lg:pr-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 bg-[#635BFF] text-white rounded-full font-extrabold text-xl shadow-lg shadow-[#635BFF]/40">3</span>
                    <span className="text-xs font-bold text-[#635BFF] uppercase tracking-wider">Instant</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    Invoice in WhatsApp.
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    A beautiful invoice card with your shop name, items, and a one-tap UPI Pay button — delivered to your customer&apos;s WhatsApp. No PDF download, no link to share.
                  </p>
                </div>
                
                <div className="lg:pl-12 flex justify-center">
                  <div className="relative w-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-emerald-200/30 blur-3xl rounded-full"></div>
                    <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                          <div className="w-9 h-9 bg-pink-300 rounded-full flex items-center justify-center text-base font-bold text-pink-800">L</div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">Lakshmi (Regular)</p>
                            <p className="text-[10px] text-white/70">online</p>
                          </div>
                        </div>
                        <div className="bg-[#ECE5DD] px-3 py-3 min-h-[260px]">
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-2 max-w-[90%] shadow-sm">
                              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-[#635BFF] text-white px-3 py-2">
                                  <p className="text-[10px] font-bold opacity-90">PADMA&apos;S KITCHEN</p>
                                  <p className="text-xs font-bold">Invoice #1234</p>
                                </div>
                                <div className="px-3 py-2 text-xs space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-gray-700">Tiffin × 2</span>
                                    <span className="text-gray-900 font-bold">₹200</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-700">Dal × 1</span>
                                    <span className="text-gray-900 font-bold">₹30</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-3 py-2 flex justify-between items-center border-t border-gray-100">
                                  <span className="text-xs text-gray-600">Total</span>
                                  <span className="text-lg font-extrabold text-gray-900">₹230</span>
                                </div>
                                <div className="bg-white px-3 py-2 border-t border-gray-100">
                                  <button className="w-full bg-[#635BFF] text-white text-xs font-bold py-2 rounded-lg">
                                    💳 Pay ₹230 via UPI →
                                  </button>
                                </div>
                              </div>
                              <p className="text-[10px] text-gray-500 text-right mt-1 px-1">12:35 PM ✓✓</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4 — Customer pays */}
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="lg:pr-12 flex justify-center lg:order-1 order-2">
                  <div className="relative w-64">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-200/30 blur-3xl rounded-full"></div>
                    <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                          <div className="w-9 h-9 bg-pink-300 rounded-full flex items-center justify-center text-base font-bold text-pink-800">L</div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">Lakshmi (Regular)</p>
                            <p className="text-[10px] text-white/70">online</p>
                          </div>
                        </div>
                        <div className="bg-[#ECE5DD] px-3 py-3 min-h-[200px]">
                          <div className="flex">
                            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                              <p className="text-sm text-gray-900">Paid ✓</p>
                              <p className="text-[10px] text-gray-400 text-right mt-1">12:36 PM</p>
                            </div>
                          </div>
                          <div className="flex justify-center mt-3">
                            <div className="bg-green-100 border border-green-300 rounded-full px-3 py-1.5 shadow-sm">
                              <p className="text-[10px] font-bold text-green-800">✓ ₹230 received · Lakshmi</p>
                            </div>
                          </div>
                          <div className="flex mt-3 justify-end">
                            <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm">
                              <p className="text-sm text-gray-900">Thank you Lakshmi! 🙏</p>
                              <p className="text-[10px] text-gray-500 text-right mt-1">12:36 PM ✓✓</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:pl-12 lg:order-2 order-1">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full font-extrabold text-xl shadow-lg shadow-green-500/40">4</span>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">~45 seconds</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    Customer pays. Done.
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Customer taps the UPI button. Pays in their banking app. You get instant confirmation. The order is logged, the invoice is saved, the dashboard updates. Move to the next customer.
                  </p>
                </div>
              </div>

            </div>

            {/* Celebratory 60 seconds total */}
            <div className="mt-20 lg:mt-24 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-gradient-to-r from-[#635BFF] to-[#3530B8] text-white rounded-full px-6 sm:px-10 py-4 sm:py-5 shadow-2xl shadow-[#635BFF]/40">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">⏱️</span>
                  <p className="text-lg sm:text-xl font-extrabold tracking-tight">Total time:</p>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">60 seconds.</p>
                <p className="text-sm sm:text-base text-white/80 hidden sm:block">Per customer. Every time.</p>
              </div>
              <p className="text-sm text-gray-500 mt-4 sm:hidden">Per customer. Every time.</p>
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

        {/* What replaces — OLD vs ORDERZO comparison */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">What we replace</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                Two old things. One new app.
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Indian micro-businesses are stuck between two bad options. Orderzo replaces both.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              
              {/* OLD WAY */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-7 sm:p-8 relative">
                <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-5">❌ Old way</div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl opacity-60">💬</span>
                      <h3 className="font-bold text-lg text-gray-700">WhatsApp chaos</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-through decoration-gray-400">
                      "kitne hue?" · "UPI bhejo" · "payment ka screenshot send kar do" · 5 messages later, still confused
                    </p>
                  </div>
                  
                  <div className="h-px bg-gray-200"></div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl opacity-60">🖥️</span>
                      <h3 className="font-bold text-lg text-gray-700">Computer billing software</h3>
                    </div>
                    <ul className="text-gray-500 text-sm space-y-1 line-through decoration-gray-400">
                      <li>₹25,000 desktop PC</li>
                      <li>₹18,000/year Tally license</li>
                      <li>Thermal printer + paper rolls</li>
                      <li>Training, IT support, headaches</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ORDERZO WAY */}
              <div className="bg-gradient-to-br from-[#EFEEFF] to-white border-2 border-[#635BFF] rounded-3xl p-7 sm:p-8 relative shadow-xl">
                <div className="inline-block bg-[#635BFF] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-5">✅ With Orderzo</div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📱</span>
                      <h3 className="font-bold text-lg text-gray-900">WhatsApp invoices</h3>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Tap 4 fields. Send <span className="font-semibold">beautiful invoice + UPI link</span> via WhatsApp. Customer pays in one tap. Done in 30 seconds.
                    </p>
                  </div>
                  
                  <div className="h-px bg-[#DAD8FF]"></div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📱</span>
                      <h3 className="font-bold text-lg text-gray-900">Phone billing machine</h3>
                    </div>
                    <ul className="text-gray-800 text-sm space-y-1.5">
                      <li>✓ <span className="font-semibold">₹0</span> hardware</li>
                      <li>✓ <span className="font-semibold">₹249/month</span> all-in (or use free)</li>
                      <li>✓ Beautiful invoices on WhatsApp</li>
                      <li>✓ <span className="font-semibold">2-minute</span> setup. No training.</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Product features showcase — 3 mockups */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            
            {/* Section header */}
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">The product</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
                Built for billing. Nothing else.
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every screen designed for one job. No menus to learn, no settings to configure.
              </p>
            </div>

            {/* 3 mockups in a row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              
              {/* Mockup 1: Today's earnings dashboard */}
              <div className="group">
                <div className="relative max-w-[260px] mx-auto mb-6">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-purple-200/20 blur-2xl rounded-full"></div>
                  
                  {/* Phone frame */}
                  <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-xl group-hover:scale-105 transition-transform">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                      {/* Header */}
                      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-900">Today</p>
                        <span className="text-xs text-gray-500">Mon, 15 May</span>
                      </div>
                      
                      {/* Earnings */}
                      <div className="px-4 py-5 bg-gradient-to-br from-[#F4F3FF] to-white">
                        <p className="text-xs text-gray-500 mb-1">Today\'s earnings</p>
                        <p className="text-3xl font-extrabold text-gray-900">₹4,250</p>
                        <p className="text-xs text-[#635BFF] font-semibold mt-1">+18% vs yesterday</p>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 px-4 py-3 border-b border-gray-100 text-center">
                        <div>
                          <p className="text-lg font-bold text-gray-900">12</p>
                          <p className="text-[10px] text-gray-500">Invoices</p>
                        </div>
                        <div className="border-x border-gray-100">
                          <p className="text-lg font-bold text-green-600">8</p>
                          <p className="text-[10px] text-gray-500">Paid</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-amber-600">4</p>
                          <p className="text-[10px] text-gray-500">Pending</p>
                        </div>
                      </div>
                      
                      {/* Mini chart */}
                      <div className="px-4 py-4">
                        <p className="text-[10px] text-gray-500 mb-2">Last 7 days</p>
                        <div className="flex items-end justify-between gap-1 h-12">
                          <div className="w-full bg-[#EFEEFF] rounded-t" style={{height: '40%'}}></div>
                          <div className="w-full bg-[#DAD8FF] rounded-t" style={{height: '60%'}}></div>
                          <div className="w-full bg-[#BDB9FF] rounded-t" style={{height: '50%'}}></div>
                          <div className="w-full bg-[#9F99FF] rounded-t" style={{height: '70%'}}></div>
                          <div className="w-full bg-[#7C73FF] rounded-t" style={{height: '85%'}}></div>
                          <div className="w-full bg-[#635BFF] rounded-t" style={{height: '95%'}}></div>
                          <div className="w-full bg-[#4D44E0] rounded-t" style={{height: '100%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">See your day at a glance.</h3>
                <p className="text-sm text-gray-600 text-center">Today\'s earnings. Invoices sent. Pending payments. All on one screen.</p>
              </div>

              {/* Mockup 2: Beautiful invoice */}
              <div className="group">
                <div className="relative max-w-[260px] mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-purple-200/20 blur-2xl rounded-full"></div>
                  
                  <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-xl group-hover:scale-105 transition-transform">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                      {/* Invoice header */}
                      <div className="bg-[#635BFF] text-white px-4 py-4">
                        <p className="text-[10px] font-semibold opacity-90 uppercase tracking-wider">YOUR SHOP</p>
                        <p className="text-base font-bold mt-1">Invoice #1234</p>
                        <p className="text-[10px] opacity-90">15 May 2026</p>
                      </div>
                      
                      {/* Customer */}
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <p className="text-[10px] text-gray-500">Bill to</p>
                        <p className="text-sm font-semibold text-gray-900">Customer</p>
                        <p className="text-xs text-gray-500">+91 98... ...43</p>
                      </div>
                      
                      {/* Items */}
                      <div className="px-4 py-3 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-700">Lunch tiffin × 2</span>
                          <span className="font-semibold text-gray-900">₹200</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-700">Extra dal × 1</span>
                          <span className="font-semibold text-gray-900">₹30</span>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
                        <span className="text-xs text-gray-600">Total</span>
                        <span className="text-xl font-extrabold text-gray-900">₹230</span>
                      </div>
                      
                      {/* Pay button */}
                      <div className="bg-white px-4 py-3 border-t border-gray-100">
                        <button className="w-full bg-[#635BFF] text-white text-sm font-bold py-2.5 rounded-lg">
                          Pay via UPI →
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-2">Powered by Orderzo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Beautiful, branded invoices.</h3>
                <p className="text-sm text-gray-600 text-center">PDF invoices with your shop name, items, and UPI link. Auto-sent via WhatsApp.</p>
              </div>

              {/* Mockup 3: Customer history */}
              <div className="group">
                <div className="relative max-w-[260px] mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-purple-200/20 blur-2xl rounded-full"></div>
                  
                  <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-xl group-hover:scale-105 transition-transform">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                      {/* Header */}
                      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#EFEEFF] rounded-full flex items-center justify-center text-sm font-bold text-[#635BFF]">L</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">Customer L</p>
                          <p className="text-[10px] text-gray-500">+91 98... ...43</p>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 px-4 py-3 bg-gradient-to-br from-[#F4F3FF] to-white">
                        <div>
                          <p className="text-2xl font-extrabold text-gray-900">12</p>
                          <p className="text-[10px] text-gray-500">Orders</p>
                        </div>
                        <div>
                          <p className="text-2xl font-extrabold text-[#635BFF]">₹2,400</p>
                          <p className="text-[10px] text-gray-500">Total spent</p>
                        </div>
                      </div>
                      
                      {/* Recent orders */}
                      <div className="px-4 py-3">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Recent orders</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <div>
                              <p className="text-gray-900 font-medium">Lunch × 2</p>
                              <p className="text-[10px] text-gray-400">Today</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">Paid</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <div>
                              <p className="text-gray-900 font-medium">Dinner × 1</p>
                              <p className="text-[10px] text-gray-400">Yesterday</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">Paid</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <div>
                              <p className="text-gray-900 font-medium">Tiffin × 3</p>
                              <p className="text-[10px] text-gray-400">2 days ago</p>
                            </div>
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Every customer remembered.</h3>
                <p className="text-sm text-gray-600 text-center">Order history. Total spent. Private notes. So you remember every regular.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Final CTA — bold, confident closing */}
        <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-gradient-to-br from-[#635BFF] to-[#3530B8] relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
              Apna dukan,<br />
              apne haath mein.
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
              Start free. Send your first invoice in 2 minutes.
            </p>
            
            <Link 
              href="/login" 
              className="inline-block bg-white text-[#3530B8] px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl hover:bg-[#F4F3FF] shadow-2xl transition-all"
            >
              Get Started Free →
            </Link>
            
            <p className="text-sm sm:text-base text-white/70 mt-6">
              No credit card · 30 free invoices/month · Setup in 2 minutes
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
