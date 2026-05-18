"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Business {
  id: string
  business_name: string
  business_type: string
  upi_id: string
  owner_phone: string
}

interface Customer {
  id: string
  name: string
  phone?: string
}

interface Item {
  id: string
  name: string
  price: number
}

function NewFastContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preFilledCustomerId = searchParams.get('customer')

  const [business, setBusiness] = useState<Business | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  // The 4 fields
  const [customerInput, setCustomerInput] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [whatBought, setWhatBought] = useState('')
  const [amount, setAmount] = useState('')
  const [payMethod, setPayMethod] = useState<'upi' | 'cash' | 'later'>('upi')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const phone = localStorage.getItem('orderzo_user_phone')
    if (!phone) { router.push('/login'); return }
    loadData(phone)
  }, [router])

  const loadData = async (phone: string) => {
    const { data: businessData } = await supabase
      .from('businesses').select('*').eq('owner_phone', phone).single()
    if (!businessData) { router.push('/setup'); return }
    setBusiness(businessData)

    const { data: customersData } = await supabase
      .from('customers').select('*').eq('business_id', businessData.id).order('name')
    if (customersData) setCustomers(customersData)

    const { data: itemsData } = await supabase
      .from('items').select('*').eq('business_id', businessData.id).order('name')
    if (itemsData) setItems(itemsData)

    if (preFilledCustomerId) {
      const c = customersData?.find(cust => cust.id === preFilledCustomerId)
      if (c) {
        setSelectedCustomer(c)
        setCustomerInput(c.name)
      }
    }

    setLoading(false)
  }

  // Customer suggestions based on input
  const customerSuggestions = customerInput.trim() && !selectedCustomer
    ? customers.filter(c => {
        const q = customerInput.toLowerCase().trim()
        return c.name.toLowerCase().includes(q) || c.phone?.includes(q)
      }).slice(0, 3)
    : []

  // Item suggestions based on what they typed
  const itemSuggestions = whatBought.trim()
    ? items.filter(i => i.name.toLowerCase().includes(whatBought.toLowerCase().trim())).slice(0, 3)
    : items.slice(0, 4)

  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c)
    setCustomerInput(c.name)
  }

  const handleClearCustomer = () => {
    setSelectedCustomer(null)
    setCustomerInput('')
  }

  const handlePickItem = (item: Item) => {
    setWhatBought(prev => prev ? `${prev}, ${item.name}` : item.name)
    if (!amount) setAmount(String(item.price))
  }

  const handleSend = async () => {
    if (!business) return

    // Validate
    if (!customerInput.trim()) { alert('Please enter customer name or phone'); return }
    if (!whatBought.trim()) { alert('Please enter what they bought'); return }
    const amt = parseFloat(amount)
    if (!amt || amt <= 0) { alert('Please enter a valid amount'); return }

    setSending(true)

    try {
      let customerId = selectedCustomer?.id || null
      let customerPhone = selectedCustomer?.phone || ''
      let customerName = selectedCustomer?.name || customerInput.trim()

      // If no customer selected, check if input looks like a phone or name
      if (!customerId) {
        const cleanInput = customerInput.replace(/\D/g, '')
        if (cleanInput.length === 10 && /^[6-9]/.test(cleanInput)) {
          // It's a phone — create new customer with this phone
          customerPhone = cleanInput
          customerName = 'Customer ' + cleanInput.slice(-4)
        } else {
          // It's a name — create new customer with name only
          customerName = customerInput.trim()
        }

        const { data: newCust, error: custErr } = await supabase
          .from('customers')
          .insert({
            business_id: business.id,
            name: customerName,
            phone: customerPhone || null,
          })
          .select()
          .single()

        if (custErr) {
          alert('Could not save customer: ' + custErr.message)
          setSending(false)
          return
        }
        if (newCust) customerId = newCust.id
      }

      // Create order
      const orderStatus = payMethod === 'cash' ? 'paid' : 'sent'
      const orderPayMethod = payMethod === 'cash' ? 'cash' : payMethod === 'upi' ? 'upi' : 'pending'

      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({
          business_id: business.id,
          customer_id: customerId,
          total: amt,
          status: orderStatus,
          payment_method: orderPayMethod,
          channel: 'whatsapp',
          mode: 'order',
          notes: whatBought.trim(),
        })
        .select()
        .single()

      if (orderErr) {
        alert('Could not create order: ' + orderErr.message)
        setSending(false)
        return
      }

      // Create order_items entry (single item with what they bought as name)
      if (order) {
        await supabase.from('order_items').insert({
          order_id: order.id,
          item_name: whatBought.trim(),
          quantity: 1,
          price_at_time: amt,
        })
      }

      // Send via WhatsApp
      const cleanPhone = (customerPhone || '').replace(/\D/g, '')
      const message = payMethod === 'upi' && business.upi_id
        ? `Hi ${customerName},\n\nYour bill from ${business.business_name}:\n${whatBought.trim()} — ₹${amt}\n\nPay via UPI: ${business.upi_id}\n\nThank you!`
        : `Hi ${customerName},\n\nYour bill from ${business.business_name}:\n${whatBought.trim()} — ₹${amt}\n\nThank you!`

      if (cleanPhone) {
        const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
        window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
      }

      // Redirect to dashboard with success
      router.push('/dashboard')
    } catch (e: any) {
      alert('Something went wrong: ' + (e?.message || 'Unknown'))
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>
  }

  return (
    <div className="min-h-screen bg-[#F4F3FF]/30 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-600 text-2xl">←</button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-lg">Quick invoice</h1>
            <p className="text-xs text-gray-500">Takes 10 seconds</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* FIELD 1: Customer */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">1.</span> Phone or name
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerInput}
              onChange={(e) => {
                setCustomerInput(e.target.value)
                if (selectedCustomer) setSelectedCustomer(null)
              }}
              placeholder="e.g. 9876543210 or Mr. Sharma"
              className="w-full px-4 py-3.5 text-base border border-gray-300 rounded-2xl bg-white focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
              autoFocus
            />
            {selectedCustomer && (
              <button
                onClick={handleClearCustomer}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            )}
          </div>
          {selectedCustomer && (
            <p className="text-sm text-green-600 mt-1.5 ml-1">✓ {selectedCustomer.name} {selectedCustomer.phone ? `(+91 ${selectedCustomer.phone})` : ''}</p>
          )}
          {customerSuggestions.length > 0 && (
            <div className="mt-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {customerSuggestions.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCustomer(c)}
                  className="w-full text-left px-4 py-3 hover:bg-[#F4F3FF] border-b border-gray-100 last:border-b-0"
                >
                  <p className="font-medium text-gray-900">{c.name}</p>
                  {c.phone && <p className="text-xs text-gray-500">+91 {c.phone}</p>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FIELD 2: What */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">2.</span> What did they buy?
          </label>
          <input
            type="text"
            value={whatBought}
            onChange={(e) => setWhatBought(e.target.value)}
            placeholder="e.g. 2 idli sambar, 1 dosa"
            className="w-full px-4 py-3.5 text-base border border-gray-300 rounded-2xl bg-white focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
          />
          {itemSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {itemSuggestions.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePickItem(item)}
                  className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:border-[#BDB9FF] hover:bg-[#F4F3FF]"
                >
                  {item.name} <span className="text-[#4D44E0] font-semibold">₹{item.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FIELD 3: Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">3.</span> How much?
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-medium">₹</span>
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3.5 text-2xl font-bold border border-gray-300 rounded-2xl bg-white focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
            />
          </div>
        </div>

        {/* FIELD 4: Pay method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">4.</span> How to pay?
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPayMethod('upi')}
              className={`py-4 px-2 rounded-2xl border-2 transition-all ${
                payMethod === 'upi'
                  ? 'border-[#635BFF] bg-[#F4F3FF] shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">📱</div>
              <div className={`text-sm font-medium ${payMethod === 'upi' ? 'text-[#3530B8]' : 'text-gray-700'}`}>UPI</div>
            </button>
            <button
              onClick={() => setPayMethod('cash')}
              className={`py-4 px-2 rounded-2xl border-2 transition-all ${
                payMethod === 'cash'
                  ? 'border-[#635BFF] bg-[#F4F3FF] shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">💵</div>
              <div className={`text-sm font-medium ${payMethod === 'cash' ? 'text-[#3530B8]' : 'text-gray-700'}`}>Cash</div>
            </button>
            <button
              onClick={() => setPayMethod('later')}
              className={`py-4 px-2 rounded-2xl border-2 transition-all ${
                payMethod === 'later'
                  ? 'border-[#635BFF] bg-[#F4F3FF] shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">⏳</div>
              <div className={`text-sm font-medium ${payMethod === 'later' ? 'text-[#3530B8]' : 'text-gray-700'}`}>Later</div>
            </button>
          </div>
        </div>

        {/* SEND */}
        <button
          onClick={handleSend}
          disabled={sending}
          className="w-full bg-[#635BFF] hover:bg-[#4D44E0] disabled:bg-[#BDB9FF] text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all active:scale-[0.99]"
        >
          {sending ? 'Sending...' : '📤 Send via WhatsApp'}
        </button>


      </main>
    </div>
  )
}

export default function NewFastPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <NewFastContent />
    </Suspense>
  )
}
