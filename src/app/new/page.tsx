"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { generateInvoicePDF } from '@/lib/generateInvoice'

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

interface CartItem {
  itemId: string | null
  name: string
  quantity: number
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

  const [customerInput, setCustomerInput] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const [cart, setCart] = useState<CartItem[]>([])
  const [quickName, setQuickName] = useState('')
  const [quickPrice, setQuickPrice] = useState('')

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

  const customerSuggestions = customerInput.trim() && !selectedCustomer
    ? customers.filter(c => {
        const q = customerInput.toLowerCase().trim()
        return c.name.toLowerCase().includes(q) || c.phone?.includes(q)
      }).slice(0, 3)
    : []

  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c)
    setCustomerInput(c.name)
  }

  const handleClearCustomer = () => {
    setSelectedCustomer(null)
    setCustomerInput('')
  }

  const addItemToCart = (item: Item) => {
    setCart(prev => {
      const existing = prev.find(c => c.itemId === item.id)
      if (existing) {
        return prev.map(c => c.itemId === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      }
      return [...prev, { itemId: item.id, name: item.name, quantity: 1, price: item.price }]
    })
  }

  const handleQuickAdd = () => {
    const name = quickName.trim()
    const price = parseFloat(quickPrice)
    if (!name) { alert('Enter an item name'); return }
    if (!price || price <= 0) { alert('Enter a valid price'); return }
    setCart(prev => [...prev, { itemId: null, name, quantity: 1, price }])
    setQuickName('')
    setQuickPrice('')
  }

  const changeQty = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev]
      newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + delta }
      if (newCart[index].quantity <= 0) {
        return newCart.filter((_, i) => i !== index)
      }
      return newCart
    })
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const total = cart.reduce((sum, c) => sum + (c.quantity * c.price), 0)
  const availableItemChips = items.filter(i => !cart.find(c => c.itemId === i.id)).slice(0, 6)

  const handleSend = async () => {
    if (!business) return
    if (!customerInput.trim()) { alert('Please enter customer name or phone'); return }
    if (cart.length === 0) { alert('Add at least one item'); return }

    setSending(true)

    try {
      let customerId = selectedCustomer?.id || null
      let customerPhone = selectedCustomer?.phone || ''
      let customerName = selectedCustomer?.name || customerInput.trim()

      if (!customerId) {
        const cleanInput = customerInput.replace(/\D/g, '')
        if (cleanInput.length === 10 && /^[6-9]/.test(cleanInput)) {
          customerPhone = cleanInput
          customerName = 'Customer ' + cleanInput.slice(-4)
        } else {
          customerName = customerInput.trim()
        }

        const { data: newCust, error: custErr } = await supabase
          .from('customers')
          .insert({ business_id: business.id, name: customerName, phone: customerPhone || null })
          .select()
          .single()

        if (custErr) { alert('Could not save customer: ' + custErr.message); setSending(false); return }
        if (newCust) customerId = newCust.id
      }

      const notesText = cart.map(c => c.name + ' x ' + c.quantity).join(', ')
      const orderStatus = payMethod === 'cash' ? 'paid' : 'sent'
      const orderPayMethod = payMethod === 'cash' ? 'cash' : payMethod === 'upi' ? 'upi' : 'pending'

      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({
          business_id: business.id,
          customer_id: customerId,
          total: total,
          status: orderStatus,
          payment_method: orderPayMethod,
          channel: 'whatsapp',
          mode: 'order',
          notes: notesText,
        })
        .select()
        .single()

      if (orderErr) { alert('Could not create order: ' + orderErr.message); setSending(false); return }

      if (order) {
        const rows = cart.map(c => ({
          order_id: order.id,
          item_name: c.name,
          quantity: c.quantity,
          price_at_time: c.price,
        }))
        const { error: itemsErr } = await supabase.from('order_items').insert(rows)
        if (itemsErr) console.error('Order items error:', itemsErr.message)
      }

      let pdfUrl = ''
      try {
        pdfUrl = await generateInvoicePDF({
          orderId: order.id,
          businessName: business.business_name,
          businessPhone: business.owner_phone,
          businessUpi: business.upi_id || '',
          customerName,
          customerPhone: customerPhone || undefined,
          items: cart.map(c => ({ name: c.name, quantity: c.quantity, price: c.price })),
          total: total,
          mode: 'order',
          paymentMethod: payMethod === 'cash' ? 'cash' : 'upi',
          paymentStatus: payMethod === 'cash' ? 'paid' : 'pending',
          date: new Date(),
        })
      } catch (e: any) {
        console.error('PDF generation error:', e?.message)
      }

      if (pdfUrl && order?.id) {
        try { await supabase.from('orders').update({ pdf_url: pdfUrl }).eq('id', order.id) }
        catch (e: any) { console.error('Could not save pdf_url:', e?.message) }
      }

      const shortId = order?.id?.slice(0, 8) || ''
      const shortPdfUrl = shortId ? 'https://orderzo.io/i/' + shortId : pdfUrl

      const cleanPhone = (customerPhone || '').replace(/\D/g, '')
      const upiLink = payMethod === 'upi' && business.upi_id
        ? 'upi://pay?pa=' + business.upi_id + '&pn=' + encodeURIComponent(business.business_name) + '&am=' + total + '&cu=INR&tn=' + encodeURIComponent('Order from ' + business.business_name)
        : ''

      const itemLines = cart.map(c => '- ' + c.name + ' x ' + c.quantity + ' = Rs.' + (c.quantity * c.price)).join('\n')
      let message = 'Hi ' + customerName + ',\n\nYour order from *' + business.business_name + '* is confirmed:\n\n' + itemLines + '\n\n*TOTAL: Rs.' + total + '*\n'
      if (upiLink) message += '\nPay via UPI:\n' + upiLink + '\n'
      if (pdfUrl) message += '\nInvoice:\n' + shortPdfUrl + '\n'
      message += '\nThank you!\n\n_Sent via Orderzo \u00b7 orderzo.io_'

      if (cleanPhone) {
        const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
        window.open('https://wa.me/' + fullPhone + '?text=' + encodeURIComponent(message), '_blank')
      } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank')
      }

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
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-600 text-2xl">←</button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-lg">Quick invoice</h1>
            <p className="text-xs text-gray-500">Add items, send via WhatsApp</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">1.</span> Phone or name
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerInput}
              onChange={(e) => { setCustomerInput(e.target.value); if (selectedCustomer) setSelectedCustomer(null) }}
              placeholder="e.g. 9876543210 or Mr. Sharma"
              className="w-full px-4 py-3.5 text-base border border-gray-300 rounded-2xl bg-white focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#EFEEFF]"
              autoFocus
            />
            {selectedCustomer && (
              <button onClick={handleClearCustomer} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl">×</button>
            )}
          </div>
          {selectedCustomer && (
            <p className="text-sm text-green-600 mt-1.5 ml-1">✓ {selectedCustomer.name} {selectedCustomer.phone ? '(+91 ' + selectedCustomer.phone + ')' : ''}</p>
          )}
          {customerSuggestions.length > 0 && (
            <div className="mt-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {customerSuggestions.map(c => (
                <button key={c.id} onClick={() => handleSelectCustomer(c)} className="w-full text-left px-4 py-3 hover:bg-[#F4F3FF] border-b border-gray-100 last:border-b-0">
                  <p className="font-medium text-gray-900">{c.name}</p>
                  {c.phone && <p className="text-xs text-gray-500">+91 {c.phone}</p>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">2.</span> Add items
          </label>

          {availableItemChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {availableItemChips.map(item => (
                <button key={item.id} onClick={() => addItemToCart(item)} className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-full hover:border-[#BDB9FF] hover:bg-[#F4F3FF] active:scale-95 transition-all">
                  + {item.name} <span className="text-[#4D44E0] font-semibold">₹{item.price}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-stretch">
            <input type="text" value={quickName} onChange={(e) => setQuickName(e.target.value)} placeholder="Item name" className="flex-1 min-w-0 px-3 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-[#635BFF]" />
            <div className="relative w-24">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
              <input type="number" inputMode="decimal" value={quickPrice} onChange={(e) => setQuickPrice(e.target.value)} placeholder="0" className="w-full pl-7 pr-2 py-3 text-sm font-semibold border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-[#635BFF]" />
            </div>
            <button onClick={handleQuickAdd} className="px-4 py-3 bg-[#635BFF] hover:bg-[#4D44E0] text-white text-sm font-bold rounded-xl active:scale-95 transition-all">+ Add</button>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</p>
              <button onClick={() => setCart([])} className="text-xs text-gray-400 hover:text-red-500">Clear</button>
            </div>
            <div className="space-y-2.5">
              {cart.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500">₹{c.price} × {c.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#F4F3FF] rounded-lg p-0.5">
                    <button onClick={() => changeQty(i, -1)} className="w-7 h-7 flex items-center justify-center text-[#635BFF] font-bold hover:bg-white rounded-md active:scale-95">−</button>
                    <span className="w-6 text-center text-sm font-bold text-gray-900">{c.quantity}</span>
                    <button onClick={() => changeQty(i, 1)} className="w-7 h-7 flex items-center justify-center text-[#635BFF] font-bold hover:bg-white rounded-md active:scale-95">+</button>
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-sm font-bold text-gray-900">₹{(c.quantity * c.price).toLocaleString('en-IN')}</p>
                  </div>
                  <button onClick={() => removeFromCart(i)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 text-lg">×</button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
              <p className="text-base font-semibold text-gray-700">Total</p>
              <p className="text-2xl font-extrabold text-[#635BFF]">₹{total.toLocaleString('en-IN')}</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-[#635BFF]">3.</span> How to pay?
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setPayMethod('upi')} className={`py-4 px-2 rounded-2xl border-2 transition-all ${payMethod === 'upi' ? 'border-[#635BFF] bg-[#F4F3FF] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="text-2xl mb-1">📱</div>
              <div className={`text-sm font-medium ${payMethod === 'upi' ? 'text-[#3530B8]' : 'text-gray-700'}`}>UPI</div>
            </button>
            <button onClick={() => setPayMethod('cash')} className={`py-4 px-2 rounded-2xl border-2 transition-all ${payMethod === 'cash' ? 'border-[#635BFF] bg-[#F4F3FF] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="text-2xl mb-1">💵</div>
              <div className={`text-sm font-medium ${payMethod === 'cash' ? 'text-[#3530B8]' : 'text-gray-700'}`}>Cash</div>
            </button>
            <button onClick={() => setPayMethod('later')} className={`py-4 px-2 rounded-2xl border-2 transition-all ${payMethod === 'later' ? 'border-[#635BFF] bg-[#F4F3FF] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
              <div className="text-2xl mb-1">⏳</div>
              <div className={`text-sm font-medium ${payMethod === 'later' ? 'text-[#3530B8]' : 'text-gray-700'}`}>Later</div>
            </button>
          </div>
        </div>

        <button onClick={handleSend} disabled={sending || cart.length === 0} className="w-full bg-[#635BFF] hover:bg-[#4D44E0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all active:scale-[0.99]">
          {sending ? 'Sending...' : cart.length === 0 ? 'Add items to send' : `📤 Send invoice (₹${total.toLocaleString('en-IN')})`}
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
