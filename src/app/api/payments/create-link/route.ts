import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amount, customerName, customerPhone, businessName } = body

    if (!orderId || !amount) {
      return NextResponse.json({ error: 'Missing orderId or amount' }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      console.error('Razorpay keys not configured')
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 })
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    // Get the host from request headers for callback_url
    const host = request.headers.get('host') || 'orderzo.io'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const callbackUrl = `${protocol}://${host}/paid?order=${orderId}`

    // Clean phone — Razorpay needs +91 prefix or 10 digits
    let cleanPhone = ''
    if (customerPhone) {
      const digits = customerPhone.replace(/\D/g, '')
      cleanPhone = digits.length === 10 ? `+91${digits}` : digits.startsWith('+') ? digits : `+${digits}`
    }

    const paymentLinkPayload: any = {
      amount: Math.round(parseFloat(amount) * 100), // amount in paise
      currency: 'INR',
      accept_partial: false,
      description: `Order from ${businessName || 'Orderzo'}`,
      reference_id: orderId,
      callback_url: callbackUrl,
      callback_method: 'get',
      notify: {
        sms: false,
        email: false,
      },
      reminder_enable: false,
      notes: {
        order_id: orderId,
        business_name: businessName || '',
      },
    }

    if (customerName || cleanPhone) {
      paymentLinkPayload.customer = {}
      if (customerName) paymentLinkPayload.customer.name = customerName
      if (cleanPhone) paymentLinkPayload.customer.contact = cleanPhone
    }

    const paymentLink = await razorpay.paymentLink.create(paymentLinkPayload)

    return NextResponse.json({
      id: paymentLink.id,
      short_url: paymentLink.short_url,
      status: paymentLink.status,
    })
  } catch (error: any) {
    console.error('Razorpay create-link error:', error)
    return NextResponse.json({ 
      error: error.message || 'Could not create payment link',
      details: error.error?.description || null,
    }, { status: 500 })
  }
}
