"use client";

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SetupPage() {
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [upiId, setUpiId] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) {
      router.push('/login')
      return
    }
    setPhone(savedPhone)

    // Check if business already exists (edit mode vs new setup)
    supabase
      .from('businesses')
      .select('*')
      .eq('owner_phone', savedPhone)
      .single()
      .then(({ data }) => {
        if (data) {
          setIsEditMode(true)
          setBusinessName(data.business_name || '')
          setBusinessType(data.business_type || '')
          setUpiId(data.upi_id || '')
        }
        setPageLoading(false)
      })
  }, [router])

  const businessTypes = [
    { id: 'tiffin', label: '🍱 Tiffin / Cloud Kitchen', desc: 'Home cooking, meal delivery' },
    { id: 'retail', label: '🛍️ Retail Shop', desc: 'Clothing, mobile, kirana, etc.' },
    { id: 'salon', label: '💇 Salon / Spa', desc: 'Hair, beauty, wellness' },
    { id: 'food', label: '🍽️ Restaurant / Cafe', desc: 'Food service, sweets, bakery' },
    { id: 'services', label: '🔧 Services', desc: 'Repair, tutoring, freelance' },
    { id: 'other', label: '📦 Other', desc: 'Anything else' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!businessName.trim()) {
      setError('Please enter your business name')
      return
    }
    if (!businessType) {
      setError('Please select a business type')
      return
    }
    if (!upiId.trim() || !upiId.includes('@')) {
      setError('Please enter a valid UPI ID (e.g., yourname@paytm)')
      return
    }

    setLoading(true)

    try {
      const { error: insertError } = await supabase
        .from('businesses')
        .upsert({
          owner_phone: phone,
          business_name: businessName.trim(),
          business_type: businessType,
          upi_id: upiId.trim(),
        }, {
          onConflict: 'owner_phone'
        })

      if (insertError) {
        console.error('Supabase error:', insertError)
        setError('Could not save: ' + insertError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch (err) {
      console.error('Error:', err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <header className="px-6 py-6 sm:px-10 border-b border-orange-100 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          {isEditMode && (
            <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
          )}
          <Link href={isEditMode ? "#" : "/"} className="flex items-center gap-2">
            <Logo size={40} />
            <span className="text-2xl font-bold text-gray-900">Orderzo</span>
          </Link>
        </div>
      </header>

      <main className="px-6 py-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <p className="text-orange-500 text-sm font-medium mb-2">
            {isEditMode ? '⚙️ Edit your business info' : 'Step 1 of 1 · Setup your business'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {isEditMode ? 'Update business details' : 'Tell us about your business'}
          </h1>
          <p className="text-gray-600">
            {isEditMode 
              ? 'Make changes and tap Save when done.' 
              : 'This will only take a minute. You can change it later.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Business Name <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              This is the name customers will see on bills and orders
            </p>
            <input
              type="text"
              placeholder="e.g., Sharma Tiffin Service"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              maxLength={50}
              autoFocus={!isEditMode}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Business Type <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Pick what fits closest. We'll customize Orderzo for you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {businessTypes.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setBusinessType(type.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    businessType === type.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-orange-200'
                  }`}
                >
                  <div className="font-medium text-gray-900 mb-1">{type.label}</div>
                  <div className="text-xs text-gray-500">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              UPI ID <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Where customers send payments. Looks like: yourname@paytm or 9876543210@upi
            </p>
            <input
              type="text"
              placeholder="yourname@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value.toLowerCase().trim())}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Phone (locked, for reference only) */}
          {isEditMode && (
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number 🔒
              </label>
              <p className="text-xs text-gray-500 mb-2">
                This is your login identity. Cannot be changed.
              </p>
              <p className="text-lg font-medium text-gray-700">+91 {phone}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {loading 
              ? 'Saving...' 
              : isEditMode 
                ? 'Save Changes' 
                : 'Continue to Dashboard →'}
          </button>

          {isEditMode && (
            <Link
              href="/dashboard"
              className="block w-full text-center py-3 text-gray-500 text-sm hover:text-gray-700"
            >
              Cancel
            </Link>
          )}

          <p className="text-xs text-gray-500 text-center">
            Logged in as +91 {phone}
          </p>
        </form>
      </main>
    </div>
  )
}
