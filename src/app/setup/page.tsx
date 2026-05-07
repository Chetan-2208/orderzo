"use client";

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

export default function SetupPage() {
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState('tiffin')
  const [tagline, setTagline] = useState('')
  const [upiId, setUpiId] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [gstin, setGstin] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    
    supabase
      .from('businesses')
      .select('*')
      .eq('owner_phone', savedPhone)
      .single()
      .then(({ data }) => {
        if (data) {
          setIsEdit(true)
          setBusinessType((data as any)?.business_type || 'other')
      setBusinessName(data.business_name || '')
          setBusinessType(data.business_type || 'tiffin')
          setTagline(data.tagline || '')
          setUpiId(data.upi_id || '')
          setAddress(data.address || '')
          setEmail(data.email || '')
          setGstin(data.gstin || '')
          setLogoUrl(data.logo_url || '')
          setTermsAccepted(!!data.terms_accepted_at)
        }
      })
  }, [router])

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG)')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Logo must be under 2MB')
      return
    }

    setLogoUploading(true)
    setError('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${phone}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName)

      setLogoUrl(urlData.publicUrl)
    } catch (e: any) {
      setError('Could not upload logo: ' + (e.message || 'unknown error'))
    }

    setLogoUploading(false)
  }

  const handleRemoveLogo = () => {
    setLogoUrl('')
  }

  const handleSubmit = async () => {
    setError('')
    if (!businessName.trim()) { setError('Business name is required'); return }
    if (!upiId.trim()) { setError('UPI ID is required'); return }
    if (!termsAccepted) { setError('Please accept the Terms of Service'); return }
    if (!upiId.includes('@')) { setError('UPI ID should look like name@bank (e.g., chaitu.33@ybl)'); return }
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Please enter a valid email address'); return }
    if (gstin && gstin.length !== 15) { setError('GSTIN must be exactly 15 characters (or leave empty)'); return }

    setLoading(true)

    const payload: any = {
      owner_phone: phone,
      business_name: businessName.trim(),
      business_type: businessType,
      tagline: tagline.trim() || null,
      upi_id: upiId.trim(),
      address: address.trim() || null,
      email: email.trim() || null,
      gstin: gstin.trim().toUpperCase() || null,
      logo_url: logoUrl || null,
      terms_accepted_at: new Date().toISOString(),
    }

    if (isEdit) {
      const { error: updateError } = await supabase
        .from('businesses').update(payload).eq('owner_phone', phone)
      if (updateError) {
        setError('Could not update: ' + updateError.message)
        setLoading(false)
        return
      }
    } else {
      const { error: insertError } = await supabase
        .from('businesses').insert(payload)
      if (insertError) {
        setError('Could not save: ' + insertError.message)
        setLoading(false)
        return
      }
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Logo size={56} />
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-1">
            {isEdit ? 'Edit your business' : 'Build your business profile'}
          </h1>
          <p className="text-sm text-gray-600">Make your shop look like a real brand</p>
        </div>

        {/* Phone verified badge */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-center gap-3">
          <span className="text-xl">✓</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-700">Phone verified</p>
            <p className="text-xs text-green-600">+91 {phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
          {/* Logo upload - the killer feature */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Your business logo <span className="text-orange-500 text-xs font-normal">⭐ recommended</span>
            </label>
            
            {logoUrl ? (
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-2xl border-2 border-orange-200 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium">Logo uploaded</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-orange-500 hover:underline"
                  >
                    Change logo
                  </button>
                  <span className="text-xs text-gray-400 mx-2">·</span>
                  <button
                    onClick={handleRemoveLogo}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={logoUploading}
                className="w-full bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-dashed border-orange-300 rounded-2xl p-5 text-center hover:border-orange-500 transition-colors disabled:opacity-50"
              >
                {logoUploading ? (
                  <>
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Uploading...</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-sm text-gray-900 font-semibold mb-1">Upload your logo</p>
                    <p className="text-xs text-gray-500">Stand out from other shops · PNG or JPG · Max 2MB</p>
                  </>
                )}
              </button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">Your logo appears on every invoice & dashboard</p>
          </div>

          {/* Business name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Business name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Padma's Kitchen"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Tagline <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Homemade Andhra pickles since 2010"
              value={tagline}
              onChange={(e) => setTagline(e.target.value.slice(0, 60))}
              maxLength={60}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">A short line that describes your business · {60 - tagline.length} characters left</p>
          </div>

          {/* Business type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              What kind of business? <span className="text-red-500">*</span>
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500"
            >
              <option value="cloud_kitchen">🍳 Cloud Kitchen / Restaurant</option>
                  <option value="tiffin">🍱 Tiffin / Food Service</option>
                  <option value="bakery">🎂 Home Bakery / Sweets</option>
                  <option value="retail">🛒 Kirana / Retail Shop</option>
                  <option value="salon">💇 Salon / Beauty</option>
                  <option value="tutor">📚 Tutor / Coaching</option>
                  <option value="freelancer">💼 Freelancer / Service</option>
                  <option value="other">📌 Other</option>
            </select>
          </div>

          {/* UPI ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              UPI ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., chaitu.33@ybl"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">Where customer payments will go</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Business address <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="e.g., Plot 45, Banjara Hills, Hyderabad"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Appears on invoices · Builds customer trust</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Email <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <input
              type="email"
              placeholder="e.g., padma@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">For receipts and account recovery</p>
          </div>

          {/* GSTIN */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              GSTIN <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="15-character GST number"
              value={gstin}
              onChange={(e) => setGstin(e.target.value.toUpperCase().slice(0, 15))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 font-mono"
            />
            <p className="text-xs text-gray-500 mt-1">Only if your business is GST-registered</p>
          </div>

          {/* Terms */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 accent-orange-500 cursor-pointer flex-shrink-0"
              />
              <span className="text-sm text-gray-700">
                I agree to Orderzo's{' '}
                <Link href="/terms" target="_blank" className="text-orange-600 underline font-medium">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" target="_blank" className="text-orange-600 underline font-medium">Privacy Policy</Link>
              </span>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !termsAccepted}
            className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : (isEdit ? 'Save changes' : 'Continue to dashboard →')}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Your data is securely stored in Mumbai · DPDP Act compliant
        </p>
      </div>
    </div>
  )
}
