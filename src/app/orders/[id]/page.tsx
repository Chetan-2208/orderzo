"use client";

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

interface Business {
  id: string
  business_name: string
  upi_id?: string
}

interface OrderItem {
  id: string
  item_name: string
  quantity: number
  price: number
}

interface Customer {
  id: string
  name: string
  phone?: string
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const router = useRouter()

  const [business, setBusiness] = useState<Business | null>(null)
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    loadOrder(savedPhone)
  }, [router, orderId])

  const loadOrder = async (phoneNum: string) => {
    const { data: businessData } = await supabase
      .from('businesses').select('*').eq('owner_phone', phoneNum).single()
    if (!businessData) { router.push('/setup'); return }
    setBusiness(businessData)

    const { data: orderData } = await supabase
      .from('orders')
      .select('*, customers(id, name, phone), order_items(*)')
      .eq('id', orderId)
      .single()

    if (!orderData) { router.push('/orders'); return }

    setOrder(orderData)

    if (orderData.customers) {
      setCustomer({
        id: orderData.customers.id,
        name: orderData.customers.name,
        phone: orderData.customers.phone,
      })
    } else {
      setCustomer({ id: 'walk-in', name: 'Walk-in customer' })
    }

    const oi = (orderData.order_items || []).map((it: any) => ({
      id: it.id,
      item_name: it.item_name,
      quantity: it.quantity,
      price: parseFloat(it.price),
    }))
    setOrderItems(oi)

    setLoading(false)
  }

  const handleMarkPaid = async () => {
    if (!order) return
    setActionLoading(true)
    setError('')

    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId)

    if (updateError) {
      setError('Could not mark paid: ' + updateError.message)
      setActionLoading(false)
      return
    }

    setOrder({ ...order, status: 'paid' })
    setActionLoading(false)
  }

  const handleMarkPending = async () => {
    if (!order) return
    if (!confirm('Mark this order as pending again?')) return

    setActionLoading(true)
    setError('')

    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'sent' })
      .eq('id', orderId)

    if (updateError) {
      setError('Could not update: ' + updateError.message)
      setActionLoading(false)
      return
    }

    setOrder({ ...order, status: 'sent' })
    setActionLoading(false)
  }

  const handleSendReminder = () => {
    if (!customer?.phone || !business) {
      alert('Customer has no phone number')
      return
    }

    const cleanPhone = customer.phone.replace(/\D/g, '')
    const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
    const total = parseFloat(order.total)

    const itemsStr = orderItems.map(it => it.item_name + (it.quantity > 1 ? ' × ' + it.quantity : '')).join(', ') || (order.notes || 'Order')

    const upiLine = business.upi_id ? `\n\nPay via UPI: ${business.upi_id}` : ''

    const message = `Namaste ${customer.name},\n\nGentle reminder: Your bill of ₹${total} from ${business.business_name} is still pending.\n\nItems: ${itemsStr}${upiLine}\n\nKindly pay at your earliest. Thank you! 🙏`

    window.open('https://wa.me/' + fullPhone + '?text=' + encodeURIComponent(message), '_blank')
  }

  const handleResendInvoice = () => {
    if (!customer?.phone || !business) {
      alert('Customer has no phone number to resend')
      return
    }

    const cleanPhone = customer.phone.replace(/\D/g, '')
    const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
    const total = parseFloat(order.total)

    const itemsStr = orderItems.map(it => it.item_name + (it.quantity > 1 ? ' × ' + it.quantity : '')).join(', ') || (order.notes || 'Order')

    const upiLine = business.upi_id ? `\n\nPay via UPI: ${business.upi_id}` : ''

    const message = `Hi ${customer.name},\n\nYour bill from ${business.business_name}:\n${itemsStr} — ₹${total}${upiLine}\n\nThank you! 🙏`

    window.open('https://wa.me/' + fullPhone + '?text=' + encodeURIComponent(message), '_blank')
  }

  const handleDelete = async () => {
    if (!confirm('Delete this invoice? This cannot be undone.')) return

    setActionLoading(true)
    setError('')

    await supabase.from('order_items').delete().eq('order_id', orderId)
    const { error: deleteError } = await supabase.from('orders').delete().eq('id', orderId)

    if (deleteError) {
      setError('Could not delete: ' + deleteError.message)
      setActionLoading(false)
      return
    }

    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link href="/dashboard" className="text-[#635BFF] font-bold">← Back to dashboard</Link>
        </div>
      </div>
    )
  }

  const isPaid = order.status === 'paid' || order.status === 'done'
  const isPending = order.status === 'sent' || order.status === 'new'
  const total = parseFloat(order.total)
  const orderDate = new Date(order.created_at)
  const invoiceNumber = '#' + order.id.slice(0, 8).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Back to dashboard">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <p className="text-xs text-gray-500 font-medium">Invoice</p>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">{invoiceNumber}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-tight">{business?.business_name}</p>
              <p className="text-xs text-gray-400">+91 {phone}</p>
            </div>
            <div className="w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold shadow-md">
              {business?.business_name?.charAt(0).toUpperCase() || 'O'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

        <div className="mb-6">
          <div className={
            'rounded-3xl p-6 sm:p-8 border shadow-sm ' +
            (isPaid
              ? 'bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-200'
              : 'bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200')
          }>
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider">
                Invoice total
              </p>
              <span className={
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ' +
                (isPaid
                  ? 'bg-green-600 text-white'
                  : 'bg-amber-500 text-white')
              }>
                <span>{isPaid ? '✓' : '⏳'}</span>
                <span>{isPaid ? 'Paid' : 'Pending'}</span>
              </span>
            </div>
            <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-2 leading-none">
              ₹{total.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-600 mt-3">
              {orderDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}
              {orderDate.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="mb-6 space-y-2">
          {isPending && (
            <button
              onClick={handleMarkPaid}
              disabled={actionLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-base transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span className="text-xl">✓</span>
              <span>{actionLoading ? 'Marking paid...' : 'Mark as paid'}</span>
            </button>
          )}

          {isPaid && (
            <button
              onClick={handleMarkPending}
              disabled={actionLoading}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>↩</span>
              <span>{actionLoading ? 'Updating...' : 'Mark as pending again'}</span>
            </button>
          )}

          {customer?.phone && (
            <div className="grid grid-cols-2 gap-2">
              {isPending && (
                <button
                  onClick={handleSendReminder}
                  className="bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-2xl font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>🔔</span>
                  <span>Send reminder</span>
                </button>
              )}
              <button
                onClick={handleResendInvoice}
                className={
                  'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 py-3 rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ' +
                  (isPending ? '' : 'col-span-2')
                }
              >
                <span>💬</span>
                <span>{isPaid ? 'Resend on WhatsApp' : 'Resend invoice'}</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bill to</h2>
            {customer && customer.id !== 'walk-in' && (
              <Link href={'/customers/' + customer.id} className="text-xs text-[#635BFF] font-bold hover:text-[#4D44E0]">
                View history →
              </Link>
            )}
          </div>
          <div className="p-5 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
              {customer?.name.charAt(0).toUpperCase() || 'W'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate">{customer?.name || 'Walk-in customer'}</p>
              {customer?.phone ? (
                <p className="text-xs text-gray-500">+91 {customer.phone}</p>
              ) : (
                <p className="text-xs text-gray-400 italic">No phone number</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Items</h2>
          </div>
          {orderItems.length === 0 ? (
            <div className="p-5">
              <p className="text-sm text-gray-700 font-semibold">{order.notes || 'Order'}</p>
              <p className="text-xs text-gray-400 mt-1">No itemized breakdown</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orderItems.map((it) => (
                <div key={it.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{it.item_name}</p>
                    {it.quantity > 1 && (
                      <p className="text-xs text-gray-500">× {it.quantity}</p>
                    )}
                  </div>
                  <p className="font-bold text-gray-900 text-sm flex-shrink-0">
                    ₹{(it.price * (it.quantity || 1)).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
              <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total</span>
                <span className="font-extrabold text-gray-900 text-lg">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-5 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Method</span>
              <span className="text-sm font-bold text-gray-900 capitalize">
                {order.payment_method === 'cash' ? '💵 Cash' : order.payment_method === 'upi' ? '📱 UPI' : '⏳ Later'}
              </span>
            </div>
            <div className="px-5 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className={'text-sm font-bold ' + (isPaid ? 'text-green-600' : 'text-amber-600')}>
                {isPaid ? '✓ Paid' : '⏳ Pending'}
              </span>
            </div>
            <div className="px-5 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">Mode</span>
              <span className="text-sm font-bold text-gray-900 capitalize">{order.mode || 'order'}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          <Link
            href={'/orders/' + orderId + '/edit'}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            ✏️ Edit invoice
          </Link>
          <button
            onClick={handleDelete}
            disabled={actionLoading}
            className="inline-flex items-center gap-2 bg-white hover:bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
          >
            🗑 Delete invoice
          </button>
        </div>

      </main>

    </div>
  )
}
