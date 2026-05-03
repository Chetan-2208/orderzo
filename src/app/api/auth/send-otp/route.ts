import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: Request) {
  try {
    const { phone, country } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/\D/g, '')
    
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })
    }

    const countryCode = country === 'us' ? '+1' : '+91'
    const fullPhone = `${countryCode}${cleanPhone}`

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SID

    if (!accountSid || !authToken || !verifySid) {
      console.error('Twilio credentials not configured')
      return NextResponse.json({ error: 'OTP service not configured' }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)

    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: fullPhone,
        channel: 'sms',
      })

    console.log(`OTP sent to ${fullPhone}, status: ${verification.status}`)

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      status: verification.status,
    })
  } catch (error: any) {
    console.error('Send OTP error:', error)
    
    let userMessage = 'Could not send OTP. Please try again.'
    
    if (error.code === 60200) {
      userMessage = 'Invalid phone number format'
    } else if (error.code === 60203) {
      userMessage = 'Max OTP attempts reached. Wait a few minutes.'
    } else if (error.code === 21608) {
      userMessage = 'This number is not verified for trial. Add it in Twilio Console.'
    } else if (error.code === 60410) {
      userMessage = 'OTP service issue. Try again in a moment.'
    }

    return NextResponse.json({ error: userMessage, code: error.code }, { status: 500 })
  }
}
