'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CustomerProfilePage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params?.id as string

  const [customer, setCustomer] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [business, setBusiness] = useState<any>(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [notesDraft, setNotesDraft] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPhone = localStorage.getItem('orderzo_user_phone')
    if (!savedPhone) { router.push('/login'); return }
    setPhone(savedPhone)
    loadData(savedPhone)
  }, [router, customerId])

  const loadData = async (phoneNum: string) => {
    try {
      const { data: businessData } = await supabase
        .from('businesses').select('*').eq('owner_phone', phoneNum).single()

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
          <Link href="/customers" className="text-[#635BFF] font-bold">
            ← Back to customers
          </Link>
        </div>
      </div>
    )
  }

  const totalSpent = orders.filter(o => o.status === 'paid' || o.status === 'done').reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0)
  const totalVisits = orders.length
  const avgOrder = totalVisits > 0 ? Math.round(orders.reduce((s, o) => s + (parseFloat(o.total) || 0), 0) / totalVisits) : 0
  const pendingAmount = orders.filter(o => o.status === 'sent' || o.status === 'new' || o.status === 'pending').reduce((s, o) => s + (parseFloat(o.total) || 0), 0)
  const lastVisit = orders[0]?.created_at ? new Date(orders[0].created_at) : null
  const firstVisit = orders[orders.length - 1]?.created_at ? new Date(orders[orders.length - 1].created_at) : null

  let tier = 'New'
  let tierEmoji = '✨'
  let tierColor = 'bg-gray-100 text-gray-700'
  if (totalSpent >= 10000) { tier = 'VIP'; tierEmoji = '💎'; tierColor = 'bg-purple-100 text-purple-700' }
  else if (totalSpent >= 5000) { tier = 'Gold'; tierEmoji = '⭐'; tierColor = 'bg-amber-100 text-amber-700' }
  else if (totalSpent >= 2000) { tier = 'Silver'; tierEmoji = '🥈'; tierColor = 'bg-gray-100 text-gray-700' }
  else if (totalVisits >= 3) { tier = 'Regular'; tierEmoji = '👋'; tierColor = 'bg-[#EFEEFF] text-[#4D44E0]' }

  const handleSaveNotes = async () => {
    if (!customer) return
    setSavingNotes(true)
    try {
      const now = new Date().toISOString()
      const { error } = await supabase
        .from('customers')
        .update({ notes: notesDraft.trim() || null, notes_updated_at: now })
        .eq('id', customer.id)

      if (error) {
        alert('Could not save notes: ' + error.message)
      } else {
        setCustomer({ ...customer, notes: notesDraft.trim() || null, notes_updated_at: now })
        setIsEditingNotes(false)
        setNotesDraft('')
      }
    } catch (e: any) {
      alert('Save failed: ' + (e?.message || 'Unknown error'))
    } finally {
      setSavingNotes(false)
    }
  }

  const handleWhatsApp = () => {
    const ph = customer.phone?.replace(/\D/g, '')
    if (!ph) return
    const fullPhone = ph.length === 10 ? '91' + ph : ph
    const message = `Namaste ${customer.name}, this is ${business?.business_name || 'us'}. How can we help you today?`
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    const ph = customer.phone?.replace(/\D/g, '')
    if (!ph) return
    window.location.href = 'tel:+91' + ph
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/customers" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Back to customers">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <p className="text-xs text-gray-500 font-medium">Customer profile</p>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight truncate max-w-[200px]">{customer.name}</h1>
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
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#635BFF] flex items-center justify-center text-2xl font-extrabold text-white shadow-md flex-shrink-0">
                {customer.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight truncate">{customer.name}</h2>
                {customer.phone ? (
                  <p className="text-sm text-gray-600 mt-1">+91 {customer.phone}</p>
                ) : (
                  <p className="text-sm text-gray-400 italic mt-1">No phone number</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className={'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ' + tierColor}>
                    {tierEmoji} {tier} customer
                  </span>
                  {pendingAmount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700">
                      Owes you ₹{pendingAmount.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pt-4 border-t border-[#DAD8FF]">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-gray-900 text-lg">₹{totalSpent.toLocaleString('en-IN')}</span>
                <span className="text-xs text-gray-600">collected</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-gray-900 text-lg">{totalVisits}</span>
                <span className="text-xs text-gray-600">{totalVisits === 1 ? 'order' : 'orders'}</span>
              </div>
              {avgOrder > 0 && (
                <>
                  <span className="text-gray-300">·</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-gray-900 text-lg">₹{avgOrder.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-600">avg</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {customer.phone ? (
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
          ) : (
            <button disabled className="bg-gray-100 text-gray-400 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5">
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
          )}
          {customer.phone ? (
            <button
              onClick={handleCall}
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-3 rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>📞</span>
              <span>Call</span>
            </button>
          ) : (
            <button disabled className="bg-gray-100 text-gray-400 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-1.5">
              <span>📞</span>
              <span>Call</span>
            </button>
          )}
          <button
            onClick={() => router.push('/new?customer=' + customerId)}
            className="bg-[#635BFF] hover:bg-[#4D44E0] text-white py-3 rounded-2xl font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-1.5"
          >
            <span>+</span>
            <span>Invoice</span>
          </button>
        </div>

        {totalVisits > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Spent</div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900">₹{totalSpent.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Orders</div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900">{totalVisits}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Avg</div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900">₹{avgOrder.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Pending</div>
              <div className={'text-base sm:text-lg font-extrabold ' + (pendingAmount > 0 ? 'text-amber-600' : 'text-gray-900')}>
                ₹{pendingAmount.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📝</span>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Private notes</h3>
            </div>
            {!isEditingNotes && (
              <button
                onClick={() => {
                  setNotesDraft(customer.notes || '')
                  setIsEditingNotes(true)
                }}
                className="text-xs text-[#635BFF] font-bold hover:text-[#4D44E0]"
              >
                {customer.notes ? 'Edit' : '+ Add notes'}
              </button>
            )}
          </div>

          <div className="p-5">
            {!isEditingNotes ? (
              <>
                {customer.notes ? (
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{customer.notes}</p>
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    Tap &quot;+ Add notes&quot; to remember things like preferences, allergies, or payment style.
                  </p>
                )}
                {customer.notes_updated_at && (
                  <p className="text-xs text-gray-400 mt-3">
                    Updated {new Date(customer.notes_updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </>
            ) : (
              <>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="e.g. Likes mango pickle. Pays via PhonePe. Allergic to peanuts."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF] mb-3 text-sm"
                  rows={4}
                  autoFocus
                />

                <div className="mb-3">
                  <p className="text-xs text-gray-500 font-semibold mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['⭐ VIP', '💵 Pays cash', '📱 Pays UPI', '🌱 Vegetarian', '🥜 Allergic', '📅 Regular'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const newText = notesDraft ? notesDraft + '\n' + tag : tag
                          setNotesDraft(newText)
                        }}
                        className="px-2.5 py-1 text-[11px] bg-gray-50 hover:bg-[#F4F3FF] hover:text-[#635BFF] border border-gray-200 rounded-full text-gray-700 font-semibold transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditingNotes(false)
                      setNotesDraft('')
                    }}
                    disabled={savingNotes}
                    className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="flex-1 bg-[#635BFF] hover:bg-[#4D44E0] disabled:bg-[#BDB9FF] text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-md"
                  >
                    {savingNotes ? 'Saving...' : 'Save notes'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {firstVisit && (
          <div className="mb-4 bg-[#F4F3FF] rounded-2xl border border-[#EFEEFF] p-4">
            <div className="text-xs font-bold text-[#4D44E0] uppercase tracking-wider mb-2">📅 Customer journey</div>
            <div className="text-sm text-gray-700">
              First order: <span className="font-bold text-gray-900">{firstVisit.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            {lastVisit && (
              <div className="text-sm text-gray-700 mt-1">
                Last order: <span className="font-bold text-gray-900">{lastVisit.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Order history ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">📦</div>
              <p className="text-sm text-gray-600 mb-1 font-semibold">No orders yet</p>
              <p className="text-xs text-gray-400 mb-4">When you send invoices to {customer.name}, they will show here.</p>
              <button
                onClick={() => router.push('/new?customer=' + customerId)}
                className="inline-flex items-center gap-1.5 bg-[#635BFF] hover:bg-[#4D44E0] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md"
              >
                + Send first invoice
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.map((order) => {
                const date = new Date(order.created_at)
                const isPaid = order.status === 'paid' || order.status === 'done'
                const total = parseFloat(order.total) || 0
                return (
                  <Link
                    key={order.id}
                    href={'/orders/' + order.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm">
                        #{order.id?.slice(0, 8).toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}
                        {date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                      </div>
                      {order.notes && (
                        <div className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{order.notes}</div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="font-extrabold text-gray-900 text-base">₹{total.toLocaleString('en-IN')}</div>
                      <div className={'text-[10px] font-bold mt-0.5 ' + (isPaid ? 'text-green-600' : 'text-amber-600')}>
                        {isPaid ? '✓ Paid' : '⏳ Pending'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

      </main>

    </div>
  )
}
