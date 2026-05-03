import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { supabase } from './supabase'

interface InvoiceData {
  orderId: string
  businessName: string
  businessPhone: string
  businessUpi: string
  customerName: string
  customerPhone?: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  mode: 'order' | 'bill'
  paymentMethod: 'cash' | 'upi'
  paymentStatus: 'paid' | 'pending'
  date: Date
  paymentUrl?: string
}

// Convert SVG logo to data URI for PDF embedding
async function getLogoDataUrl(): Promise<string | null> {
  try {
    const response = await fetch('/brand/svg/orderzo-lockup-brand.svg')
    if (!response.ok) return null
    const svgText = await response.text()
    return `data:image/svg+xml;base64,${btoa(svgText)}`
  } catch {
    return null
  }
}

export async function generateInvoicePDF(data: InvoiceData): Promise<string> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const ORANGE: [number, number, number] = [242, 117, 44] // Match brand color #F2752C
  const ORANGE_LIGHT: [number, number, number] = [255, 247, 237]
  const ORANGE_DARK: [number, number, number] = [220, 100, 30]

  // Top decorative bar
  doc.setFillColor(...ORANGE)
  doc.rect(0, 0, pageWidth, 8, 'F')

  // ============ HEADER WITH ORDERZO LOGO ============
  // Draw the logo manually (orange rounded square + white checkmark)
  doc.setFillColor(...ORANGE)
  doc.roundedRect(margin, 15, 16, 16, 3.5, 3.5, 'F')
  doc.setDrawColor(255, 255, 255)
  doc.setLineWidth(1.5)
  doc.setLineCap('round')
  doc.setLineJoin('round')
  // Checkmark inside
  doc.line(margin + 4.5, 23, margin + 7.5, 26)
  doc.line(margin + 7.5, 26, margin + 12, 20)
  
  // "orderzo" wordmark
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(15, 15, 20)
  doc.text('orderzo', margin + 22, 27)
  
  // Tagline
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('Order. Bill. Done.', margin + 22, 32)

  // Right side: Invoice details
  doc.setTextColor(50, 50, 50)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(data.mode === 'bill' ? 'INVOICE' : 'ORDER', pageWidth - margin, 25, { align: 'right' })
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text(`#${data.orderId.slice(0, 8).toUpperCase()}`, pageWidth - margin, 30, { align: 'right' })
  doc.text(data.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), pageWidth - margin, 35, { align: 'right' })

  // Divider line
  doc.setDrawColor(...ORANGE)
  doc.setLineWidth(0.8)
  doc.line(margin, 42, pageWidth - margin, 42)

  // ============ FROM ============
  let yPos = 52
  doc.setTextColor(150, 150, 150)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('FROM', margin, yPos)
  
  yPos += 5
  doc.setTextColor(30, 30, 30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(data.businessName, margin, yPos)
  
  yPos += 5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text(`+91 ${data.businessPhone}`, margin, yPos)
  doc.text(`UPI: ${data.businessUpi}`, margin, yPos + 4)

  // ============ TO ============
  doc.setTextColor(150, 150, 150)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('TO', pageWidth - margin, 52, { align: 'right' })
  
  doc.setTextColor(30, 30, 30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(data.customerName, pageWidth - margin, 57, { align: 'right' })
  
  if (data.customerPhone) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text(`+91 ${data.customerPhone}`, pageWidth - margin, 62, { align: 'right' })
  }

  // ============ THANK YOU MESSAGE ============
  yPos = 80
  doc.setFillColor(...ORANGE_LIGHT)
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 14, 3, 3, 'F')
  
  doc.setTextColor(...ORANGE_DARK)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  const firstName = data.customerName.split(' ')[0]
  doc.text(`Thank you, ${firstName}! ${data.mode === 'bill' ? 'Hope to see you again soon.' : 'Your order is confirmed.'}`, pageWidth / 2, yPos + 9, { align: 'center' })

  // ============ ITEMS TABLE ============
  yPos = 105
  
  doc.setFillColor(45, 45, 45)
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 9, 2, 2, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('ITEM', margin + 4, yPos + 6)
  doc.text('QTY', pageWidth - margin - 50, yPos + 6, { align: 'center' })
  doc.text('RATE', pageWidth - margin - 28, yPos + 6, { align: 'center' })
  doc.text('AMOUNT', pageWidth - margin - 4, yPos + 6, { align: 'right' })

  yPos += 12
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F')
    }
    doc.setTextColor(30, 30, 30)
    doc.text(item.name, margin + 4, yPos)
    doc.text(item.quantity.toString(), pageWidth - margin - 50, yPos, { align: 'center' })
    doc.text(`Rs.${item.price}`, pageWidth - margin - 28, yPos, { align: 'center' })
    doc.setFont('helvetica', 'bold')
    doc.text(`Rs.${item.price * item.quantity}`, pageWidth - margin - 4, yPos, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    yPos += 8
  })

  // ============ TOTAL ============
  yPos += 5
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  
  yPos += 8
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text('Subtotal:', pageWidth - margin - 30, yPos, { align: 'right' })
  doc.text(`Rs.${data.total}`, pageWidth - margin - 4, yPos, { align: 'right' })

  yPos += 10
  doc.setFillColor(...ORANGE)
  doc.roundedRect(pageWidth - margin - 75, yPos - 5, 75, 18, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('TOTAL', pageWidth - margin - 70, yPos + 2)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(`Rs.${data.total}`, pageWidth - margin - 4, yPos + 5, { align: 'right' })

  // ============ PAYMENT STATUS ============
  yPos += 22
  if (data.paymentStatus === 'paid') {
    doc.setFillColor(220, 252, 231)
    doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 14, 3, 3, 'F')
    doc.setTextColor(22, 101, 52)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`PAYMENT RECEIVED via ${data.paymentMethod.toUpperCase()}`, pageWidth / 2, yPos + 4, { align: 'center' })
  } else {
    doc.setFillColor(...ORANGE_LIGHT)
    doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 35, 3, 3, 'F')
    
    doc.setTextColor(...ORANGE_DARK)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('PAYMENT PENDING', margin + 4, yPos + 2)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(80, 80, 80)
    doc.text('Pay using any UPI app:', margin + 4, yPos + 9)
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(50, 50, 50)
    doc.text(data.businessUpi, margin + 4, yPos + 15)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(120, 120, 120)
    doc.text('Scan QR code with any UPI app to pay', margin + 4, yPos + 24)

    if (data.businessUpi) {
      try {
        const upiString = `upi://pay?pa=${data.businessUpi}&pn=${encodeURIComponent(data.businessName)}&am=${data.total}&cu=INR`
        const qrDataUrl = await QRCode.toDataURL(upiString, { width: 100, margin: 1 })
        doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 30, yPos - 1, 25, 25)
      } catch (qrError) {
        console.error('QR generation failed:', qrError)
      }
    }
  }

  // ============ FOOTER ============
  const footerY = pageHeight - 30
  
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5)
  
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(`Visit ${data.businessName} again - we'd love to serve you!`, pageWidth / 2, footerY, { align: 'center' })
  
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text(`Save us in your contacts: +91 ${data.businessPhone}`, pageWidth / 2, footerY + 5, { align: 'center' })
  
  doc.setTextColor(...ORANGE)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('orderzo', pageWidth / 2 - 22, footerY + 13)
  
  doc.setTextColor(150, 150, 150)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('. Order. Bill. Done. . orderzo.io', pageWidth / 2 - 5, footerY + 13)

  // Bottom decorative bar
  doc.setFillColor(...ORANGE)
  doc.rect(0, pageHeight - 4, pageWidth, 4, 'F')

  // ============ UPLOAD TO SUPABASE ============
  const pdfBlob = doc.output('blob')
  const fileName = `invoice-${data.orderId}-${Date.now()}.pdf`
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('invoices')
    .upload(fileName, pdfBlob, {
      contentType: 'application/pdf',
      upsert: false,
    })

  if (uploadError) {
    console.error('PDF upload error:', uploadError)
    throw new Error('Could not upload invoice: ' + uploadError.message)
  }

  const { data: urlData } = supabase.storage
    .from('invoices')
    .getPublicUrl(fileName)

  return urlData.publicUrl
}
