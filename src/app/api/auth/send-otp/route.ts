import { NextResponse } from 'next/server'

// ⚠️ STUB MODE: Real OTP delivery DISABLED
// ⚠️ Test OTP for ALL phones: 123456
// ⚠️ TODO: Replace with real provider when DLT is approved

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/\D/g, '')

    if (cleanPhone.length !== 10) {
      return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 })
    }

    const fullPhone = `+91${cleanPhone}`

    console.log(`[STUB] OTP requested for ${fullPhone} — use 123456`)

    return NextResponse.json({
      success: true,
      message: 'Test mode: Use OTP 123456',
      status: 'stub',
    })
  } catch (error: any) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
