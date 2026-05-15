import { NextResponse } from 'next/server'

// ⚠️ STUB MODE: Real OTP verification DISABLED
// ⚠️ The ONLY valid OTP is: 123456
// ⚠️ TODO: Replace with real provider when DLT is approved

const STUB_OTP = '123456'

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP required' }, { status: 400 })
    }

    if (otp.length !== 6) {
      return NextResponse.json({ error: 'OTP must be 6 digits' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/\D/g, '')
    const fullPhone = `+91${cleanPhone}`

    if (otp !== STUB_OTP) {
      console.log(`[STUB] Wrong OTP for ${fullPhone}: got ${otp}, expected ${STUB_OTP}`)
      return NextResponse.json({
        error: 'Wrong OTP. Use 123456 in test mode.',
        verified: false,
      }, { status: 401 })
    }

    console.log(`[STUB] OTP verified for ${fullPhone}`)

    return NextResponse.json({
      verified: true,
      phone: cleanPhone,
      message: 'Test mode login successful',
    })
  } catch (error: any) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
