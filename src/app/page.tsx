import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      <header className="px-4 sm:px-10 py-4 sticky top-0 bg-white/90 backdrop-blur-sm z-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo variant="lockup" size={40} />
          <nav className="flex items-center gap-3 sm:gap-6 text-sm">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 hidden sm:inline">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 hidden sm:inline">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 hidden sm:inline">Contact</Link>
            <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-10 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Built for India's 50 million dukans
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Replace your<br />
            <span className="text-orange-500">paper bill book.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bills, invoices, payments, dashboard — all from your phone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/login" className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-colors">
              Get Started Free →
            </Link>
            <Link href="/pricing" className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-orange-300 transition-colors">
              See Pricing
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mb-12">
            Free forever · No credit card · Setup in 2 minutes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp-first</h3>
              <p className="text-sm text-gray-600">Send bills + payment links via WhatsApp in one tap</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-bold text-gray-900 mb-1">Auto-paid</h3>
              <p className="text-sm text-gray-600">Customer pays via UPI / Card → bill auto-marks paid</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-gray-900 mb-1">Real reports</h3>
              <p className="text-sm text-gray-600">Daily, weekly, monthly business performance at a glance</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Trusted by every kind of small business across India</p>
            <p className="text-2xl font-bold text-gray-900">Order. Bill. Done.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
