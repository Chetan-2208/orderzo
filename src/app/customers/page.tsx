"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Customer {
  id: string
  name: string
  phone?: string
  total_orders: number
  total_spent: number
  total_pending: number
  last_order_date?: string
  first_order_date?: string
}

interface Business {
  id: string
  business_name: string
}

export default function CustomersPage() {
  const [business, setBusiness] = useState<Business | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'spent' | 'recent' | 'orders' | 'pending'>('spent')
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
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

    // Get all customers
    const { data: customersData } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessData.id)

    if (!customersData) { setLoading(false); return }

    // Get all orders to calculate stats
    const { data: ordersData } = await supabase
      .from('orders')
      .select('customer_id, total, status, created_at')
      .eq('business_id', businessData.id)

    const orders = ordersData || []

    // Aggregate stats per customer
    const enriched: Customer[] = customersData.map(c => {
      const customerOrders = orders.filter(o => o.customer_id === c.id)
      const paid = customerOrders.filter(o => o.status === 'paid' || o.status === 'done')
      const pending = customerOrders.filter(o => o.status === 'sent' || o.status === 'new')
      
      const dates = customerOrders.map(o => new Date(o.created_at).getTime()).sort()
      
      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        total_orders: customerOrders.length,
        total_spent: paid.reduce((sum, o) => sum + parseFloat(o.total as any), 0),
        total_pending: pending.reduce((sum, o) => sum + parseFloat(o.total as any), 0),
        last_order_date: dates.length > 0 ? new Date(dates[dates.length - 1]).toISOString() : undefined,
        first_order_date: dates.length > 0 ? new Date(dates[0]).toISOString() : undefined,
      }
    })

    setCustomers(enriched)
    setLoading(false)
  }

  const handleAddCustomer = async () => {
    setError('')
    if (!newCustomerName.trim()) { setError('Name is required'); return }
    
    const cleanPhone = newCustomerPhone.replace(/\D/g, '')
    if (cleanPhone && cleanPhone.length !== 10) { setError('Phone must be 10 digits or empty'); return }
    
    if (!business) return

    const { data, error: insertError } = await supabase
      .from('customers')
      .insert({
        business_id: business.id,
        name: newCustomerName.trim(),
        phone: cleanPhone || null,
      })
      .select()
      .single()

    if (insertError) {
      setError('Could not add: ' + insertError.message)
      return
    }

    if (data) {
      setCustomers([{
        id: data.id,
        name: data.name,
        phone: data.phone,
        total_orders: 0,
        total_spent: 0,
        total_pending: 0,
      }, ...customers])
      setNewCustomerName('')
      setNewCustomerPhone('')
      setShowAddCustomer(false)
    }
  }

  const handleWhatsApp = (customer: Customer, customMsg?: string) => {
    if (!customer.phone) {
      alert('Customer has no phone number')
      return
    }
    const cleanPhone = customer.phone.replace(/\D/g, '')
    const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
    const message = customMsg || `Namaste ${customer.name}, this is ${business?.business_name}. How can we help you today?`
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleDelete = async (customerId: string, name: string) => {
    if (!confirm(`Delete customer "${name}"? Their order history will remain.`)) return
    
    const { error } = await supabase.from('customers').delete().eq('id', customerId)
    if (!error) {
      setCustomers(customers.filter(c => c.id !== customerId))
    }
  }

  // Filter + sort
  const getFiltered = () => {
    let filtered = [...customers]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(q) || c.phone?.includes(q)
      )
    }
    
    if (sortBy === 'spent') filtered.sort((a, b) => b.total_spent - a.total_spent)
    else if (sortBy === 'orders') filtered.sort((a, b) => b.total_orders - a.total_orders)
    else if (sortBy === 'pending') filtered.sort((a, b) => b.total_pending - a.total_pending)
    else if (sortBy === 'recent') {
      filtered.sort((a, b) => {
        const aDate = a.last_order_date ? new Date(a.last_order_date).getTime() : 0
        const bDate = b.last_order_date ? new Date(b.last_order_date).getTime() : 0
        return bDate - aDate
      })
    }
    
    return filtered
  }

  const filtered = getFiltered()
  const totalSpent = customers.reduce((sum, c) => sum + c.total_spent, 0)
  const totalPending = customers.reduce((sum, c) => sum + c.total_pending, 0)

  const formatTimeAgo = (dateStr?: string) => {
    if (!dateStr) return 'never'
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'today'
    if (days === 1) return 'yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-orange-500/30 animate-pulse">O</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link href="/dashboard" className="text-gray-500 text-2xl">←</Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Customers</h1>
            <p className="text-xs text-gray-500">{business?.business_name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        {/* Top stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-1">Customers</p>
            <p className="text-lg font-bold text-gray-900">{customers.length}</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-1">Collected</p>
            <p className="text-lg font-bold text-green-600">₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-1">Pending</p>
            <p className="text-lg font-bold text-orange-500">₹{totalPending.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Add customer */}
        {showAddCustomer ? (
          <div className="bg-white rounded-2xl p-5 border-2 border-orange-300 shadow-lg shadow-orange-500/10 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Add new customer</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Customer name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
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
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-2">
                <button onClick={handleAddCustomer} className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl font-medium hover:bg-orange-600">Add</button>
                <button onClick={() => { setShowAddCustomer(false); setNewCustomerName(''); setNewCustomerPhone(''); setError('') }} className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl">Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCustomer(true)}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors mb-3"
          >
            + Add new customer
          </button>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 mb-3"
        />

        {/* Sort */}
        <div className="bg-white rounded-2xl p-1 border border-gray-200 mb-4 flex gap-1 text-xs">
          {([
            ['spent', '💰 Top Spent'],
            ['orders', '📦 Most Orders'],
            ['recent', '⏰ Recent'],
            ['pending', '⏳ Pending'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                sortBy === key
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Customer list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-200">
            <div className="text-6xl mb-3">👥</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {customers.length === 0 ? 'No customers yet' : 'No customers found'}
            </h3>
            <p className="text-sm text-gray-500">
              {customers.length === 0 ? 'Add your first customer or create an order' : 'Try a different search'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((customer, idx) => (
              <div key={customer.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {sortBy === 'spent' && idx < 3 && (
                        <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                          idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                          idx === 1 ? 'bg-gray-200 text-gray-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                      <h4 className="font-bold text-gray-900 truncate">{customer.name}</h4>
                    </div>
                    {customer.phone && (
                      <p className="text-xs text-gray-500">+91 {customer.phone}</p>
                    )}
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xl font-bold text-orange-500">₹{customer.total_spent.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-400">total spent</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center bg-gray-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-gray-900">{customer.total_orders}</p>
                    <p className="text-xs text-gray-500">orders</p>
                  </div>
                  <div className="text-center bg-orange-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-orange-600">₹{customer.total_pending.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-500">pending</p>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg py-2">
                    <p className="text-sm font-bold text-blue-700">{formatTimeAgo(customer.last_order_date)}</p>
                    <p className="text-xs text-gray-500">last visit</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {customer.phone && (
                    <button
                      onClick={() => handleWhatsApp(customer)}
                      className="flex-1 bg-green-50 text-green-700 border border-green-200 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      💬 WhatsApp
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(customer.id, customer.name)}
                    className="bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
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
