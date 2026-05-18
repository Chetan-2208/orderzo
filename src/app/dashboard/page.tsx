"use client";

import { useState, useEffect, useMemo } from 'react'
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

type Tab = 'today' | 'orders' | 'customers' | 'items' | 'me'

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
  weekData: { day: string; total: number }[]
  weekTotal: number
}

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('today')
  const [stats, setStats] = useState<Stats | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    loadDashboard(savedPhone)
  }, [router])

  const loadDashboard = async (phoneNum: string) => {
    const { data: businessData, error } = await supabase
      .from('businesses').select('*').eq('owner_phone', phoneNum).single()
    if (error || !businessData) { router.push('/setup'); return }
    setBusiness(businessData)
    await loadStats(businessData.id)
    setLoading(false)
  }

  const loadStats = async (businessId: string) => {
    const start = new Date()
    start.setDate(start.getDate() - 30)
    start.setHours(0, 0, 0, 0)

    const { data: orders } = await supabase
      .from('orders')
      .select('*, customers(name, phone), order_items(item_name, quantity)')
      .eq('business_id', businessId)
      .gte('created_at', start.toISOString())
      .order('created_at', { ascending: false })

    if (!orders || orders.length === 0) {
      setStats({
        totalCollected: 0, totalPending: 0, totalOrders: 0,
        paidOrders: 0, pendingOrders: 0, uniqueCustomers: 0, avgOrderValue: 0,
        topItems: [], topCustomers: [], pendingList: [], recentList: [],
        paymentMethods: { cash: 0, upi: 0 },
        weekData: [], weekTotal: 0,
      })
      return
    }

    const ordersWithDetails = orders.map((o: any) => ({
      ...o,
      customer_name: o.customers?.name || 'Walk-in customer',
      customer_phone: o.customers?.phone,
    }))

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayOrders = ordersWithDetails.filter(o => new Date(o.created_at) >= todayStart)

    const paid = todayOrders.filter(o => o.status === 'paid' || o.status === 'done')
    const pending = todayOrders.filter(o => o.status === 'sent' || o.status === 'new')

    const totalCollected = paid.reduce((sum, o) => sum + parseFloat(o.total), 0)
    const totalPending = pending.reduce((sum, o) => sum + parseFloat(o.total), 0)
    const avgOrderValue = paid.length > 0 ? Math.round(totalCollected / paid.length) : 0

    const customerSet = new Set(todayOrders.map((o: any) => o.customer_id).filter(Boolean))

    const itemCounts = new Map<string, number>()
    orders.forEach((o: any) => {
      o.order_items?.forEach((item: any) => {
        itemCounts.set(item.item_name, (itemCounts.get(item.item_name) || 0) + item.quantity)
      })
    })
    const topItems = Array.from(itemCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const customerTotals = new Map<string, { name: string; total: number; phone?: string; orderCount: number }>()
    const allPaid = ordersWithDetails.filter(o => o.status === 'paid' || o.status === 'done')
    allPaid.forEach((o: any) => {
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
      .slice(0, 10)

    const cashTotal = paid.filter(o => o.payment_method === 'cash').reduce((sum, o) => sum + parseFloat(o.total), 0)
    const upiTotal = paid.filter(o => o.payment_method !== 'cash').reduce((sum, o) => sum + parseFloat(o.total), 0)

    const weekData: { day: string; total: number }[] = []
    let weekTotal = 0
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      d.setHours(0, 0, 0, 0)
      const next = new Date(d)
      next.setDate(next.getDate() + 1)
      const dayOrders = ordersWithDetails.filter(o => {
        const od = new Date(o.created_at)
        return od >= d && od < next && (o.status === 'paid' || o.status === 'done')
      })
      const dayTotal = dayOrders.reduce((sum, o) => sum + parseFloat(o.total), 0)
      weekTotal += dayTotal
      weekData.push({ day: dayLabels[d.getDay()], total: dayTotal })
    }

    setStats({
      totalCollected, totalPending,
      totalOrders: todayOrders.length,
      paidOrders: paid.length,
      pendingOrders: pending.length,
      uniqueCustomers: customerSet.size,
      avgOrderValue,
      topItems, topCustomers,
      pendingList: pending.slice(0, 10),
      recentList: ordersWithDetails.slice(0, 20),
      paymentMethods: { cash: cashTotal, upi: upiTotal },
      weekData, weekTotal,
    })
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('orderzo_user_phone')
      router.push('/')
    }
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'today', label: 'Today', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'items', label: 'Items', icon: '📝' },
    { id: 'me', label: 'Me', icon: '👤' },
  ]

  const maxWeekValue = useMemo(() => {
    if (!stats?.weekData) return 1
    return Math.max(...stats.weekData.map(d => d.total), 1)
  }, [stats])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 sticky top-0 h-screen">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
          <Logo size={28} />
          <span className="font-extrabold text-gray-900 text-lg">Orderzo</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { if (t.id === 'items') { router.push('/items'); return } if (t.id === 'customers') { router.push('/customers'); return } setActiveTab(t.id) }}
              className={'w-full text-left px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all font-medium ' + (activeTab === t.id ? 'bg-[#EFEEFF] text-[#635BFF]' : 'text-gray-600 hover:bg-gray-50')}
            >
              <span className="text-lg">{t.icon}</span>
              <span className="text-sm">{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400">
          v1.0 · Made in India
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-8">

        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
            <div>
              <p className="text-xs text-gray-500 font-medium">
                {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight capitalize">
                {tabs.find(t => t.id === activeTab)?.label || 'Today'}
              </h1>
            </div>
            <button onClick={() => setActiveTab('me')} className="flex items-center gap-3 rounded-xl hover:bg-gray-50 transition-colors p-1 -m-1" aria-label="Open profile">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{business?.business_name}</p>
                <p className="text-xs text-gray-400">+91 {phone}</p>
              </div>
              <div className="w-10 h-10 bg-[#635BFF] text-white rounded-full flex items-center justify-center font-bold shadow-md">
                {business?.business_name?.charAt(0).toUpperCase() || 'O'}
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">

          {activeTab === 'today' && stats && (
            <>
              <div className="mb-6">
                <div className="bg-gradient-to-br from-[#F4F3FF] via-white to-[#EFEEFF] rounded-3xl p-6 sm:p-8 border border-[#EFEEFF] shadow-sm">
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-2 uppercase tracking-wider">
                    Today&apos;s earnings
                  </p>
                  <p className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-2 leading-none">
                    ₹{stats.totalCollected.toLocaleString('en-IN')}
                  </p>
                  {stats.totalOrders > 0 ? (
                    <p className="text-sm sm:text-base text-gray-600 mt-3">
                      from {stats.paidOrders} {stats.paidOrders === 1 ? 'invoice' : 'invoices'}
                      {stats.avgOrderValue > 0 && <> · avg ₹{stats.avgOrderValue.toLocaleString('en-IN')}</>}
                    </p>
                  ) : (
                    <button
                      onClick={() => router.push('/new?mode=order')}
                      className="inline-flex items-center gap-2 mt-3 text-sm sm:text-base font-semibold text-[#635BFF] hover:text-[#4D44E0]"
                    >
                      Send your first invoice <span>→</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Invoices</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.totalOrders}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">today</p>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Paid</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-green-600">{stats.paidOrders}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">completed</p>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">{stats.pendingOrders}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">awaiting pay</p>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Customers</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stats.uniqueCustomers}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">unique today</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Last 7 days</h2>
                  <p className="text-sm font-bold text-[#635BFF]">₹{stats.weekTotal.toLocaleString('en-IN')} total</p>
                </div>
                {stats.weekTotal > 0 ? (
                  <div className="flex items-end justify-between gap-2 h-32">
                    {stats.weekData.map((d, i) => {
                      const heightPct = (d.total / maxWeekValue) * 100
                      const isToday = i === stats.weekData.length - 1
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex items-end justify-center h-24">
                            <div
                              className={'w-full rounded-t-md transition-all ' + (isToday ? 'bg-[#635BFF]' : 'bg-[#BDB9FF]')}
                              style={{ height: Math.max(heightPct, 4) + '%' }}
                              title={'₹' + d.total.toLocaleString('en-IN')}
                            ></div>
                          </div>
                          <span className={'text-xs ' + (isToday ? 'font-bold text-[#635BFF]' : 'text-gray-500')}>{d.day}</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 py-8 text-center">No paid invoices yet this week. Your trend will appear here.</p>
                )}
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent orders</h2>
                  {stats.recentList.length > 0 && (
                    <button onClick={() => setActiveTab('orders')} className="text-xs sm:text-sm text-[#635BFF] font-semibold hover:text-[#4D44E0]">
                      See all →
                    </button>
                  )}
                </div>
                {stats.recentList.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <p className="text-3xl mb-3">📦</p>
                    <p className="text-sm text-gray-600 mb-4">No orders yet</p>
                    <button
                      onClick={() => router.push('/new?mode=order')}
                      className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md"
                    >
                      Send your first invoice →
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {stats.recentList.slice(0, 5).map((o: any) => {
                      const isPaid = o.status === 'paid' || o.status === 'done'
                      const initial = (o.customer_name || 'W').charAt(0).toUpperCase()
                      return (
                        <Link key={o.id} href={'/orders/' + o.id} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                          <div className="w-9 h-9 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate text-sm">{o.customer_name || 'Walk-in'}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              {' · '}
                              {new Date(o.created_at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-gray-900 text-sm">₹{parseFloat(String(o.total)).toLocaleString('en-IN')}</p>
                            <p className={'text-[10px] font-bold ' + (isPaid ? 'text-green-600' : 'text-amber-600')}>
                              {isPaid ? '✓ Paid' : '⏳ Pending'}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'orders' && stats && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">All orders</h2>
                <p className="text-xs text-gray-500 mt-1">Last 30 days · {stats.recentList.length} total</p>
              </div>
              {stats.recentList.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="text-4xl mb-3">📦</p>
                  <p className="text-sm text-gray-600 mb-4">No orders yet</p>
                  <button
                    onClick={() => router.push('/new?mode=order')}
                    className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md"
                  >
                    Send your first invoice →
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {stats.recentList.map((o: any) => {
                    const isPaid = o.status === 'paid' || o.status === 'done'
                    return (
                      <Link key={o.id} href={'/orders/' + o.id} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                        <div className="w-9 h-9 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center font-bold text-sm">
                          {(o.customer_name || 'W').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-sm">{o.customer_name || 'Walk-in'}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            {' · '}
                            {new Date(o.created_at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-sm">₹{parseFloat(String(o.total)).toLocaleString('en-IN')}</p>
                          <p className={'text-[10px] font-bold ' + (isPaid ? 'text-green-600' : 'text-amber-600')}>
                            {isPaid ? '✓ Paid' : '⏳ Pending'}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'customers' && stats && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Top customers</h2>
                <p className="text-xs text-gray-500 mt-1">By total spent · Last 30 days</p>
              </div>
              {stats.topCustomers.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="text-4xl mb-3">👥</p>
                  <p className="text-sm text-gray-600">No customers yet. Send your first invoice to track regulars.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {stats.topCustomers.map((c, i) => (
                    <div key={i} className="px-6 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#EFEEFF] text-[#635BFF] rounded-full flex items-center justify-center font-bold">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.orderCount} {c.orderCount === 1 ? 'order' : 'orders'}{c.phone ? ' · +91 ' + c.phone : ''}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">₹{c.total.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'items' && stats && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Top items</h2>
                <p className="text-xs text-gray-500 mt-1">Most ordered · Last 30 days</p>
              </div>
              {stats.topItems.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="text-4xl mb-3">📝</p>
                  <p className="text-sm text-gray-600">No items yet. Add items as you create invoices.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {stats.topItems.map((it, i) => (
                    <div key={i} className="px-6 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 bg-[#EFEEFF] text-[#635BFF] rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                          #{i + 1}
                        </div>
                        <p className="font-semibold text-gray-900 truncate text-sm">{it.name}</p>
                      </div>
                      <p className="text-sm text-gray-600 font-medium flex-shrink-0">{it.count} sold</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'me' && (
            <div className="space-y-3 max-w-2xl">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Business profile</h3>
                  <Link href="/setup" className="text-sm text-[#635BFF] font-bold hover:text-[#4D44E0]">Edit →</Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500 text-xs mb-1 font-semibold uppercase tracking-wider">Name</p><p className="text-gray-900 font-bold">{business?.business_name}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1 font-semibold uppercase tracking-wider">Type</p><p className="text-gray-900 font-bold capitalize">{business?.business_type}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1 font-semibold uppercase tracking-wider">UPI ID</p><p className="text-gray-900 font-bold break-all">{business?.upi_id}</p></div>
                  <div><p className="text-gray-500 text-xs mb-1 font-semibold uppercase tracking-wider">Phone</p><p className="text-gray-900 font-bold">+91 {phone}</p></div>
                </div>
              </div>

              <Link href="/support" className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div><h3 className="font-bold text-gray-900 mb-1">🙏 Help & Support</h3><p className="text-sm text-gray-500">FAQ, email, report a problem</p></div>
                  <span className="text-[#635BFF] text-2xl">→</span>
                </div>
              </Link>

              <Link href="/pricing" className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#BDB9FF] transition-all">
                <div className="flex items-center justify-between">
                  <div><h3 className="font-bold text-gray-900 mb-1">💎 Subscription</h3><p className="text-sm text-gray-500 mb-1">Free Plan · 30 invoices/month</p><p className="text-xs text-[#4D44E0] font-bold">Tap to upgrade to Pro →</p></div>
                  <span className="text-[#635BFF] text-2xl">→</span>
                </div>
              </Link>

              <button onClick={handleLogout} className="w-full bg-white text-red-500 border border-red-200 py-3 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors">
                Logout
              </button>
            </div>
          )}

        </main>
      </div>

      <button
        onClick={() => router.push('/new?mode=order')}
        className="fixed bottom-24 right-6 lg:bottom-8 w-14 h-14 sm:w-16 sm:h-16 bg-[#635BFF] text-white rounded-2xl shadow-2xl shadow-[#635BFF]/40 hover:bg-[#4D44E0] transition-colors flex items-center justify-center text-3xl font-light z-20"
        aria-label="New invoice"
      >
        +
      </button>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="flex max-w-2xl mx-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { if (t.id === 'items') { router.push('/items'); return } if (t.id === 'customers') { router.push('/customers'); return } setActiveTab(t.id) }}
              className={'flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-colors ' + (activeTab === t.id ? 'text-[#635BFF]' : 'text-gray-400 hover:text-gray-600')}
            >
              <span className="text-xl">{t.icon}</span>
              <span className="text-[10px] font-semibold">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

    </div>
  )
}
