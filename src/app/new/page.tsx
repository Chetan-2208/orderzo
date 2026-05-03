"use client";

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { generateInvoicePDF } from '@/lib/generateInvoice'

interface Item {
  id: string
  name: string
  price: number
}

interface Customer {
  id: string
  name: string
  phone: string
}

interface Business {
  id: string
  business_name: string
  upi_id: string
}

interface CartItem {
  itemId: string
  name: string
  price: number
  quantity: number
}

function NewOrderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = (searchParams.get('mode') || 'order') as 'order' | 'bill'

  const [business, setBusiness] = useState<Business | null>(null)
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submittingMessage, setSubmittingMessage] = useState('')
  const [error, setError] = useState('')

  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi'>('cash')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) {
      router.push('/login')
      return
    }
    setPhone(savedPhone)

    loadData(savedPhone)
  }, [router])

  const loadData = async (phoneNum: string) => {
    const { data: businessData } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_phone', phoneNum)
      .single()

    if (!businessData) {
      router.push('/setup')
      return
    }

    setBusiness(businessData)

    const [{ data: itemsData }, { data: customersData }] = await Promise.all([
      supabase.from('items').select('*').eq('business_id', businessData.id).eq('active', true).order('created_at', { ascending: false }),
      supabase.from('customers').select('*').eq('business_id', businessData.id).order('last_order_date', { ascending: false, nullsFirst: false })
    ])

    if (itemsData) setItems(itemsData)
    if (customersData) setCustomers(customersData)
    setLoading(false)
  }

  const total = cart.reduce((sum, c) => sum + (c.price * c.quantity), 0)

  const updateQuantity = (item: Item, delta: number) => {
    const existing = cart.find(c => c.itemId === item.id)
    if (existing) {
      const newQty = existing.quantity + delta
      if (newQty <= 0) {
        setCart(cart.filter(c => c.itemId !== item.id))
      } else {
        setCart(cart.map(c => c.itemId === item.id ? { ...c, quantity: newQty } : c))
      }
    } else if (delta > 0) {
      setCart([...cart, { itemId: item.id, name: item.name, price: item.price, quantity: 1 }])
    }
  }

  const getQuantity = (itemId: string) => {
    return cart.find(c => c.itemId === itemId)?.quantity || 0
  }

  const handleAddCustomer = () => {
    if (!newCustomerName.trim()) {
      setError('Customer name required')
      return
    }
    const cleanPhone = newCustomerPhone.replace(/\D/g, '')
    if (cleanPhone && cleanPhone.length !== 10) {
      setError('Phone must be 10 digits or empty')
      return
    }
    setError('')
    setSelectedCustomer({
      id: 'new',
      name: newCustomerName.trim(),
      phone: cleanPhone
    })
    setShowAddCustomer(false)
  }

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.phone.includes(customerSearch)
  )

  const handleSubmit = async () => {
    setError('')

    if (mode === 'order' && !selectedCustomer) {
      setError('Please select or add a customer')
      return
    }

    if (mode === 'order' && selectedCustomer && !selectedCustomer.phone) {
      setError('Customer needs a phone number for WhatsApp')
      return
    }

    if (cart.length === 0) {
      setError('Please add at least one item')
      return
    }

    if (!business) return

    setSubmitting(true)

    try {
      setSubmittingMessage('Saving customer...')
      let customerId = selectedCustomer?.id

      if (selectedCustomer && selectedCustomer.id === 'new') {
        const { data: newCust, error: custError } = await supabase
          .from('customers')
          .insert({
            business_id: business.id,
            name: selectedCustomer.name,
            phone: selectedCustomer.phone || null,
          })
          .select()
          .single()

        if (custError) throw custError
        customerId = newCust.id
      }

      setSubmittingMessage('Creating order...')
      const orderStatus = mode === 'bill' && paymentMethod === 'cash' ? 'paid' : 'sent'

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          business_id: business.id,
          customer_id: customerId !== 'new' ? customerId : null,
          mode: mode,
          total: total,
          status: orderStatus,
          payment_method: mode === 'bill' ? paymentMethod : 'upi',
          paid_at: orderStatus === 'paid' ? new Date().toISOString() : null,
        })
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = cart.map(c => ({
        order_id: orderData.id,
        item_id: c.itemId,
        item_name: c.name,
        quantity: c.quantity,
        price_at_time: c.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      setSubmittingMessage('Generating PDF invoice...')
      let pdfUrl = ''
      try {
        pdfUrl = await generateInvoicePDF({
          orderId: orderData.id,
          businessName: business.business_name,
          businessPhone: phone,
          businessUpi: business.upi_id,
          customerName: selectedCustomer?.name || 'Walk-in customer',
          customerPhone: selectedCustomer?.phone,
          items: cart.map(c => ({
            name: c.name,
            quantity: c.quantity,
            price: c.price,
          })),
          total: total,
          mode: mode,
          paymentMethod: mode === 'bill' ? paymentMethod : 'upi',
          paymentStatus: orderStatus === 'paid' ? 'paid' : 'pending',
          date: new Date(),
        })
      } catch (pdfError: any) {
        console.error('PDF generation failed:', pdfError)
      }

      setSubmittingMessage('Opening WhatsApp...')
      const itemLines = cart.map(c => `• ${c.name} × ${c.quantity} = ₹${c.price * c.quantity}`).join('\n')
      const upiLink = `upi://pay?pa=${business.upi_id}&pn=${encodeURIComponent(business.business_name)}&am=${total}&cu=INR&tn=${encodeURIComponent('Order from ' + business.business_name)}`

      let message = ''
      if (mode === 'order') {
        message = `Namaste ${selectedCustomer?.name},\n\nAapka order *${business.business_name}* se confirm hua:\n${itemLines}\n\n💰 *Total: ₹${total}*\n\n📱 *Pay via UPI:*\n${upiLink}\n\n${pdfUrl ? `📄 *Invoice PDF:*\n${pdfUrl}\n\n` : ''}Dhanyavaad! 🙏\n— ${business.business_name}`
      } else {
        message = `🧾 *BILL — ${business.business_name}*\n\n${selectedCustomer?.name ? `Customer: ${selectedCustomer.name}\n` : ''}Date: ${new Date().toLocaleDateString('en-IN')}\nTime: ${new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}\n\n*ITEMS:*\n${itemLines}\n\n💰 *TOTAL: ₹${total}*\n${paymentMethod === 'cash' ? '✅ *PAID via Cash*' : '⏳ *Pay via UPI:* ' + upiLink}\n\n${pdfUrl ? `📄 *Invoice PDF:*\n${pdfUrl}\n\n` : ''}Thank you for shopping! 🙏\nVisit again — ${business.business_name}`
      }

      if (selectedCustomer && selectedCustomer.phone) {
        const cleanPhone = selectedCustomer.phone.replace(/\D/g, '')
        const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
        const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
      } else if (pdfUrl) {
        alert('Bill generated! PDF: ' + pdfUrl)
      }

      router.push('/dashboard')
    } catch (err: any) {
      console.error('Order error:', err)
      setError('Could not save: ' + (err.message || 'Unknown error'))
      setSubmitting(false)
      setSubmittingMessage('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-orange-500/30 animate-pulse">
          O
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
            <h1 className="font-bold text-gray-900">New {mode === 'order' ? 'Order' : 'Bill'}</h1>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Add items first</h2>
            <p className="text-gray-600 mb-6">You need to add menu items before creating orders or bills.</p>
            <Link href="/items" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600">
              Add Items →
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">
              {mode === 'order' ? '📦 New Order' : '🧾 New Bill'}
            </h1>
            <p className="text-xs text-gray-500">{business?.business_name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">
            Customer {mode === 'order' ? <span className="text-red-500">*</span> : <span className="text-gray-400 text-sm font-normal">(optional)</span>}
          </h3>

          {selectedCustomer ? (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
                {selectedCustomer.phone && (
                  <p className="text-xs text-gray-500">+91 {selectedCustomer.phone}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-sm text-gray-500 hover:text-red-500 px-2"
              >
                Change
              </button>
            </div>
          ) : showAddCustomer ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Customer name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                autoFocus
              />
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm">
                  +91
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="WhatsApp number (optional for bills)"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl font-medium hover:bg-orange-600"
                >
                  Add Customer
                </button>
                <button
                  onClick={() => { setShowAddCustomer(false); setNewCustomerName(''); setNewCustomerPhone(''); setError('') }}
                  className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search customers or add new"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 mb-2"
              />
              {customerSearch && filteredCustomers.length > 0 && (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {filteredCustomers.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCustomer(c); setCustomerSearch('') }}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <p className="font-medium text-gray-900">{c.name}</p>
                      {c.phone && <p className="text-xs text-gray-500">+91 {c.phone}</p>}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowAddCustomer(true)}
                className="w-full mt-2 py-2.5 border-2 border-dashed border-orange-300 text-orange-600 rounded-xl font-medium hover:bg-orange-50"
              >
                + Add new customer
              </button>
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Items <span className="text-red-500">*</span></h3>
          <div className="space-y-2">
            {items.map(item => {
              const qty = getQuantity(item.id)
              return (
                <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${qty > 0 ? 'border-orange-300 bg-orange-50' : 'border-gray-100'}`}>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-orange-500 font-semibold">₹{item.price}</p>
                  </div>
                  {qty === 0 ? (
                    <button
                      onClick={() => updateQuantity(item, 1)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
                    >
                      + Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-white rounded-lg border border-orange-300 p-1">
                      <button
                        onClick={() => updateQuantity(item, -1)}
                        className="w-8 h-8 rounded-md bg-orange-100 text-orange-600 font-bold hover:bg-orange-200"
                      >
                        −
                      </button>
                      <span className="font-bold text-gray-900 w-6 text-center">{qty}</span>
                      <button
                        onClick={() => updateQuantity(item, 1)}
                        className="w-8 h-8 rounded-md bg-orange-500 text-white font-bold hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {mode === 'bill' && cart.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
              >
                <div className="text-2xl mb-1">💵</div>
                <p className="font-medium text-gray-900 text-sm">Cash</p>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border-2 transition-all ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
              >
                <div className="text-2xl mb-1">📱</div>
                <p className="font-medium text-gray-900 text-sm">UPI</p>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-20">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600 text-sm">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
              <p className="text-2xl font-bold text-gray-900">₹{total}</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 disabled:bg-gray-300 disabled:shadow-none transition-colors"
            >
              {submitting ? (submittingMessage || 'Saving...') : (
                mode === 'order'
                  ? '📱 Send WhatsApp + PDF Invoice'
                  : selectedCustomer?.phone
                    ? '🧾 Generate PDF + Send WhatsApp'
                    : '🧾 Generate PDF Invoice'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl animate-pulse">O</div>
      </div>
    }>
      <NewOrderContent />
    </Suspense>
  )
}
