import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { supabase } from './supabase'

interface InvoiceData {
  orderId: string
  businessName: string
  businessPhone: string
  businessUpi: string
  businessTagline?: string
  businessAddress?: string
  businessEmail?: string
  businessGstin?: string
  businessLogoUrl?: string
  customerName: string
  customerPhone?: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  mode: 'order' | 'bill'
  paymentMethod: 'cash' | 'upi'
  paymentStatus: 'paid' | 'pending'
  date: Date
  paymentUrl?: string
  paymentId?: string
  paidAt?: Date
}

const ORANGE: [number, number, number] = [242, 117, 44]
const ORANGE_LIGHT: [number, number, number] = [255, 247, 237]
const ORANGE_DARK: [number, number, number] = [220, 100, 30]
const GREEN: [number, number, number] = [22, 163, 74]
const GREEN_LIGHT: [number, number, number] = [220, 252, 231]

async function fetchImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (e) {
    console.error('Could not load logo:', e)
    return null
  }
}

async function drawBrandedHeader(doc: jsPDF, pageWidth: number, margin: number, data: InvoiceData, headerColor: [number, number, number] = ORANGE): Promise<number> {
  doc.setFillColor(...headerColor)
  doc.rect(0, 0, pageWidth, 8, 'F')

  let textStartX = margin

  if (data.businessLogoUrl) {
    const logoData = await fetchImageAsDataUrl(data.businessLogoUrl)
    if (logoData) {
      try {
        const format = logoData.startsWith('data:image/png') ? 'PNG' :
                       logoData.startsWith('data:image/jpeg') ? 'JPEG' :
                       logoData.startsWith('data:image/jpg') ? 'JPEG' : 'PNG'
        doc.addImage(logoData, format, margin, 14, 22, 22, undefined, 'FAST')
        textStartX = margin + 27
      } catch (e) {
        console.error('Could not embed logo:', e)
      }
    }
  } else {
    doc.setFillColor(...headerColor)
    doc.roundedRect(margin, 14, 22, 22, 4, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text(data.businessName.charAt(0).toUpperCase(), margin + 11, 30, { align: 'center' })
    textStartX = margin + 27
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(17)
  doc.setTextColor(20, 20, 25)
  doc.text(data.businessName, textStartX, 21)

  let yPos = 26

  if (data.businessTagline) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8.5)
    doc.setTextColor(...headerColor)
    doc.text(data.businessTagline, textStartX, yPos)
    yPos += 4
  }

  if (data.businessAddress) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(110, 110, 110)
    const addressLines = doc.splitTextToSize(data.businessAddress, 80)
    addressLines.forEach((line: string) => {
      doc.text(line, textStartX, yPos)
      yPos += 3.5
    })
    yPos += 0.5
  }

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(110, 110, 110)
  let infoLine = '+91 ' + data.businessPhone
  if (data.businessEmail) infoLine += ' . ' + data.businessEmail
  doc.text(infoLine, textStartX, yPos)
  yPos += 3.5
  if (data.businessGstin) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(80, 80, 80)
    doc.text('GSTIN: ' + data.businessGstin, textStartX, yPos)
    yPos += 3.5
  }

  return Math.max(yPos, 42)
}

function drawFooter(doc: jsPDF, pageWidth: number, pageHeight: number, margin: number, businessName: string, businessPhone: string, isPaidReceipt: boolean = false) {
  const footerY = pageHeight - 38
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5)

  doc.setTextColor(60, 60, 60)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Thank you for choosing ' + businessName + '!', pageWidth / 2, footerY, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text('Save us in your contacts: +91 ' + businessPhone, pageWidth / 2, footerY + 5, { align: 'center' })

  const brandY = pageHeight - 18
  doc.setFillColor(255, 247, 237)
  doc.rect(0, brandY - 6, pageWidth, 14, 'F')

  doc.setTextColor(...ORANGE)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('orderzo', pageWidth / 2 - 30, brandY + 1, { align: 'center' })

  doc.setTextColor(80, 80, 80)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Order. Bill. Done.', pageWidth / 2 + 6, brandY + 1)

  doc.setTextColor(...ORANGE)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('orderzo.io', pageWidth / 2 + 38, brandY + 1)

  doc.setFillColor(...(isPaidReceipt ? GREEN : ORANGE))
  doc.rect(0, pageHeight - 4, pageWidth, 4, 'F')
}

async function uploadPDF(doc: jsPDF, orderId: string, prefix: string = 'invoice'): Promise<string> {
  const pdfBlob = doc.output('blob')
  const fileName = prefix + '-' + orderId + '-' + Date.now() + '.pdf'
  const { error: uploadError } = await supabase.storage
    .from('invoices')
    .upload(fileName, pdfBlob, { contentType: 'application/pdf', upsert: false })
  if (uploadError) throw new Error('Could not upload invoice: ' + uploadError.message)
  const { data: urlData } = supabase.storage.from('invoices').getPublicUrl(fileName)
  return urlData.publicUrl
}

