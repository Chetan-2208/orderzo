"use client";

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

interface OrderInfo {
  total: number
  status: string
  customer_name?: string
  business_name?: string
  business_phone?: string
  paid_at?: string
  items_summary?: string
}

function PaidContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const [order, setOrder] = useState<OrderInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [polling, setPolling] = useState(true)

  useEffect(() => {
    if (!orderId) { setLoading(false); return }
    loadOrder()

    // Poll every 3 seconds for up to 30 seconds in case webhook is delayed
    let attempts = 0
    const interval = setInterval(async () => {
      attempts++
      if (attempts >= 10) {
        setPolling(false)
        clearInterval(interval)
        return
      }
      const updated = await loadOrder()
      if (updated && (updated.status === 'paid' || updated.status === 'done')) {
        setPolling(false)
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [orderId])

  const loadOrder = async (): Promise<OrderInfo | null> => {
    if (!orderId) return null
    const { data } = await supabase
      .from('orders')
      .select('total, status, paid_at, customers(name, phone), businesses(business_name, owner_phone), order_items(item_name, quantity)')
      .eq('id', orderId)
      .single()
    
    if (!data) { setLoading(false); return null }
    
    const info: OrderInfo = {
      total: parseFloat((data as any).total),
      status: (data as any).status,
      paid_at: (data as any).paid_at,
      customer_name: (data as any).customers?.name || 'Customer',
      business_name: (data as any).businesses?.business_name || 'this business',
      business_phone: (data as any).businesses?.owner_phone,
      items_summary: ((data as any).order_items || []).map((i: any) => `${i.item_name} x ${i.quantity}`).join(', '),
    }
    setOrder(info)
    setLoading(false)
    return info
  }

  const messageShopOwner = () => {
    if (!order?.business_phone) return
    const message = `Hi! I've completed the payment of Rs.${order.total} for my order. Thank you!`
    window.open(`https://wa.me/91${order.business_phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const isPaid = order && (order.status === 'paid' || order.status === 'done')

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Logo size={64} />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <Logo size={64} />
        <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Order not found</h1>
        <p className="text-gray-600 mb-6 text-center">The order you're looking for could not be found.</p>
        <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium">Back to home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <Logo size={48} variant="lockup" />
        </div>

        {isPaid ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl shadow-green-500/10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Received!</h1>
            <p className="text-gray-600 mb-6">Thank you for your payment</p>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 mb-6">
              <p className="text-sm text-green-700 font-medium mb-1">Amount Paid</p>
              <p className="text-5xl font-bold text-green-700 mb-2">Rs.{order.total}</p>
              <p className="text-sm text-gray-600">to <span className="font-semibold text-gray-900">{order.business_name}</span></p>
            </div>

            {order.items_summary && (
              <div className="bg-gray-50 rounded-xl p-3 mb-6 text-left">
                <p className="text-xs text-gray-500 mb-1">Order summary:</p>
                <p className="text-sm text-gray-900">{order.items_summary}</p>
              </div>
            )}

            <div className="space-y-3">
              {order.business_phone && (
                <button
                  onClick={messageShopOwner}
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  <span>Message {order.business_name}</span>
                </button>
              )}
              <Link
                href="/"
                className="block w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Done
              </Link>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Powered by Orderzo · Order. Bill. Done.
            </p>
          </div>
        ) : polling ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming payment...</h1>
            <p className="text-gray-600 mb-2">Hold tight, this usually takes a few seconds</p>
            <p className="text-xs text-gray-400 mt-4">Order #{orderId?.slice(0, 8).toUpperCase()}</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⏳</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Pending</h1>
            <p className="text-gray-600 mb-4">We haven't confirmed your payment yet. If you've already paid, it may take a moment.</p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-orange-700 mb-1">Amount</p>
              <p className="text-3xl font-bold text-orange-700">Rs.{order.total}</p>
              <p className="text-sm text-gray-600 mt-1">to {order.business_name}</p>
            </div>

            <div className="space-y-3">
              {order.business_phone && (
                <button
                  onClick={messageShopOwner}
                  className="w-full bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  💬 Message shop owner
                </button>
              )}
              <button
                onClick={() => { setPolling(true); loadOrder() }}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                Check again
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-6">Powered by Orderzo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PaidPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><Logo size={64} /></div>}>
      <PaidContent />
    </Suspense>
  )
}
