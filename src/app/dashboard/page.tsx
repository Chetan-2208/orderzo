"use client";

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Business {
  id: string
  business_name: string
  business_type: string
  upi_id: string
}

interface Order {
  id: string
  total: number
  status: string
  mode: string
  customer_name?: string
  customer_phone?: string
  created_at: string
  payment_method?: string
  razorpay_payment_url?: string
}

type DateRange = 'today' | 'week' | 'month' | 'all'

interface Stats {
  totalRevenue: number
  totalCollected: number
  totalPending: number
  totalOrders: number
  paidOrders: number
  pendingOrders: number
  uniqueCustomers: number
  topItems: { name: string; count: number }[]
  topCustomers: { name: string; total: number; phone?: string }[]
  pendingList: Order[]
  recentList: Order[]
  paymentMethods: { cash: number; upi: number }
}

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'customers' | 'settings'>('orders')
  const [dateRange, setDateRange] = useState<DateRange>('today')
  const [showModeSheet, setShowModeSheet] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    loadDashboard(savedPhone)
  }, [router])

  useEffect(() => {
    if (business) loadStats(business.id, dateRange)
  }, [dateRange, business])

  const loadDashboard = async (phoneNum: string) => {
    const { data: businessData, error } = await supabase
      .from('businesses').select('*').eq('owner_phone', phoneNum).single()
    if (error || !businessData) { router.push('/setup'); return }
    setBusiness(businessData)
    await loadStats(businessData.id, 'today')
    setLoading(false)
  }

  const getDateFilter = (range: DateRange) => {
    const now = new Date()
    const start = new Date()
    if (range === 'today') start.setHours(0, 0, 0, 0)
    else if (range === 'week') { start.setDate(now.getDate() - 7); start.setHours(0, 0, 0, 0) }
    else if (range === 'month') { start.setMonth(now.getMonth() - 1); start.setHours(0, 0, 0, 0) }
    else { start.setFullYear(2000) }
    return start.toISOString()
  }

  const loadStats = async (businessId: string, range: DateRange) => {
    const startDate = getDateFilter(range)
    
    // Get all orders in date range with customer + items
    const { data: orders } = await supabase
      .from('orders')
      .select('*, customers(name, phone), order_items(item_name, quantity)')
      .eq('business_id', businessId)
      .gte('created_at', startDate)
      .order('created_at', { ascending: false })

    if (!orders) return

    const ordersWithDetails = orders.map((o: any) => ({
      ...o,
      customer_name: o.customers?.name || 'Walk-in customer',
      customer_phone: o.customers?.phone,
    }))

    // Calculate stats
    const paid = ordersWithDetails.filter(o => o.status === 'paid' || o.status === 'done')
    const pending = ordersWithDetails.filter(o => o.status === 'sent' || o.status === 'new')
    
    const totalCollected = paid.reduce((sum, o) => sum + parseFloat(o.total), 0)
    const totalPending = pending.reduce((sum, o) => sum + parseFloat(o.total), 0)
    const totalRevenue = totalCollected + totalPending

    // Unique customers
    const customerSet = new Set(orders.map((o: any) => o.customer_id).filter(Boolean))
    
    // Top items
    const itemCounts = new Map<string, number>()
    orders.forEach((o: any) => {
      o.order_items?.forEach((item: any) => {
        itemCounts.set(item.item_name, (itemCounts.get(item.item_name) || 0) + item.quantity)
      })
    })
    const topItems = Array.from(itemCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Top customers
    const customerTotals = new Map<string, { name: string; total: number; phone?: string }>()
    paid.forEach((o: any) => {
      if (!o.customers?.name) return
      const key = o.customers.name
      const existing = customerTotals.get(key)
      if (existing) {
        existing.total += parseFloat(o.total)
      } else {
        customerTotals.set(key, { name: o.customers.name, total: parseFloat(o.total), phone: o.customers.phone })
      }
    })
    const topCustomers = Array.from(customerTotals.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    // Payment methods
    const cashTotal = paid.filter(o => o.payment_method === 'cash').reduce((sum, o) => sum + parseFloat(o.total), 0)
    const upiTotal = paid.filter(o => o.payment_method !== 'cash').reduce((sum, o) => sum + parseFloat(o.total), 0)

    setStats({
      totalRevenue,
      totalCollected,
      totalPending,
      totalOrders: ordersWithDetails.length,
      paidOrders: paid.length,
      pendingOrders: pending.length,
      uniqueCustomers: customerSet.size,
      topItems,
      topCustomers,
      pendingList: pending.slice(0, 5),
      recentList: ordersWithDetails.slice(0, 10),
      paymentMethods: { cash: cashTotal, upi: upiTotal },
    })
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('orderzo_user_phone')
      router.push('/')
    }
  }

  const handleModeSelect = (mode: 'order' | 'bill') => {
    setShowModeSheet(false)
    router.push(`/new?mode=${mode}`)
  }

  const getRangeLabel = (range: DateRange) => {
    if (range === 'today') return 'Today'
    if (range === 'week') return 'This Week'
    if (range === 'month') return 'This Month'
    return 'All Time'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Logo size={64} />
          <p className="text-gray-600">Loading your business...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <div>
              <h1 className="font-bold text-gray-900">{business?.business_name}</h1>
              <p className="text-xs text-gray-500">+91 {phone}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 px-3 py-1">Logout</button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        {activeTab === 'orders' && stats && (
          <>
            {/* Date range toggle */}
            <div className="bg-white rounded-2xl p-1 border border-gray-200 mb-4 flex gap-1">
              {(['today', 'week', 'month', 'all'] as DateRange[]).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    dateRange === range
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {getRangeLabel(range)}
                </button>
              ))}
            </div>

            {/* Main revenue card */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/30 mb-4">
              <p className="text-orange-100 text-sm font-medium mb-1">{getRangeLabel(dateRange)}</p>
              <h2 className="text-4xl font-bold mb-2">₹{stats.totalCollected.toLocaleString('en-IN')}</h2>
              <p className="text-orange-100 text-sm mb-3">collected</p>
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-orange-200 text-xs">Orders</p>
                  <p className="font-bold">{stats.totalOrders}</p>
                </div>
                <div>
                  <p className="text-orange-200 text-xs">Paid</p>
                  <p className="font-bold">{stats.paidOrders}</p>
                </div>
                <div>
                  <p className="text-orange-200 text-xs">Pending</p>
                  <p className="font-bold">{stats.pendingOrders}</p>
                </div>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">⏳ Pending</p>
                <p className="text-2xl font-bold text-orange-500">₹{stats.totalPending.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-400 mt-1">{stats.pendingOrders} unpaid orders</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">👥 Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.uniqueCustomers}</p>
                <p className="text-xs text-gray-400 mt-1">unique customers</p>
              </div>
            </div>

            {/* Payment breakdown */}
            {(stats.paymentMethods.cash > 0 || stats.paymentMethods.upi > 0) && (
              <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">💳 Payment Breakdown</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">💵 Cash</p>
                    <p className="text-lg font-bold text-green-700">₹{stats.paymentMethods.cash.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">📱 UPI/Card</p>
                    <p className="text-lg font-bold text-blue-700">₹{stats.paymentMethods.upi.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pending payments */}
            {stats.pendingList.length > 0 && (
              <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">⏳ Pending Payments</h3>
                <div className="space-y-2">
                  {stats.pendingList.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{order.customer_name}</p>
                        <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      </div>
                      <p className="font-bold text-orange-600">₹{order.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top customers */}
            {stats.topCustomers.length > 0 && (
              <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">🏆 Top Customers</h3>
                <div className="space-y-2">
                  {stats.topCustomers.map((customer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{customer.name}</p>
                          {customer.phone && <p className="text-xs text-gray-500">+91 {customer.phone}</p>}
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">₹{customer.total.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top items */}
            {stats.topItems.length > 0 && (
              <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">🔥 Top Selling Items</h3>
                <div className="space-y-2">
                  {stats.topItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.count} sold</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent orders */}
            {stats.recentList.length > 0 ? (
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">📋 Recent Orders</h3>
                <div className="space-y-2">
                  {stats.recentList.map(order => (
                    <div key={order.id} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              order.status === 'paid' || order.status === 'done' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status === 'paid' || order.status === 'done' ? '✅ Paid' : '⏳ Pending'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {order.mode === 'bill' ? '🧾 Bill' : '📦 Order'}
                            </span>
                          </div>
                          <p className="font-medium text-gray-900 text-sm">{order.customer_name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {new Date(order.created_at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-orange-500">₹{order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6 text-sm">Tap the + button below to add your first order or bill</p>
                <p className="text-xs text-gray-400">💡 Tip: Add your menu items in Settings first</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Next</h3>
            <p className="text-gray-600 mb-6 text-sm">Full customer history page in 1 hour</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Business Info</h3>
                <Link href="/setup" className="text-sm text-orange-500 font-medium hover:text-orange-600">Edit →</Link>
              </div>
              <div className="space-y-3 text-sm">
                <div><p className="text-gray-500 text-xs mb-1">Business Name</p><p className="text-gray-900 font-medium">{business?.business_name}</p></div>
                <div><p className="text-gray-500 text-xs mb-1">Type</p><p className="text-gray-900 font-medium capitalize">{business?.business_type}</p></div>
                <div><p className="text-gray-500 text-xs mb-1">UPI ID</p><p className="text-gray-900 font-medium">{business?.upi_id}</p></div>
                <div><p className="text-gray-500 text-xs mb-1">Phone</p><p className="text-gray-900 font-medium">+91 {phone}</p></div>
              </div>
            </div>

            <Link href="/orders" className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-4"><div className="flex items-center justify-between"><div><h3 className="font-semibold text-gray-900 mb-1">📋 All Orders</h3><p className="text-sm text-gray-500">View, search, and manage all orders</p></div><span className="text-orange-500 text-2xl">→</span></div></Link><Link href="/items" className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Menu / Items</h3>
                  <p className="text-sm text-gray-500">Manage your products and prices</p>
                </div>
                <span className="text-orange-500 text-2xl">→</span>
              </div>
            </Link>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Subscription</h3>
              <p className="text-sm text-gray-500 mb-1">Free Plan · 5 transactions/day</p>
              <p className="text-xs text-gray-400">Upgrade to Pro for unlimited transactions</p>
            </div>

            <button onClick={handleLogout} className="w-full bg-white text-red-500 border border-red-200 py-3 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors">Logout</button>
          </div>
        )}
      </main>

      {activeTab === 'orders' && (
        <button
          onClick={() => setShowModeSheet(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-orange-500 text-white rounded-2xl shadow-2xl shadow-orange-500/40 hover:bg-orange-600 transition-colors flex items-center justify-center text-3xl font-light z-20"
        >
          +
        </button>
      )}

      {showModeSheet && (
        <>
          <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setShowModeSheet(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-40 shadow-2xl max-w-2xl mx-auto">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">What do you want to do?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Pick how you are capturing this transaction</p>
            <div className="space-y-3">
              <button onClick={() => handleModeSelect('order')} className="w-full bg-orange-50 border-2 border-orange-200 hover:border-orange-500 rounded-2xl p-4 text-left transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-2xl">📦</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">New Order</h4>
                    <p className="text-xs text-gray-600">Customer ordered remotely (WhatsApp, phone, etc.)</p>
                  </div>
                  <span className="text-orange-500 text-xl">→</span>
                </div>
              </button>
              <button onClick={() => handleModeSelect('bill')} className="w-full bg-orange-50 border-2 border-orange-200 hover:border-orange-500 rounded-2xl p-4 text-left transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-2xl">🧾</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">New Bill</h4>
                    <p className="text-xs text-gray-600">Customer is at your shop / counter</p>
                  </div>
                  <span className="text-orange-500 text-xl">→</span>
                </div>
              </button>
            </div>
            <button onClick={() => setShowModeSheet(false)} className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-gray-700">Cancel</button>
          </div>
        </>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-2xl mx-auto flex">
          <button onClick={() => setActiveTab('orders')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'orders' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <span className="text-2xl">📋</span><span className="text-xs font-medium">Orders</span>
          </button>
          <button onClick={() => router.push("/customers")} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'customers' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <span className="text-2xl">👥</span><span className="text-xs font-medium">Customers</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <span className="text-2xl">⚙️</span><span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
