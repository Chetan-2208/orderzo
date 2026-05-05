import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await context.params

  if (!shortId || shortId.length < 6) {
    return new NextResponse('Invalid link', { status: 404 })
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('id, pdf_url, receipt_url, status')
    .order('created_at', { ascending: false })
    .limit(500)

  const order = orders?.find((o: any) =>
    o.id && o.id.toString().toLowerCase().startsWith(shortId.toLowerCase())
  )

  if (!order) {
    return new NextResponse(
      '<html><body style="font-family:system-ui;text-align:center;padding:60px 20px;background:#fff7ed"><h1 style="color:#f2752c">Invoice not found</h1><p style="color:#666">This invoice link may have expired or is invalid.</p><a href="https://orderzo.io" style="display:inline-block;margin-top:20px;background:#f2752c;color:white;padding:12px 24px;border-radius:8px;text-decoration:none">Go to Orderzo</a></body></html>',
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    )
  }

  const isPaid = order.status === 'paid' || order.status === 'done'
  const targetUrl = isPaid && order.receipt_url ? order.receipt_url : order.pdf_url

  if (!targetUrl) {
    return new NextResponse(
      '<html><body style="font-family:system-ui;text-align:center;padding:60px 20px;background:#fff7ed"><h1 style="color:#f2752c">Invoice generating...</h1><p style="color:#666">Please refresh in a few seconds.</p></body></html>',
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    )
  }

  return NextResponse.redirect(targetUrl, 302)
}