export async function generateInvoicePDF(data: InvoiceData): Promise<string> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  const headerEndY = await drawBrandedHeader(doc, pageWidth, margin, data, ORANGE)

  doc.setTextColor(50, 50, 50)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text(data.mode === 'bill' ? 'INVOICE' : 'ORDER', pageWidth - margin, 21, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('#' + data.orderId.slice(0, 8).toUpperCase(), pageWidth - margin, 26, { align: 'right' })
  doc.text(data.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), pageWidth - margin, 31, { align: 'right' })

  let dividerY = headerEndY + 4
  doc.setDrawColor(...ORANGE)
  doc.setLineWidth(0.8)
  doc.line(margin, dividerY, pageWidth - margin, dividerY)

  let yPos = dividerY + 8
  doc.setTextColor(150, 150, 150)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('BILL TO', margin, yPos)
  yPos += 4
  doc.setTextColor(30, 30, 30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text(data.customerName, margin, yPos)
  if (data.customerPhone) {
    yPos += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('+91 ' + data.customerPhone, margin, yPos)
  }

  yPos += 10
  doc.setFillColor(...ORANGE_LIGHT)
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 14, 3, 3, 'F')
  doc.setTextColor(...ORANGE_DARK)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  const firstName = data.customerName.split(' ')[0]
  doc.text('Thank you, ' + firstName + '! ' + (data.mode === 'bill' ? 'Hope to see you again soon.' : 'Your order is confirmed.'), pageWidth / 2, yPos + 9, { align: 'center' })

  yPos += 24
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
    doc.text('Rs.' + item.price, pageWidth - margin - 28, yPos, { align: 'center' })
    doc.setFont('helvetica', 'bold')
    doc.text('Rs.' + (item.price * item.quantity), pageWidth - margin - 4, yPos, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    yPos += 8
  })

  yPos += 5
  doc.setDrawColor(220, 220, 220)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 10

  doc.setFillColor(...ORANGE)
  doc.roundedRect(pageWidth - margin - 75, yPos - 5, 75, 18, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('TOTAL', pageWidth - margin - 70, yPos + 2)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Rs.' + data.total, pageWidth - margin - 4, yPos + 5, { align: 'right' })

  yPos += 22
  if (data.paymentStatus === 'paid') {
    doc.setFillColor(...GREEN_LIGHT)
    doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 14, 3, 3, 'F')
    doc.setTextColor(...GREEN)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('PAYMENT RECEIVED via ' + data.paymentMethod.toUpperCase(), pageWidth / 2, yPos + 4, { align: 'center' })
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
        const upiString = 'upi://pay?pa=' + data.businessUpi + '&pn=' + encodeURIComponent(data.businessName) + '&am=' + data.total + '&cu=INR'
        const qrDataUrl = await QRCode.toDataURL(upiString, { width: 100, margin: 1 })
        doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 30, yPos - 1, 25, 25)
      } catch (qrError) {
        console.error('QR generation failed:', qrError)
      }
    }
  }

  drawFooter(doc, pageWidth, pageHeight, margin, data.businessName, data.businessPhone, false)
  return uploadPDF(doc, data.orderId, 'invoice')
}

export async function generatePaidReceiptPDF(data: InvoiceData): Promise<string> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15

  const headerEndY = await drawBrandedHeader(doc, pageWidth, margin, data, GREEN)

  doc.setTextColor(...GREEN)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('RECEIPT', pageWidth - margin, 21, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('#' + data.orderId.slice(0, 8).toUpperCase(), pageWidth - margin, 27, { align: 'right' })

  let dividerY = headerEndY + 4
  doc.setDrawColor(...GREEN)
  doc.setLineWidth(0.8)
  doc.line(margin, dividerY, pageWidth - margin, dividerY)

  let yPos = dividerY + 6
  doc.setFillColor(...GREEN_LIGHT)
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 22, 4, 4, 'F')
  doc.setTextColor(...GREEN)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('PAID', pageWidth / 2 - 15, yPos + 12, { align: 'center' })
  doc.setDrawColor(...GREEN)
  doc.setLineWidth(2.5)
  doc.line(pageWidth / 2 + 5, yPos + 11, pageWidth / 2 + 9, yPos + 15)
  doc.line(pageWidth / 2 + 9, yPos + 15, pageWidth / 2 + 18, yPos + 6)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 120, 90)
  const paidDate = data.paidAt || new Date()
  doc.text('Paid on ' + paidDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' at ' + paidDate.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }), pageWidth / 2, yPos + 18, { align: 'center' })

  yPos += 30
  doc.setTextColor(150, 150, 150)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('BILL TO', margin, yPos)
  yPos += 4
  doc.setTextColor(30, 30, 30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text(data.customerName, margin, yPos)
  if (data.customerPhone) {
    yPos += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('+91 ' + data.customerPhone, margin, yPos)
  }

  yPos += 10
  doc.setFillColor(...GREEN_LIGHT)
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 14, 3, 3, 'F')
  doc.setTextColor(...GREEN)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  const firstName = data.customerName.split(' ')[0]
  doc.text('Thank you, ' + firstName + '! Your payment has been received.', pageWidth / 2, yPos + 9, { align: 'center' })

  yPos += 24
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
    doc.text('Rs.' + item.price, pageWidth - margin - 28, yPos, { align: 'center' })
    doc.setFont('helvetica', 'bold')
    doc.text('Rs.' + (item.price * item.quantity), pageWidth - margin - 4, yPos, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    yPos += 8
  })

  yPos += 8
  doc.setFillColor(...GREEN)
  doc.roundedRect(pageWidth - margin - 75, yPos - 5, 75, 18, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('PAID', pageWidth - margin - 70, yPos + 2)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Rs.' + data.total, pageWidth - margin - 4, yPos + 5, { align: 'right' })

  yPos += 22
  doc.setFillColor(245, 250, 245)
  doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 16, 3, 3, 'F')
  doc.setTextColor(...GREEN)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Payment Details', margin + 4, yPos + 1)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(80, 100, 85)
  doc.text('Method: ' + (data.paymentMethod === 'cash' ? 'Cash' : 'UPI / Card / Net Banking via Razorpay'), margin + 4, yPos + 6)
  if (data.paymentId) {
    doc.text('Transaction ID: ' + data.paymentId, margin + 4, yPos + 10)
  }

  drawFooter(doc, pageWidth, pageHeight, margin, data.businessName, data.businessPhone, true)
  return uploadPDF(doc, data.orderId, 'receipt')
}
