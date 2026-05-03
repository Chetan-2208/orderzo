"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 800)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (otp.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (typeof window !== 'undefined') {
        localStorage.setItem('orderzo_user_phone', phone.replace(/\D/g, ''))
      }
      router.push('/setup')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      <header className="px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30">
            O
          </div>
          <span className="text-2xl font-bold text-gray-900">Orderzo</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-500/10 border border-orange-100">
            
            {step === 'phone' ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to Orderzo
                </h1>
                <p className="text-gray-600 mb-8">
                  Enter your phone number to get started
                </p>

                <form onSubmit={handleSendOtp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile number
                  </label>
                  <div className="flex gap-2 mb-2">
                    <div className="flex items-center px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      autoFocus
                    />
                  </div>
                  
                  {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || phone.length !== 10}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed mt-4"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP →'}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-6">
                  By continuing, you agree to our Terms & Privacy.
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setStep('phone'); setOtp(''); setError('') }}
                  className="text-sm text-gray-500 mb-4 hover:text-gray-700"
                >
                  ← Change number
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Enter the code
                </h1>
                <p className="text-gray-600 mb-2">
                  We sent a 6-digit code to
                </p>
                <p className="font-medium text-gray-900 mb-8">
                  +91 {phone}
                </p>

                <form onSubmit={handleVerifyOtp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP code
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-2xl tracking-widest text-center font-semibold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 mb-2"
                    autoFocus
                  />

                  {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                  )}

                  <p className="text-xs text-gray-500 mb-4">
                    💡 Demo mode: enter any 6 digits to continue
                  </p>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue →'}
                  </button>
                </form>

                <button
                  onClick={() => alert('OTP would be resent (mock for now)')}
                  className="text-sm text-orange-500 hover:text-orange-600 mt-4 mx-auto block font-medium"
                >
                  Resend OTP
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
