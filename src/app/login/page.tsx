"use client";

import { useState } from 'react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [country, setCountry] = useState<'in' | 'us'>('in')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, country }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP')
        setLoading(false)
        return
      }

      setSuccess('OTP sent! Check your SMS.')
      setStep('otp')
    } catch (err: any) {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (otp.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    setLoading(true)

    try {
      const cleanPhone = phone.replace(/\D/g, '')
      
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otp, country }),
      })

      const data = await response.json()

      if (!response.ok || !data.verified) {
        setError(data.error || 'Wrong OTP. Please try again.')
        setLoading(false)
        return
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('orderzo_user_phone', cleanPhone)
      }

      const { data: existingBusiness } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_phone', cleanPhone)
        .single()

      if (existingBusiness) {
        router.push('/dashboard')
      } else {
        router.push('/setup')
      }
    } catch (err: any) {
      setError('Could not verify. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      <header className="px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Logo size={40} />
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
                <p className="text-gray-600 mb-6">
                  Enter your mobile number — we'll send a verification code
                </p>

                <form onSubmit={handleSendOtp}>
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setCountry('in')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        country === 'in'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      🇮🇳 India (+91)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCountry('us')}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        country === 'us'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      🇺🇸 USA (+1)
                    </button>
                  </div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile number
                  </label>
                  <div className="flex gap-2 mb-2">
                    <div className="flex items-center px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium">
                      {country === 'in' ? '+91' : '+1'}
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder={country === 'in' ? '9876543210' : '5551234567'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                  onClick={() => { setStep('phone'); setOtp(''); setError(''); setSuccess('') }}
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
                <p className="font-medium text-gray-900 mb-6">
                  {country === 'in' ? '+91' : '+1'} {phone}
                </p>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm mb-4">
                    ✅ {success}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP code
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-2xl tracking-widest text-center font-semibold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 mb-2"
                    autoFocus
                  />

                  {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue →'}
                  </button>
                </form>

                <button
                  onClick={async () => {
                    setOtp('')
                    setError('')
                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent
                    await handleSendOtp(fakeEvent)
                  }}
                  disabled={loading}
                  className="text-sm text-orange-500 hover:text-orange-600 mt-4 mx-auto block font-medium disabled:text-gray-400"
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
