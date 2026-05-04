import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || ''
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || ''

    // Verify signature
    if (webhookSecret) {
      const expected = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex')
      
      if (expected !== signature) {
        console.error('Invalid Razorpay webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const eventType = body.event

    console.log('Razorpay webhook received:', eventType)

    if (eventType === 'payment_link.paid') {
      const paymentLink = body.payload?.payment_link?.entity
      const payment = body.payload?.payment?.entity
      
      if (!paymentLink) {
        return NextResponse.json({ ok: true })
      }

      const orderId = paymentLink.reference_id
      const paymentId = payment?.id || paymentLink.id

      if (!orderId) {
        console.error('No order ID in webhook')
        return NextResponse.json({ ok: true })
      }

      // Update order status
      const { data: orderData, error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          payment_id: paymentId,
        })
        .eq('id', orderId)
        .select('*, businesses(id, business_name), customers(name)')
        .single()

      if (updateError) {
        console.error('Could not update order:', updateError)
        return NextResponse.json({ error: 'Update failed' }, { status: 500 })
      }

      if (orderData && orderData.businesses) {
        const customerName = (orderData as any).customers?.name || 'Customer'
        const amount = parseFloat(orderData.total)
        const businessId = (orderData as any).businesses.id

        // Insert notification for shop owner
        const { error: notifError } = await supabase
          .from('notifications')
          .insert({
            business_id: businessId,
            order_id: orderId,
            type: 'payment_received',
            title: 'Payment Received!',
            message: `${customerName} paid Rs.${amount}`,
            amount: amount,
            read: false,
          })

        if (notifError) {
          console.error('Could not create notification:', notifError)
        } else {
          console.log('Notification created for business:', businessId)
        }
      }

      return NextResponse.json({ ok: true, processed: true })
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message || 'Webhook failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'webhook endpoint live' })
}
