import { ImageResponse } from 'next/og'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

const META: Record<string, { badge: string; headline: string; sub: string }> = {
  'restaurants-food':    { badge: 'Restaurants & Food',    headline: 'Forms That Work as Hard as Your Kitchen',          sub: 'Online orders, reservations, staff hiring, and feedback — all paperless.' },
  'healthcare-clinics':  { badge: 'Healthcare & Clinics',  headline: 'Paperless Patient Forms for Modern Clinics',       sub: 'New patient registration, appointments, and consent — digital-first.' },
  'education-coaching':  { badge: 'Education & Coaching',  headline: 'Enrolment and Fees — Without the Paperwork',       sub: 'Admissions, fee collection, and feedback for schools and coaching centres.' },
  'real-estate':         { badge: 'Real Estate',           headline: 'More Leads. Fewer Missed Calls.',                  sub: 'Lead capture, site visit scheduling, and buyer surveys — all in one.' },
  'retail-ecommerce':    { badge: 'Retail & E-commerce',   headline: 'Orders, Returns, and Loyalty — Simplified',        sub: 'Custom order forms with UPI payment for your online or offline store.' },
  'hr-recruitment':      { badge: 'HR & Recruitment',      headline: 'Hire Smarter with Structured Forms',               sub: 'Job applications, onboarding, and exit surveys — automated and trackable.' },
  'events-weddings':     { badge: 'Events & Weddings',     headline: 'RSVPs and Payments in One Form',                   sub: 'Guest registration, vendor forms, and UPI collection for any event.' },
  'nonprofits':          { badge: 'NGOs & Non-profits',    headline: 'Collect Donations and Volunteers — Effortlessly',  sub: 'Beneficiary registration, volunteer sign-ups, and impact surveys.' },
}

export default function OGImage({ params }: { params: { slug: string } }) {
  const data = META[params.slug] ?? META['restaurants-food']
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
