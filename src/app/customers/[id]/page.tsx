'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CustomerProfilePage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params?.id as string

  const [customer, setCustomer] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const phone = localStorage.getItem('orderzo_user_phone')
    if (!phone) { router.push('/login'); return }
    loadData(phone)
  }, [router, customerId])

  const loadData = async (phone: string) => {
    try {
      const { data: businessData } = await supabase
        .from('businesses').select('*').eq('owner_phone', phone).single()
      
      if (businessData) {
        setBusiness(businessData)

        const { data: customerData } = await supabase
          .from('customers').select('*').eq('id', customerId).single()
        
        if (customerData) {
          setCustomer(customerData)

          const { data: ordersData } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_id', customerId)
            .eq('business_id', businessData.id)
            .order('created_at', { ascending: false })
          
          setOrders(ordersData || [])
        }
      }
    } catch (e) { console.error('Load error:', e) }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading customer...</div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Customer not found</h1>
          <button onClick={() => router.push('/customers')} className="text-orange-600 font-semibold">
            ← Back to customers
          </button>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const totalVisits = orders.length
  const avgOrder = totalVisits > 0 ? Math.round(totalSpent / totalVisits) : 0
  const paidOrders = orders.filter(o => o.status === 'paid' || o.status === 'done').length
  const pendingAmount = orders.filter(o => o.status === 'sent' || o.status === 'pending').reduce((s, o) => s + (o.total || 0), 0)
  const lastVisit = orders[0]?.created_at ? new Date(orders[0].created_at) : null
  const firstVisit = orders[orders.length - 1]?.created_at ? new Date(orders[orders.length - 1].created_at) : null

  // Loyalty tier
  let tier = 'New'
  let tierEmoji = '✨'
  let tierColor = 'bg-gray-100 text-gray-700'
  if (totalSpent >= 10000) { tier = 'VIP'; tierEmoji = '💎'; tierColor = 'bg-purple-100 text-purple-700' }
  else if (totalSpent >= 5000) { tier = 'Gold'; tierEmoji = '⭐'; tierColor = 'bg-yellow-100 text-yellow-700' }
  else if (totalSpent >= 2000) { tier = 'Silver'; tierEmoji = '🥈'; tierColor = 'bg-gray-100 text-gray-700' }
  else if (totalVisits >= 3) { tier = 'Regular'; tierEmoji = '👋'; tierColor = 'bg-blue-100 text-blue-700' }

  const handleWhatsApp = () => {
    const phone = customer.phone?.replace(/\D/g, '')
    if (!phone) return
    const fullPhone = phone.length === 10 ? '91' + phone : phone
    const message = `Hi ${customer.name}, this is ${business?.business_name || 'us'}.`
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-600 text-xl">←</button>
        <div className="flex-1">
          <h1 className="font-bold text-lg text-gray-900">Customer Profile</h1>
          <p className="text-xs text-gray-500">{business?.business_name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Customer info card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-600">
              {customer.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
              {customer.phone && (
                <p className="text-gray-500 text-sm mt-1">+91 {customer.phone}</p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${tierColor}`}>
                  {tierEmoji} {tier} Customer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500 mb-1">Total spent</div>
            <div className="text-2xl font-bold text-gray-900">Rs.{totalSpent}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500 mb-1">Total visits</div>
            <div className="text-2xl font-bold text-gray-900">{totalVisits}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500 mb-1">Average order</div>
            <div className="text-xl font-bold text-gray-900">Rs.{avgOrder}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500 mb-1">Pending</div>
            <div className={`text-xl font-bold ${pendingAmount > 0 ? 'text-orange-600' : 'text-gray-900'}`}>
              Rs.{pendingAmount}
            </div>
          </div>
        </div>

        {/* Customer journey */}
        {firstVisit && (
          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4">
            <div className="text-xs font-semibold text-orange-700 mb-2">📅 Customer journey</div>
            <div className="text-sm text-gray-700">
              First order: <span className="font-semibold">{firstVisit.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            {lastVisit && (
              <div className="text-sm text-gray-700 mt-1">
                Last order: <span className="font-semibold">{lastVisit.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            disabled={!customer.phone}
            className="bg-green-500 text-white rounded-2xl py-4 font-semibold disabled:bg-gray-200 disabled:text-gray-400 hover:bg-green-600 transition-all"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={() => router.push(`/new?customer=${customerId}`)}
            className="bg-orange-500 text-white rounded-2xl py-4 font-semibold hover:bg-orange-600 transition-all"
          >
            ➕ New Order
          </button>
        </div>

        {/* Order history */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Order History ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📦</div>
              <div className="text-sm">No orders yet</div>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const date = new Date(order.created_at)
                const isPaid = order.status === 'paid' || order.status === 'done'
                return (
                  <div
                    key={order.id}
                    onClick={() => router.push(`/orders/${order.id}/edit`)}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        {order.mode === 'bill' ? 'Bill' : 'Order'} #{order.id?.slice(0, 8).toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {order.channel && ` · ${order.channel}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">Rs.{order.total}</div>
                      <div className={`text-xs font-semibold mt-0.5 ${
                        isPaid ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {isPaid ? '✓ Paid' : '⏳ Pending'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
