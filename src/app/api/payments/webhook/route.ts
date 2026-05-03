import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-razorpay-signature')
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex')

      if (expectedSignature !== signature) {
        console.error('Webhook signature mismatch')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    console.log('Razorpay webhook event:', body.event)

    if (body.event === 'payment_link.paid') {
      const paymentLink = body.payload?.payment_link?.entity
      const payment = body.payload?.payment?.entity

      if (!paymentLink) {
        console.error('No payment_link entity in webhook')
        return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
      }

      const paymentLinkId = paymentLink.id
      const orderIdFromNotes = paymentLink.notes?.order_id

      console.log(`Payment received for link ${paymentLinkId}, order ${orderIdFromNotes}`)

      let { data: order, error: findError } = await supabase
        .from('orders')
        .select('*')
        .eq('razorpay_payment_link_id', paymentLinkId)
        .single()

      if ((findError || !order) && orderIdFromNotes) {
        const result = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderIdFromNotes)
          .single()
        order = result.data
        findError = result.error
      }

      if (!order) {
        console.error('Order not found for payment link:', paymentLinkId)
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          payment_id: payment?.id || null,
        })
        .eq('id', order.id)

      if (updateError) {
        console.error('Failed to update order:', updateError)
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
      }

      console.log(`Order ${order.id} marked as paid`)
      return NextResponse.json({ success: true, order_id: order.id })
    }

    return NextResponse.json({ success: true, event: body.event })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'webhook endpoint ready' })
}
