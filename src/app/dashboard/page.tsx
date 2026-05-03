"use client";

import { useState, useEffect } from 'react'
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
  created_at: string
}

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'customers' | 'settings'>('orders')
  const [showModeSheet, setShowModeSheet] = useState(false)
  const [todayOrders, setTodayOrders] = useState<Order[]>([])
  const [todayTotal, setTodayTotal] = useState(0)
  const [paidCount, setPaidCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) {
      router.push('/login')
      return
    }
    setPhone(savedPhone)

    loadDashboard(savedPhone)
  }, [router])

  const loadDashboard = async (phoneNum: string) => {
    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_phone', phoneNum)
      .single()

    if (businessError || !businessData) {
      router.push('/setup')
      return
    }

    setBusiness(businessData)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: ordersData } = await supabase
      .from('orders')
      .select('*, customers(name)')
      .eq('business_id', businessData.id)
      .gte('created_at', today.toISOString())
      .order('created_at', { ascending: false })

    if (ordersData) {
      const orders = ordersData.map((o: any) => ({
        ...o,
        customer_name: o.customers?.name || 'Walk-in customer'
      }))
      setTodayOrders(orders)

      const paid = orders.filter(o => o.status === 'paid' || o.status === 'done')
      const pending = orders.filter(o => o.status === 'sent' || o.status === 'new')
      
      setTodayTotal(paid.reduce((sum, o) => sum + parseFloat(o.total), 0))
      setPaidCount(paid.length)
      setPendingCount(pending.length)
    }

    setLoading(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-orange-500/30 mx-auto mb-4 animate-pulse">
            O
          </div>
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
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              O
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{business?.business_name}</h1>
              <p className="text-xs text-gray-500">+91 {phone}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 px-3 py-1"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'orders' && (
          <>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/30 mb-6">
              <p className="text-orange-100 text-sm font-medium mb-1">
                Today, {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </p>
              <h2 className="text-4xl font-bold mb-2">₹{todayTotal} collected</h2>
              <p className="text-orange-100 text-sm">{todayOrders.length} orders · {paidCount} paid · {pendingCount} pending</p>
            </div>

            {todayOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet today</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Tap the + button below to add your first order or bill
                </p>
                <p className="text-xs text-gray-400">
                  💡 Tip: Add your menu items in Settings first
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 px-2 mb-2">Recent</h3>
                {todayOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
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
                        <p className="font-medium text-gray-900">{order.customer_name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-orange-500">₹{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No customers yet</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Customers are added automatically when you create orders or bills
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-900">Business Info</h3><Link href="/setup" className="text-sm text-orange-500 font-medium hover:text-orange-600">Edit →</Link></div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Business Name</p>
                  <p className="text-gray-900 font-medium">{business?.business_name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Type</p>
                  <p className="text-gray-900 font-medium capitalize">{business?.business_type}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">UPI ID</p>
                  <p className="text-gray-900 font-medium">{business?.upi_id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Phone</p>
                  <p className="text-gray-900 font-medium">+91 {phone}</p>
                </div>
              </div>
            </div>

            <Link
              href="/items"
              className="block bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
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

            <button
              onClick={handleLogout}
              className="w-full bg-white text-red-500 border border-red-200 py-3 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
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
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setShowModeSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-40 shadow-2xl max-w-2xl mx-auto">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">What do you want to do?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Pick how you are capturing this transaction</p>

            <div className="space-y-3">
              <button
                onClick={() => handleModeSelect('order')}
                className="w-full bg-orange-50 border-2 border-orange-200 hover:border-orange-500 rounded-2xl p-4 text-left transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">New Order</h4>
                    <p className="text-xs text-gray-600">Customer ordered remotely (WhatsApp, phone, etc.)</p>
                  </div>
                  <span className="text-orange-500 text-xl">→</span>
                </div>
              </button>

              <button
                onClick={() => handleModeSelect('bill')}
                className="w-full bg-orange-50 border-2 border-orange-200 hover:border-orange-500 rounded-2xl p-4 text-left transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-2xl">
                    🧾
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">New Bill</h4>
                    <p className="text-xs text-gray-600">Customer is at your shop / counter</p>
                  </div>
                  <span className="text-orange-500 text-xl">→</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowModeSheet(false)}
              className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="max-w-2xl mx-auto flex">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'orders' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-2xl">📋</span>
            <span className="text-xs font-medium">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'customers' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-2xl">👥</span>
            <span className="text-xs font-medium">Customers</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'settings' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
