export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
            O
          </div>
          <span className="text-2xl font-bold text-gray-900">Orderzo</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          {/* Coming soon badge */}
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
            🚀 Launching soon
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Order. Bill. <span className="text-orange-500">Done.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 leading-relaxed">
            The simplest WhatsApp-first app for Indian small businesses
          </p>
          <p className="text-base text-gray-500 mb-12">
            Take orders. Send digital bills. Get paid via UPI. All in one place.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-semibold text-gray-900 mb-1">WhatsApp Orders</h3>
              <p className="text-sm text-gray-600">For tiffin, cake, tutors and more</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <div className="text-3xl mb-2">🧾</div>
              <h3 className="font-semibold text-gray-900 mb-1">Digital Bills</h3>
              <p className="text-sm text-gray-600">For retail, salons, repair shops</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant UPI</h3>
              <p className="text-sm text-gray-600">Get paid faster, never lose track</p>
            </div>
          </div>

          {/* Hindi tagline */}
          <p className="text-lg text-gray-700 font-medium mb-8">
            Har dukandar ka order book — ₹199/month
          </p>

          {/* CTA */}
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors cursor-pointer">
            Join the waitlist →
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Be among the first 100 businesses to try Orderzo
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-sm text-gray-500">
        Built with ❤️ for Indian small businesses · orderzo.io
      </footer>
    </div>
  );
}