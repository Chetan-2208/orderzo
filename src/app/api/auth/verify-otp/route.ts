import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: Request) {
  try {
    const { phone, otp, country } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP required' }, { status: 400 })
    }

    if (otp.length !== 6) {
      return NextResponse.json({ error: 'OTP must be 6 digits' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/\D/g, '')
    const countryCode = country === 'us' ? '+1' : '+91'
    const fullPhone = `${countryCode}${cleanPhone}`

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const verifySid = process.env.TWILIO_VERIFY_SID

    if (!accountSid || !authToken || !verifySid) {
      return NextResponse.json({ error: 'OTP service not configured' }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)

    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: fullPhone,
        code: otp,
      })

    console.log(`OTP verification for ${fullPhone}: ${verificationCheck.status}`)

    if (verificationCheck.status === 'approved') {
      return NextResponse.json({
        success: true,
        verified: true,
        phone: cleanPhone,
      })
    } else {
      return NextResponse.json({
        success: false,
        verified: false,
        error: 'Wrong OTP. Please try again.',
      }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Verify OTP error:', error)
    
    let userMessage = 'Could not verify OTP. Please try again.'
    
    if (error.code === 60200) {
      userMessage = 'Invalid OTP format'
    } else if (error.code === 20404) {
      userMessage = 'OTP expired. Request a new one.'
    } else if (error.code === 60202) {
      userMessage = 'Too many attempts. Request a new OTP.'
    }

    return NextResponse.json({ error: userMessage, code: error.code }, { status: 500 })
  }
}
