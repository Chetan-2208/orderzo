import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// This runs daily via Vercel Cron
export async function GET(request: NextRequest) {
  // Optional: Verify cron secret to prevent abuse
  const authHeader = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Get all active businesses
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id, business_name, owner_phone, email')
    
    if (!businesses || businesses.length === 0) {
      return NextResponse.json({ message: 'No businesses found', count: 0 })
    }

    // Get last 24 hours range (simpler, more reliable)
    const now = new Date()
    const todayEnd = new Date(now.getTime())
    const todayStart = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    console.log('Cron checking orders between:', todayStart.toISOString(), 'and', todayEnd.toISOString())

    const summaries: any[] = []

    for (const business of businesses) {
      // Get today's orders for this business
      const { data: orders } = await supabase
        .from('orders')
        .select('*, customers(name)')
        .eq('business_id', business.id)
        .gte('created_at', todayStart.toISOString())
        .lt('created_at', todayEnd.toISOString())

      if (!orders || orders.length === 0) continue

      // Calculate stats
      const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
      const totalOrders = orders.length
      const paidOrders = orders.filter(o => o.status === 'paid' || o.status === 'done').length
      const pendingAmount = orders.filter(o => o.status === 'sent' || o.status === 'pending').reduce((s, o) => s + (o.total || 0), 0)

      // Top customer
      const customerTotals: Record<string, { name: string; total: number }> = {}
      orders.forEach((o: any) => {
        if (o.customer_id && o.customers?.name) {
          if (!customerTotals[o.customer_id]) {
            customerTotals[o.customer_id] = { name: o.customers.name, total: 0 }
          }
          customerTotals[o.customer_id].total += o.total || 0
        }
      })
      const topCustomer = Object.values(customerTotals).sort((a, b) => b.total - a.total)[0]

      // Channel breakdown
      const channelCounts: Record<string, number> = {}
      orders.forEach((o: any) => {
        const ch = o.channel || 'walkin'
        channelCounts[ch] = (channelCounts[ch] || 0) + 1
      })
      const topChannels = Object.entries(channelCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)

      const summary = {
        business_id: business.id,
        business_name: business.business_name,
        owner_phone: business.owner_phone,
        email: business.email,
        date: todayStart.toISOString().split('T')[0],
        total_revenue: totalRevenue,
        total_orders: totalOrders,
        paid_orders: paidOrders,
        pending_amount: pendingAmount,
        top_customer: topCustomer || null,
        top_channels: topChannels,
        created_at: new Date().toISOString(),
      }

      // Save summary to database for in-app display
      await supabase.from('daily_summaries').upsert(summary, {
        onConflict: 'business_id,date'
      })

      summaries.push(summary)
    }

    return NextResponse.json({
      success: true,
      processed: summaries.length,
      summaries: summaries.map(s => ({
        business: s.business_name,
        revenue: s.total_revenue,
        orders: s.total_orders
      }))
    })
  } catch (error: any) {
    console.error('Daily summary error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
