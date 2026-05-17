"use client";

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

interface Item {
  id: string
  name: string
  price: number
}

interface OrderItem {
  id?: string
  item_id?: string
  itemId?: string
  name: string
  item_name?: string
  quantity: number
  price: number
}

interface Customer {
  id: string
  name: string
  phone?: string
}

interface Business {
  id: string
  business_name: string
}

export default function EditOrderPage() {
  const params = useParams()
  const orderId = params.id as string
  const router = useRouter()

  const [business, setBusiness] = useState<Business | null>(null)
  const [order, setOrder] = useState<any>(null)
  const [items, setItems] = useState<Item[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi'>('upi')
  const [status, setStatus] = useState<string>('sent')
  const [showCustomerPicker, setShowCustomerPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const phone = localStorage.getItem('orderzo_user_phone')
    if (!phone) { router.push('/login'); return }
    loadOrder(phone)
  }, [router, orderId])

  const loadOrder = async (phone: string) => {
    const { data: businessData } = await supabase
      .from('businesses').select('*').eq('owner_phone', phone).single()
    if (!businessData) { router.push('/setup'); return }
    setBusiness(businessData)

    // Load this order with its items + customer
    const { data: orderData } = await supabase
      .from('orders')
      .select('*, customers(id, name, phone), order_items(*)')
      .eq('id', orderId)
      .single()
    
    if (!orderData) { router.push('/orders'); return }
    setOrder(orderData)
    setPaymentMethod(orderData.payment_method || 'upi')
    setStatus(orderData.status)
    
    if (orderData.customers) {
      setSelectedCustomer({
        id: orderData.customers.id,
        name: orderData.customers.name,
        phone: orderData.customers.phone,
      })
    } else {
      setSelectedCustomer({ id: 'walk-in', name: 'Walk-in customer' })
    }

    // Set order items
    const oiList = (orderData.order_items || []).map((oi: any) => ({
      id: oi.id,
      itemId: oi.item_id,
      name: oi.item_name,
      quantity: oi.quantity,
      price: parseFloat(oi.price_at_time),
    }))
    setOrderItems(oiList)

    // Load all items + customers for picker
    const { data: itemsData } = await supabase
      .from('items').select('*').eq('business_id', businessData.id).order('name')
    if (itemsData) setItems(itemsData)

    const { data: customersData } = await supabase
      .from('customers').select('*').eq('business_id', businessData.id).order('name')
    if (customersData) setCustomers(customersData)

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
        itemId: item.id,
        name: item.name,
        quantity: 1,
        price: item.price,
      }])
    }
  }

  const handleQtyChange = (idx: number, delta: number) => {
    setOrderItems(orderItems.map((oi, i) => {
      if (i !== idx) return oi
      const newQty = oi.quantity + delta
      if (newQty <= 0) return null
      return { ...oi, quantity: newQty }
    }).filter(Boolean) as OrderItem[])
  }

  const handleRemoveItem = (idx: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== idx))
  }

  const total = orderItems.reduce((sum, oi) => sum + oi.price * oi.quantity, 0)

  const handleSave = async () => {
    setError('')
    if (orderItems.length === 0) { setError('Order must have at least one item'); return }
    if (!order) return

    setSaving(true)

    try {
      // Update order record
      const updates: any = {
        total: total,
        payment_method: paymentMethod,
        status: status,
      }
      if (selectedCustomer && selectedCustomer.id !== 'walk-in') {
        updates.customer_id = selectedCustomer.id
      } else {
        updates.customer_id = null
      }
      if (status === 'paid' && !order.paid_at) {
        updates.paid_at = new Date().toISOString()
      }

      const { error: orderError } = await supabase
        .from('orders').update(updates).eq('id', orderId)
      if (orderError) throw new Error('Could not update order: ' + orderError.message)

      // Delete old order_items
      await supabase.from('order_items').delete().eq('order_id', orderId)

      // Insert new order_items
      const newRows = orderItems.map(oi => ({
        order_id: orderId,
        item_name: oi.name,
        quantity: oi.quantity,
        price_at_time: oi.price,
      }))
      const { error: itemsError } = await supabase.from('order_items').insert(newRows)
      if (itemsError) throw new Error('Could not update items: ' + itemsError.message)

      router.push('/orders')
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F3FF] flex items-center justify-center">
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
          <Link href="/orders" className="text-gray-500 text-2xl">←</Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Edit Order</h1>
            <p className="text-xs text-gray-500">{business?.business_name} · #{orderId.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Customer */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Customer</h3>
          {showCustomerPicker ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#635BFF]"
                autoFocus
              />
              <button
                onClick={() => { setSelectedCustomer({ id: 'walk-in', name: 'Walk-in customer' }); setShowCustomerPicker(false) }}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="font-medium text-gray-900 text-sm">Walk-in customer</p>
              </button>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredCustomers.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCustomer(c); setShowCustomerPicker(false) }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                    {c.phone && <p className="text-xs text-gray-500">+91 {c.phone}</p>}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowCustomerPicker(false)} className="text-gray-500 text-sm">Cancel</button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#F4F3FF] border-2 border-[#DAD8FF] rounded-xl p-3">
              <div>
                <p className="font-semibold text-gray-900">{selectedCustomer?.name}</p>
                {selectedCustomer?.phone && <p className="text-xs text-gray-500">+91 {selectedCustomer.phone}</p>}
              </div>
              <button onClick={() => setShowCustomerPicker(true)} className="text-[#635BFF] text-sm font-medium">Change</button>
            </div>
          )}
        </div>

        {/* Add items */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Add Items</h3>
          <div className="grid grid-cols-2 gap-2">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => handleAddItem(item)}
                className="text-left bg-gray-50 hover:bg-[#F4F3FF] border border-gray-200 hover:border-[#BDB9FF] rounded-xl p-3 transition-all"
              >
                <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                <p className="text-xs text-[#635BFF] font-bold">Rs.{item.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Current items */}
        {orderItems.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-2">
              {orderItems.map((oi, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{oi.name}</p>
                    <p className="text-xs text-gray-500">Rs.{oi.price} each</p>
                  </div>
                  <div className="flex items-center gap-2 mx-2">
                    <button onClick={() => handleQtyChange(idx, -1)} className="w-7 h-7 bg-gray-200 rounded-full text-gray-700 font-bold">-</button>
                    <span className="font-semibold w-6 text-center">{oi.quantity}</span>
                    <button onClick={() => handleQtyChange(idx, 1)} className="w-7 h-7 bg-[#635BFF] rounded-full text-white font-bold">+</button>
                  </div>
                  <p className="font-bold text-[#635BFF] w-16 text-right text-sm">Rs.{oi.price * oi.quantity}</p>
                  <button onClick={() => handleRemoveItem(idx)} className="ml-2 text-red-500 text-lg">🗑️</button>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-900">TOTAL</span>
              <span className="text-2xl font-bold text-[#635BFF]">Rs.{total}</span>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-xl border-2 transition-all ${
                paymentMethod === 'upi' ? 'border-[#635BFF] bg-[#F4F3FF]' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">📱</div>
              <p className="font-semibold text-sm">UPI / Card</p>
            </button>
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`p-3 rounded-xl border-2 transition-all ${
                paymentMethod === 'cash' ? 'border-[#635BFF] bg-[#F4F3FF]' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">💵</div>
              <p className="font-semibold text-sm">Cash</p>
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setStatus('paid')}
              className={`p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                status === 'paid' || status === 'done'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              ✅ Paid
            </button>
            <button
              onClick={() => setStatus('sent')}
              className={`p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                status === 'sent' || status === 'new'
                  ? 'border-[#635BFF] bg-[#F4F3FF] text-[#3530B8]'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              ⏳ Pending
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </main>

      {/* Save button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Link href="/orders" className="flex-1 text-center bg-gray-100 text-gray-900 py-4 rounded-xl font-bold">Cancel</Link>
          <button
            onClick={handleSave}
            disabled={saving || orderItems.length === 0}
            className="flex-1 bg-[#635BFF] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#635BFF]/30 hover:bg-[#4D44E0] disabled:bg-gray-300"
          >
            {saving ? 'Saving...' : `Save - Rs.${total}`}
          </button>
        </div>
      </div>
    </div>
  )
}
