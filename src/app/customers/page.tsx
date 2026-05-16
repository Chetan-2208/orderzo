"use client";

import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'
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
  const [phone, setPhone] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'spent' | 'recent' | 'orders' | 'pending'>('spent')
  const [filterType, setFilterType] = useState<'all' | 'vips' | 'new' | 'owe-me'>('all')
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    loadData(savedPhone)
  }, [router])

  const loadData = async (phoneNum: string) => {
    const { data: businessData } = await supabase
      .from('businesses').select('*').eq('owner_phone', phoneNum).single()
    if (!businessData) { router.push('/setup'); return }
    setBusiness(businessData)

    const { data: customersData } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessData.id)

    if (!customersData) { setLoading(false); return }

    const { data: ordersData } = await supabase
      .from('orders')
      .select('customer_id, total, status, created_at')
      .eq('business_id', businessData.id)

    const orders = ordersData || []

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

    if (insertError) { setError('Could not add: ' + insertError.message); return }

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
    if (!customer.phone) { alert('Customer has no phone number'); return }
    const cleanPhone = customer.phone.replace(/\D/g, '')
    const fullPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone
    const message = customMsg || `Namaste ${customer.name}, this is ${business?.business_name}. How can we help you today?`
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleDelete = async (customerId: string, name: string) => {
    if (!confirm('Delete customer "' + name + '"? Their order history will remain.')) return

    const { error } = await supabase.from('customers').delete().eq('id', customerId)
    if (!error) {
      setCustomers(customers.filter(c => c.id !== customerId))
    }
  }

  const vipThreshold = (() => {
    if (customers.length < 5) return Infinity
    const sortedSpent = [...customers].map(c => c.total_spent).sort((a, b) => b - a)
    const top20Index = Math.max(0, Math.floor(customers.length * 0.2) - 1)
    return sortedSpent[top20Index] || 0
  })()

  const countAll = customers.length
  const countVips = customers.filter(c => c.total_spent >= vipThreshold && c.total_spent > 0).length
  const countNew = customers.filter(c => {
    if (!c.first_order_date) return false
    const daysSince = (Date.now() - new Date(c.first_order_date).getTime()) / (1000 * 60 * 60 * 24)
    return daysSince <= 7
  }).length
  const countOweMe = customers.filter(c => c.total_pending > 0).length

  const getFiltered = () => {
    let filtered = [...customers]

    if (filterType === 'vips') {
      filtered = filtered.filter(c => c.total_spent >= vipThreshold && c.total_spent > 0)
    } else if (filterType === 'new') {
      filtered = filtered.filter(c => {
        if (!c.first_order_date) return false
        const daysSince = (Date.now() - new Date(c.first_order_date).getTime()) / (1000 * 60 * 60 * 24)
        return daysSince <= 7
      })
    } else if (filterType === 'owe-me') {
      filtered = filtered.filter(c => c.total_pending > 0)
    }

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
    if (days < 7) return days + ' days ago'
    if (days < 30) return Math.floor(days / 7) + ' weeks ago'
    if (days < 365) return Math.floor(days / 30) + ' months ago'
    return Math.floor(days / 365) + ' years ago'
  }

  const filterChips: { id: typeof filterType; label: string; count: number; color: string }[] = [
    { id: 'all', label: 'All', count: countAll, color: 'gray' },
    { id: 'vips', label: '⭐ VIPs', count: countVips, color: 'amber' },
    { id: 'new', label: '🆕 New', count: countNew, color: 'green' },
    { id: 'owe-me', label: '💰 Owe me', count: countOweMe, color: 'red' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

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
              <p className="text-xs text-gray-500 font-medium">Your people</p>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">Customers</h1>
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
          <div className="bg-gradient-to-br from-[#F4F3FF] via-white to-[#EFEEFF] rounded-3xl p-6 border border-[#EFEEFF] shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 font-semibold mb-2 uppercase tracking-wider">
              Your people
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 leading-tight">
              {customers.length} {customers.length === 1 ? 'customer' : 'customers'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-green-600">₹{totalSpent.toLocaleString('en-IN')}</span>
                <span className="text-xs text-gray-600">collected</span>
              </div>
              {totalPending > 0 && (
                <>
                  <span className="text-gray-300">·</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-amber-600">₹{totalPending.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-600">pending</span>
                  </div>
                </>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-3">
              Track every regular. Send reminders. <strong className="text-gray-900">Get paid faster.</strong>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {showAddCustomer ? (
          <div className="mb-6 bg-white rounded-2xl border-2 border-[#635BFF] shadow-md overflow-hidden">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-gray-900">Add new customer</h2>
                <button
                  type="button"
                  onClick={() => { setShowAddCustomer(false); setNewCustomerName(''); setNewCustomerPhone(''); setError('') }}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Customer name
                </label>
                <input
                  type="text"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="e.g. Lakshmi"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-base"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Phone (optional)
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm font-medium">+91</div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-base"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Required to send WhatsApp reminders</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowAddCustomer(false); setNewCustomerName(''); setNewCustomerPhone(''); setError('') }}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCustomer}
                  className="flex-1 bg-[#635BFF] hover:bg-[#4D44E0] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
                >
                  Save customer
                </button>
              </div>
            </div>
          </div>
        ) : (
          customers.length > 0 && (
            <>
              <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                {filterChips.map(chip => (
                  <button
                    key={chip.id}
                    onClick={() => setFilterType(chip.id)}
                    className={
                      'flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all border ' +
                      (filterType === chip.id
                        ? 'bg-[#635BFF] text-white border-[#635BFF] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300')
                    }
                  >
                    {chip.label} <span className={filterType === chip.id ? 'text-white/80' : 'text-gray-400'}>{chip.count}</span>
                  </button>
                ))}
              </div>

              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] text-sm"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                >
                  <option value="spent">By spent</option>
                  <option value="recent">By recent</option>
                  <option value="orders">By orders</option>
                  <option value="pending">By pending</option>
                </select>
              </div>
            </>
          )
        )}

        {customers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 text-center">
            <p className="text-5xl mb-4">👥</p>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No customers yet</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
              Add your regulars like Lakshmi or Ravi. Then tap their name to send invoices in seconds.
            </p>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
            >
              + Add your first customer
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-sm text-gray-600">No customers match your filter</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterType('all') }}
              className="mt-3 text-sm text-[#635BFF] font-bold hover:text-[#4D44E0]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
            {filtered.map((customer) => {
              const isVip = customer.total_spent >= vipThreshold && customer.total_spent > 0
              const hasPending = customer.total_pending > 0

              return (
                <div key={customer.id} className="p-4 sm:p-5">
                  <Link
                    href={'/customers/' + customer.id}
                    className="flex items-start gap-3 -mx-4 sm:-mx-5 px-4 sm:px-5 py-1 hover:bg-gray-50 rounded transition-colors"
                  >
                    <div className={
                      'w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0 ' +
                      (isVip ? 'bg-amber-100 text-amber-700' : 'bg-[#EFEEFF] text-[#635BFF]')
                    }>
                      {customer.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-900 truncate text-sm sm:text-base">{customer.name}</p>
                        {isVip && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">⭐ VIP</span>}
                        {hasPending && <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">Owes you</span>}
                      </div>
                      {customer.phone && (
                        <p className="text-xs text-gray-400">+91 {customer.phone}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-0.5">
                        {customer.total_orders} {customer.total_orders === 1 ? 'order' : 'orders'} · last {formatTimeAgo(customer.last_order_date)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <p className="font-extrabold text-gray-900 text-sm sm:text-base">₹{customer.total_spent.toLocaleString('en-IN')}</p>
                      {hasPending && (
                        <p className="text-[10px] font-bold text-amber-600">+₹{customer.total_pending.toLocaleString('en-IN')} pending</p>
                      )}
                    </div>
                  </Link>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    {customer.phone ? (
                      <button
                        onClick={() => handleWhatsApp(customer)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        💬 WhatsApp
                      </button>
                    ) : (
                      <span className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-50 text-gray-400 px-3 py-2 rounded-lg text-xs font-medium">
                        No phone
                      </span>
                    )}
                    <button
                      onClick={() => router.push('/new?customer=' + customer.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#EFEEFF] hover:bg-[#DAD8FF] text-[#635BFF] px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                    >
                      + Invoice
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id, customer.name)}
                      className="inline-flex items-center justify-center bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                      aria-label="Delete customer"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filtered.length > 0 && !showAddCustomer && (
          <p className="text-center text-xs text-gray-500 mt-6">
            Showing {filtered.length} of {customers.length} · Tap a customer to see history
          </p>
        )}

      </main>

      {!showAddCustomer && (
        <button
          onClick={() => setShowAddCustomer(true)}
          className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#635BFF] text-white rounded-2xl shadow-2xl shadow-[#635BFF]/40 hover:bg-[#4D44E0] transition-colors flex items-center justify-center text-3xl font-light z-20"
          aria-label="Add new customer"
        >
          +
        </button>
      )}

    </div>
  )
}
