import { ImageResponse } from 'next/og'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

const META: Record<string, { headline: string; sub: string; badge: string }> = {
  'lead-generation':    { badge: 'Lead Generation',      headline: 'Turn Visitors Into Leads — Automatically',         sub: 'High-converting lead capture forms. Web, WhatsApp, or offline.' },
  'customer-feedback':  { badge: 'Customer Feedback',    headline: 'Know Exactly What Your Customers Think',           sub: 'NPS, CSAT, and product feedback — automated and trackable.' },
  'event-registration': { badge: 'Event Registration',   headline: 'Registrations + Payments in One Form',             sub: 'Collect RSVPs and event fees via UPI and card in a single step.' },
  'job-applications':   { badge: 'Job Applications',     headline: 'Hire Faster with Structured Application Forms',    sub: 'Screening forms with conditional logic and resume upload.' },
  'order-forms':        { badge: 'Order & Booking Forms',headline: 'Take Orders and Bookings — Online or Offline',      sub: 'Works with or without payment. Share via WhatsApp instantly.' },
  'payment-collection': { badge: 'Payment Collection',   headline: 'Collect UPI + Card Payments Inside Your Form',     sub: 'Powered by Razorpay. No separate payment link needed.' },
}

export default function OGImage({ params }: { params: { slug: string } }) {
  const data = META[params.slug] ?? META['lead-generation']
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        backgroundColor: '#ffffff', padding: '72px 96px',
        fontFamily: 'sans-serif', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, backgroundColor: '#f97316' }} />

        {/* Brand + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>FormBharat</div>
          <div style={{ width: 4, height: 4, borderRadius: 99, backgroundColor: '#d1d5db' }} />
          <div style={{
            fontSize: 14, fontWeight: 600, color: '#ea580c',
            backgroundColor: '#fff7ed', border: '1px solid #fed7aa',
            borderRadius: 99, padding: '5px 14px',
          }}>
            {data.badge}
          </div>
        </div>

        <div style={{ fontSize: 58, fontWeight: 800, color: '#111827', lineHeight: 1.1, marginBottom: 28, maxWidth: 920, letterSpacing: '-1.5px' }}>
          {data.headline}
        </div>
        <div style={{ fontSize: 26, color: '#6b7280', maxWidth: 700, lineHeight: 1.5 }}>
          {data.sub}
        </div>
        <div style={{ position: 'absolute', bottom: 36, right: 96, fontSize: 16, color: '#d1d5db' }}>
          formbharat.com
        </div>
      </div>
    ),
    { ...size },
  )
}
