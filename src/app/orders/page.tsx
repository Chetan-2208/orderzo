"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  total: number
  status: string
  mode: string
  payment_method?: string
  customer_name?: string
  customer_phone?: string
  created_at: string
  paid_at?: string
  razorpay_payment_url?: string
  items_summary?: string
}

interface Business {
  id: string
  business_name: string
}

type StatusFilter = 'all' | 'paid' | 'pending'
type DateFilter = 'today' | 'week' | 'month' | 'all'

export default function OrdersPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const phone = localStorage.getItem('orderzo_user_phone')
    if (!phone) { router.push('/login'); return }
    loadOrders(phone)
  }, [router])

  const loadOrders = async (phone: string) => {
    const { data: businessData } = await supabase
      .from('businesses').select('*').eq('owner_phone', phone).single()
    if (!businessData) { router.push('/setup'); return }
    setBusiness(businessData)

    const { data: ordersData } = await supabase
      .from('orders')
      .select('*, customers(name, phone), order_items(item_name, quantity)')
      .eq('business_id', businessData.id)
      .order('created_at', { ascending: false })

    if (ordersData) {
      const enriched = ordersData.map((o: any) => ({
        ...o,
        customer_name: o.customers?.name || 'Walk-in customer',
        customer_phone: o.customers?.phone,
        items_summary: o.order_items?.map((i: any) => `${i.item_name} x ${i.quantity}`).join(', ') || '',
      }))
      setOrders(enriched)
    }
    setLoading(false)
  }

  const handleMarkPaid = async (orderId: string) => {
    setUpdatingOrderId(orderId)
    const { error } = await supabase
      .from('orders')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', orderId)
    
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'paid', paid_at: new Date().toISOString() } : o))
    }
    setUpdatingOrderId(null)
  }

  const handleDelete = async (orderId: string) => {
    if (!confirm('Delete this order? This cannot be undone.')) return
    
    setUpdatingOrderId(orderId)
    const { error } = await supabase.from('orders').delete().eq('id', orderId)
    if (!error) {
      setOrders(orders.filter(o => o.id !== orderId))
    }
    setUpdatingOrderId(null)
  }

  const handleResendWhatsApp = (order: Order) => {
    if (!order.customer_phone) {
      alert('Customer has no phone number')
      return
    }
    const cleanPhone = order.customer_phone.replace(/\D/g, '')
    const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
    const message = `Reminder: Your order from ${business?.business_name}\n\n${order.items_summary}\n\nTotal: Rs.${order.total}\n${order.razorpay_payment_url ? `\nPay here: ${order.razorpay_payment_url}` : ''}`
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const getFiltered = () => {
    let filtered = [...orders]

    if (dateFilter !== 'all') {
      const start = new Date()
      if (dateFilter === 'today') start.setHours(0, 0, 0, 0)
      else if (dateFilter === 'week') { start.setDate(start.getDate() - 7); start.setHours(0, 0, 0, 0) }
      else if (dateFilter === 'month') { start.setMonth(start.getMonth() - 1); start.setHours(0, 0, 0, 0) }
      filtered = filtered.filter(o => new Date(o.created_at) >= start)
    }

    if (statusFilter === 'paid') filtered = filtered.filter(o => o.status === 'paid' || o.status === 'done')
    if (statusFilter === 'pending') filtered = filtered.filter(o => o.status === 'sent' || o.status === 'new')

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(o => 
        o.customer_name?.toLowerCase().includes(q) ||
        o.customer_phone?.includes(q) ||
        o.items_summary?.toLowerCase().includes(q) ||
        o.total.toString().includes(q)
      )
    }

    return filtered
  }

  const filtered = getFiltered()
  const totalAmount = filtered.reduce((sum, o) => sum + parseFloat(o.total as any), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">All Orders</h1>
            <p className="text-xs text-gray-500">{business?.business_name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <input
          type="text"
          placeholder="Search by customer, item, or amount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 mb-3"
        />

        <div className="bg-white rounded-2xl p-1 border border-gray-200 mb-3 flex gap-1">
          {(['today', 'week', 'month', 'all'] as DateFilter[]).map(range => (
            <button
              key={range}
              onClick={() => setDateFilter(range)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                dateFilter === range
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range === 'today' ? 'Today' : range === 'week' ? 'Week' : range === 'month' ? 'Month' : 'All Time'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-1 border border-gray-200 mb-4 flex gap-1">
          {(['all', 'paid', 'pending'] as StatusFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : s === 'paid' ? 'Paid' : 'Pending'}
            </button>
          ))}
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm text-orange-700">
            <span className="font-bold">{filtered.length}</span> orders · Rs.<span className="font-bold">{totalAmount.toLocaleString('en-IN')}</span> total
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-200">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-1">No orders found</h3>
            <p className="text-sm text-gray-500">Try changing the filters or search query</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === 'paid' || order.status === 'done' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status === 'paid' || order.status === 'done' ? 'Paid' : 'Pending'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {order.mode === 'bill' ? 'Bill' : 'Order'}
                      </span>
                      {order.payment_method && (
                        <span className="text-xs text-gray-400">
                          {order.payment_method === 'cash' ? '💵' : '📱'}
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                    {order.customer_phone && (
                      <p className="text-xs text-gray-500">+91 {order.customer_phone}</p>
                    )}
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-xl font-bold text-orange-500">Rs.{order.total}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>

                {order.items_summary && (
                  <p className="text-sm text-gray-600 mb-3 bg-gray-50 px-3 py-2 rounded-lg">
                    {order.items_summary}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  <Link 
                    href={`/orders/${order.id}/edit`}
                    className="flex-1 min-w-[100px] text-center bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    ✏️ Edit
                  </Link>
                  {(order.status === 'sent' || order.status === 'new') && (
                    <button
                      onClick={() => handleMarkPaid(order.id)}
                      disabled={updatingOrderId === order.id}
                      className="flex-1 min-w-[100px] bg-green-50 text-green-700 border border-green-200 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {updatingOrderId === order.id ? 'Updating...' : '✅ Paid'}
                    </button>
                  )}
                  {order.customer_phone && (order.status === 'sent' || order.status === 'new') && (
                    <button
                      onClick={() => handleResendWhatsApp(order)}
                      className="flex-1 min-w-[100px] bg-orange-50 text-orange-700 border border-orange-200 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors"
                    >
                      📱 Remind
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(order.id)}
                    disabled={updatingOrderId === order.id}
                    className="bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
