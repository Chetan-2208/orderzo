import jsPDF from 'jspdf'
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
}

export async function generateInvoicePDF(data: InvoiceData): Promise<string> {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  // ============ HEADER (Orange band) ============
  doc.setFillColor(255, 107, 53) // Orange #FF6B35
  doc.rect(0, 0, pageWidth, 35, 'F')

  // Orderzo logo box
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin, 10, 15, 15, 2, 2, 'F')
  doc.setTextColor(255, 107, 53)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('O', margin + 5.5, 21)

  // Business name (white text)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(data.businessName, margin + 22, 18)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`+91 ${data.businessPhone}`, margin + 22, 25)

  // ============ INVOICE TITLE ============
  doc.setTextColor(50, 50, 50)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(data.mode === 'bill' ? 'BILL / INVOICE' : 'ORDER CONFIRMATION', margin, 50)

  // Date + Order ID
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(`Date: ${data.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, margin, 57)
  doc.text(`Time: ${data.date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}`, margin, 62)
  doc.text(`Invoice #: ${data.orderId.slice(0, 8).toUpperCase()}`, pageWidth - margin - 50, 57)

  // ============ CUSTOMER SECTION ============
  let yPos = 75
  doc.setFillColor(255, 247, 237) // Light orange bg
  doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 18, 2, 2, 'F')
  
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('BILL TO:', margin + 3, yPos)
  
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(data.customerName, margin + 3, yPos + 6)
  
  if (data.customerPhone) {
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(`+91 ${data.customerPhone}`, margin + 3, yPos + 11)
  }

  // ============ ITEMS TABLE ============
  yPos = 105
  
  // Table header
  doc.setFillColor(255, 107, 53)
  doc.rect(margin, yPos, pageWidth - 2 * margin, 9, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('ITEM', margin + 3, yPos + 6)
  doc.text('QTY', pageWidth - margin - 60, yPos + 6, { align: 'center' })
  doc.text('PRICE', pageWidth - margin - 35, yPos + 6, { align: 'center' })
  doc.text('TOTAL', pageWidth - margin - 5, yPos + 6, { align: 'right' })

  yPos += 12
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  // Item rows
  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F')
    }
    doc.setTextColor(30, 30, 30)
    doc.text(item.name, margin + 3, yPos)
    doc.text(item.quantity.toString(), pageWidth - margin - 60, yPos, { align: 'center' })
    doc.text(`${item.price}`, pageWidth - margin - 35, yPos, { align: 'center' })
    doc.text(`${item.price * item.quantity}`, pageWidth - margin - 5, yPos, { align: 'right' })
    yPos += 8
  })

  // ============ TOTAL ============
  yPos += 5
  doc.setDrawColor(255, 107, 53)
  doc.setLineWidth(0.5)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  
  yPos += 10
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(50, 50, 50)
  doc.text('TOTAL:', pageWidth - margin - 50, yPos)
  doc.setTextColor(255, 107, 53)
  doc.setFontSize(18)
  doc.text(`${data.total}`, pageWidth - margin - 5, yPos, { align: 'right' })

  // ============ PAYMENT STATUS ============
  yPos += 12
  if (data.paymentStatus === 'paid') {
    doc.setFillColor(220, 252, 231) // Light green
    doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 12, 2, 2, 'F')
    doc.setTextColor(22, 101, 52)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`PAID via ${data.paymentMethod.toUpperCase()}`, pageWidth / 2, yPos + 2, { align: 'center' })
  } else {
    doc.setFillColor(255, 247, 237)
    doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 22, 2, 2, 'F')
    doc.setTextColor(255, 107, 53)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('PAYMENT PENDING', margin + 3, yPos + 2)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(80, 80, 80)
    doc.text(`Pay via UPI: ${data.businessUpi}`, margin + 3, yPos + 9)
    doc.text(`Or scan UPI link in WhatsApp message`, margin + 3, yPos + 14)
  }

  // ============ FOOTER ============
  const footerY = pageHeight - 25
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5)
  
  doc.setTextColor(150, 150, 150)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`Thank you for choosing ${data.businessName}!`, pageWidth / 2, footerY, { align: 'center' })
  doc.text('Visit again 🙏', pageWidth / 2, footerY + 5, { align: 'center' })
  
  doc.setTextColor(255, 107, 53)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('Powered by Orderzo · orderzo.io', pageWidth / 2, footerY + 12, { align: 'center' })

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

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('invoices')
    .getPublicUrl(fileName)

  return urlData.publicUrl
}
