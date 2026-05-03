"use client";

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'
import { generateInvoicePDF } from '@/lib/generateInvoice'

interface Business {
  id: string
  business_name: string
  business_type: string
  upi_id: string
  owner_phone: string
}

interface Item {
  id: string
  name: string
  price: number
}

interface Customer {
  id: string
  name: string
  phone?: string
}

interface OrderItem {
  itemId: string
  name: string
  quantity: number
  price: number
}

function NewOrderContent() {
  const searchParams = useSearchParams()
  const mode = (searchParams.get('mode') || 'order') as 'order' | 'bill'
  
  const [business, setBusiness] = useState<Business | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi'>('upi')
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

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

    const { data: itemsData } = await supabase
      .from('items').select('*').eq('business_id', businessData.id).order('name')
    if (itemsData) setItems(itemsData)

    const { data: customersData } = await supabase
      .from('customers').select('*').eq('business_id', businessData.id).order('name')
    if (customersData) setCustomers(customersData)

    if (mode === 'bill') {
      setSelectedCustomer({ id: 'walk-in', name: 'Walk-in customer' })
    }

    setLoading(false)
  }

  const handleAddItem = (item: Item) => {
    const existing = orderItems.find(oi => oi.itemId === item.id)
    if (existing) {
      setOrderItems(orderItems.map(oi => 
        oi.itemId === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
      ))
    } else {
      setOrderItems([...orderItems, {
        itemId: item.id, name: item.name, quantity: 1, price: item.price
      }])
    }
  }

  const handleQtyChange = (itemId: string, delta: number) => {
    setOrderItems(orderItems.map(oi => {
      if (oi.itemId === itemId) {
        const newQty = oi.quantity + delta
        if (newQty <= 0) return null
        return { ...oi, quantity: newQty }
      }
      return oi
    }).filter(Boolean) as OrderItem[])
  }

  const handleAddCustomer = async () => {
    if (!newCustomerName.trim()) { setError('Name required'); return }
    const cleanPhone = newCustomerPhone.replace(/\D/g, '')
    if (cleanPhone && cleanPhone.length !== 10) { setError('Phone must be 10 digits or empty'); return }
    if (!business) return

    const { data, error: insertError } = await supabase
      .from('customers')
      .insert({ business_id: business.id, name: newCustomerName.trim(), phone: cleanPhone || null })
      .select().single()

    if (insertError) { setError('Could not add: ' + insertError.message); return }

    if (data) {
      setCustomers([data, ...customers])
      setSelectedCustomer(data)
      setNewCustomerName('')
      setNewCustomerPhone('')
      setShowAddCustomer(false)
      setError('')
    }
  }

  const total = orderItems.reduce((sum, oi) => sum + oi.price * oi.quantity, 0)

  const handleSubmit = async () => {
    setError('')
    if (!business) return
    if (!selectedCustomer) { setError('Please select a customer'); return }
    if (orderItems.length === 0) { setError('Please add at least one item'); return }

    setSubmitting(true)

    try {
      // Create order
      const orderData: any = {
        business_id: business.id,
        total: total,
        mode: mode,
        payment_method: paymentMethod,
        status: paymentMethod === 'cash' ? 'paid' : 'sent',
      }
      if (selectedCustomer.id !== 'walk-in') {
        orderData.customer_id = selectedCustomer.id
      }
      if (paymentMethod === 'cash') {
        orderData.paid_at = new Date().toISOString()
      }

      const { data: order, error: orderError } = await supabase
        .from('orders').insert(orderData).select().single()

      if (orderError || !order) throw new Error('Could not create order: ' + orderError?.message)

      // Insert order items
      const itemRows = orderItems.map(oi => ({
        order_id: order.id,
        item_id: oi.itemId,
        item_name: oi.name,
        quantity: oi.quantity,
        price: oi.price,
      }))
      await supabase.from('order_items').insert(itemRows)

      // Create Razorpay payment link if UPI mode
      let paymentUrl = ''
      if (paymentMethod === 'upi' && selectedCustomer.id !== 'walk-in') {
        try {
          const customerPhone = selectedCustomer.phone || ''
          const linkRes = await fetch('/api/payments/create-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: order.id,
              amount: total,
              customerName: selectedCustomer.name,
              customerPhone: customerPhone,
              businessName: business.business_name,
            }),
          })
          if (linkRes.ok) {
            const linkData = await linkRes.json()
            paymentUrl = linkData.short_url || ''
            if (paymentUrl) {
              await supabase
                .from('orders')
                .update({ razorpay_payment_url: paymentUrl, razorpay_payment_link_id: linkData.id })
                .eq('id', order.id)
            }
          }
        } catch (e) { console.error('Razorpay error:', e) }
      }

      // Generate PDF invoice
      let pdfUrl = ''
      try {
        pdfUrl = await generateInvoicePDF({
          orderId: order.id,
          businessName: business.business_name,
          businessPhone: business.owner_phone,
          businessUpi: business.upi_id,
          customerName: selectedCustomer.name,
          customerPhone: selectedCustomer.phone,
          items: orderItems.map(oi => ({ name: oi.name, quantity: oi.quantity, price: oi.price })),
          total: total,
          mode: mode,
          paymentMethod: paymentMethod,
          paymentStatus: paymentMethod === 'cash' ? 'paid' : 'pending',
          date: new Date(),
          paymentUrl: paymentUrl,
        })
      } catch (e) { console.error('PDF error:', e) }

      // Generate UPI deep link
      const upiLink = paymentMethod === 'upi'
        ? `upi://pay?pa=${business.upi_id}&pn=${encodeURIComponent(business.business_name)}&am=${total}&cu=INR&tn=${encodeURIComponent('Order from ' + business.business_name)}`
        : ''

      // Build WhatsApp message — CLEAN, no broken emojis
      const itemLines = orderItems.map(oi => `- ${oi.name} x ${oi.quantity} = Rs.${oi.price * oi.quantity}`).join('\n')
      const dateStr = new Date().toLocaleDateString('en-IN')
      const timeStr = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })

      let message = ''
      
      if (mode === 'bill') {
        message = `*BILL - ${business.business_name}*\n\nCustomer: ${selectedCustomer.name}\nDate: ${dateStr}\nTime: ${timeStr}\n\nITEMS:\n${itemLines}\n\n*TOTAL: Rs.${total}*\n`
        
        if (paymentMethod === 'cash') {
          message += `\nPayment: CASH (received)\n`
        } else {
          if (paymentUrl) {
            message += `\nPay securely (UPI/Card/NetBanking):\n${paymentUrl}\n`
          }
          if (upiLink) {
            message += `\nOr pay via UPI:\n${upiLink}\n`
          }
        }
        
        if (pdfUrl) {
          message += `\nInvoice PDF:\n${pdfUrl}\n`
        }
        
        message += `\nThank you for shopping!\nVisit ${business.business_name} again.`
      } else {
        message = `Hi ${selectedCustomer.name},\n\nYour order from *${business.business_name}* is confirmed:\n\n${itemLines}\n\n*TOTAL: Rs.${total}*\n`
        
        if (paymentUrl) {
          message += `\nPay securely (UPI/Card/NetBanking):\n${paymentUrl}\n`
        }
        if (upiLink) {
          message += `\nOr pay via UPI:\n${upiLink}\n`
        }
        if (pdfUrl) {
          message += `\nInvoice PDF:\n${pdfUrl}\n`
        }
        
        message += `\nThank you!\n- ${business.business_name}`
      }

      // Open WhatsApp
      if (selectedCustomer.phone) {
        const cleanPhone = selectedCustomer.phone.replace(/\D/g, '')
        const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
        window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
      }

      router.push('/dashboard')
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">{mode === 'bill' ? 'New Bill' : 'New Order'}</h1>
            <p className="text-xs text-gray-500">{business?.business_name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Customer Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Customer</h3>
          
          {selectedCustomer ? (
            <div className="flex items-center justify-between bg-orange-50 border-2 border-orange-200 rounded-xl p-3">
              <div>
                <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                {selectedCustomer.phone && <p className="text-xs text-gray-500">+91 {selectedCustomer.phone}</p>}
              </div>
              {mode === 'order' && (
                <button onClick={() => setSelectedCustomer(null)} className="text-orange-500 text-sm">Change</button>
              )}
            </div>
          ) : showAddCustomer ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Customer name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500"
                autoFocus
              />
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm">+91</div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Phone (optional)"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAddCustomer} className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl font-medium">Add</button>
                <button onClick={() => { setShowAddCustomer(false); setNewCustomerName(''); setNewCustomerPhone('') }} className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => setShowAddCustomer(true)}
                className="w-full bg-orange-500 text-white py-2.5 rounded-xl font-medium"
              >
                + Add new customer
              </button>
              {customers.length > 0 && (
                <>
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-orange-500"
                  />
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {filteredCustomers.slice(0, 10).map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCustomer(c)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                      >
                        <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                        {c.phone && <p className="text-xs text-gray-500">+91 {c.phone}</p>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Items Section */}
        {items.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p className="text-sm text-yellow-800 mb-2">No items yet. Add some first.</p>
            <Link href="/items" className="text-orange-600 font-medium text-sm">Add items →</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Add Items</h3>
            <div className="grid grid-cols-2 gap-2">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item)}
                  className="text-left bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-3 transition-all"
                >
                  <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                  <p className="text-xs text-orange-500 font-bold">Rs.{item.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Order Items */}
        {orderItems.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {orderItems.map(oi => (
                <div key={oi.itemId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{oi.name}</p>
                    <p className="text-xs text-gray-500">Rs.{oi.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQtyChange(oi.itemId, -1)} className="w-7 h-7 bg-gray-200 rounded-full text-gray-700 font-bold">-</button>
                    <span className="font-semibold w-6 text-center">{oi.quantity}</span>
                    <button onClick={() => handleQtyChange(oi.itemId, 1)} className="w-7 h-7 bg-orange-500 rounded-full text-white font-bold">+</button>
                  </div>
                  <p className="font-bold text-orange-500 ml-3 w-16 text-right">Rs.{oi.price * oi.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-900">TOTAL</span>
              <span className="text-2xl font-bold text-orange-500">Rs.{total}</span>
            </div>
          </div>
        )}

        {/* Payment Method */}
        {orderItems.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">📱</div>
                <p className="font-semibold text-sm">UPI / Card</p>
                <p className="text-xs text-gray-500">Send payment link</p>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">💵</div>
                <p className="font-semibold text-sm">Cash</p>
                <p className="text-xs text-gray-500">Already paid</p>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </main>

      {/* Submit Button */}
      {orderItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-20">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={submitting || !selectedCustomer}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Processing...' : `${mode === 'bill' ? 'Send Bill' : 'Send Order'} - Rs.${total}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-orange-50 flex items-center justify-center"><Logo size={64} /></div>}>
      <NewOrderContent />
    </Suspense>
  )
}
