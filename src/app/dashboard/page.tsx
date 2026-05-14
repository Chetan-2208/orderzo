"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
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
  totalCollected: number
  totalPending: number
  totalOrders: number
  paidOrders: number
  pendingOrders: number
  uniqueCustomers: number
  avgOrderValue: number
  topItems: { name: string; count: number }[]
  topCustomers: { name: string; total: number; phone?: string; orderCount: number }[]
  pendingList: Order[]
  recentList: Order[]
  paymentMethods: { cash: number; upi: number }
}

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [recurringBills, setRecurringBills] = useState<any[]>([])
  const [todaySummary, setTodaySummary] = useState<any>(null)
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
    
    const { data: orders } = await supabase
      .from('orders')
      .select('*, customers(name, phone), order_items(item_name, quantity)')
      .eq('business_id', businessId)
      .gte('created_at', startDate)
      .order('created_at', { ascending: false })

    if (!orders) {
      setStats({
        totalCollected: 0, totalPending: 0, totalOrders: 0,
        paidOrders: 0, pendingOrders: 0, uniqueCustomers: 0, avgOrderValue: 0,
        topItems: [], topCustomers: [], pendingList: [], recentList: [],
        paymentMethods: { cash: 0, upi: 0 },
      })
      return
    }

    const ordersWithDetails = orders.map((o: any) => ({
      ...o,
      customer_name: o.customers?.name || 'Walk-in customer',
      customer_phone: o.customers?.phone,
    }))

    const paid = ordersWithDetails.filter(o => o.status === 'paid' || o.status === 'done')
    const pending = ordersWithDetails.filter(o => o.status === 'sent' || o.status === 'new')
    
    const totalCollected = paid.reduce((sum, o) => sum + parseFloat(o.total), 0)
    const totalPending = pending.reduce((sum, o) => sum + parseFloat(o.total), 0)
    const avgOrderValue = paid.length > 0 ? Math.round(totalCollected / paid.length) : 0

    const customerSet = new Set(orders.map((o: any) => o.customer_id).filter(Boolean))
    
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

    const customerTotals = new Map<string, { name: string; total: number; phone?: string; orderCount: number }>()
    paid.forEach((o: any) => {
      if (!o.customers?.name) return
      const key = o.customers.name
      const existing = customerTotals.get(key)
      if (existing) {
        existing.total += parseFloat(o.total)
        existing.orderCount += 1
      } else {
        customerTotals.set(key, { name: o.customers.name, total: parseFloat(o.total), phone: o.customers.phone, orderCount: 1 })
      }
    })
    const topCustomers = Array.from(customerTotals.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    const cashTotal = paid.filter(o => o.payment_method === 'cash').reduce((sum, o) => sum + parseFloat(o.total), 0)
    const upiTotal = paid.filter(o => o.payment_method !== 'cash').reduce((sum, o) => sum + parseFloat(o.total), 0)

    setStats({
      totalCollected, totalPending,
      totalOrders: ordersWithDetails.length,
      paidOrders: paid.length,
      pendingOrders: pending.length,
      uniqueCustomers: customerSet.size,
      avgOrderValue,
      topItems, topCustomers,
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
        <Logo size={64} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">{business?.business_name}</h1>
              <p className="text-xs text-gray-500">+91 {phone}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        {activeTab === 'orders' && stats && (
          <>
            {/* ═══════════════════════════════════════════════════
                TODAY SCREEN — Design A: Personal Assistant + Festive
                Modes auto-switch based on data:
                - Empty (0 invoices total)
                - Sparse (1-30 invoices total)
                - Mature (30+ invoices total)
            ═══════════════════════════════════════════════════ */}

            {/* GREETING — same across all modes */}
            <div className="mb-6 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">
                  {new Date().getHours() < 12 ? '☀️' : new Date().getHours() < 17 ? '🌤️' : '🌙'}
                </span>
                <h1 className="text-2xl font-bold text-gray-900">
                  {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'}, {business?.business_name}
                </h1>
              </div>
              <p className="text-sm text-gray-500 ml-9">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>

            {/* ─────────────── EMPTY MODE (0 total orders) ─────────────── */}
            {stats.totalOrders === 0 && (
              <>
                {/* Festive blessing card */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-5 mb-5 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Aaj ka din shubh ho!</p>
                      <p className="text-sm text-gray-600">Wishing you a great day ahead</p>
                    </div>
                  </div>
                </div>

                {/* Big primary action */}
                <button
                  onClick={() => router.push('/new?mode=order')}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] transition-all text-white rounded-3xl p-6 mb-5 shadow-lg shadow-orange-500/30"
                >
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-3xl">➕</span>
                    <span className="text-xl font-bold">Note your first sale</span>
                  </div>
                  <p className="text-sm text-orange-50">Takes just 10 seconds</p>
                </button>

                {/* Setup tips */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <span className="text-xl">💡</span>
                    <h2 className="font-semibold text-gray-900">3 things to try today</h2>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200 text-left transition-colors flex items-start gap-3"
                    >
                      <span className="text-2xl">✨</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Add your shop logo</p>
                        <p className="text-sm text-gray-500">Makes invoices look professional</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200 text-left transition-colors flex items-start gap-3"
                    >
                      <span className="text-2xl">💳</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Set your UPI ID</p>
                        <p className="text-sm text-gray-500">Customers can pay you instantly</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>

                    <button
                      onClick={() => router.push('/customers')}
                      className="w-full bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200 text-left transition-colors flex items-start gap-3"
                    >
                      <span className="text-2xl">👥</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Add 3 regular customers</p>
                        <p className="text-sm text-gray-500">Send invoices faster next time</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </div>

                {/* Festive nudge */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Did you know?</p>
                      <p className="text-sm text-gray-600">
                        Mango pickle season starts soon. Many cafes earn 30% more in summer. Stock up early!
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ─────────────── SPARSE MODE (1-30 total orders) ─────────────── */}
            {stats.totalOrders > 0 && stats.totalOrders <= 30 && (
              <>
                {/* Festive blessing */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-5 mb-5 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Keep going, you're doing great!</p>
                      <p className="text-sm text-gray-600">Every invoice brings you closer to your goal</p>
                    </div>
                  </div>
                </div>

                {/* Today's progress */}
                <div className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Today's earnings</p>
                  <h2 className="text-5xl font-bold text-gray-900 mb-1">
                    ₹{stats.totalCollected.toLocaleString('en-IN')}
                  </h2>
                  <p className="text-sm text-gray-600">
                    from {stats.paidOrders} {stats.paidOrders === 1 ? 'invoice' : 'invoices'}
                  </p>

                  {stats.pendingOrders > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Still pending</p>
                        <p className="text-lg font-semibold text-amber-600">₹{stats.totalPending.toLocaleString('en-IN')}</p>
                      </div>
                      <p className="text-xs text-gray-400">{stats.pendingOrders} unpaid</p>
                    </div>
                  )}
                </div>

                {/* Encouragement */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-5 border border-green-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">You're learning fast!</p>
                      <p className="text-sm text-gray-600">
                        You've sent {stats.totalOrders} {stats.totalOrders === 1 ? 'invoice' : 'invoices'} so far. Keep it up.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick action */}
                <button
                  onClick={() => router.push('/new?mode=order')}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] transition-all text-white rounded-3xl p-5 mb-5 shadow-lg shadow-orange-500/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">➕</span>
                    <span className="text-lg font-bold">New invoice</span>
                  </div>
                </button>

                {/* Festive nudge */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Tip of the day</p>
                      <p className="text-sm text-gray-600">
                        Tuesday is usually busy for tiffin businesses. Get ready for the lunch rush!
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ─────────────── MATURE MODE (30+ total orders) ─────────────── */}
            {stats.totalOrders > 30 && (
              <>
                {/* Hero earnings */}
                <div className="bg-white rounded-3xl p-6 mb-5 border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Today's earnings</p>
                  <h2 className="text-5xl font-bold text-gray-900 mb-1">
                    ₹{stats.totalCollected.toLocaleString('en-IN')}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    from {stats.paidOrders} invoices · Avg ₹{stats.avgOrderValue}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="text-xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                    <div className="border-l border-gray-100 pl-3">
                      <p className="text-xs text-gray-500 mb-1">✅ Paid</p>
                      <p className="text-xl font-bold text-green-600">{stats.paidOrders}</p>
                    </div>
                    <div className="border-l border-gray-100 pl-3">
                      <p className="text-xs text-gray-500 mb-1">⏳ Pending</p>
                      <p className="text-xl font-bold text-amber-600">{stats.pendingOrders}</p>
                    </div>
                  </div>
                </div>

                {/* Things waiting */}
                {stats.pendingList.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className="text-xl">⚡</span>
                      <h2 className="font-semibold text-gray-900">Things waiting for you</h2>
                    </div>
                    <div className="space-y-2">
                      {stats.pendingList.slice(0, 3).map((order: any) => (
                        <div key={order.id} className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{order.customer_name || 'Walk-in customer'}</p>
                              <p className="text-sm text-amber-600">Pending ₹{parseFloat(String(order.total)).toLocaleString('en-IN')}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </p>
                            </div>
                            <span className="text-2xl">🟡</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent invoices */}
                {stats.recentList.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className="text-xl">📋</span>
                      <h2 className="font-semibold text-gray-900">Recent invoices</h2>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                      {stats.recentList.slice(0, 5).map((order: any) => (
                        <div key={order.id} className="p-4 flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{order.customer_name || 'Walk-in'}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{parseFloat(String(order.total)).toLocaleString('en-IN')}</p>
                            <p className={`text-xs ${order.status === 'paid' || order.status === 'done' ? 'text-green-600' : 'text-amber-600'}`}>
                              {order.status === 'paid' || order.status === 'done' ? '✅ Paid' : '⏳ Pending'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Festive nudge */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Insight</p>
                      <p className="text-sm text-gray-600">
                        You've served {stats.uniqueCustomers} unique customers. Reach out to your top 5 — they're your VIPs!
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-3">
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

            <Link href="/orders" className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">📋 All Orders</h3>
                  <p className="text-sm text-gray-500">View, search, and manage all orders</p>
                </div>
                <span className="text-orange-500 text-2xl">→</span>
              </div>
            </Link>

            <Link href="/items" className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">📦 Menu / Items</h3>
                  <p className="text-sm text-gray-500">Manage your products and prices</p>
                </div>
                <span className="text-orange-500 text-2xl">→</span>
              </div>
            </Link>

            <Link href="/support" className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">🙏 Help & Support</h3>
                  <p className="text-sm text-gray-500">FAQ, email, report a problem</p>
                </div>
                <span className="text-orange-500 text-2xl">→</span>
              </div>
            </Link>

            <Link href="/pricing" className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">💎 Subscription</h3>
                  <p className="text-sm text-gray-500 mb-1">Free Plan · 5 transactions/day</p>
                  <p className="text-xs text-orange-600 font-medium">Tap to upgrade to Pro →</p>
                </div>
                <span className="text-orange-500 text-2xl">→</span>
              </div>
            </Link>

            <button onClick={handleLogout} className="w-full bg-white text-red-500 border border-red-200 py-3 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors">Logout</button>
          </div>
        )}
      </main>

      {activeTab === 'orders' && (
        <button
          onClick={() => router.push('/new?mode=order')}
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
            <button onClick={() => setShowModeSheet(false)} className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-gray-500">Cancel</button>
          </div>
        </>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-2xl mx-auto flex">
          <button onClick={() => setActiveTab('orders')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'orders' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <span className="text-2xl">📊</span><span className="text-xs font-medium">Today</span>
          </button>
          <button onClick={() => router.push('/customers')} className="flex-1 py-4 flex flex-col items-center gap-1 transition-colors text-gray-400 hover:text-gray-600">
            <span className="text-2xl">👥</span><span className="text-xs font-medium">Customers</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <span className="text-2xl">👤</span><span className="text-xs font-medium">Me</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
