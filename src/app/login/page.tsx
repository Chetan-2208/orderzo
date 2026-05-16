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

      setSuccess('Test mode: use OTP 123456')
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
    <div className="min-h-screen bg-gradient-to-br from-[#F4F3FF] via-white to-[#EFEEFF] flex flex-col">
      <header className="px-4 sm:px-6 py-5">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Logo size={36} />
          <span className="text-xl font-bold text-gray-900">Orderzo</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 lg:order-1 order-1 max-w-md mx-auto w-full lg:max-w-none lg:mx-0">
            
            {step === 'phone' ? (
              <>
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold mb-6">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  Test mode — use OTP 123456
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-4">
                  Welcome to<br />
                  <span className="text-[#635BFF]">Orderzo.</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md">
                  Enter your mobile number to get started. In 2 minutes, you will be sending your first invoice.
                </p>

                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-[#635BFF]/10 border border-[#EFEEFF]">
                  <form onSubmit={handleSendOtp}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile number
                    </label>
                    <div className="flex gap-2 mb-2">
                      <div className="flex items-center px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold">
                        +91
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
                        autoFocus
                      />
                    </div>
                    
                    {error && (
                      <p className="text-red-500 text-sm mb-3">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || phone.length !== 10}
                      className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#635BFF]/30 hover:bg-[#4D44E0] transition-colors disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed mt-4"
                    >
                      {loading ? 'Sending...' : 'Send OTP →'}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-6">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="text-[#635BFF] hover:underline">Terms</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-[#635BFF] hover:underline">Privacy</Link>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center lg:justify-start mt-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><span className="text-green-600">✓</span><span>30 free invoices/month</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-green-600">✓</span><span>No credit card</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-green-600">✓</span><span>2-minute setup</span></div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setStep('phone'); setOtp(''); setError(''); setSuccess('') }}
                  className="text-sm text-gray-500 mb-6 hover:text-gray-700 inline-flex items-center gap-1"
                >
                  ← Change number
                </button>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-4">
                  Enter the<br />
                  <span className="text-[#635BFF]">6-digit code.</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-2">
                  We sent it to <span className="font-bold text-gray-900">+91 {phone}</span>
                </p>
                <p className="text-sm text-gray-500 mb-8">In test mode, the code is <span className="font-bold text-gray-900">123456</span>.</p>

                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-[#635BFF]/10 border border-[#EFEEFF]">
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm mb-4 font-medium">
                      ✅ {success}
                    </div>
                  )}

                  <form onSubmit={handleVerifyOtp}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      OTP code
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl text-3xl tracking-[0.5em] text-center font-bold text-gray-900 focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF] mb-2"
                      autoFocus
                    />

                    {error && (
                      <p className="text-red-500 text-sm mb-3">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#635BFF]/30 hover:bg-[#4D44E0] transition-colors disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
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
                    className="text-sm text-[#635BFF] hover:text-[#4D44E0] mt-5 mx-auto block font-semibold disabled:text-gray-400"
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-5 lg:order-2 hidden lg:block">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#635BFF]/20 to-purple-200/20 blur-3xl rounded-full"></div>
              
              <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#128C7E] rounded-full flex items-center justify-center text-lg font-bold">
                      🏪
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Your Shop</p>
                      <p className="text-[10px] text-white/70">online</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#ECE5DD] px-3 py-4 space-y-2 min-h-[380px]">
                    <div className="flex">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-900">Aaj 2 tiffin chahiye 🙏</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">12:34 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-2 max-w-[85%] shadow-sm">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                          <div className="bg-[#635BFF] text-white px-3 py-2">
                            <p className="text-[10px] font-semibold opacity-90">YOUR SHOP</p>
                            <p className="text-xs font-bold">Order #1234</p>
                          </div>
                          <div className="px-3 py-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Lunch tiffin × 2</span>
                              <span className="text-gray-900 font-semibold">₹200</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-3 py-2 flex justify-between items-center border-t border-gray-100">
                            <span className="text-xs text-gray-600">Total</span>
                            <span className="text-base font-bold text-gray-900">₹200</span>
                          </div>
                          <div className="bg-white px-3 py-2 border-t border-gray-100">
                            <button className="w-full bg-[#635BFF] text-white text-xs font-bold py-2 rounded-lg">
                              Pay via UPI →
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 text-right mt-1 px-1">12:34 PM ✓✓</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-900">Paid ✓</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">12:35 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6 max-w-xs mx-auto">
                In 2 minutes, this is what your customers see when you send them an invoice.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
